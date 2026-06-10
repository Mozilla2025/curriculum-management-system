'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LayoutDashboard, BookOpen, Users, Clock, FileText, StickyNote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageKey, TrackingStageData } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStatusInfo, getPriorityBadgeClass } from '@/lib/tracking/utils'
import { DetailField } from './DetailField'
import { OverviewTab }  from './tabs/OverviewTab'
import { TimelineTab }  from './tabs/TimelineTab'
import { NotesTab }     from './tabs/NotesTab'

type Tab = 'overview' | 'details' | 'people' | 'timeline' | 'documents' | 'notes'

const TABS: { key: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'overview',  label: 'Overview',           Icon: LayoutDashboard },
  { key: 'details',   label: 'Curriculum Details', Icon: BookOpen },
  { key: 'people',    label: 'People',             Icon: Users },
  { key: 'timeline',  label: 'Timeline',           Icon: Clock },
  { key: 'documents', label: 'Documents',          Icon: FileText },
  { key: 'notes',     label: 'Notes',              Icon: StickyNote },
]

interface Props { curriculum: CurriculumTracking }

export function TrackingDetailClient({ curriculum }: Props) {
  const [tab, setTab] = useState<Tab>('overview')

  const stageKey  = curriculum.currentStage as TrackingStageKey
  const stageData = curriculum.stages[stageKey]
  const stageInfo = TRACKING_STAGES.find((s) => s.key === stageKey)
  const si        = getStatusInfo(stageData?.status ?? curriculum.status ?? 'pending')
  const priority  = curriculum.priority ?? 'medium'

  return (
    <div className="p-6 space-y-4">
      <Link
        href="/admin/admin-curriculum-tracking"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Track Progress
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Title bar */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {curriculum.displayTitle ?? curriculum.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-gray-500">
                <code className="bg-gray-100 px-2 py-0.5 rounded-md font-mono text-gray-600 text-[11px]">
                  {curriculum.trackingId}
                </code>
                {curriculum.displayCode && (
                  <><span className="text-gray-300">·</span><span className="font-mono text-gray-600">{curriculum.displayCode}</span></>
                )}
                <span className="text-gray-300">·</span>
                <span>{curriculum.schoolName ?? curriculum.school}</span>
                {curriculum.academicLevel && (
                  <><span className="text-gray-300">·</span><span className="capitalize">{curriculum.academicLevel}</span></>
                )}
              </div>
            </div>
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border flex-shrink-0',
              getPriorityBadgeClass(priority),
            )}>
              <i className="fas fa-flag text-[10px]" aria-hidden="true" />
              {priority} priority
            </span>
          </div>
        </div>

        {/* Current stage strip */}
        <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: si.bgColor, color: si.color }}
          >
            <i className={cn(stageInfo?.icon ?? 'fas fa-route', 'text-sm')} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {curriculum.statusDisplayName ?? si.label}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {curriculum.currentStageDisplayName ?? stageInfo?.title ?? 'Current stage'}
              {curriculum.daysInCurrentStage !== undefined && (
                <span className="ml-2 text-gray-400">· {curriculum.daysInCurrentStage} days at this stage</span>
              )}
            </p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto" role="tablist">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                'flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
                tab === key
                  ? 'border-must-green text-must-green-darker'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6" role="tabpanel">
          {tab === 'overview'  && <OverviewTab curriculum={curriculum} />}
          {tab === 'details'   && <DetailsPanel curriculum={curriculum} />}
          {tab === 'people'    && <PeoplePanel curriculum={curriculum} />}
          {tab === 'timeline'  && <TimelineTab curriculum={curriculum} />}
          {tab === 'documents' && <DocumentsPanel stageData={stageData} />}
          {tab === 'notes'     && <NotesTab curriculum={curriculum} stageData={stageData} />}
        </div>
      </div>
    </div>
  )
}

// ─── Inline compact tab panels ────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-1 h-6 bg-must-green rounded-full flex-shrink-0" />
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

