import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mockCurriculumTrackingData } from '@/lib/mock-data'
import { TrackingDetailClient } from '@/components/admin/curriculum-tracking/detail/TrackingDetailClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const item = mockCurriculumTrackingData.find((c) => String(c.id) === id)
  return {
    title: item
      ? `${item.displayTitle ?? item.title} | Track Progress`
      : 'Tracking Detail | Admin Dashboard',
  }
}

export default async function TrackingDetailPage({ params }: PageProps) {
  const { id } = await params
  const curriculum = mockCurriculumTrackingData.find((c) => String(c.id) === id)
  if (!curriculum) notFound()
  return <TrackingDetailClient curriculum={curriculum} />
}
