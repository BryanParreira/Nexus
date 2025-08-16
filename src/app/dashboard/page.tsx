// src/app/dashboard/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Filter,
  ChevronRight,
  DollarSign,
  BarChart3,
  MessageSquare,
  Star,
  Clock,
  Target,
  Briefcase,
  Activity,
  CheckCircle,
  AlertCircle,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Eye,
  Plus
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the user experience and checkout flow optimization",
    status: "In Progress",
    priority: "High",
    team: [
      { name: "Alice", avatar: "/api/placeholder/32/32", initials: "AL" },
      { name: "Bob", avatar: "/api/placeholder/32/32", initials: "BO" },
      { name: "Carol", avatar: "/api/placeholder/32/32", initials: "CA" },
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    progress: 75,
    budget: "224k",
    spent: "168k",
    comments: 24,
    tasks: { completed: 18, total: 24 },
    deadline: "Dec 30, 2024",
    category: "Development"
  },
  {
    id: 2,
    title: "Mobile App Analytics Dashboard",
    description: "Real-time analytics dashboard for mobile app performance tracking",
    status: "Review",
    priority: "Medium",
    team: [
      { name: "David", avatar: "/api/placeholder/32/32", initials: "DA" },
      { name: "Eve", avatar: "/api/placeholder/32/32", initials: "EV" },
    ],
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    progress: 90,
    budget: "169k",
    spent: "152k",
    comments: 16,
    tasks: { completed: 27, total: 30 },
    deadline: "Jan 15, 2025",
    category: "Analytics"
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, typography, and color palette",
    status: "Planning",
    priority: "Low",
    team: [
      { name: "Frank", avatar: "/api/placeholder/32/32", initials: "FR" },
      { name: "Grace", avatar: "/api/placeholder/32/32", initials: "GR" },
      { name: "Henry", avatar: "/api/placeholder/32/32", initials: "HE" },
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    progress: 25,
    budget: "94k",
    spent: "23k",
    comments: 8,
    tasks: { completed: 3, total: 12 },
    deadline: "Feb 28, 2025",
    category: "Design"
  }
]

const kpiData = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Briefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    title: "Active Tasks",
    value: "156",
    change: "+5%",
    trend: "up",
    icon: CheckCircle,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20"
  },
  {
    title: "Team Members",
    value: "18",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  },
  {
    title: "Completion Rate",
    value: "87%",
    change: "-3%",
    trend: "down",
    icon: Target,
    color: "text-amber-400",
    bgColor: "bg-amber-500/20"
  }
]

const recentActivity = [
  {
    id: 1,
    type: "task_completed",
    title: "UI Design Review completed",
    description: "Mobile App Analytics Dashboard",
    user: { name: "Alice", initials: "AL" },
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-emerald-400"
  },
  {
    id: 2,
    type: "comment",
    title: "New comment on project",
    description: "E-Commerce Platform Redesign",
    user: { name: "Bob", initials: "BO" },
    time: "4 hours ago",
    icon: MessageSquare,
    color: "text-blue-400"
  },
  {
    id: 3,
    type: "deadline",
    title: "Deadline approaching",
    description: "Brand Identity System review due tomorrow",
    user: { name: "System", initials: "SY" },
    time: "6 hours ago",
    icon: AlertCircle,
    color: "text-amber-400"
  },
  {
    id: 4,
    type: "project_started",
    title: "New project started",
    description: "API Integration Phase 2",
    user: { name: "Carol", initials: "CA" },
    time: "1 day ago",
    icon: Play,
    color: "text-purple-400"
  }
]

