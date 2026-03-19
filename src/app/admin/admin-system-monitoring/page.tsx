import type { Metadata } from 'next'
import { SystemMonitoringClient } from './SystemMonitoringClient'

export const metadata: Metadata = {
  title: 'Admin — System Monitoring | MUST',
  description: 'Real-time system performance and health monitoring',
}

export default function AdminSystemMonitoringPage() {
  return <SystemMonitoringClient />
}
