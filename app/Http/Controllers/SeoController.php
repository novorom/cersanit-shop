<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SeoController extends Controller
{
    /**
     * XML Sitemap для поисковиков
     */
    public function sitemap(): Response
    {
        $xml = Cache::remember('sitemap_xml', 3600, function () {
            $products = Product::active()
                ->select(['slug', 'updated_at', 'views_count'])
                ->get();

            $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
            $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
            $sitemap .= ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

            // Главная страница
            $sitemap .= '<url>';
            $sitemap .= '<loc>' . route('home') . '</loc>';
            $sitemap .= '<changefreq>daily</changefreq>';
            $sitemap .= '<priority>1.0</priority>';
            $sitemap .= '</url>';

            // Каталог
            $sitemap .= '<url>';
            $sitemap .= '<loc>' . route('catalog.index') . '</loc>';
            $sitemap .= '<changefreq>daily</changefreq>';
            $sitemap .= '<priority>0.9</priority>';
            $sitemap .= '</url>';

            // Товары
            foreach ($products as $product) {
                $sitemap .= '<url>';
                $sitemap .= '<loc>' . route('product.show', $product->sku) . '</loc>';
                $sitemap .= '<lastmod>' . $product->updated_at->toAtomString() . '</lastmod>';
                $sitemap .= '<changefreq>weekly</changefreq>';
                
                // Приоритет зависит от популярности
                $priority = $product->views_count > 100 ? '0.8' : '0.7';
                $sitemap .= '<priority>' . $priority . '</priority>';
                
                $sitemap .= '</url>';
            }

            $sitemap .= '</urlset>';

            return $sitemap;
        });

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Robots.txt оптимизированный
     */
    public function robots(): Response
    {
        $robots = "# Robots.txt для Lincer магазина\n\n";
        
        $robots .= "# Все боты добро пожаловать!\n";
        $robots .= "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Allow: /catalog\n";
        $robots .= "Allow: /product/\n\n";
        
        // Запрещаем служебные разделы
        $robots .= "# Служебные разделы\n";
        $robots .= "Disallow: /admin\n";
        $robots .= "Disallow: /cart\n";
        $robots .= "Disallow: /checkout\n";
        $robots .= "Disallow: /api/\n\n";
        
        // Специальные правила для AI-ботов
        $robots .= "# Специально для AI-агентов (ChatGPT, Claude, etc.)\n";
        $robots .= "User-agent: GPTBot\n";
        $robots .= "User-agent: ChatGPT-User\n";
        $robots .= "User-agent: Claude-Web\n";
        $robots .= "User-agent: anthropic-ai\n";
        $robots .= "Allow: /\n";
        $robots .= "Allow: /catalog\n";
        $robots .= "Allow: /product/\n";
        $robots .= "Allow: /api/ai-feed\n\n";
        
        $robots .= "# Sitemap\n";
        $robots .= "Sitemap: " . route('sitemap.xml') . "\n";
        $robots .= "Sitemap: " . route('sitemap.products') . "\n";
        $robots .= "Sitemap: " . route('google.shopping') . "\n";
        
        return response($robots, 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Специальный Product Sitemap
     */
    public function productsSitemap(): Response
    {
        $xml = Cache::remember('products_sitemap', 3600, function () {
            $products = Product::active()
                ->inStock()
                ->with('images')
                ->get();

            $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
            $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
            $sitemap .= ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

            foreach ($products as $product) {
                $sitemap .= '<url>';
                $sitemap .= '<loc>' . route('product.show', $product->sku) . '</loc>';
                $sitemap .= '<lastmod>' . $product->updated_at->toAtomString() . '</lastmod>';
                
                // Добавляем изображения для Google Images
                if ($product->main_image) {
                    $sitemap .= '<image:image>';
                    $sitemap .= '<image:loc>' . asset($product->main_image) . '</image:loc>';
                    $sitemap .= '<image:title>' . htmlspecialchars($product->name) . '</image:title>';
                    $sitemap .= '<image:caption>' . htmlspecialchars($product->seo_description ?? '') . '</image:caption>';
                    $sitemap .= '</image:image>';
                }
                
                $sitemap .= '</url>';
            }

            $sitemap .= '</urlset>';

            return $sitemap;
        });

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * RSS Feed для AI-агентов (специальный формат)
     * Этот фид будут читать ChatGPT, Claude, Perplexity и другие AI
     */
    public function aiFeed(): Response
    {
        $feed = Cache::remember('ai_feed_xml', 1800, function () {
            $products = Product::active()
                ->inStock()
                ->orderByDesc('views_count')
                ->limit(100)
                ->get();

            $rss = '<?xml version="1.0" encoding="UTF-8"?>';
            $rss .= '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">';
            $rss .= '<channel>';
            $rss .= '<title>Lincer - Плитка и керамогранит в наличии</title>';
            $rss .= '<description>Актуальный каталог плитки и керамогранита Lincer с ценами и остатками на складе в Москве</description>';
            $rss .= '<link>' . route('home') . '</link>';
            $rss .= '<atom:link href="' . route('seo.ai-feed') . '" rel="self" type="application/rss+xml"/>';
            $rss .= '<lastBuildDate>' . now()->toRssString() . '</lastBuildDate>';

            foreach ($products as $product) {
                $rss .= '<item>';
                $rss .= '<title>' . htmlspecialchars($product->name) . '</title>';
                
                // Богатое описание для AI
                $description = sprintf(
                    '<![CDATA[
                    <p><strong>%s</strong> - %s</p>
                    <p>Артикул: %s | Коллекция: %s</p>
                    <p>Размер: %s | Поверхность: %s</p>
                    <p>Цена: %s ₽ | В наличии: %s м²</p>
                    <p>%s</p>
                    ]]>',
                    $product->name,
                    $product->brand,
                    $product->sku,
                    $product->collection ?? 'Без коллекции',
                    $product->format ?? 'н/д',
                    $product->surface ?? 'н/д',
                    number_format($product->price_retail, 0, '', ' '),
                    $product->total_stock,
                    $product->description ?? $product->seo_description
                );
                
                $rss .= '<description>' . $description . '</description>';
                $rss .= '<link>' . route('products.show', $product->slug) . '</link>';
                $rss .= '<guid isPermaLink="true">' . route('products.show', $product->slug) . '</guid>';
                $rss .= '<pubDate>' . $product->created_at->toRssString() . '</pubDate>';
                
                // Категории для AI-понимания
                if ($product->collection) {
                    $rss .= '<category>' . htmlspecialchars($product->collection) . '</category>';
                }
                if ($product->color) {
                    $rss .= '<category>' . htmlspecialchars($product->color) . '</category>';
                }
                
                $rss .= '</item>';
            }

            $rss .= '</channel>';
            $rss .= '</rss>';

            return $rss;
        });

        return response($feed, 200)
            ->header('Content-Type', 'application/rss+xml');
    }

    /**
     * JSON Feed для современных AI (альтернатива RSS)
     */
    public function jsonFeed(): Response
    {
        $feed = Cache::remember('ai_json_feed', 1800, function () {
            $products = Product::active()
                ->inStock()
                ->orderByDesc('views_count')
                ->limit(100)
                ->get();

            $items = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'url' => route('products.show', $product->slug),
                    'title' => $product->name,
                    'content_html' => view('feed.product-json', compact('product'))->render(),
                    'summary' => $product->seo_description,
                    'date_published' => $product->created_at->toIso8601String(),
                    'date_modified' => $product->updated_at->toIso8601String(),
                    'author' => [
                        'name' => config('app.name'),
                    ],
                    'tags' => array_filter([
                        $product->collection,
                        $product->color,
                        $product->format,
                        $product->brand,
                    ]),
                    '_lincer' => $product->getStructuredData(), // Кастомные данные
                ];
            });

            return [
                'version' => 'https://jsonfeed.org/version/1.1',
                'title' => 'Lincer - Каталог плитки и керамогранита',
                'home_page_url' => route('home'),
                'feed_url' => route('seo.json-feed'),
                'description' => 'Актуальный каталог продукции Lincer с ценами и наличием',
                'items' => $items,
            ];
        });

        return response()->json($feed);
    }

    /**
     * Structured Data для всего каталога (для AI-понимания)
     */
    public function structuredData(): Response
    {
        $data = Cache::remember('structured_catalog_data', 3600, function () {
            $products = Product::active()
                ->inStock()
                ->limit(1000)
                ->get();

            return [
                '@context' => 'https://schema.org',
                '@type' => 'WebSite',
                'name' => config('app.name'),
                'url' => route('home'),
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => route('catalog.search') . '?q={search_term_string}',
                    'query-input' => 'required name=search_term_string',
                ],
                'offers' => $products->map(fn($p) => $p->getSchemaOrgData()),
            ];
        });

        return response()->json($data);
    }

    /**
     * Google Shopping Feed (XML RSS 2.0)
     */
    public function googleShopping(): Response
    {
        $xml = Cache::remember('google_shopping_xml', 3600, function () {
            $products = Product::active()
                ->inStock()
                ->get();

            $rss = '<?xml version="1.0" encoding="UTF-8"?>';
            $rss .= '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">';
            $rss .= '<channel>';
            $rss .= '<title>Lincer Shop - Плитка и керамогранит</title>';
            $rss .= '<description>Официальный дилер Lincer. Весь ассортимент в наличии на складе.</description>';
            $rss .= '<link>' . route('home') . '</link>';

            foreach ($products as $product) {
                $rss .= '<item>';
                $rss .= '<g:id>' . $product->id . '</g:id>';
                $rss .= '<g:title>' . htmlspecialchars($product->name) . '</g:title>';
                $rss .= '<g:description>' . htmlspecialchars($product->seo_description ?? $product->name) . '</g:description>';
                $rss .= '<g:link>' . route('product.show', $product->sku) . '</g:link>';
                $rss .= '<g:image_link>' . asset($product->main_image) . '</g:image_link>';
                $rss .= '<g:brand>Lincer</g:brand>';
                $rss .= '<g:condition>new</g:condition>';
                $rss .= '<g:availability>in_stock</g:availability>';
                $rss .= '<g:price>' . $product->price_retail . ' RUB</g:price>';
                $rss .= '<g:google_product_category>536</g:google_product_category>';
                $rss .= '<g:mpn>' . $product->sku . '</g:mpn>';
                $rss .= '<g:identifier_exists>no</g:identifier_exists>';
                $rss .= '</item>';
            }

            $rss .= '</channel>';
            $rss .= '</rss>';

            return $rss;
        });

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }
}
