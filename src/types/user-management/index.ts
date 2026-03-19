export type UserRole =
  | 'ADMIN'
  | 'DEAN'
  | 'QA'
  | 'DEPT_REP'
  | 'SENATE'
  | 'STAFF'

export type UserStatus = 'active' | 'inactive' | 'pending'

export interface User {
  id: string | number
  firstName: string
  lastName: string
  email: string
  username: string
  phoneNumber?: string | null
  roles: UserRole[]
  status: UserStatus
  department: string
  avatar: string
  createdAt?: string
  updatedAt?: string
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  deans: number
  pendingAccess: number
}

export interface UserFilters {
  search: string
  role: string
  status: string
}

export interface UserFormData {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
  school: string
  roles: UserRole[]
}

export interface EditUserFormData {
  firstName: string
  lastName: string
  email: string
  username: string
  phoneNumber: string
  department: string
  enabled: boolean
}

export interface UserNotification {
  show: boolean
  message: string
  type: 'success' | 'error' | 'info'
}

export interface UserModalState {
  addUser: boolean
  editUser: boolean
  manageRoles: boolean
  confirm: boolean
  deleteRole: boolean
}

export interface FormErrors {
  [key: string]: string
}

export const ROLE_CONFIG: Record<
  UserRole,
  { label: string; badgeClass: string }
> = {
  ADMIN: {
    label: 'Admin',
    badgeClass:
      'bg-red-100 text-red-700 border border-red-200',
  },
  DEAN: {
    label: 'Dean of School',
    badgeClass:
      'bg-blue-100 text-blue-700 border border-blue-200',
  },
  QA: {
    label: 'Quality Assurance',
    badgeClass:
      'bg-must-green/10 text-must-green-darker border border-must-green/20',
  },
  DEPT_REP: {
    label: 'Department Rep',
    badgeClass:
      'bg-amber-100 text-amber-700 border border-amber-200',
  },
  SENATE: {
    label: 'Senate',
    badgeClass:
      'bg-gray-100 text-gray-600 border border-gray-200',
  },
  STAFF: {
    label: 'Staff',
    badgeClass:
      'bg-purple-100 text-purple-700 border border-purple-200',
  },
}

export const ALL_ROLES: { value: UserRole; label: string }[] = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'DEAN', label: 'Dean of School' },
  { value: 'QA', label: 'Quality Assurance' },
  { value: 'DEPT_REP', label: 'Department Rep' },
  { value: 'SENATE', label: 'Senate' },
  { value: 'STAFF', label: 'Staff' },
]
