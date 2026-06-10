'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageData } from '@/types/tracking'
import { formatTrackingDateTime } from '@/lib/tracking/utils'

const NOTE_TYPES = [
  { key: 'general'     as const, label: 'General Note',        icon: 'fas fa-sticky-note',     desc: 'General comments about this tracking' },
  { key: 'feedback'    as const, label: 'Feedback',            icon: 'fas fa-comment-dots',    desc: 'Feedback for the initiating department' },
  { key: 'request'     as const, label: 'Information Request', icon: 'fas fa-question-circle', desc: 'Request additional documents or info' },
  { key: 'observation' as const, label: 'Observation',         icon: 'fas fa-eye',             desc: 'Formal observation for the record' },
]

const NOTE_SUGGESTIONS = [
  'Please provide the full curriculum outline document.',
  'This curriculum meets all required academic standards.',
  'Additional justification is needed for the proposed duration.',
  'The proposed curriculum aligns with institutional objectives.',
  'Please resubmit with updated faculty credentials.',
]

type NoteKey = typeof NOTE_TYPES[number]['key']

interface Props {
  curriculum: CurriculumTracking
  stageData?: TrackingStageData
}

export function NotesTab({ curriculum, stageData }: Props) {
  const [noteText,   setNoteText]   = useState('')
  const [noteType,   setNoteType]   = useState<NoteKey>('general')
  const [noteSaving, setNoteSaving] = useState(false)
  const [savedNotes, setSavedNotes] = useState<{ text: string; type: string; date: string }[]>([])
  const noteRef  = useRef<HTMLTextAreaElement>(null)
  const NOTE_MAX = 1000

  const handleSaveNote = async () => {
    const trimmed = noteText.trim()
    if (!trimmed) { noteRef.current?.focus(); return }
    setNoteSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setSavedNotes((prev) => [{ text: trimmed, type: noteType, date: new Date().toISOString() }, ...prev])
    setNoteText('')
    setNoteSaving(false)
  }

  const activeType = NOTE_TYPES.find((t) => t.key === noteType)!
  const hasExistingNotes = curriculum.initialNotes || stageData?.notes || stageData?.feedback
  const hasAnyNotes = savedNotes.length > 0 || hasExistingNotes

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

      {/* ── Left: Compose ── */}
      <div className="lg:col-span-3 space-y-4">

        {/* Compose card */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {/* Note type tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto" role="tablist">
            {NOTE_TYPES.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={noteType === t.key}
                onClick={() => setNoteType(t.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors flex-shrink-0',
                  noteType === t.key
                    ? 'border-must-green text-must-green-darker'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                )}
              >
                <i className={cn(t.icon, noteType === t.key ? 'text-must-green' : 'text-gray-400')} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-4">
            {/* Type description hint */}
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <i className="fas fa-info-circle text-gray-300" aria-hidden="true" />
              {activeType.desc}
            </p>

            {/* Textarea */}
            <textarea
              ref={noteRef}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value.slice(0, NOTE_MAX))}
              placeholder={`Write your ${activeType.label.toLowerCase()}…`}
              rows={5}
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-must-green/20 focus:border-must-green focus:bg-white transition-all placeholder:text-gray-400"
            />

            {/* Actions row */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{noteText.length}/{NOTE_MAX}</span>
              <div className="flex items-center gap-2">
                {noteText && (
                  <button
                    type="button"
                    onClick={() => setNoteText('')}
                    className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={handleSaveNote}
                  disabled={noteSaving || !noteText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-must-green hover:bg-must-green-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
                >
                  {noteSaving
                    ? <><i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" /> Saving…</>
                    : <><i className="fas fa-save text-xs" aria-hidden="true" /> Save Note</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick suggestions */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-700 mb-3 flex items-center gap-1.5">
            <i className="fas fa-lightbulb" aria-hidden="true" />
            Quick suggestions — click to insert
          </p>
          <div className="space-y-1.5">
            {NOTE_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setNoteText(s)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-amber-800 bg-white border border-amber-200/80 rounded-lg hover:border-must-green hover:bg-must-green/5 hover:text-must-green-darker transition-all"
              >
                <i className="fas fa-plus text-[9px] text-must-green/50 flex-shrink-0" aria-hidden="true" />
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Notes history ── */}
      <div className="lg:col-span-2 space-y-3">
        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <i className="fas fa-history text-must-green" aria-hidden="true" />
          Notes &amp; History
        </h3>

        {!hasAnyNotes ? (
          <div className="bg-white border border-gray-100 rounded-xl text-center py-14 text-gray-400">
            <i className="fas fa-sticky-note text-3xl mb-3 block opacity-20" aria-hidden="true" />
            <p className="text-sm font-medium">No notes yet</p>
            <p className="text-xs mt-1 opacity-60">Notes you save will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedNotes.map((n, i) => {
              const typeInfo = NOTE_TYPES.find((t) => t.key === n.type)
              return (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {typeInfo && <i className={cn(typeInfo.icon, 'text-must-green text-xs')} aria-hidden="true" />}
                    <span className="text-[10px] font-semibold text-must-green-darker capitalize">
                      {n.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">{formatTrackingDateTime(n.date)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{n.text}</p>
                </div>
              )
            })}

            {curriculum.initialNotes && (
              <NoteHistoryCard label="Initial Notes" text={curriculum.initialNotes} icon="fas fa-file-alt" />
            )}
            {stageData?.notes && (
              <NoteHistoryCard label="Stage Notes" text={stageData.notes} icon="fas fa-sticky-note" />
            )}
            {stageData?.feedback && (
              <NoteHistoryCard label="Stage Feedback" text={stageData.feedback} icon="fas fa-comments" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function NoteHistoryCard({ label, text, icon }: { label: string; text: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <i className={cn(icon, 'text-gray-300')} aria-hidden="true" />
        {label}
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}
