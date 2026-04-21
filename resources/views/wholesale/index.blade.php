@extends('layout')

@section('title', 'Оптовым клиентам — Специальные условия сотрудничества')

@section('content')
<div class="relative bg-gray-900 py-24 overflow-hidden">
    {{-- Background Decoration --}}
    <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
    
    <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
            <h1 class="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                Специальные условия для <span class="text-primary">оптовых партнеров</span>
            </h1>
            <p class="text-xl text-gray-400 mb-12 leading-relaxed">
                Мы предлагаем прямые поставки керамической плитки и керамогранита для застройщиков, дизайнеров и торговых организаций. Собственный склад, гибкая система скидок и персональный менеджер.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="#apply" class="bg-primary hover:bg-primary-hover text-white font-black px-10 py-5 rounded-2xl transition-all">Стать партнером</a>
                <a href="/catalog" class="bg-white/10 hover:bg-white/20 text-white font-black px-10 py-5 rounded-2xl backdrop-blur-md transition-all">Перейти в каталог</a>
            </div>
        </div>
    </div>
</div>

<div class="container mx-auto px-4 py-24">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div class="space-y-4 p-8 bg-gray-50 rounded-3xl">
            <div class="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl mx-auto mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-xl font-black">Оптовые цены</h3>
            <p class="text-gray-500">Спецпредложения с первого заказа. Скидки от объема и накопительная система для постоянных партнеров.</p>
        </div>
        <div class="space-y-4 p-8 bg-gray-50 rounded-3xl">
            <div class="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl mx-auto mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 class="text-xl font-black">Собственный склад</h3>
            <p class="text-gray-500">Постоянное наличие популярных линеек на наших складах. Регулярные поставки с заводов-изготовителей.</p>
        </div>
        <div class="space-y-4 p-8 bg-gray-50 rounded-3xl">
            <div class="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl mx-auto mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-xl font-black">Гарантия качества</h3>
            <p class="text-gray-500">Только сертифицированная продукция с гарантией производителя. Контроль каждой отгрузки.</p>
        </div>
    </div>
</div>

<div id="apply" class="bg-white py-24 border-t border-gray-100">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-4xl font-black mb-6">Оставить заявку</h2>
                    <p class="text-gray-400 mb-8 leading-relaxed">Начните сотрудничество сегодня. Оставьте контакты, и наш менеджер свяжется с вами для обсуждения условий и предоставления оптового прайс-листа.</p>
                    <div class="space-y-4 font-bold">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-primary">✓</span>
                            <span>Индивидуальный расчет</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-primary">✓</span>
                            <span>Доступ к остаткам онлайн</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-3xl p-8 text-gray-900">
                    <form class="space-y-4">
                        <input type="text" placeholder="Ваше имя" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all">
                        <input type="text" placeholder="Название компании" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all">
                        <input type="tel" placeholder="+7 (___) ___-__-__" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all">
                        <button class="w-full bg-primary hover:bg-primary-hover text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 mt-4 transition-all">Отправить заявку</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
