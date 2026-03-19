import type { Metadata } from 'next'
import { AdminSettingsClient } from './AdminSettingsClient'

export const metadata: Metadata = {
  title: 'Admin — System Settings | MUST',
  description: 'Manage comprehensive system settings and configurations',
}

export default function AdminSettingsPage() {
  return <AdminSettingsClient />
}
