'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { SectionHeader, AnimatedCard } from '@/components/shared'
import { useIntersection } from '@/hooks'
import { features } from '@/config/landing'
import type { Feature } from '@/types'

interface FeatureCardProps extends Feature {
  index: number
  isVisible: boolean
}

const iconGradients = [
  'bg-gradient-green',
  'bg-gradient-gold',
  'bg-gradient-teal',
]

function FeatureCard({ icon, title, description, index, isVisible }: FeatureCardProps) {
  return (
    <AnimatedCard 
      delay={index * 200} 
      isVisible={isVisible}
      className="p-8 text-center bg-gray-50 hover:bg-white"
    >
      {/* Icon */}
      <div 
        className={cn(
          'w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6',
          'text-white shadow-soft transition-all duration-400',
          'group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-green',
          iconGradients[index % iconGradients.length],
          // Ring effect on hover
          'relative before:absolute before:-inset-0.5 before:rounded-[18px]',
          'before:bg-gradient-gold before:opacity-0 before:transition-opacity',
          'before:-z-10 group-hover:before:opacity-100'
        )}
      >
        <Icon name={icon} size={32} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed font-medium">
        {description}
      </p>
    </AnimatedCard>
  )
}

export function FeaturesSection() {
  const { ref, isIntersecting } = useIntersection()

  return (
    <section 
      id="featuresSection"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-white py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeader
          title="System Features"
          subtitle="Powerful tools designed to enhance your curriculum management experience"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              index={index}
              isVisible={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  )
}