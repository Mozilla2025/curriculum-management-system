import { cn } from '@/lib/utils'
import { SectionHeader, AnimatedCard } from '@/components/shared'
import { useIntersection } from '@/hooks'
import { processSteps } from '@/config/landing'

export function ProcessSection() {
  const { ref, isIntersecting } = useIntersection()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Our streamlined approach ensures efficient curriculum approval from submission to accreditation"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-green rounded-full md:-translate-x-1/2" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  'flex items-start gap-6 transition-all duration-500',
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
                  index % 2 === 1 && 'md:flex-row-reverse'
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Number badge */}
                <div className={cn(
                  'flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center',
                  'text-white font-extrabold text-xl shadow-soft border-4 border-white z-10',
                  index === 0 && 'bg-gradient-green',
                  index === 1 && 'bg-gradient-gold',
                  index === 2 && 'bg-gradient-teal'
                )}>
                  {step.number}
                </div>

                {/* Content */}
                <AnimatedCard
                  delay={index * 200}
                  isVisible={isIntersecting}
                  className="flex-1 p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}