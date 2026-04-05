'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Upload, BookOpen, Layers, Clock, Award, FileText, AlertCircle } from 'lucide-react';

interface CurriculumFormData {
  name: string;
  code: string;
  academicLevel: string;
  departmentId: string;
  expectedDuration: string;
  totalCredits: string;
  description: string;
  notes: string;
  document: File | null;
}

const ACADEMIC_LEVELS = ['CERTIFICATE', 'DIPLOMA', 'BACHELORS', 'MASTERS', 'DOCTORATE'];

const DEPARTMENTS = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Information Technology' },
  { id: '3', name: 'Business Administration' }
];

export default function CreateCurriculumClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CurriculumFormData>({
    name: '',
    code: '',
    academicLevel: '',
    departmentId: '',
    expectedDuration: '',
    totalCredits: '',
    description: '',
    notes: '',
    document: null
  });

  const updateFormData = (field: keyof CurriculumFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/admin/admin-all-curricula');
    }, 1500);
  };

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Details & Documents' },
    { number: 3, title: 'Review & Submit' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Curriculum</h1>
        <p className="text-gray-500">Initialize a new curriculum record and begin the formal tracking workflow.</p>
      </div>

      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded">
          <div 
            className="absolute top-0 left-0 h-1 bg-must-green rounded transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors bg-white ${
                currentStep > step.number 
                  ? 'border-must-green text-must-green' 
                  : currentStep === step.number 
                    ? 'border-must-green bg-must-green text-white' 
                    : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                    Curriculum Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent"
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                    Program Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => updateFormData('code', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent"
                    placeholder="e.g. BSC-CS"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-gray-400" />
                    Academic Level
                  </label>
                  <select
                    value={formData.academicLevel}
                    onChange={(e) => updateFormData('academicLevel', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent bg-white"
                  >
                    <option value="">Select Level</option>
                    {ACADEMIC_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-gray-400" />
                    Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => updateFormData('departmentId', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent bg-white"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    Expected Duration
                  </label>
                  <input
                    type="text"
                    value={formData.expectedDuration}
                    onChange={(e) => updateFormData('expectedDuration', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent"
                    placeholder="e.g. 4 Years"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-gray-400" />
                    Total Credits
                  </label>
                  <input
                    type="number"
                    value={formData.totalCredits}
                    onChange={(e) => updateFormData('totalCredits', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent"
                    placeholder="e.g. 120"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Curriculum Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent resize-none"
                  placeholder="Provide a comprehensive description of the curriculum objectives and outcomes..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Admin Initialization Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent resize-none"
                  placeholder="Internal notes regarding the initialization of this curriculum workflow..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Initial Document (PDF/DOCX)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-must-green transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-must-green hover:text-must-green/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-must-green">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => updateFormData('document', e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    {formData.document && (
                      <div className="mt-4 flex items-center justify-center text-sm text-must-green font-medium">
                        <FileText className="w-4 h-4 mr-2" />
                        {formData.document.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Please review the details below. Upon submission, this curriculum will be officially entered into the tracking workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Basic Information</h4>
                  <dl className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Name</dt>
                      <dd className="col-span-2 font-medium text-gray-900">{formData.name || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Code</dt>
                      <dd className="col-span-2 font-medium text-gray-900">{formData.code || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Level</dt>
                      <dd className="col-span-2 font-medium text-gray-900">{formData.academicLevel || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Duration</dt>
                      <dd className="col-span-2 font-medium text-gray-900">{formData.expectedDuration || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Credits</dt>
                      <dd className="col-span-2 font-medium text-gray-900">{formData.totalCredits || '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Documentation</h4>
                  <dl className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Description</dt>
                      <dd className="col-span-2 text-gray-900 line-clamp-3">{formData.description || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Notes</dt>
                      <dd className="col-span-2 text-gray-900 line-clamp-2">{formData.notes || '-'}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500">Attachment</dt>
                      <dd className="col-span-2 font-medium text-must-green flex items-center">
                        {formData.document ? (
                          <><FileText className="w-4 h-4 mr-1.5" />{formData.document.name}</>
                        ) : 'No file attached'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-200 bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1.5" />
            Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-must-green text-white text-sm font-medium rounded-lg hover:bg-must-green/90 transition-colors shadow-sm"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-must-green text-white text-sm font-medium rounded-lg hover:bg-must-green/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Check className="w-4 h-4 mr-1.5" />
                  Initialize Tracking
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}