 @extends('layout')

  @section('title', $seoTitle ?? 'Каталог продукции LINCER')
  @section('meta_description', $seoDescription ?? 'Керамическая плитка и керамогранит LINCER по оптовым ценам. Прямые поставки со склада.')

  @section('content')
  @php
  use Illuminate\Support\Str;
  @endphp

  <div class="min-h-screen">
      {{-- Header каталога --}}
      <div class="bg-white border-b border-gray-200">
          <div class="container mx-auto px-4 lg:px-6 py-6">
              <div>
                  <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{{ $seoH1 ?? 'Каталог LINCER' }}</h1>
                  <div class="flex flex-row flex-wrap gap-3">
                      <a href="/collections" class="group flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl p-4 transition-all
   hover:shadow-md">
                          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0
  012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                              </svg>
                          </div>
                          <div>
                              <span class="font-semibold text-gray-900 group-hover:text-blue-700">Коллекции</span>
                              <p class="text-xs text-gray-500">Все коллекции LINCER</p>
                          </div>
                      </a>
                      <a href="/catalog?category=ceramic-granite" class="group flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border
  border-purple-200 rounded-xl p-4 transition-all hover:shadow-md">
                          <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2
   2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                              </svg>
                          </div>
                          <div>
                              <span class="font-semibold text-gray-900 group-hover:text-purple-700">Керамогранит</span>
                              <p class="text-xs text-gray-500">Прочный и износостойкий</p>
                          </div>
                      </a>
                      <a href="/catalog?category=wall-tile" class="group flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200
  rounded-xl p-4 transition-all hover:shadow-md">
                          <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0
  01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                              </svg>
                          </div>
                          <div>
                              <span class="font-semibold text-gray-900 group-hover:text-green-700">Настенная плитка</span>
                              <p class="text-xs text-gray-500">Для стен и фартуков</p>
                          </div>
                      </a>
                  </div>
                  <p class="text-gray-500 text-sm mt-4">{{ $products->total() }} товаров</p>
              </div>
          </div>
      </div>

      <div class="container mx-auto px-4 lg:px-6 py-6">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {{-- Filters Sidebar --}}
              <aside class="lg:col-span-1">
                  <div class="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-20">
                      <div class="p-4 border-b border-gray-100">
                          <h2 class="font-semibold text-lg text-gray-900">Фильтры</h2>
                      </div>

                      <form id="filter-form" method="GET" action="{{ route('catalog.index') }}" class="divide-y divide-gray-100">
                          {{-- Ассортимент --}}
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="assortment-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Ассортимент</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="assortment-filter" class="filter-content mt-3 space-y-2.5">
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="is_exclusive" value="1" {{ request('is_exclusive') ? 'checked' : '' }} class="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500
  cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Эксклюзив</span>
                                  </label>
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="is_new" value="1" {{ request('is_new') ? 'checked' : '' }} class="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500
  cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Новинка</span>
                                  </label>
                              </div>
                          </div>

                          {{-- Тип плитки --}}
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="type-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Тип плитки</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="type-filter" class="filter-content mt-3 space-y-2.5">
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="categories[]" value="ceramic-tile" {{ in_array('ceramic-tile', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600
  focus:ring-blue-500 cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Керамическая плитка</span>
                                  </label>
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="categories[]" value="ceramic-granite" {{ in_array('ceramic-granite', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600
  focus:ring-blue-500 cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Керамогранит</span>
                                  </label>
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="categories[]" value="mosaic" {{ in_array('mosaic', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500
  cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Мозаика</span>
                                  </label>
                                  <label class="flex items-center gap-3 cursor-pointer group">
                                      <input type="checkbox" name="categories[]" value="step" {{ in_array('step', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500
  cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Ступени</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input type="checkbox" name="categories[]" value="mosaic-mesh" {{ in_array('mosaic-mesh', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
<span class="text-sm text-gray-700 group-hover:text-gray-900">Мозаика на сетке</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input type="checkbox" name="categories[]" value="wall-insert" {{ in_array('wall-insert', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
<span class="text-sm text-gray-700 group-hover:text-gray-900">Настенная вставка</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input type="checkbox" name="categories[]" value="glass-special" {{ in_array('glass-special', (array)request('categories', [])) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
<span class="text-sm text-gray-700 group-hover:text-gray-900">Стеклянный спецэлемент</span>
                                  </label>
                              </div>
                          </div>

                          {{-- Цена --}}
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="price-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Цена, ₽</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="price-filter" class="filter-content mt-3">
                                  <div class="flex gap-2">
                                      <input type="number" name="priceMin" value="{{ $priceMin }}" placeholder="от" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                                      <input type="number" name="priceMax" value="{{ $priceMax }}" placeholder="до" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                                  </div>
                              </div>
                          </div>

                          {{-- Цвет --}}
                          @if($colorsData->count() > 0)
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="color-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Цвет</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="color-filter" class="filter-content mt-3 max-h-40 overflow-y-auto space-y-2">
                                  @foreach($colorsData as $item)
                                  <label class="flex items-center gap-3 cursor-pointer group py-1">
                                      <input type="checkbox" name="colors[]" value="{{ $item->color }}" {{ in_array($item->color, $selectedColors) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 rounded
  text-blue-600 focus:ring-blue-500 cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{{ $item->color }}</span>
                                      <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ $item->count }}</span>
                                  </label>
                                  @endforeach
                              </div>
                          </div>
                          @endif

                          {{-- Формат --}}
                          @if($formatsData->count() > 0)
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="format-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Формат, см</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="format-filter" class="filter-content mt-3 max-h-40 overflow-y-auto space-y-2">
                                  @foreach($formatsData as $item)
                                  <label class="flex items-center gap-3 cursor-pointer group py-1">
                                      <input type="checkbox" name="formats[]" value="{{ $item->format }}" {{ in_array($item->format, $selectedFormats) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 rounded
  text-blue-600 focus:ring-blue-500 cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{{ $item->format }}</span>
                                      <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ $item->count }}</span>
                                  </label>
                                  @endforeach
                              </div>
                          </div>
                          @endif

                          {{-- Поверхность --}}
                          @if($surfacesData->count() > 0)
                          <div class="filter-group p-4">
                              <button type="button" class="filter-header flex justify-between items-center w-full group" data-target="surface-filter">
                                  <span class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Поверхность</span>
                                  <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                  </svg>
                              </button>
                              <div id="surface-filter" class="filter-content mt-3 max-h-40 overflow-y-auto space-y-2">
                                  @foreach($surfacesData as $item)
                                  <label class="flex items-center gap-3 cursor-pointer group py-1">
                                      <input type="checkbox" name="surfaces[]" value="{{ $item->surface }}" {{ in_array($item->surface, $selectedSurfaces) ? 'checked' : '' }} class="w-4 h-4 border-gray-300 rounded
  text-blue-600 focus:ring-blue-500 cursor-pointer">
                                      <span class="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{{ $item->surface }}</span>
                                      <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ $item->count }}</span>
                                  </label>
                                  @endforeach
                              </div>
                          </div>
                          @endif
                      </form>

                      {{-- Кнопки фильтров --}}
                      <div class="p-4 pt-0 border-t border-gray-100">
                          <button type="submit" form="filter-form" class="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                              Применить
                          </button>
                          <a href="{{ route('catalog.index') }}" class="block w-full text-center mt-2 text-gray-500 px-4 py-2 text-sm hover:text-gray-700 transition underline">
                              Сбросить фильтры
                          </a>
                      </div>
                  </div>
              </aside>

              {{-- Main Content --}}
              <div class="lg:col-span-3">
                  {{-- Toolbar --}}
                  <div class="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p class="text-gray-600 text-sm">
                          Найдено: <span class="font-semibold text-gray-900">{{ $products->total() }}</span>
                      </p>
                      <div class="flex items-center gap-3">
                          <label class="text-sm text-gray-600 font-medium">Сортировка:</label>
                          <select id="sort-select" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer
  transition">
                              <option value="name-asc" {{ $sort === 'name' && $order === 'asc' ? 'selected' : '' }}>По названию (А-Я)</option>
                              <option value="name-desc" {{ $sort === 'name' && $order === 'desc' ? 'selected' : '' }}>По названию (Я-А)</option>
                              <option value="price-asc" {{ $sort === 'price' && $order === 'asc' ? 'selected' : '' }}>По цене ↑</option>
                              <option value="price-desc" {{ $sort === 'price' && $order === 'desc' ? 'selected' : '' }}>По цене ↓</option>
                          </select>
                      </div>
                  </div>

                  @if($products->isEmpty())
                  <div class="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
                      <p class="text-gray-600 mb-6">По вашему запросу товары не найдены</p>
                      <a href="{{ route('catalog.index') }}" class="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Показать все товары
                      </a>
                  </div>
                  @else
                      {{-- Products Grid --}}
                      @include('catalog.product-grid')
                  @endif
                  
                  {{-- SEO Text Block --}}
                  @if(!empty($seoText))
                  <div class="mt-12 bg-white rounded-xl border border-gray-200 p-8 shadow-sm prose prose-blue max-w-none">
                      <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $seoH1 ?? 'Каталог' }} оптом и в розницу</h2>
                      <p class="text-gray-600 leading-relaxed">{{ $seoText }}</p>
                  </div>
                  @endif
              </div>
          </div>
      </div>
  </div>

  {{-- JavaScript for Filters --}}
  <script>
  document.addEventListener('DOMContentLoaded', function() {
      // Filter accordion functionality
      document.querySelectorAll('.filter-header').forEach(header => {
          header.addEventListener('click', function() {
              const content = document.getElementById(this.dataset.target);
              const icon = this.querySelector('svg');
              content.classList.toggle('hidden');
              icon.classList.toggle('rotate-180');
          });
      });

      // Sorting
      document.getElementById('sort-select').addEventListener('change', function() {
          const [sort, order] = this.value.split('-');
          const url = new URL(window.location.href);
          url.searchParams.set('sort', sort);
          url.searchParams.set('order', order);
          window.location.href = url.toString();
      });

                // Auto-submit form on filter change - работаем со всеми чекбоксами фильтров
                document.querySelectorAll('#filter-form input[type="checkbox"]').forEach(input => {
                    input.addEventListener('change', function() {
                        document.getElementById('filter-form').submit();
                    });
                });

      // Auto-submit for price inputs on blur
      document.querySelectorAll('input[name="priceMin"], input[name="priceMax"]').forEach(input => {
          input.addEventListener('blur', function() {
              document.getElementById('filter-form').submit();
          });
      });
  });
  </script>

  <style>
    .filter-group {
        border-radius: 0.75rem;
        transition: all 0.3s ease;
    }
    .filter-header svg {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .product-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }
    .sticky-sidebar {
        top: 5rem;
        max-height: calc(100vh - 6rem);
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 10px;
    }
  </style>
  @endsection
