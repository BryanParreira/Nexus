// app/dashboard/tasks/page.tsx
"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Flag
} from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Implement user authentication",
    description: "Set up OAuth integration with Google and GitHub",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    dueDate: "2024-12-25",
    project: "Auth System",
    tags: ["Backend", "Security"]
  },
  {
    id: 2,
    title: "Design dashboard mockups",
    description: "Create wireframes and high-fidelity designs for the main dashboard",
    status: "Todo",
    priority: "Medium",
    assignee: "Jane Smith",
    dueDate: "2024-12-30",
    project: "UI/UX",
    tags: ["Design", "Frontend"]
  },
  {
    id: 3,
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "Done",
    priority: "High",
    assignee: "Mike Johnson",
    dueDate: "2024-12-20",
    project: "DevOps",
    tags: ["DevOps", "Automation"]
  },
  {
    id: 4,
    title: "Write API documentation",
    description: "Document all REST API endpoints with examples",
    status: "In Review",
    priority: "Low",
    assignee: "Sarah Wilson",
    dueDate: "2024-12-28",
    project: "Documentation",
    tags: ["Documentation", "API"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done": return "bg-green-500/20 text-green-300 border-green-500/30";
    case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "In Review": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "Todo": return "bg-gray-500/20 text-gray-300 border-gray-500/30";
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

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
                  <BreadcrumbPage>Tasks</BreadcrumbPage>
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
            New Task
          </Button>
        </div>
      </header>
      
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-black">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
            <p className="text-gray-400">Manage and track your team's tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{tasks.length}</p>
                  <p className="text-sm text-gray-400">Total Tasks</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === "Done").length}</p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-400">{tasks.filter(t => t.status === "In Progress").length}</p>
                  <p className="text-sm text-gray-400">In Progress</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-400">{tasks.filter(t => t.priority === "High").length}</p>
                  <p className="text-sm text-gray-400">High Priority</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{task.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
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
                    <Badge className={`border text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Flag className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                      <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Assignee and Due Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-400">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Project */}
                  <div className="text-xs text-gray-500">
                    Project: {task.project}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No tasks found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}