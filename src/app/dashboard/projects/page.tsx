// app/dashboard/projects/page.tsx
"use client";

import { useState, useCallback } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
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
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  Users,
  FileText,
  Settings,
  Edit,
  Trash2,
  Copy,
  Archive,
  Star,
  MessageSquare,
  Paperclip,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  GripVertical,
  Eye,
  BarChart3,
  Download
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: { name: string; initials: string; avatar?: string };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date;
  tags: string[];
  comments: number;
  attachments: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  limit?: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  budget: number;
  spent: number;
  team: Array<{ name: string; initials: string; avatar?: string; role?: string }>;
  tasks: { total: number; completed: number };
  category: string;
  tags: string[];
  dueDate: Date;
  createdAt: Date;
  owner: { name: string; initials: string };
}

interface NewProject {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: string;
  dueDate: Date | undefined;
  tags: string[];
  teamMembers: string[];
}

interface ProjectFilters {
  status: string;
  priority: string;
  category: string;
  assignee: string;
  dateRange: string;
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the user experience, checkout flow optimization, and mobile responsiveness improvements",
    status: "in-progress",
    priority: "high",
    progress: 75,
    budget: 224000,
    spent: 168000,
    team: [
      { name: "Alice Johnson", initials: "AJ", role: "Lead Designer" },
      { name: "Bob Smith", initials: "BS", role: "Frontend Dev" },
      { name: "Carol Davis", initials: "CD", role: "Backend Dev" },
    ],
    tasks: { total: 24, completed: 18 },
    category: "Development",
    tags: ["E-Commerce", "Redesign", "Mobile"],
    dueDate: new Date('2024-12-15'),
    createdAt: new Date('2024-09-01'),
    owner: { name: "Alice Johnson", initials: "AJ" }
  },
  {
    id: "2",
    title: "Mobile Analytics Dashboard",
    description: "Real-time analytics dashboard for mobile app performance tracking with advanced reporting capabilities",
    status: "review",
    priority: "medium",
    progress: 90,
    budget: 169000,
    spent: 152000,
    team: [
      { name: "Eve Brown", initials: "EB", role: "Data Analyst" },
      { name: "Frank Miller", initials: "FM", role: "Full Stack Dev" },
    ],
    tasks: { total: 30, completed: 27 },
    category: "Analytics",
    tags: ["Analytics", "Dashboard", "Mobile"],
    dueDate: new Date('2024-11-30'),
    createdAt: new Date('2024-08-15'),
    owner: { name: "Eve Brown", initials: "EB" }
  },
  {
    id: "3",
    title: "Brand Identity System",
    description: "Complete brand redesign including logo, typography, color palette, and brand guidelines documentation",
    status: "planning",
    priority: "low",
    progress: 25,
    budget: 94000,
    spent: 23000,
    team: [
      { name: "Grace Lee", initials: "GL", role: "Brand Designer" },
      { name: "Henry Kim", initials: "HK", role: "Art Director" },
    ],
    tasks: { total: 12, completed: 3 },
    category: "Design",
    tags: ["Branding", "Design", "Identity"],
    dueDate: new Date('2025-01-20'),
    createdAt: new Date('2024-10-01'),
    owner: { name: "Grace Lee", initials: "GL" }
  }
];

const initialKanbanColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "border-gray-600 bg-gray-900/50",
    tasks: [
      {
        id: "task-1",
        title: "Research user preferences",
        description: "Conduct user interviews and surveys",
        assignee: { name: "Alice Johnson", initials: "AJ" },
        priority: "medium",
        dueDate: new Date('2024-11-25'),
        tags: ["Research", "UX"],
        comments: 3,
        attachments: 2
      },
      {
        id: "task-2",
        title: "Design wireframes",
        description: "Create low-fidelity wireframes for key pages",
        assignee: { name: "Grace Lee", initials: "GL" },
        priority: "high",
        dueDate: new Date('2024-11-20'),
        tags: ["Design", "Wireframes"],
        comments: 1,
        attachments: 5
      }
    ]
  },
  {
    id: "todo",
    title: "To Do",
    color: "border-blue-600 bg-blue-900/20",
    tasks: [
      {
        id: "task-3",
        title: "Implement authentication",
        description: "Set up user login and registration system",
        assignee: { name: "Bob Smith", initials: "BS" },
        priority: "high",
        dueDate: new Date('2024-11-22'),
        tags: ["Backend", "Auth"],
        comments: 5,
        attachments: 1
      }
    ]
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "border-yellow-600 bg-yellow-900/20",
    limit: 3,
    tasks: [
      {
        id: "task-4",
        title: "Build payment integration",
        description: "Integrate Stripe payment processing",
        assignee: { name: "Carol Davis", initials: "CD" },
        priority: "urgent",
        dueDate: new Date('2024-11-18'),
        tags: ["Payment", "Integration"],
        comments: 8,
        attachments: 3
      },
      {
        id: "task-5",
        title: "Create responsive layouts",
        description: "Implement mobile-first responsive design",
        assignee: { name: "Alice Johnson", initials: "AJ" },
        priority: "medium",
        dueDate: new Date('2024-11-28'),
        tags: ["Frontend", "Mobile"],
        comments: 2,
        attachments: 0
      }
    ]
  },
  {
    id: "review",
    title: "Review",
    color: "border-purple-600 bg-purple-900/20",
    tasks: [
      {
        id: "task-6",
        title: "Performance optimization",
        description: "Optimize database queries and API responses",
        assignee: { name: "Frank Miller", initials: "FM" },
        priority: "medium",
        dueDate: new Date('2024-11-15'),
        tags: ["Performance", "Backend"],
        comments: 4,
        attachments: 2
      }
    ]
  },
  {
    id: "done",
    title: "Done",
    color: "border-green-600 bg-green-900/20",
    tasks: [
      {
        id: "task-7",
        title: "Setup project structure",
        description: "Initialize project with proper folder structure",
        assignee: { name: "Eve Brown", initials: "EB" },
        priority: "low",
        dueDate: new Date('2024-10-15'),
        tags: ["Setup", "Infrastructure"],
        comments: 1,
        attachments: 1
      }
    ]
  }
];

