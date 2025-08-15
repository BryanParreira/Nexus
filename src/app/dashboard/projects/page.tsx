"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  Clock,
  AlertCircle,
  CheckCircle,
  Circle,
  Flag,
  Users,
  TrendingUp,
  Grid3X3,
  List,
  Eye
} from "lucide-react"

// Enhanced column data with better visual indicators
const columns = [
  {
    id: "backlog",
    title: "Backlog",
    count: 4,
    color: "bg-slate-500",
    gradient: "from-slate-500 to-slate-600",
    icon: Circle,
    description: "Ideas and future tasks"
  },
  {
    id: "todo",
    title: "To Do",
    count: 3,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    icon: Clock,
    description: "Ready to start"
  },
  {
    id: "in-progress",
    title: "In Progress",
    count: 5,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    icon: TrendingUp,
    description: "Currently working on"
  },
  {
    id: "review",
    title: "In Review",
    count: 2,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-violet-600",
    icon: Eye,
    description: "Awaiting feedback"
  },
  {
    id: "done",
    title: "Done",
    count: 8,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-600",
    icon: CheckCircle,
    description: "Completed tasks"
  }
]

const tasks = {
  backlog: [
    {
      id: "1",
      title: "User Authentication System",
      description: "Implement secure login and registration functionality with OAuth integration",
      priority: "High",
      assignees: [
        { name: "Alice Johnson", avatar: "/api/placeholder/32/32", role: "Backend Dev" },
        { name: "Bob Smith", avatar: "/api/placeholder/32/32", role: "Security" }
      ],
      dueDate: "Mar 28",
      comments: 5,
      attachments: 2,
      tags: ["Backend", "Security", "OAuth"],
      progress: 0,
      timeEstimate: "2 weeks",
      isBlocked: false,
      storyPoints: 8
    },
    {
      id: "2",
      title: "Mobile Responsive Design",
      description: "Make the dashboard responsive for mobile devices and tablets",
      priority: "Medium",
      assignees: [
        { name: "Charlie Brown", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Apr 2",
      comments: 3,
      attachments: 0,
      tags: ["Frontend", "Design", "Mobile"],
      progress: 0,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 5
    },
    {
      id: "3",
      title: "API Documentation",
      description: "Create comprehensive API documentation with interactive examples",
      priority: "Low",
      assignees: [
        { name: "Diana Prince", avatar: "/api/placeholder/32/32", role: "Tech Writer" },
        { name: "Eve Wilson", avatar: "/api/placeholder/32/32", role: "DevRel" }
      ],
      dueDate: "Apr 5",
      comments: 1,
      attachments: 1,
      tags: ["Documentation", "API"],
      progress: 0,
      timeEstimate: "3 days",
      isBlocked: false,
      storyPoints: 3
    },
    {
      id: "4",
      title: "Database Optimization",
      description: "Optimize database queries for better performance and scalability",
      priority: "High",
      assignees: [
        { name: "Frank Miller", avatar: "/api/placeholder/32/32", role: "Database Admin" }
      ],
      dueDate: "Mar 30",
      comments: 8,
      attachments: 0,
      tags: ["Backend", "Performance", "Database"],
      progress: 0,
      timeEstimate: "5 days",
      isBlocked: true,
      storyPoints: 13
    }
  ],
  todo: [
    {
      id: "5",
      title: "Payment Gateway Integration",
      description: "Integrate Stripe payment processing with webhook handling",
      priority: "High",
      assignees: [
        { name: "Grace Lee", avatar: "/api/placeholder/32/32", role: "Backend Dev" },
        { name: "Henry Davis", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Mar 25",
      comments: 12,
      attachments: 3,
      tags: ["Backend", "Payment", "Integration"],
      progress: 10,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 8
    },
    {
      id: "6",
      title: "Email Notification System",
      description: "Set up automated email notifications for user actions",
      priority: "Medium",
      assignees: [
        { name: "Iris Wang", avatar: "/api/placeholder/32/32", role: "Backend Dev" }
      ],
      dueDate: "Mar 27",
      comments: 2,
      attachments: 1,
      tags: ["Backend", "Email", "Automation"],
      progress: 0,
      timeEstimate: "3 days",
      isBlocked: false,
      storyPoints: 5
    },
    {
      id: "7",
      title: "Dark Theme Implementation",
      description: "Add dark mode toggle functionality with theme persistence",
      priority: "Low",
      assignees: [
        { name: "Jack Robinson", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Apr 1",
      comments: 4,
      attachments: 0,
      tags: ["Frontend", "UI", "Theme"],
      progress: 25,
      timeEstimate: "2 days",
      isBlocked: false,
      storyPoints: 3
    }
  ],
  "in-progress": [
    {
      id: "8",
      title: "Real-time Chat Feature",
      description: "Implement websocket-based chat system with file sharing",
      priority: "High",
      assignees: [
        { name: "Kate Wilson", avatar: "/api/placeholder/32/32", role: "Full Stack" },
        { name: "Liam Chen", avatar: "/api/placeholder/32/32", role: "Backend Dev" },
        { name: "Mia Rodriguez", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Mar 26",
      comments: 15,
      attachments: 5,
      tags: ["Backend", "Real-time", "WebSocket"],
      progress: 65,
      timeEstimate: "2 weeks",
      isBlocked: false,
      storyPoints: 13
    },
    {
      id: "9",
      title: "File Upload Component",
      description: "Create drag-and-drop file upload interface with progress tracking",
      priority: "Medium",
      assignees: [
        { name: "Noah Thompson", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Mar 29",
      comments: 7,
      attachments: 2,
      tags: ["Frontend", "Component", "Upload"],
      progress: 80,
      timeEstimate: "4 days",
      isBlocked: false,
      storyPoints: 5
    },
    {
      id: "10",
      title: "Search Functionality",
      description: "Add global search with filters and advanced querying",
      priority: "Medium",
      assignees: [
        { name: "Olivia Taylor", avatar: "/api/placeholder/32/32", role: "Frontend Dev" },
        { name: "Paul Anderson", avatar: "/api/placeholder/32/32", role: "Backend Dev" }
      ],
      dueDate: "Apr 3",
      comments: 9,
      attachments: 1,
      tags: ["Frontend", "Search", "Backend"],
      progress: 40,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 8
    },
    {
      id: "11",
      title: "Performance Monitoring",
      description: "Set up application performance monitoring and alerting",
      priority: "Low",
      assignees: [
        { name: "Quinn Martinez", avatar: "/api/placeholder/32/32", role: "DevOps" }
      ],
      dueDate: "Apr 8",
      comments: 3,
      attachments: 0,
      tags: ["DevOps", "Monitoring", "Performance"],
      progress: 20,
      timeEstimate: "3 days",
      isBlocked: false,
      storyPoints: 5
    },
    {
      id: "12",
      title: "Unit Test Coverage",
      description: "Increase test coverage to 80% across all modules",
      priority: "Medium",
      assignees: [
        { name: "Rachel Green", avatar: "/api/placeholder/32/32", role: "QA Engineer" },
        { name: "Sam Wilson", avatar: "/api/placeholder/32/32", role: "Developer" }
      ],
      dueDate: "Apr 10",
      comments: 6,
      attachments: 0,
      tags: ["Testing", "Quality", "Coverage"],
      progress: 55,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 8
    }
  ],
  review: [
    {
      id: "13",
      title: "Landing Page Redesign",
      description: "New landing page with improved conversion and modern design",
      priority: "High",
      assignees: [
        { name: "Tina Foster", avatar: "/api/placeholder/32/32", role: "Designer" },
        { name: "Uma Patel", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Mar 24",
      comments: 18,
      attachments: 8,
      tags: ["Frontend", "Design", "Marketing"],
      progress: 95,
      timeEstimate: "2 weeks",
      isBlocked: false,
      storyPoints: 13
    },
    {
      id: "14",
      title: "Security Audit",
      description: "Complete security vulnerability assessment and penetration testing",
      priority: "High",
      assignees: [
        { name: "Victor Kumar", avatar: "/api/placeholder/32/32", role: "Security Expert" }
      ],
      dueDate: "Mar 23",
      comments: 11,
      attachments: 4,
      tags: ["Security", "Audit", "Compliance"],
      progress: 90,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 8
    }
  ],
  done: [
    {
      id: "15",
      title: "User Profile Setup",
      description: "User can create and edit their profile with avatar upload",
      priority: "Medium",
      assignees: [
        { name: "Wendy Clark", avatar: "/api/placeholder/32/32", role: "Frontend Dev" }
      ],
      dueDate: "Mar 20",
      comments: 4,
      attachments: 1,
      tags: ["Frontend", "User", "Profile"],
      progress: 100,
      timeEstimate: "3 days",
      isBlocked: false,
      storyPoints: 5
    },
    {
      id: "16",
      title: "Basic Dashboard Layout",
      description: "Initial dashboard structure and navigation system",
      priority: "High",
      assignees: [
        { name: "Xander Scott", avatar: "/api/placeholder/32/32", role: "Frontend Dev" },
        { name: "Yara Ahmed", avatar: "/api/placeholder/32/32", role: "Designer" }
      ],
      dueDate: "Mar 18",
      comments: 8,
      attachments: 3,
      tags: ["Frontend", "Layout", "Navigation"],
      progress: 100,
      timeEstimate: "1 week",
      isBlocked: false,
      storyPoints: 8
    }
  ]
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "priority-high"
      case "Medium": return "priority-medium"
      case "Low": return "priority-low"
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 50) return "bg-amber-500"
    if (progress >= 25) return "bg-orange-500"
    return "bg-slate-400"
  }

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    setDraggedTask(null)
  }

  const totalTasks = Object.values(tasks).flat().length
  const completedTasks = tasks.done.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your team's projects and tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 form-input"
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

        {/* Stats and View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="glass-card px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-foreground">{completionRate}% Complete</span>
              </div>
            </div>
            <div className="glass-card px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-foreground">{totalTasks} Total Tasks</span>
              </div>
            </div>
            <div className="glass-card px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-foreground">{completedTasks} Completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("kanban")}
              className="btn-glass"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="btn-glass"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-6">
          {columns.map((column) => {
            const Icon = column.icon
            return (
              <div
                key={column.id}
                className="w-80 flex flex-col"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Enhanced Column Header */}
                <div className="kanban-column p-5 mb-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${column.gradient} shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{column.title}</h3>
                        <p className="text-xs text-muted-foreground">{column.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-medium">
                        {column.count}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar for Column */}
                  <div className="w-full bg-background/50 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full bg-gradient-to-r ${column.gradient} transition-all duration-300`}
                      style={{ 
                        width: `${column.id === 'done' ? 100 : 
                               column.id === 'review' ? 85 : 
                               column.id === 'in-progress' ? 60 : 
                               column.id === 'todo' ? 25 : 10}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Tasks Container */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {tasks[column.id as keyof typeof tasks]?.map((task) => (
                    <Card
                      key={task.id}
                      className="kanban-card group cursor-move"
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                    >
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm text-foreground leading-5 line-clamp-2 group-hover:text-primary transition-colors">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {task.isBlocked && (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-4">
                          {task.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="p-5 pt-0 space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-1 border-border/50 bg-background/50"
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
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Progress</span>
                              <span className="text-xs font-medium text-foreground">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${getProgressColor(task.progress)} transition-all duration-300`}
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Priority and Due Date */}
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </div>
                        </div>

                        {/* Story Points and Time Estimate */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="bg-muted px-2 py-1 rounded-md font-medium">
                            {task.storyPoints} pts
                          </span>
                          <span>{task.timeEstimate}</span>
                        </div>

                        {/* Assignees and Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {task.assignees.slice(0, 3).map((assignee, index) => (
                              <Avatar key={index} className="w-7 h-7 border-2 border-background ring-1 ring-border/50">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback className="text-xs font-medium">
                                  {assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {task.assignees.length > 3 && (
                              <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground">
                                  +{task.assignees.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <MessageSquare className="w-3 h-3" />
                                {task.comments}
                              </div>
                            )}
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <Paperclip className="w-3 h-3" />
                                {task.attachments}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add Task Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full h-12 border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}