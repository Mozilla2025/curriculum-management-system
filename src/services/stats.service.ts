/**
 * Stats Service
 * 
 * Handles all statistics-related API calls
 * Fetches system-wide summary statistics (schools, departments, curricula counts)
 */

import { axiosClient } from '@/lib/api/axiosClient'
import type { StatsSummary, StatsSummaryResponse } from '@/types/system-monitoring'

const STATS_ENDPOINTS = {
  SUMMARY: '/stats/summary',
} as const

/**
 * Fetch system statistics summary
 * 
 * Returns aggregated counts of schools, departments, and curriculums
 * Used for dashboard metric cards and system overview
 * 
 * @returns {Promise<StatsSummary>} Statistics summary data
 * @throws {Error} If API request fails
 */
export const fetchStatsSummary = async (): Promise<StatsSummary> => {
  try {
    const response = await axiosClient.get<StatsSummaryResponse>(
      STATS_ENDPOINTS.SUMMARY
    )
    
    // Unwrap the data from the API response wrapper
    // per CLAUDE.md: "Always unwrap the backend wrapper in the Service layer"
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch stats summary:', error)
    throw error
  }
}

export const statsService = {
  fetchStatsSummary,
}