function DetailsPanel({ curriculum }: { curriculum: CurriculumTracking }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="Program Information" subtitle="Basic details about this curriculum" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <DetailField label="Full Name"              value={curriculum.displayTitle}              icon="fas fa-eye" />
          <DetailField label="Proposed Name"          value={curriculum.proposedCurriculumName}    icon="fas fa-book" />
          <DetailField label="Short Code"             value={curriculum.displayCode}               icon="fas fa-code" />
          <DetailField label="Proposed Code"          value={curriculum.proposedCurriculumCode}    icon="fas fa-code" />
          <DetailField label="Duration (in semesters)" value={curriculum.proposedDurationSemesters} icon="fas fa-clock" />
          <DetailField label="Academic Level"         value={curriculum.academicLevel}             icon="fas fa-graduation-cap" />
        </div>
      </section>
      {curriculum.curriculumDescription && (
        <section>
          <SectionHeader title="Description" subtitle="What this curriculum is about" />
          <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-sm text-gray-700 leading-relaxed">{curriculum.curriculumDescription}</p>
          </div>
        </section>
      )}
    </div>
  )
}

function PersonCard({ name, email, role, roleDesc }: {
  name?: string
  email?: string
  role: string
  roleDesc: string
}) {
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'
  const hasData = !!name
  return (
    <div className={cn(
      'rounded-xl border p-5',
      hasData ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 border-dashed',
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0',
          hasData ? 'bg-must-green/10 text-must-green-darker' : 'bg-gray-100 text-gray-400',
        )}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className={cn('text-sm font-bold leading-tight', hasData ? 'text-gray-900' : 'text-gray-400 italic')}>
            {name ?? 'Not yet assigned'}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-must-green/10 text-must-green-darker">
            {role}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-3 leading-snug">{roleDesc}</p>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-xs text-must-green-darker hover:underline font-medium truncate"
        >
          <i className="fas fa-envelope text-must-green/60 flex-shrink-0" aria-hidden="true" />
          {email}
        </a>
      ) : (
        <p className="text-xs text-gray-400 italic">No email on record</p>
      )}
    </div>
  )
}

function OrgField({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-must-green/10 flex items-center justify-center flex-shrink-0">
        <i className={cn(icon, 'text-must-green-darker')} aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="text-sm font-bold text-gray-900 mt-0.5">{value || 'Not specified'}</p>
      </div>
    </div>
  )
}

function PeoplePanel({ curriculum }: { curriculum: CurriculumTracking }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="Key People" subtitle="Who is responsible for this curriculum" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PersonCard
            name={curriculum.initiatedByName}
            email={curriculum.initiatedByEmail}
            role="Submitted By"
            roleDesc="The person who created and submitted this curriculum for review."
          />
          <PersonCard
            name={curriculum.currentAssigneeName}
            email={curriculum.currentAssigneeEmail}
            role="Currently Handling"
            roleDesc="The person or committee currently reviewing this curriculum."
          />
        </div>
      </section>
      <section>
        <SectionHeader title="Organization" subtitle="Which school and department this curriculum belongs to" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OrgField icon="fas fa-university" label="School"     value={curriculum.schoolName ?? curriculum.school} />
          <OrgField icon="fas fa-building"   label="Department" value={curriculum.departmentName ?? curriculum.department} />
        </div>
      </section>
    </div>
  )
}

function DocumentsPanel({ stageData }: { stageData?: TrackingStageData }) {
  const docs = stageData?.documents ?? []
  if (docs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <i className="fas fa-file-alt text-4xl mb-3 block opacity-25" aria-hidden="true" />
        <p className="text-sm">No documents uploaded for this stage</p>
      </div>
    )
  }
  return (
    <div className="space-y-3">
      {docs.map((doc, i) => (
        <div
          key={doc.id ?? i}
          className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-must-green hover:bg-must-green/5 transition-all"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <i className="fas fa-file-alt text-must-green text-lg flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-800 truncate">{doc.originalFilename ?? String(doc)}</p>
              {doc.versionNumber && doc.versionNumber > 1 && (
                <span className="text-xs text-gray-400">Version {doc.versionNumber}</span>
              )}
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green-darker transition-all flex-shrink-0">
            <i className="fas fa-download" aria-hidden="true" /> Download
          </button>
        </div>
      ))}
    </div>
  )
}
