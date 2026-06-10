import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mockAdminCurricula } from '@/lib/mock-data'
import { CurriculumDetailClient } from '@/components/admin/curricula/detail/CurriculumDetailClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const curriculum = mockAdminCurricula.find((c) => c.id === id)
  return {
    title: curriculum
      ? `${curriculum.title} | Admin Dashboard`
      : 'Curriculum Detail | Admin Dashboard',
  }
}

export default async function CurriculumDetailPage({ params }: PageProps) {
  const { id } = await params
  const curriculum = mockAdminCurricula.find((c) => c.id === id)

  if (!curriculum) notFound()

  return <CurriculumDetailClient curriculum={curriculum} />
}
