"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  CheckCircle,
  Target,
  BarChart3,
  MessageSquare,
  Star,
  Clock,
  Plus,
  Eye,
  Filter,
  MoreHorizontal,
  Play,
  AlertCircle
} from "lucide-react";

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
];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the user experience and checkout flow optimization",
    status: "In Progress",
    priority: "High",
    team: [
      { name: "Alice", initials: "AL" },
      { name: "Bob", initials: "BO" },
      { name: "Carol", initials: "CA" },
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    progress: 75,
    budget: "224k",
    spent: "168k",
    comments: 24,
    tasks: { completed: 18, total: 24 },
    deadline: "Dec 30, 2024"
  },
  {
    id: 2,
    title: "Mobile App Analytics Dashboard", 
    description: "Real-time analytics dashboard for mobile app performance tracking",
    status: "Review",
    priority: "Medium",
    team: [
      { name: "David", initials: "DA" },
      { name: "Eve", initials: "EV" },
    ],
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    progress: 90,
    budget: "169k",
    spent: "152k", 
    comments: 16,
    tasks: { completed: 27, total: 30 },
    deadline: "Jan 15, 2025"
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, typography, and color palette", 
    status: "Planning",
    priority: "Low",
    team: [
      { name: "Frank", initials: "FR" },
      { name: "Grace", initials: "GR" },
      { name: "Henry", initials: "HE" },
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    progress: 25,
    budget: "94k",
    spent: "23k",
    comments: 8, 
    tasks: { completed: 3, total: 12 },
    deadline: "Feb 28, 2025"
  }
];

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
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-500/20 text-red-300 border-red-500/30";
    case "Medium": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "Low": return "bg-green-500/20 text-green-300 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "Review": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "Planning": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "Completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Compact Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, Jonathon
          </h1>
          <p className="text-gray-400 text-sm">
            Here's what's happening with your projects today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            View All
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs">
            <Plus className="w-3 h-3 mr-1" />
            New Project
          </Button>
        </div>
      </div>

      {/* Compact KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-[#111111] border-white/10 hover:border-white/20 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${kpi.bgColor} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {kpi.trend === 'up' ? 
                    <ArrowUpRight className="w-3 h-3" /> : 
                    <ArrowDownRight className="w-3 h-3" />
                  }
                  {kpi.change}
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-white mb-1">{kpi.value}</p>
                <p className="text-xs text-gray-400">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Projects Section - Takes 8 columns */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Active Projects</h2>
              <p className="text-gray-400 text-sm">Monitor progress and manage your team</p>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 text-xs">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-[#111111] border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all w-6 h-6 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs font-semibold text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5 bg-white/10" />
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-sm font-bold text-white">{project.tasks.completed}/{project.tasks.total}</div>
                        <div className="text-xs text-gray-400">Tasks</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{project.comments}</div>
                        <div className="text-xs text-gray-400">Comments</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-emerald-400">{project.spent}</div>
                        <div className="text-xs text-gray-400">Spent</div>
                      </div>
                    </div>

                    {/* Team and Status */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                        <div className="flex -space-x-1">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-5 h-5 border border-[#111111]">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-5 h-5 rounded-full bg-white/10 border border-[#111111] flex items-center justify-center">
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

        {/* Right Sidebar - Takes 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          {/* Compact User Profile */}
          <Card className="bg-[#111111] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      J
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border border-[#111111]"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">Jonathon Smith</h3>
                  <p className="text-gray-400 text-xs mb-1">Senior Project Manager</p>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-emerald-500/20 text-emerald-300 text-xs px-1.5 py-0.5">
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-white">24</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-white">156</div>
                  <div className="text-xs text-gray-400">Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact Recent Activity */}
          <Card className="bg-[#111111] border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs h-6 px-2">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`p-1.5 rounded-md bg-white/10 ${activity.color}`}>
                    <activity.icon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white mb-1 line-clamp-1">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-1 line-clamp-1">
                      {activity.description}
                    </p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compact Quick Actions */}
          <Card className="bg-[#111111] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs h-8">
                <Plus className="w-3 h-3 mr-2" />
                Create Project
              </Button>
              <Button className="w-full justify-start bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs h-8">
                <Users className="w-3 h-3 mr-2" />
                Invite Members
              </Button>
              <Button className="w-full justify-start bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs h-8">
                <BarChart3 className="w-3 h-3 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}