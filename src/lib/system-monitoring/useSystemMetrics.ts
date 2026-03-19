'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SystemMetrics } from '@/types/system-monitoring'
import { INITIAL_METRICS } from '@/lib/system-monitoring/constants'

export function useSystemMetrics() {
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const randomShift = (current: number, range: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, current + Math.floor((Math.random() - 0.5) * range)))

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        responseTime: randomShift(prev.responseTime, 20, 100, 200),
        activeUsers: randomShift(prev.activeUsers, 50, 1000, 1500),
        cpuUsage: randomShift(prev.cpuUsage, 10, 30, 80),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setMetrics((prev) => ({
      ...prev,
      responseTime: randomShift(prev.responseTime, 20, 100, 200),
      activeUsers: randomShift(prev.activeUsers, 50, 1000, 1500),
      cpuUsage: randomShift(prev.cpuUsage, 10, 30, 80),
    }))
    setIsRefreshing(false)
  }, [])

  return { metrics, isRefreshing, handleRefresh }
}
