'use client'

import { useState, useEffect } from 'react'
import { ModalOverlay, ModalHeader, ModalBody, ModalActions } from '../shared/ModalOverlay'
import { FormField } from '../shared/FormField'
import { UserAvatar } from '../shared/UserAvatar'
import type { User, EditUserFormData, FormErrors } from '@/types/user-management'
import { validateEditUserForm } from '@/lib/user-management/utils'

interface EditUserModalProps {
  user: User
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onUpdateUser: (user: User) => void
}

export function EditUserModal({ user, onClose, onSuccess, onError, onUpdateUser }: EditUserModalProps) {
  const [formData, setFormData] = useState<EditUserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phoneNumber: '',
    department: '',
    enabled: true,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      username: user.username || '',
      phoneNumber: user.phoneNumber || '',
      department: user.department || '',
      enabled: user.status === 'active',
    })
  }, [user])

  const handleChange =
    (field: keyof EditUserFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFormData((p) => ({ ...p, [field]: value }))
      if (errors[field as string]) setErrors((p) => ({ ...p, [field]: '' }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateEditUserForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      if (!token) {
        onError('Authentication token not found.')
        return
      }

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber?.trim() || null,
        department: formData.department?.trim() || null,
        enabled: formData.enabled,
      }

      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const updatedUser: User = {
          ...user,
          ...payload,
          status: payload.enabled ? 'active' : 'inactive',
          avatar: `${payload.firstName[0]}${payload.lastName[0]}`,
          updatedAt: new Date().toISOString(),
        }
        onUpdateUser(updatedUser)
        onSuccess('User updated successfully!')
      } else {
        const errorData = await response.json().catch(() => ({}))
        onError(errorData.message ?? 'Failed to update user')
      }
    } catch {
      onError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ModalOverlay onClose={isLoading ? () => {} : onClose}>
      <ModalHeader title="Edit User" onClose={onClose} disabled={isLoading} />
      <ModalBody>
        {/* User info display */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <UserAvatar initials={user.avatar} size="lg" />
          <div>
            <p className="text-base font-bold text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="edit-firstName"
              label="First Name"
              required
              value={formData.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
              disabled={isLoading}
            />
            <FormField
              id="edit-lastName"
              label="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
              disabled={isLoading}
            />
          </div>

          <FormField
            id="edit-email"
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            disabled={isLoading}
          />

          <FormField
            id="edit-username"
            label="Username"
            required
            value={formData.username}
            onChange={handleChange('username')}
            error={errors.username}
            disabled={isLoading}
          />

          <FormField
            id="edit-phone"
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
            placeholder="Optional"
            disabled={isLoading}
          />

          <FormField
            id="edit-department"
            label="Department/School"
            value={formData.department}
            onChange={handleChange('department')}
            placeholder="Optional"
            disabled={isLoading}
          />

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="edit-enabled"
              checked={formData.enabled}
              onChange={handleChange('enabled')}
              disabled={isLoading}
              className="w-4 h-4 accent-must-green cursor-pointer"
            />
            <label htmlFor="edit-enabled" className="text-sm font-semibold text-gray-700 cursor-pointer">
              User is active
            </label>
          </div>
        </form>
      </ModalBody>
      <ModalActions>
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="edit-user-form"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-must-green rounded-lg hover:bg-must-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin" aria-hidden="true" />
              Updating...
            </>
          ) : (
            <>
              <i className="fas fa-save" aria-hidden="true" />
              Update User
            </>
          )}
        </button>
      </ModalActions>
    </ModalOverlay>
  )
}
