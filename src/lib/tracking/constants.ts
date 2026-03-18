import type { TrackingStageConfig, TrackingStageKey, ReturnStageOption } from '@/types/tracking'

export const TRACKING_STAGES: TrackingStageConfig[] = [
  { key: 'department_submission', title: 'Dept. Submission',    icon: 'fas fa-file-alt',        description: 'Initial department curriculum submission',                  order: 1 },
  { key: 'school_board_review',   title: 'School Board Review', icon: 'fas fa-users',           description: 'Review by the school board members',                        order: 2 },
  { key: 'dean_committee',        title: 'Dean Committee',      icon: 'fas fa-user-tie',        description: 'Dean committee evaluation and approval',                     order: 3 },
  { key: 'senate_review',         title: 'Senate Review',       icon: 'fas fa-landmark',        description: 'University senate review and endorsement',                   order: 4 },
  { key: 'quality_assurance',     title: 'Quality Assurance',   icon: 'fas fa-shield-alt',      description: 'Quality assurance department check',                         order: 5 },
  { key: 'cue_submission',        title: 'CUE Submission',      icon: 'fas fa-paper-plane',     description: 'Submission to Commission for University Education',           order: 6 },
  { key: 'cue_review',            title: 'CUE Review',          icon: 'fas fa-search',          description: 'External CUE review and site inspection',                    order: 7 },
  { key: 'final_approval',        title: 'Final Approval',      icon: 'fas fa-flag-checkered',  description: 'Final accreditation and approval',                           order: 8 },
]

export const STAGE_NAMES: Record<TrackingStageKey, string> = Object.fromEntries(
  TRACKING_STAGES.map((s) => [s.key, s.title])
) as Record<TrackingStageKey, string>

export const STATUS_LABELS: Record<string, string> = {
  under_review:      'Under Review',
  pending_approval:  'Pending Approval',
  on_hold:           'On Hold',
  completed:         'Completed',
  rejected:          'Rejected',
  pending:           'Pending',
}

export const VIEW_MODE_NAMES: Record<string, string> = {
  all:            'All Trackings',
  workflow:       'Workflow View',
  table:          'Table View',
  'my-initiated': 'My Initiated',
  'my-assigned':  'My Assigned',
  'by-school':    'By School',
  'by-department':'By Department',
  'by-assignee':  'By Assignee',
  'by-initiator': 'By Initiator',
}

export const RETURN_STAGE_OPTIONS: Partial<Record<TrackingStageKey, ReturnStageOption[]>> = {
  school_board_review: [
    { key: 'department_submission', value: 'department_submission', label: 'Dept. Submission' },
  ],
  dean_committee: [
    { key: 'department_submission', value: 'department_submission', label: 'Dept. Submission' },
    { key: 'school_board_review',   value: 'school_board_review',   label: 'School Board Review' },
  ],
  senate_review: [
    { key: 'department_submission', value: 'department_submission', label: 'Dept. Submission' },
    { key: 'school_board_review',   value: 'school_board_review',   label: 'School Board Review' },
    { key: 'dean_committee',        value: 'dean_committee',        label: 'Dean Committee' },
  ],
  quality_assurance: [
    { key: 'dean_committee',  value: 'dean_committee',  label: 'Dean Committee' },
    { key: 'senate_review',   value: 'senate_review',   label: 'Senate Review' },
  ],
  cue_submission: [
    { key: 'quality_assurance', value: 'quality_assurance', label: 'Quality Assurance' },
  ],
  cue_review: [
    { key: 'cue_submission',    value: 'cue_submission',    label: 'CUE Submission' },
    { key: 'quality_assurance', value: 'quality_assurance', label: 'Quality Assurance' },
  ],
  final_approval: [
    { key: 'cue_review',        value: 'cue_review',        label: 'CUE Review' },
    { key: 'cue_submission',    value: 'cue_submission',    label: 'CUE Submission' },
  ],
}
