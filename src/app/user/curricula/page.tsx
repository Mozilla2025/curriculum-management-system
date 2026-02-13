'use client'

import { useState, useMemo } from 'react'
import { Search, X, RotateCw, Eye, XCircle, Calendar, Building, BookOpen, FileText } from 'lucide-react'
import { mockDashboardData } from '@/lib/mock-data'

export default function CurriculaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCurriculum, setSelectedCurriculum] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  // Get all curricula from mock data
  const allCurricula = useMemo(() => {
    const curricula: any[] = []
    mockDashboardData.schools.forEach(school => {
      school.programs.forEach(program => {
        program.departments.forEach(department => {
          department.curricula.forEach(curriculum => {
            curricula.push({
              ...curriculum,
              school: school.name,
              program: program.name,
              department: department.name
            })
          })
        })
      })
    })
    return curricula
  }, [])

  // Filter curricula based on search and status
  const filteredCurricula = useMemo(() => {
    return allCurricula.filter(curriculum => {
      const matchesStatus = statusFilter === 'all' || curriculum.status === statusFilter
      const matchesSearch = searchTerm === '' ||
        curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.department.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [allCurricula, statusFilter, searchTerm])

  const filterTabs = [
    { id: 'all', label: 'All Status' },
    { id: 'approved', label: 'Approved' },
    { id: 'pending', label: 'Pending' },
    { id: 'review', label: 'Under Review' }
  ]

  const handleRefresh = () => {
    setSearchTerm('')
    setStatusFilter('all')
  }

  const handleViewCurriculum = (curriculum: any) => {
    setSelectedCurriculum(curriculum)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setTimeout(() => setSelectedCurriculum(null), 300)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-[1820px] mx-auto space-y-6 animate-fade-in">
      {/* Search Section */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Curricula</h2>
          <div className="flex items-center gap-4">
            <div className="bg-must-green text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {filteredCurricula.length} curricula found
            </div>
            <button
              onClick={handleRefresh}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              title="Refresh data"
            >
              <RotateCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isSearching ? 'animate-spin' : 'text-gray-400'}`} />
            <input
              type="text"
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-must-green transition-colors"
              placeholder="Search curricula by title, school, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                statusFilter === tab.id
                  ? 'bg-must-green text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              {statusFilter === tab.id && (
                <span className="ml-2 bg-white/25 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {filteredCurricula.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredCurricula.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No curricula found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? `No curricula match your search for "${searchTerm}"`
              : `No curricula found with status "${statusFilter}"`}
          </p>
          <div className="flex justify-center gap-3">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Search
              </button>
            )}
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Show All Status
              </button>
            )}
            <button
              onClick={handleRefresh}
              className="px-6 py-2.5 bg-must-green text-white rounded-lg hover:bg-green-600 font-medium transition-colors flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>
      )}

      {/* Curricula Table */}
      {filteredCurricula.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Curriculum Database
            </h2>
            <div className="bg-must-gold text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {filteredCurricula.length} result{filteredCurricula.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Curriculum Title</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">School</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCurricula.map((curriculum, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-must-green/5 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {curriculum.title}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      School of {curriculum.school}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {curriculum.department}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(curriculum.status)}`}>
                        {curriculum.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {formatDate(curriculum.lastUpdated)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleViewCurriculum(curriculum)}
                        className="px-4 py-2 bg-must-green text-white rounded-lg hover:bg-green-600 font-medium transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Curriculum Details Modal */}
      {showModal && selectedCurriculum && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleCloseModal}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-must-green to-must-teal px-6 py-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <BookOpen className="w-7 h-7" />
                    Curriculum Details
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 space-y-6">
                {/* Title Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Curriculum Title
                  </h4>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedCurriculum.title}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* School */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-must-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="w-5 h-5 text-must-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          School
                        </h4>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          School of {selectedCurriculum.school}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-must-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-must-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Department
                        </h4>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {selectedCurriculum.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Status
                        </h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(selectedCurriculum.status)}`}>
                          {selectedCurriculum.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Last Updated
                        </h4>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatDate(selectedCurriculum.lastUpdated)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Type */}
                {selectedCurriculum.program && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
                      Program Type
                    </h4>
                    <p className="text-sm font-semibold text-blue-900">
                      {selectedCurriculum.program}
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Curriculum Information
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-must-green mt-0.5">•</span>
                      <span>This curriculum includes comprehensive course structure and requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-must-green mt-0.5">•</span>
                      <span>Documentation and approval workflow are maintained in the system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-must-green mt-0.5">•</span>
                      <span>All updates are tracked and version-controlled</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-6 py-2.5 bg-must-green text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
                >
                  Edit Curriculum
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
