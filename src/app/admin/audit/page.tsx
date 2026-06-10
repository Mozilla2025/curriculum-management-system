import type { Metadata } from 'next'
import { AuditLogsClient } from './AuditLogsClient'

export const metadata: Metadata = {
  title: 'Admin — Activity Log | MUST',
  description: 'Track system activities, user actions, and compliance events',
}

export default function AuditLogsPage() {
  return <AuditLogsClient />
}
