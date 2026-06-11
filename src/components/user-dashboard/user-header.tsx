'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

interface UserHeaderProps {
  onMobileSidebarToggle?: () => void
}

export function UserHeader({ onMobileSidebarToggle }: UserHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/user/dashboard': 'Dashboard',
      '/user/curricula': 'All Curriculums',
      '/user/analytics': 'Reports',
      '/user/settings':  'Settings',
    }
    return titles[pathname] || 'CurricFlow'
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">

        {/* Mobile menu button */}
        <button
          onClick={onMobileSidebarToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo + title — mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <Image src="/images/logo.jpg" alt="MUST Logo" width={40} height={40} className="rounded-full" />
          <h1 className="text-base font-semibold text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Title — desktop */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{siteConfig.institution}</p>
        </div>

        {/* Admin login button */}
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-must-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Admin Login
        </button>

      </div>
    </header>
  )
}

export default UserHeader
