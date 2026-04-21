<div>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-6">
            {{-- Filters Sidebar --}}
            <div class="lg:w-1/4">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold mb-4">Фильтры</h2>

                    {{-- Collections Filter --}}
                    @if(count($collections) > 0)
                    <div class="mb-6">
                        <h3 class="font-semibold mb-2">Коллекция</h3>
                        <div class="max-h-40 overflow-y-auto border rounded p-2">
                            @foreach($collections as $collection)
                            <label class="flex items-center mb-1">
                                <input type="checkbox" wire:model="selectedCollections" value="{{ $collection }}" class="mr-2">
                                <span class="text-sm">{{ $collection }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    @endif

                    {{-- Colors Filter --}}
                    @if(count($colors) > 0)
                    <div class="mb-6">
                        <h3 class="font-semibold mb-2">Цвет</h3>
                        <div class="max-h-40 overflow-y-auto border rounded p-2">
                            @foreach($colors as $color)
                            <label class="flex items-center mb-1">
                                <input type="checkbox" wire:model="selectedColors" value="{{ $color }}" class="mr-2">
                                <span class="text-sm">{{ $color }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    @endif

                    {{-- Formats Filter --}}
                    @if(count($formats) > 0)
                    <div class="mb-6">
                        <h3 class="font-semibold mb-2">Формат</h3>
                        <div class="max-h-40 overflow-y-auto border rounded p-2">
                            @foreach($formats as $format)
                            <label class="flex items-center mb-1">
                                <input type="checkbox" wire:model="selectedFormats" value="{{ $format }}" class="mr-2">
                                <span class="text-sm">{{ $format }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    @endif

                    {{-- Surfaces Filter --}}
                    @if(count($surfaces) > 0)
                    <div class="mb-6">
                        <h3 class="font-semibold mb-2">Поверхность</h3>
                        <div class="max-h-40 overflow-y-auto border rounded p-2">
                            @foreach($surfaces as $surface)
                            <label class="flex items-center mb-1">
                                <input type="checkbox" wire:model="selectedSurfaces" value="{{ $surface }}" class="mr-2">
                                <span class="text-sm">{{ $surface }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    @endif

                    {{-- Price Range --}}
                    <div class="mb-6">
                        <h3 class="font-semibold mb-2">Цена, ₽</h3>
                        <div class="flex gap-2">
                            <input type="number" wire:model="priceMin" placeholder="от" class="w-full px-3 py-2 border rounded text-sm">
                            <input type="number" wire:model="priceMax" placeholder="до" class="w-full px-3 py-2 border rounded text-sm">
                        </div>
                    </div>

                    {{-- Buttons --}}
                    <div class="flex gap-2">
                        <button wire:click="resetFilters" class="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm">
                            Сбросить
                        </button>
                    </div>
                </div>
            </div>

            {{-- Products Grid --}}
            <div class="lg:w-3/4">
                {{-- Search --}}
                <div class="mb-6">
                    <input type="text" wire:model="search" placeholder="Поиск по товарам..." class="w-full px-4 py-2 border rounded-lg">
                </div>

                {{-- Products --}}
                @if($products->count() > 0)
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    @foreach($products as $product)
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        <a href="{{ route('product.show', $product->sku) }}">
                            @if($product->main_image)
                            <img src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-48 object-cover">
                            @else
                            <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-400 text-3xl">🏺</span>
                            </div>
                            @endif
                        </a>

                        <div class="p-4">
                            <h3 class="font-semibold text-lg mb-2 line-clamp-2">
                                <a href="{{ route('product.show', $product->sku) }}" class="hover:text-blue-600">{{ $product->name }}</a>
                            </h3>

                            <p class="text-gray-600 text-sm mb-2">Артикул: {{ $product->sku }}</p>

                            @if($product->collection)
                            <p class="text-gray-500 text-xs mb-3">Коллекция: {{ $product->collection }}</p>
                            @endif

                            <div class="flex justify-between items-center">
                                <div>
                                    @if($product->price_retail)
                                    <span class="text-lg font-bold text-gray-900">{{ number_format($product->price_retail, 0, ',', ' ') }} ₽</span>
                                    @if($product->price_wholesale)
                                    <span class="text-sm text-gray-500 line-through">{{ number_format($product->price_wholesale, 0, ',', ' ') }} ₽</span>
                                    @endif
                                    @else
                                    <span class="text-gray-500">Цена по запросу</span>
                                    @endif
                                </div>
                            </div>

                            <div class="mt-4">
                                <a href="https://wa.me/78124413188?text=Здравствуйте, интересует {{ $product->name }} (арт: {{ $product->sku }})" target="_blank" class="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition text-sm">
                                    Уточнить в WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>

                {{-- Pagination --}}
                <div class="mt-8">
                    {{ $products->links() }}
                </div>
                @else
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                    <p class="font-bold">Ничего не найдено</p>
                    <p>По вашему запросу товары не найдены. Попробуйте изменить фильтры.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>