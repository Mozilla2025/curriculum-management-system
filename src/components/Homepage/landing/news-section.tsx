'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { SectionHeader } from '@/components/shared'
import { AnimatedCard } from '@/components/shared'
import { useIntersection } from '@/hooks'
import { newsItems } from '@/config/landing'
import type { NewsItem } from '@/types'

interface NewsCardProps extends NewsItem {
  index: number
  isVisible: boolean
}

function NewsCard({ icon, title, excerpt, date, image, index, isVisible }: NewsCardProps) {
  return (
    <AnimatedCard 
      delay={index * 200} 
      isVisible={isVisible}
      className="cursor-pointer group"
    >
      {/* Image/Placeholder */}
      <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-400 group-hover:scale-110"
          />
        ) : (
          <div className={cn(
            'w-full h-full bg-gradient-green flex items-center justify-center',
            'transition-all duration-400 group-hover:bg-gradient-gold group-hover:scale-110'
          )}>
            <Icon name={icon} size={48} className="text-white" />
          </div>
        )}
        
        {/* Shine effect */}
        <div className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-gradient-to-r from-transparent via-white/20 to-transparent',
          'group-hover:translate-x-full transition-transform duration-600'
        )} />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {excerpt}
        </p>
        <span className="text-must-green font-bold text-sm">
          {date}
        </span>
      </div>
    </AnimatedCard>
  )
}

export function NewsSection() {
  const { ref, isIntersecting } = useIntersection()

  return (
    <section 
      id="newsSection"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-gray-50 py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeader
          title="Latest Updates"
          subtitle="Stay informed about curriculum management improvements and academic developments"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <NewsCard
              key={news.id}
              {...news}
              index={index}
              isVisible={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  )
}