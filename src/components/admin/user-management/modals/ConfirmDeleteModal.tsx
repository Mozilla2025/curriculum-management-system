'use client'

import { ModalOverlay, ModalHeader, ModalBody, ModalActions } from '../shared/ModalOverlay'
import type { User } from '@/types/user-management'

interface ConfirmDeleteModalProps {
  user: User
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDeleteModal({ user, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-md">
      <ModalHeader title="Confirm Action" onClose={onClose} />
      <ModalBody>
        <div className="text-center py-2">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-2xl text-red-600" aria-hidden="true" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <strong className="text-gray-900">
              {user.firstName} {user.lastName}
            </strong>
            ?{' '}
            <span className="text-red-600 font-medium">This action cannot be undone.</span>
          </p>
        </div>
      </ModalBody>
      <ModalActions>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
        >
          <i className="fas fa-trash" aria-hidden="true" />
          Delete User
        </button>
      </ModalActions>
    </ModalOverlay>
  )
}
