<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class SetPlaceholderImages extends Command
{
    protected $signature = 'set:placeholders';
    protected $description = 'Установить placeholder изображения';

    public function handle()
    {
        $products = Product::whereNull('images')->orWhereJsonLength('images', 0)->get();

        if ($products->isEmpty()) {
            $this->info('✅ У всех товаров уже есть изображения!');
            return 0;
        }

        $bar = $this->output->createProgressBar($products->count());
        $bar->start();

        foreach ($products as $product) {
            $color = 'e5e7eb';
            $size = '600x600';
            
            $placeholders = [
                "https://placehold.co/{$size}/{$color}/white?text=" . urlencode($product->collection ?: 'Lincer')
            ];
            
            $product->update(['images' => $placeholders]);
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("✅ Готово: {$products->count()}");
        return 0;
    }
}
