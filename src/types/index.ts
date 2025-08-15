export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  teamMembers: User[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  totalTasks: number;
  teamMembers: number;
  upcomingDeadlines: number;
}
