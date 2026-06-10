'use client'

import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HistoryEntry {
  id: string
  author: string
  role: string
  action: string
  comment?: string
  date: string
  type: 'action' | 'comment' | 'system'
}

const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: '1',
    author: 'Dr. Grace Muthoni',
    role: 'Department Rep',
    action: 'Submitted curriculum',
    comment: 'Initial submission of the revised curriculum with updated unit outcomes.',
    date: '2024-01-10T09:00:00Z',
    type: 'action',
  },
  {
    id: '2',
    author: 'Prof. James Mwaliko',
    role: 'School Board',
    action: 'Forwarded to Dean Committee',
    comment: 'Duplicate check passed. No conflicting programmes found in the system.',
    date: '2024-01-12T14:30:00Z',
    type: 'action',
  },
  {
    id: '3',
    author: 'Dr. Jane Smith',
    role: 'Dean Committee',
    action: 'Requested revisions',
    comment: 'Please update the prerequisite units in section 3.2 and align learning outcomes with CUE guidelines.',
    date: '2024-01-15T11:00:00Z',
    type: 'comment',
  },
  {
    id: '4',
    author: 'Dr. Grace Muthoni',
    role: 'Department Rep',
    action: 'Resubmitted with revisions',
    comment: 'Updated prerequisites and aligned outcomes as requested.',
    date: '2024-01-18T10:00:00Z',
    type: 'action',
  },
  {
    id: '5',
    author: 'System',
    role: 'Automated',
    action: 'Currently at Dean Committee',
    date: '2024-01-18T10:01:00Z',
    type: 'system',
  },
]

const roleColors: Record<string, string> = {
  'Department Rep': 'bg-blue-100 text-blue-700',
  'School Board': 'bg-purple-100 text-purple-700',
  'Dean Committee': 'bg-amber-100 text-amber-700',
  Senate: 'bg-indigo-100 text-indigo-700',
  'Quality Assurance': 'bg-teal-100 text-teal-700',
  'Vice Chancellor': 'bg-must-green/10 text-must-green-darker',
  Automated: 'bg-gray-100 text-gray-500',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CommentsHistory() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-gray-600" />
        <h2 className="text-base font-semibold text-gray-800">Comments & History</h2>
        <span className="ml-auto text-xs text-gray-400">{MOCK_HISTORY.length} entries</span>
      </div>

      <ol className="relative border-l border-gray-200 space-y-6 ml-2">
        {MOCK_HISTORY.map((entry) => (
          <li key={entry.id} className="ml-6">
            <span
              className={cn(
                'absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white',
                entry.type === 'system'
                  ? 'bg-gray-200'
                  : entry.type === 'comment'
                    ? 'bg-amber-100'
                    : 'bg-must-green/20'
              )}
            >
              {entry.type === 'system' ? (
                <i className="fas fa-cog text-[9px] text-gray-500" />
              ) : entry.type === 'comment' ? (
                <i className="fas fa-comment text-[9px] text-amber-600" />
              ) : (
                <i className="fas fa-check text-[9px] text-must-green" />
              )}
            </span>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-semibold text-gray-800">{entry.author}</span>
                <span
                  className={cn(
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                    roleColors[entry.role] ?? 'bg-gray-100 text-gray-600'
                  )}
                >
                  {entry.role}
                </span>
                <time className="text-xs text-gray-400 ml-auto">{formatDate(entry.date)}</time>
              </div>
              <p className="text-sm text-gray-600 font-medium">{entry.action}</p>
              {entry.comment && (
                <p className="text-sm text-gray-500 mt-1 leading-relaxed border-l-2 border-gray-200 pl-3">
                  {entry.comment}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
