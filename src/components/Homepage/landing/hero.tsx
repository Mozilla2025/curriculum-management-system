'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { StatCounter } from './stat-counter'
import { useIntersection } from '@/hooks'
import { heroStats } from '@/config/landing'
import { siteConfig } from '@/config/site'
import { scrollToElement } from '@/lib/utils'

const HeroDashboardMockup = dynamic(
  () => import('./hero-dashboard-mockup').then((m) => m.HeroDashboardMockup),
  { ssr: false }
)

export function Hero() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  const { ref: statsRef, isIntersecting } = useIntersection()

  const handleAccessDashboard = async () => {
    setIsNavigating(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push(siteConfig.links.dashboard)
  }

  return (
    <section
      id="heroSection"
      className={cn('relative overflow-hidden bg-must-green', 'py-20 md:py-28 lg:py-32')}
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Top edge rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Bottom-left ambient glow — very subtle, no sweeping gradient */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-must-green/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div className="text-white">

            {/* Institutional label — replaces generic badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-white shrink-0" />
              <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                {siteConfig.institution}
              </span>
            </div>

            <h1 className="font-display font-bold text-[2.6rem] md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-white">
              Official Curriculum<br />
              Management<br />
              System
            </h1>

            <p className="text-white/95 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-normal">
              A centralised platform for faculty to collaborate, submit, and track
              curriculum proposals — from department drafting through Senate
              approval to CUE accreditation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={handleAccessDashboard}
                isLoading={isNavigating}
                className="font-semibold"
              >
                Access Dashboard
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToElement('featuresSection')}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Dashboard mockup (hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-end">
            <HeroDashboardMockup />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {heroStats.map((stat, index) => (
            <StatCounter
              key={stat.key}
              label={stat.label}
              target={stat.target}
              icon={stat.icon}
              index={index}
              shouldAnimate={isIntersecting}
            />
          ))}
        </div>
      </div>

      {/* Bottom edge rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
    </section>
  )
}
