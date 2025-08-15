import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, CheckSquare, Users, Clock } from "lucide-react"
import { mockDashboardStats } from "@/data/mockData"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Projects",
      value: mockDashboardStats.totalProjects,
      icon: FolderOpen,
      description: `${mockDashboardStats.activeProjects} active`,
    },
    {
      title: "Tasks Completed",
      value: mockDashboardStats.completedTasks,
      icon: CheckSquare,
      description: `${mockDashboardStats.totalTasks} total tasks`,
    },
    {
      title: "Team Members",
      value: mockDashboardStats.teamMembers,
      icon: Users,
      description: "Active members",
    },
    {
      title: "Upcoming Deadlines",
      value: mockDashboardStats.upcomingDeadlines,
      icon: Clock,
      description: "This week",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to ProjectFlow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your project management dashboard is ready! Navigate through the sidebar to explore different features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
