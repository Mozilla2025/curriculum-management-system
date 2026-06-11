'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui'
import { StatCounter } from './stat-counter'
import { useIntersection } from '@/hooks'
import { useGetStatsSummary } from '@/hooks/api/stats'
import { heroStats } from '@/config/landing'
import { siteConfig } from '@/config/site'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  const { ref: statsRef, isIntersecting } = useIntersection()
  const { data: statsData, isPending } = useGetStatsSummary()

  // Only show loading state on the very first fetch — not on revisit with cached data
  const isStatsLoading = isPending && !statsData

  // Animate only after data has arrived AND the section is visible
  const shouldAnimateStats = isIntersecting && !isStatsLoading

  // Map backend stats to hero stat items.
  // "Academic Levels" has no backend endpoint — kept static from config.
  const liveStats = heroStats.map((stat) => {
    if (stat.key === 'curricula' && statsData)
      return { ...stat, target: statsData.totalCurriculums }
    if (stat.key === 'schools' && statsData)
      return { ...stat, target: statsData.totalSchools }
    if (stat.key === 'departments' && statsData)
      return { ...stat, target: statsData.totalDepartments }
    return stat
  })

  const handleAccessDashboard = async () => {
    setIsNavigating(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push(siteConfig.links.dashboard)
  }

  return (
    <section
      id="heroSection"
      className="relative flex items-center overflow-hidden min-h-[92vh] py-24 md:py-28"
    >
      {/* Campus background */}
      <Image
        src="/hero.jpeg"
        alt="Meru University of Science & Technology campus"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark emerald gradient — natural photo, just enough to read text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,46,26,0.66) 0%, rgba(4,52,29,0.34) 38%, rgba(3,42,24,0.74) 100%)',
        }}
      />
      {/* Soft contrast scrim behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 62% at 50% 46%, rgba(0,40,22,0.55) 0%, rgba(0,40,22,0.18) 48%, transparent 74%)',
        }}
      />

      {/* ── Centered content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">

        {/* Pill badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs md:text-sm font-semibold backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-must-gold" />
            {siteConfig.institution}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-must-gold/15 border border-must-gold/30 text-must-gold text-xs md:text-sm font-semibold backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-must-gold animate-pulse" />
            Official Curriculum Platform
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-white text-[2.7rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight"
          style={{ textShadow: '0 2px 16px rgba(0,50,26,0.35)' }}
        >
          Every Curriculum,
          <br />
          <span className="text-must-gold-light">Tracked to Accreditation</span>
        </h1>

        {/* Purpose statement */}
        <p
          className="mt-7 mx-auto max-w-2xl text-white/90 text-base md:text-lg leading-relaxed"
          style={{ textShadow: '0 1px 10px rgba(0,50,26,0.30)' }}
        >
          One platform for departments, committees, and reviewers to submit,
          track, and approve academic programmes — from the first draft through
          Senate and Quality Assurance to full CUE accreditation. Always know
          where each curriculum stands and what happens next.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={handleAccessDashboard}
            isLoading={isNavigating}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="font-semibold shadow-xl shadow-black/30"
          >
            Access Dashboard
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToElement('featuresSection')}
          >
            Explore Features
          </Button>
        </div>

        {/* Trust line */}
        <div className="mt-7 flex items-center justify-center gap-2.5 text-white/65 text-sm">
          <ShieldCheck className="w-4 h-4 text-must-gold flex-shrink-0" />
          Role-based access · Full audit trail · CUE-compliant workflow
        </div>

        {/* Divider */}
        <div className="mt-14 mb-10 mx-auto max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Stats row — numbers driven by GET /api/v1/stats/summary */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 max-w-3xl mx-auto"
        >
          {liveStats.map((stat, index) => (
            <StatCounter
              key={stat.key}
              label={stat.label}
              target={stat.target}
              icon={stat.icon}
              index={index}
              shouldAnimate={shouldAnimateStats}
              isLoading={isStatsLoading}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
