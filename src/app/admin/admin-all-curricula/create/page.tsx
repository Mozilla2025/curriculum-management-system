import { Metadata } from 'next';
import CreateCurriculumClient from '@/components/admin/curricula/CreateCurriculumClient';

export const metadata: Metadata = {
  title: 'Create Curriculum | Admin Dashboard',
};

export default function CreateCurriculumPage() {
  return <CreateCurriculumClient />;
}