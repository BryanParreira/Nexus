"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  AlertCircle,
  Kanban,
  List,
  Grid3X3,
  Flag,
  TrendingUp,
  Users,
  Eye,
  Edit,
  Trash2,
  Star,
  MessageSquare,
  Paperclip,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from "lucide-react"

// Enhanced mock tasks data
const allTasks = [
  {
    id: "1",
    title: "User Authentication System",
    description: "Implement secure login and registration functionality with OAuth integration and two-factor authentication",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Alice Johnson", avatar: "/api/placeholder/32/32", email: "alice@company.com", role: "Backend Dev" },
    project: "Website Redesign",
    dueDate: "2025-03-28",
    createdAt: "2025-03-15",
    completed: false,
    progress: 60,
    tags: ["Backend", "Security", "OAuth"],
    subtasks: 5,
    completedSubtasks: 3,
    timeEstimate: "2 weeks",
    storyPoints: 8,
    comments: 12,
    attachments: 3,
    isBlocked: false,
    isStarred: true
  },
  {
    id: "2",
    title: "Mobile Responsive Design",
    description: "Make the dashboard responsive for mobile devices and tablets with touch-friendly interactions",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Bob Smith", avatar: "/api/placeholder/32/32", email: "bob@company.com", role: "Frontend Dev" },
    project: "Mobile App",
    dueDate: "2025-04-02",
    createdAt: "2025-03-16",
    completed: false,
    progress: 0,
    tags: ["Frontend", "Design", "Mobile"],
    subtasks: 3,
    completedSubtasks: 0,
    timeEstimate: "1 week",
    storyPoints: 5,
    comments: 4,
    attachments: 2,
    isBlocked: false,
    isStarred: false
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Create comprehensive API documentation with interactive examples and code samples",
    status: "Done",
    priority: "Low",
    assignee: { name: "Charlie Brown", avatar: "/api/placeholder/32/32", email: "charlie@company.com", role: "Tech Writer" },
    project: "Documentation",
    dueDate: "2025-03-20",
    createdAt: "2025-03-10",
    completed: true,
    progress: 100,
    tags: ["Documentation", "API"],
    subtasks: 8,
    completedSubtasks: 8,
    timeEstimate: "3 days",
    storyPoints: 3,
    comments: 6,
    attachments: 5,
    isBlocked: false,
    isStarred: false
  },
  {
    id: "4",
    title: "Database Optimization",
    description: "Optimize database queries for better performance and implement proper indexing strategies",
    status: "In Review",
    priority: "High",
    assignee: { name: "Diana Prince", avatar: "/api/placeholder/32/32", email: "diana@company.com", role: "Database Admin" },
    project: "Backend System",
    dueDate: "2025-03-30",
    createdAt: "2025-03-12",
    completed: false,
    progress: 85,
    tags: ["Backend", "Performance", "Database"],
    subtasks: 4,
    completedSubtasks: 3,
    timeEstimate: "5 days",
    storyPoints: 13,
    comments: 8,
    attachments: 1,
    isBlocked: true,
    isStarred: true
  },
  {
    id: "5",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment processing with webhook handling and subscription management",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Eve Wilson", avatar: "/api/placeholder/32/32", email: "eve@company.com", role: "Full Stack Dev" },
    project: "E-commerce",
    dueDate: "2025-03-25",
    createdAt: "2025-03-14",
    completed: false,
    progress: 40,
    tags: ["Backend", "Payment", "Integration"],
    subtasks: 6,
    completedSubtasks: 2,
    timeEstimate: "1 week",
    storyPoints: 8,
    comments: 15,
    attachments: 4,
    isBlocked: false,
    isStarred: false
  },
  {
    id: "6",
    title: "Email Notification System",
    description: "Set up automated email notifications for user actions and system events",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Frank Miller", avatar: "/api/placeholder/32/32", email: "frank@company.com", role: "Backend Dev" },
    project: "Communication",
    dueDate: "2025-03-27",
    createdAt: "2025-03-17",
    completed: false,
    progress: 10,
    tags: ["Backend", "Email", "Automation"],
    subtasks: 4,
    completedSubtasks: 0,
    timeEstimate: "3 days",
    storyPoints: 5,
    comments: 2,
    attachments: 0,
    isBlocked: false,
    isStarred: false
  },
  {
    id: "7",
    title: "Dark Theme Implementation",
    description: "Add dark mode toggle functionality with theme persistence and smooth transitions",
    status: "Done",
    priority: "Low",
    assignee: { name: "Grace Lee", avatar: "/api/placeholder/32/32", email: "grace@company.com", role: "Frontend Dev" },
    project: "UI/UX",
    dueDate: "2025-03-22",
    createdAt: "2025-03-11",
    completed: true,
    progress: 100,
    tags: ["Frontend", "UI", "Theme"],
    subtasks: 3,
    completedSubtasks: 3,
    timeEstimate: "2 days",
    storyPoints: 3,
    comments: 7,
    attachments: 0,
    isBlocked: false,
    isStarred: true
  },
  {
    id: "8",
    title: "Real-time Chat Feature",
    description: "Implement websocket-based chat system with file sharing and emoji support",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Henry Davis", avatar: "/api/placeholder/32/32", email: "henry@company.com", role: "Full Stack Dev" },
    project: "Communication",
    dueDate: "2025-03-26",
    createdAt: "2025-03-13",
    completed: false,
    progress: 75,
    tags: ["Backend", "Real-time", "WebSocket"],
    subtasks: 7,
    completedSubtasks: 5,
    timeEstimate: "2 weeks",
    storyPoints: 13,
    comments: 20,
    attachments: 6,
    isBlocked: false,
    isStarred: true
  }
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"list" | "grid" | "kanban">("list")
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showCompleted, setShowCompleted] = useState(true)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "priority-high"
      case "Medium": return "priority-medium"
      case "Low": return "priority-low"
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-slate-500/15 text-slate-400 border-slate-500/30"
      case "In Progress": return "bg-blue-500/15 text-blue-400 border-blue-500/30"
      case "In Review": return "bg-purple-500/15 text-purple-400 border-purple-500/30"
      case "Done": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      default: return "bg-slate-500/15 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done": return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      case "In Progress": return <Clock className="w-4 h-4 text-blue-400" />
      case "In Review": return <Eye className="w-4 h-4 text-purple-400" />
      default: return <Circle className="w-4 h-4 text-slate-400" />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High": return <ArrowUp className="w-3 h-3" />
      case "Medium": return <ArrowRight className="w-3 h-3" />
      case "Low": return <ArrowDown className="w-3 h-3" />
      default: return <ArrowRight className="w-3 h-3" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 50) return "bg-amber-500"
    if (progress >= 25) return "bg-orange-500"
    return "bg-slate-400"
  }

  const filteredTasks = allTasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All" || task.status === statusFilter
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter
      const matchesCompleted = showCompleted || !task.completed
      return matchesSearch && matchesStatus && matchesPriority && matchesCompleted
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]
      
      if (sortBy === "dueDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const selectAllTasks = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id))
    }
  }

  const toggleStarred = (taskId: string) => {
    // In a real app, this would update the backend
    console.log("Toggle starred:", taskId)
  }

  const taskStats = {
    total: allTasks.length,
    todo: allTasks.filter(t => t.status === "To Do").length,
    inProgress: allTasks.filter(t => t.status === "In Progress").length,
    inReview: allTasks.filter(t => t.status === "In Review").length,
    done: allTasks.filter(t => t.status === "Done").length,
    overdue: allTasks.filter(t => getDaysUntilDue(t.dueDate) < 0 && !t.completed).length,
    blocked: allTasks.filter(t => t.isBlocked).length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your tasks efficiently</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks, assignees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-72 form-input"
            />
          </div>
          <Button variant="outline" size="sm" className="btn-glass">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="btn-modern">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <List className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-500/10 rounded-xl">
                <Circle className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.todo}</p>
                <p className="text-xs text-muted-foreground">To Do</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.inReview}</p>
                <p className="text-xs text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.done}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-modern">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{taskStats.overdue}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-input text-foreground text-sm form-input"
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Priority:</label>
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-input text-foreground text-sm form-input"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-input text-foreground text-sm form-input"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="progress">Progress</option>
              <option value="title">Title</option>
            </select>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="btn-glass"
          >
            {sortOrder === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="showCompleted" className="text-sm text-foreground">
              Show completed
            </label>
          </div>
          
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="btn-glass"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="btn-glass"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
              className="btn-glass"
            >
              <Kanban className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Tasks List */}
      <Card className="card-modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">
              All Tasks ({filteredTasks.length})
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAllTasks}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {selectedTasks.length === filteredTasks.length && filteredTasks.length > 0 ? 
                  "Deselect All" : "Select All"}
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedTasks.length} selected
              </span>
              {selectedTasks.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="btn-glass">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="btn-glass">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filteredTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate)
              const isOverdue = daysUntilDue < 0 && !task.completed
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0 && !task.completed
              const isSelected = selectedTasks.includes(task.id)
              
              return (
                <div
                  key={task.id}
                  className={`p-6 hover:bg-accent/20 transition-all duration-200 cursor-pointer group ${
                    isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  } ${task.isBlocked ? 'bg-red-500/5' : ''}`}
                  onClick={() => setSelectedTask(task.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Enhanced Selection */}
                    <div 
                      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                        isSelected 
                          ? 'bg-primary border-primary' 
                          : 'border-border hover:border-primary'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTaskSelection(task.id)
                      }}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-semibold text-foreground ${task.completed ? 'line-through opacity-60' : ''}`}>
                              {task.title}
                            </h3>
                            {task.isStarred && (
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                            )}
                            {task.isBlocked && (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {task.description}
                          </p>
                          
                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {task.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs px-2 py-1 border-border/50 bg-background/50 hover:bg-accent/20 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs px-2 py-1">
                                +{task.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Progress Bar */}
                          {task.progress > 0 && (
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-foreground">
                                {task.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced Right Side */}
                        <div className="flex items-center gap-4 ml-6">
                          {/* Priority with Icon */}
                          <Badge className={`text-xs font-semibold flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </Badge>
                          
                          {/* Status */}
                          <Badge className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                          
                          {/* Enhanced Assignee */}
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs font-medium">
                                {task.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="hidden sm:block">
                              <p className="text-sm font-medium text-foreground">{task.assignee.name}</p>
                              <p className="text-xs text-muted-foreground">{task.assignee.role}</p>
                            </div>
                          </div>
                          
                          {/* Enhanced Due Date */}
                          <div className={`flex items-center gap-1 text-xs font-medium ${
                            isOverdue ? 'text-red-400' : 
                            isDueSoon ? 'text-amber-400' : 
                            'text-muted-foreground'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            <span>
                              {isOverdue ? `${Math.abs(daysUntilDue)}d overdue` :
                               isDueSoon ? `${daysUntilDue}d left` :
                               new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          
                          {/* Story Points */}
                          <div className="hidden lg:block">
                            <Badge variant="outline" className="text-xs font-medium">
                              {task.storyPoints} pts
                            </Badge>
                          </div>
                          
                          {/* Comments & Attachments */}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                                <MessageSquare className="w-3 h-3" />
                                {task.comments}
                              </div>
                            )}
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                                <Paperclip className="w-3 h-3" />
                                {task.attachments}
                              </div>
                            )}
                          </div>
                          
                          {/* Subtasks Progress */}
                          <div className="text-xs text-muted-foreground hidden xl:flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{task.completedSubtasks}/{task.subtasks}</span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleStarred(task.id)
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Star className={`w-4 h-4 ${task.isStarred ? 'text-amber-400 fill-current' : 'text-muted-foreground'}`} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {filteredTasks.length === 0 && (
              <div className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-muted/50 rounded-full">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">No tasks found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                  <Button size="sm" className="btn-modern">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Task Details Sidebar */}
      {selectedTask && (
        <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border/50 shadow-2xl transform transition-transform duration-300 ease-out z-50">
          {(() => {
            const task = allTasks.find(t => t.id === selectedTask)
            if (!task) return null
            
            return (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Task Details</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedTask(null)}
                      className="h-8 w-8 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        {task.priority}
                      </Badge>
                      <Badge className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Project:</span>
                        <p className="font-medium text-foreground">{task.project}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium text-foreground">{task.dueDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Story Points:</span>
                        <p className="font-medium text-foreground">{task.storyPoints}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Estimate:</span>
                        <p className="font-medium text-foreground">{task.timeEstimate}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium text-foreground">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Assignee</span>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback>
                            {task.assignee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{task.assignee.name}</p>
                          <p className="text-xs text-muted-foreground">{task.assignee.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <MessageSquare className="w-4 h-4 text-blue-400" />
                          <span className="text-foreground">{task.comments} comments</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Paperclip className="w-4 h-4 text-green-400" />
                          <span className="text-foreground">{task.attachments} attachments</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-purple-400" />
                          <span className="text-foreground">{task.completedSubtasks}/{task.subtasks} subtasks completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full btn-modern">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Task
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="btn-glass">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                        <Button variant="outline" size="sm" className="btn-glass">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}