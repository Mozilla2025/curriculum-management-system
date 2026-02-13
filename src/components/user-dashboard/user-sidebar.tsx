'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, BarChart, Settings, X } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/user/dashboard' as const,
    icon: Home
  },
  {
    id: 'curricula',
    label: 'Curricula',
    path: '/user/curricula' as const,
    icon: FileText
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/user/analytics' as const,
    icon: BarChart
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/user/settings' as const,
    icon: Settings
  }
]

export function UserSidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-white flex-shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="MUST Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-must-gold font-bold text-[1rem] md:text-[1.125rem] lg:text-[1.1875rem] leading-tight">
                Curriculum Management System
              </h2>
            </div>
          </div>
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-[0.375rem] md:space-y-2 overflow-y-auto bg-must-green">
        <div className="space-y-[0.375rem] md:space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={onClose}
                className={`
                  flex items-center w-full px-[0.875rem] md:px-4 lg:px-[1.125rem] py-[0.45rem] md:py-[0.875rem] lg:py-2
                  text-[0.8125rem] md:text-[0.975rem] lg:text-[0.875rem] font-semibold
                  rounded-lg transition-all duration-200 ease-in-out
                  min-h-[44px] md:min-h-[48px]
                  ${active 
                    ? 'bg-white text-gray-900 shadow-lg' 
                    : 'bg-must-green border-none text-gray-900 hover:bg-white/25 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-[1.125rem] md:w-5 lg:w-[1.25rem] h-[1.125rem] md:h-5 lg:h-[1.25rem] mr-3 md:mr-[0.875rem] lg:mr-3 flex-shrink-0 transition-colors ${active ? 'text-must-gold' : 'text-gray-700'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 bottom-0 w-64 bg-must-green border-r border-white/10 shadow-sm z-30">
        {sidebarContent}
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-64 bg-must-green border-r border-white/10 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

export default UserSidebar
