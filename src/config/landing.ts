import type { Feature, NewsItem, StatItem, CarouselImage, ProcessStep, TeamMember } from '@/types'

export const heroStats: StatItem[] = [
  { key: 'curricula', target: 247, icon: 'book-open', label: 'Total Curricula' },
  { key: 'schools', target: 8, icon: 'building', label: 'Academic Schools' },
  { key: 'programs', target: 24, icon: 'graduation-cap', label: 'Academic Levels' },
  { key: 'departments', target: 72, icon: 'users', label: 'Departments' },
]

export const carouselImages: CarouselImage[] = [
  {
    src: '/images/campus/main.jpg',
    title: 'MUST Main Campus',
    description: 'Excellence in Education & Technology - Our state-of-the-art facilities provide world-class learning environments.',
  },
  {
    src: '/images/campus/library.jpg',
    title: 'Modern Library & Learning Center',
    description: 'Advanced digital resources and collaborative spaces designed for 21st-century academic excellence.',
  },
  {
    src: '/images/campus/laboratory.jpg',
    title: 'Cutting-Edge Science Laboratories',
    description: 'Equipped with the latest technology to support innovative research and hands-on learning experiences.',
  },
  {
    src: '/images/campus/student-center.jpg',
    title: 'Vibrant Student Center',
    description: 'A hub for student activities, collaboration, and community building across all academic disciplines.',
  },
  {
    src: '/images/campus/innovation.jpg',
    title: 'Innovation & Technology Hub',
    description: 'Fostering technological advancement and entrepreneurship in science and technology fields.',
  },
]

export const newsItems: NewsItem[] = [
  {
    id: 1,
    icon: 'calendar',
    title: 'New Curriculum Approval Workflow Launched',
    excerpt: 'Enhanced digital approval process reduces processing time by 60% and provides real-time tracking capabilities.',
    date: 'December 15, 2024',
  },
  {
    id: 2,
    icon: 'trending-up',
    title: 'Advanced Analytics Dashboard Released',
    excerpt: 'New comprehensive analytics provide insights into curriculum performance and departmental activities.',
    date: 'December 10, 2024',
  },
  {
    id: 3,
    icon: 'award',
    title: 'MUST Achieves 95% Curriculum Approval Rate',
    excerpt: 'Outstanding achievement in academic excellence with streamlined curriculum management processes.',
    date: 'December 5, 2024',
  },
]

export const features: Feature[] = [
  {
    id: 1,
    icon: 'search',
    title: 'Smart Search & Filtering',
    description: 'Advanced search capabilities allow you to find any curriculum quickly. Filter by school, department, program type, or approval status.',
  },
  {
    id: 2,
    icon: 'list-checks',
    title: 'Streamlined Approval Process',
    description: 'Automated workflow management with real-time notifications, approval tracking, and comprehensive audit trails.',
  },
  {
    id: 3,
    icon: 'pie-chart',
    title: 'Comprehensive Analytics',
    description: 'Detailed reports and interactive dashboards provide insights into curriculum trends, approval rates, and performance metrics.',
  },
]

export const aboutFeatures: Feature[] = [
  {
    id: 1,
    icon: 'route',
    title: 'Linear Workflow Management',
    description: 'Streamlined step-by-step curriculum approval process with automated routing and progress tracking.',
  },
  {
    id: 2,
    icon: 'users-cog',
    title: 'Role-Based Access Control',
    description: 'Secure permissions system ensuring appropriate access levels for different stakeholders in the process.',
  },
  {
    id: 3,
    icon: 'bar-chart',
    title: 'Comprehensive Analytics',
    description: 'Detailed insights and reporting capabilities to monitor curriculum performance and approval metrics.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Department Submission',
    description: 'Departments create and submit new curricula through our intuitive interface with comprehensive documentation support.',
  },
  {
    number: 2,
    title: 'Multi-Level Review',
    description: 'Systematic review process through School Board, Dean Committee, Senate, and Quality Assurance with automated notifications.',
  },
  {
    number: 3,
    title: 'External Validation',
    description: 'Commission of University Education (CUE) external review and site inspection for final accreditation approval.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    icon: 'user-graduate',
    name: 'Academic Committee',
    role: 'Curriculum Review',
    description: 'Expert faculty ensuring academic excellence and standards compliance.',
  },
  {
    icon: 'shield',
    name: 'Quality Assurance',
    role: 'System Administration',
    description: 'Monitoring progress, managing workflows, and ensuring quality standards.',
  },
  {
    icon: 'settings',
    name: 'Technical Support',
    role: 'System Maintenance',
    description: 'Providing technical assistance and maintaining system performance.',
  },
  {
    icon: 'graduation-cap',
    name: 'University Leadership',
    role: 'Strategic Oversight',
    description: 'Guiding institutional direction and curriculum development strategy.',
  },
]