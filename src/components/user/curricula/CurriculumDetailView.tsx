import Link from 'next/link'
import { ArrowLeft, Building2, BookOpen, LayoutGrid, Clock, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlatCurriculum } from '@/lib/user-curricula'

const STATUS_STYLES: Record<string, { pill: string; label: string }> = {
  approved: { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Approved' },
  pending:  { pill: 'bg-amber-100 text-amber-700 border-amber-200',       label: 'Pending Approval' },
  review:   { pill: 'bg-blue-100 text-blue-700 border-blue-200',          label: 'Under Review' },
}

function InfoCard({ icon, label, value, accent = 'green' }: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: 'green' | 'gold' | 'blue' | 'purple'
}) {
  const bg = {
    green:  'bg-emerald-50 text-emerald-600',
    gold:   'bg-amber-50 text-amber-600',
    blue:   'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  }[accent]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', bg)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}

interface Props {
  curriculum: FlatCurriculum
}

export function CurriculumDetailView({ curriculum }: Props) {
  const statusStyle = STATUS_STYLES[curriculum.status] ?? { pill: 'bg-gray-100 text-gray-600 border-gray-200', label: curriculum.status }

  const formatted = new Date(curriculum.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">

      {/* Back nav */}
      <Link
        href="/user/curricula"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Curriculums
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-must-green to-must-teal px-6 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
                {curriculum.program} · {curriculum.school}
              </p>
              <h1 className="text-xl font-bold text-white leading-snug">
                {curriculum.title}
              </h1>
            </div>
            <span className={cn(
              'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border flex-shrink-0 bg-white/10 text-white border-white/20',
            )}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard
            icon={<Building2 className="w-5 h-5" />}
            label="School"
            value={`School of ${curriculum.school}`}
            accent="green"
          />
          <InfoCard
            icon={<BookOpen className="w-5 h-5" />}
            label="Department"
            value={curriculum.department}
            accent="gold"
          />
          <InfoCard
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Programme Type"
            value={curriculum.program}
            accent="blue"
          />
          <InfoCard
            icon={<Clock className="w-5 h-5" />}
            label="Approval Status"
            value={statusStyle.label}
            accent="purple"
          />
          <InfoCard
            icon={<CalendarCheck className="w-5 h-5" />}
            label="Last Updated"
            value={formatted}
            accent="green"
          />
        </div>
      </div>

      {/* Curriculum info note */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fas fa-info-circle text-must-green" aria-hidden="true" />
          Curriculum Information
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'This curriculum includes a comprehensive course structure and learning outcomes.',
            'All documentation and approval history are maintained in the system.',
            'Updates are tracked and version-controlled throughout the approval workflow.',
          ].map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-must-green mt-1 flex-shrink-0 text-xs">●</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
