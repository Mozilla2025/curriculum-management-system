// Centralized, type-safe query key factory.
// All domains use the factory pattern to prevent typos and enable precise cache invalidation.

export const queryKeys = {
  // ── Stats ────────────────────────────────────────────────────────────────
  stats: {
    all: ['stats'] as const,
    summary: () => [...queryKeys.stats.all, 'summary'] as const,
  },

  // ── Schools ──────────────────────────────────────────────────────────────
  schools: {
    all: ['schools'] as const,
    list: () => [...queryKeys.schools.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.schools.all, 'detail', id] as const,
  },

  // ── Departments ──────────────────────────────────────────────────────────
  departments: {
    all: ['departments'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.departments.all, 'list', filters] as const,
    bySchool: (schoolId: number) =>
      [...queryKeys.departments.all, 'by-school', schoolId] as const,
    detail: (id: number) =>
      [...queryKeys.departments.all, 'detail', id] as const,
    count: (schoolId: number) =>
      [...queryKeys.departments.all, 'count', schoolId] as const,
  },

  // ── Curricula ────────────────────────────────────────────────────────────
  curricula: {
    all: ['curricula'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.curricula.all, 'list', filters] as const,
    bySchool: (schoolId: number, page?: number) =>
      [...queryKeys.curricula.all, 'by-school', schoolId, page] as const,
    byDepartment: (departmentId: number, page?: number) =>
      [...queryKeys.curricula.all, 'by-department', departmentId, page] as const,
    byAcademicLevel: (levelId: number, page?: number) =>
      [...queryKeys.curricula.all, 'by-level', levelId, page] as const,
    detail: (id: number) =>
      [...queryKeys.curricula.all, 'detail', id] as const,
    stats: () => [...queryKeys.curricula.all, 'stats'] as const,
    expiringSoon: (days: number) =>
      [...queryKeys.curricula.all, 'expiring-soon', days] as const,
  },

  // ── Users ────────────────────────────────────────────────────────────────
  users: {
    all: ['users'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.users.all, 'list', filters] as const,
    detail: (id: number) => [...queryKeys.users.all, 'detail', id] as const,
  },

  // ── Tracking ─────────────────────────────────────────────────────────────
  tracking: {
    all: ['tracking'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.tracking.all, 'list', filters] as const,
    detail: (id: number) =>
      [...queryKeys.tracking.all, 'detail', id] as const,
    byTrackingId: (trackingId: string) =>
      [...queryKeys.tracking.all, 'by-tracking-id', trackingId] as const,
    byStatus: (status: string, page?: number) =>
      [...queryKeys.tracking.all, 'by-status', status, page] as const,
    byStage: (stage: string, page?: number) =>
      [...queryKeys.tracking.all, 'by-stage', stage, page] as const,
    bySchool: (schoolId: number, page?: number) =>
      [...queryKeys.tracking.all, 'by-school', schoolId, page] as const,
    byDepartment: (deptId: number, page?: number) =>
      [...queryKeys.tracking.all, 'by-department', deptId, page] as const,
    myTrackings: (page?: number) =>
      [...queryKeys.tracking.all, 'my-trackings', page] as const,
    myAssignments: (page?: number) =>
      [...queryKeys.tracking.all, 'my-assignments', page] as const,
    byAssignee: (userId: number, page?: number) =>
      [...queryKeys.tracking.all, 'by-assignee', userId, page] as const,
    byInitiator: (userId: number, page?: number) =>
      [...queryKeys.tracking.all, 'by-initiator', userId, page] as const,
    permission: (id: number) =>
      [...queryKeys.tracking.all, 'permission', id] as const,
  },

  // ── Tracking Steps ───────────────────────────────────────────────────────
  trackingSteps: {
    all: ['tracking-steps'] as const,
    byTracking: (trackingId: number, filters?: Record<string, unknown>) =>
      [...queryKeys.trackingSteps.all, 'by-tracking', trackingId, filters] as const,
    detail: (stepId: number) =>
      [...queryKeys.trackingSteps.all, 'detail', stepId] as const,
    byStage: (trackingId: number, stage: string) =>
      [...queryKeys.trackingSteps.all, 'by-stage', trackingId, stage] as const,
    byAction: (trackingId: number, action: string) =>
      [...queryKeys.trackingSteps.all, 'by-action', trackingId, action] as const,
    milestones: (trackingId: number) =>
      [...queryKeys.trackingSteps.all, 'milestones', trackingId] as const,
    transitions: (trackingId: number) =>
      [...queryKeys.trackingSteps.all, 'transitions', trackingId] as const,
    recent: (trackingId: number, limit?: number) =>
      [...queryKeys.trackingSteps.all, 'recent', trackingId, limit] as const,
    latest: (trackingId: number) =>
      [...queryKeys.trackingSteps.all, 'latest', trackingId] as const,
    byUser: (userId: number, type: 'performed' | 'assigned') =>
      [...queryKeys.trackingSteps.all, 'by-user', userId, type] as const,
  },

  // ── Tracking Documents ───────────────────────────────────────────────────
  trackingDocuments: {
    all: ['tracking-documents'] as const,
    detail: (docId: number) =>
      [...queryKeys.trackingDocuments.all, 'detail', docId] as const,
    byTracking: (trackingId: number) =>
      [...queryKeys.trackingDocuments.all, 'by-tracking', trackingId] as const,
    byStep: (stepId: number) =>
      [...queryKeys.trackingDocuments.all, 'by-step', stepId] as const,
    byType: (trackingId: number, documentType: string) =>
      [...queryKeys.trackingDocuments.all, 'by-type', trackingId, documentType] as const,
    versions: (docId: number) =>
      [...queryKeys.trackingDocuments.all, 'versions', docId] as const,
    stats: () => [...queryKeys.trackingDocuments.all, 'stats'] as const,
  },
} as const
