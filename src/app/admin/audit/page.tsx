import type { Metadata } from 'next'
import { AuditLogsClient } from './AuditLogsClient'

export const metadata: Metadata = {
  title: 'Admin — Audit Logs | MUST',
  description: 'Track system activities, user actions, and compliance events',
}

export default function AuditLogsPage() {
  return <AuditLogsClient />
}
