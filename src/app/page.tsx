// app/dashboard/page.tsx
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
  Star,
  AlertTriangle,
  BarChart3,
  Target
} from "lucide-react"
import Link from "next/link"

// Mock dashboard data
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
    dueDate: "2025-03-30",
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
    dueDate: "2025-03-25",
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
    dueDate: "2025-04-15",
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
    dueDate: "2025-03-28",
    progress: 60
  },
  {
    id: "2", 
    title: "Database Optimization",
    status: "In Review",
    priority: "High", 
    assignee: { name: "Diana Prince", avatar: "/api/placeholder/32/32" },
    dueDate: "2025-03-30",
    progress: 85
  },
  {
    id: "3",
    title: "Mobile Responsive Design", 
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Bob Smith", avatar: "/api/placeholder/32/32" },
    dueDate: "2025-04-02", 
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
      case "High": return "priority-high"
      case "Medium": return "priority-medium" 
      case "Low": return "priority-low"
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20"
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
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good morning, Sofia! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/calendar">
            <Button variant="outline" size="sm" className="btn-glass">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </Link>
          <Link href="/dashboard/projects">
            <Button size="sm" className="btn-modern">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/projects">
          <Card className="card-modern cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Projects
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{dashboardStats.totalProjects}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
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
          <Card className="card-modern cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Tasks Completed
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{dashboardStats.completedTasks}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.totalTasks} total tasks
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
          <Card className="card-modern cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Team Members
              </CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{dashboardStats.teamMembers}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  Active members
                </p>
                <div className="flex items-center text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/calendar">
          <Card className="card-modern cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Upcoming Deadlines
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{dashboardStats.upcomingDeadlines}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
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
        <Card className="lg:col-span-2 card-modern">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Recent Projects</CardTitle>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/20 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <h3 className="font-medium text-foreground">{project.name}</h3>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{project.dueDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Today's Schedule</CardTitle>
              <Link href="/dashboard/calendar">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-accent/20 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.attendees} attendees</div>
                    </div>
                    <div className="text-sm font-medium text-foreground">{event.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Recent Tasks</CardTitle>
              <Link href="/dashboard/tasks">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-background/50 hover:bg-accent/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">{task.assignee.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-secondary rounded-full h-1">
                            <div 
                              className="bg-primary h-1 rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Team Activity</CardTitle>
              <Link href="/dashboard/team">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
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
                      <AvatarFallback className="text-xs">{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className="font-medium text-primary">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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