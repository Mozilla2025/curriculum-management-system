'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import SchoolModal from './SchoolModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface School {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function SchoolsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [schools] = useState<School[]>([
    { id: '1', name: 'School of Computing', code: 'SOC', description: 'Computer Science and IT', status: 'ACTIVE' },
    { id: '2', name: 'School of Business', code: 'SOB', description: 'Business and Economics', status: 'ACTIVE' }
  ]);

  const handleOpenModal = (school?: School) => {
    setSelectedSchool(school || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (school: School) => {
    setSchoolToDelete(school);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // Simulate delete operation
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSchoolToDelete(null);
      // Here you would typically make an API call to delete the school
      alert(`School "${schoolToDelete?.name}" deleted successfully`);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Schools</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-gradient-to-br from-must-green via-must-green-dark to-must-teal text-white rounded-md hover:shadow-md text-sm font-medium transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add School
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{school.code}</td>
                <td className="px-6 py-4 text-gray-700">{school.name}</td>
                <td className="px-6 py-4 text-gray-500">{school.description}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    school.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {school.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleOpenModal(school)} className="text-must-green hover:text-must-green-dark transition-colors">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => handleOpenDeleteModal(school)} className="text-red-600 hover:text-red-900 transition-colors">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SchoolModal 
          school={selectedSchool} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <DeleteConfirmationModal
        school={schoolToDelete}
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSchoolToDelete(null);
        }}
      />
    </div>
  );
}