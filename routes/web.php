<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CollectionController;
use App\Services\ReportParserService;
use Illuminate\Http\Request;
use App\Console\Commands\ImportProducts;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SeoController;

// Static & Landing Pages
Route::get('/wholesale', function () {
    return view('wholesale.index');
})->name('wholesale.index');

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// SEO & Feeds
Route::get('/sitemap.xml', [SeoController::class, 'sitemap'])->name('sitemap.xml');
Route::get('/sitemap-products.xml', [SeoController::class, 'productsSitemap'])->name('sitemap.products');
Route::get('/robots.txt', [SeoController::class, 'robots'])->name('robots');
Route::get('/google-shopping.xml', [SeoController::class, 'googleShopping'])->name('google.shopping');
Route::get('/ai-feed.xml', [SeoController::class, 'aiFeed'])->name('seo.ai-feed');


Route::get('/', function () {
    // Получаем хиты из базы данных (Lincer)
    $bestsellers = \App\Models\Product::where('is_active', true)
        ->inRandomOrder()
        ->take(6)
        ->get();

    return view('homepage', [
        'bestsellers' => $bestsellers
    ]);
})->name('home');

// Collection routes - visual display
Route::get('/collections', [CollectionController::class, 'index'])->name('collections.index');
Route::get('/collections/{collection}', [CollectionController::class, 'show'])->name('collection.show');

// Catalog and product routes
Route::get('/catalog', [ProductController::class, 'index'])->name('catalog.index');
Route::get('/product/{sku}', [ProductController::class, 'show'])->name('product.show');

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
Route::get('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
Route::post('/cart/order', [CartController::class, 'order'])->name('cart.order');
Route::get('/order/success/{orderNumber}', [CartController::class, 'success'])->name('order.success');
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');

// File upload for automatic parsing (to be implemented)
Route::middleware(['auth'])->group(function () {
    // These routes would handle automatic parsing when new files are uploaded
    // For now, they return a placeholder response

    Route::get('/admin/uploads', function () {
        return view('uploads.index');
    })->name('uploads.index');

    Route::post('/admin/uploads/parse', function (Request $request) {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
        ]);

        // Placeholder for automatic parsing logic
        // In production, this would:
        // 1. Store the file
        // 2. Queue a job to parse it
        // 3. Return a success message

        return back()->with('success', 'File uploaded successfully. Parsing will begin shortly.');
    })->name('uploads.parse');
});
