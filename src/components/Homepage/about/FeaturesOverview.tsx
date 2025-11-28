import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { SectionHeader, AnimatedCard } from '@/components/shared'
import { useIntersection } from '@/hooks'
import { aboutFeatures } from '@/config/landing'

export function FeaturesOverview() {
  const { ref, isIntersecting } = useIntersection()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeader
          title="Key Capabilities"
          subtitle="Discover the powerful features that make curriculum management efficient and transparent"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {aboutFeatures.map((feature, index) => (
            <AnimatedCard 
              key={feature.id}
              delay={index * 200}
              isVisible={isIntersecting}
              className="p-8 text-center"
            >
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6',
                'text-white shadow-soft',
                index === 0 && 'bg-gradient-green',
                index === 1 && 'bg-gradient-gold',
                index === 2 && 'bg-gradient-teal'
              )}>
                <Icon name={feature.icon} size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}