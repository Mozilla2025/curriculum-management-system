// src/app/user/dashboard/page.tsx

'use client'

import { useState, useEffect, useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import { DashboardCards } from '@/components/user-dashboard/dashboard-cards'
import { SearchSection } from '@/components/user-dashboard/search-section'
import { SchoolsList } from '@/components/user-dashboard/schools-list'
import { initialCurriculumData } from '@/config/user-dashboard'
import type { School, DashboardStats, FilterOptions } from '@/types/user-dashboard'

export default function UserDashboardPage() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    activeFilter: 'all',
    statusFilter: 'all',
  })
  const [isSearching, setIsSearching] = useState(false)

  // Initialize data
  useEffect(() => {
    setIsInitialized(true)
  }, [])

  // Calculate stats
  const stats: DashboardStats = useMemo(() => ({
    totalCurricula: initialCurriculumData.totalCurricula,
    totalSchools: initialCurriculumData.schools.length,
    totalPrograms: initialCurriculumData.schools.reduce(
      (sum, school) => sum + school.programs.length,
      0
    ),
    totalDepartments: initialCurriculumData.totalDepartments,
  }), [])

  // Filter schools based on search and filters
  const filteredSchools: School[] = useMemo(() => {
    let schools = [...initialCurriculumData.schools]

    // Filter by program type
    if (filters.activeFilter !== 'all') {
      schools = schools
        .map((school) => ({
          ...school,
          programs: school.programs.filter(
            (program) => program.type === filters.activeFilter
          ),
        }))
        .filter((school) => school.programs.length > 0)
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      schools = schools
        .map((school) => {
          // Check if school name matches
          const schoolMatches = school.name.toLowerCase().includes(searchLower)

          // Filter programs and curricula
          const filteredPrograms = school.programs
            .map((program) => {
              const programMatches = program.name.toLowerCase().includes(searchLower)
              
              const filteredDepartments = program.departments
                .map((dept) => {
                  const deptMatches = dept.name.toLowerCase().includes(searchLower)
                  const filteredCurricula = dept.curricula.filter((curriculum) =>
                    curriculum.title.toLowerCase().includes(searchLower)
                  )

                  if (deptMatches || filteredCurricula.length > 0) {
                    return { ...dept, curricula: filteredCurricula.length > 0 ? filteredCurricula : dept.curricula }
                  }
                  return null
                })
                .filter(Boolean) as typeof program.departments

              if (programMatches || filteredDepartments.length > 0) {
                return {
                  ...program,
                  departments: filteredDepartments.length > 0 ? filteredDepartments : program.departments,
                }
              }
              return null
            })
            .filter(Boolean) as School['programs']

          if (schoolMatches || filteredPrograms.length > 0) {
            return {
              ...school,
              programs: filteredPrograms.length > 0 ? filteredPrograms : school.programs,
            }
          }
          return null
        })
        .filter(Boolean) as School[]
    }

    return schools
  }, [filters])

  const handleSearch = async (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }))
    
    if (searchTerm.length >= 3) {
      setIsSearching(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsSearching(false)
    }
  }

  const handleFilter = (activeFilter: string) => {
    setFilters((prev) => ({ ...prev, activeFilter: activeFilter as 'all' | 'masters' | 'degree' | 'phd' }))
  }

  const handleRefresh = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-must-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard...</h3>
          <p className="text-gray-600">Fetching the latest curriculum data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Curriculum Dashboard</h1>
          <p className="text-gray-600">
            Browse and explore academic curricula across all schools and programs
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-must-green hover:text-must-green transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards stats={stats} loading={loading} />

      {/* Search Section */}
      <SearchSection
        searchTerm={filters.searchTerm}
        onSearch={handleSearch}
        activeFilter={filters.activeFilter}
        onFilter={handleFilter}
        isSearching={isSearching}
        disabled={loading}
      />

      {/* Schools List */}
      {filteredSchools.length > 0 ? (
        <SchoolsList schools={filteredSchools} loading={loading} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600 mb-6">
              {filters.searchTerm
                ? `No schools or curricula match your search for "${filters.searchTerm}"`
                : `No schools found with the current filter "${filters.activeFilter}"`}
            </p>
            <div className="flex gap-3 justify-center">
              {filters.searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-must-green hover:text-must-green transition-all"
                >
                  Clear Search
                </button>
              )}
              {filters.activeFilter !== 'all' && (
                <button
                  onClick={() => handleFilter('all')}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-must-green hover:text-must-green transition-all"
                >
                  Show All Programs
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && isInitialized && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-strong border border-gray-200">
            <div className="w-6 h-6 border-4 border-must-green border-t-transparent rounded-full animate-spin" />
            <span className="font-semibold text-gray-700">Updating data...</span>
          </div>
        </div>
      )}
    </div>
  )
}