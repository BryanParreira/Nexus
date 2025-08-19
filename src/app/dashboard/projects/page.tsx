// app/dashboard/projects/page.tsx
"use client";

import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  DollarSign,
  Target,
  Briefcase,
  Activity,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the user experience, checkout flow optimization, and mobile responsiveness improvements",
    status: "In Progress",
    priority: "High",
    progress: 75,
    budget: 224000,
    spent: 168000,
    team: [
      { name: "Alice Johnson", initials: "AJ" },
      { name: "Bob Smith", initials: "BS" },
      { name: "Carol Davis", initials: "CD" },
    ],
    tasks: { total: 24, completed: 18 },
    category: "Development",
    tags: ["E-Commerce", "Redesign", "Mobile"]
  },
  {
    id: 2,
    title: "Mobile Analytics Dashboard",
    description: "Real-time analytics dashboard for mobile app performance tracking with advanced reporting capabilities",
    status: "Review",
    priority: "Medium",
    progress: 90,
    budget: 169000,
    spent: 152000,
    team: [
      { name: "Eve Brown", initials: "EB" },
      { name: "Frank Miller", initials: "FM" },
    ],
    tasks: { total: 30, completed: 27 },
    category: "Analytics",
    tags: ["Analytics", "Dashboard", "Mobile"]
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, typography, color palette, and brand guidelines documentation",
    status: "Planning",
    priority: "Low",
    progress: 25,
    budget: 94000,
    spent: 23000,
    team: [
      { name: "Grace Lee", initials: "GL" },
      { name: "Henry Kim", initials: "HK" },
    ],
    tasks: { total: 12, completed: 3 },
    category: "Design",
    tags: ["Branding", "Design", "Identity"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "Review": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "Planning": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "Completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "text-red-400";
    case "Medium": return "text-yellow-400";
    case "Low": return "text-green-400";
    default: return "text-gray-400";
  }
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const totalRevenue = projects.reduce((sum, p) => sum + p.spent, 0);

  return (
    <div className="w-full h-full bg-black">
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b border-gray-800 bg-black">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ms-1" />
          <div className="max-lg:hidden lg:contents">
            <Separator
              orientation="vertical"
              className="me-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </header>
      
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-black">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects Overview</h1>
            <p className="text-gray-400">Manage and track all your projects in one place</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{totalProjects}</p>
                  <p className="text-sm text-gray-400">Total Projects</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">{activeProjects}</p>
                  <p className="text-sm text-gray-400">Active Projects</p>
                </div>
                <Activity className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-400">{completedProjects}</p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-400">${(totalRevenue / 1000).toFixed(0)}k</p>
                  <p className="text-sm text-gray-400">Total Spent</p>
                </div>
                <DollarSign className="w-8 h-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Status and Priority */}
                  <div className="flex items-center gap-2">
                    <Badge className={`border text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                    <span className={`text-xs ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 bg-white/10" />
                  </div>

                  {/* Budget */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Budget</span>
                      <span className="text-sm font-semibold text-white">
                        ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <Progress value={(project.spent / project.budget) * 100} className="h-2 bg-white/10" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Team and Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <Avatar key={index} className="w-6 h-6">
                            <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-gray-400">{project.team.length} members</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">{project.tasks.completed}/{project.tasks.total} tasks</span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-xs text-gray-500">
                    Category: {project.category}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No projects found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}