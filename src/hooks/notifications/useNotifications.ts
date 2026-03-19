import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  Notification,
  NotificationFilters,
  NotificationToast,
  NotificationStats,
} from '@/types/notifications'
import { mockNotifications } from '@/lib/mock-data'

const ITEMS_PER_PAGE = 10

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading]         = useState(true)
  const [selectedIds, setSelectedIds]     = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage]     = useState(1)
  const [toasts, setToasts]               = useState<NotificationToast[]>([])
  const [filters, setFilters]             = useState<NotificationFilters>({
    search: '',
    type: '',
    priority: '',
    status: '',
  })

  // ── Initial load ─────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 800))
      setNotifications(mockNotifications)
      setIsLoading(false)
    }
    load()
  }, [])

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = useCallback((message: string, type: NotificationToast['type'] = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const q = filters.search.toLowerCase()
      const matchesSearch =
        !q || n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
      const matchesType     = !filters.type     || n.type     === filters.type
      const matchesPriority = !filters.priority || n.priority === filters.priority
      const matchesStatus   =
        !filters.status ||
        (filters.status === 'unread' && n.unread) ||
        (filters.status === 'read'   && !n.unread)
      return matchesSearch && matchesType && matchesPriority && matchesStatus
    })
  }, [notifications, filters])

  // Reset page + selection when filters change
  useEffect(() => {
    setCurrentPage(1)
    setSelectedIds(new Set())
  }, [filters])

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, currentPage])

  const paginationInfo = useMemo(() => {
    const start = filtered.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0
    const end   = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)
    return { start, end, total: filtered.length }
  }, [filtered.length, currentPage])

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats: NotificationStats = useMemo(
    () => ({
      unread:    notifications.filter((n) => n.unread).length,
      urgent:    notifications.filter((n) => n.urgent).length,
      reminders: notifications.filter((n) => n.type === 'reminder').length,
      system:    notifications.filter((n) => n.type === 'system').length,
    }),
    [notifications]
  )

  // ── Filter helpers ────────────────────────────────────────────────────────
  const updateFilter = useCallback(
    <K extends keyof NotificationFilters>(key: K, value: NotificationFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({ search: '', type: '', priority: '', status: '' })
    showToast('Filters cleared', 'info')
  }, [showToast])

  // ── Selection ─────────────────────────────────────────────────────────────
  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const selectAllOnPage = useCallback(() => {
    const pageIds    = paginated.map((n) => n.id)
    const allSelected = pageIds.every((id) => selectedIds.has(id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id))
        showToast('All notifications unselected', 'info')
      } else {
        pageIds.forEach((id) => next.add(id))
        showToast(`${pageIds.length} notifications selected`, 'info')
      }
      return next
    })
  }, [paginated, selectedIds, showToast])

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) {
      showToast('No notifications selected', 'error')
      return
    }
    if (!window.confirm(`Delete ${selectedIds.size} selected notification(s)?`)) return
    setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)))
    setSelectedIds(new Set())
    showToast('Selected notifications deleted', 'success')
  }, [selectedIds, showToast])

  // ── Read / unread ─────────────────────────────────────────────────────────
  const toggleReadState = useCallback(
    (id: number) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
      )
      const n = notifications.find((n) => n.id === id)
      showToast(n?.unread ? 'Marked as read' : 'Marked as unread', 'success')
    },
    [notifications, showToast]
  )

  const markAllAsRead = useCallback(() => {
    const unreadCount = notifications.filter((n) => n.unread).length
    if (unreadCount === 0) {
      showToast('No unread notifications', 'info')
      return
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    setSelectedIds(new Set())
    showToast(`${unreadCount} notifications marked as read`, 'success')
  }, [notifications, showToast])

  // ── Action handler ────────────────────────────────────────────────────────
  const handleAction = useCallback(
    (action: string, notificationId: number) => {
      const ACTION_MESSAGES: Record<string, string> = {
        Approve:           'Curriculum approved successfully',
        Review:            'Opening curriculum for review...',
        Reject:            'Curriculum rejected',
        'View Details':    'Opening detailed view...',
        Reschedule:        'Opening scheduling interface...',
        'View Report':     'Downloading report...',
        Extend:            'Curriculum validity extended',
        Archive:           'Curriculum archived',
        Assign:            'Opening assignment interface...',
        'Prepare Response':'Opening response preparation...',
        'Contact CUE':     'Opening contact form...',
        'Review Profile':  'Opening user profile...',
        Deny:              'Access request denied',
        'View Agenda':     'Opening meeting agenda...',
        'Add to Calendar': 'Added to calendar',
        Compare:           'Opening comparison view...',
        Merge:             'Opening merge interface...',
        'Keep Separate':   'Curricula marked as separate',
        Download:          'Downloading report...',
        Share:             'Opening share options...',
      }

      if (action === 'Reject' || action === 'Deny') {
        if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this item?`)) return
      }

      showToast(ACTION_MESSAGES[action] ?? `Action: ${action}`, 'success')

      const n = notifications.find((n) => n.id === notificationId)
      if (n?.unread) toggleReadState(notificationId)
    },
    [notifications, showToast, toggleReadState]
  )

  // ── Refresh ───────────────────────────────────────────────────────────────
  const refresh = useCallback(async () => {
    showToast('Refreshing notifications...', 'info')
    await new Promise((r) => setTimeout(r, 800))
    const newNotification: Notification = {
      id: Date.now(),
      type: 'workflow',
      priority: 'high',
      title: 'New Curriculum Submission',
      message:
        'School of Health Sciences has submitted a new Public Health curriculum for review.',
      time: 'Just now',
      timestamp: new Date(),
      unread: true,
      urgent: true,
      actions: ['Review', 'Assign', 'Defer'],
    }
    setNotifications((prev) => [newNotification, ...prev])
    showToast('Notifications refreshed', 'success')
  }, [showToast])

  return {
    // State
    isLoading,
    paginated,
    filtered,
    stats,
    filters,
    selectedIds,
    toasts,
    currentPage,
    totalPages,
    paginationInfo,
    // Actions
    updateFilter,
    clearFilters,
    toggleSelect,
    selectAllOnPage,
    deleteSelected,
    toggleReadState,
    markAllAsRead,
    handleAction,
    refresh,
    dismissToast,
    setCurrentPage,
  }
}
