import { User, DashboardStats } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sofia Safier',
    email: 'sofia@company.com',
    role: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@company.com',
    role: 'member',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily@company.com',
    role: 'member',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    name: 'Mike Davis',
    email: 'mike@company.com',
    role: 'viewer',
    createdAt: '2024-02-10T10:00:00Z',
  },
]

export const mockDashboardStats: DashboardStats = {
  totalProjects: 3,
  activeProjects: 2,
  completedTasks: 12,
  totalTasks: 18,
  teamMembers: 4,
  upcomingDeadlines: 2,
}
