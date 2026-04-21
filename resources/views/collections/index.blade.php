@extends('layout')

@section('title', 'Коллекции LINCER - Визуальный каталог')
@section('meta_description', 'Визуальный каталог коллекций керамической плитки и керамогранита LINCER от официального дилера.')

@section('content')
<!-- Hero Section -->
<div class="relative bg-gradient-to-r from-blue-900 to-gray-800 text-white py-16 md:py-24">
    <div class="absolute inset-0 bg-black opacity-40"></div>
    <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Коллекции LINCER
            </h1>
            <p class="text-xl mb-6 text-blue-100">
                Официальный дилер керамической плитки. Выбирайте дизайн, а не артикул.
            </p>
            <div class="flex flex-wrap gap-4 text-sm">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Более {{ $collections->count() }} коллекций
                </div>
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Остатки на наших складах
                </div>
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Цены от производителя
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Visual Collections Grid -->
<div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Выбирайте по дизайну коллекции
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Каждая коллекция представлена в интерьере. Кликните на коллекцию, чтобы увидеть все доступные форматы и цвета.
        </p>
    </div>

    <!-- Collections Grid -->
    @if($collections->isEmpty())
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <h3 class="text-lg font-medium text-yellow-800">Коллекции не найдены</h3>
        <p class="mt-2 text-yellow-700">В данный момент список коллекций формируется.</p>
    </div>
    @else
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        @foreach($collections as $collection)
        <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <!-- Preview Image -->
            @if($collection['preview_image'])
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="{{ $collection['preview_image'] }}"
                     alt="Коллекция {{ $collection['name'] }}"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6">
                    <h3 class="text-white text-2xl font-bold drop-shadow-lg line-clamp-1">
                        {{ $collection['name'] }}
                    </h3>
                    <p class="text-white/90 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                            <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 01-1-1v-1a1 1 0 10-2 0v1a1 1 0 001 1zm8 0a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clip-rule="evenodd"/>
                        </svg>
                        {{ $collection['product_count'] }} товаров
                    </p>
                </div>
            </div>
            @else
            <div class="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center">
                    <span class="text-6xl text-gray-400">🏺</span>
                    <h3 class="text-gray-600 font-bold mt-3">{{ $collection['name'] }}</h3>
                </div>
            </div>
            @endif

            <!-- Thumbnails Grid -->
            <div class="p-5">
                <p class="text-sm text-gray-600 mb-3">Доступные варианты:</p>
                <div class="grid grid-cols-4 gap-2 mb-4">
                    @foreach(array_slice($collection['thumbnails'], 0, 4) as $thumbnail)
                    <div class="aspect-square overflow-hidden rounded-lg">
                        <img src="{{ $thumbnail }}"
                             alt=""
                             class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
                    </div>
                    @endforeach
                </div>

                <!-- CTA Button -->
                <a href="{{ $collection['url'] }}"
                   class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 px-4 rounded-lg transition-colors group">
                    <span class="flex items-center justify-center">
                        Смотреть коллекцию
                        <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
        @endforeach
    </div>
    @endif

    <!-- Info Section -->
    <div class="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Почему LINCER?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2">Гарантия качества</h3>
                <p class="text-gray-600">Надежный дистрибьютор в СПб с гарантией от производителя</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2">Быстрая доставка</h3>
                <p class="text-gray-600">Широкая сеть складов, доставка по СПб и Ленобласти от 1 дня</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.7-11.7L9.3 7.3l-1.4-1.4L5.7 8.3l3 3 6-6-1.4-1.4z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2">Лучшие цены</h3>
                <p class="text-gray-600">Цены на 20% ниже рекомендованной розницы</p>
            </div>
        </div>
    </div>

    <!-- WhatsApp CTA -->
    <div class="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Не нашли нужную коллекцию?</h2>
        <p class="text-lg mb-6">Напишите нам в WhatsApp, поможем подобрать аналог или заказать под индивидуальный проект</p>
        <a href="https://wa.me/78124413188?text=Здравствуйте, интересуют коллекции LINCER для проекта"
           target="_blank"
           class="inline-flex items-center bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.385-1.475-.882-.788-1.476-1.761-1.645-2.059-.169-.297-.017-.456.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.297-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.5-.67-.51-.173-.008-.297-.01-.47-.01-.173 0-.445.063-.678.319-.231.247-.882.862-.882 2.107 0 1.246.908 2.452 1.034 2.618.127.166 1.79 2.734 4.342 3.833.607.262 1.082.42 1.453.535.61.177 1.164.152 1.603.093.488-.069 1.512-.619 1.727-1.216.215-.597.215-1.107.151-1.21-.064-.103-.236-.166-.533-.313z"/>
            </svg>
            Написать в WhatsApp
        </a>
    </div>
</div>
@endsection

@push('scripts')
<script>
// Add animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.group').forEach((el) => {
        observer.observe(el);
    });
});
</script>

<style>
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
@endpush