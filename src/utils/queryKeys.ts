/**
 * Query Keys Factory
 * 
 * Centralized, type-safe query key factory to prevent typos and cache invalidation bugs
 * Using factory pattern for organized query keys by domain
 */

export const queryKeys = {
  // Stats domain
  stats: {
    all: ['stats'] as const,
    summary: () => [...queryKeys.stats.all, 'summary'] as const,
  },

  // Curricula domain (example - can be extended)
  curricula: {
    all: ['curricula'] as const,
    list: (filters?: Record<string, unknown>) => [
      ...queryKeys.curricula.all,
      'list',
      filters,
    ] as const,
    detail: (id: number) => [...queryKeys.curricula.all, 'detail', id] as const,
  },

  // Users domain (example - can be extended)
  users: {
    all: ['users'] as const,
    list: (filters?: Record<string, unknown>) => [
      ...queryKeys.users.all,
      'list',
      filters,
    ] as const,
    detail: (id: number) => [...queryKeys.users.all, 'detail', id] as const,
  },

  // Departments domain (example - can be extended)
  departments: {
    all: ['departments'] as const,
    list: (filters?: Record<string, unknown>) => [
      ...queryKeys.departments.all,
      'list',
      filters,
    ] as const,
    detail: (id: number) => [
      ...queryKeys.departments.all,
      'detail',
      id,
    ] as const,
  },

  // Schools domain (example - can be extended)
  schools: {
    all: ['schools'] as const,
    list: (filters?: Record<string, unknown>) => [
      ...queryKeys.schools.all,
      'list',
      filters,
    ] as const,
    detail: (id: number) => [...queryKeys.schools.all, 'detail', id] as const,
  },
} as const;
