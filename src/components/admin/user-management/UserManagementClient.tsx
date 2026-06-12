'use client'

import { useState, useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useGetAllUsers } from '@/hooks/api/users'
import { axiosClient } from '@/lib/api/axiosClient'
import { computeStats, formatUserAvatar } from '@/lib/user-management/utils'
import { queryKeys } from '@/utils/queryKeys'

import type {
  User,
  UserRole,
  UserFilters,
  UserModalState,
  UserNotification,
  UserResponse,
} from '@/types/user-management'

import { UserManagementNotification } from './UserManagementNotification'
import { UserManagementHeader } from './header/UserManagementHeader'
import { UserManagementSearchFilter } from './search/UserManagementSearchFilter'
import { UserManagementStatsSection } from './stats/UserManagementStatsSection'
import { UsersTable } from './table/UsersTable'
import { AddUserModal } from './modals/AddUserModal'
import { EditUserModal } from './modals/EditUserModal'
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal'
import { ManageRolesModal } from './modals/ManageRolesModal'

// ── Adapter ────────────────────────────────────────────────────────────────

function responseToUser(r: UserResponse): User {
  return {
    id:          r.id,
    firstName:   r.firstName  || 'Unknown',
    lastName:    r.lastName   || 'User',
    email:       r.email      || '',
    username:    r.username   || r.email,
    phoneNumber: r.phoneNumber ?? null,
    roles:       (r.roles as UserRole[]) ?? [],
    status:      r.enabled ? 'active' : 'inactive',
    department:  'N/A',
    avatar:      formatUserAvatar(r.firstName || 'U', r.lastName || ''),
    createdAt:   r.createdAt,
    updatedAt:   r.updatedAt,
  }
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function UserManagementSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-14 bg-gray-200 rounded-xl w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-full" />
      <div className="h-96 bg-gray-200 rounded-xl w-full" />
    </div>
  )
}

// ── Defaults ───────────────────────────────────────────────────────────────

const INITIAL_FILTERS: UserFilters   = { search: '', role: '', status: '' }
const INITIAL_MODALS: UserModalState = {
  addUser: false, editUser: false, manageRoles: false, confirm: false, deleteRole: false,
}

// ── Component ──────────────────────────────────────────────────────────────

export function UserManagementClient() {
  const queryClient = useQueryClient()

  // ── Server state ─────────────────────────────────────────────────────
  const { data: rawUsers, isPending } = useGetAllUsers()

  // ── Derived data ──────────────────────────────────────────────────────
  const users = useMemo(() => (rawUsers ?? []).map(responseToUser), [rawUsers])
  const stats = useMemo(() => computeStats(users), [users])

  // ── UI state ──────────────────────────────────────────────────────────
  const [filters, setFilters]           = useState<UserFilters>(INITIAL_FILTERS)
  const [modals, setModals]             = useState<UserModalState>(INITIAL_MODALS)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleting, setIsDeleting]     = useState(false)
  const [notification, setNotification] = useState<UserNotification>({
    show: false, message: '', type: 'success',
  })

  const showNotification = useCallback(
    (message: string, type: UserNotification['type'] = 'success') => {
      setNotification({ show: true, message, type })
      setTimeout(() => setNotification((p) => ({ ...p, show: false })), 5000)
    },
    [],
  )

  const hideNotification = useCallback(
    () => setNotification((p) => ({ ...p, show: false })),
    [],
  )

  const openModal = useCallback((name: keyof UserModalState, user?: User) => {
    if (user) setSelectedUser(user)
    setModals((p) => ({ ...p, [name]: true }))
  }, [])

  const closeModal = useCallback((name: keyof UserModalState) => {
    setModals((p) => ({ ...p, [name]: false }))
    setSelectedUser(null)
  }, [])

  const updateFilter = useCallback(
    <K extends keyof UserFilters>(key: K, value: UserFilters[K]) =>
      setFilters((p) => ({ ...p, [key]: value })),
    [],
  )

  const invalidateUsers = useCallback(
    () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
    [queryClient],
  )

  // ── Delete ────────────────────────────────────────────────────────────
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) return
    setIsDeleting(true)
    try {
      await axiosClient.delete(`/users/${selectedUser.id}/delete`)
      await invalidateUsers()
      showNotification('User deleted successfully.', 'success')
      closeModal('confirm')
    } catch {
      showNotification('Failed to delete user. Please try again.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }, [selectedUser, invalidateUsers, showNotification, closeModal])

  // ── Skeleton gate ─────────────────────────────────────────────────────
  if (isPending && !rawUsers) return <UserManagementSkeleton />

  return (
    <div className="space-y-6 animate-fade-in">
      <UserManagementNotification notification={notification} onClose={hideNotification} />

      <UserManagementHeader
        onAddUser={() => openModal('addUser')}
        onRefresh={invalidateUsers}
      />

      <UserManagementSearchFilter
        filters={filters}
        onSearch={(v) => updateFilter('search', v)}
        onRoleFilter={(v) => updateFilter('role', v)}
        onStatusFilter={(v) => updateFilter('status', v)}
        onClearFilters={() => setFilters(INITIAL_FILTERS)}
      />

      <UserManagementStatsSection stats={stats} />

      <UsersTable
        users={users}
        filters={filters}
        onEdit={(user) => openModal('editUser', user)}
        onManageRoles={(user) => openModal('manageRoles', user)}
        onDelete={(user) => openModal('confirm', user)}
      />

      {modals.addUser && (
        <AddUserModal
          onClose={() => closeModal('addUser')}
          onSuccess={(msg) => { showNotification(msg, 'success'); invalidateUsers() }}
          onError={(msg) => showNotification(msg, 'error')}
          onAddUser={() => invalidateUsers()}
        />
      )}

      {modals.editUser && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => closeModal('editUser')}
          onSuccess={(msg) => { showNotification(msg, 'success'); invalidateUsers() }}
          onError={(msg) => showNotification(msg, 'error')}
          onUpdateUser={(_updated) => { invalidateUsers(); closeModal('editUser') }}
        />
      )}

      {modals.manageRoles && selectedUser && (
        <ManageRolesModal
          user={selectedUser}
          onClose={() => closeModal('manageRoles')}
          onSuccess={(msg) => { showNotification(msg, 'success'); invalidateUsers() }}
          onError={(msg) => showNotification(msg, 'error')}
          onUpdateRoles={(_userId, _roles) => { invalidateUsers(); closeModal('manageRoles') }}
        />
      )}

      {modals.confirm && selectedUser && (
        <ConfirmDeleteModal
          user={selectedUser}
          onClose={() => closeModal('confirm')}
          onConfirm={isDeleting ? () => {} : handleConfirmDelete}
        />
      )}
    </div>
  )
}
