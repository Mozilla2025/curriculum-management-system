// Mock data for the dashboard

export const mockDashboardData = {
  stats: {
    totalCurricula: 247,
    totalSchools: 8,
    totalPrograms: 24,
    totalDepartments: 72,
  },
  schools: [
    {
      id: 'computing',
      name: 'Computing & Informatics',
      departments: 8,
      total: 45,
      programs: [
        {
          id: 'masters-computing',
          name: "Master's",
          type: 'masters',
          count: 12,
          departments: [
            {
              name: 'Computer Science',
              curricula: [
                {
                  id: 'msc-cs-se',
                  title: 'MSc Computer Science - Software Engineering',
                  status: 'approved',
                  lastUpdated: '2024-01-15',
                },
                {
                  id: 'msc-cs-ai',
                  title: 'MSc Computer Science - Artificial Intelligence',
                  status: 'approved',
                  lastUpdated: '2024-01-10',
                },
                {
                  id: 'msc-cs-cyber',
                  title: 'MSc Computer Science - Cybersecurity',
                  status: 'pending',
                  lastUpdated: '2024-01-20',
                },
              ],
            },
            {
              name: 'Information Technology',
              curricula: [
                {
                  id: 'msc-it-net',
                  title: 'MSc Information Technology - Network Security',
                  status: 'approved',
                  lastUpdated: '2024-01-08',
                },
              ],
            },
          ],
        },
        {
          id: 'degree-computing',
          name: "Bachelor's",
          type: 'degree',
          count: 28,
          departments: [
            {
              name: 'Computer Science',
              curricula: [
                {
                  id: 'bcs',
                  title: 'Bachelor of Computer Science',
                  status: 'approved',
                  lastUpdated: '2024-01-05',
                },
                {
                  id: 'bse',
                  title: 'Bachelor of Software Engineering',
                  status: 'approved',
                  lastUpdated: '2024-01-07',
                },
              ],
            },
          ],
        },
        {
          id: 'phd-computing',
          name: 'PhD',
          type: 'phd',
          count: 5,
          departments: [
            {
              name: 'Computer Science',
              curricula: [
                {
                  id: 'phd-cs',
                  title: 'PhD in Computer Science',
                  status: 'approved',
                  lastUpdated: '2024-01-03',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'agriculture',
      name: 'Agriculture & Food Science',
      departments: 6,
      total: 42,
      programs: [
        {
          id: 'masters-agriculture',
          name: "Master's",
          type: 'masters',
          count: 15,
          departments: [
            {
              name: 'Agricultural Economics',
              curricula: [
                {
                  id: 'msc-agric-farm',
                  title: 'MSc Agricultural Economics - Farm Management',
                  status: 'approved',
                  lastUpdated: '2024-01-12',
                },
              ],
            },
          ],
        },
        {
          id: 'degree-agriculture',
          name: "Bachelor's",
          type: 'degree',
          count: 21,
          departments: [
            {
              name: 'Agricultural Economics',
              curricula: [
                {
                  id: 'bagric-econ',
                  title: 'Bachelor of Agricultural Economics',
                  status: 'approved',
                  lastUpdated: '2024-01-06',
                },
              ],
            },
          ],
        },
        {
          id: 'phd-agriculture',
          name: 'PhD',
          type: 'phd',
          count: 6,
          departments: [
            {
              name: 'Agricultural Economics',
              curricula: [
                {
                  id: 'phd-agric-econ',
                  title: 'PhD in Agricultural Economics',
                  status: 'pending',
                  lastUpdated: '2024-01-22',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'engineering',
      name: 'Engineering & Technology',
      departments: 5,
      total: 38,
      programs: [
        {
          id: 'masters-engineering',
          name: "Master's",
          type: 'masters',
          count: 12,
          departments: [
            {
              name: 'Civil Engineering',
              curricula: [
                {
                  id: 'msc-civil-struct',
                  title: 'MSc Civil Engineering - Structural',
                  status: 'approved',
                  lastUpdated: '2024-01-11',
                },
              ],
            },
          ],
        },
        {
          id: 'degree-engineering',
          name: "Bachelor's",
          type: 'degree',
          count: 22,
          departments: [
            {
              name: 'Civil Engineering',
              curricula: [
                {
                  id: 'bcivil',
                  title: 'Bachelor of Civil Engineering',
                  status: 'approved',
                  lastUpdated: '2024-01-04',
                },
              ],
            },
          ],
        },
        {
          id: 'phd-engineering',
          name: 'PhD',
          type: 'phd',
          count: 4,
          departments: [
            {
              name: 'Civil Engineering',
              curricula: [
                {
                  id: 'phd-civil',
                  title: 'PhD in Civil Engineering',
                  status: 'review',
                  lastUpdated: '2024-01-21',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const mockCurriculaData = {
  curricula: [
    {
      id: 1,
      title: 'MSc Computer Science - Software Engineering',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'approved',
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      title: 'MSc Computer Science - Artificial Intelligence',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'approved',
      lastUpdated: '2024-01-10',
    },
    {
      id: 3,
      title: 'MSc Computer Science - Cybersecurity',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'pending',
      lastUpdated: '2024-01-20',
    },
    {
      id: 4,
      title: 'Bachelor of Computer Science',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'approved',
      lastUpdated: '2024-01-05',
    },
    {
      id: 5,
      title: 'Bachelor of Software Engineering',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'approved',
      lastUpdated: '2024-01-07',
    },
    {
      id: 6,
      title: 'PhD in Computer Science',
      school: 'Computing & Informatics',
      department: 'Computer Science',
      status: 'approved',
      lastUpdated: '2024-01-03',
    },
    {
      id: 7,
      title: 'MSc Agricultural Economics - Farm Management',
      school: 'Agriculture & Food Science',
      department: 'Agricultural Economics',
      status: 'approved',
      lastUpdated: '2024-01-12',
    },
    {
      id: 8,
      title: 'Bachelor of Agricultural Economics',
      school: 'Agriculture & Food Science',
      department: 'Agricultural Economics',
      status: 'approved',
      lastUpdated: '2024-01-06',
    },
    {
      id: 9,
      title: 'PhD in Agricultural Economics',
      school: 'Agriculture & Food Science',
      department: 'Agricultural Economics',
      status: 'pending',
      lastUpdated: '2024-01-22',
    },
    {
      id: 10,
      title: 'MSc Civil Engineering - Structural',
      school: 'Engineering & Technology',
      department: 'Civil Engineering',
      status: 'approved',
      lastUpdated: '2024-01-11',
    },
    {
      id: 11,
      title: 'Bachelor of Civil Engineering',
      school: 'Engineering & Technology',
      department: 'Civil Engineering',
      status: 'approved',
      lastUpdated: '2024-01-04',
    },
    {
      id: 12,
      title: 'PhD in Civil Engineering',
      school: 'Engineering & Technology',
      department: 'Civil Engineering',
      status: 'review',
      lastUpdated: '2024-01-21',
    },
  ],
}

// Admin-compatible mock data derived from existing mock data
export const mockAdminCurricula = mockCurriculaData.curricula.map((c) => {
  const schoolEntry = mockDashboardData.schools.find((s) => s.name === c.school)
  const programEntry = schoolEntry?.programs.find((p) =>
    p.departments.some((d) => d.curricula.some((cur) => cur.title === c.title))
  )
  return {
    id: String(c.id),
    title: c.title,
    code: c.title
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 8),
    status: c.status as 'approved' | 'pending' | 'draft' | 'rejected' | 'under_review',
    schoolId: schoolEntry?.id ?? '',
    schoolName: c.school,
    programId: programEntry?.id ?? '',
    programName: programEntry?.name ?? '',
    department: c.department,
    lastModified: c.lastUpdated,
    createdDate: c.lastUpdated,
    effectiveDate: c.lastUpdated,
    enrollments: Math.floor(Math.random() * 200) + 20,
  }
})

export const mockAdminSchools = mockDashboardData.schools.map((s) => ({
  id: s.id,
  name: s.name,
}))

export const mockAdminPrograms = mockDashboardData.schools.flatMap((s) =>
  s.programs.map((p) => ({
    id: p.id,
    name: p.name,
  }))
)

export const mockAdminStats = {
  total: mockCurriculaData.curricula.length,
  approved: mockCurriculaData.curricula.filter((c) => c.status === 'approved').length,
  pending: mockCurriculaData.curricula.filter((c) => c.status === 'pending').length,
  rejected: mockCurriculaData.curricula.filter((c) => c.status === 'rejected').length,
  draft: mockCurriculaData.curricula.filter((c) => c.status === 'draft').length,
  underReview: mockCurriculaData.curricula.filter((c) => c.status === 'under_review').length,
}

export const mockAnalyticsData = {
  summaryStats: [
    { value: '85%', label: 'Approval Rate' },
    { value: '24', label: 'Avg. Review Days' },
    { value: '95%', label: 'Quality Score' },
  ],
  chartData: [
    { school: 'Computing & Informatics', count: 45, color: '#00D666' },
    { school: 'Agriculture & Food Science', count: 42, color: '#f0b41c' },
    { school: 'Engineering & Technology', count: 38, color: '#1a3a6e' },
  ],
  recentActivity: [
    '5 new curricula submitted this week',
    '12 curricula approved in the last 7 days',
    '3 curricula pending review',
  ],
  topSchools: [
    { school: 'Computing & Informatics', count: 45, color: '#00D666' },
    { school: 'Agriculture & Food Science', count: 42, color: '#f0b41c' },
    { school: 'Engineering & Technology', count: 38, color: '#1a3a6e' },
  ],
}