'use client'

import Link from 'next/link'
import { Mail, Phone, MessageSquare, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('[v0] Form submitted with data:', formData)
    
    try {
      console.log('[v0] Sending POST to /api/contact')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      console.log('[v0] Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('[v0] Response error:', errorText)
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      console.log('[v0] Message sent successfully:', data)
      
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('[v0] Error sending message:', error)
      alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.')
    }
  }

  const contactChannels = [
    {
      icon: MessageSquare,
      title: 'Telegram',
      handle: '@flyroman',
      url: 'https://t.me/flyroman',
      description: 'Напишите нам в Telegram',
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      handle: '+7 905 205 09 00',
      url: 'https://wa.me/79052050900',
      description: 'Свяжитесь с нами через WhatsApp',
    },
    {
      icon: Mail,
      title: 'Email',
      handle: 'novorom@mail.ru',
      url: 'mailto:novorom@mail.ru',
      description: 'Отправьте нам письмо',
    },
  ]

  const socialLinks = [
    {
      icon: '🏪',
      name: 'Avito',
      url: 'https://www.avito.ru/brands/i1860592?src=sharing',
    },
    {
      icon: '📱',
      name: 'VK (ВКонтакте)',
      url: 'https://vk.com/tilebox',
    },
    {
      icon: '👥',
      name: 'Facebook',
      url: 'https://www.facebook.com/tilebox/',
    },
    {
      icon: '📷',
      name: 'Instagram',
      url: 'https://www.instagram.com/lincer_spb',
    },
    {
      icon: '📹',
      name: 'Rutube',
      url: 'https://rutube.ru/channel/17530235/',
    },
    {
      icon: '🎵',
      name: 'TikTok',
      url: 'https://www.tiktok.com/@romrom64123',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Свяжитесь с нами
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance">
            Мы всегда готовы помочь вам выбрать идеальную плитку для вашего проекта. Свяжитесь с нами удобным для вас способом.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="px-4 py-10 lg:py-13">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactChannels.map((channel) => {
              const IconComponent = channel.icon
              return (
                <a
                  key={channel.title}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {channel.description}
                  </p>
                  <p className="text-base font-medium text-primary group-hover:translate-x-1 transition-transform">
                    {channel.handle}
                  </p>
                </a>
              )
            })}
          </div>

          {/* Social Media */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Найдите нас в социальных сетях
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="text-3xl">{social.icon}</div>
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors text-center text-sm">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Отправить сообщение
            </h2>
            <p className="text-muted-foreground mb-8">
              Заполните форму ниже, и мы получим ваше сообщение прямо в Telegram
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
                ✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван Петров"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Расскажите нам о вашем проекте..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-5 h-5" />
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Отдел продаж</h3>
              <p className="text-muted-foreground mb-2">
                Санкт-Петербург, Янино
              </p>
              <p className="text-sm text-muted-foreground">
                Офис/Склад: Пн-Пт 10:00-16:45<br />
                Шоурум: ежедневно 10:00-18:00
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Режим работы</h3>
              <p className="text-muted-foreground mb-2">
                Самовывоз и доставка
              </p>
              <p className="text-sm text-muted-foreground">
                Офис/Склад: Пн-Пт 10:00-16:45<br />
                Шоурум: ежедневно 10:00-18:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
