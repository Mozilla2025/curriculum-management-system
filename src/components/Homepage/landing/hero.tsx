'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Star, Rocket, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, Button } from '@/components/ui'
import { StatCounter } from './stat-counter'
import { ImageCarousel } from './image-carousel'
import { useIntersection } from '@/hooks'
import { heroStats } from '@/config/landing'
import { siteConfig } from '@/config/site'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  const { ref: statsRef, isIntersecting } = useIntersection()

  const handleLaunchDashboard = async () => {
    setIsNavigating(true)
    await new Promise(r => setTimeout(r, 1000))
    router.push(siteConfig.links.dashboard)
  }

  return (
    <section 
      id="heroSection"
      className={cn(
        'bg-must-green flex items-center relative overflow-hidden',
        'py-12 md:py-16 lg:py-20', 
        'before:absolute before:inset-0 before:animate-[landing-grid-float_20s_linear_infinite]'
      )}
    >
      <div className="max-w-[1820px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 w-full">
        
        {/* Content Column */}
        <div className="text-white flex flex-col justify-center h-full">
          {/* Updated Badge: Larger padding, text, and border */}
          <Badge 
            variant="outline" 
            className="mb-8 w-fit px-6 py-2 text-base md:text-lg font-extrabold border-2 tracking-wide shadow-sm backdrop-blur-md"
          >
            <Star className="w-5 h-5 md:w-6 md:h-6 mr-2 fill-current" />
            Welcome to Curriculum Management System
          </Badge>

          {/* Updated Heading: Significantly larger and bolder */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight drop-shadow-sm">
            Advanced Curriculum Management System
          </h1>

          {/* Updated Description: Increased readability and weight */}
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 leading-relaxed mb-10 max-w-2xl font-medium">
            Streamline your academic curriculum management with our comprehensive digital platform. 
            Designed specifically for MUST&apos;s academic excellence, featuring intelligent tracking, 
            seamless approvals, and detailed analytics.
          </p>

          {/* Updated Buttons: Larger touch targets */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              size="lg"
              onClick={handleLaunchDashboard}
              isLoading={isNavigating}
              leftIcon={<Rocket className="w-6 h-6" />}
              className="shadow-strong text-lg px-8 py-6"
            >
              Launch Dashboard
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToElement('featuresSection')}
              leftIcon={<Info className="w-6 h-6" />}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>

          {/* Stats Grid */}
          <div 
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {heroStats.map((stat) => (
              <StatCounter
                key={stat.key}
                label={stat.label}
                target={stat.target}
                icon={stat.icon}
                index={heroStats.indexOf(stat)}
                shouldAnimate={isIntersecting}
              />
            ))}
          </div>
        </div>

        {/* Carousel Column */}
        <div className="relative w-full flex items-center justify-center">
          <ImageCarousel />
        </div>
      </div>
    </section>
  )
}