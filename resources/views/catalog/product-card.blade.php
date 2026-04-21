<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
    <a href="{{ route('catalog.show', $product->slug) }}" class="block">
        <div class="relative bg-gray-100 aspect-square overflow-hidden">
            @php
                // Проверяем наличие фото в разных местах
                $hasImage = false;
                $imageSrc = '';
                
                // 1. Проверяем массив images
                if (!empty($product->images) && is_array($product->images) && count($product->images) > 0) {
                    $imageSrc = asset($product->images[0]);
                    $hasImage = true;
                }
                // 2. Проверяем /storage/products/{sku}.jpg
                elseif (file_exists(public_path('storage/products/' . $product->sku . '.jpg'))) {
                    $imageSrc = asset('storage/products/' . $product->sku . '.jpg');
                    $hasImage = true;
                }
            @endphp
            
            @if($hasImage)
                {{-- Показываем настоящее фото --}}
                <img 
                    src="{{ $imageSrc }}" 
                    alt="{{ $product->name }}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                >
            @else
                {{-- Красивая заглушка если фото нет --}}
                <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <div class="text-lg font-bold text-gray-400 tracking-wider">{{ $product->collection }}</div>
                    <div class="text-xs text-gray-300 mt-1">{{ $product->format }}</div>
                </div>
            @endif
            
            @if($product->stock_yanino > 0)
                <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Основной склад
                </div>
            @elseif($product->stock_factory > 0)
                <div class="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Завод (7 дней)
                </div>
            @endif
            
            {{-- Бейдж скидки если есть --}}
            @if($product->price_rrp > $product->price_retail)
                <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                    -{{ number_format((($product->price_rrp - $product->price_retail) / $product->price_rrp) * 100, 0) }}%
                </div>
            @endif
        </div>
        
        <div class="p-4">
            <div class="text-sm text-gray-500 mb-1">{{ $product->collection }}</div>
            
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {{ $product->name }}
            </h3>
            
            <div class="text-sm text-gray-600 mb-3 flex items-center justify-between">
                <span>{{ $product->format }}</span>
                @if($product->surface)
                    <span class="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-500">{{ $product->surface }}</span>
                @endif
            </div>
            
            <div class="space-y-1 mb-3">
                <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-bold text-gray-900">{{ number_format($product->price_retail, 0, ',', ' ') }} ₽</span>
                    <span class="text-sm text-gray-500">/м²</span>
                </div>
            </div>
            
            <div class="text-sm space-y-1 mb-4">
                @if($product->stock_yanino > 0)
                    <div class="text-green-600 font-medium flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Склад: {{ $product->stock_yanino }} м²
                    </div>
                @endif
                @if($product->stock_factory > 0)
                    <div class="text-blue-600 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Завод: {{ $product->stock_factory }} м²
                    </div>
                @endif
            </div>
            
            <button class="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20">
                Подробнее
            </button>
        </div>
    </a>
</div>