{{-- Сетка товаров --}}
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
    @foreach($products as $product)
    <div class="product-card bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
        {{-- Изображение --}}
        <div class="relative aspect-square bg-gray-50 overflow-hidden">
            <a href="{{ route('product.show', ['sku' => $product->sku]) }}" class="block w-full h-full">
                <div class="w-full h-full flex items-center justify-center p-3">
                    @if($product->main_image)
                        <img src="{{ $product->main_image }}" alt="{{ $product->name }}"
                            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300">
                    @else
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                            <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    @endif
                </div>
            </a>

            {{-- Бейджи --}}
            <div class="absolute top-2 left-2 flex flex-col gap-1">
                @if($product->stock_yanino > 0)
                    <span class="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                        В наличии
                    </span>
                @elseif($product->stock_factory > 0)
                    <span class="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                        Под заказ
                    </span>
                @endif
                @if(request('is_exclusive') || $product->is_exclusive)
                    <span class="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                        Эксклюзив
                    </span>
                @endif
            </div>
        </div>

        {{-- Контент карточки --}}
        <div class="p-3 flex flex-col flex-1">
            {{-- Коллекция --}}
            @if($product->collection)
                <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide truncate">{{ $product->collection }}</p>
            @endif

            {{-- Название --}}
            <h3 class="font-medium text-sm text-gray-800 mb-1 line-clamp-2 leading-tight flex-1">
                <a href="{{ route('product.show', ['sku' => $product->sku]) }}"
                    class="hover:text-blue-600 transition-colors">
                    {{ $product->name }}
                </a>
            </h3>

            {{-- Артикул --}}
            <p class="text-xs text-gray-400 mb-2">арт. {{ $product->sku }}</p>

            {{-- Формат --}}
            @if($product->format)
                <p class="text-xs text-gray-500 mb-2">{{ $product->format }}</p>
            @endif

            {{-- Цена --}}
            <div class="mb-3">
                @if($product->price_retail)
                    <div class="flex items-baseline gap-2 flex-wrap">
                        <p class="text-lg font-bold text-gray-900">{{ number_format($product->price_retail, 0, ',', ' ') }} ₽</p>
                        @if($product->price_wholesale && $product->price_wholesale > $product->price_retail)
                            <p class="text-xs text-gray-400 line-through">{{ number_format($product->price_wholesale, 0, ',', ' ') }} ₽</p>
                        @endif
                    </div>
                @else
                    <p class="text-sm text-gray-500">Цена по запросу</p>
                @endif
            </div>

            {{-- Остатки --}}
            <div class="mb-3 space-y-0.5">
                @if($product->stock_yanino > 0)
                    <p class="text-xs text-green-600 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        Основной склад: {{ $product->stock_yanino }} м²
                    </p>
                @endif
                @if($product->stock_factory > 0)
                    <p class="text-xs text-blue-600 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                        </svg>
                        Завод: {{ $product->stock_factory }} м²
                    </p>
                @endif
                @if($product->stock_yanino <= 0 && $product->stock_factory <= 0)
                    <p class="text-xs text-gray-400 italic">Под заказ</p>
                @endif
            </div>

            {{-- Кнопка --}}
            <a href="{{ route('product.show', ['sku' => $product->sku]) }}"
                class="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                Подробнее
            </a>
        </div>
    </div>
    @endforeach
</div>

{{-- Пагинация --}}
@if($products->hasPages())
<div class="mt-8">
    <nav class="flex justify-center items-center gap-1 flex-wrap" aria-label="Pagination">
        {{-- Предыдущая --}}
        @if($products->onFirstPage())
            <span class="px-3 py-2 text-gray-300 text-sm border rounded-lg cursor-not-allowed">&laquo;</span>
        @else
            <a href="{{ $products->previousPageUrl() }}"
                class="px-3 py-2 text-gray-600 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition">&laquo;</a>
        @endif

        {{-- Номера страниц --}}
        @php
            $currentPage = $products->currentPage();
            $lastPage = $products->lastPage();
            $startPage = max(1, $currentPage - 2);
            $endPage = min($lastPage, $currentPage + 2);
        @endphp

        @for($i = $startPage; $i <= $endPage; $i++)
            @if($i == $currentPage)
                <span class="px-4 py-2 text-white text-sm bg-blue-600 border border-blue-600 rounded-lg font-medium">{{ $i }}</span>
            @else
                <a href="{{ $products->url($i) }}"
                    class="px-4 py-2 text-gray-600 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition">{{ $i }}</a>
            @endif
        @endfor

        {{-- Следующая --}}
        @if($products->hasMorePages())
            <a href="{{ $products->nextPageUrl() }}"
                class="px-3 py-2 text-gray-600 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition">&raquo;</a>
        @else
            <span class="px-3 py-2 text-gray-300 text-sm border rounded-lg cursor-not-allowed">&raquo;</span>
        @endif
    </nav>
</div>
@endif
