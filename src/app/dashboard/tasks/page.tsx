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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Flag,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Copy,
  Eye,
  Target,
  TrendingUp,
  Download,
  Archive,
  SortAsc,
  SortDesc,
  X,
  Star,
  MessageSquare,
  Paperclip,
  Timer,
  PlayCircle,
  PauseCircle,
  StopCircle,
  BarChart3
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: {
    id: string;
    name: string;
    initials: string;
  };
  dueDate: Date;
  project: string;
  tags: string[];
  estimatedHours: number;
  actualHours: number;
  comments: number;
  attachments: number;
  subtasks: { id: string; title: string; completed: boolean }[];
  isStarred: boolean;
  timeTracking: {
    isActive: boolean;
    startTime?: Date;
    totalTime: number;
  };
}

interface NewTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string;
  dueDate: Date | undefined;
  project: string;
  tags: string[];
  estimatedHours: string;
}

const teamMembers = [
  { id: "1", name: "John Doe", initials: "JD" },
  { id: "2", name: "Jane Smith", initials: "JS" },
  { id: "3", name: "Mike Johnson", initials: "MJ" },
  { id: "4", name: "Sarah Wilson", initials: "SW" },
  { id: "5", name: "Alex Chen", initials: "AC" },
];

const projects = [
  "Auth System", "UI/UX", "DevOps", "Documentation", "Mobile App", "Analytics"
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Set up OAuth integration with Google and GitHub",
    status: "in-progress",
    priority: "high",
    assignee: teamMembers[0],
    dueDate: new Date('2024-12-25'),
    project: "Auth System",
    tags: ["Backend", "Security"],
    estimatedHours: 16,
    actualHours: 8,
    comments: 5,
    attachments: 2,
    subtasks: [
      { id: "1-1", title: "Setup OAuth providers", completed: true },
      { id: "1-2", title: "Implement login flow", completed: false }
    ],
    isStarred: true,
    timeTracking: {
      isActive: true,
      startTime: new Date(),
      totalTime: 480
    }
  },
  {
    id: "2",
    title: "Design dashboard mockups",
    description: "Create wireframes and high-fidelity designs",
    status: "todo",
    priority: "medium",
    assignee: teamMembers[1],
    dueDate: new Date('2024-12-30'),
    project: "UI/UX",
    tags: ["Design", "Frontend"],
    estimatedHours: 12,
    actualHours: 0,
    comments: 2,
    attachments: 8,
    subtasks: [],
    isStarred: false,
    timeTracking: {
      isActive: false,
      totalTime: 0
    }
  },
  {
    id: "3",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing",
    status: "done",
    priority: "high",
    assignee: teamMembers[2],
    dueDate: new Date('2024-12-20'),
    project: "DevOps",
    tags: ["DevOps", "Automation"],
    estimatedHours: 8,
    actualHours: 6,
    comments: 3,
    attachments: 1,
    subtasks: [
      { id: "3-1", title: "Setup GitHub Actions", completed: true },
      { id: "3-2", title: "Configure testing", completed: true }
    ],
    isStarred: false,
    timeTracking: {
      isActive: false,
      totalTime: 360
    }
  }
];

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentTagInput, setCurrentTagInput] = useState('');
  
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);

  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: '',
    dueDate: undefined,
    project: '',
    tags: [],
    estimatedHours: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done": 
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "in-progress": 
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "in-review": 
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "todo": 
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case "blocked": 
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default: 
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": 
        return "text-red-400 bg-red-500/10";
      case "high": 
        return "text-orange-400 bg-orange-500/10";
      case "medium": 
        return "text-yellow-400 bg-yellow-500/10";
      case "low": 
        return "text-green-400 bg-green-500/10";
      default: 
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": 
        return <AlertTriangle className="w-3 h-3" />;
      case "high": 
        return <TrendingUp className="w-3 h-3" />;
      case "medium": 
        return <Flag className="w-3 h-3" />;
      case "low": 
        return <Target className="w-3 h-3" />;
      default: 
        return <Flag className="w-3 h-3" />;
    }
  };

  // Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' || t.priority === 'urgent').length;

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(task.status);
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(task.priority);
    const matchesAssignee = assigneeFilter.length === 0 || assigneeFilter.includes(task.assignee.id);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // Handle functions
  const handleAddTag = () => {
    if (currentTagInput.trim() && !newTask.tags.includes(currentTagInput.trim())) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, currentTagInput.trim()]
      }));
      setCurrentTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Validation Error", {
        description: "Task title is required.",
      });
      return;
    }

    if (!newTask.assigneeId) {
      toast.error("Validation Error", {
        description: "Please assign the task to a team member.",
      });
      return;
    }

    const assignee = teamMembers.find(member => member.id === newTask.assigneeId);
    if (!assignee) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      assignee,
      dueDate: newTask.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      project: newTask.project || 'General',
      tags: newTask.tags,
      estimatedHours: parseInt(newTask.estimatedHours) || 0,
      actualHours: 0,
      comments: 0,
      attachments: 0,
      subtasks: [],
      isStarred: false,
      timeTracking: {
        isActive: false,
        totalTime: 0
      }
    };

    setTasks(prev => [task, ...prev]);
    
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assigneeId: '',
      dueDate: undefined,
      project: '',
      tags: [],
      estimatedHours: ''
    });
    
    setIsNewTaskOpen(false);
    
    toast.success("Task Created", {
      description: `Task "${task.title}" has been created.`,
    });
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'todo' : 'done';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const handleToggleStarred = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, isStarred: !task.isStarred };
      }
      return task;
    }));
  };

  const handleTimeTracking = (taskId: string, action: 'start' | 'pause' | 'stop') => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task };
        
        switch (action) {
          case 'start':
            updatedTask.timeTracking = {
              ...task.timeTracking,
              isActive: true,
              startTime: new Date()
            };
            break;
          case 'pause':
          case 'stop':
            if (task.timeTracking.startTime) {
              const timeSpent = Date.now() - task.timeTracking.startTime.getTime();
              updatedTask.timeTracking = {
                isActive: false,
                totalTime: task.timeTracking.totalTime + Math.floor(timeSpent / 60000)
              };
            }
            break;
        }
        
        return updatedTask;
      }
      return task;
    }));

    toast.success("Time Tracking", {
      description: `Timer ${action}ed for task.`,
    });
  };

  const handleExportTasks = () => {
    const exportData = {
      tasks: filteredTasks,
      summary: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        highPriorityTasks,
        exportDate: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Tasks Exported", {
      description: "Task data has been exported successfully.",
    });
  };

  const clearFilters = () => {
    setStatusFilter([]);
    setPriorityFilter([]);
    setAssigneeFilter([]);
    setSearchQuery('');
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressPercentage = (task: Task) => {
    if (task.subtasks.length === 0) {
      return task.status === 'done' ? 100 : 0;
    }
    const completed = task.subtasks.filter(st => st.completed).length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  return (
    <div className="w-full h-full bg-black">
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b border-gray-800 bg-black">
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
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportTasks}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Tasks</DialogTitle>
                <DialogDescription>
                  Filter tasks by status, priority, and assignee.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Status</Label>
                  <div className="space-y-2 mt-2">
                    {['todo', 'in-progress', 'in-review', 'done', 'blocked'].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          checked={statusFilter.includes(status)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setStatusFilter(prev => [...prev, status]);
                            } else {
                              setStatusFilter(prev => prev.filter(s => s !== status));
                            }
                          }}
                        />
                        <label className="text-sm capitalize">
                          {status.replace('-', ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Priority</Label>
                  <div className="space-y-2 mt-2">
                    {['urgent', 'high', 'medium', 'low'].map(priority => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox
                          checked={priorityFilter.includes(priority)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPriorityFilter(prev => [...prev, priority]);
                            } else {
                              setPriorityFilter(prev => prev.filter(p => p !== priority));
                            }
                          }}
                        />
                        <label className="text-sm capitalize">{priority}</label>
                      </div>
                    ))}
                  </div>
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
          
          <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Create a new task and assign it to a team member.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="task-title">Task Title *</Label>
                  <Input
                    id="task-title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea
                    id="task-description"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => 
                        setNewTask(prev => ({ ...prev, priority: value }))
                      }
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
                  
                  <div>
                    <Label>Assignee *</Label>
                    <Select
                      value={newTask.assigneeId}
                      onValueChange={(value) => setNewTask(prev => ({ ...prev, assigneeId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map(member => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Project</Label>
                    <Select
                      value={newTask.project}
                      onValueChange={(value) => setNewTask(prev => ({ ...prev, project: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTask.dueDate ? newTask.dueDate.toLocaleDateString() : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTask.dueDate}
                          onSelect={(date) => setNewTask(prev => ({ ...prev, dueDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentTagInput}
                      onChange={(e) => setCurrentTagInput(e.target.value)}
                      placeholder="Enter a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {newTask.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newTask.tags.map((tag, index) => (
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
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewTaskOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-black min-h-screen">
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
                className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
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
              <Button 
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Board
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{totalTasks}</p>
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
                  <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
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
                  <p className="text-2xl font-bold text-blue-400">{inProgressTasks}</p>
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
                  <p className="text-2xl font-bold text-red-400">{highPriorityTasks}</p>
                  <p className="text-sm text-gray-400">High Priority</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Checkbox
                          checked={task.status === 'done'}
                          onCheckedChange={() => handleToggleTaskStatus(task.id)}
                          className="data-[state=checked]:bg-green-600"
                        />
                        <h3 className={`font-semibold text-white line-clamp-2 ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStarred(task.id)}
                          className={`p-0 h-auto ${task.isStarred ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-400`}
                        >
                          <Star className="w-4 h-4" fill={task.isStarred ? 'currentColor' : 'none'} />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
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
                          Edit Task
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`border text-xs ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {getPriorityIcon(task.priority)}
                          <span className="capitalize">{task.priority}</span>
                        </div>
                      </div>
                    </div>

                    {task.subtasks.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-sm font-semibold text-white">{getProgressPercentage(task)}%</span>
                        </div>
                        <Progress value={getProgressPercentage(task)} className="h-2 bg-white/10" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <span>{formatTime(task.timeTracking.totalTime)}</span>
                        {task.estimatedHours > 0 && (
                          <span className="text-gray-500"> / {task.estimatedHours}h</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {task.timeTracking.isActive ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTimeTracking(task.id, 'pause')}
                            className="h-6 px-2"
                          >
                            <PauseCircle className="w-3 h-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTimeTracking(task.id, 'start')}
                            className="h-6 px-2"
                          >
                            <PlayCircle className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTimeTracking(task.id, 'stop')}
                          className="h-6 px-2"
                        >
                          <StopCircle className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {task.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                      {task.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                          +{task.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-400">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <CalendarIcon className="w-3 h-3" />
                        <span className="text-xs">{task.dueDate.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Project: {task.project}</span>
                      <div className="flex items-center gap-3">
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
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Checkbox
                        checked={task.status === 'done'}
                        onCheckedChange={() => handleToggleTaskStatus(task.id)}
                        className="data-[state=checked]:bg-green-600"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold text-white truncate ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>
                            {task.title}
                          </h3>
                          {task.isStarred && (
                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          )}
                          <Badge className={`border text-xs ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                            {getPriorityIcon(task.priority)}
                            <span className="capitalize">{task.priority}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{task.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            {task.assignee.name}
                          </div>
                          <div className="text-xs text-gray-400">Assignee</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            {task.dueDate.toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">Due Date</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            {formatTime(task.timeTracking.totalTime)}
                          </div>
                          <div className="text-xs text-gray-400">Time Spent</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white">
                            {getProgressPercentage(task)}%
                          </div>
                          <div className="text-xs text-gray-400">Progress</div>
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
                          Edit Task
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

        {/* Kanban Board View */}
        {viewMode === 'kanban' && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {[
                { id: 'todo', title: 'To Do', color: 'border-gray-600 bg-gray-900/50' },
                { id: 'in-progress', title: 'In Progress', color: 'border-blue-600 bg-blue-900/20' },
                { id: 'in-review', title: 'In Review', color: 'border-purple-600 bg-purple-900/20' },
                { id: 'done', title: 'Done', color: 'border-green-600 bg-green-900/20' },
                { id: 'blocked', title: 'Blocked', color: 'border-red-600 bg-red-900/20' }
              ].map((column) => {
                const columnTasks = filteredTasks.filter(task => task.status === column.id);
                
                return (
                  <div
                    key={column.id}
                    className={`min-w-80 rounded-xl border-2 ${column.color} p-4`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{column.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {columnTasks.length}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-move"
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={task.status === 'done'}
                                    onCheckedChange={() => handleToggleTaskStatus(task.id)}
                                    className="data-[state=checked]:bg-green-600"
                                  />
                                  <h4 className={`font-medium text-white text-sm leading-5 line-clamp-2 ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>
                                    {task.title}
                                  </h4>
                                </div>
                                {task.isStarred && (
                                  <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" />
                                )}
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

                              {task.subtasks.length > 0 && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Progress</span>
                                    <span className="text-xs font-semibold text-white">{getProgressPercentage(task)}%</span>
                                  </div>
                                  <Progress value={getProgressPercentage(task)} className="h-1 bg-white/10" />
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
                                    {task.assignee.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Timer className="w-3 h-3" />
                                    <span>{formatTime(task.timeTracking.totalTime)}</span>
                                  </div>
                                  {task.comments > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="w-3 h-3" />
                                      <span>{task.comments}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {task.timeTracking.isActive && (
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-xs text-green-400">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>Timer running</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleTimeTracking(task.id, 'pause')}
                                      className="h-5 px-2 text-xs"
                                    >
                                      <PauseCircle className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleTimeTracking(task.id, 'stop')}
                                      className="h-5 px-2 text-xs"
                                    >
                                      <StopCircle className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Tasks Found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery || (statusFilter.length + priorityFilter.length + assigneeFilter.length) > 0
                ? "No tasks match your current filters" 
                : "Get started by creating your first task"}
            </p>
            <div className="flex gap-2 justify-center">
              {(searchQuery || (statusFilter.length + priorityFilter.length + assigneeFilter.length) > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
              <Button onClick={() => setIsNewTaskOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}