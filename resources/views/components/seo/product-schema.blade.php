@props(['product'])

@php
    // Рассчитываем нашу цену (розница - 20%)
    $ourPrice = $product->price_retail * 0.80;

    // Получаем URL первого изображения или заглушку
    $imageUrl = $product->images->first() ? Storage::url($product->images->first()->path) : asset('images/placeholder.jpg');

    // Очищаем описание для JSON
    $description = e(strip_tags($product->description ?? ''));
@endphp

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "{{ e($product->name) }}",
    "description": "{{ $description }}",
    "sku": "{{ e($product->sku) }}",
    "image": "{{ url($imageUrl) }}",
    "brand": {
        "@type": "Brand",
        "name": "{{ e($product->brand ?? 'LINCER') }}"
    },
    "offers": {
        "@type": "Offer",
        "url": "{{ url()->current() }}",
        "priceCurrency": "RUB",
        "price": "{{ number_format($ourPrice, 2, '.', '') }}",
        "priceValidUntil": "{{ now()->addYear()->toIso8601String() }}",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
    }
}
</script>
