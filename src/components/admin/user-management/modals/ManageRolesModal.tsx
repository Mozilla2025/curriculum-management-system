'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ModalOverlay, ModalHeader, ModalBody, ModalActions } from '../shared/ModalOverlay'
import { RoleBadge } from '../shared/RoleBadge'
import { UserAvatar } from '../shared/UserAvatar'
import type { User, UserRole } from '@/types/user-management'
import { ALL_ROLES, ROLE_CONFIG } from '@/types/user-management'

type TabId = 'view' | 'add' | 'delete'

interface ManageRolesModalProps {
  user: User
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onUpdateRoles: (userId: string | number, roles: UserRole[]) => void
}

export function ManageRolesModal({
  user,
  onClose,
  onSuccess,
  onError,
  onUpdateRoles,
}: ManageRolesModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('view')
  const [currentRoles, setCurrentRoles] = useState<UserRole[]>([])
  const [newRoles, setNewRoles] = useState<UserRole[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pendingDeleteRole, setPendingDeleteRole] = useState<UserRole | null>(null)

  useEffect(() => {
    if (user.roles) setCurrentRoles([...user.roles])
  }, [user])

  const availableRoles = ALL_ROLES.filter(
    (r) => !currentRoles.includes(r.value) && !newRoles.includes(r.value)
  )

  const handleNewRoleToggle = (role: UserRole) => {
    setNewRoles((p) =>
      p.includes(role) ? p.filter((r) => r !== role) : [...p, role]
    )
  }

  const handleAssignRoles = async () => {
    if (newRoles.length === 0) return
    setIsLoading(true)

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      if (!token) { onError('Authentication token not found.'); return }

      for (const role of newRoles) {
        const response = await fetch(`${API_BASE_URL}/users/assign-role`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id, role }),
        })
        if (!response.ok) {
          const err = await response.json().catch(() => ({}))
          throw new Error(err.message ?? `Failed to assign role ${role}`)
        }
      }

      const updatedRoles = [...currentRoles, ...newRoles]
      setCurrentRoles(updatedRoles)
      onUpdateRoles(user.id, updatedRoles)
      setNewRoles([])
      onSuccess(`Roles assigned successfully to ${user.firstName} ${user.lastName}`)
    } catch (err: any) {
      onError(err.message ?? 'Failed to assign roles')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!pendingDeleteRole) return
    setIsLoading(true)

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      if (!token) { onError('Authentication token not found.'); return }

      const response = await fetch(
        `${API_BASE_URL}/users/${user.id}/roles/${pendingDeleteRole}/delete`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      )

      if (response.ok) {
        const result = await response.json()
        const updatedRoles = result.data?.roles ?? currentRoles.filter((r) => r !== pendingDeleteRole)
        setCurrentRoles(updatedRoles)
        onUpdateRoles(user.id, updatedRoles)
        setPendingDeleteRole(null)
        onSuccess(`Role removed successfully from ${user.firstName} ${user.lastName}`)
      } else {
        const err = await response.json().catch(() => ({}))
        onError(err.message ?? 'Failed to remove role')
      }
    } catch {
      onError('Network error removing role')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs: { id: TabId; label: string; icon: string; activeClass: string }[] = [
    { id: 'view', label: 'View Current Roles', icon: 'fa-eye', activeClass: 'bg-must-green text-white' },
    { id: 'add', label: 'Add New Roles', icon: 'fa-plus', activeClass: 'bg-must-blue text-white' },
    { id: 'delete', label: 'Remove Roles', icon: 'fa-trash', activeClass: 'bg-red-600 text-white' },
  ]

  return (
    <ModalOverlay onClose={isLoading ? () => {} : onClose} maxWidth="max-w-2xl">
      <ModalHeader title="Manage User Roles" onClose={onClose} disabled={isLoading} />
      <ModalBody>
        {/* User info */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200">
          <UserAvatar initials={user.avatar} size="lg" />
          <div>
            <p className="text-base font-bold text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 border-b border-gray-200 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                activeTab === tab.id ? tab.activeClass : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <i className={`fas ${tab.icon} text-xs`} aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Delete confirmation overlay */}
        {pendingDeleteRole && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-exclamation-triangle text-red-600 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900 mb-1">Confirm Role Removal</p>
                <p className="text-sm text-red-700 mb-3">
                  Remove{' '}
                  <strong>{ROLE_CONFIG[pendingDeleteRole]?.label ?? pendingDeleteRole}</strong>{' '}
                  from {user.firstName} {user.lastName}? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPendingDeleteRole(null)}
                    disabled={isLoading}
                    className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                    ) : (
                      <i className="fas fa-trash" aria-hidden="true" />
                    )}
                    Remove Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: View */}
        {activeTab === 'view' && (
          <div className="space-y-3">
            <InfoBox
              variant="success"
              icon="fa-info-circle"
              title="Current User Roles"
              description="These are the roles currently assigned to this user. Use the other tabs to add or remove roles."
            />
            {currentRoles.length > 0 ? (
              <div className="space-y-2">
                {currentRoles.map((role) => (
                  <div key={role} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                    <RoleBadge role={role} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyRoles message="No roles assigned to this user." />
            )}
          </div>
        )}

        {/* Tab: Add */}
        {activeTab === 'add' && (
          <div className="space-y-4">
            <InfoBox
              variant="info"
              icon="fa-plus-circle"
              title="Add New Roles"
              description='Select the roles you want to add to this user. Click "Assign Selected Roles" to save.'
            />
            {newRoles.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Roles to be Added:
                </p>
                <div className="flex flex-wrap gap-2">
                  {newRoles.map((role) => (
                    <div key={role} className="flex items-center gap-1.5 bg-must-blue/10 text-must-blue border border-must-blue/20 px-3 py-1.5 rounded-lg text-sm font-semibold">
                      {ROLE_CONFIG[role]?.label ?? role}
                      <button
                        onClick={() => handleNewRoleToggle(role)}
                        className="text-must-blue hover:text-must-blue-dark ml-1"
                        aria-label={`Remove ${role} from selection`}
                      >
                        <i className="fas fa-times text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Available Roles:
              </p>
              {availableRoles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.value}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-must-green hover:bg-must-green/5 transition-all text-sm font-medium text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={newRoles.includes(role.value)}
                        onChange={() => handleNewRoleToggle(role.value)}
                        className="accent-must-blue"
                      />
                      {role.label}
                    </label>
                  ))}
                </div>
              ) : (
                <EmptyRoles message="All available roles are already assigned to this user." />
              )}
            </div>
          </div>
        )}

        {/* Tab: Delete */}
        {activeTab === 'delete' && (
          <div className="space-y-4">
            <InfoBox
              variant="warning"
              icon="fa-exclamation-triangle"
              title="Remove User Roles"
              description="Warning: Removing roles will immediately revoke the user's access to related features. This action cannot be undone."
            />
            {currentRoles.length > 0 ? (
              <div className="space-y-2">
                {currentRoles.map((role) => (
                  <div
                    key={role}
                    className="flex items-center justify-between p-3 bg-red-50/50 border border-red-200 rounded-lg"
                  >
                    <RoleBadge role={role} />
                    <button
                      onClick={() => setPendingDeleteRole(role)}
                      disabled={isLoading}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
                      aria-label={`Remove ${ROLE_CONFIG[role]?.label} role`}
                    >
                      <i className="fas fa-times text-xs" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyRoles message="No roles to remove — user has no assigned roles." />
            )}
          </div>
        )}
      </ModalBody>
      <ModalActions>
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          <i className="fas fa-times text-xs" aria-hidden="true" />
          Close
        </button>
        {activeTab === 'add' && newRoles.length > 0 && (
          <button
            type="button"
            onClick={handleAssignRoles}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-must-blue rounded-lg hover:bg-must-blue-dark transition-colors disabled:opacity-60 shadow-sm"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin" aria-hidden="true" />
            ) : (
              <i className="fas fa-user-plus" aria-hidden="true" />
            )}
            Assign Selected Roles ({newRoles.length})
          </button>
        )}
      </ModalActions>
    </ModalOverlay>
  )
}

function InfoBox({
  variant,
  icon,
  title,
  description,
}: {
  variant: 'success' | 'info' | 'warning'
  icon: string
  title: string
  description: string
}) {
  const styles = {
    success: { bg: 'bg-must-green/5 border-must-green/20', iconColor: 'text-must-green' },
    info: { bg: 'bg-must-blue/5 border-must-blue/20', iconColor: 'text-must-blue' },
    warning: { bg: 'bg-red-50 border-red-200', iconColor: 'text-red-600' },
  }
  const s = styles[variant]

  return (
    <div className={cn('p-4 rounded-lg border', s.bg)}>
      <div className="flex items-center gap-2 mb-1">
        <i className={cn('fas text-sm', icon, s.iconColor)} aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">{title}</p>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function EmptyRoles({ message }: { message: string }) {
  return (
    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
      <p className="text-sm text-gray-500 italic">{message}</p>
    </div>
  )
}
