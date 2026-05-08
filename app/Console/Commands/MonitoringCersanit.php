<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Str;

class MonitoringLincer extends Command
{
    protected $signature = 'monitor:lincer {--check-collections : Check for new collections}';
    protected $description = 'Monitor cersanit-spb.ru for new products and collections';

    protected $client;

    public function __construct()
    {
        parent::__construct();
        $this->client = new Client([
            'base_uri' => 'https://www.cersanit-spb.ru',
            'timeout'  => 30,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (compatible; MonitoringBot/1.0)'
            ],
        ]);
    }

    public function handle()
    {
        $this->info('Starting Lincer monitoring...');

        try {
            // Check for new collections
            if ($this->option('check-collections')) {
                $this->checkCollections();
            }

            // Fetch catalog page to check for new products
            $this->checkProducts();

            // Log monitoring timestamp
            $this->logMonitoring();

            $this->info('Monitoring completed successfully.');
            return 0;

        } catch (\Exception $e) {
            $this->error('Error during monitoring: ' . $e->getMessage());
            return 1;
        }
    }

    /**
     * Check for new collections on cersanit-spb.ru
     */
    protected function checkCollections(): void
    {
        $this->info('Checking collections...');

        $response = $this->client->get('/catalog/2d/');
        $html = (string)$response->getBody();

        $crawler = new Crawler($html);

        // Find collection links using various possible selectors
        $collectionNodes = $crawler->filterXPath(
            '//*[contains(@class, "collection") or contains(@class, "cat-list")]' .
            '//a[contains(@href, "/collection/") or contains(@class, "prod-item")]'
        );

        $newCollections = [];

        foreach ($collectionNodes as $node) {
            try {
                $collectionName = $node->textContent;
                $collectionUrl = $node->getAttribute('href');

                // Clean up collection name
                $collectionName = trim($collectionName);

                if (empty($collectionName) || strlen($collectionName) > 100) {
                    continue;
                }

                // Check if this collection exists in our database
                $exists = Product::where('collection', $collectionName)->exists();

                if (!$exists) {
                    $newCollections[] = [
                        'name' => $collectionName,
                        'url' => $collectionUrl
                    ];
                }

            } catch (\Exception $e) {
                // Skip problematic entries
                continue;
            }
        }

        if (!empty($newCollections)) {
            $this->info('Found ' . count($newCollections) . ' new collections:');
            foreach ($newCollections as $collection) {
                $this->line('- ' . $collection['name']);
            }

            // Save to log file
            $logPath = storage_path('logs/new_collections.log');
            file_put_contents(
                $logPath,
                date('Y-m-d H:i:s') . ' - New collections found: ' . json_encode($newCollections, JSON_UNESCAPED_UNICODE) . PHP_EOL,
                FILE_APPEND
            );
        } else {
            $this->info('No new collections found.');
        }
    }

    /**
     * Check for new products
     */
    protected function checkProducts(): void
    {
        $this->info('Checking products...');

        // Try to fetch main catalog page
        $page = 1;
        $hasMoreProducts = true;
        $scannedProducts = 0;

        while ($hasMoreProducts && $page <= 5) { // Limit to 5 pages max
            try {
                $response = $this->client->get('/catalog/2d/?page=' . $page);
                $html = (string)$response->getBody();

                $crawler = new Crawler($html);

                // Find product cards using various selectors
                $productNodes = $crawler->filterXPath(
                    '//*[contains(@class, "product-item") or contains(@class, "card")]'
                );

                if ($productNodes->count() === 0) {
                    $hasMoreProducts = false;
                    break;
                }

                foreach ($productNodes as $productNode) {
                    $productCrawler = new Crawler($productNode);

                    try {
                        // Try to extract product SKU
                        $sku = $this->extractSku($productCrawler);
                        if (!$sku) {
                            continue;
                        }

                        // Check if product exists
                        $exists = Product::where('sku', $sku)->exists();

                        if (!$exists) {
                            // Extract basic info
                            $productInfo = [
                                'sku' => $sku,
                                'name' => $this->extractProductName($productCrawler),
                                'price' => $this->extractPrice($productCrawler),
                                'collection' => $this->extractCollection($productCrawler),
                            ];

                            // Log new product
                            $this->info("New product found: {$productInfo['name']} ({$sku})");

                            // Save to pending products log
                            $this->logNewProduct($productInfo);
                        }

                        $scannedProducts++;

                    } catch (\Exception $e) {
                        // Skip problematic products
                        continue;
                    }
                }

                $this->info("Scanned page $page: $scannedProducts products");
                $page++;

            } catch (\Exception $e) {
                $this->warn('Failed to fetch page ' . $page . ': ' . $e->getMessage());
                $hasMoreProducts = false;
            }
        }
    }

    /**
     * Extract SKU from product node
     */
    protected function extractSku(Crawler $crawler): ?string
    {
        // Try various selectors
        $sku = $crawler->filterXPath(
            '//*[contains(@class, "sku") or contains(@class, "code") or contains(@class, "art")]'
        )->first()->text('');

        if (empty($sku)) {
            // Try to extract from product URL
            $link = $crawler->filter('a[href*="/product/"]')->first()->attr('href');
            if (preg_match('/\/product\/([^\/]+)/', $link, $matches)) {
                $sku = $matches[1];
            }
        }

        return $sku ?: null;
    }

    /**
     * Extract product name
     */
    protected function extractProductName(Crawler $crawler): string
    {
        return $crawler->filter('h1, h2, h3, .title, .name')->first()->text('Без названия');
    }

    /**
     * Extract price
     */
    protected function extractPrice(Crawler $crawler): ?string
    {
        return $crawler->filter('.price, .cost, .val')->first()->text('');
    }

    /**
     * Extract collection
     */
    protected function extractCollection(Crawler $crawler): ?string
    {
        return $crawler->filter('.collection, .series')->first()->text('');
    }

    /**
     * Log new product information
     */
    protected function logNewProduct(array $productInfo): void
    {
        $logPath = storage_path('logs/new_products.log');
        file_put_contents(
            $logPath,
            date('Y-m-d H:i:s') . ' - ' . json_encode($productInfo, JSON_UNESCAPED_UNICODE) . PHP_EOL,
            FILE_APPEND
        );
    }

    /**
     * Log monitoring activity
     */
    protected function logMonitoring(): void
    {
        $logPath = storage_path('logs/monitoring.log');
        file_put_contents(
            $logPath,
            date('Y-m-d H:i:s') . ' - Monitoring completed' . PHP_EOL,
            FILE_APPEND
        );
    }
}