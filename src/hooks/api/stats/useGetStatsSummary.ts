/**
 * useGetStatsSummary Hook
 * 
 * TanStack Query hook for fetching system statistics summary
 * 
 * Features:
 * - Automatic caching and stale-while-revalidate
 * - Error handling with type safety
 * - Query key factory integration
 * - Loading and error states
 * 
 * Usage:
 * const { data, isLoading, error } = useGetStatsSummary()
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { statsService } from '@/services/stats.service'
import { queryKeys } from '@/utils/queryKeys'
import type { StatsSummary } from '@/types/system-monitoring'

export const useGetStatsSummary = () => {
  return useQuery<StatsSummary>({
    queryKey: queryKeys.stats.summary(),
    queryFn: () => statsService.fetchStatsSummary(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })
}
