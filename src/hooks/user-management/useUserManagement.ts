'use client'

import { useState, useCallback, useEffect } from 'react'
import type {
  User,
  UserStats,
  UserFilters,
  UserModalState,
  UserNotification,
} from '@/types/user-management'
import { computeStats } from '@/lib/user-management/utils'

const INITIAL_FILTERS: UserFilters = { search: '', role: '', status: '' }

const INITIAL_MODALS: UserModalState = {
  addUser: false,
  editUser: false,
  manageRoles: false,
  confirm: false,
  deleteRole: false,
}

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    deans: 0,
    pendingAccess: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<UserFilters>(INITIAL_FILTERS)
  const [modals, setModals] = useState<UserModalState>(INITIAL_MODALS)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [notification, setNotification] = useState<UserNotification>({
    show: false,
    message: '',
    type: 'success',
  })

  const showNotification = useCallback(
    (message: string, type: UserNotification['type'] = 'success') => {
      setNotification({ show: true, message, type })
      setTimeout(() => setNotification((p) => ({ ...p, show: false })), 5000)
    },
    []
  )

  const hideNotification = useCallback(() => {
    setNotification((p) => ({ ...p, show: false }))
  }, [])

  const openModal = useCallback((name: keyof UserModalState, user?: User) => {
    if (user) setSelectedUser(user)
    setModals((p) => ({ ...p, [name]: true }))
  }, [])

  const closeModal = useCallback((name: keyof UserModalState) => {
    setModals((p) => ({ ...p, [name]: false }))
    setSelectedUser(null)
  }, [])

  const updateUsers = useCallback((updated: User[]) => {
    setUsers(updated)
    setStats(computeStats(updated))
  }, [])

  const handleAddUser = useCallback(
    (newUser: User) => {
      updateUsers([newUser, ...users])
      showNotification('User created successfully!', 'success')
      closeModal('addUser')
    },
    [users, updateUsers, showNotification, closeModal]
  )

  const handleUpdateUser = useCallback(
    (updatedUser: User) => {
      updateUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
      showNotification('User updated successfully!', 'success')
      closeModal('editUser')
    },
    [users, updateUsers, showNotification, closeModal]
  )

  const handleUpdateRoles = useCallback(
    (userId: string | number, roles: User['roles']) => {
      updateUsers(users.map((u) => (u.id === userId ? { ...u, roles } : u)))
      showNotification('User roles updated successfully!', 'success')
      closeModal('manageRoles')
    },
    [users, updateUsers, showNotification, closeModal]
  )

  const handleDeleteUser = useCallback(
    (userId: string | number) => {
      updateUsers(users.filter((u) => u.id !== userId))
      showNotification('User deleted successfully', 'success')
      closeModal('confirm')
    },
    [users, updateUsers, showNotification, closeModal]
  )

  const handleDeleteRole = useCallback(
    (userId: string | number, role: string) => {
      updateUsers(
        users.map((u) =>
          u.id === userId
            ? { ...u, roles: u.roles.filter((r) => r !== role) }
            : u
        )
      )
      showNotification('Role removed successfully!', 'success')
      closeModal('deleteRole')
    },
    [users, updateUsers, showNotification, closeModal]
  )

  const updateFilter = useCallback(<K extends keyof UserFilters>(key: K, value: UserFilters[K]) => {
    setFilters((p) => ({ ...p, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => setFilters(INITIAL_FILTERS), [])

  return {
    users,
    setUsers: updateUsers,
    stats,
    isLoading,
    setIsLoading,
    filters,
    updateFilter,
    clearFilters,
    modals,
    openModal,
    closeModal,
    selectedUser,
    notification,
    showNotification,
    hideNotification,
    handleAddUser,
    handleUpdateUser,
    handleUpdateRoles,
    handleDeleteUser,
    handleDeleteRole,
  }
}
