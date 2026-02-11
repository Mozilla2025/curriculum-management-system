export const AUTH_TOKENS = {
  ACCESS_TOKEN: 'auth_token',
  USER_ROLE: 'user_role',
  USER_DATA: 'user_data',
} as const

export const USER_ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]
