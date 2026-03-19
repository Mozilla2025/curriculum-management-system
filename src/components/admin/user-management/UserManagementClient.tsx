'use client'

import { useEffect, useCallback } from 'react'
import { useUserManagement } from '@/hooks/user-management/useUserManagement'
import { formatUserAvatar } from '@/lib/user-management/utils'
import { mockUsers } from '@/lib/mock-data'
import type { User } from '@/types/user-management'

import { UserManagementNotification } from './UserManagementNotification'
import { UserManagementHeader } from './header/UserManagementHeader'
import { UserManagementSearchFilter } from './search/UserManagementSearchFilter'
import { UserManagementStatsSection } from './stats/UserManagementStatsSection'
import { UsersTable } from './table/UsersTable'
import { AddUserModal } from './modals/AddUserModal'
import { EditUserModal } from './modals/EditUserModal'
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal'
import { ManageRolesModal } from './modals/ManageRolesModal'

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const USE_MOCK_DATA = true // Set to false when API is ready

function formatUserData(raw: any[]): User[] {
  return raw.map((u) => ({
    id: u.id,
    firstName: u.firstName || 'Unknown',
    lastName: u.lastName || 'User',
    email: u.email || 'No email',
    username: u.username || u.email || 'No username',
    phoneNumber: u.phoneNumber ?? null,
    roles: Array.isArray(u.roles) ? u.roles : u.roles ? [u.roles] : [],
    status: u.enabled ? 'active' : 'inactive',
    department: u.department || u.school || u.organization || 'N/A',
    avatar: formatUserAvatar(u.firstName || 'U', u.lastName || ''),
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }))
}

export function UserManagementClient() {
  const {
    users,
    setUsers,
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
  } = useUserManagement()

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      // Use mock data if enabled
      if (USE_MOCK_DATA) {
        setUsers(mockUsers)
        showNotification(`Loaded ${mockUsers.length} users from mock data`, 'info')
        setIsLoading(false)
        return
      }

      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      if (!token) {
        showNotification('Authentication token not found. Please log in again.', 'error')
        return
      }

      const response = await fetch(`${API_BASE_URL}/users/get-all-users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const raw: any[] = Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : []

        if (raw.length > 0) {
          setUsers(formatUserData(raw))
          showNotification(`Successfully loaded ${raw.length} users`, 'success')
        } else {
          setUsers([])
          showNotification('No users found in the system', 'info')
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
        if (response.status === 401)
          showNotification('Session expired. Please log in again.', 'error')
        else if (response.status === 403)
          showNotification('You do not have permission to view users.', 'error')
        else showNotification(errorData.message || `Failed to fetch users (${response.status})`, 'error')
        setUsers([])
      }
    } catch {
      showNotification('Network error. Please check your connection.', 'error')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setUsers, showNotification])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDeleteClick = useCallback(
    (user: User) => {
      openModal('confirm', user)
    },
    [openModal]
  )

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) return
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      if (!token) return

      const response = await fetch(`${API_BASE_URL}/users/${selectedUser.id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        handleDeleteUser(selectedUser.id)
      } else {
        const errorData = await response.json().catch(() => ({}))
        showNotification(errorData.message || 'Failed to delete user', 'error')
        closeModal('confirm')
      }
    } catch {
      showNotification('Network error deleting user', 'error')
      closeModal('confirm')
    }
  }, [selectedUser, handleDeleteUser, showNotification, closeModal])

  return (
    <div className="space-y-6 animate-fade-in">
      <UserManagementNotification
        notification={notification}
        onClose={hideNotification}
      />

      <UserManagementHeader
        onAddUser={() => openModal('addUser')}
        onRefresh={fetchUsers}
      />

      <UserManagementSearchFilter
        filters={filters}
        onSearch={(v) => updateFilter('search', v)}
        onRoleFilter={(v) => updateFilter('role', v)}
        onStatusFilter={(v) => updateFilter('status', v)}
        onClearFilters={clearFilters}
      />

      <UserManagementStatsSection stats={stats} />

      {isLoading ? (
        <LoadingState />
      ) : (
        <UsersTable
          users={users}
          filters={filters}
          onEdit={(user) => openModal('editUser', user)}
          onManageRoles={(user) => openModal('manageRoles', user)}
          onDelete={handleDeleteClick}
        />
      )}

      {/* ── Modals ── */}
      {modals.addUser && (
        <AddUserModal
          onClose={() => closeModal('addUser')}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
          onAddUser={(data) => {
            const newUser: User = {
              id: data.id || Date.now(),
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              username: data.username,
              phoneNumber: data.phoneNumber ?? null,
              roles: data.roles || [],
              status: data.enabled ? 'active' : 'inactive',
              department: data.department || 'N/A',
              avatar: formatUserAvatar(data.firstName || 'U', data.lastName || ''),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            handleAddUser(newUser)
          }}
        />
      )}

      {modals.editUser && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => closeModal('editUser')}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {modals.manageRoles && selectedUser && (
        <ManageRolesModal
          user={selectedUser}
          onClose={() => closeModal('manageRoles')}
          onSuccess={(msg) => showNotification(msg, 'success')}
          onError={(msg) => showNotification(msg, 'error')}
          onUpdateRoles={handleUpdateRoles}
        />
      )}

      {modals.confirm && selectedUser && (
        <ConfirmDeleteModal
          user={selectedUser}
          onClose={() => closeModal('confirm')}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-16 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-must-green rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500">Loading users...</p>
    </div>
  )
}
