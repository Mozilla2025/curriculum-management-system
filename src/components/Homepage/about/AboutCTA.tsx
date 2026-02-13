'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site'

export function AboutCTA() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsNavigating(true)
    await new Promise(r => setTimeout(r, 1000))
    router.push(siteConfig.links.dashboard)
  }

  return (
    <section className="bg-gray-900 py-20 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to Experience CurricFlow?
        </h2>
        <p className="text-lg text-white/90 mb-10">
          Join us in transforming curriculum management at MUST. Access your dashboard 
          and start streamlining your academic processes today.
        </p>
        <Button
          size="lg"
          onClick={handleClick}
          isLoading={isNavigating}
          leftIcon={<ArrowRight className="w-5 h-5" />}
        >
          Access Dashboard
        </Button>
      </div>
    </section>
  )
}