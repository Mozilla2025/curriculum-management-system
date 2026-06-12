import type { Metadata } from 'next'
import { TrackingDetailPageClient } from '@/components/admin/curriculum-tracking/detail/TrackingDetailPageClient'

export const metadata: Metadata = {
  title: 'Tracking Detail | Admin Dashboard',
}

export default function TrackingDetailPage() {
  return <TrackingDetailPageClient />
}
