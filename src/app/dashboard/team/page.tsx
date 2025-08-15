"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare
} from "lucide-react"

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Sofia Safier",
    email: "sofia@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/64/64",
    role: "Product Manager",
    department: "Product",
    status: "online",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    tasksCompleted: 142,
    tasksInProgress: 8,
    rating: 4.9,
    bio: "Passionate product manager with 5+ years of experience in building user-centric products.",
    skills: ["Product Strategy", "User Research", "Data Analysis", "Agile"],
    projects: ["Website Redesign", "Mobile App", "User Dashboard"],
    lastActive: "2 minutes ago",
    isManager: true
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice@company.com",
    phone: "+1 (555) 234-5678",
    avatar: "/api/placeholder/64/64",
    role: "Senior Developer",
    department: "Engineering",
    status: "online",
    location: "New York, NY",
    joinDate: "2022-08-20",
    tasksCompleted: 156,
    tasksInProgress: 12,
    rating: 4.8,
    bio: "Full-stack developer specializing in React and Node.js with expertise in cloud technologies.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    projects: ["API Development", "Frontend Optimization", "Database Migration"],
    lastActive: "5 minutes ago",
    isManager: false
  },
  {
    id: "3",
    name: "Bob Smith",
    email: "bob@company.com",
    phone: "+1 (555) 345-6789",
    avatar: "/api/placeholder/64/64",
    role: "UX Designer",
    department: "Design",
    status: "away",
    location: "Austin, TX",
    joinDate: "2023-03-10",
    tasksCompleted: 89,
    tasksInProgress: 6,
    rating: 4.7,
    bio: "Creative UX designer focused on creating intuitive and accessible user experiences.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    projects: ["Design System", "Mobile UI", "User Testing"],
    lastActive: "1 hour ago",
    isManager: false
  },
  {
    id: "4",
    name: "Charlie Brown",
    email: "charlie@company.com",
    phone: "+1 (555) 456-7890",
    avatar: "/api/placeholder/64/64",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "offline",
    location: "Seattle, WA",
    joinDate: "2021-11-05",
    tasksCompleted: 203,
    tasksInProgress: 5,
    rating: 4.9,
    bio: "DevOps engineer with extensive experience in cloud infrastructure and automation.",
    skills: ["Kubernetes", "Terraform", "CI/CD", "Monitoring", "Security"],
    projects: ["Infrastructure Upgrade", "Security Audit", "Deployment Pipeline"],
    lastActive: "3 hours ago",
    isManager: false
  },
  {
    id: "5",
    name: "Diana Prince",
    email: "diana@company.com",
    phone: "+1 (555) 567-8901",
    avatar: "/api/placeholder/64/64",
    role: "Marketing Manager",
    department: "Marketing",
    status: "online",
    location: "Los Angeles, CA",
    joinDate: "2023-06-12",
    tasksCompleted: 76,
    tasksInProgress: 9,
    rating: 4.6,
    bio: "Results-driven marketing manager with a passion for digital marketing and brand growth.",
    skills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO"],
    projects: ["Brand Campaign", "Content Strategy", "Market Research"],
    lastActive: "10 minutes ago",
    isManager: true
  },
  {
    id: "6",
    name: "Eve Wilson",
    email: "eve@company.com",
    phone: "+1 (555) 678-9012",
    avatar: "/api/placeholder/64/64",
    role: "QA Engineer",
    department: "Engineering",
    status: "online",
    location: "Chicago, IL",
    joinDate: "2022-12-03",
    tasksCompleted: 134,
    tasksInProgress: 7,
    rating: 4.8,
    bio: "Detail-oriented QA engineer ensuring high-quality software delivery through comprehensive testing.",
    skills: ["Test Automation", "Selenium", "API Testing", "Performance Testing"],
    projects: ["Test Automation", "Quality Assurance", "Bug Tracking"],
    lastActive: "15 minutes ago",
    isManager: false
  }
]

const departments = ["All", "Engineering", "Design", "Product", "Marketing", "Sales"]
const roles = ["All", "Manager", "Senior", "Engineer", "Designer", "Analyst"]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All")
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online"
      case "away": return "Away"
      case "offline": return "Offline"
      default: return "Unknown"
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "All" || member.department === departmentFilter
    const matchesRole = roleFilter === "All" || member.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesDepartment && matchesRole
  })

  const totalMembers = teamMembers.length
  const onlineMembers = teamMembers.filter(m => m.status === "online").length
  const avgRating = teamMembers.reduce((sum, member) => sum + member.rating, 0) / teamMembers.length
  const totalTasksCompleted = teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-1">Manage your team members and track their progress</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search team members..."
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
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalMembers}</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{onlineMembers}</p>
                <p className="text-sm text-muted-foreground">Online Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalTasksCompleted}</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Department:</label>
          <select 
            value={departmentFilter} 
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-1 rounded-md border border-border bg-background text-foreground text-sm"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Role:</label>
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1 rounded-md border border-border bg-background text-foreground text-sm"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card 
            key={member.id} 
            className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{member.location}</span>
                </div>
              </div>

              {/* Department and Status */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-border/50">
                  {member.department}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                  {getStatusText(member.status)}
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.tasksCompleted}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.tasksInProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-foreground">{member.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{member.lastActive}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Member Detail Modal (simplified for this example) */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback>
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedMember.name}</h2>
                    <p className="text-muted-foreground">{selectedMember.role}</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedMember.department}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedMember(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">About</h3>
                <p className="text-muted-foreground">{selectedMember.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Current Projects</h3>
                <div className="space-y-2">
                  {selectedMember.projects.map((project) => (
                    <div key={project} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedMember.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Joined {selectedMember.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}