import { Header, Footer } from '@/components/Homepage/layout'
import { Hero, NewsSection, FeaturesSection, CTASection } from '@/components/Homepage/landing'
import {
  AboutHero,
  MissionSection,
  FeaturesOverview,
  ProcessSection,
  TeamSection,
  AboutCTA
} from '@/components/Homepage/about'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <NewsSection />
        <FeaturesSection />
        <MissionSection />
        <FeaturesOverview />
        <ProcessSection />
        <TeamSection />
        {/* <AboutCTA />
        <CTASection /> */}
      </main>
      <Footer />
    </div>
  )
}