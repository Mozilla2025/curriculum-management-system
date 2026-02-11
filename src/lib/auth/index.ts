import { AUTH_TOKENS, USER_ROLES, type UserRole } from './constants'

export { AUTH_TOKENS, USER_ROLES, type UserRole }

export interface UserData {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKENS.ACCESS_TOKEN, token)
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKENS.ACCESS_TOKEN)
  }
  return null
}

export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKENS.ACCESS_TOKEN)
    localStorage.removeItem(AUTH_TOKENS.USER_ROLE)
    localStorage.removeItem(AUTH_TOKENS.USER_DATA)
  }
}

export function setUserRole(role: UserRole): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKENS.USER_ROLE, role)
  }
}

export function getUserRole(): UserRole | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKENS.USER_ROLE) as UserRole | null
  }
  return null
}

export function setUserData(data: UserData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKENS.USER_DATA, JSON.stringify(data))
  }
}

export function getUserData(): UserData | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(AUTH_TOKENS.USER_DATA)
    return data ? JSON.parse(data) : null
  }
  return null
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

export function isAdmin(): boolean {
  return getUserRole() === USER_ROLES.ADMIN
}

export function logout(): void {
  clearAuthToken()
}
