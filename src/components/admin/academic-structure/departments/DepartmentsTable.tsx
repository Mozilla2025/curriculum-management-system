'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DepartmentModal from './DepartmentModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Department {
  id: string;
  name: string;
  code: string;
  schoolName: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function DepartmentsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [departments] = useState<Department[]>([
    { id: '1', name: 'Computer Science', code: 'CS', schoolName: 'School of Computing', status: 'ACTIVE' },
    { id: '2', name: 'Information Technology', code: 'IT', schoolName: 'School of Computing', status: 'ACTIVE' }
  ]);

  const handleOpenModal = (department?: Department) => {
    setSelectedDepartment(department || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (department: Department) => {
    setDepartmentToDelete(department);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // Simulate delete operation
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setDepartmentToDelete(null);
      // Here you would typically make an API call to delete the department
      alert(`Department "${departmentToDelete?.name}" deleted successfully`);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Departments</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-gradient-to-br from-must-green via-must-green-dark to-must-teal text-white rounded-md hover:shadow-md text-sm font-medium transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">School</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{dept.code}</td>
                <td className="px-6 py-4 text-gray-700">{dept.name}</td>
                <td className="px-6 py-4 text-gray-500">{dept.schoolName}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    dept.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {dept.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleOpenModal(dept)} className="text-must-green hover:text-must-green-dark transition-colors">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => handleOpenDeleteModal(dept)} className="text-red-600 hover:text-red-900 transition-colors">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DepartmentModal 
          department={selectedDepartment} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <DeleteConfirmationModal
        department={departmentToDelete}
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDepartmentToDelete(null);
        }}
      />
    </div>
  );
}