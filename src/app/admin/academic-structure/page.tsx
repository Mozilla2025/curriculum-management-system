import { Metadata } from 'next';
import AcademicStructureClient from '@/components/admin/academic-structure/AcademicStructureClient';

export const metadata: Metadata = {
  title: 'Academic Structure | Admin Dashboard',
};

export default function AcademicStructurePage() {
  return <AcademicStructureClient />;
}