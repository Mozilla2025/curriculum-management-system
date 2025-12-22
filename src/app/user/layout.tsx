// src/app/user/layout.tsx

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Dashboard | CurricFlow',
  description: 'Access and manage your curriculum information',
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <div className="p-6 md:p-8 max-w-[1820px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}