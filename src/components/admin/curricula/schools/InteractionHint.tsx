'use client'

import React from 'react'

interface InteractionHintProps {
  show: boolean
  onDismiss: () => void
}

export function InteractionHint({ show, onDismiss }: InteractionHintProps) {
  if (!show) return null

  return (
    <div className="sticky top-0 z-10 mb-0 px-4 py-3 bg-gradient-to-r from-[#00BF63] to-[#00b35b] text-white rounded-lg shadow-lg animate-[slideInDown_0.5s_ease]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <i className="fas fa-lightbulb" />
          <span>💡 Tip: Click on any school card below to view its academic programs</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss() }}
          className="flex-shrink-0 p-2 rounded bg-white/20 hover:bg-white/30 transition-colors"
          title="Dismiss hint"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}