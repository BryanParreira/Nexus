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
  Clock
} from "lucide-react"

// Mock data for projects
const columns = [
  {
    id: "backlog",
    title: "Backlog",
    count: 4,
    color: "bg-gray-500"
  },
  {
    id: "todo",
    title: "To Do",
    count: 3,
    color: "bg-blue-500"
  },
  {
    id: "in-progress",
    title: "In Progress",
    count: 5,
    color: "bg-yellow-500"
  },
  {
    id: "review",
    title: "In Review",
    count: 2,
    color: "bg-purple-500"
  },
  {
    id: "done",
    title: "Done",
    count: 8,
    color: "bg-green-500"
  }
]

const tasks = {
  backlog: [
    {
      id: "1",
      title: "User Authentication System",
      description: "Implement secure login and registration functionality",
      priority: "High",
      assignees: [
        { name: "Alice", avatar: "/api/placeholder/32/32" },
        { name: "Bob", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 28",
      comments: 5,
      attachments: 2,
      tags: ["Backend", "Security"]
    },
    {
      id: "2",
      title: "Mobile Responsive Design",
      description: "Make the dashboard responsive for mobile devices",
      priority: "Medium",
      assignees: [
        { name: "Charlie", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 2",
      comments: 3,
      attachments: 0,
      tags: ["Frontend", "Design"]
    },
    {
      id: "3",
      title: "API Documentation",
      description: "Create comprehensive API documentation",
      priority: "Low",
      assignees: [
        { name: "Diana", avatar: "/api/placeholder/32/32" },
        { name: "Eve", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 5",
      comments: 1,
      attachments: 1,
      tags: ["Documentation"]
    },
    {
      id: "4",
      title: "Database Optimization",
      description: "Optimize database queries for better performance",
      priority: "High",
      assignees: [
        { name: "Frank", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 30",
      comments: 8,
      attachments: 0,
      tags: ["Backend", "Performance"]
    }
  ],
  todo: [
    {
      id: "5",
      title: "Payment Gateway Integration",
      description: "Integrate Stripe payment processing",
      priority: "High",
      assignees: [
        { name: "Grace", avatar: "/api/placeholder/32/32" },
        { name: "Henry", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 25",
      comments: 12,
      attachments: 3,
      tags: ["Backend", "Payment"]
    },
    {
      id: "6",
      title: "Email Notification System",
      description: "Set up automated email notifications",
      priority: "Medium",
      assignees: [
        { name: "Iris", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 27",
      comments: 2,
      attachments: 1,
      tags: ["Backend", "Email"]
    },
    {
      id: "7",
      title: "Dark Theme Implementation",
      description: "Add dark mode toggle functionality",
      priority: "Low",
      assignees: [
        { name: "Jack", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 1",
      comments: 4,
      attachments: 0,
      tags: ["Frontend", "UI"]
    }
  ],
  "in-progress": [
    {
      id: "8",
      title: "Real-time Chat Feature",
      description: "Implement websocket-based chat system",
      priority: "High",
      assignees: [
        { name: "Kate", avatar: "/api/placeholder/32/32" },
        { name: "Liam", avatar: "/api/placeholder/32/32" },
        { name: "Mia", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 26",
      comments: 15,
      attachments: 5,
      tags: ["Backend", "Real-time"]
    },
    {
      id: "9",
      title: "File Upload Component",
      description: "Create drag-and-drop file upload interface",
      priority: "Medium",
      assignees: [
        { name: "Noah", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 29",
      comments: 7,
      attachments: 2,
      tags: ["Frontend", "Component"]
    },
    {
      id: "10",
      title: "Search Functionality",
      description: "Add global search with filters",
      priority: "Medium",
      assignees: [
        { name: "Olivia", avatar: "/api/placeholder/32/32" },
        { name: "Paul", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 3",
      comments: 9,
      attachments: 1,
      tags: ["Frontend", "Search"]
    },
    {
      id: "11",
      title: "Performance Monitoring",
      description: "Set up application performance monitoring",
      priority: "Low",
      assignees: [
        { name: "Quinn", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 8",
      comments: 3,
      attachments: 0,
      tags: ["DevOps", "Monitoring"]
    },
    {
      id: "12",
      title: "Unit Test Coverage",
      description: "Increase test coverage to 80%",
      priority: "Medium",
      assignees: [
        { name: "Rachel", avatar: "/api/placeholder/32/32" },
        { name: "Sam", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Apr 10",
      comments: 6,
      attachments: 0,
      tags: ["Testing", "Quality"]
    }
  ],
  review: [
    {
      id: "13",
      title: "Landing Page Redesign",
      description: "New landing page with improved conversion",
      priority: "High",
      assignees: [
        { name: "Tina", avatar: "/api/placeholder/32/32" },
        { name: "Uma", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 24",
      comments: 18,
      attachments: 8,
      tags: ["Frontend", "Design", "Marketing"]
    },
    {
      id: "14",
      title: "Security Audit",
      description: "Complete security vulnerability assessment",
      priority: "High",
      assignees: [
        { name: "Victor", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 23",
      comments: 11,
      attachments: 4,
      tags: ["Security", "Audit"]
    }
  ],
  done: [
    {
      id: "15",
      title: "User Profile Setup",
      description: "User can create and edit their profile",
      priority: "Medium",
      assignees: [
        { name: "Wendy", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 20",
      comments: 4,
      attachments: 1,
      tags: ["Frontend", "User"]
    },
    {
      id: "16",
      title: "Basic Dashboard Layout",
      description: "Initial dashboard structure and navigation",
      priority: "High",
      assignees: [
        { name: "Xander", avatar: "/api/placeholder/32/32" },
        { name: "Yara", avatar: "/api/placeholder/32/32" }
      ],
      dueDate: "Mar 18",
      comments: 8,
      attachments: 3,
      tags: ["Frontend", "Layout"]
    }
  ]
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Low": return "bg-green-500/10 text-green-400 border-green-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    // Here you would implement the logic to move the task
    setDraggedTask(null)
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-80 flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between p-4 bg-card rounded-t-lg border border-b-0 border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-medium text-foreground">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {column.count}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Tasks Container */}
              <div className="flex-1 p-4 bg-card/30 border border-t-0 border-border/50 rounded-b-lg overflow-y-auto">
                <div className="space-y-3">
                  {tasks[column.id as keyof typeof tasks]?.map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-move hover:shadow-lg transition-all duration-200 border-border/50 bg-background/80 backdrop-blur-sm"
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                    >
                      <CardHeader className="p-4 pb-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm text-foreground line-clamp-2">
                            {task.title}
                          </h4>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {task.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="p-4 pt-0">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
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

                        {/* Priority */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </div>
                        </div>

                        {/* Assignees and Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {task.assignees.slice(0, 3).map((assignee, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback className="text-xs">
                                  {assignee.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {task.assignees.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">
                                  +{task.assignees.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MessageSquare className="w-3 h-3" />
                                {task.comments}
                              </div>
                            )}
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Paperclip className="w-3 h-3" />
                                {task.attachments}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}