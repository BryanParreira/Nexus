"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
  Grid3X3
} from "lucide-react"

// Mock tasks data
const allTasks = [
  {
    id: "1",
    title: "User Authentication System",
    description: "Implement secure login and registration functionality",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Alice Johnson", avatar: "/api/placeholder/32/32", email: "alice@company.com" },
    project: "Website Redesign",
    dueDate: "2025-03-28",
    createdAt: "2025-03-15",
    completed: false,
    progress: 60,
    tags: ["Backend", "Security"],
    subtasks: 5,
    completedSubtasks: 3
  },
  {
    id: "2",
    title: "Mobile Responsive Design",
    description: "Make the dashboard responsive for mobile devices",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Bob Smith", avatar: "/api/placeholder/32/32", email: "bob@company.com" },
    project: "Mobile App",
    dueDate: "2025-04-02",
    createdAt: "2025-03-16",
    completed: false,
    progress: 0,
    tags: ["Frontend", "Design"],
    subtasks: 3,
    completedSubtasks: 0
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Create comprehensive API documentation",
    status: "Done",
    priority: "Low",
    assignee: { name: "Charlie Brown", avatar: "/api/placeholder/32/32", email: "charlie@company.com" },
    project: "Documentation",
    dueDate: "2025-03-20",
    createdAt: "2025-03-10",
    completed: true,
    progress: 100,
    tags: ["Documentation"],
    subtasks: 8,
    completedSubtasks: 8
  },
  {
    id: "4",
    title: "Database Optimization",
    description: "Optimize database queries for better performance",
    status: "In Review",
    priority: "High",
    assignee: { name: "Diana Prince", avatar: "/api/placeholder/32/32", email: "diana@company.com" },
    project: "Backend System",
    dueDate: "2025-03-30",
    createdAt: "2025-03-12",
    completed: false,
    progress: 85,
    tags: ["Backend", "Performance"],
    subtasks: 4,
    completedSubtasks: 3
  },
  {
    id: "5",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment processing",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Eve Wilson", avatar: "/api/placeholder/32/32", email: "eve@company.com" },
    project: "E-commerce",
    dueDate: "2025-03-25",
    createdAt: "2025-03-14",
    completed: false,
    progress: 40,
    tags: ["Backend", "Payment"],
    subtasks: 6,
    completedSubtasks: 2
  },
  {
    id: "6",
    title: "Email Notification System",
    description: "Set up automated email notifications",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Frank Miller", avatar: "/api/placeholder/32/32", email: "frank@company.com" },
    project: "Communication",
    dueDate: "2025-03-27",
    createdAt: "2025-03-17",
    completed: false,
    progress: 10,
    tags: ["Backend", "Email"],
    subtasks: 4,
    completedSubtasks: 0
  },
  {
    id: "7",
    title: "Dark Theme Implementation",
    description: "Add dark mode toggle functionality",
    status: "Done",
    priority: "Low",
    assignee: { name: "Grace Lee", avatar: "/api/placeholder/32/32", email: "grace@company.com" },
    project: "UI/UX",
    dueDate: "2025-03-22",
    createdAt: "2025-03-11",
    completed: true,
    progress: 100,
    tags: ["Frontend", "UI"],
    subtasks: 3,
    completedSubtasks: 3
  },
  {
    id: "8",
    title: "Real-time Chat Feature",
    description: "Implement websocket-based chat system",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Henry Davis", avatar: "/api/placeholder/32/32", email: "henry@company.com" },
    project: "Communication",
    dueDate: "2025-03-26",
    createdAt: "2025-03-13",
    completed: false,
    progress: 75,
    tags: ["Backend", "Real-time"],
    subtasks: 7,
    completedSubtasks: 5
  }
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"list" | "grid" | "kanban">("list")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Low": return "bg-green-500/10 text-green-400 border-green-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      case "In Progress": return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "In Review": return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "Done": return "bg-green-500/10 text-green-400 border-green-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done": return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case "In Progress": return <Clock className="w-4 h-4 text-blue-400" />
      case "In Review": return <AlertCircle className="w-4 h-4 text-purple-400" />
      default: return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || task.status === statusFilter
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 rounded-md border border-border bg-background text-foreground text-sm"
            >
              <option value="All">All</option>
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
              className="px-3 py-1 rounded-md border border-border bg-background text-foreground text-sm"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <Kanban className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tasks Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Circle className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allTasks.filter(t => t.status === "To Do").length}
                </p>
                <p className="text-sm text-muted-foreground">To Do</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allTasks.filter(t => t.status === "In Progress").length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allTasks.filter(t => t.status === "In Review").length}
                </p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allTasks.filter(t => t.status === "Done").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">
              All Tasks ({filteredTasks.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                onCheckedChange={selectAllTasks}
              />
              <span className="text-sm text-muted-foreground">
                {selectedTasks.length} selected
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filteredTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0
              
              return (
                <div
                  key={task.id}
                  className="p-4 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                    />
                    
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium text-foreground ${task.completed ? 'line-through opacity-60' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs px-2 py-0.5 border-border/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 ml-4">
                          {/* Priority */}
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          
                          {/* Status */}
                          <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                          
                          {/* Assignee */}
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-foreground hidden sm:block">
                              {task.assignee.name}
                            </span>
                          </div>
                          
                          {/* Due Date */}
                          <div className={`flex items-center gap-1 text-xs ${
                            isOverdue ? 'text-red-400' : 
                            isDueSoon ? 'text-yellow-400' : 
                            'text-muted-foreground'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            <span>
                              {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` :
                               isDueSoon ? `${daysUntilDue} days left` :
                               task.dueDate}
                            </span>
                          </div>
                          
                          {/* Progress */}
                          <div className="w-24 hidden lg:block">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-muted-foreground w-8">
                                {task.progress}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Subtasks */}
                          <div className="text-xs text-muted-foreground hidden xl:block">
                            {task.completedSubtasks}/{task.subtasks}
                          </div>
                          
                          {/* Actions */}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}