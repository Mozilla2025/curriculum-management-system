'use client'

import { useState, useEffect } from 'react'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { AdminSidebar } from '../../components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = async () => {
    try {
      
      console.log('Logging out...')
      
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Implement search functionality
  }

  // Mock data
  const mockUser = {
    name: 'Admin User',
    email: 'admin@must.ac.ke',
    role: 'System Administrator'
  }

  const mockNotifications = [
    {
      id: 1,
      title: 'New curriculum submitted',
      message: 'BSc Computer Science awaiting review',
      time: '5 minutes ago',
      read: false,
      icon: 'bell'
    },
    {
      id: 2,
      title: 'User account created',
      message: 'Dr. Jane Smith added to QA Committee',
      time: '1 hour ago',
      read: false,
      icon: 'user'
    },
    {
      id: 3,
      title: 'System update',
      message: 'Curriculum tracking system updated to v2.1',
      time: '3 hours ago',
      read: true,
      icon: 'info'
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Header */}
        <AdminHeader
          onSearchSubmit={handleSearch}
          user={mockUser}
          systemHealth={98.5}
          notifications={mockNotifications}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="pt-4 px-6 md:pt-4 md:px-8 max-w-[1820px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}