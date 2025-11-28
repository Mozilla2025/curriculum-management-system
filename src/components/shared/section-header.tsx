import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={cn('mb-12', alignmentClass[align], className)}>
      <h2 
        className={cn(
          'text-3xl md:text-4xl font-extrabold text-gray-900 mb-4',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={cn(
            'text-lg text-gray-600 max-w-2xl font-medium',
            align === 'center' && 'mx-auto',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}