'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'

// ─── AssignTrackingModal ───────────────────────────────────────

interface AssignProps {
  curriculum: CurriculumTracking
  onClose: () => void
  onAssign: (curriculumId: string | number, userId: string, notes?: string) => Promise<void>
}

const MOCK_USERS = [
  { id: '1', name: 'Dr. Sarah Mitchell',  email: 'qa.director@university.edu',       role: 'QA Director',      department: 'Quality Assurance',           isActive: true,  color: '#10b981' },
  { id: '2', name: 'Dr. Grace Mbugua',    email: 'hod.earl.chil.educ@university.edu', role: 'HOD',             department: 'Early Childhood Education',    isActive: true,  color: '#00D666' },
  { id: '3', name: 'Prof. John Doe',      email: 'john.doe@university.edu',           role: 'Dean',            department: 'School of Engineering',        isActive: true,  color: '#1a3a6e' },
  { id: '4', name: 'Dr. Jane Smith',      email: 'jane.smith@university.edu',         role: 'Senate Member',   department: 'Academic Senate',              isActive: true,  color: '#f59e0b' },
  { id: '5', name: 'Dr. Robert Johnson',  email: 'robert.johnson@university.edu',     role: 'Vice Chancellor', department: 'Administration',               isActive: true,  color: '#ef4444' },
  { id: '6', name: 'Dr. Mary Wilson',     email: 'mary.wilson@university.edu',        role: 'CUE Representative', department: 'External Affairs',          isActive: false, color: '#6b7280' },
]

