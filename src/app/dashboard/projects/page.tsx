// src/app/dashboard/projects/page.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  MoreHorizontal,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  Calendar,
  Users,
  Clock,
  BarChart3,
  Star,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the e-commerce platform with modern UI/UX design and improved user experience",
    status: "In Progress",
    priority: "High",
    progress: 78,
    startDate: "2025-01-15",
    dueDate: "2025-04-30",
    budget: 85000,
    spent: 62000,
    category: "Web Development",
    tags: ["React", "TypeScript", "Design System"],
    team: [
      { name: "Alice Chen", avatar: "/api/placeholder/32/32", role: "Project Manager", initials: "AC" },
      { name: "Bob Wilson", avatar: "/api/placeholder/32/32", role: "Lead Developer", initials: "BW" },
      { name: "Carol Martinez", avatar: "/api/placeholder/32/32", role: "UI Designer", initials: "CM" },
      { name: "David Kim", avatar: "/api/placeholder/32/32", role: "Backend Developer", initials: "DK" }
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    icon: BarChart3,
    tasksCompleted: 45,
    totalTasks: 67,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and real-time transaction monitoring",
    status: "In Review",
    priority: "Critical",
    progress: 92,
    startDate: "2024-11-01",
    dueDate: "2025-03-15",
    budget: 120000,
    spent: 108000,
    category: "Mobile App",
    tags: ["React Native", "Security", "Fintech"],
    team: [
      { name: "Emma Thompson", avatar: "/api/placeholder/32/32", role: "Mobile Lead", initials: "ET" },
      { name: "Frank Rodriguez", avatar: "/api/placeholder/32/32", role: "Security Expert", initials: "FR" },
      { name: "Grace Liu", avatar: "/api/placeholder/32/32", role: "QA Engineer", initials: "GL" }
    ],
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    icon: BarChart3,
    tasksCompleted: 58,
    totalTasks: 63,
    lastActivity: "1 hour ago"
  },
  {
    id: 3,
    title: "Brand Identity Refresh",
    description: "Complete brand identity refresh including logo design, color palette, and brand guidelines",
    status: "Planning",
    priority: "Medium",
    progress: 35,
    startDate: "2025-02-01",
    dueDate: "2025-06-30",
    budget: 45000,
    spent: 12000,
    category: "Design",
    tags: ["Branding", "Design", "Marketing"],
    team: [
      { name: "Henry Adams", avatar: "/api/placeholder/32/32", role: "Creative Director", initials: "HA" },
      { name: "Isabel Garcia", avatar: "/api/placeholder/32/32", role: "Brand Designer", initials: "IG" }
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: BarChart3,
    tasksCompleted: 12,
    totalTasks: 34,
    lastActivity: "3 hours ago"
  },
  {
    id: 4,
    title: "API Integration Platform",
    description: "Comprehensive API integration platform for third-party services and microservices architecture",
    status: "In Progress",
    priority: "High",
    progress: 65,
    startDate: "2025-01-01",
    dueDate: "2025-05-15",
    budget: 95000,
    spent: 58000,
    category: "Backend",
    tags: ["Node.js", "Microservices", "API"],
    team: [
      { name: "Jack Brown", avatar: "/api/placeholder/32/32", role: "Backend Lead", initials: "JB" },
      { name: "Kelly White", avatar: "/api/placeholder/32/32", role: "DevOps Engineer", initials: "KW" },
      { name: "Leo Zhang", avatar: "/api/placeholder/32/32", role: "API Specialist", initials: "LZ" }
    ],
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: BarChart3,
    tasksCompleted: 28,
    totalTasks: 43,
    lastActivity: "30 minutes ago"
  },
  {
    id: 5,
    title: "Data Analytics Dashboard",
    description: "Real-time data analytics dashboard with advanced visualization and reporting capabilities",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    startDate: "2024-10-01",
    dueDate: "2025-01-31",
    budget: 75000,
    spent: 73000,
    category: "Analytics",
    tags: ["Dashboard", "Analytics", "Visualization"],
    team: [
      { name: "Maya Patel", avatar: "/api/placeholder/32/32", role: "Data Scientist", initials: "MP" },
      { name: "Noah Davis", avatar: "/api/placeholder/32/32", role: "Frontend Developer", initials: "ND" }
    ],
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    icon: BarChart3,
    tasksCompleted: 52,
    totalTasks: 52,
    lastActivity: "2 days ago"
  },
  {
    id: 6,
    title: "Customer Support Portal",
    description: "Self-service customer support portal with ticketing system and knowledge base",
    status: "On Hold",
    priority: "Low",
    progress: 25,
    startDate: "2025-02-15",
    dueDate: "2025-07-31",
    budget: 55000,
    spent: 15000,
    category: "Support",
    tags: ["Portal", "Support", "Knowledge Base"],
    team: [
      { name: "Olivia Johnson", avatar: "/api/placeholder/32/32", role: "Product Manager", initials: "OJ" },
      { name: "Peter Smith", avatar: "/api/placeholder/32/32", role: "Support Lead", initials: "PS" }
    ],
    color: "bg-gradient-to-br from-gray-500 to-slate-500",
    icon: BarChart3,
    tasksCompleted: 8,
    totalTasks: 32,
    lastActivity: "1 week ago"
  }
]

