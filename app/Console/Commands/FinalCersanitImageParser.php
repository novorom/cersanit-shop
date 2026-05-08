<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FinalLincerImageParser extends Command
{
    protected $signature = 'parse:lincer-final {--limit=10}';
    protected $description = 'Парсинг фото с cersanit-spb.ru';

    public function handle()
    {
        $limit = $this->option('limit');
        
        $products = Product::whereNull('images')->limit($limit)->get();

        if ($products->isEmpty()) {
            $this->info('✅ У всех товаров есть фото!');
            return 0;
        }

        $this->info("🚀 Парсим {$products->count()} товаров...\n");

        $bar = $this->output->createProgressBar($products->count());
        $bar->start();

        $success = 0;
        $failed = 0;

        foreach ($products as $product) {
            try {
                $searchUrl = "https://cersanit-spb.ru/search/?q=" . $product->sku;
                
                $response = Http::timeout(10)->get($searchUrl);
                
                if (!$response->successful()) {
                    $failed++;
                    $bar->advance();
                    continue;
                }

                $html = $response->body();
                
                if (preg_match('/href="(\/catalog\/2d\/[^"]+)"/', $html, $matches)) {
                    $productUrl = "https://cersanit-spb.ru" . $matches[1];
                    
                    sleep(1);
                    
                    $productResponse = Http::timeout(10)->get($productUrl);
                    
                    if ($productResponse->successful()) {
                        $pageHtml = $productResponse->body();
                        
                        preg_match_all('/"(https:\/\/lincer\.ru\/upload\/[^"]+\.(jpg|jpeg|png|webp))"/', $pageHtml, $imageMatches);
                        
                        if (!empty($imageMatches[1])) {
                            $images = array_unique($imageMatches[1]);
                            $images = array_slice($images, 0, 5);
                            
                            $product->update(['images' => $images]);
                            
                            $success++;
                        } else {
                            $failed++;
                        }
                    } else {
                        $failed++;
                    }
                } else {
                    $failed++;
                }
                
            } catch (\Exception $e) {
                $failed++;
            }
            
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        
        $this->info("✅ Успешно: {$success}");
        $this->warn("❌ Ошибок: {$failed}");

        return 0;
    }
}
ENDOFFILE