@extends('layout')

@php $parsed = $product->getParsedDescription(); @endphp

@section('title', $product->name . ' — Купить оптом и в розницу')
@section('meta_description', $product->name . '. Артикул: ' . $product->sku . '. В наличии на складе. Доставка по всей России.')

@push('scripts')
<script type="application/ld+json">
{!! json_encode($product->getSchemaOrgData()) !!}
</script>
@endpush

@section('content')
<div class="bg-white">
    <div class="container mx-auto px-4 py-8">
        {{-- Breadcrumbs --}}
        <nav class="flex mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="/" class="hover:text-primary transition-colors">Главная</a>
            <span class="mx-3">/</span>
            <a href="/catalog" class="hover:text-primary transition-colors">Каталог</a>
            @if($product->collection)
                <span class="mx-3">/</span>
                <a href="{{ route('collection.show', ['collection' => urlencode($product->collection)]) }}" class="hover:text-primary transition-colors">{{ $product->collection }}</a>
            @endif
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {{-- Left: Images --}}
            <div class="lg:col-span-7">
                <div class="sticky top-24 space-y-4">
                    <div class="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
                        @if($product->main_image)
                            <img id="main-product-image" src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105">
                        @else
                            <div class="w-full h-full flex items-center justify-center text-gray-200">
                                <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </div>
                        @endif
                        
                        @if($product->is_exclusive)
                            <div class="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">Exclusive</div>
                        @endif
                    </div>

                    {{-- Thumbnails --}}
                    @php 
                        $allImages = collect([$product->main_image])
                            ->merge($parsed['technical_images'])
                            ->merge([$parsed['collection_image']])
                            ->filter()
                            ->unique();
                    @endphp

                    @if($allImages->count() > 1)
                        <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                            @foreach($allImages as $img)
                                <button onclick="document.getElementById('main-product-image').src='{{ $img }}'" 
                                        class="flex-shrink-0 w-24 h-24 rounded-2xl border-2 border-transparent hover:border-primary bg-gray-50 p-2 transition-all">
                                    <img src="{{ $img }}" class="w-full h-full object-contain">
                                </button>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>

            {{-- Right: Info & Purchase --}}
            <div class="lg:col-span-5 space-y-8">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <span class="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase">{{ $product->brand ?? 'Lincer' }}</span>
                        @if($product->country)
                            <span class="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase">{{ $product->country }}</span>
                        @endif
                    </div>
                    <h1 class="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{{ $product->name }}</h1>
                    <div class="flex items-center gap-6 text-sm text-gray-500 font-medium">
                        <span>Арт: <span class="text-gray-900 font-bold ml-1">{{ $product->sku }}</span></span>
                        @if($product->collection)
                            <span>Коллекция: <a href="{{ route('collection.show', ['collection' => urlencode($product->collection)]) }}" class="text-primary hover:underline ml-1">{{ $product->collection }}</a></span>
                        @endif
                    </div>
                </div>

                <div class="space-y-6">
                    {{-- Price Display --}}
                    <div class="flex items-end gap-3">
                        <span class="text-4xl font-black text-gray-900">{{ number_format($product->price_retail, 0, '.', ' ') }} ₽</span>
                        <span class="text-gray-400 font-bold mb-1">/ {{ $product->unit_type ?? 'м²' }}</span>
                    </div>

                    {{-- Stock Status --}}
                    <div class="flex items-center gap-2 py-3 px-4 bg-success/5 border border-success/10 rounded-xl text-success">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                        <div class="flex flex-col">
                            <span class="text-sm font-bold leading-none">В наличии на складе</span>
                            <span class="text-[10px] font-bold uppercase tracking-wider opacity-80 mt-0.5">Доставка по СПб: 1-2 дня</span>
                        </div>
                    </div>

                    {{-- Calculator Component --}}
                    <x-product.calculator :product="$product" />

                    {{-- Actions --}}
                    <div class="flex flex-col gap-3">
                        <form action="{{ route('cart.add') }}" method="POST">
                            @csrf
                            <input type="hidden" name="product_id" value="{{ $product->id }}">
                            <input type="hidden" name="box_quantity" value="1" id="final-box-count">
                            <button type="submit" class="w-full bg-primary hover:bg-primary-hover text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                                <span>Добавить в заказ</span>
                            </button>
                        </form>
                        <a href="https://wa.me/78124413188?text=Запрос оптовых цен для {{ $product->name }} (арт: {{ $product->sku }})" 
                           class="w-full border-2 border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-700 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3">
                            <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.385-1.475-.882-.788-1.476-1.761-1.645-2.059-.169-.297-.017-.456.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.297-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.5-.67-.51-.173-.008-.297-.01-.47-.01-.173 0-.445.063-.678.319-.231.247-.882.862-.882 2.107 0 1.246.908 2.452 1.034 2.618.127.166 1.79 2.734 4.342 3.833.607.262 1.082.42 1.453.535.61.177 1.164.152 1.603.093.488-.069 1.512-.619 1.727-1.216.215-.597.215-1.107.151-1.21-.064-.103-.236-.166-.533-.313z"/></svg>
                            <span>Узнать оптовую цену</span>
                        </a>
                    </div>
                </div>

                {{-- Specs Grid --}}
                <div class="grid grid-cols-2 gap-4">
                    @foreach(['format' => 'Формат', 'material_type' => 'Материал', 'surface' => 'Поверхность', 'color' => 'Цвет'] as $field => $label)
                        @if($product->$field)
                            <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{{ $label }}</span>
                                <span class="font-bold text-gray-900">{{ $product->$field }}</span>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>

        {{-- Main Description Content --}}
        <div class="mt-24 max-w-4xl">
            <h2 class="text-3xl font-black text-gray-900 mb-8">Описание и характеристики</h2>
            <div class="prose prose-lg max-w-none text-gray-600 space-y-4">
                @foreach($parsed['text_lines'] as $line)
                    <p>{{ $line }}</p>
                @endforeach
            </div>

            {{-- Tech Specs Table --}}
            <div class="mt-12 overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                <table class="w-full text-left text-sm border-collapse">
                    <tbody>
                        @foreach([
                            'Артикул' => $product->sku,
                            'Производитель' => $product->manufacturer ?? $product->brand,
                            'Коллекция' => $product->collection,
                            'Формат' => $product->format,
                            'Толщина' => $product->thickness ? $product->thickness . ' мм' : null,
                            'В коробке (м²)' => $product->sqm_per_box,
                            'В коробке (шт)' => $product->pieces_per_box,
                            'Вес упаковки' => ($product->weight_unit && $product->sqm_per_box) ? round($product->weight_unit * $product->sqm_per_box, 1) . ' кг' : null,
                        ] as $key => $val)
                            @if($val)
                                <tr class="border-b border-gray-100 last:border-0">
                                    <th class="py-4 px-6 bg-gray-50 font-bold text-gray-500 w-1/3">{{ $key }}</th>
                                    <td class="py-4 px-6 text-gray-900 font-bold">{{ $val }}</td>
                                </tr>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
