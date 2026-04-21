<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @param Request $request
     * @return View
     */
    public function index(Request $request): View
    {
        $query = Product::where('is_active', true);

        // Фильтр по категориям (типу продукции) - множественный выбор
        $selectedCategories = $request->get('categories', []);
        if (!empty($selectedCategories)) {
            $query->where(function($q) use ($selectedCategories) {
                foreach ($selectedCategories as $category) {
                    if ($category === 'ceramic-tile') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Плитк%', '%плитк%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Плитк%', '%плитк%']);
                        });
                    } elseif ($category === 'ceramic-granite') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Керамогранит%', '%керамогранит%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Керамогранит%', '%керамогранит%']);
                        });
                    } elseif ($category === 'mosaic') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Мозаик%', '%мозаик%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Мозаик%', '%мозаик%']);
                        });
                    } elseif ($category === 'mosaic-mesh') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Мозаика на сетк%', '%мозаика на сетк%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Мозаика на сетк%', '%мозаика на сетк%']);
                        });
                    } elseif ($category === 'wall-tile') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Настенн%', '%настенн%'])
                                ->orWhereRaw('application LIKE ? OR application LIKE ?', ['%Стена%', '%стена%']);
                        });
                    } elseif ($category === 'wall-insert') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('name LIKE ? OR name LIKE ?', ['%Вставк%', '%вставк%'])
                                ->orWhereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Вставк%', '%вставк%']);
                        });
                    } elseif ($category === 'step') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('name LIKE ? OR name LIKE ?', ['%Ступен%', '%ступен%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Ступень%', '%ступень%']);
                        });
                    } elseif ($category === 'border') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('name LIKE ? OR name LIKE ?', ['%Бордюр%', '%бордюр%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Плинтус%', '%плинтус%']);
                        });
                    } elseif ($category === 'glass-special') {
                        $q->orWhere(function($subQ) {
                            $subQ->whereRaw('material_type LIKE ? OR material_type LIKE ?', ['%Стеклянн%', '%стеклянн%'])
                                ->orWhereRaw('name LIKE ? OR name LIKE ?', ['%Стеклянн%', '%стеклянн%']);
                        });
                    }
                }
            });
        }

        // Фильтр по коллекциям
        $selectedCollections = $request->get('collections', []);
        if (!empty($selectedCollections)) {
            $query->whereIn('collection', $selectedCollections);
        }

        // Фильтр по цветам
        $selectedColors = $request->get('colors', []);
        if (!empty($selectedColors)) {
            $query->whereIn('color', $selectedColors);
        }

        // Фильтр по форматам
        $selectedFormats = $request->get('formats', []);
        if (!empty($selectedFormats)) {
            $query->whereIn('format', $selectedFormats);
        }

        // Фильтр по поверхности
        $selectedSurfaces = $request->get('surfaces', []);
        $selectedDesigns = $request->get('designs', []);
        if (!empty($selectedSurfaces)) {
            $query->whereIn('surface', $selectedSurfaces);
        }

        // Поиск
        $search = $request->get('search', '');
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('sku', 'like', '%' . $search . '%')
                    ->orWhere('collection', 'like', '%' . $search . '%')
                    ->orWhere('color', 'like', '%' . $search . '%')
                    ->orWhere('material_type', 'like', '%' . $search . '%');
            });
        }

        // Фильтр по цене
        $priceMin = $request->get('priceMin', '');
        $priceMax = $request->get('priceMax', '');
        if ($priceMin !== '' && $priceMin !== null) {
            $query->where('price_retail', '>=', floatval($priceMin));
        }
        if ($priceMax !== '' && $priceMax !== null) {
            $query->where('price_retail', '<=', floatval($priceMax));
        }

        // Сортировка
        $sort = $request->get('sort', 'name');
        $order = $request->get('order', 'asc');
        if ($sort === 'price') {
            $query->orderBy('price_retail', $order);
        } else {
            $query->orderBy('name', $order);
        }

        // Данные для фильтров
        $collectionsData = Product::select('collection', DB::raw('COUNT(*) as count'))
            ->whereNotNull('collection')->where('is_active', true)->groupBy('collection')->orderBy('collection')->get();
        $colorsData = Product::select('color', DB::raw('COUNT(*) as count'))
            ->whereNotNull('color')->where('is_active', true)->groupBy('color')->orderBy('color')->get();
        $formatsData = Product::select('format', DB::raw('COUNT(*) as count'))
            ->whereNotNull('format')->where('is_active', true)->groupBy('format')->orderBy('format')->get();
        $surfacesData = Product::select('surface', DB::raw('COUNT(*) as count'))
            ->whereNotNull('surface')->where('is_active', true)->groupBy('surface')->orderBy('surface')->get();

        $priceRange = Product::where('is_active', true)->whereNotNull('price_retail')
            ->selectRaw('MIN(price_retail) as min, MAX(price_retail) as max')->first();

        $products = $query->paginate(12);

        // SEO logic based on filters
        $siteName = 'LINCER';
        $seoTitle = $siteName . ' — Магазин плитки и керамогранита';
        $seoDescription = 'Широкий выбор керамической плитки и керамогранита. Оптовые цены, наличие на складе, доставка.';
        $seoH1 = 'Каталог продукции';
        $seoText = '';

        if (count($selectedCategories) === 1) {
            $cat = $selectedCategories[0];
            if ($cat === 'ceramic-granite') {
                $seoTitle = 'Керамогранит купить в СПб оптом и в розницу — цены в каталоге ' . $siteName;
                $seoDescription = 'Большой выбор премиального керамогранита. Различные форматы, цвета и фактуры (под мрамор, бетон, дерево). Оптовые цены, быстрая доставка по Санкт-Петербургу.';
                $seoH1 = 'Керамогранит';
                $seoText = 'Керамогранит — это современный, износостойкий и долговечный материал, который идеально подходит как для жилых интерьеров, так и для коммерческих помещений. В нашем каталоге представлены популярные коллекции с текстурами под мрамор, дерево и бетон. Мы предлагаем выгодные оптовые цены и гарантию качества от ведущих производителей.';
            } elseif ($cat === 'ceramic-tile' || $cat === 'wall-tile') {
                $seoTitle = 'Керамическая плитка купить оптом в СПб — каталог цен ' . $siteName;
                $seoDescription = 'Стильная керамическая плитка для ванной и кухни. Модные коллекции, высокое качество. Купить оптом со склада с доставкой.';
                $seoH1 = 'Керамическая плитка';
                $seoText = 'Керамическая плитка остается классическим выбором для отделки ванных комнат, санузлов и кухонных фартуков. Она экологична, легко моется и не теряет своего внешнего вида годами. В ассортименте магазина LINCER собраны лучшие решения: от минимализма до сложных декоративных элементов и панно.';
            } elseif ($cat === 'step') {
                $seoTitle = 'Ступени из керамогранита для лестниц — купить в СПб';
                $seoH1 = 'Ступени';
                $seoText = 'Монолитные ступени из керамогранита — надежное решение для отделки лестниц внутри дома и на улице. Они устойчивы к перепадам температур, влаге и высоким нагрузкам. Заказывайте ступени с капиносом и подступенками по оптовым ценам.';
            }
        }

        if (count($selectedColors) === 1) {
            $color = $selectedColors[0];
            $seoTitle = mb_convert_case($color, MB_CASE_TITLE, "UTF-8") . ' керамогранит и плитка — купить в ' . $siteName;
            $seoH1 = 'Плитка ' . $color . ' цвета';
        }

        if (count($selectedFormats) === 1) {
            $format = $selectedFormats[0];
            $seoTitle = 'Плитка формата ' . $format . ' — каталог ' . $siteName;
            $seoH1 = 'Плитка ' . $format;
        }

        if (count($selectedCollections) === 1) {
            $col = $selectedCollections[0];
            $seoTitle = 'Коллекция ' . $col . ' — фото, цены, наличие в СПб';
            $seoH1 = 'Коллекция ' . $col;
        }

        return view('catalog.index', [
            'products' => $products,
            'collectionsData' => $collectionsData,
            'colorsData' => $colorsData,
            'formatsData' => $formatsData,
            'surfacesData' => $surfacesData,
            'priceRange' => $priceRange,
            'selectedColors' => (array) $selectedColors,
            'selectedFormats' => (array) $selectedFormats,
            'selectedSurfaces' => (array) $selectedSurfaces,
            'selectedDesigns' => (array) $selectedDesigns,
            'priceMin' => $priceMin,
            'priceMax' => $priceMax,
            'sort' => $sort,
            'order' => $order,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoH1' => $seoH1,
            'seoText' => $seoText,
        ]);
    }

    /**
     * Display the specified product.
     *
     * @param string $sku
     * @return View
     */
    public function show(string $sku): View
    {
        $product = Product::where('sku', $sku)->firstOrFail();

        // Похожие товары из той же коллекции
        $relatedProducts = Product::where('collection', $product->collection)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        return view('catalog.show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
