import type { Metadata } from 'next'
import { UserManagementClient } from '@/components/admin/user-management/UserManagementClient'

export const metadata: Metadata = {
  title: 'Admin — User Management | MUST',
  description: 'Manage users, assign roles, and control system access',
}

export default function AdminUserManagementPage() {
  return <UserManagementClient />
}
