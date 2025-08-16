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
  Users,
  Calendar,
  Filter,
  ChevronRight,
  DollarSign,
  BarChart3,
  MessageSquare,
  Star
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "A Huge million number projects",
    description: "Developing admin Sales trends. Creating and updating",
    status: "About",
    team: [
      { name: "Alice", avatar: "/api/placeholder/32/32", initials: "AL" },
      { name: "Bob", avatar: "/api/placeholder/32/32", initials: "BO" },
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    progress: 75,
    budget: "224",
    comments: 24
  },
  {
    id: 2,
    title: "A Huge million number projects",
    description: "Developing admin Sales trends. Creating and updating",
    status: "About",
    team: [
      { name: "Carol", avatar: "/api/placeholder/32/32", initials: "CA" },
      { name: "David", avatar: "/api/placeholder/32/32", initials: "DA" },
    ],
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    progress: 60,
    budget: "169",
    comments: 169
  },
  {
    id: 3,
    title: "A Huge million number projects",
    description: "Developing admin Sales trends. Creating and updating",
    status: "About",
    team: [
      { name: "Eve", avatar: "/api/placeholder/32/32", initials: "EV" },
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    progress: 45,
    budget: "194",
    comments: 24
  }
]

const weeklyActivity = [
  { day: "Fri", date: "22", activities: [
    { time: "10:00", title: "Project Overview", team: [{ initials: "AL" }, { initials: "BO" }], color: "bg-blue-500" }
  ]},
  { day: "Sat", date: "23", activities: [] },
  { day: "Sun", date: "24", activities: [
    { time: "14:00", title: "Project Overview", team: [{ initials: "CA" }], color: "bg-emerald-500" }
  ]},
  { day: "Mon", date: "25", activities: [] },
  { day: "Tue", date: "26", activities: [
    { time: "09:00", title: "Project Overview", team: [{ initials: "DA" }, { initials: "EV" }], color: "bg-purple-500" }
  ]},
  { day: "Wed", date: "27", activities: [] },
  { day: "Thu", date: "28", activities: [] }
]

const chartData = [
  { month: "Jan", income: 24, outcome: 18 },
  { month: "Feb", income: 14, outcome: 12 },
  { month: "Mar", income: 32, outcome: 21 },
  { month: "Apr", income: 28, outcome: 24 },
  { month: "May", income: 38, outcome: 22 },
  { month: "Jun", income: 26, outcome: 19 },
  { month: "Jul", income: 42, outcome: 28 },
  { month: "Aug", income: 35, outcome: 25 },
  { month: "Sep", income: 29, outcome: 20 },
  { month: "Oct", income: 45, outcome: 30 },
  { month: "Nov", income: 38, outcome: 26 },
  { month: "Dec", income: 41, outcome: 29 }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Your projects</h2>
          <p className="text-gray-400 mt-1">Monitor your project progress and team performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            All Projects
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-[#1a1a2e] border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center mb-3`}>
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm leading-tight mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{project.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                        {project.status}
                      </Badge>
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-[#1a1a2e]">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        <span>{project.comments}</span>
                      </div>
                      <div className="text-white font-semibold">{project.budget}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Activity */}
          <Card className="bg-[#1a1a2e] border-white/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Weekly Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">{day.day}</div>
                      <div className="text-sm font-semibold text-white mt-1">{day.date}</div>
                    </div>
                    <div className="space-y-2 min-h-[200px]">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className={`p-2 rounded-lg ${activity.color} text-white`}>
                          <div className="text-xs font-medium mb-1">{activity.time}</div>
                          <div className="text-xs opacity-90 mb-2">{activity.title}</div>
                          <div className="flex -space-x-1">
                            {activity.team.map((member, memberIndex) => (
                              <Avatar key={memberIndex} className="w-4 h-4 border border-white/20">
                                <AvatarFallback className="bg-white/20 text-white text-xs">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <Card className="bg-[#1a1a2e] border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    J
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">Jonathon</h3>
                  <p className="text-sm text-gray-400">Project Manager</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">224</div>
                  <div className="text-xs text-gray-400">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">169</div>
                  <div className="text-xs text-gray-400">In Progress</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">194</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card className="bg-[#1a1a2e] border-white/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Budget Overview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                    Summary
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                    Last transactions
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                    Invoices
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Total Income</div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-white">$2400.20 USD</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-400">vs last month</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$1400 USD</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-400">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-48 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg p-4 relative overflow-hidden">
                <div className="flex items-end justify-between h-full">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className="flex flex-col items-center gap-1 h-full justify-end">
                        <div 
                          className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm"
                          style={{ height: `${(item.income / 50) * 100}%` }}
                        />
                        <div 
                          className="w-3 bg-gradient-to-t from-orange-500 to-orange-400 rounded-sm"
                          style={{ height: `${(item.outcome / 50) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}