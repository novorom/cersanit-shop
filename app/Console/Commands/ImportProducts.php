<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportProducts extends Command
{
    protected $signature = 'products:import {--file=otch/products_full.xlsx : Path to Excel file}';
    protected $description = 'Import products from Excel file';

    public function handle()
    {
        $file = $this->option('file');
        $fullPath = base_path($file);

        if (!file_exists($fullPath)) {
            $this->error("File not found: {$fullPath}");
            return 1;
        }

        $this->info("Loading file: {$fullPath}");

        try {
            $spreadsheet = IOFactory::load($fullPath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();

            if (count($rows) < 2) {
                $this->error("No data found in file");
                return 1;
            }

            $header = array_shift($rows);
            $imported = 0;
            $skipped = 0;

            // Map of Excel column names to our attributes
            $columnMap = [
                'Код BSU' => 'sku',
                'Наименование для сайта' => 'name',
                'Артикул' => 'desc_sku',
                'Артикул цифровой' => 'desc_sku_digital',
                'Наименование' => 'desc_name',
                'Фото плиты' => 'main_image',
                'Коллекция' => 'collection',
                'Цвет плитки' => 'color',
                'Формат плиты номинальный' => 'format',
                'Вид поверхности' => 'surface',
                'Материал' => 'material_type',
                'Назначение' => 'application',
                'Толщина плитки (см)' => 'thickness',
            ];

            // Find column indices
            $columnIndices = [];
            foreach ($columnMap as $excelName => $attr) {
                $index = array_search($excelName, $header);
                if ($index !== false) {
                    $columnIndices[$attr] = $index;
                    $this->info("Found column '$excelName' at index $index for attribute '$attr'");
                } else {
                    $this->warn("Column '$excelName' not found in header");
                }
            }

            // Check required columns
            if (!isset($columnIndices['sku']) || !isset($columnIndices['name'])) {
                $this->error("Required columns not found: Код BSU and Наименование для сайта");
                return 1;
            }

            $this->info("Found columns: " . implode(', ', array_keys($columnIndices)));

            // Process rows
            foreach ($rows as $rowIndex => $row) {
                if (empty(array_filter($row))) {
                    continue; // Skip empty rows
                }

                $sku = $row[$columnIndices['sku']] ?? null;
                $name = $row[$columnIndices['name']] ?? null;

                if (empty($sku) || empty($name)) {
                    $skipped++;
                    continue;
                }

                // Build description from all columns
                $descriptionParts = [];
                foreach ($header as $colIndex => $colName) {
                    if (isset($row[$colIndex]) && $row[$colIndex] !== '' && $row[$colIndex] !== null) {
                        $descriptionParts[] = $colName . ': ' . $row[$colIndex];
                    }
                }
                $description = implode("\n", $descriptionParts);

                // Update or create product
                $product = Product::firstOrNew(['sku' => $sku]);
                $product->name = $name;
                $product->slug = Str::slug($name . '-' . $sku);
                $product->description = $description;
                $product->brand = 'Lincer';
                $product->is_active = true;

                // Set main image if found (take first if multiple separated by semicolon)
                if (isset($columnIndices['main_image']) && isset($row[$columnIndices['main_image']])) {
                    $imageValue = trim($row[$columnIndices['main_image']]);
                    // Split by semicolon and take the first image
                    $images = explode(';', $imageValue);
                    $product->main_image = trim($images[0]);
                    $this->info("Set image for product $sku: " . $product->main_image);
                }

                // Additional data fields
                if (isset($columnIndices['desc_sku'])) {
                    $product->desc_sku = $row[$columnIndices['desc_sku']] ?? null;
                }
                if (isset($columnIndices['desc_sku_digital'])) {
                    $product->desc_sku_digital = $row[$columnIndices['desc_sku_digital']] ?? null;
                }
                if (isset($columnIndices['desc_name'])) {
                    $product->desc_name = $row[$columnIndices['desc_name']] ?? null;
                }
                if (isset($columnIndices['collection'])) {
                    $product->collection = $row[$columnIndices['collection']] ?? null;
                }
                if (isset($columnIndices['color'])) {
                    $product->color = $row[$columnIndices['color']] ?? null;
                }
                if (isset($columnIndices['format'])) {
                    $product->format = $row[$columnIndices['format']] ?? null;
                }
                if (isset($columnIndices['surface'])) {
                    $product->surface = $row[$columnIndices['surface']] ?? null;
                }
                if (isset($columnIndices['material_type'])) {
                    $product->material_type = $row[$columnIndices['material_type']] ?? null;
                }
                if (isset($columnIndices['application'])) {
                    $product->application = $row[$columnIndices['application']] ?? null;
                }
                if (isset($columnIndices['thickness'])) {
                    $product->thickness = $row[$columnIndices['thickness']] ?? null;
                }

                $product->save();
                $imported++;

                if ($imported % 50 === 0) {
                    $this->info("Imported {$imported} products...");
                }
            }

            $this->info("Import completed! Imported: {$imported}, Skipped: {$skipped}");
            return 0;

        } catch (\Exception $e) {
            $this->error("Error importing products: " . $e->getMessage());
            return 1;
        }
    }
}