// src/app/dashboard/projects/page.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Star,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Briefcase,
  Activity,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  Settings,
  Share,
  Download,
  FileText,
  MessageSquare,
  Paperclip,
  GitBranch,
  Zap,
  Heart,
  Bookmark
} from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the user experience, checkout flow optimization, and mobile responsiveness improvements",
    status: "In Progress",
    priority: "High",
    progress: 75,
    budget: 224000,
    spent: 168000,
    startDate: "2024-10-01",
    endDate: "2024-12-30",
    team: [
      { name: "Alice Johnson", initials: "AJ", role: "Lead Designer", avatar: "/api/placeholder/32/32" },
      { name: "Bob Smith", initials: "BS", role: "Frontend Dev", avatar: "/api/placeholder/32/32" },
      { name: "Carol Davis", initials: "CD", role: "Backend Dev", avatar: "/api/placeholder/32/32" },
      { name: "David Wilson", initials: "DW", role: "UX Designer", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 24, completed: 18, inProgress: 4, pending: 2 },
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    category: "Development",
    client: "TechCorp Inc.",
    tags: ["E-Commerce", "Redesign", "Mobile"],
    comments: 24,
    attachments: 12,
    lastActivity: "2 hours ago",
    health: "good",
    revenue: 85000,
    milestones: { completed: 3, total: 5 }
  },
  {
    id: 2,
    title: "Mobile Analytics Dashboard",
    description: "Real-time analytics dashboard for mobile app performance tracking with advanced reporting capabilities",
    status: "Review",
    priority: "Medium",
    progress: 90,
    budget: 169000,
    spent: 152000,
    startDate: "2024-09-15",
    endDate: "2025-01-15",
    team: [
      { name: "Eve Brown", initials: "EB", role: "Data Analyst", avatar: "/api/placeholder/32/32" },
      { name: "Frank Miller", initials: "FM", role: "Full Stack Dev", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 30, completed: 27, inProgress: 2, pending: 1 },
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    category: "Analytics",
    client: "StartupXYZ",
    tags: ["Analytics", "Dashboard", "Mobile"],
    comments: 16,
    attachments: 8,
    lastActivity: "1 day ago",
    health: "good",
    revenue: 120000,
    milestones: { completed: 4, total: 4 }
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, typography, color palette, and brand guidelines documentation",
    status: "Planning",
    priority: "Low",
    progress: 25,
    budget: 94000,
    spent: 23000,
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    team: [
      { name: "Grace Lee", initials: "GL", role: "Brand Designer", avatar: "/api/placeholder/32/32" },
      { name: "Henry Kim", initials: "HK", role: "Graphic Designer", avatar: "/api/placeholder/32/32" },
      { name: "Ivy Chen", initials: "IC", role: "Creative Director", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 12, completed: 3, inProgress: 2, pending: 7 },
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    category: "Design",
    client: "DesignStudio",
    tags: ["Branding", "Design", "Identity"],
    comments: 8,
    attachments: 15,
    lastActivity: "3 hours ago",
    health: "warning",
    revenue: 75000,
    milestones: { completed: 1, total: 6 }
  },
  {
    id: 4,
    title: "API Integration Platform",
    description: "Microservices architecture implementation with REST API development and third-party integrations",
    status: "In Progress",
    priority: "Critical",
    progress: 60,
    budget: 315000,
    spent: 189000,
    startDate: "2024-08-01",
    endDate: "2025-03-31",
    team: [
      { name: "Jack Brown", initials: "JB", role: "Backend Architect", avatar: "/api/placeholder/32/32" },
      { name: "Kate Wilson", initials: "KW", role: "DevOps Engineer", avatar: "/api/placeholder/32/32" },
      { name: "Liam Davis", initials: "LD", role: "API Developer", avatar: "/api/placeholder/32/32" },
      { name: "Mia Johnson", initials: "MJ", role: "QA Engineer", avatar: "/api/placeholder/32/32" },
      { name: "Noah Miller", initials: "NM", role: "Security Expert", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 45, completed: 27, inProgress: 12, pending: 6 },
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    category: "Backend",
    client: "Enterprise Corp",
    tags: ["API", "Microservices", "Integration"],
    comments: 42,
    attachments: 23,
    lastActivity: "30 minutes ago",
    health: "critical",
    revenue: 280000,
    milestones: { completed: 2, total: 7 }
  },
  {
    id: 5,
    title: "Marketing Automation Tool",
    description: "Email marketing automation platform with campaign management and analytics features",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    budget: 140000,
    spent: 135000,
    startDate: "2024-06-01",
    endDate: "2024-11-30",
    team: [
      { name: "Olivia Taylor", initials: "OT", role: "Product Manager", avatar: "/api/placeholder/32/32" },
      { name: "Paul Anderson", initials: "PA", role: "Frontend Dev", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 28, completed: 28, inProgress: 0, pending: 0 },
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    category: "Marketing",
    client: "Marketing Agency",
    tags: ["Automation", "Email", "Marketing"],
    comments: 18,
    attachments: 9,
    lastActivity: "2 weeks ago",
    health: "good",
    revenue: 140000,
    milestones: { completed: 5, total: 5 }
  },
  {
    id: 6,
    title: "Machine Learning Model",
    description: "Predictive analytics model for customer behavior analysis and recommendation system",
    status: "In Progress",
    priority: "High",
    progress: 40,
    budget: 275000,
    spent: 110000,
    startDate: "2024-11-01",
    endDate: "2025-05-31",
    team: [
      { name: "Quinn Roberts", initials: "QR", role: "ML Engineer", avatar: "/api/placeholder/32/32" },
      { name: "Rachel Green", initials: "RG", role: "Data Scientist", avatar: "/api/placeholder/32/32" },
      { name: "Sam White", initials: "SW", role: "AI Researcher", avatar: "/api/placeholder/32/32" },
    ],
    tasks: { total: 35, completed: 14, inProgress: 8, pending: 13 },
    color: "bg-gradient-to-br from-violet-500 to-purple-500",
    category: "AI/ML",
    client: "Tech Innovation Lab",
    tags: ["Machine Learning", "AI", "Analytics"],
    comments: 31,
    attachments: 18,
    lastActivity: "1 hour ago",
    health: "good",
    revenue: 220000,
    milestones: { completed: 1, total: 4 }
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "Review": return "bg-amber-500/20 text-amber-300 border-amber-500/30"
    case "Planning": return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    case "Completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    case "On Hold": return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "priority-critical"
    case "High": return "priority-high"
    case "Medium": return "priority-medium" 
    case "Low": return "priority-low"
    default: return "priority-medium"
  }
}

const getHealthColor = (health: string) => {
  switch (health) {
    case "good": return "text-emerald-400"
    case "warning": return "text-amber-400"
    case "critical": return "text-red-400"
    default: return "text-gray-400"
  }
}

const getHealthIcon = (health: string) => {
  switch (health) {
    case "good": return CheckCircle
    case "warning": return AlertTriangle
    case "critical": return AlertTriangle
    default: return CheckCircle
  }
}

interface Project {
  id: number
  title: string
  description: string
  status: string
  priority: string
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: Array<{
    name: string
    initials: string
    role: string
    avatar: string
  }>
  tasks: {
    total: number
    completed: number
    inProgress: number
    pending: number
  }
  color: string
  category: string
  client: string
  tags: string[]
  comments: number
  attachments: number
  lastActivity: string
  health: string
  revenue: number
  milestones: {
    completed: number
    total: number
  }
}

const ProjectCard = ({ project, viewMode }: { project: Project, viewMode: string }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const HealthIcon = getHealthIcon(project.health)
  const budgetUsed = (project.spent / project.budget) * 100
  const isOverBudget = budgetUsed > 90

  if (viewMode === 'list') {
    return (
      <Card className="card-modern mb-4 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg`}>
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
                <Badge className={`border text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm line-clamp-1 mb-3">{project.description}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-white">${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{project.team.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{project.tasks.completed}/{project.tasks.total}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {project.team.slice(0, 4).map((member, index: number) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.team.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-semibold">+{project.team.length - 4}</span>
                  </div>
                )}
              </div>
              
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-modern cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
          <Badge className={`border text-xs ${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
          <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-5">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-semibold text-white">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </Progress>
          </div>

          {/* Budget */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Budget</span>
              <span className={`text-sm font-semibold ${isOverBudget ? 'text-red-400' : 'text-white'}`}>
                ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
              </span>
            </div>
            <Progress value={budgetUsed} className="h-2 bg-white/10">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverBudget ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-blue-500'
                }`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              />
            </Progress>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="text-lg font-bold text-white">{project.tasks.completed}/{project.tasks.total}</div>
              <div className="text-xs text-gray-400">Tasks Done</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="text-lg font-bold text-white">{project.team.length}</div>
              <div className="text-xs text-gray-400">Team Size</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="text-lg font-bold text-emerald-400">${(project.revenue / 1000).toFixed(0)}k</div>
              <div className="text-xs text-gray-400">Revenue</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="text-lg font-bold text-white">{project.milestones.completed}/{project.milestones.total}</div>
              <div className="text-xs text-gray-400">Milestones</div>
            </div>
          </div>

          {/* Team and Health */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, index: number) => (
                  <Avatar key={index} className="w-7 h-7 border-2 border-background ring-2 ring-white/10 hover:ring-white/30 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.team.length > 3 && (
                  <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-semibold">+{project.team.length - 3}</span>
                  </div>
                )}
              </div>
              <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                {project.client}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <HealthIcon className={`w-4 h-4 ${getHealthColor(project.health)}`} />
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.lastActivity}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'In Progress').length
  const completedProjects = projects.filter(p => p.status === 'Completed').length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Projects Overview</h1>
          <p className="text-gray-400 text-lg">Manage and track all your projects in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:scale-105 transition-all">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="btn-modern">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-modern hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white mb-1">{totalProjects}</p>
                <p className="text-sm text-gray-400">Total Projects</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400">+8% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400 mb-1">{activeProjects}</p>
                <p className="text-sm text-gray-400">Active Projects</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <PlayCircle className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-400">{activeProjects} in progress</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-400 mb-1">{completedProjects}</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Target className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400">{Math.round((completedProjects / totalProjects) * 100)}% success rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-400 mb-1">${(totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-gray-400">Total Revenue</p>
              </div>
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400">+15% vs last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500/50"
            />
          </div>
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Settings className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="text-sm"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="text-sm"
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} viewMode={viewMode} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="btn-glass justify-start h-auto p-6">
              <div className="flex flex-col items-start gap-3">
                <Plus className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="font-semibold text-lg">Create Project</div>
                  <div className="text-sm text-gray-400">Start a new project with templates</div>
                </div>
              </div>
            </Button>
            <Button className="btn-glass justify-start h-auto p-6">
              <div className="flex flex-col items-start gap-3">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-semibold text-lg">Generate Report</div>
                  <div className="text-sm text-gray-400">Create detailed project reports</div>
                </div>
              </div>
            </Button>
            <Button className="btn-glass justify-start h-auto p-6">
              <div className="flex flex-col items-start gap-3">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="font-semibold text-lg">Analytics</div>
                  <div className="text-sm text-gray-400">View detailed project analytics</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-white">Project Health Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-medium">Healthy Projects</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300">
                  {projects.filter(p => p.health === 'good').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium">Needs Attention</span>
                </div>
                <Badge className="bg-amber-500/20 text-amber-300">
                  {projects.filter(p => p.health === 'warning').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-white font-medium">Critical Issues</span>
                </div>
                <Badge className="bg-red-500/20 text-red-300">
                  {projects.filter(p => p.health === 'critical').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">New milestone completed</p>
                  <p className="text-xs text-gray-400">E-Commerce Platform Redesign</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Project status updated</p>
                  <p className="text-xs text-gray-400">Mobile Analytics Dashboard</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Team member added</p>
                  <p className="text-xs text-gray-400">Brand Identity System</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}// src/app/dashboard/projects/page.tsx