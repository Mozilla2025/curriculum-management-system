import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCurriculumById } from '@/lib/user-curricula'
import { CurriculumDetailView } from '@/components/user/curricula/CurriculumDetailView'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const item = getCurriculumById(id)
  return {
    title: item ? `${item.title} | CurricFlow` : 'Curriculum | CurricFlow',
  }
}

export default async function CurriculumDetailPage({ params }: PageProps) {
  const { id } = await params
  const curriculum = getCurriculumById(id)
  if (!curriculum) notFound()
  return <CurriculumDetailView curriculum={curriculum} />
}