export function AssignTrackingModal({ curriculum, onClose, onAssign }: AssignProps) {
  const [selectedId, setSelected] = useState('')
  const [search, setSearch]       = useState('')
  const [notes, setNotes]         = useState('')
  const [saving, setSaving]       = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const active   = MOCK_USERS.filter((u) => u.isActive)
  const filtered = search
    ? active.filter((u) => [u.name, u.email, u.role, u.department].some((f) => f.toLowerCase().includes(search.toLowerCase())))
    : active
  const selected = MOCK_USERS.find((u) => u.id === selectedId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedId) return
    setSaving(true)
    try { await onAssign(curriculum.id, selectedId, notes); onClose() }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="atm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="atm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-user-plus text-must-green" aria-hidden="true" />
            Assign Tracking — {curriculum.trackingId}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Curriculum info */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">{curriculum.title}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
              <span><strong>School:</strong> {curriculum.school}</span>
              <span><strong>Dept:</strong> {curriculum.department}</span>
              <span><strong>Stage:</strong> {curriculum.currentStageDisplayName ?? curriculum.currentStage}</span>
              <span><strong>Status:</strong> <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-must-green/10 text-must-green-darker border border-must-green/20">{curriculum.statusDisplayName ?? curriculum.status}</span></span>
            </div>
            {curriculum.currentAssigneeName && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <i className="fas fa-user-check text-amber-500" aria-hidden="true" />
                  Currently assigned to: <strong className="text-gray-700">{curriculum.currentAssigneeName}</strong>
                  {curriculum.currentAssigneeEmail && <span className="text-gray-400">({curriculum.currentAssigneeEmail})</span>}
                </p>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" aria-hidden="true" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, role, or department..."
              className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10" />
          </div>

          {/* User list */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select User to Assign <span className="text-red-500">*</span>
            </label>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl bg-white" role="listbox" aria-label="Available users">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <i className="fas fa-user-slash text-2xl mb-2 opacity-40" aria-hidden="true" />
                  <p className="text-sm">No users found</p>
                </div>
              ) : filtered.map((user) => (
                <div key={user.id} role="option" aria-selected={selectedId === user.id}
                  onClick={() => setSelected(user.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(user.id)}
                  tabIndex={0}
                  className={cn('flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 cursor-pointer transition-all border-l-4',
                    selectedId === user.id ? 'bg-must-green/5 border-l-must-green' : 'border-l-transparent hover:bg-gray-50')}>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: user.color }}>
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      {user.name}
                      {selectedId === user.id && <i className="fas fa-check-circle text-must-green text-xs" aria-hidden="true" />}
                    </p>
                    <p className="text-xs text-gray-400">📧 {user.email}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-must-green/10 text-must-green-darker border border-must-green/20">{user.role}</span>
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">{user.department}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assignment Notes (Optional)</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any notes about this assignment..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10" />
          </div>

          {/* Summary */}
          {selected && (
            <div className="p-3 bg-must-green/5 border border-must-green/20 rounded-xl">
              <h4 className="flex items-center gap-2 text-xs font-bold text-must-green-darker mb-1">
                <i className="fas fa-user-check" aria-hidden="true" /> Assignment Summary
              </h4>
              <p className="text-sm text-gray-700">
                <strong>{selected.name}</strong> will be assigned as the current assignee.
                <br />
                <span className="text-xs text-gray-500"><strong>Role:</strong> {selected.role} • <strong>Dept:</strong> {selected.department}</span>
              </p>
            </div>
          )}

          {/* Info */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
              <i className="fas fa-info-circle" aria-hidden="true" /> Assignment Details
            </h5>
            <ul className="text-xs text-blue-600 space-y-0.5 list-disc list-inside">
              <li>The selected user becomes the current assignee for this tracking</li>
              <li>They will receive notifications about stage changes</li>
              <li>Assignment history will be preserved</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={onClose} disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60">Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={saving || !selectedId}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all disabled:opacity-60 disabled:transform-none">
            {saving ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Assigning...</> : <><i className="fas fa-user-check" aria-hidden="true" /> Assign Tracking</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── StatusManagementModal ─────────────────────────────────────

interface StatusProps {
  curriculum: CurriculumTracking
  onClose: () => void
  onStatusChange: (id: string | number, isCurrentlyActive: boolean, notes?: string) => Promise<void>
}

const STATUS_ACTIONS = [
  {
    id: 'activate'   as const,
    label: 'Activate Tracking',
    icon: 'fas fa-play',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    btnCls: 'bg-emerald-500 hover:bg-emerald-600',
    disabledWhen: (c: CurriculumTracking) => !!c.isActive,
    description: 'Activate this tracking to make it available for workflow processing',
  },
  {
    id: 'deactivate' as const,
    label: 'Deactivate Tracking',
    icon: 'fas fa-pause',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
    btnCls: 'bg-amber-500 hover:bg-amber-600',
    disabledWhen: (c: CurriculumTracking) => !c.isActive,
    description: 'Temporarily deactivate this tracking (can be reactivated later)',
  },
]

export function StatusManagementModal({ curriculum, onClose, onStatusChange }: StatusProps) {
  const [selectedAction, setSelected] = useState<'activate' | 'deactivate' | ''>('')
  const [confirmStep, setConfirm]     = useState(false)
  const [notes, setNotes]             = useState('')
  const [saving, setSaving]           = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const info = STATUS_ACTIONS.find((a) => a.id === selectedAction)

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAction) return
    if (!confirmStep) { setConfirm(true); return }
    setSaving(true)
    try { await onStatusChange(curriculum.id, !!curriculum.isActive, notes); onClose() }
    finally { setSaving(false) }
  }

  /* ── Confirm step ── */
  if (confirmStep && info) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="smm-confirm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="smm-confirm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-exclamation-triangle text-amber-500" aria-hidden="true" /> Confirm Status Change
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Action card */}
          <div className="p-5 rounded-xl border text-center" style={{ background: info.bg, borderColor: info.border }}>
            <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-2xl"
              style={{ background: info.color }}>
              <i className={info.icon} aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{info.label}</h3>
            <p className="text-sm text-gray-600 mb-3">{info.description}</p>
            <div className="bg-white/70 px-3 py-2 rounded-lg text-sm">
              <p className="font-semibold text-gray-800">{curriculum.title}</p>
              <p className="text-xs text-gray-500">{curriculum.trackingId} • {curriculum.school}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Reason for Status Change (Optional)</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any notes about why you're changing the status..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10" />
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-red-700 mb-1">
              <i className="fas fa-exclamation-triangle" aria-hidden="true" /> Impact of This Action
            </h5>
            <ul className="text-xs text-red-600 list-disc list-inside space-y-0.5">
              {selectedAction === 'deactivate' ? (
                <><li>The tracking will be suspended from the workflow</li><li>No stage actions until reactivated</li><li>All data and progress will be preserved</li></>
              ) : (
                <><li>The tracking will be restored to active status</li><li>Workflow processing will resume from current stage</li><li>Previously saved data remains intact</li></>
              )}
            </ul>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={() => setConfirm(false)} disabled={saving}
            className="py-2.5 px-4 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-60">Back</button>
          <button type="button" onClick={onClose} disabled={saving}
            className="py-2.5 px-4 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-60">Cancel</button>
          <button type="button" onClick={handleProceed} disabled={saving}
            className={cn('flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60 disabled:transform-none', info.btnCls)}>
            {saving ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Processing...</> : <><i className={info.icon} aria-hidden="true" /> Confirm {info.label}</>}
          </button>
        </div>
      </div>
    </div>
  )

  /* ── Main step ── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="smm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="smm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-cog text-must-green" aria-hidden="true" /> Manage Status — {curriculum.trackingId}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Current status */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">{curriculum.title}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Status',   value: curriculum.isActive ? 'Active' : 'Inactive', cls: curriculum.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200' },
                { label: 'Workflow', value: curriculum.statusDisplayName ?? curriculum.status, cls: 'bg-must-green/10 text-must-green-darker border-must-green/20' },
                { label: 'Stage',    value: curriculum.currentStageDisplayName ?? curriculum.currentStage, cls: 'bg-gray-100 text-gray-600 border-gray-200' },
              ].map(({ label, value, cls }) => (
                <div key={label} className="text-center">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">{label}</p>
                  <span className={cn('inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border', cls)}>{String(value).replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action options */}
          {STATUS_ACTIONS.map((action) => {
            const isDisabled = action.disabledWhen(curriculum)
            const isSelected = selectedAction === action.id
            return (
              <div key={action.id}
                onClick={() => !isDisabled && setSelected(action.id)}
                onKeyDown={(e) => !isDisabled && e.key === 'Enter' && setSelected(action.id)}
                tabIndex={isDisabled ? -1 : 0}
                role="radio" aria-checked={isSelected}
                className={cn('p-4 border-2 rounded-xl transition-all',
                  isDisabled ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50'
                  : isSelected ? 'cursor-pointer' : 'cursor-pointer border-gray-200 hover:border-gray-300')}
                style={isSelected && !isDisabled ? { borderColor: action.color, background: action.bg } : {}}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0"
                    style={{ background: action.color }}>
                    <i className={action.icon} aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    {action.label}
                    {isSelected && <i className="fas fa-check-circle text-must-green text-xs" aria-hidden="true" />}
                    {isDisabled && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-500 font-medium">Not Available</span>}
                  </p>
                </div>
                <p className="text-xs text-gray-500 ml-12">{action.description}</p>
              </div>
            )
          })}

          {selectedAction && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
              {selectedAction === 'deactivate'
                ? 'This tracking will be temporarily suspended. You can reactivate it later.'
                : 'This tracking will be restored to the active workflow and can proceed through approval stages.'}
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all">Cancel</button>
          <button type="button" onClick={handleProceed} disabled={!selectedAction}
            className={cn('flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-50 disabled:transform-none',
              selectedAction === 'activate' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600')}>
            {selectedAction === 'activate'
              ? <><i className="fas fa-play" aria-hidden="true" /> Continue to Activate</>
              : selectedAction === 'deactivate'
              ? <><i className="fas fa-pause" aria-hidden="true" /> Continue to Deactivate</>
              : 'Select an Action'}
          </button>
        </div>
      </div>
    </div>
  )
}
