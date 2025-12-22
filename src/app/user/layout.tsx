// src/app/user/layout.tsx
'use client'

import { useState } from 'react'
import { UserHeader, UserSidebar } from '@/components/user-dashboard'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={handleMobileSidebarClose} 
      />
      
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <UserHeader onMobileSidebarToggle={handleMobileSidebarToggle} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-[1820px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}