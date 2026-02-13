import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

type IconName = keyof typeof LucideIcons

interface IconProps {
  name: string
  size?: number
  className?: string
}

// Map common icon names to Lucide equivalents
const iconMap: Record<string, IconName> = {
  'book-open': 'BookOpen',
  'building': 'Building2',
  'graduation-cap': 'GraduationCap',
  'users': 'Users',
  'search': 'Search',
  'list-checks': 'ListChecks',
  'pie-chart': 'PieChart',
  'calendar': 'Calendar',
  'trending-up': 'TrendingUp',
  'award': 'Award',
  'star': 'Star',
  'rocket': 'Rocket',
  'info': 'Info',
  'arrow-right': 'ArrowRight',
  'tachometer-alt': 'Gauge',
  'route': 'Route',
  'users-cog': 'UserCog',
  'bar-chart': 'BarChart3',
  'user-graduate': 'GraduationCap',
  'shield': 'Shield',
  'settings': 'Settings',
  'university': 'Building',
  'bullseye': 'Target',
  'spinner': 'Loader2',
  'times': 'X',
  'bars': 'Menu',
  'toggle-on': 'ToggleRight',
  'toggle-off': 'ToggleLeft',
  'sign-out-alt': 'LogOut',
}

export function Icon({ name, size = 24, className }: IconProps) {
  // Convert icon name to PascalCase for Lucide
  const lucideName = iconMap[name] || 
    name.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('') as IconName

  const LucideIcon = LucideIcons[lucideName] as React.ComponentType<{ size?: number; className?: string }>

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return <LucideIcon size={size} className={cn('flex-shrink-0', className)} />
}