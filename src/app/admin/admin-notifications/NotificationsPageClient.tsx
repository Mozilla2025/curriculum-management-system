'use client'

import { useNotifications } from '@/hooks/notifications/useNotifications'

import { NotificationsHeader }      from '../../../components/admin/notifications/header/NotificationsHeader'
import { NotificationsStatsGrid }   from '../../../components/admin/notifications/stats/NotificationsStatsGrid'
import { NotificationsFilters }     from '../../../components/admin/notifications/filters/NotificationsFilters'
import { NotificationsList }        from '../../../components/admin/notifications/list/NotificationsList'
import { NotificationsPagination }  from '../../../components/admin/notifications/list/NotificationsPagination'
import { NotificationsToast }       from '../../../components/admin/notifications/shared/NotificationsToast'

export function NotificationsPageClient() {
  const {
    isLoading,
    paginated,
    stats,
    filters,
    selectedIds,
    toasts,
    currentPage,
    totalPages,
    paginationInfo,
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
  } = useNotifications()

  const handleSettings = () => {
    // TODO: wire up settings modal when built
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <NotificationsToast toasts={toasts} onDismiss={dismissToast} />

      <NotificationsHeader
        onMarkAllRead={markAllAsRead}
        onRefresh={refresh}
        onSettings={handleSettings}
      />

      <NotificationsStatsGrid stats={stats} />

      <NotificationsFilters
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <div>
        <NotificationsList
          notifications={paginated}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectAll={selectAllOnPage}
          onDeleteSelected={deleteSelected}
          onToggleSelect={toggleSelect}
          onAction={handleAction}
          onToggleRead={toggleReadState}
        />

        <NotificationsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginationInfo={paginationInfo}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
