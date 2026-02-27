'use client'

import React from 'react'
import type { Curriculum } from '@/types/curricula'

interface DeleteConfirmationModalProps {
  curriculum: Curriculum | null
  isOpen: boolean
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationModal({
  curriculum,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !curriculum) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-[scaleIn_0.15s_ease] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-xl text-red-500" />
          </div>

          <h3 id="delete-modal-title" className="text-lg font-bold text-gray-900 text-center mb-2">
            Confirm Deletion
          </h3>

          <p className="text-sm text-gray-600 text-center mb-1">
            Are you sure you want to delete:
          </p>
          <p className="text-sm font-semibold text-gray-900 text-center mb-1 px-4">
            &ldquo;{curriculum.title}&rdquo;
          </p>
          <p className="text-xs text-gray-400 text-center mb-6">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isDeleting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-circle-notch animate-spin" />
                Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}