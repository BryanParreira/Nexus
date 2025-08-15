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
  MoreHorizontal
} from "lucide-react"
import { mockDashboardStats } from "@/data/mockData"

// Mock data for recent activity and projects
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
      { name: "Grace", avatar: "/api/placeholder/32/32" },
      { name: "Henry", avatar: "/api/placeholder/32/32" },
      { name: "Iris", avatar: "/api/placeholder/32/32" }
    ],
    dueDate: "2025-04-15",
    priority: "Low"
  }
]

const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed task",
    target: "Homepage wireframes",
    time: "2 hours ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "created project",
    target: "Q2 Planning",
    time: "4 hours ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "updated status",
    target: "API Integration",
    time: "6 hours ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 4,
    user: "David Wilson",
    action: "added comment on",
    target: "Design Review",
    time: "8 hours ago",
    avatar: "/api/placeholder/32/32"
  }
]

const upcomingMeetings = [
  {
    id: 1,
    title: "Daily Standup",
    time: "9:00 AM",
    attendees: 5,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Project Review",
    time: "2:00 PM",
    attendees: 8,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Client Presentation",
    time: "4:30 PM",
    attendees: 3,
    color: "bg-purple-500"
  }
]

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Projects",
      value: mockDashboardStats.totalProjects,
      icon: FolderOpen,
      description: `${mockDashboardStats.activeProjects} active`,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Tasks Completed",
      value: mockDashboardStats.completedTasks,
      icon: CheckSquare,
      description: `${mockDashboardStats.totalTasks} total tasks`,
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Team Members",
      value: mockDashboardStats.teamMembers,
      icon: Users,
      description: "Active members",
      trend: "+2",
      trendUp: true
    },
    {
      title: "Upcoming Deadlines",
      value: mockDashboardStats.upcomingDeadlines,
      icon: Clock,
      description: "This week",
      trend: "-3",
      trendUp: false
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Low": return "bg-green-500/10 text-green-400 border-green-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good morning, Sofia! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <div className={`flex items-center text-xs ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${!stat.trendUp ? 'rotate-180' : ''}`} />
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Recent Projects</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-lg border border-border/50 bg-background/50">
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
                    <span className="text-sm text-muted-foreground">{project.status}</span>
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

        <div className="space-y-6">
          {/* Today's Meetings */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Today's Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className={`w-3 h-3 rounded-full ${meeting.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{meeting.title}</div>
                      <div className="text-xs text-muted-foreground">{meeting.attendees} attendees</div>
                    </div>
                    <div className="text-sm font-medium text-foreground">{meeting.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="text-xs">{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>
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