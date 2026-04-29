@extends('layout')

@section('content')
    {{-- Premium Hero Section --}}
    <section class="relative h-[80vh] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="{{ asset('images/hero-lincer.png') }}" alt="Керамогранит Опт Showroom" class="w-full h-full object-cover scale-105 animate-slow-zoom">
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-3xl text-white">
                <span class="inline-block px-4 py-1.5 bg-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6 animate-fade-in">
                    Оптовый гипермаркет №1
                </span>
                <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-up">
                    Керамогранит Опт <br>
                    <span class="text-blue-400">Мир плитки</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl animate-slide-up-delayed">
                    Прямой поставщик керамической плитки и керамогранита. 
                    Оптовые цены для застройщиков и дизайнеров.
                </p>
                <div class="flex flex-wrap gap-4 animate-slide-up-more-delayed">
                    <a href="{{ route('catalog.index') }}" class="bg-white text-gray-900 font-bold py-4 px-10 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl">
                        В каталог
                    </a>
                    <a href="{{ route('wholesale.index') }}" class="bg-transparent border-2 border-white/30 backdrop-blur-md text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg">
                        Стать партнером
                    </a>
                </div>
            </div>
        </div>

        {{-- Scroll Indicator --}}
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
    </section>

    {{-- Stats Section --}}
    <section class="py-12 bg-white border-b border-gray-100">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-4xl font-black text-gray-900 mb-2">15к+</div>
                    <div class="text-sm text-gray-500 font-bold uppercase tracking-widest">Товаров</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-black text-gray-900 mb-2">24ч</div>
                    <div class="text-sm text-gray-500 font-bold uppercase tracking-widest">Доставка</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-black text-gray-900 mb-2">500+</div>
                    <div class="text-sm text-gray-500 font-bold uppercase tracking-widest">Коллекций</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-black text-gray-900 mb-2">-20%</div>
                    <div class="text-sm text-gray-500 font-bold uppercase tracking-widest">Оптовая скидка</div>
                </div>
            </div>
        </div>
    </section>

    {{-- Bestsellers Section --}}
    @if($bestsellers->isNotEmpty())
    <section class="py-24 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="text-4xl font-black text-gray-900 mb-4">Хиты продаж</h2>
                    <p class="text-gray-500 font-medium">Самые популярные коллекции этого сезона</p>
                </div>
                <a href="{{ route('catalog.index') }}" class="text-blue-600 font-bold hover:underline">Смотреть всё →</a>
            </div>
            
            <div class="grid md:grid-cols-4 gap-8">
                @foreach($bestsellers->take(4) as $product)
                    @if(!empty($product->sku))
                    <div class="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100">
                        <a href="{{ route('catalog.show', $product->slug) }}" class="block">
                            <div class="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                @if($product->main_image)
                                <img src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                @else
                                <div class="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                @endif
                                <div class="absolute top-5 left-5">
                                    <span class="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-widest">
                                        {{ $product->collection }}
                                    </span>
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{{ $product->name }}</h3>
                                <div class="flex items-center justify-between">
                                    <span class="text-2xl font-black text-gray-900">{{ number_format($product->price_retail, 0, '.', ' ') }} ₽</span>
                                    <span class="text-xs font-bold text-gray-400 uppercase tracking-tighter">за {{ $product->unit_type ?? 'м²' }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    @endif
                @endforeach
            </div>
        </div>
    </section>
    @endif

    {{-- Call to Action --}}
    <section class="py-24 bg-gray-900 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="grid grid-cols-8 gap-4">
                @for($i = 0; $i < 64; $i++)
                    <div class="aspect-square bg-white/20 rounded-lg"></div>
                @endfor
            </div>
        </div>
        <div class="container mx-auto px-4 relative z-10 text-center">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-8">Готовы начать проект?</h2>
            <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Получите индивидуальное коммерческое предложение с учетом ваших объемов и специфики объекта.
            </p>
            <a href="https://wa.me/78124413188?text=Запрос оптового прайса Керамогранит Опт" class="inline-flex items-center gap-3 bg-green-500 text-white font-black py-5 px-12 rounded-2xl hover:bg-green-600 transition-all shadow-2xl shadow-green-500/20">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.385-1.475-.882-.788-1.476-1.761-1.645-2.059-.169-.297-.017-.456.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.297-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.5-.67-.51-.173-.008-.297-.01-.47-.01-.173 0-.445.063-.678.319-.231.247-.882.862-.882 2.107 0 1.246.908 2.452 1.034 2.618.127.166 1.79 2.734 4.342 3.833.607.262 1.082.42 1.453.535.61.177 1.164.152 1.603.093.488-.069 1.512-.619 1.727-1.216.215-.597.215-1.107.151-1.21-.064-.103-.236-.166-.533-.313z"/></svg>
                Запросить спеццены
            </a>
        </div>
    </section>

    <style>
        @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
            animation: slow-zoom 20s infinite alternate linear;
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up-delayed { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-slide-up-more-delayed { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
@endsection
@endsection
