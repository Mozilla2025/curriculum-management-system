import type { Metadata } from 'next'
import { AdminCurriculaClient } from '@/components/admin/curricula/AdminCurriculaClient'
import {
  mockAdminCurricula,
  mockAdminSchools,
  mockAdminPrograms,
  mockAdminStats,
} from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Admin — All Curricula | MUST',
  description: 'Manage all curricula across schools and programs',
}

export default function AdminAllCurriculaPage() {
  return (
    <AdminCurriculaClient
      initialCurricula={mockAdminCurricula}
      initialSchools={mockAdminSchools}
      initialPrograms={mockAdminPrograms}
      initialStats={mockAdminStats}
    />
  )
}