// components/dashboard/sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Calendar,
  Database,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
  Search,
  Plus
} from "lucide-react"

const navigation = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    name: "Projects", 
    href: "/dashboard/projects", 
    icon: FolderOpen,
    badge: "12"
  },
  { 
    name: "Tasks", 
    href: "/dashboard/tasks", 
    icon: CheckSquare,
    badge: "8"
  },
  { 
    name: "Calendar", 
    href: "/dashboard/calendar", 
    icon: Calendar,
    badge: null
  },
  { 
    name: "Schema", 
    href: "/dashboard/schema", 
    icon: Database,
    badge: null
  },
  { 
    name: "Team", 
    href: "/dashboard/team", 
    icon: Users,
    badge: "5"
  },
]

const secondaryNavigation = [
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings 
  },
]

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCollapse: (collapsed: boolean) => void
  onMobileClose: () => void
}

export function Sidebar({ 
  collapsed, 
  mobileOpen, 
  onCollapse, 
  onMobileClose 
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-30 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out hidden lg:flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-sidebar-primary-foreground rounded-sm"></div>
              </div>
              <h1 className="text-lg font-bold text-sidebar-foreground">ProjectFlow</h1>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapse(!collapsed)}
            className="p-2 hover:bg-sidebar-accent"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 text-sidebar-foreground transition-transform duration-200",
              collapsed && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 px-3 transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "px-2"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
          
          {/* Divider */}
          <div className="my-4 border-t border-sidebar-border"></div>
          
          {/* Secondary Navigation */}
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 px-3 transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "px-2"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="flex-1 text-left">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer",
            collapsed && "justify-center"
          )}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                SS
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Sofia Safier</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">sofia@company.com</p>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:hidden",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-sidebar-primary-foreground rounded-sm"></div>
            </div>
            <h1 className="text-lg font-bold text-sidebar-foreground">ProjectFlow</h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose}
            className="p-2 hover:bg-sidebar-accent"
          >
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href} onClick={onMobileClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 px-3 transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
          
          {/* Divider */}
          <div className="my-4 border-t border-sidebar-border"></div>
          
          {/* Secondary Navigation */}
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href} onClick={onMobileClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 px-3 transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                SS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Sofia Safier</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">sofia@company.com</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </>
  )
}