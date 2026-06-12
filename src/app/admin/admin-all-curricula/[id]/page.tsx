import type { Metadata } from 'next'
import { CurriculumDetailPageClient } from '@/components/admin/curricula/detail/CurriculumDetailPageClient'

export const metadata: Metadata = {
  title: 'Curriculum Detail | Admin Dashboard',
}

export default function CurriculumDetailPage() {
  return <CurriculumDetailPageClient />
}
