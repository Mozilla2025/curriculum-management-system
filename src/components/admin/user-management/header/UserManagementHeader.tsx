'use client'

interface UserManagementHeaderProps {
  onAddUser: () => void
  onRefresh: () => void
}

export function UserManagementHeader({ onAddUser, onRefresh }: UserManagementHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage users, assign roles, and control system access
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-must-blue text-white rounded-lg text-sm font-semibold hover:bg-must-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px"
          >
            <i className="fas fa-sync-alt" aria-hidden="true" />
            Refresh
          </button>

          <button
            onClick={onAddUser}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-must-green text-white rounded-lg text-sm font-semibold hover:bg-must-green-dark transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px"
          >
            <i className="fas fa-user-plus" aria-hidden="true" />
            Add New User
          </button>
        </div>
      </div>
    </div>
  )
}
