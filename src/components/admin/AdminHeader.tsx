'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, X, Bell, UserCircle, Settings, HelpCircle, LogOut, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  icon: string
}

interface User {
  name: string
  email: string
  role: string
  avatar?: string
}

interface AdminHeaderProps {
  onSearchSubmit?: (query: string) => void
  user?: User
  systemHealth?: number
  notifications?: Notification[]
  onToggleSidebar?: () => void
}

export function AdminHeader({
  onSearchSubmit,
  user = {
    name: 'Admin User',
    email: 'admin@must.ac.ke',
    role: 'System Administrator'
  },
  systemHealth = 98.5,
  notifications = [],
  onToggleSidebar
}: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery.trim())
    }
    setIsSearchExpanded(false)
  }

  const handleLogout = async () => {
    if (isLoggingOut) return
    
    try {
      setIsLoggingOut(true)
      // Implement logout logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getSystemHealthStatus = () => {
    if (systemHealth >= 98) return { status: 'online', color: 'green', text: 'System Online' }
    if (systemHealth >= 90) return { status: 'warning', color: 'yellow', text: 'System Warning' }
    return { status: 'error', color: 'red', text: 'System Error' }
  }

  const healthStatus = getSystemHealthStatus()
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-30 w-full bg-must-green shadow-md border-b border-must-green-dark h-16 transition-all duration-300">
      <div className="h-full px-3 md:px-6">
        <div className="flex items-center justify-between h-full gap-2 md:gap-4 relative">
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo and Brand (Mobile) */}
          <div className={cn(
            'flex items-center gap-3 lg:hidden',
            isSearchExpanded && 'hidden'
          )}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
              <Image
                src="/images/logo.jpg"
                alt="MUST Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-tight">MUST</span>
              <span className="text-white/90 text-xs block leading-tight">Admin Dashboard</span>
            </div>
          </div>

          {/* Search Bar */}
          <div 
            ref={searchRef}
            className={cn(
              'flex-1 flex items-center justify-center transition-all duration-300',
              isSearchExpanded && 'absolute inset-0 bg-must-green px-3 z-10'
            )}
          >
            <div className="w-full max-w-md lg:max-w-xl">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSearchExpanded(true)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="search"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/20 transition-all text-sm"
                    placeholder="Search users, curricula, or tracking ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                  />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {isSearchExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(false)}
                      className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 text-white"
                      aria-label="Close search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Navigation */}
          <div className={cn(
            'flex items-center gap-2 md:gap-4',
            isSearchExpanded && 'hidden md:flex'
          )}>
            {/* System Health Indicator (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <div className={cn(
                'flex items-center',
                healthStatus.color === 'green' && 'text-green-400',
                healthStatus.color === 'yellow' && 'text-yellow-400',
                healthStatus.color === 'red' && 'text-red-400'
              )}>
                <div className={cn(
                  'w-2 h-2 rounded-full animate-pulse',
                  healthStatus.color === 'green' && 'bg-green-400',
                  healthStatus.color === 'yellow' && 'bg-yellow-400',
                  healthStatus.color === 'red' && 'bg-red-400'
                )} />
              </div>
              <span className="text-white text-sm font-medium hidden xl:block">
                {healthStatus.text}
              </span>
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[1.125rem] h-[1.125rem] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-must-green">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <span className="text-sm text-gray-500">{unreadCount} new</span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                            !notification.read && 'bg-must-green-lighter/10'
                          )}
                        >
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-must-green rounded-full flex items-center justify-center flex-shrink-0">
                              <Bell className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm mb-1">
                                {notification.title}
                              </div>
                              <div className="text-sm text-gray-600 line-clamp-2 mb-1">
                                {notification.message}
                              </div>
                              <div className="text-xs text-gray-400">
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <span className="text-sm">No new notifications</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full bg-must-green text-white py-2 rounded-lg hover:bg-must-green-dark transition-colors font-medium text-sm">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                disabled={isLoggingOut}
                className="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg transition-colors p-2 disabled:opacity-60"
                aria-label="User profile menu"
              >
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium leading-tight">{user.name}</span>
                  <span className="text-xs opacity-80 leading-tight">{user.role}</span>
                </div>
                <div className="w-8 h-8 bg-white text-must-green rounded-full flex items-center justify-center font-bold">
                  {user.avatar ? (
                    <Image src={user.avatar} alt="Profile" width={32} height={32} className="rounded-full" />
                  ) : (
                    <UserCircle className="w-5 h-5" />
                  )}
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-must-green text-white rounded-full flex items-center justify-center font-bold">
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {user.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <UserCircle className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </button>
                    
                    <div className="border-t border-gray-200 my-2" />
                    
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-60"
                    >
                      <LogOut className={cn('w-4 h-4', isLoggingOut && 'animate-spin')} />
                      <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}