'use client'

import React, { useState } from 'react'
import { Building2, Layers } from 'lucide-react'
import SchoolsTable from './schools/SchoolsTable'
import DepartmentsTable from './departments/DepartmentsTable'

export default function AcademicStructureClient() {
  const [activeTab, setActiveTab] = useState<'schools' | 'departments'>('schools')

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Academic Structure Management</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage schools, faculties, and departments across the institution
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('schools')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              activeTab === 'schools'
                ? 'border-must-green text-must-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Schools
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              activeTab === 'departments'
                ? 'border-must-green text-must-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            Departments
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'schools' ? <SchoolsTable /> : <DepartmentsTable />}
      </div>
    </div>
  )
}