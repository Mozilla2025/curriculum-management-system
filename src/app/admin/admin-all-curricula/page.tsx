import type { Metadata } from 'next'
import { AdminCurriculaClient } from '@/components/admin/curricula/AdminCurriculaClient'

export const metadata: Metadata = {
  title: 'Admin — All Curricula | MUST',
  description: 'Manage all curricula across schools and programs',
}

export default function AdminAllCurriculaPage() {
  return <AdminCurriculaClient />
}
