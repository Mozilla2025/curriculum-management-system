'use client'

import { useState } from 'react'
import { ModalOverlay, ModalHeader, ModalBody, ModalActions } from '../shared/ModalOverlay'
import { FormField } from '../shared/FormField'
import type { UserFormData, FormErrors } from '@/types/user-management'
import { validateAddUserForm } from '@/lib/user-management/utils'

interface AddUserModalProps {
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onAddUser: (userData: any) => void
}

const INITIAL_FORM: UserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  school: '',
  roles: [],
}

export function AddUserModal({ onClose, onSuccess, onError, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateAddUserForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      if (!token) {
        onError('Authentication token not found. Please log in again.')
        return
      }

      const response = await fetch(`${API_BASE_URL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        onSuccess('User created successfully! Login details have been sent to their email.')
        onAddUser(result.data ?? result)
        onClose()
      } else {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) onError('Session expired. Please log in again.')
        else if (response.status === 409) onError('Username or email already exists.')
        else onError(errorData.message ?? 'Failed to create user.')
      }
    } catch {
      onError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ModalOverlay onClose={isLoading ? () => {} : onClose}>
      <ModalHeader title="Add New User" onClose={onClose} disabled={isLoading} />
      <ModalBody>
        <form id="add-user-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="add-firstName"
              label="First Name"
              required
              value={formData.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
              placeholder="Enter first name"
              disabled={isLoading}
            />
            <FormField
              id="add-lastName"
              label="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
              placeholder="Enter last name"
              disabled={isLoading}
            />
          </div>

          <FormField
            id="add-username"
            label="Username"
            required
            value={formData.username}
            onChange={handleChange('username')}
            error={errors.username}
            placeholder="Enter username"
            disabled={isLoading}
          />

          <FormField
            id="add-email"
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="Enter email address"
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="add-password"
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange('password')}
              error={errors.password}
              placeholder="Enter password"
              minLength={8}
              hint="Password must be at least 8 characters long"
              disabled={isLoading}
            />
            <FormField
              id="add-confirmPassword"
              label="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Confirm password"
              disabled={isLoading}
            />
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
          form="add-user-form"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-must-green rounded-lg hover:bg-must-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin" aria-hidden="true" />
              Creating...
            </>
          ) : (
            <>
              <i className="fas fa-user-plus" aria-hidden="true" />
              Add User
            </>
          )}
        </button>
      </ModalActions>
    </ModalOverlay>
  )
}
