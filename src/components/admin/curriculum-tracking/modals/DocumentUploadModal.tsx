'use client';

import React, { useState, useCallback } from 'react';
import { X, Upload, FileText, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DocumentUploadModalProps {
  curriculum?: any;
  isOpen?: boolean;
  onClose: () => void;
  trackingId?: string;
  onUpload?: (data: { file: File; documentType: string; notes: string }) => void;
}

const DOCUMENT_TYPES = [
  { value: 'SYLLABUS', label: 'Curriculum Syllabus' },
  { value: 'ASSESSMENT_RUBRIC', label: 'Assessment Rubric' },
  { value: 'MEETING_MINUTES', label: 'Committee Meeting Minutes' },
  { value: 'EXTERNAL_REVIEW', label: 'External Review Report' },
  { value: 'SUPPORTING_DOCUMENT', label: 'Supporting Documentation' }
];

export function DocumentUploadModal({ isOpen = true, onClose, trackingId, curriculum, onUpload }: DocumentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('SUPPORTING_DOCUMENT');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, [isUploading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFile(null);
    setDocumentType('SUPPORTING_DOCUMENT');
    setNotes('');
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleClose = () => {
    if (isUploading) return;
    resetForm();
    onClose();
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Call the onUpload callback if provided
      if (onUpload) {
        onUpload({ file, documentType, notes });
      }
      
      setTimeout(() => {
        resetForm();
        handleClose();
      }, 1000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClose}>
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Attach files securely to {curriculum?.title || 'curriculum'} {trackingId ? `#${trackingId}` : ''}
            </p>
          </div>
          <button 
            onClick={handleClose} 
            disabled={isUploading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="p-6 flex-1 overflow-y-auto space-y-6">
          {isUploading ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="relative">
                {uploadProgress === 100 ? (
                  <CheckCircle2 className="w-16 h-16 text-must-green" />
                ) : (
                  <ShieldCheck className="w-16 h-16 text-must-green animate-pulse" />
                )}
              </div>
              
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">
                    {uploadProgress === 100 ? 'Upload Complete' : 'Uploading to Secure Storage...'}
                  </span>
                  <span className="text-must-green">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-must-green h-2 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[shimmer_1s_infinite] -translate-x-full" />
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 pt-2">
                  {uploadProgress === 100 ? 'Finalizing...' : 'Please do not close this window.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Document Type</label>
                <select
                  required
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent bg-white text-sm"
                >
                  {DOCUMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">File Attachment</label>
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${
                    file ? 'border-must-green bg-must-green/5' : 'border-gray-300 hover:border-must-green bg-gray-50/50'
                  }`}
                >
                  <div className="space-y-2 text-center">
                    {file ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
                          <FileText className="h-8 w-8 text-must-green" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-must-green hover:text-must-green/80 focus-within:outline-none">
                            <span>Click to upload</span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              accept=".pdf,.doc,.docx"
                              onChange={handleChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 50MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Optional Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-must-green focus:border-transparent resize-none text-sm"
                  placeholder="Add any relevant context about this document..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Documents uploaded here will be securely processed and attached to the permanent curriculum record.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || isUploading}
              className="flex items-center px-6 py-2 text-sm font-medium text-white bg-must-green rounded-lg hover:bg-must-green/90 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Processing...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}