import { Header, Footer } from '@/components/Homepage/layout'
import { Hero, NewsSection, FeaturesSection, CTASection } from '@/components/Homepage/landing'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <NewsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}