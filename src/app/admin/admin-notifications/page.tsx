import type { Metadata } from 'next'
import { NotificationsPageClient } from './NotificationsPageClient'

export const metadata: Metadata = {
  title: 'Admin — Notifications Center | MUST',
  description: 'Manage all system notifications, alerts, and reminders',
}

export default function AdminNotificationsPage() {
  return <NotificationsPageClient />
}