const teamMembers = [
  { id: "1", name: "Alice Johnson", initials: "AJ", role: "Lead Designer" },
  { id: "2", name: "Bob Smith", initials: "BS", role: "Frontend Developer" },
  { id: "3", name: "Carol Davis", initials: "CD", role: "Backend Developer" },
  { id: "4", name: "Eve Brown", initials: "EB", role: "Data Analyst" },
  { id: "5", name: "Frank Miller", initials: "FM", role: "Full Stack Developer" },
  { id: "6", name: "Grace Lee", initials: "GL", role: "Brand Designer" },
  { id: "7", name: "Henry Kim", initials: "HK", role: "Art Director" },
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('kanban');
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(initialKanbanColumns);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState('');

  // Filter states
  const [filters, setFilters] = useState<ProjectFilters>({
    status: 'all',
    priority: 'all',
    category: 'all',
    assignee: 'all',
    dateRange: 'all'
  });

  // New project state
  const [newProject, setNewProject] = useState<NewProject>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    budget: '',
    dueDate: undefined,
    tags: [],
    teamMembers: []
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "review": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "planning": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "on-hold": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-400 bg-red-500/10";
      case "high": return "text-orange-400 bg-orange-500/10";
      case "medium": return "text-yellow-400 bg-yellow-500/10";
      case "low": return "text-green-400 bg-green-500/10";
      default: return "text-gray-400 bg-gray-500/10";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": return <AlertCircle className="w-3 h-3" />;
      case "high": return <TrendingUp className="w-3 h-3" />;
      case "medium": return <Clock className="w-3 h-3" />;
      case "low": return <Target className="w-3 h-3" />;
      default: return <Target className="w-3 h-3" />;
    }
  };

  // Statistics calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalRevenue = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalTasks = kanbanColumns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = kanbanColumns.find(col => col.id === 'done')?.tasks.length || 0;

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesPriority = filters.priority === 'all' || project.priority === filters.priority;
    const matchesCategory = filters.category === 'all' || project.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const sourceColumn = kanbanColumns.find(col => 
      col.tasks.some(task => task.id === draggedTask)
    );
    const targetColumn = kanbanColumns.find(col => col.id === targetColumnId);
    
    if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id) {
      setDraggedTask(null);
      return;
    }

    // Check WIP limit
    if (targetColumn.limit && targetColumn.tasks.length >= targetColumn.limit) {
      toast.error("Column Limit Reached", {
        description: `${targetColumn.title} has a limit of ${targetColumn.limit} tasks.`,
      });
      setDraggedTask(null);
      return;
    }

    const taskToMove = sourceColumn.tasks.find(task => task.id === draggedTask);
    if (!taskToMove) return;

    setKanbanColumns(columns => columns.map(col => {
      if (col.id === sourceColumn.id) {
        return {
          ...col,
          tasks: col.tasks.filter(task => task.id !== draggedTask)
        };
      }
      if (col.id === targetColumn.id) {
        return {
          ...col,
          tasks: [...col.tasks, taskToMove]
        };
      }
      return col;
    }));

    toast.success("Task Moved", {
      description: `Task moved to ${targetColumn.title}`,
    });

    setDraggedTask(null);
  };

  // Project management functions
  const handleAddTag = () => {
    if (currentTagInput.trim() && !newProject.tags.includes(currentTagInput.trim())) {
      setNewProject(prev => ({
        ...prev,
        tags: [...prev.tags, currentTagInput.trim()]
      }));
      setCurrentTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewProject(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCreateProject = () => {
    if (!newProject.title.trim()) {
      toast.error("Validation Error", {
        description: "Project title is required.",
      });
      return;
    }

    if (!newProject.category) {
      toast.error("Validation Error", {
        description: "Project category is required.",
      });
      return;
    }

    const project: Project = {
      id: `project-${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      status: 'planning',
      priority: newProject.priority,
      progress: 0,
      budget: parseInt(newProject.budget) || 0,
      spent: 0,
      team: teamMembers.filter(member => newProject.teamMembers.includes(member.id)),
      tasks: { total: 0, completed: 0 },
      category: newProject.category,
      tags: newProject.tags,
      dueDate: newProject.dueDate || new Date(),
      createdAt: new Date(),
      owner: teamMembers[0] // Default to first team member
    };

    setProjects(prev => [...prev, project]);
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      budget: '',
      dueDate: undefined,
      tags: [],
      teamMembers: []
    });
    
    setIsNewProjectOpen(false);
    
    toast.success("Project Created", {
      description: `Project "${project.title}" has been created successfully.`,
    });
  };

  const handleExportProjects = () => {
    const exportData = {
      projects: filteredProjects,
      summary: {
        totalProjects,
        activeProjects,
        completedProjects,
        totalRevenue,
        exportDate: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Projects Exported", {
      description: "Project data has been exported successfully.",
    });
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      assignee: 'all',
      dateRange: 'all'
    });
    setSearchQuery('');
  };

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
          {/* Export Button */}
          <Button variant="outline" size="sm" onClick={handleExportProjects}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          {/* Filter Button */}
          <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Projects</DialogTitle>
                <DialogDescription>
                  Filter projects by status, priority, category, and more.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority-filter">Priority</Label>
                  <Select
                    value={filters.priority}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category-filter">Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* New Project Button */}
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Set up a new project with team members, budget, and timeline.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="project-title">Project Title *</Label>
                    <Input
                      id="project-title"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter project title"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                {/* Category and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-category">Category *</Label>
                    <Select
                      value={newProject.category}
                      onValueChange={(value) => setNewProject(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Analytics">Analytics</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="project-priority">Priority</Label>
                    <Select
                      value={newProject.priority}
                      onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setNewProject(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget and Due Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-budget">Budget ($)</Label>
                    <Input
                      id="project-budget"
                      type="number"
                      value={newProject.budget}
                      onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="Enter budget"
                    />
                  </div>
                  
                  <div>
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newProject.dueDate ? newProject.dueDate.toLocaleDateString() : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newProject.dueDate}
                          onSelect={(date) => setNewProject(prev => ({ ...prev, dueDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="project-tags">Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="project-tags"
                      value={currentTagInput}
                      onChange={(e) => setCurrentTagInput(e.target.value)}
                      placeholder="Enter a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {newProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newProject.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-xs hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Team Members */}
                <div>
                  <Label>Team Members</Label>
                  <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.role}</div>
                          </div>
                        </div>
                        <Switch
                          checked={newProject.teamMembers.includes(member.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewProject(prev => ({
                                ...prev,
                                teamMembers: [...prev.teamMembers, member.id]
                              }));
                            } else {
                              setNewProject(prev => ({
                                ...prev,
                                teamMembers: prev.teamMembers.filter(id => id !== member.id)
                              }));
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-black min-h-screen">
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
                className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Kanban
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
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
          
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
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
          
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
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
          
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
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

          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">{totalTasks}</p>
                  <p className="text-sm text-gray-400">Total Tasks</p>
                </div>
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
                  <p className="text-sm text-gray-400">Tasks Done</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board View */}
        {viewMode === 'kanban' && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {kanbanColumns.map((column) => (
                <div
                  key={column.id}
                  className={`min-w-80 rounded-xl border-2 ${column.color} p-4`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{column.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {column.tasks.length}
                        {column.limit && `/${column.limit}`}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {column.tasks.map((task) => (
                      <Card
                        key={task.id}
                        className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-white text-sm leading-5 line-clamp-2">
                                {task.title}
                              </h4>
                              <GripVertical className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" />
                            </div>
                            
                            <p className="text-xs text-gray-400 line-clamp-2">
                              {task.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                                {getPriorityIcon(task.priority)}
                                <span className="capitalize">{task.priority}</span>
                              </div>
                              <div className="text-xs text-gray-400">
                                {task.dueDate.toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                                  {task.assignee.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                {task.comments > 0 && (
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>{task.comments}</span>
                                  </div>
                                )}
                                {task.attachments > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{task.attachments}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white line-clamp-1">{project.title}</h3>
                        <Star className="w-4 h-4 text-gray-600 hover:text-yellow-400 transition-colors cursor-pointer" />
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Status, Priority, and Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`border text-xs ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                          {getPriorityIcon(project.priority)}
                          <span className="capitalize">{project.priority}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                        {project.category}
                      </Badge>
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

                    {/* Due Date */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Due: {project.dueDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Target className="w-3 h-3" />
                        <span className="text-xs">{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Team */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-6 h-6 border-2 border-black">
                              <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center">
                              <span className="text-xs text-gray-300">+{project.team.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-gray-400">{project.team.length} members</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Owner: {project.owner.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{project.title}</h3>
                          <Badge className={`border text-xs ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ')}
                          </Badge>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                            {getPriorityIcon(project.priority)}
                            <span className="capitalize">{project.priority}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{project.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">{project.progress}%</div>
                          <div className="text-xs text-gray-400">Progress</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            ${(project.spent / 1000).toFixed(0)}k
                          </div>
                          <div className="text-xs text-gray-400">Spent</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            {project.tasks.completed}/{project.tasks.total}
                          </div>
                          <div className="text-xs text-gray-400">Tasks</div>
                        </div>
                        
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-8 h-8 border-2 border-black">
                              <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        
                        <div className="text-sm text-gray-400">
                          {project.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && viewMode !== 'kanban' && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? `No projects match "${searchQuery}"` : 'Get started by creating your first project'}
            </p>
            <div className="flex gap-2 justify-center">
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              )}
              <Button onClick={() => setIsNewProjectOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}