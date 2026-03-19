import type { ReportCard, RecentReport, QuickAnalyticItem, ReportFilters } from '@/types/reports'

export const REPORT_CARDS: ReportCard[] = [
  {
    id: 'curriculum-status',
    icon: 'fa-clipboard-list',
    title: 'Curriculum Status Report',
    description: 'Complete overview of all curriculum statuses',
    statNumber: '127',
    statLabel: 'Total Records',
    iconColor: 'green',
  },
  {
    id: 'school-performance',
    icon: 'fa-university',
    title: 'School Performance',
    description: 'Performance metrics by school/faculty',
    statNumber: '8',
    statLabel: 'Schools Tracked',
    iconColor: 'blue',
  },
  {
    id: 'approval-timeline',
    icon: 'fa-clock',
    title: 'Approval Timeline',
    description: 'Time analysis for approval processes',
    statNumber: '45',
    statLabel: 'Avg Days',
    iconColor: 'gold',
  },
  {
    id: 'quality-assurance',
    icon: 'fa-shield-alt',
    title: 'Quality Assurance',
    description: 'QA review metrics and compliance',
    statNumber: '98%',
    statLabel: 'Compliance Rate',
    iconColor: 'red',
  },
  {
    id: 'cue-submissions',
    icon: 'fa-paper-plane',
    title: 'CUE Submissions',
    description: 'External submission tracking and outcomes',
    statNumber: '23',
    statLabel: 'Submitted',
    iconColor: 'purple',
  },
  {
    id: 'bottleneck-analysis',
    icon: 'fa-exclamation-triangle',
    title: 'Bottleneck Analysis',
    description: 'Workflow delays and improvement areas',
    statNumber: '5',
    statLabel: 'Issues Found',
    iconColor: 'orange',
  },
]

export const RECENT_REPORTS: RecentReport[] = [
  {
    id: 'rr-001',
    name: 'Engineering School Q1 Summary',
    type: 'School Performance',
    generatedBy: 'Dr. Sarah Johnson',
    date: 'Dec 15, 2024',
    status: 'completed',
  },
  {
    id: 'rr-002',
    name: 'Curriculum Approval Timeline',
    type: 'Timeline Analysis',
    generatedBy: 'Admin System',
    date: 'Dec 14, 2024',
    status: 'completed',
  },
  {
    id: 'rr-003',
    name: 'Monthly QA Compliance',
    type: 'Quality Assurance',
    generatedBy: 'QA Team',
    date: 'Dec 12, 2024',
    status: 'in-progress',
  },
  {
    id: 'rr-004',
    name: 'CUE Submission Status',
    type: 'External Tracking',
    generatedBy: 'Vice Chancellor Office',
    date: 'Dec 10, 2024',
    status: 'pending',
  },
]

export const QUICK_ANALYTICS: QuickAnalyticItem[] = [
  { number: 127, label: 'Total Curricula', color: 'green' },
  { number: 34, label: 'In Review', color: 'blue' },
  { number: 89, label: 'Approved', color: 'gold' },
  { number: 4, label: 'Rejected', color: 'red' },
]

export const DEFAULT_FILTERS: ReportFilters = {
  academicYear: '',
  school: '',
  status: '',
  reportType: '',
}

export const ACADEMIC_YEAR_OPTIONS = [
  { value: '2024/2025', label: '2024/2025' },
  { value: '2023/2024', label: '2023/2024' },
  { value: '2022/2023', label: '2022/2023' },
]

export const SCHOOL_OPTIONS = [
  { value: 'engineering', label: 'School of Engineering' },
  { value: 'business', label: 'School of Business' },
  { value: 'education', label: 'School of Education' },
  { value: 'medicine', label: 'School of Medicine' },
]

export const STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved' },
  { value: 'review', label: 'In Review' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
]

export const REPORT_TYPE_OPTIONS = [
  { value: 'summary', label: 'Summary Reports' },
  { value: 'detailed', label: 'Detailed Analytics' },
  { value: 'progress', label: 'Progress Tracking' },
]
