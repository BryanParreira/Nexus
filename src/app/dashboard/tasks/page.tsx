// src/app/dashboard/tasks/page.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckSquare,
  Clock,
  Flag,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Implement OAuth 2.0 Authentication",
    description: "Set up secure OAuth 2.0 authentication system with multiple providers including Google, GitHub, and Microsoft",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Alice Chen", initials: "AC", avatar: "/api/placeholder/32/32", role: "Frontend Developer" },
    reporter: { name: "Bob Wilson", initials: "BW", avatar: "/api/placeholder/32/32", role: "Project Manager" },
    project: "E-commerce Platform",
    dueDate: "2025-08-20",
    estimatedHours: 16,
    actualHours: 12,
    progress: 75,
    labels: ["Backend", "Security", "Authentication"],
    comments: 8,
    attachments: 3,
    subtasks: { completed: 6, total: 8 },
    createdAt: "2025-08-10"
  },
  {
    id: 2,
    title: "Database Performance Optimization",
    description: "Optimize database queries and implement caching strategies to improve application performance",
    status: "In Review",
    priority: "Critical",
    assignee: { name: "David Kim", initials: "DK", avatar: "/api/placeholder/32/32", role: "Backend Developer" },
    reporter: { name: "Alice Chen", initials: "AC", avatar: "/api/placeholder/32/32", role: "Tech Lead" },
    project: "Mobile Banking App",
    dueDate: "2025-08-18",
    estimatedHours: 24,
    actualHours: 20,
    progress: 90,
    labels: ["Database", "Performance", "Optimization"],
    comments: 12,
    attachments: 5,
    subtasks: { completed: 9, total: 10 },
    createdAt: "2025-08-05"
  },
  {
    id: 3,
    title: "Responsive Design Implementation",
    description: "Implement responsive design for mobile and tablet devices across all application pages",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Carol Martinez", initials: "CM", avatar: "/api/placeholder/32/32", role: "UI/UX Designer" },
    reporter: { name: "Grace Liu", initials: "GL", avatar: "/api/placeholder/32/32", role: "Product Manager" },
    project: "E-commerce Platform",
    dueDate: "2025-08-25",
    estimatedHours: 32,
    actualHours: 0,
    progress: 0,
    labels: ["Frontend", "Design", "Responsive"],
    comments: 3,
    attachments: 1,
    subtasks: { completed: 0, total: 12 },
    createdAt: "2025-08-12"
  },
  {
    id: 4,
    title: "API Documentation Update",
    description: "Update API documentation with new endpoints and authentication methods",
    status: "In Progress",
    priority: "Low",
    assignee: { name: "Emma Thompson", initials: "ET", avatar: "/api/placeholder/32/32", role: "Technical Writer" },
    reporter: { name: "Frank Rodriguez", initials: "FR", avatar: "/api/placeholder/32/32", role: "API Lead" },
    project: "API Integration Platform",
    dueDate: "2025-08-30",
    estimatedHours: 8,
    actualHours: 3,
    progress: 40,
    labels: ["Documentation", "API"],
    comments: 5,
    attachments: 2,
    subtasks: { completed: 2, total: 5 },
    createdAt: "2025-08-14"
  },
  {
    id: 5,
    title: "User Testing Session Setup",
    description: "Organize and conduct user testing sessions for the new dashboard interface",
    status: "Completed",
    priority: "Medium",
    assignee: { name: "Henry Adams", initials: "HA", avatar: "/api/placeholder/32/32", role: "UX Researcher" },
    reporter: { name: "Isabel Garcia", initials: "IG", avatar: "/api/placeholder/32/32", role: "Product Manager" },
    project: "Data Analytics Dashboard",
    dueDate: "2025-08-12",
    estimatedHours: 12,
    actualHours: 10,
    progress: 100,
    labels: ["Testing", "UX", "Research"],
    comments: 15,
    attachments: 8,
    subtasks: { completed: 6, total: 6 },
    createdAt: "2025-08-01"
  },
  {
    id: 6,
    title: "Security Audit Implementation",
    description: "Implement security recommendations from the recent audit including input validation and CSRF protection",
    status: "To Do",
    priority: "Critical",
    assignee: { name: "Jack Brown", initials: "JB", avatar: "/api/placeholder/32/32", role: "Security Engineer" },
    reporter: { name: "Kelly White", initials: "KW", avatar: "/api/placeholder/32/32", role: "Security Lead" },
    project: "Mobile Banking App",
    dueDate: "2025-08-22",
    estimatedHours: 40,
    actualHours: 0,
    progress: 0,
    labels: ["Security", "Audit", "Critical"],
    comments: 2,
    attachments: 4,
    subtasks: { completed: 0, total: 15 },
    createdAt: "2025-08-15"
  }
]

const statusColors = {
  "To Do": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Review": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Completed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
}

const priorityColors = {
  "Critical": "bg-red-500/20 text-red-400 border-red-500/30",
  "High": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Medium": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Low": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
}

export default function TasksPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status.toLowerCase().replace(' ', '-') === selectedFilter)

  const tasksByStatus = {
    "To Do": tasks.filter(task => task.status === "To Do"),
    "In Progress": tasks.filter(task => task.status === "In Progress"),
    "In Review": tasks.filter(task => task.status === "In Review"),
    "Completed": tasks.filter(task => task.status === "Completed")
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.status === "Completed").length
    const inProgress = tasks.filter(task => task.status === "In Progress").length
    const overdue = tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== "Completed").length
    
    return { total, completed, inProgress, overdue }
  }

  const stats = getTaskStats()

  const formatTimeSpent = (hours: number) => {
    if (hours === 0) return "0h"
    return `${hours}h`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-gray-400 mt-1">Track and manage your team's tasks and deliverables</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CheckSquare className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Flag className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Overdue</p>
                <p className="text-2xl font-bold text-white">{stats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            All Tasks
          </Button>
          <Button
            variant={selectedFilter === 'to-do' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('to-do')}
            className={selectedFilter === 'to-do' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            To Do
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
            variant={selectedFilter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('completed')}
            className={selectedFilter === 'completed' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            Completed
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  status === "To Do" ? "bg-gray-500" :
                  status === "In Progress" ? "bg-blue-500" :
                  status === "In Review" ? "bg-purple-500" :
                  "bg-emerald-500"
                }`}></div>
                {status}
                <Badge variant="outline" className="border-white/20 text-gray-400 text-xs">
                  {statusTasks.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {statusTasks.map((task) => (
                <Card key={task.id} className="bg-[#1a1a2e] border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-white text-sm leading-tight group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h4>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`${priorityColors[task.priority as keyof typeof priorityColors]} border text-xs px-2 py-1`}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-gray-400 text-xs">
                        {task.project}
                      </Badge>
                    </div>
                    
                    {task.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{task.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{task.attachments}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-gray-400">
                        {task.subtasks.completed}/{task.subtasks.total} subtasks
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {task.labels.slice(0, 2).map((label, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/10 text-gray-300 text-xs px-2 py-0">
                          {label}
                        </Badge>
                      ))}
                      {task.labels.length > 2 && (
                        <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs px-2 py-0">
                          +{task.labels.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}