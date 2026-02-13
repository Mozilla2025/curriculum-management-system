// src/config/user-dashboard.ts

import type { School } from '@/types/user-dashboard'

export const initialCurriculumData = {
  totalCurricula: 247,
  totalDepartments: 72,
  schools: [
    {
      id: 'computing',
      name: 'Computing & Informatics',
      icon: 'laptop-code',
      total: 45,
      departments: 8,
      programs: [
        {
          id: 'masters-computing',
          name: 'Masters',
          type: 'masters' as const,
          count: 12,
          departments: [
            {
              id: 'cs-masters',
              name: 'Computer Science',
              curricula: [
                {
                  id: 'msc-cs-se',
                  title: 'MSc Computer Science - Software Engineering',
                  status: 'approved' as const,
                  lastUpdated: '2024-01-15',
                },
                {
                  id: 'msc-cs-ai',
                  title: 'MSc Computer Science - Artificial Intelligence',
                  status: 'approved' as const,
                  lastUpdated: '2024-01-10',
                },
              ],
            },
          ],
        },
        {
          id: 'degree-computing',
          name: 'Degree',
          type: 'degree' as const,
          count: 28,
          departments: [
            {
              id: 'cs-degree',
              name: 'Computer Science',
              curricula: [
                {
                  id: 'bcs',
                  title: 'Bachelor of Computer Science',
                  status: 'approved' as const,
                  lastUpdated: '2024-01-05',
                },
              ],
            },
          ],
        },
      ],
    },
  ] as School[],
}

export const filterTabs = [
  { id: 'all', label: 'All Programs' },
  { id: 'masters', label: 'Masters' },
  { id: 'degree', label: 'Bachelor' },
  { id: 'phd', label: 'PhD' },
]

export const statusFilterTabs = [
  { id: 'all', label: 'All Status' },
  { id: 'approved', label: 'Approved' },
  { id: 'pending', label: 'Pending' },
  { id: 'review', label: 'Under Review' },
]

export const userSidebarConfig = {
  type: 'user' as const,
  header: {
    title: 'Curriculum Management System',
    logo: '/images/logo.jpg',
  },
  sections: [
    {
      id: 'main-navigation',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'home',
          path: '/user/dashboard',
        },
        {
          id: 'curricula',
          label: 'Curricula',
          icon: 'book-open',
          path: '/user/curricula',
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: 'bar-chart',
          path: '/user/analytics',
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          path: '/user/settings',
        },
      ],
    },
  ],
}