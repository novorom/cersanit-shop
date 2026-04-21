<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportFactoryXlsCommand extends Command
{
    protected $signature = 'import:factory-xls {file}';
    protected $description = 'Импорт остатков Завода напрямую из оригинального Excel файла Lincer';

    public function handle()
    {
        $filePath = $this->argument('file');

        if (!file_exists($filePath)) {
            $this->error("❌ Файл не найден: {$filePath}");
            return 1;
        }

        $this->info("🏭 Читаем заводские остатки из файла Excel: {$filePath}");

        try {
            // Библиотека сама распаковывает XLS/XLSX файл
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();
        } catch (\Exception $e) {
            $this->error("❌ Ошибка чтения файла Excel: " . $e->getMessage());
            return 1;
        }

        // Обнуляем старые остатки Завода
        Product::query()->update(['stock_factory' => 0]);
        $this->info("♻️ Старые остатки Завода обнулены.");

        $bar = $this->output->createProgressBar(count($rows));
        $bar->start();

        $updatedCount = 0;

        foreach ($rows as $index => $row) {
            // Пропускаем шапку (в файле Линцера это первые 8-9 строк)
            if ($index < 8 || empty($row) || !isset($row[0])) {
                $bar->advance();
                continue;
            }

            // Артикул BSU находится в 5-й колонке (индекс 4)
            $sku = trim((string) ($row[4] ?? ''));
            
            // Если BSU пустой (бывает у новинок), страхуемся и берем обычный Артикул (индекс 3)
            if (empty($sku)) {
                $sku = trim((string) ($row[3] ?? ''));
            }

            // Пропускаем пустые строки или названия групп
            if (empty($sku) || mb_strtolower($sku) === 'bsu' || mb_strlen($sku) < 3) {
                $bar->advance();
                continue;
            }

            // Свободный остаток "Итого" находится в 16-й колонке (индекс 15)
            if (isset($row[15])) {
                $rawStock = (string) $row[15];
                // Убираем пробелы и меняем запятую на точку
                $stock = (float) str_replace([' ', ','], ['', '.'], $rawStock);

                if ($stock > 0) {
                    $updated = Product::where('sku', $sku)->update(['stock_factory' => $stock]);
                    if ($updated) {
                        $updatedCount++;
                    }
                }
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("✅ Готово! Обновлены остатки Завода для {$updatedCount} товаров.");
        return 0;
    }
}
