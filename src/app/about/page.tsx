'use client'

import { Header, Footer } from '@/components/Homepage/layout'
import {
  AboutHero,
  MissionSection,
  FeaturesOverview,
  ProcessSection,
  TeamSection,
  AboutCTA
} from '@/components/Homepage/about'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <MissionSection />
        <FeaturesOverview />
        <ProcessSection />
        <TeamSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  )
}