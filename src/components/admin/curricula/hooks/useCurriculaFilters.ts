import { useState, useCallback } from 'react'
import type { FilterState } from '@/types/curricula'

const DEFAULT_FILTERS: FilterState = {
  searchTerm: '',
  statusFilter: 'all',
  selectedSchool: '',
  selectedProgram: '',
  selectedDepartment: '',
  sortBy: 'lastModified',
}

export function useCurriculaFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [searchQuery, setSearchQuery] = useState('')

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchQuery('')
  }, [])

  const hasActiveFilters =
    filters.statusFilter !== 'all' ||
    !!filters.selectedSchool ||
    !!filters.selectedProgram ||
    !!filters.selectedDepartment ||
    filters.sortBy !== 'lastModified' ||
    !!searchQuery

  return {
    filters,
    searchQuery,
    setSearchQuery,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  }
}