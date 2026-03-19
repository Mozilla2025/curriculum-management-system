import type { Metadata } from 'next'
import { ReportsClient } from './ReportsClient'

export const metadata: Metadata = {
  title: 'Admin — Reports & Analytics | MUST',
  description: 'Comprehensive curriculum tracking insights and reporting',
}

export default function AdminReportsPage() {
  return <ReportsClient />
}
