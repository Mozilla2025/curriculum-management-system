import type { Metadata } from 'next'
import { CurriculumTrackingPageClient } from './CurriculumTrackingPageClient'

export const metadata: Metadata = {
  title: 'Admin — Curriculum Tracking | MUST',
  description: 'Monitor and manage curriculum progress through all approval stages',
}

export default function AdminCurriculumTrackingPage() {
  return <CurriculumTrackingPageClient />
}
