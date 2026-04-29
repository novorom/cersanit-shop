<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportLincerCommand extends Command
{
    protected $signature = 'import:lincer {--fresh : Очистить таблицу перед импортом}';
    protected $description = 'Импорт товаров Lincer из JSON файла (201 товар из прайса)';

    public function handle()
    {
        $this->info('🚀 Начинаем импорт товаров Lincer...');
        
        // Проверяем наличие файла
        if (!Storage::exists('lincer_products.json')) {
            $this->error('❌ Файл lincer_products.json не найден в storage/app/');
            $this->info('💡 Скопируйте файл lincer_products.json в storage/app/');
            return 1;
        }

        // Читаем JSON
        $json = Storage::get('lincer_products.json');
        $products = json_decode($json, true);

        if (!$products) {
            $this->error('❌ Ошибка чтения JSON файла');
            return 1;
        }

        $this->info("📦 Найдено товаров в файле: " . count($products));

        // Очистка таблицы если нужно
        if ($this->option('fresh')) {
            $this->warn('⚠️  Очищаем таблицу products...');
            Product::truncate();
        }

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();

        $imported = 0;
        $updated = 0;
        $errors = 0;

        foreach ($products as $data) {
            try {
                // Генерируем slug
                $slug = Str::slug($data['collection'] . ' ' . $data['size'] . ' ' . $data['sku']);
                
                // Извлекаем цвет из названия
                $color = $this->extractColor($data['name']);
                
                // Извлекаем поверхность
                $surface = $this->extractSurface($data['name']);
                
                // Определяем тип (керамогранит или плитка)
                $materialType = str_contains(mb_strtolower($data['type']), 'керамогранит') 
                    ? 'керамогранит' 
                    : 'плитка';

                // Проверяем существование по SKU
                $product = Product::where('sku', $data['sku'])->first();

                $productData = [
                    'sku' => $data['sku'],
                    'name' => $this->cleanName($data['name']),
                    'slug' => $slug,
                    'brand' => 'Lincer',
                    'collection' => $data['collection'],
                    'format' => $data['size'],
                    'surface' => $surface,
                    'color' => $color,
                    'material_type' => $materialType,
                    'application' => 'Универсальный',
                    'price_official' => $data['price_retail'],
                    'price_retail' => $data['price_our'],
                    'price_wholesale' => $data['price_our'] * 0.95, // Опт -5% от розницы
                    'discount_percent' => 20,
                    'discount_amount' => $data['discount'],
                    
                    // SEO (автогенерация)
                    'seo_title' => $this->generateTitle($data),
                    'seo_description' => $this->generateDescription($data),
                    'seo_keywords' => $this->generateKeywords($data),
                    
                    // Описание
                    'description' => $this->generateProductDescription($data),
                    
                    // Техническая информация
                    'technical_specs' => json_encode([
                        'Размер' => $data['size'] . ' см',
                        'Коллекция' => $data['collection'],
                        'Тип' => $materialType,
                        'Поверхность' => $surface,
                        'Цвет' => $color,
                        'Единица измерения' => $data['unit'],
                        'Бренд' => 'Lincer',
                        'Страна производства' => 'Польша',
                    ], JSON_UNESCAPED_UNICODE),
                    
                    // FAQ
                    'faq' => json_encode([
                        [
                            'question' => 'Где можно купить эту плитку?',
                            'answer' => 'Плитка в наличии на нашем складе в Янино. Самовывоз сегодня, доставка по СПб от 500₽.'
                        ],
                        [
                            'question' => 'Какая цена действует?',
                            'answer' => "Наша цена {$data['price_our']}₽/м² (официальная {$data['price_retail']}₽). Экономия {$data['discount']}₽ на каждом квадратном метре!"
                        ],
                        [
                            'question' => 'Есть ли в наличии?',
                            'answer' => 'Да, товар в наличии на складе в Янино-1. Уточните актуальные остатки по телефону или WhatsApp.'
                        ],
                        [
                            'question' => 'Сколько времени занимает доставка?',
                            'answer' => 'Самовывоз из Янино - сегодня. Доставка по СПб - на следующий день. С завода - 7 дней.'
                        ],
                    ], JSON_UNESCAPED_UNICODE),
                    
                    // Статус
                    'is_active' => true,
                    'is_new' => false, // Можно настроить логику
                    'is_bestseller' => false,
                    'is_discount' => true, // У нас всегда -20%
                    
                    'parsed_at' => now(),
                ];

                if ($product) {
                    $product->update($productData);
                    $updated++;
                } else {
                    Product::create($productData);
                    $imported++;
                }

            } catch (\Exception $e) {
                $errors++;
                $this->newLine();
                $this->error("❌ Ошибка импорта {$data['sku']}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        // Итоги
        $this->info("✅ Импорт завершен!");
        $this->table(
            ['Статус', 'Количество'],
            [
                ['Создано', $imported],
                ['Обновлено', $updated],
                ['Ошибок', $errors],
                ['Всего', $imported + $updated],
            ]
        );

        // Статистика по коллекциям
        $collections = Product::select('collection')
            ->groupBy('collection')
            ->selectRaw('collection, count(*) as count')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        $this->info("\n📊 Топ-10 коллекций:");
        $this->table(
            ['Коллекция', 'Товаров'],
            $collections->map(fn($c) => [$c->collection, $c->count])->toArray()
        );

        return 0;
    }

    private function cleanName($name)
    {
        // Убираем "Глаз. керамогранит" и т.п.
        $name = preg_replace('/^(Глаз\.|Керамогранит|Плитка)\s*/ui', '', $name);
        return trim($name);
    }

    private function extractColor($name)
    {
        $colors = [
            'бежевый' => 'бежевый',
            'светло-бежевый' => 'светло-бежевый',
            'темно-бежевый' => 'темно-бежевый',
            'серый' => 'серый',
            'светло-серый' => 'светло-серый',
            'темно-серый' => 'темно-серый',
            'белый' => 'белый',
            'черный' => 'черный',
            'коричневый' => 'коричневый',
            'многоцветный' => 'многоцветный',
        ];

        foreach ($colors as $pattern => $color) {
            if (mb_stripos($name, $pattern) !== false) {
                return $color;
            }
        }

        return 'натуральный';
    }

    private function extractSurface($name)
    {
        if (mb_stripos($name, 'рельеф') !== false) {
            return 'рельефная';
        }
        if (mb_stripos($name, 'глаз') !== false) {
            return 'глазурованная';
        }
        if (mb_stripos($name, 'мат') !== false) {
            return 'матовая';
        }
        if (mb_stripos($name, 'полиров') !== false) {
            return 'полированная';
        }
        return 'матовая';
    }

    private function generateTitle($data)
    {
        return sprintf(
            '%s %s %s купить в СПб - %s₽ (-20%%) | Lincer Янино',
            ucfirst($data['type']),
            $data['collection'],
            $data['size'],
            number_format($data['price_our'], 0, '.', ' ')
        );
    }

    private function generateDescription($data)
    {
        return sprintf(
            '%s %s %s см от официального дилера Lincer в СПб. Цена %s₽ вместо %s₽ (экономия %s₽). Склад Янино, самовывоз сегодня. Доставка по СПб от 500₽. Артикул: %s',
            ucfirst($data['type']),
            $data['collection'],
            $data['size'],
            number_format($data['price_our'], 0, '.', ' '),
            number_format($data['price_retail'], 0, '.', ' '),
            number_format($data['discount'], 0, '.', ' '),
            $data['sku']
        );
    }

    private function generateKeywords($data)
    {
        return implode(', ', [
            'lincer',
            mb_strtolower($data['collection']),
            $data['type'],
            $data['size'],
            'янино',
            'спб',
            'купить',
            'цена',
            'дилер',
            'официальный',
        ]);
    }

    private function generateProductDescription($data)
    {
        $color = $this->extractColor($data['name']);
        $surface = $this->extractSurface($data['name']);
        
        return <<<DESC
Коллекция {$data['collection']} от Lincer – это воплощение современного дизайна и высокого качества. 

**Основные характеристики:**
- Размер: {$data['size']} см
- Цвет: {$color}
- Поверхность: {$surface}
- Производство: Польша

**Преимущества покупки у нас:**
- ✅ Официальный дилер Lincer
- ✅ Цена {$data['price_our']}₽ вместо {$data['price_retail']}₽
- ✅ Экономия {$data['discount']}₽ на каждом м²
- ✅ Склад в Янино (самовывоз сегодня)
- ✅ Доставка по СПБ от 500₽
- ✅ С завода за 7 дней

**Где используется:**
Идеально подходит для отделки пола и стен в ванной комнате, кухне, прихожей, коммерческих помещениях.

**Гарантия качества:**
Вся продукция сертифицирована и имеет гарантию производителя.
DESC;
    }
}
