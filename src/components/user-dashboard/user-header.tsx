'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Moon, Sun, Eye, EyeOff, LogOut, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

interface UserHeaderProps {
  onMobileSidebarToggle?: () => void
}

export function UserHeader({ onMobileSidebarToggle }: UserHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [focusMode, setFocusMode] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/user/dashboard': 'Curriculum Dashboard',
      '/user/curricula': 'All Curricula',
      '/user/analytics': 'Analytics & Reports',
      '/user/settings': 'System Settings'
    }
    return titles[pathname] || 'CurricFlow'
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    
  }

  const toggleFocusMode = () => {
    setFocusMode(prev => !prev)
    document.body.classList.toggle('user-focus-mode')
  }

  const handleAdminLogin = () => {
    // Navigate to the auth login page
    router.push('/login')
  }

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileSidebarToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo & Page Title - Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <Image
            src="/images/logo.jpg"
            alt="MUST Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Page Title - Desktop */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-600 mt-0.5">{siteConfig.institution}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Focus Mode Toggle */}
          <button
            onClick={toggleFocusMode}
            className={`p-2 rounded-lg transition-colors ${
              focusMode 
                ? 'bg-must-green text-white' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={focusMode ? 'Exit focus mode' : 'Enable focus mode'}
          >
            {focusMode ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>

          {/* Admin Login */}
          <button
            onClick={handleAdminLogin}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-must-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Admin Login
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-must-green flex items-center justify-center text-white font-semibold">
                U
              </div>
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      // router.push('/user/profile')
                      console.log('Profile - route not yet created')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      handleLogout()
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
