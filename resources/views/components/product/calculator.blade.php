@props(['product'])

<div class="bg-gray-50 rounded-2xl p-6 border border-gray-200" x-data="tileCalculator({
    sqmPerBox: {{ $product->sqm_per_box ?? 0 }},
    weightPerUnit: {{ $product->weight_unit ?? 0 }},
    boxesPerPallet: {{ $product->boxes_per_pallet ?? 0 }},
    price: {{ $product->price_retail ?? 0 }}
})">
    <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold text-gray-900">Рассчитать стоимость</h3>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Калькулятор</span>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6">
        {{-- SQM Input --}}
        <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Количество (м²)</label>
            <div class="relative">
                <input type="number" step="0.01" x-model.number="sqm" @input="updateFromSqm"
                    class="w-full bg-white border-2 border-gray-100 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 font-bold text-lg transition-all">
                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">м²</div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            {{-- Boxes Input --}}
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Упаковок</label>
                <div class="relative">
                    <input type="number" x-model.number="boxes" @input="updateFromBoxes"
                        class="w-full bg-white border-2 border-gray-100 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 font-bold transition-all">
                </div>
            </div>
            {{-- Pallets Display --}}
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Паллет</label>
                <div class="relative">
                    <input type="number" x-model.number="pallets" @input="updateFromPallets"
                        class="w-full bg-white border-2 border-gray-100 focus:border-primary focus:ring-0 rounded-xl px-4 py-3 font-bold transition-all">
                </div>
            </div>
        </div>
    </div>

    <div class="space-y-3 pt-6 border-t border-gray-100">
        <div class="flex justify-between text-sm">
            <span class="text-gray-500">Общий вес:</span>
            <span class="font-bold text-gray-900"><span x-text="totalWeight.toFixed(2)"></span> кг</span>
        </div>
        <div class="flex justify-between items-end pt-2">
            <span class="text-gray-500 font-medium text-lg">Итого:</span>
            <div class="text-right">
                <div class="text-3xl font-black text-primary leading-none">
                    <span x-text="totalPrice.toLocaleString()"></span> ₽
                </div>
                <div class="text-[10px] text-gray-400 font-bold uppercase mt-1">Оптовые цены доступны партнерам</div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('tileCalculator', (config) => ({
        sqm: config.sqmPerBox,
        boxes: 1,
        pallets: config.boxesPerPallet > 0 ? (1 / config.boxesPerPallet).toFixed(2) : 0,
        totalWeight: config.sqmPerBox * config.weightPerUnit,
        totalPrice: config.sqmPerBox * config.price,

        updateFromSqm() {
            if (config.sqmPerBox > 0) {
                this.boxes = Math.ceil(this.sqm / config.sqmPerBox);
                this.sqm = this.boxes * config.sqmPerBox;
                if (config.boxesPerPallet > 0) {
                    this.pallets = (this.boxes / config.boxesPerPallet).toFixed(2);
                }
                this.calculateTotals();
            }
        },

        updateFromBoxes() {
            this.sqm = this.boxes * config.sqmPerBox;
            if (config.boxesPerPallet > 0) {
                this.pallets = (this.boxes / config.boxesPerPallet).toFixed(2);
            }
            this.calculateTotals();
        },

        updateFromPallets() {
            if (config.boxesPerPallet > 0) {
                this.boxes = Math.ceil(this.pallets * config.boxesPerPallet);
                this.sqm = this.boxes * config.sqmPerBox;
                this.calculateTotals();
            }
        },

        calculateTotals() {
            this.totalWeight = this.sqm * config.weightPerUnit;
            this.totalPrice = this.sqm * config.price;
        }
    }));
});
</script>
