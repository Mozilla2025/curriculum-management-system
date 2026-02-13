// src/types/user-dashboard.ts

export interface School {
  id: string
  name: string
  icon: string
  total: number
  departments: number
  programs: Program[]
}

export interface Program {
  id: string
  name: string
  type: 'masters' | 'degree' | 'phd'
  count: number
  departments: Department[]
}

export interface Department {
  id: string
  name: string
  curricula: Curriculum[]
}

export interface Curriculum {
  id: string
  title: string
  status: 'approved' | 'pending' | 'review'
  lastUpdated: string
  school?: string
  department?: string
  duration?: string
}

export interface DashboardStats {
  totalCurricula: number
  totalSchools: number
  totalPrograms: number
  totalDepartments: number
}

export interface FilterOptions {
  searchTerm: string
  activeFilter: 'all' | 'masters' | 'degree' | 'phd'
  statusFilter: 'all' | 'approved' | 'pending' | 'review'
}

export interface CurriculumData {
  totalCurricula: number
  schools: School[]
  totalDepartments: number
}

// Context Types
export interface CurriculumContextValue {
  data: CurriculumData
  filteredSchools: School[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeFilter: string
  setActiveFilter: (filter: string) => void
  loading: boolean
  isInitialized: boolean
  refreshData: () => Promise<void>
  searchCurriculaByName: (name: string) => Promise<void>
  testConnection: () => Promise<{ success: boolean; error?: string }>
  getFilteredCurricula: (statusFilter: string, searchTerm: string) => Curriculum[]
}

// Theme Types
export interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  focusMode: boolean
  toggleFocusMode: () => void
}

// Analytics Types
export interface AnalyticsStat {
  value: string
  label: string
  icon: string
}

export interface ChartDataPoint {
  school: string
  count: number
  color: string
}

export interface ActivityItem {
  id: string
  icon: string
  text: string
}

export interface PerformanceItem {
  id: string
  rank: number
  name: string
  count: number
  color: string
}