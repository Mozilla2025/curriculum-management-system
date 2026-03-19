'use client'

import { useState, useMemo, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { User, UserFilters } from '@/types/user-management'
import { filterUsers } from '@/lib/user-management/utils'
import { RoleBadge } from '../shared/RoleBadge'
import { StatusBadge } from '../shared/StatusBadge'
import { UserAvatar } from '../shared/UserAvatar'

interface UsersTableProps {
  users: User[]
  filters: UserFilters
  onEdit: (user: User) => void
  onManageRoles: ((user: User) => void) | null
  onDelete: ((user: User) => void) | null
}

const ITEMS_PER_PAGE = 5

export function UsersTable({
  users,
  filters,
  onEdit,
  onManageRoles,
  onDelete,
}: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = useMemo(
    () => filterUsers(users, filters.search, filters.role, filters.status),
    [users, filters]
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [users.length, filters])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const renderPagination = () => {
    const buttons = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const endPage = Math.min(totalPages, startPage + maxVisible - 1)
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all',
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-200 hover:border-must-green hover:text-must-green'
        )}
      >
        <i className="fas fa-chevron-left text-xs" />
        Previous
      </button>
    )

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={cn(
            'min-w-[36px] h-9 px-2 rounded-lg border text-sm font-semibold transition-all',
            i === currentPage
              ? 'bg-must-green text-white border-must-green shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-must-green hover:text-must-green'
          )}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis" className="px-2 text-gray-400 select-none">…</span>
        )
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="min-w-[36px] h-9 px-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-must-green hover:text-must-green transition-all"
        >
          {totalPages}
        </button>
      )
    }

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all',
          currentPage === totalPages || totalPages === 0
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-200 hover:border-must-green hover:text-must-green'
        )}
      >
        Next
        <i className="fas fa-chevron-right text-xs" />
      </button>
    )

    return buttons
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-900">
          All Users ({filteredUsers.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center gap-3 p-12 text-gray-500">
            <i className="fas fa-users text-2xl text-gray-300" aria-hidden="true" />
            <p className="text-sm">No users found matching your criteria.</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3.5 text-left text-sm font-bold text-gray-700">User</th>
                <th className="px-6 py-3.5 text-left text-sm font-bold text-gray-700">Roles</th>
                <th className="px-6 py-3.5 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-3.5 text-left text-sm font-bold text-gray-700 hidden md:table-cell">
                  School/Department
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar initials={user.avatar} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <RoleBadge key={role} role={role} />
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 italic">No roles</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {user.department || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {onManageRoles && (
                        <ActionButton
                          onClick={() => onManageRoles(user)}
                          variant="green"
                          label="Manage Roles"
                        />
                      )}
                      <ActionButton
                        onClick={() => onEdit(user)}
                        variant="blue"
                        label="Edit"
                      />
                      {onDelete && (
                        <ActionButton
                          onClick={() => onDelete(user)}
                          variant="red"
                          label="Delete"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-medium">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{' '}
            {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  )
}

interface ActionButtonProps {
  onClick: () => void
  variant: 'green' | 'blue' | 'red'
  label: string
}

function ActionButton({ onClick, variant, label }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200',
        variant === 'green' &&
          'bg-must-green/10 text-must-green-darker hover:bg-must-green/20',
        variant === 'blue' &&
          'bg-must-blue/10 text-must-blue hover:bg-must-blue/20',
        variant === 'red' &&
          'bg-red-50 text-red-600 hover:bg-red-100'
      )}
    >
      {label}
    </button>
  )
}
