// src/components/app-sidebar.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LayoutDashboard,
  FolderOpen,
  Calendar,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  FileText,
  Zap,
  MessageSquare,
  Bell,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  LogOut,
  User,
  Moon,
  Sun,
  Bookmark,
  Clock,
  Star,
  Activity,
  Target,
  Layers,
  GitBranch,
  Database
} from 'lucide-react'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  { 
    name: 'Projects', 
    href: '/dashboard/projects', 
    icon: FolderOpen,
    description: 'Manage Projects',
    badge: 12
  },
  { 
    name: 'Tasks', 
    href: '/dashboard/tasks', 
    icon: CheckSquare,
    description: 'Task Management',
    badge: 8,
    urgent: true
  },
  { 
    name: 'Calendar', 
    href: '/dashboard/calendar', 
    icon: Calendar,
    description: 'Schedule & Events'
  },
  { 
    name: 'Team', 
    href: '/dashboard/team', 
    icon: Users,
    description: 'Team Management'
  },
]

const secondaryNavigation = [
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart3,
    description: 'Reports & Insights'
  },
  { 
    name: 'Schema', 
    href: '/dashboard/schema', 
    icon: Database,
    description: 'Database Schema'
  },
  { 
    name: 'Messages', 
    href: '/dashboard/messages', 
    icon: MessageSquare,
    description: 'Team Communication',
    badge: 3
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    description: 'App Configuration'
  },
]

const recentProjects = [
  {
    name: "E-Commerce Platform",
    progress: 75,
    color: "bg-blue-500",
    href: "/dashboard/projects/1"
  },
  {
    name: "Mobile Analytics",
    progress: 90,
    color: "bg-emerald-500",
    href: "/dashboard/projects/2"
  },
  {
    name: "Brand Identity",
    progress: 25,
    color: "bg-purple-500",
    href: "/dashboard/projects/3"
  }
]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showRecentProjects, setShowRecentProjects] = useState(true)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className={cn(
      "flex h-screen flex-col bg-[#111111] border-r border-white/5 transition-all duration-300",
      isCollapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">ProjectFlow</span>
              <div className="text-xs text-gray-400">v2.1.0</div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight className={cn("w-4 h-4 transition-transform", isCollapsed ? "rotate-0" : "rotate-180")} />
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-b border-white/5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-xl text-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-lg font-bold text-white">24</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl text-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-lg font-bold text-emerald-400">87%</div>
              <div className="text-xs text-gray-400">Complete</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "sidebar-item group relative",
                  active && "active",
                  isCollapsed && "justify-center px-3"
                )}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    active ? "text-white" : "text-gray-400 group-hover:text-white"
                  )} />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">{item.description}</div>
                    </div>
                  )}
                </div>
                {!isCollapsed && item.badge && (
                  <Badge className={cn(
                    "text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center",
                    item.urgent 
                      ? "bg-red-500/20 text-red-400 animate-pulse" 
                      : "bg-blue-500/20 text-blue-400"
                  )}>
                    {item.badge}
                  </Badge>
                )}
                {isCollapsed && item.badge && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{item.badge}</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Recent Projects */}
        {!isCollapsed && (
          <div className="pt-6">
            <div className="flex items-center justify-between px-3 mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Projects</h3>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto text-gray-400 hover:text-white"
                onClick={() => setShowRecentProjects(!showRecentProjects)}
              >
                <ChevronDown className={cn("w-3 h-3 transition-transform", showRecentProjects ? "rotate-0" : "-rotate-90")} />
              </Button>
            </div>
            {showRecentProjects && (
              <div className="space-y-2">
                {recentProjects.map((project, index) => (
                  <Link
                    key={index}
                    href={project.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate group-hover:text-blue-300 transition-colors">
                        {project.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={project.progress} className="h-1 flex-1 bg-white/10">
                          <div 
                            className={`h-full ${project.color} rounded-full transition-all duration-500`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </Progress>
                        <span className="text-xs text-gray-400">{project.progress}%</span>
                      </div>
                    </div>
                  </Link>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="pt-6 border-t border-white/5 space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools & Settings
            </h3>
          )}
          {secondaryNavigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "sidebar-item group relative",
                  active && "active",
                  isCollapsed && "justify-center px-3"
                )}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    active ? "text-white" : "text-gray-400 group-hover:text-white"
                  )} />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">{item.description}</div>
                    </div>
                  )}
                </div>
                {!isCollapsed && item.badge && (
                  <Badge className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5">
                    {item.badge}
                  </Badge>
                )}
                {isCollapsed && item.badge && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{item.badge}</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/5 p-4">
        {!isCollapsed ? (
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-gray-400 hover:text-white hover:bg-white/10 justify-start"
              >
                <Bell className="w-4 h-4 mr-2" />
                <span className="relative">
                  Notifications
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Moon className="w-4 h-4" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    J
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111111]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Jonathon</p>
                <p className="text-xs text-gray-400 truncate">Project Manager</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full p-2 text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10 mx-auto ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all cursor-pointer">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                J
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  )
}