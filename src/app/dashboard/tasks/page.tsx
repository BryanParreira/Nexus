// src/app/dashboard/tasks/page.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  SortAsc,
  Calendar,
  Clock,
  Flag,
  User,
  CheckCircle,
  Circle,
  Star,
  MessageSquare,
  Paperclip,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Timer,
  Target,
  Zap,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  RotateCcw
} from 'lucide-react'

const taskColumns = [
  {
    id: 'todo',
    title: 'To Do',
    count: 8,
    color: 'bg-gray-500',
    tasks: [
      {
        id: 1,
        title: "Design user authentication flow",
        description: "Create wireframes and mockups for the login and registration process",
        priority: "High",
        status: "todo",
        assignee: { name: "Alice Johnson", initials: "AJ", avatar: "/api/placeholder/32/32" },
        project: "E-Commerce Platform",
        dueDate: "2024-12-25",
        timeTracked: "2h 30m",
        timeEstimate: "8h",
        tags: ["UI/UX", "Authentication"],
        comments: 3,
        attachments: 2,
        subtasks: { completed: 0, total: 3 },
        createdAt: "2024-12-20"
      },
      {
        id: 2,
        title: "API integration for payment gateway",
        description: "Integrate Stripe payment processing into the checkout flow",
        priority: "Critical",
        status: "todo",
        assignee: { name: "Bob Smith", initials: "BS", avatar: "/api/placeholder/32/32" },
        project: "E-Commerce Platform",
        dueDate: "2024-12-22",
        timeTracked: "0h",
        timeEstimate: "12h",
        tags: ["Backend", "Payment"],
        comments: 1,
        attachments: 0,
        subtasks: { completed: 0, total: 5 },
        createdAt: "2024-12-21"
      },
      {
        id: 3,
        title: "Database optimization",
        description: "Optimize database queries for better performance",
        priority: "Medium",
        status: "todo",
        assignee: { name: "Carol Davis", initials: "CD", avatar: "/api/placeholder/32/32" },
        project: "Analytics Dashboard",
        dueDate: "2024-12-28",
        timeTracked: "1h 15m",
        timeEstimate: "6h",
        tags: ["Database", "Performance"],
        comments: 0,
        attachments: 1,
        subtasks: { completed: 1, total: 4 },
        createdAt: "2024-12-19"
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    count: 5,
    color: 'bg-blue-500',
    tasks: [
      {
        id: 4,
        title: "Mobile app responsive design",
        description: "Ensure the app works properly on all mobile devices",
        priority: "High",
        status: "inprogress",
        assignee: { name: "David Wilson", initials: "DW", avatar: "/api/placeholder/32/32" },
        project: "Mobile App",
        dueDate: "2024-12-26",
        timeTracked: "4h 45m",
        timeEstimate: "10h",
        tags: ["Mobile", "Responsive"],
        comments: 5,
        attachments: 3,
        subtasks: { completed: 3, total: 6 },
        createdAt: "2024-12-18"
      },
      {
        id: 5,
        title: "User testing preparation",
        description: "Prepare test scenarios and recruit test participants",
        priority: "Medium",
        status: "inprogress",
        assignee: { name: "Eve Brown", initials: "EB", avatar: "/api/placeholder/32/32" },
        project: "Brand Identity",
        dueDate: "2024-12-24",
        timeTracked: "2h 20m",
        timeEstimate: "5h",
        tags: ["Testing", "UX"],
        comments: 2,
        attachments: 1,
        subtasks: { completed: 2, total: 3 },
        createdAt: "2024-12-20"
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    count: 3,
    color: 'bg-amber-500',
    tasks: [
      {
        id: 6,
        title: "Code review for new features",
        description: "Review pull requests and provide feedback",
        priority: "High",
        status: "review",
        assignee: { name: "Frank Miller", initials: "FM", avatar: "/api/placeholder/32/32" },
        project: "E-Commerce Platform",
        dueDate: "2024-12-23",
        timeTracked: "1h 30m",
        timeEstimate: "3h",
        tags: ["Code Review", "Quality"],
        comments: 8,
        attachments: 0,
        subtasks: { completed: 4, total: 4 },
        createdAt: "2024-12-21"
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    count: 12,
    color: 'bg-emerald-500',
    tasks: [
      {
        id: 7,
        title: "Landing page optimization",
        description: "Improve loading speed and SEO optimization",
        priority: "Medium",
        status: "done",
        assignee: { name: "Grace Lee", initials: "GL", avatar: "/api/placeholder/32/32" },
        project: "Marketing Website",
        dueDate: "2024-12-20",
        timeTracked: "6h 15m",
        timeEstimate: "6h",
        tags: ["SEO", "Performance"],
        comments: 4,
        attachments: 2,
        subtasks: { completed: 5, total: 5 },
        createdAt: "2024-12-15",
        completedAt: "2024-12-20"
      }
    ]
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "priority-critical"
    case "High": return "priority-high"
    case "Medium": return "priority-medium" 
    case "Low": return "priority-low"
    default: return "priority-medium"
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "Critical": return AlertTriangle
    case "High": return Flag
    case "Medium": return Circle
    case "Low": return Target
    default: return Circle
  }
}

interface Task {
  id: number
  title: string
  description: string
  priority: string
  status: string
  assignee: {
    name: string
    initials: string
    avatar: string
  }
  project: string
  dueDate: string
  timeTracked: string
  timeEstimate: string
  tags: string[]
  comments: number
  attachments: number
  subtasks: {
    completed: number
    total: number
  }
  createdAt: string
  completedAt?: string
}

const TaskCard = ({ task }: { task: Task }) => {
  const [isCompleted, setIsCompleted] = useState(task.status === 'done')
  const PriorityIcon = getPriorityIcon(task.priority)
  const progressPercent = (task.subtasks.completed / task.subtasks.total) * 100

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'
  const isDueSoon = new Date(task.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) && task.status !== 'done'

  const handleCheckedChange = (checked: boolean) => {
    setIsCompleted(checked)
  }

  return (
    <Card className="kanban-card p-4 mb-3 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox 
              checked={isCompleted}
              onCheckedChange={handleCheckedChange}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1 group-hover:text-blue-300 transition-colors">
                {task.title}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Priority and Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={getPriorityColor(task.priority)}>
            <PriorityIcon className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
          {task.tags.slice(0, 2).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 2 && (
            <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
              +{task.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Progress */}
        {task.subtasks.total > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Progress</span>
              <span className="text-white font-medium">{task.subtasks.completed}/{task.subtasks.total}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Time Tracking */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-400">
            <Timer className="w-3 h-3" />
            <span>{task.timeTracked}</span>
            <span className="text-gray-500">/</span>
            <span>{task.timeEstimate}</span>
          </div>
          <div className={`flex items-center gap-1 ${
            isOverdue ? 'text-red-400' : isDueSoon ? 'text-amber-400' : 'text-gray-400'
          }`}>
            <Calendar className="w-3 h-3" />
            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                {task.assignee.initials}
              </AvatarFallback>
            </Avatar>
            <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
              {task.project}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            {task.comments > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>{task.comments}</span>
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <Paperclip className="w-3 h-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("kanban") // kanban or list

  const totalTasks = taskColumns.reduce((sum, column) => sum + column.count, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Task Management</h1>
          <p className="text-gray-400 text-lg">Organize and track your team's work efficiently</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            View Options
          </Button>
          <Button className="btn-modern">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white mb-1">{totalTasks}</p>
                <p className="text-sm text-gray-400">Total Tasks</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400 mb-1">
                  {taskColumns.find(col => col.id === 'done')?.count || 0}
                </p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-400 mb-1">
                  {taskColumns.find(col => col.id === 'inprogress')?.count || 0}
                </p>
                <p className="text-sm text-gray-400">In Progress</p>
              </div>
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <PlayCircle className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-400 mb-1">
                  {Math.round((taskColumns.find(col => col.id === 'done')?.count || 0) / totalTasks * 100)}%
                </p>
                <p className="text-sm text-gray-400">Completion Rate</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
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
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('kanban')}
            className="text-sm"
          >
            Kanban
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="text-sm"
          >
            List
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
          {taskColumns.map((column) => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-semibold text-white">{column.title}</h3>
                  <Badge className="bg-white/10 text-gray-300 text-xs">
                    {column.count}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Tasks */}
              <div className="space-y-3 min-h-[500px]">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-white">All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskColumns.flatMap(column => column.tasks).map((task: Task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <Checkbox />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">
                        {task.title}
                      </h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                        {task.project}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-1">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-400">{task.assignee.name}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Timer className="w-4 h-4" />
                      <span>{task.timeTracked}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-4 h-4" />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions Panel */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="btn-glass justify-start h-auto p-4">
              <div className="flex flex-col items-start gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">Create Task</div>
                  <div className="text-xs text-gray-400">Add new task to any project</div>
                </div>
              </div>
            </Button>
            <Button className="btn-glass justify-start h-auto p-4">
              <div className="flex flex-col items-start gap-2">
                <PlayCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-medium">Start Timer</div>
                  <div className="text-xs text-gray-400">Track time on current task</div>
                </div>
              </div>
            </Button>
            <Button className="btn-glass justify-start h-auto p-4">
              <div className="flex flex-col items-start gap-2">
                <RotateCcw className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium">Bulk Update</div>
                  <div className="text-xs text-gray-400">Update multiple tasks</div>
                </div>
              </div>
            </Button>
            <Button className="btn-glass justify-start h-auto p-4">
              <div className="flex flex-col items-start gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="font-medium">Set Goals</div>
                  <div className="text-xs text-gray-400">Define team objectives</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}