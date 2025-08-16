// src/app/dashboard/layout.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard,
  FolderOpen,
  Calendar,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  Menu,
  X,
  FileText,
  Filter,
  Grid3X3,
  List,
  ChartArea,
  Icon,
  MessageSquare,
  ChartAreaIcon
} from 'lucide-react'
import Chat from '@/components/chat'
import { ChatMessage } from '@/components/chat-message'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Schema', href: '/dashboard/schema', icon: FileText },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, badge: 3 },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
]

const secondaryNavigation = [
  { name: 'Team', href: '/dashboard/team', icon: Users },
  
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getPageTitle = () => {
    const navItem = [...navigation, ...secondaryNavigation].find(item => item.href === pathname)
    return navItem?.name || 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ProjectFlow</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10 p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}

            <div className="border-t border-white/5 pt-4 mt-6 space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-white/10 text-white" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                    J
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111111]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Jonathon</p>
                <p className="text-xs text-gray-400 truncate">jonathon@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10 p-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <h1 className="text-xl font-bold text-white">
                {getPageTitle()}
              </h1>
              {pathname === '/dashboard/projects' && (
                <p className="text-sm text-gray-400 hidden sm:block">
                  Manage and track all your projects in one place
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-400 hover:text-white hover:bg-white/10 p-2"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  2
                </span>
              </Button>

              {/* Add button */}
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>

              {/* User menu */}
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  J
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}