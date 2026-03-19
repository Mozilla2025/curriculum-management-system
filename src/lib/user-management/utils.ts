import type { User, UserStats, UserRole, UserFormData, EditUserFormData, FormErrors } from '@/types/user-management'

export function formatUserAvatar(firstName: string, lastName: string): string {
  return `${(firstName || 'U')[0]}${(lastName || '')[0]}`.toUpperCase()
}

export function computeStats(users: User[]): UserStats {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    deans: users.filter((u) => u.roles.includes('DEAN')).length,
    pendingAccess: users.filter((u) => u.status === 'pending').length,
  }
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    ADMIN: 'Admin',
    DEAN: 'Dean of School',
    QA: 'Quality Assurance',
    DEPT_REP: 'Department Rep',
    SENATE: 'Senate',
    STAFF: 'Staff',
  }
  return labels[role] ?? role
}

export function filterUsers(users: User[], search: string, role: string, status: string): User[] {
  return users.filter((user) => {
    const matchesSearch =
      !search ||
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())

    const matchesRole = !role || user.roles.includes(role as UserRole)
    const matchesStatus = !status || user.status === status

    return matchesSearch && matchesRole && matchesStatus
  })
}

export function validateAddUserForm(data: UserFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.firstName.trim()) errors.firstName = 'First name is required'
  if (!data.lastName.trim()) errors.lastName = 'Last name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid'
  if (!data.username.trim()) errors.username = 'Username is required'
  if (!data.password) errors.password = 'Password is required'
  else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters'
  if (!data.confirmPassword) errors.confirmPassword = 'Confirm password is required'
  else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match'
  return errors
}

export function validateEditUserForm(data: EditUserFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.firstName.trim()) errors.firstName = 'First name is required'
  if (!data.lastName.trim()) errors.lastName = 'Last name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid'
  if (!data.username.trim()) errors.username = 'Username is required'
  return errors
}
