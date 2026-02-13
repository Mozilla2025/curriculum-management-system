'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site'

export function CTASection() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleCTAClick = async () => {
    setIsNavigating(true)
    await new Promise(r => setTimeout(r, 1000))
    router.push(siteConfig.links.dashboard)
  }

  return (
    <section className="bg-gray-900 py-20 md:py-24 text-center">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        
        <p className="text-xs md:text-sm text-white/90 mb-10 leading-relaxed">
          Access your personalized curriculum management dashboard and experience 
          the future of academic administration at MUST.
        </p>

        <Button
          size="lg"
          onClick={handleCTAClick}
          isLoading={isNavigating}
          leftIcon={<ArrowRight className="w-5 h-5" />}
          className="shadow-strong"
        >
          Access CurricFlow Dashboard
        </Button>
      </div>
    </section>
  )
}