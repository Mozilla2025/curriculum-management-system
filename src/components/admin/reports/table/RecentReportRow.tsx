import { cn } from '@/lib/utils'
import { ReportStatusBadge } from './ReportStatusBadge'
import type { RecentReport } from '@/types/reports'

interface RecentReportRowProps {
  report: RecentReport
}

export function RecentReportRow({ report }: RecentReportRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        {report.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{report.type}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{report.generatedBy}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{report.date}</td>
      <td className="px-4 py-3">
        <ReportStatusBadge status={report.status} />
      </td>
      <td className="px-4 py-3">
        <button
          className={cn(
            'inline-flex items-center justify-center w-8 h-8 rounded-md',
            'bg-white text-gray-500 border border-gray-300',
            'hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200',
          )}
          aria-label={
            report.status === 'completed'
              ? `Download ${report.name}`
              : `View ${report.name}`
          }
        >
          <i
            className={cn(
              'fas text-xs',
              report.status === 'completed' ? 'fa-download' : 'fa-eye',
            )}
            aria-hidden="true"
          />
        </button>
      </td>
    </tr>
  )
}
