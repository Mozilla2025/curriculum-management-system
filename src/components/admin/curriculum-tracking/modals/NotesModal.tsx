'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'

interface Props { curriculum: CurriculumTracking; onClose: () => void; onSave: (notes: string) => Promise<void> }

type NoteType = 'general' | 'feedback' | 'request' | 'observation'
const NOTE_TYPES: { key: NoteType; label: string; icon: string; desc: string }[] = [
  { key: 'general',     label: 'General Note',    icon: 'fas fa-sticky-note',  desc: 'General comments about this tracking' },
  { key: 'feedback',    label: 'Feedback',        icon: 'fas fa-comment-dots', desc: 'Feedback for the initiating department' },
  { key: 'request',     label: 'Information Request', icon: 'fas fa-question-circle', desc: 'Request additional documents or info' },
  { key: 'observation', label: 'Observation',     icon: 'fas fa-eye',          desc: 'Formal observation for the record' },
]

const PREDEFINED = [
  'Please provide the full curriculum outline document.',
  'This curriculum meets all required academic standards.',
  'Additional justification is needed for the proposed duration.',
  'The proposed curriculum aligns with institutional objectives.',
  'Please resubmit with updated faculty credentials.',
]

export function NotesModal({ curriculum, onClose, onSave }: Props) {
  const [noteType, setNoteType] = useState<NoteType>('general')
  const [text, setText]         = useState('')
  const [saving, setSaving]     = useState(false)
  const MAX = 1000

  const stageKey    = curriculum.selectedStage ?? curriculum.currentStage
  const stageLabel  = stageKey.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const existingNotes = curriculum.stages[stageKey as keyof typeof curriculum.stages]?.notes

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setSaving(true)
    try { await onSave(text); onClose() }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="nm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="nm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-sticky-note text-must-green" aria-hidden="true" /> Add Notes
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Curriculum info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <i className="fas fa-route text-must-green text-lg" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{curriculum.displayTitle ?? curriculum.title}</p>
              <p className="text-xs text-gray-500">{curriculum.trackingId} • {stageLabel}</p>
            </div>
          </div>

          {/* Existing notes */}
          {existingNotes && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase mb-1">
                <i className="fas fa-history text-must-blue/60" aria-hidden="true" /> Existing Notes
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{existingNotes}</p>
            </div>
          )}

          {/* Note type */}
          <div className="grid grid-cols-2 gap-2">
            {NOTE_TYPES.map((t) => (
              <button key={t.key} type="button" onClick={() => setNoteType(t.key)}
                className={cn('p-3 text-left border-2 rounded-xl transition-all',
                  noteType === t.key ? 'border-must-green bg-must-green/5' : 'border-gray-200 hover:border-must-green/40 hover:bg-gray-50')}>
                <div className="flex items-center gap-2 mb-1">
                  <i className={cn(t.icon, 'text-must-green text-sm')} aria-hidden="true" />
                  <span className="text-xs font-bold text-gray-800">{t.label}</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">{t.desc}</p>
              </button>
            ))}
          </div>

          {/* Predefined suggestions */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
              <i className="fas fa-lightbulb text-must-gold/70" aria-hidden="true" /> Quick suggestions (click to use)
            </p>
            <div className="space-y-1.5">
              {PREDEFINED.map((s, i) => (
                <button key={i} type="button" onClick={() => setText(s)}
                  className="w-full flex items-start gap-2 px-3 py-2 text-xs text-left text-gray-600 border border-gray-100 rounded-lg hover:border-must-green hover:bg-must-green/5 hover:text-must-green-darker transition-all">
                  <i className="fas fa-plus text-must-green/60 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label htmlFor="nm-text" className="block text-xs font-semibold text-gray-700 mb-1.5">
              {NOTE_TYPES.find((t) => t.key === noteType)?.label ?? 'Note'} <span className="text-red-500">*</span>
            </label>
            <textarea id="nm-text" rows={4} value={text} onChange={(e) => setText(e.target.value.slice(0, MAX))} required
              placeholder={`Add your ${noteType} for the ${stageLabel} stage...`}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">{text.length}/{MAX} characters</span>
              {text && <button type="button" onClick={() => setText('')} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>}
            </div>
          </div>

          {/* Guidelines */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
              <i className="fas fa-info-circle" aria-hidden="true" /> Note Guidelines
            </h5>
            <ul className="text-xs text-blue-600 space-y-0.5 list-disc list-inside">
              <li>Be specific and professional in your wording</li>
              <li>Notes are visible to all stakeholders in the workflow</li>
              <li>Feedback notes will be shared with the initiating department</li>
            </ul>
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={onClose} disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60">Cancel</button>
          <button type="submit" onClick={handleSave} disabled={saving || !text.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all disabled:opacity-60 disabled:transform-none">
            {saving ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Saving...</> : <><i className="fas fa-save" aria-hidden="true" /> Save Notes</>}
          </button>
        </div>
      </div>
    </div>
  )
}
