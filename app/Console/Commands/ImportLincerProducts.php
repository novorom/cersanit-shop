<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ImportLincerProducts extends Command
{
    protected $signature = 'lincer:import {file?} {--clear : Clear existing products}';
    protected $description = 'Import products from lincer_products.json';

    public function handle()
    {
        $filePath = $this->argument('file') ?? base_path('lincer_products.json');

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return 1;
        }

        if ($this->option('clear')) {
            $this->info("Clearing existing products...");
            DB::table('products')->truncate();
        }

        $json = File::get($filePath);
        $products = json_decode($json, true);

        if (!$products) {
            $this->error("Invalid JSON format in {$filePath}");
            return 1;
        }

        $this->info("Found " . count($products) . " products to import. Starting...");
        
        $bar = $this->output->createProgressBar(count($products));
        $bar->start();

        foreach ($products as $item) {
            // Determine type and format
            $materialType = $item['material_type'] ?? "Плитка";
            if (!$materialType || $materialType === 'Unknown') {
                if (stripos($item['name'], 'керамогранит') !== false) {
                    $materialType = "Керамогранит";
                } elseif (stripos($item['name'], 'мозаик') !== false) {
                    $materialType = "Мозаика";
                } elseif (stripos($item['name'], 'декор') !== false || stripos($item['name'], 'вставк') !== false || stripos($item['name'], 'панно') !== false) {
                    $materialType = "Декор";
                } elseif (stripos($item['name'], 'бордюр') !== false) {
                    $materialType = "Бордюр";
                } else {
                    $materialType = "Плитка";
                }
            }
            
            $application = $item['application'] ?? "Универсальная";
            if (!$application || $application === 'Unknown' || $application === 'Универсальная') {
                if (stripos($item['name'], 'д/пол') !== false || stripos($item['name'], 'для пола') !== false || stripos($item['name'], 'напольн') !== false) {
                    $application = "Пол";
                } elseif (stripos($item['name'], 'д/стен') !== false || stripos($item['name'], 'для стен') !== false || stripos($item['name'], 'настенн') !== false) {
                    $application = "Стена";
                }
            }

            // Price calculations
            $priceRetail = $item['price'];
            $priceWholesale = $item['price'] * 0.85; 

            Product::updateOrCreate(
                ['sku' => $item['sku']],
                [
                    'name' => $item['name'],
                    'slug' => Str::slug($item['name'] . '-' . $item['sku']),
                    'brand' => $item['brand'],
                    'collection' => $item['collection'],
                    'material_type' => $materialType,
                    'application' => $application,
                    'format' => $item['format'] ?? null,
                    'surface' => $item['surface'] ?? null,
                    'color' => $item['color'] ?? null,
                    'price_retail' => $priceRetail,
                    'price_wholesale' => $priceWholesale,
                    'stock_yanino' => rand(10, 500), 
                    'stock_factory' => rand(50, 1000), 
                    'main_image' => $item['image'],
                    'is_active' => true,
                ]
            );

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nImport completed successfully!");
        return 0;
    }
}
