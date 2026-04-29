<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>@yield('title', 'Керамогранит Опт - Оптовый гипермаркет плитки и керамогранита')</title>
    <meta name="description" content="@yield('meta_description', 'Широкий ассортимент керамической плитки и керамогранита от ведущих производителей. Оптовые цены, быстрая доставка со склада в СПб.')">
    
    {{-- Open Graph / Social Media --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="@yield('title', 'Керамогранит Опт - Оптовый гипермаркет плитки и керамогранита')">
    <meta property="og:description" content="@yield('meta_description', 'Широкий ассортимент керамической плитки и керамогранита от ведущих производителей. Оптовые цены, быстрая доставка со склада в СПб.')">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

    {{-- SEO & Verifications --}}
    <meta name="yandex-verification" content="c26277345b786016" />
    <meta name="google-site-verification" content="aQYqAGATjFgdx_MvrEs3m5z95_SqArJAqluUH02RQNY" />
    <link rel="canonical" href="{{ url()->current() }}" />

    @include('components.seo.organization-schema')

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />
    <!-- Styles -->
    @vite('resources/css/app.css')

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="{{ route('home') }}" class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-blue-600 tracking-tight">Керамогранит Опт</span>
                    </a>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8">
                    <a href="{{ route('catalog.index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition">Каталог</a>
                    <a href="{{ route('collections.index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition">Коллекции</a>
                    <a href="{{ route('wholesale.index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition">Оптовикам</a>
                </nav>

                <!-- Cart & Search -->
                <div class="flex items-center gap-4">
                    <a href="{{ route('cart.index') }}" class="text-gray-600 hover:text-blue-600 relative p-2 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span id="cart-count" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">0</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="flex-grow">
        @yield('content')
    </main>

    <footer class="bg-gray-900 text-white mt-12 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Керамогранит Опт</h3>
                    <p class="text-gray-400 text-sm">Ваш надежный поставщик керамической плитки и керамогранита. Прямые поставки от производителей.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 uppercase text-sm tracking-wider">Каталог</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="{{ route('catalog.index') }}" class="hover:text-white transition">Все товары</a></li>
                        <li><a href="{{ route('collections.index') }}" class="hover:text-white transition">Коллекции</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 uppercase text-sm tracking-wider">Клиентам</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="{{ route('wholesale.index') }}" class="hover:text-white transition">Оптовикам</a></li>
                        <li><a href="#" class="hover:text-white transition">Доставка</a></li>
                        <li><a href="#" class="hover:text-white transition">Оплата</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 uppercase text-sm tracking-wider">Контакты</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li>8 (812) 441-31-88</li>
                        <li>info@keramogranit-opt.ru</li>
                        <li>г. Санкт-Петербург</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                &copy; {{ date('Y') }} Керамогранит Опт. Все права защищены.
            </div>
        </div>
    </footer>

    @vite('resources/js/app.js')
    <script>
    function loadCartCount() {
        fetch('/cart/count')
            .then(r => r.json())
            .then(data => {
                const el = document.getElementById('cart-count');
                if (el) el.textContent = data.count || 0;
            })
            .catch(() => {});
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCartCount);
    } else {
        loadCartCount();
    }
    </script>
    @stack('scripts')
</body>
</html>