const statusColors = {
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Review": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Planning": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Completed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "On Hold": "bg-gray-500/20 text-gray-400 border-gray-500/30"
}

const priorityColors = {
  "Critical": "bg-red-500/20 text-red-400 border-red-500/30",
  "High": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Medium": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Low": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status.toLowerCase().replace(' ', '-') === selectedFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage and track all your projects in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            All Projects
          </Button>
          <Button
            variant={selectedFilter === 'in-progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('in-progress')}
            className={selectedFilter === 'in-progress' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            In Progress
          </Button>
          <Button
            variant={selectedFilter === 'in-review' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('in-review')}
            className={selectedFilter === 'in-review' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            In Review
          </Button>
          <Button
            variant={selectedFilter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('completed')}
            className={selectedFilter === 'completed' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            Completed
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`border-white/20 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('list')}
            className={`border-white/20 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-[#1a1a2e] border-white/10 hover:border-white/20 transition-all duration-300 group card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center mb-4`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`${statusColors[project.status as keyof typeof statusColors]} border text-xs px-2 py-1`}>
                    {project.status}
                  </Badge>
                  <Badge className={`${priorityColors[project.priority as keyof typeof priorityColors]} border text-xs px-2 py-1`}>
                    {project.priority}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Tasks</span>
                    <span className="text-white">{project.tasksCompleted}/{project.totalTasks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Budget</span>
                    <span className="text-white">${(project.spent/1000).toFixed(0)}k / ${(project.budget/1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="w-8 h-8 border-2 border-[#1a1a2e]">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1a1a2e] flex items-center justify-center">
                        <span className="text-xs text-gray-400">+{project.team.length - 4}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{project.lastActivity}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-[#1a1a2e] border-white/10 hover:border-white/20 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-lg ${project.color} flex items-center justify-center flex-shrink-0`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    
                    <div className="grid grid-cols-5 gap-6">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Status</div>
                        <Badge className={`${statusColors[project.status as keyof typeof statusColors]} border text-xs`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Progress</div>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 flex-1" />
                          <span className="text-xs text-white">{project.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Team</div>
                        <div className="flex -space-x-1">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-6 h-6 border-2 border-[#1a1a2e]">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#1a1a2e] flex items-center justify-center">
                              <span className="text-xs text-gray-400">+{project.team.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Budget</div>
                        <div className="text-sm text-white">${(project.spent/1000).toFixed(0)}k / ${(project.budget/1000).toFixed(0)}k</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Due Date</div>
                        <div className="text-sm text-white">{new Date(project.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}