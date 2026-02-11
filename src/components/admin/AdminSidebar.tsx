'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Users,
  BarChart3,
  FileText,
  Bell,
  Shield,
  Settings,
  LogOut,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onLogout?: () => Promise<void>
}

const navigationSections = [
  {
    id: 'main-navigation',
    title: null,
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard Overview',
        icon: LayoutDashboard,
        path: '/admin/dashboard',
        badge: null
      },
      {
        id: 'curricula',
        label: 'All Curricula',
        icon: BookOpen,
        path: '/admin/admin-all-curricula',
        badge: 24
      },
      {
        id: 'tracking',
        label: 'Curriculum Tracking',
        icon: Route,
        path: '/admin/admin-curriculum-tracking',
        badge: null
      },
      {
        id: 'users',
        label: 'User Management',
        icon: Users,
        path: '/admin/admin-user-management',
        badge: null
      },
      {
        id: 'monitoring',
        label: 'System Monitoring',
        icon: BarChart3,
        path: '/admin/admin-system-monitoring',
        badge: null
      },
      {
        id: 'reports',
        label: 'Reports & Analytics',
        icon: FileText,
        path: '/admin/admin-reports',
        badge: null
      }
    ]
  },
  {
    id: 'system-tools',
    title: 'System Tools',
    items: [
      {
        id: 'notifications',
        label: 'Notifications Center',
        icon: Bell,
        path: '/admin/admin-notifications',
        badge: null
      },
      {
        id: 'audit',
        label: 'Audit Logs',
        icon: Shield,
        path: '/admin/audit',
        badge: null
      },
      {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        path: '/admin/admin-settings',
        badge: null
      }
    ]
  }
]

export function AdminSidebar({ isOpen = false, onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    if (!onLogout || isLoggingOut) return
    
    try {
      setIsLoggingOut(true)
      await onLogout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800">
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
                System Administrator
              </h2>
              <p className="text-white/80 text-[0.8125rem] md:text-[0.875rem] lg:text-[0.9375rem] leading-tight mt-1 opacity-90">
                Complete System Control
              </p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto bg-must-green">
        {navigationSections.map((section) => (
          <div key={section.id} className="space-y-2">
            {section.title && (
              <h3 className="px-3 text-[0.6875rem] md:text-[0.75rem] lg:text-[0.8125rem] font-semibold text-black/80 uppercase tracking-wider opacity-80 border-b border-black/10 pb-2">
                {section.title}
              </h3>
            )}
            
            <div className="space-y-[0.375rem] md:space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <Link
                    key={item.id}
                    href={item.path as any}
                    onClick={onClose}
                    className={cn(
                      'flex items-center w-full px-[0.875rem] md:px-4 lg:px-[1.125rem]',
                      'py-[0.45rem] md:py-[0.875rem] lg:py-2',
                      'text-[0.8125rem] md:text-[0.975rem] lg:text-[0.9rem] font-semibold',
                      'rounded-lg transition-all duration-200 ease-in-out',
                      'min-h-[44px] md:min-h-[48px] relative',
                      active
                        ? 'bg-white text-gray-900 shadow-lg font-bold'
                        : 'bg-must-green text-gray-900 hover:bg-white/25 hover:text-gray-900'
                    )}
                  >
                    <Icon 
                      className={cn(
                        'w-[1.125rem] md:w-5 lg:w-[1.25rem]',
                        'h-[1.125rem] md:h-5 lg:h-[1.25rem]',
                        'mr-3 md:mr-[0.875rem] lg:mr-3 flex-shrink-0 transition-colors',
                        active ? 'text-must-gold' : 'text-gray-700'
                      )}
                    />
                    <span className="truncate flex-1">{item.label}</span>
                    
                    {item.badge && (
                      <span className={cn(
                        'ml-auto px-2 py-0.5 rounded-full text-xs font-bold',
                        'min-w-[1.25rem] text-center',
                        active
                          ? 'bg-must-gold text-white'
                          : 'bg-red-500 text-white shadow-sm'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout Section */}
        <div className="pt-6 border-t border-black/10">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              'flex items-center w-full px-[0.875rem] md:px-4 lg:px-[1.125rem]',
              'py-[0.45rem] md:py-[0.875rem] lg:py-2',
              'text-[0.8125rem] md:text-[0.975rem] lg:text-[0.9rem] font-semibold',
              'rounded-lg transition-all duration-200 ease-in-out',
              'min-h-[44px] md:min-h-[48px]',
              'bg-red-500/15 text-red-600 border border-red-500/30',
              'hover:bg-red-500 hover:text-white hover:border-red-500',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            <LogOut 
              className={cn(
                'w-[1.125rem] md:w-5 lg:w-[1.25rem]',
                'h-[1.125rem] md:h-5 lg:h-[1.25rem]',
                'mr-3 md:mr-[0.875rem] lg:mr-3 flex-shrink-0',
                isLoggingOut && 'animate-spin'
              )}
            />
            <span className="truncate">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
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
        className={cn(
          'fixed left-0 top-0 bottom-0 w-64 bg-must-green border-r border-white/10 shadow-xl z-50',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}