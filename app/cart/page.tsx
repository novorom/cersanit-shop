'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CheckoutModal, type OrderData } from '@/components/checkout-modal'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleCheckout = async (orderData: OrderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          ...orderData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit order')
      }

      const responseData = await response.json().catch(() => ({}))
      const orderId = responseData.orderId || Math.floor(Math.random() * 1000000).toString()

      // Clear cart and show success message
      clearCart()
      setIsCheckoutOpen(false)
      setOrderSuccess(true)
      
      // Trigger Google Opt-in
      if (typeof window !== 'undefined' && (window as any).renderOptIn) {
        const email = orderData.contactMethod === 'email' ? orderData.contactValue : ''
        setTimeout(() => {
          ;(window as any).renderOptIn(orderId, email)
        }, 500)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при отправке заказа. Пожалуйста, попробуйте позже.'
      alert(errorMessage)
    }
  }

  if (orderSuccess) {
    return (
      <div className="bg-muted/30 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="bg-background rounded-2xl border border-border p-8 md:p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Спасибо за заказ!</h1>
            <p className="text-foreground/60 mb-8">Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время для подтверждения.</p>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-muted/30 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-5 w-5" />
            Вернуться
          </button>

          <div className="bg-background rounded-2xl border border-border p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Корзина пуста</h1>
            <p className="text-foreground/60 mb-8">Добавьте товары, чтобы начать покупку</p>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-5 w-5" />
          Вернуться
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h1 className="text-2xl font-bold text-foreground">Корзина</h1>
                <p className="text-sm text-foreground/60 mt-1">
                  {items.length} {items.length === 1 ? 'товар' : 'товаров'}
                </p>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex gap-4 hover:bg-muted/30 transition-colors"
                  >
                    {item.image && (
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {(item.price).toLocaleString('ru-RU')} ₽ за {item.unit || 'м²'}
                      </p>

                      <div className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const step = item.boxSize || 1
                              updateQuantity(item.id, Number((item.quantity - step).toFixed(2)))
                            }}
                            className="h-8 w-8 rounded-lg border border-border hover:bg-accent transition-colors flex items-center justify-center"
                          >
                            <Minus className="h-4 w-4 text-foreground/70" />
                          </button>
                          <span className="w-16 text-center text-sm font-bold">
                            {item.quantity} {item.unit || 'м²'}
                          </span>
                          <button
                            onClick={() => {
                              const step = item.boxSize || 1
                              updateQuantity(item.id, Number((item.quantity + step).toFixed(2)))
                            }}
                            className="h-8 w-8 rounded-lg border border-border hover:bg-accent transition-colors flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4 text-foreground/70" />
                          </button>
                        </div>
                        {item.boxSize && (
                          <span className="text-[11px] text-orange-600 font-medium">
                            {Math.round(item.quantity / item.boxSize)} кор.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-foreground/60 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-2xl border border-border p-6 sticky top-20">
              <h2 className="text-lg font-bold text-foreground mb-6">Итоги</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Подитог:</span>
                  <span className="font-medium text-foreground">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Доставка:</span>
                  <span className="font-medium text-foreground">
                    По договорённости
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-foreground">Итого:</span>
                <span className="text-xl font-bold text-primary">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors mb-3"
              >
                Оформить заказ
              </button>

              <button
                onClick={() => router.push('/catalog')}
                className="w-full h-11 rounded-xl border border-border text-foreground font-medium hover:bg-accent transition-colors mb-3"
              >
                Продолжить покупки
              </button>

              <button
                onClick={clearCart}
                className="w-full h-11 rounded-xl border border-destructive/30 text-destructive font-medium hover:bg-destructive/5 transition-colors"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
        total={total}
        itemCount={items.length}
      />
    </div>
  )
}
