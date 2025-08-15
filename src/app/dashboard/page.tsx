import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Clock,
  TrendingUp,
  Calendar,
  Plus,
  ArrowRight,
  AlertTriangle,
  Target,
  Activity,
  Zap
} from "lucide-react"
import Link from "next/link"

const dashboardStats = {
  totalProjects: 12,
  activeProjects: 8,
  completedTasks: 156,
  totalTasks: 198,
  teamMembers: 15,
  upcomingDeadlines: 7
}

const recentProjects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 75,
    team: [
      { name: "Alice", avatar: "/api/placeholder/32/32" },
      { name: "Bob", avatar: "/api/placeholder/32/32" },
      { name: "Charlie", avatar: "/api/placeholder/32/32" }
    ],
    dueDate: "Mar 30",
    priority: "High"
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "In Review",
    progress: 90,
    team: [
      { name: "Diana", avatar: "/api/placeholder/32/32" },
      { name: "Eve", avatar: "/api/placeholder/32/32" }
    ],
    dueDate: "Mar 25",
    priority: "Medium"
  },
  {
    id: 3,
    name: "Marketing Campaign",
    status: "Planning",
    progress: 25,
    team: [
      { name: "Frank", avatar: "/api/placeholder/32/32" },
      { name: "Grace", avatar: "/api/placeholder/32/32" }
    ],
    dueDate: "Apr 15",
    priority: "Low"
  }
]

const recentTasks = [
  {
    id: "1",
    title: "User Authentication System",
    status: "In Progress",
    priority: "High",
    assignee: { name: "Alice Johnson", avatar: "/api/placeholder/32/32" },
    dueDate: "Mar 28",
    progress: 60
  },
  {
    id: "2", 
    title: "Database Optimization",
    status: "In Review",
    priority: "High", 
    assignee: { name: "Diana Prince", avatar: "/api/placeholder/32/32" },
    dueDate: "Mar 30",
    progress: 85
  },
  {
    id: "3",
    title: "Mobile Responsive Design", 
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Bob Smith", avatar: "/api/placeholder/32/32" },
    dueDate: "Apr 2", 
    progress: 0
  }
]

const upcomingEvents = [
  {
    id: "1",
    title: "Team Standup",
    time: "9:00 AM",
    date: "Today",
    attendees: 5,
    type: "meeting"
  },
  {
    id: "2", 
    title: "Product Review",
    time: "2:00 PM",
    date: "Tomorrow",
    attendees: 8,
    type: "review"
  },
  {
    id: "3",
    title: "Client Presentation", 
    time: "10:00 AM",
    date: "Mar 26",
    attendees: 3,
    type: "presentation"
  }
]

const teamActivity = [
  {
    id: "1",
    user: { name: "Sarah Johnson", avatar: "/api/placeholder/32/32" },
    action: "completed task",
    target: "Homepage wireframes",
    time: "2 hours ago"
  },
  {
    id: "2",
    user: { name: "Mike Chen", avatar: "/api/placeholder/32/32" },
    action: "created project", 
    target: "Q2 Planning",
    time: "4 hours ago"
  },
  {
    id: "3",
    user: { name: "Emily Davis", avatar: "/api/placeholder/32/32" },
    action: "updated status",
    target: "API Integration", 
    time: "6 hours ago"
  }
]

export default function DashboardPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/15 text-red-400 border-red-500/30"
      case "Medium": return "bg-amber-500/15 text-amber-400 border-amber-500/30" 
      case "Low": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      default: return "bg-slate-500/15 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-500/15 text-blue-400 border-blue-500/30"
      case "In Review": return "bg-purple-500/15 text-purple-400 border-purple-500/30"
      case "Planning": return "bg-amber-500/15 text-amber-400 border-amber-500/30"
      case "To Do": return "bg-slate-500/15 text-slate-400 border-slate-500/30"
      default: return "bg-slate-500/15 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Good morning, Sofia! 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/calendar">
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </Link>
          <Link href="/dashboard/projects">
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/projects">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Total Projects
              </CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <FolderOpen className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{dashboardStats.totalProjects}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">
                  {dashboardStats.activeProjects} active
                </p>
                <div className="flex items-center text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/tasks">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-emerald-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Tasks Completed
              </CardTitle>
              <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                <CheckSquare className="h-4 w-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{dashboardStats.completedTasks}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">
                  of {dashboardStats.totalTasks} total
                </p>
                <div className="flex items-center text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8%
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/team">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Team Members
              </CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{dashboardStats.teamMembers}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">
                  Active members
                </p>
                <div className="flex items-center text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2 new
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/calendar">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-amber-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Upcoming Deadlines
              </CardTitle>
              <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{dashboardStats.upcomingDeadlines}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">
                  This week
                </p>
                <div className="flex items-center text-xs text-amber-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  3 urgent
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Recent Projects
            </CardTitle>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <Badge className={`${getPriorityColor(project.priority)} border font-medium`}>
                        {project.priority}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{project.dueDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="w-7 h-7 border-2 border-slate-800 ring-2 ring-slate-700/50">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center">
                          <span className="text-xs text-slate-300 font-medium">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(project.status)} border font-medium`}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-white">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Today's Schedule
              </CardTitle>
              <Link href="/dashboard/calendar">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">{event.title}</div>
                      <div className="text-xs text-slate-400">{event.attendees} attendees</div>
                    </div>
                    <div className="text-sm font-semibold text-blue-400">{event.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Recent Tasks
              </CardTitle>
              <Link href="/dashboard/tasks">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {task.assignee.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-400">{task.assignee.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-300 font-medium">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Team Activity
              </CardTitle>
              <Link href="/dashboard/team">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                        {activity.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300">
                        <span className="font-medium text-white">{activity.user.name}</span>
                        <span className="text-slate-400"> {activity.action} </span>
                        <span className="font-medium text-blue-400">{activity.target}</span>
                      </p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}