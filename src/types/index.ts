// Navigation Types
export interface NavLink {
  label: string
  href: string
  icon?: string
}

export interface SidebarItem {
  id: string
  label: string
  path: string
  icon: string
  badge?: number
}

export interface SidebarSection {
  id: string
  title?: string
  items: SidebarItem[]
}

export interface SidebarConfig {
  type: 'admin' | 'user'
  header: {
    logo?: string
    title: string
    subtitle?: string
  }
  sections: SidebarSection[]
}

// Landing Page Types
export interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

export interface NewsItem {
  id: number
  icon: string
  title: string
  excerpt: string
  date: string
  image?: string
}

export interface StatItem {
  key: string
  target: number
  icon: string
  label: string
}

export interface CarouselImage {
  src: string
  title: string
  description: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
}

export interface TeamMember {
  icon: string
  name: string
  role: string
  description: string
}

// Common Types
export interface AnimatedComponentProps {
  delay?: number
  className?: string
  children?: React.ReactNode
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}