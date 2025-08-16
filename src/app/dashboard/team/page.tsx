// src/app/dashboard/team/page.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Activity,
  TrendingUp,
  UserPlus,
  Settings
} from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Alice Chen",
    email: "alice.chen@company.com",
    role: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    status: "Online",
    avatar: "/api/placeholder/64/64",
    initials: "AC",
    joinDate: "2023-01-15",
    skills: ["React", "TypeScript", "UI/UX", "JavaScript"],
    currentProjects: ["E-commerce Platform", "Mobile Banking App"],
    tasksCompleted: 124,
    tasksInProgress: 8,
    performance: 95,
    lastActivity: "2 minutes ago",
    timezone: "PST",
    phone: "+1 (555) 123-4567",
    birthday: "1992-03-15",
    workload: 85
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@company.com",
    role: "Project Manager",
    department: "Management",
    location: "New York, NY",
    status: "In Meeting",
    avatar: "/api/placeholder/64/64",
    initials: "BW",
    joinDate: "2022-08-22",
    skills: ["Project Management", "Agile", "Scrum", "Leadership"],
    currentProjects: ["Brand Identity Refresh", "API Integration Platform"],
    tasksCompleted: 89,
    tasksInProgress: 12,
    performance: 92,
    lastActivity: "15 minutes ago",
    timezone: "EST",
    phone: "+1 (555) 234-5678",
    birthday: "1988-07-22",
    workload: 75
  },
  {
    id: 3,
    name: "Carol Martinez",
    email: "carol.martinez@company.com",
    role: "UI/UX Designer",
    department: "Design",
    location: "Austin, TX",
    status: "Away",
    avatar: "/api/placeholder/64/64",
    initials: "CM",
    joinDate: "2023-03-10",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    currentProjects: ["E-commerce Platform", "Customer Support Portal"],
    tasksCompleted: 76,
    tasksInProgress: 6,
    performance: 88,
    lastActivity: "1 hour ago",
    timezone: "CST",
    phone: "+1 (555) 345-6789",
    birthday: "1994-11-08",
    workload: 60
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Backend Developer",
    department: "Engineering",
    location: "Seattle, WA",
    status: "Online",
    avatar: "/api/placeholder/64/64",
    initials: "DK",
    joinDate: "2022-11-05",
    skills: ["Node.js", "Python", "Database", "APIs"],
    currentProjects: ["Mobile Banking App", "Data Analytics Dashboard"],
    tasksCompleted: 156,
    tasksInProgress: 10,
    performance: 97,
    lastActivity: "5 minutes ago",
    timezone: "PST",
    phone: "+1 (555) 456-7890",
    birthday: "1990-02-14",
    workload: 90
  },
  {
    id: 5,
    name: "Emma Thompson",
    email: "emma.thompson@company.com",
    role: "QA Engineer",
    department: "Quality Assurance",
    location: "Boston, MA",
    status: "Offline",
    avatar: "/api/placeholder/64/64",
    initials: "ET",
    joinDate: "2023-05-18",
    skills: ["Testing", "Automation", "Selenium", "Bug Tracking"],
    currentProjects: ["API Integration Platform", "Mobile Banking App"],
    tasksCompleted: 98,
    tasksInProgress: 5,
    performance: 91,
    lastActivity: "2 hours ago",
    timezone: "EST",
    phone: "+1 (555) 567-8901",
    birthday: "1993-09-03",
    workload: 70
  },
  {
    id: 6,
    name: "Frank Rodriguez",
    email: "frank.rodriguez@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    location: "Denver, CO",
    status: "Online",
    avatar: "/api/placeholder/64/64",
    initials: "FR",
    joinDate: "2022-04-12",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    currentProjects: ["Infrastructure", "Security Audit"],
    tasksCompleted: 112,
    tasksInProgress: 7,
    performance: 94,
    lastActivity: "10 minutes ago",
    timezone: "MST",
    phone: "+1 (555) 678-9012",
    birthday: "1989-12-25",
    workload: 80
  }
]

const statusColors = {
  "Online": "bg-emerald-500 text-emerald-100",
  "Away": "bg-amber-500 text-amber-100",
  "In Meeting": "bg-blue-500 text-blue-100",
  "Offline": "bg-gray-500 text-gray-100"
}

const departmentColors = {
  "Engineering": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Design": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Management": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Quality Assurance": "bg-orange-500/20 text-orange-400 border-orange-500/30"
}

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredMembers = selectedDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department.toLowerCase().replace(' ', '-') === selectedDepartment)

  const getTeamStats = () => {
    const total = teamMembers.length
    const online = teamMembers.filter(member => member.status === "Online").length
    const avgPerformance = Math.round(teamMembers.reduce((sum, member) => sum + member.performance, 0) / total)
    const avgWorkload = Math.round(teamMembers.reduce((sum, member) => sum + member.workload, 0) / total)
    
    return { total, online, avgPerformance, avgWorkload }
  }

  const stats = getTeamStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-gray-400 mt-1">Manage your team members and track their performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Online Now</p>
                <p className="text-2xl font-bold text-white">{stats.online}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Performance</p>
                <p className="text-2xl font-bold text-white">{stats.avgPerformance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Workload</p>
                <p className="text-2xl font-bold text-white">{stats.avgWorkload}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={selectedDepartment === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDepartment('all')}
            className={selectedDepartment === 'all' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            All Departments
          </Button>
          <Button
            variant={selectedDepartment === 'engineering' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDepartment('engineering')}
            className={selectedDepartment === 'engineering' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            Engineering
          </Button>
          <Button
            variant={selectedDepartment === 'design' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDepartment('design')}
            className={selectedDepartment === 'design' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            Design
          </Button>
          <Button
            variant={selectedDepartment === 'management' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDepartment('management')}
            className={selectedDepartment === 'management' ? 'bg-blue-500 text-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}
          >
            Management
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="bg-[#1a1a2e] border-white/10 hover:border-white/20 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#1a1a2e] ${
                      member.status === "Online" ? "bg-emerald-500" :
                      member.status === "Away" ? "bg-amber-500" :
                      member.status === "In Meeting" ? "bg-blue-500" :
                      "bg-gray-500"
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                    <Badge className={`${statusColors[member.status as keyof typeof statusColors]} text-xs mt-1`}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className={`${departmentColors[member.department as keyof typeof departmentColors]} border text-xs px-2 py-1`}>
                    {member.department}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{member.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Tasks Completed</p>
                    <p className="text-white font-medium">{member.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">In Progress</p>
                    <p className="text-white font-medium">{member.tasksInProgress}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-white font-medium">{member.performance}%</span>
                  </div>
                  <Progress value={member.performance} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Workload</span>
                    <span className="text-white font-medium">{member.workload}%</span>
                  </div>
                  <Progress value={member.workload} className="h-2" />
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-xs">Current Projects</p>
                  <div className="flex flex-wrap gap-1">
                    {member.currentProjects.slice(0, 2).map((project, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                        {project}
                      </Badge>
                    ))}
                    {member.currentProjects.length > 2 && (
                      <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                        +{member.currentProjects.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-xs">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-gray-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{member.lastActivity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}