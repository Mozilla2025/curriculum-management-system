'use client'

import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'

function humanDate(d?: string | null): string | null {
  if (!d) return null
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return null }
}

function daysBetween(a?: string | null, b?: string | null): number | null {
  if (!a || !b) return null
  const n = Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000)
  return n >= 0 ? n : null
}

const KEY_DATES: {
  icon: string
  label: string
  note: string
  field: keyof CurriculumTracking
}[] = [
  { icon: 'fas fa-file-plus',      label: 'Created on',      note: 'When the curriculum was first entered into the system', field: 'createdAt'              },
  { icon: 'fas fa-paper-plane',    label: 'Submitted on',    note: 'When it was officially submitted for review',            field: 'submittedDate'          },
  { icon: 'fas fa-edit',           label: 'Last updated on', note: 'The date of the most recent change or update',          field: 'updatedAt'              },
  { icon: 'fas fa-flag-checkered', label: 'Expected by',     note: 'The target date for completing the full process',       field: 'expectedCompletionDate' },
  { icon: 'fas fa-check-circle',   label: 'Completed on',    note: 'When the curriculum was fully approved',                field: 'actualCompletionDate'   },
  { icon: 'fas fa-calendar-check', label: 'Takes effect on', note: 'When the new curriculum is planned to start',           field: 'proposedEffectiveDate'  },
]

interface Props { curriculum: CurriculumTracking }

export function TimelineTab({ curriculum }: Props) {
  const currentStageIdx = TRACKING_STAGES.findIndex((s) => s.key === curriculum.currentStage)

  return (
    <div className="space-y-10">

      {/* ── Important Dates ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-6 bg-must-green rounded-full flex-shrink-0" />
          <div>
            <h3 className="text-base font-bold text-gray-900">Important Dates</h3>
            <p className="text-xs text-gray-400 mt-0.5">Key dates in the life of this curriculum</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {KEY_DATES.map(({ icon, label, note, field }) => {
            const raw  = curriculum[field]
            const date = humanDate(typeof raw === 'string' ? raw : null)
            return (
              <div
                key={String(field)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border',
                  date ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100',
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  date ? 'bg-must-green/10 text-must-green-darker' : 'bg-gray-100 text-gray-300',
                )}>
                  <i className={cn(icon, 'text-sm')} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500">{label}</p>
                  <p className={cn(
                    'text-sm font-semibold mt-0.5 leading-tight',
                    date ? 'text-gray-900' : 'text-gray-400 font-normal italic',
                  )}>
                    {date ?? 'Not yet set'}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-snug">{note}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Approval Journey ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-6 bg-must-green rounded-full flex-shrink-0" />
          <div>
            <h3 className="text-base font-bold text-gray-900">Approval Journey</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Currently at step {currentStageIdx + 1} of {TRACKING_STAGES.length}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {TRACKING_STAGES.map((stage, idx) => {
            const sd        = curriculum.stages[stage.key]
            const isComp    = sd?.status === 'completed' || idx < currentStageIdx
            const isCurrent = stage.key === curriculum.currentStage
            const isPending = !isComp && !isCurrent
            const took      = daysBetween(sd?.startedDate, sd?.completedDate)

            if (isPending) {
              return (
                <div
                  key={stage.key}
                  className="flex items-center gap-4 px-4 py-3 bg-gray-50 border border-dashed border-gray-200 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-gray-400">{idx + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-400">{stage.title}</p>
                  <span className="ml-auto text-xs text-gray-400 italic">Not yet reached</span>
                </div>
              )
            }

            return (
              <div
                key={stage.key}
                className={cn(
                  'rounded-xl border p-5',
                  isCurrent ? 'bg-must-green/5 border-must-green/30' : 'bg-white border-gray-200',
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Step circle */}
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm',
                    isComp    ? 'bg-emerald-500' : 'bg-must-green ring-4 ring-must-green/20',
                  )}>
                    {isComp
                      ? <i className="fas fa-check text-xs" aria-hidden="true" />
                      : <span>{idx + 1}</span>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Stage title + status badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <p className="text-base font-bold text-gray-900">
                        Step {idx + 1}: {stage.title}
                      </p>
                      {isComp && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full">
                          <i className="fas fa-check text-[10px]" aria-hidden="true" /> Done
                        </span>
                      )}
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-must-green/10 text-must-green-darker border border-must-green/30 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-must-green inline-block" />
                          Currently Here
                        </span>
                      )}
                    </div>

                    {/* Stage detail grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3">
                      {sd?.assignedTo && (
                        <div>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Handled by</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">{sd.assignedTo}</p>
                        </div>
                      )}
                      {sd?.startedDate && (
                        <div>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Started on</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">{humanDate(sd.startedDate)}</p>
                        </div>
                      )}
                      {sd?.completedDate && (
                        <div>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Finished on</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">
                            {humanDate(sd.completedDate)}
                            {took !== null && took > 0 && (
                              <span className="text-xs text-gray-400 font-normal ml-1">
                                (took {took} day{took !== 1 ? 's' : ''})
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Days at current stage */}
                    {isCurrent && curriculum.daysInCurrentStage !== undefined && (
                      <p className="mt-3 text-sm text-must-green-darker font-medium flex items-center gap-1.5">
                        <i className="fas fa-clock" aria-hidden="true" />
                        Has been at this step for{' '}
                        <strong>{curriculum.daysInCurrentStage} day{curriculum.daysInCurrentStage !== 1 ? 's' : ''}</strong>
                      </p>
                    )}

                    {/* Stage note */}
                    {sd?.notes && (
                      <div className="mt-3 flex items-start gap-2.5 bg-white border border-gray-100 rounded-lg px-4 py-3">
                        <i className="fas fa-comment-alt text-gray-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-gray-700 leading-relaxed">{sd.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
