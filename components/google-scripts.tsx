'use client'

import { useEffect } from 'react'

export default function GoogleScripts() {
  useEffect(() => {
    // Load Google platform script
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js?onload=renderBadge'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    // Define renderBadge function
    ;(window as any).renderBadge = function () {
      const ratingBadgeContainer = document.createElement('div')
      document.body.appendChild(ratingBadgeContainer)
      ;(window as any).gapi.load('ratingbadge', function () {
        ;(window as any).gapi.ratingbadge.render(ratingBadgeContainer, {
          merchant_id: 5750220121,
          position: 'BOTTOM_LEFT',
        })
      })
    }

    ;(window as any).renderOptIn = function (orderId: string, email: string) {
      ;(window as any).gapi.load('surveyoptin', function () {
        ;(window as any).gapi.surveyoptin.render({
          merchant_id: 5750220121,
          order_id: orderId,
          email: email || '',
          delivery_country: 'RU',
          estimated_delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        })
      })
    }

    return () => {
      // Cleanup
      document.head.removeChild(script)
    }
  }, [])

  return null
}
