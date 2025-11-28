import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { SectionHeader, AnimatedCard } from '@/components/shared'
import { useIntersection } from '@/hooks'
import { teamMembers } from '@/config/landing'

export function TeamSection() {
  const { ref, isIntersecting } = useIntersection()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeader
          title="Our Stakeholders"
          subtitle="Meet the dedicated teams that make curriculum excellence possible"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <AnimatedCard
              key={member.name}
              delay={index * 150}
              isVisible={isIntersecting}
              className="p-8 text-center"
            >
              <div className={cn(
                'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4',
                'text-white shadow-soft',
                index === 0 && 'bg-gradient-green',
                index === 1 && 'bg-gradient-gold',
                index === 2 && 'bg-gradient-teal',
                index === 3 && 'bg-gradient-to-br from-gray-600 to-gray-400'
              )}>
                <Icon name={member.icon} size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-must-green font-semibold text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}