const chartData = [
  { month: "Jan", income: 24, outcome: 18, projects: 12 },
  { month: "Feb", income: 14, outcome: 12, projects: 8 },
  { month: "Mar", income: 32, outcome: 21, projects: 15 },
  { month: "Apr", income: 28, outcome: 24, projects: 18 },
  { month: "May", income: 38, outcome: 22, projects: 22 },
  { month: "Jun", income: 26, outcome: 19, projects: 16 },
  { month: "Jul", income: 42, outcome: 28, projects: 25 },
  { month: "Aug", income: 35, outcome: 25, projects: 20 },
  { month: "Sep", income: 29, outcome: 20, projects: 17 },
  { month: "Oct", income: 45, outcome: 30, projects: 28 },
  { month: "Nov", income: 38, outcome: 26, projects: 24 },
  { month: "Dec", income: 41, outcome: 29, projects: 24 }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "priority-critical"
    case "Medium": return "priority-medium" 
    case "Low": return "priority-low"
    default: return "priority-medium"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "Review": return "bg-amber-500/20 text-amber-300 border-amber-500/30"
    case "Planning": return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    case "Completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Welcome back, Jonathon
          </h1>
          <p className="text-gray-400 text-lg">
            Here's what's happening with your projects today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:scale-105 transition-all">
            <Eye className="w-4 h-4 mr-2" />
            View All Projects
          </Button>
          <Button className="btn-modern">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="card-modern hover-lift group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.bgColor} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {kpi.trend === 'up' ? 
                    <ArrowUpRight className="w-4 h-4" /> : 
                    <ArrowDownRight className="w-4 h-4" />
                  }
                  {kpi.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
                <p className="text-sm text-gray-400">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Projects */}
        <div className="xl:col-span-2 space-y-8">
          {/* Projects Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Active Projects</h2>
                <p className="text-gray-400">Monitor progress and manage your team</p>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="card-modern group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <BarChart3 className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
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

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{project.tasks.completed}/{project.tasks.total}</div>
                          <div className="text-xs text-gray-400">Tasks</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{project.comments}</div>
                          <div className="text-xs text-gray-400">Comments</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-emerald-400">{project.spent}</div>
                          <div className="text-xs text-gray-400">Spent</div>
                        </div>
                      </div>

                      {/* Team and Status */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <Badge className={`text-xs border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </Badge>
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, index) => (
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
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.deadline}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <Card className="card-modern">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white mb-1">Performance Overview</CardTitle>
                  <p className="text-gray-400">Revenue and project metrics over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-400">Income</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-400">Expenses</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-t from-blue-900/10 to-transparent rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
                <div className="flex items-end justify-between h-full relative z-10">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 flex-1 group">
                      <div className="flex flex-col items-center gap-2 h-full justify-end">
                        <div 
                          className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-400 hover:to-blue-300 transition-all duration-300 group-hover:scale-110"
                          style={{ height: `${(item.income / 50) * 100}%` }}
                        />
                        <div 
                          className="w-4 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg hover:from-orange-400 hover:to-orange-300 transition-all duration-300 group-hover:scale-110"
                          style={{ height: `${(item.outcome / 50) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 font-medium group-hover:text-white transition-colors">
                        {item.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Enhanced User Profile */}
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Avatar className="w-16 h-16 ring-4 ring-blue-500/20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                      J
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">Jonathon Smith</h3>
                  <p className="text-gray-400 mb-1">Senior Project Manager</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                      Available
                    </Badge>
                    <span className="text-xs text-gray-400">• Last seen 2min ago</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">24</div>
                  <div className="text-xs text-gray-400">Projects</div>
                  <div className="text-xs text-emerald-400 font-medium">+3 this month</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">156</div>
                  <div className="text-xs text-gray-400">Tasks Done</div>
                  <div className="text-xs text-blue-400 font-medium">87% rate</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">18</div>
                  <div className="text-xs text-gray-400">Team Size</div>
                  <div className="text-xs text-purple-400 font-medium">5 departments</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">4.9</div>
                  <div className="text-xs text-gray-400">Rating</div>
                  <div className="flex items-center justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-modern">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-white">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className={`p-2 rounded-lg bg-white/10 ${activity.color} group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white mb-1 line-clamp-1">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-modern">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30 hover:border-blue-500/50">
                <Plus className="w-4 h-4 mr-3" />
                Create New Project
              </Button>
              <Button className="w-full justify-start bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/50">
                <Users className="w-4 h-4 mr-3" />
                Invite Team Members
              </Button>
              <Button className="w-full justify-start bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/30 hover:border-purple-500/50">
                <BarChart3 className="w-4 h-4 mr-3" />
                Generate Report
              </Button>
              <Button className="w-full justify-start bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/30 hover:border-amber-500/50">
                <Calendar className="w-4 h-4 mr-3" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}