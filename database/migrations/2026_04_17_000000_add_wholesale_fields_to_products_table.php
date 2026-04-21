<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('weight_unit', 8, 3)->nullable()->after('thickness'); // Вес за единицу (м2 или шт)
            $table->integer('boxes_per_pallet')->nullable()->after('sqm_per_box'); // Коробок в паллете
            $table->string('unit_type')->default('м2')->after('name'); // Единица измерения (м2, шт, пог. м)
            $table->decimal('in_pallet_qty', 10, 3)->nullable()->after('boxes_per_pallet'); // м2 в паллете
            $table->string('manufacturer')->nullable()->after('brand'); // Прямой производитель/завод
            $table->boolean('is_exclusive')->default(false)->after('is_active');
            $table->string('external_id')->nullable()->index()->after('sku'); // ID во внешней системе (Lincer)
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'weight_unit', 
                'boxes_per_pallet', 
                'unit_type', 
                'in_pallet_qty', 
                'manufacturer',
                'is_exclusive',
                'external_id'
            ]);
        });
    }
};
