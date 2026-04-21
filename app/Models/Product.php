<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sku', 'external_id', 'name', 'slug', 'brand', 'manufacturer', 'collection', 'product_type', 'unit_type',
        'format', 'surface', 'color', 'material_type', 'application', 'rooms', 'design',
        'thickness', 'pieces_per_box', 'sqm_per_box', 'boxes_per_pallet', 'in_pallet_qty', 'country', 'weight_unit',
        'price_official', 'price_retail', 'price_wholesale', 'currency',
        'stock_yanino', 'stock_factory',
        'description', 'seo_title', 'seo_description', 'seo_keywords',
        'images', 'main_image', 'technical_specs', 'faq', 'related_products',
        'installation_guide', 'views_count', 'sales_count', 'rating', 'reviews_count',
        'is_active', 'is_exclusive', 'is_new', 'is_bestseller', 'is_discount', 'sort_order', 'parsed_at'
    ];
    protected $casts = [
        'images' => 'array',
        'technical_specs' => 'array',
        'faq' => 'array',
        'related_products' => 'array',
        'rooms' => 'array',
        'is_active' => 'boolean',
        'is_new' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_discount' => 'boolean',
        'is_exclusive' => 'boolean',
        'parsed_at' => 'datetime',
    ];

    // Умный поиск активных товаров (БЕЗ отзывов!)
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInStock($query)
    {
        return $query->where(function($q) {
            $q->where('stock_yanino', '>', 0)
              ->orWhere('stock_factory', '>', 0);
        });
    }

    // === МЕТОДЫ ДЛЯ SEO ===
    public function getCanonicalUrl(): string
    {
        return route('product.show', $this->sku);
    }

    public function getSchemaOrgData(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $this->name,
            'description' => $this->description ?? $this->seo_description ?? $this->name,
            'sku' => $this->sku,
            'mpn' => $this->sku, // Required for Google Shopping
            'brand' => [
                '@type' => 'Brand',
                'name' => $this->brand ?? 'Cersanit'
            ],
            'offers' => [
                '@type' => 'Offer',
                'url' => $this->getCanonicalUrl(),
                'priceCurrency' => 'RUB',
                'price' => $this->price_retail,
                'itemCondition' => 'https://schema.org/NewCondition',
                'availability' => ($this->stock_yanino + $this->stock_factory) > 0 
                    ? 'https://schema.org/InStock' 
                    : 'https://schema.org/OutOfStock',
            ]
        ];
    }

    /**
     * Parse description and extract structured data
     * @return array
     */
    public function getParsedDescription(): array
    {
        $result = [
            'main_image' => null,
            'collection_image' => null,
            'technical_images' => [],
            'text_lines' => []
        ];

        if (empty($this->description)) {
            return $result;
        }

        $lines = explode("\n", $this->description);

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) continue;

            // Check if line has image URLs
            if (preg_match('/(Фото\s+плиты|Фото\s+Коллекции|Фото\s+коллекции|Изображение|Photo):?\s*(.+)/i', $line, $matches)) {

                // Remove script tags, but allow the img tag
                $imageUrls = trim($matches[2]);

                // Clean up URLs (remove HTML tags and extra spaces)
                $imageUrls = strip_tags($imageUrls);

                if (strpos($imageUrls, ';') !== false) {
                    // Multiple URLs - take the first one
                    $urls = explode(';', $imageUrls);
                    $imageUrl = trim($urls[0]);
                } else {
                    $imageUrl = $imageUrls;
                }

                if (!empty($imageUrl)) {
                    // Determine which image field it belongs to
                    if (stripos($matches[1], 'плиты') !== false || stripos($matches[1], 'plates') !== false) {
                        if (!$result['main_image']) {
                            $result['main_image'] = $imageUrl;
                        } else {
                            $result['technical_images'][] = $imageUrl;
                        }
                    } elseif (stripos($matches[1], 'Коллекции') !== false || stripos($matches[1], 'collection') !== false) {
                        $result['collection_image'] = $imageUrl;
                    } else {
                        $result['technical_images'][] = $imageUrl;
                    }
                }
            } else if (preg_match('/https?:\/\/.+\.jpg|https?:\/\/.+\.png/i', $line)) {
                // If it's a line with just a URL
                $result['technical_images'][] = $line;
            } else {
                // Regular text line
                $result['text_lines'][] = $line;
            }
        }

        return $result;
    }
}
