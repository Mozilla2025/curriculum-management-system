// src/components/user-dashboard/search-section.tsx

'use client'

import { useState } from 'react'
import { Search, X, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import { filterTabs } from '@/config/user-dashboard'

interface SearchSectionProps {
  searchTerm: string
  onSearch: (value: string) => void
  activeFilter: string
  onFilter: (filter: string) => void
  isSearching?: boolean
  disabled?: boolean
}

export function SearchSection({
  searchTerm,
  onSearch,
  activeFilter,
  onFilter,
  isSearching = false,
  disabled = false,
}: SearchSectionProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  const handleClearSearch = () => {
    onSearch('')
  }

  const handleFilterClick = (filterId: string) => {
    if (!disabled) {
      onFilter(filterId)
    }
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 text-must-green" />
          Find Curricula
        </h2>
        <p className="text-sm text-gray-600">
          Search across all academic programs and departments
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-must-green border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search curricula, programs, or departments..."
            disabled={disabled}
            className={cn(
              'w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300',
              'bg-gray-50 text-gray-900 placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-must-green focus:border-must-green',
              'focus:bg-white transition-all duration-200',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          />

          {searchTerm && !disabled && (
            <button
              onClick={handleClearSearch}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'text-gray-400 hover:text-gray-600 transition-colors'
              )}
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Hint */}
        <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
          <Lightbulb className="w-4 h-4 text-must-gold mt-0.5 flex-shrink-0" />
          <span>
            Try searching for: &quot;Computer Science&quot;, &quot;Engineering&quot;, &quot;Business&quot;
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleFilterClick(tab.id)}
            disabled={disabled}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200',
              'border-2 disabled:opacity-60 disabled:cursor-not-allowed',
              activeFilter === tab.id
                ? 'bg-must-green text-white border-must-green shadow-soft'
                : 'bg-white text-gray-700 border-gray-300 hover:border-must-green hover:bg-must-green-lighter hover:text-must-green-darker'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || activeFilter !== 'all') && !disabled && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-700">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-must-green text-white rounded-full text-sm font-medium">
                <Search className="w-3 h-3" />
                &quot;{searchTerm}&quot;
                <button
                  onClick={handleClearSearch}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter !== 'all' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-must-teal text-white rounded-full text-sm font-medium">
                {filterTabs.find((tab) => tab.id === activeFilter)?.label}
                <button
                  onClick={() => onFilter('all')}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label="Remove program filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Search Status */}
      {isSearching && (
        <div className="mt-4 flex items-center gap-2 text-sm text-must-green">
          <div className="w-4 h-4 border-2 border-must-green border-t-transparent rounded-full animate-spin" />
          <span>Searching curricula...</span>
        </div>
      )}
    </section>
  )
}