// components/dashboard/header.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Plus,
  Command,
  ChevronDown
} from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
  onSidebarToggle: () => void
  sidebarCollapsed: boolean
}

// Mock notifications data
const notifications = [
  {
    id: "1",
    title: "New task assigned",
    description: "You have been assigned to 'Website Redesign' project",
    time: "2 minutes ago",
    read: false,
    type: "task"
  },
  {
    id: "2",
    title: "Meeting reminder",
    description: "Daily standup meeting starts in 15 minutes",
    time: "13 minutes ago",
    read: false,
    type: "meeting"
  },
  {
    id: "3",
    title: "Project update",
    description: "Mobile App project has been completed",
    time: "1 hour ago",
    read: true,
    type: "update"
  },
  {
    id: "4",
    title: "Comment on task",
    description: "Alice commented on 'API Documentation' task",
    time: "2 hours ago",
    read: true,
    type: "comment"
  }
]

export function Header({ onMenuClick, onSidebarToggle, sidebarCollapsed }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="h-16 bg-background border-b border-border/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop sidebar toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="hidden lg:flex p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects, tasks, team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64 lg:w-80 bg-background/50 border-border/50"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Quick actions */}
        <Button size="sm" className="hidden sm:flex">
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>

        {/* Search button for mobile */}
        <Button
          variant="ghost"
          size="sm"
          className="sm:hidden p-2"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b border-border/50 hover:bg-accent/20 cursor-pointer transition-colors",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      !notification.read ? "bg-primary" : "bg-transparent"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-5 w-5" />
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="sm" className="p-2">
          <Moon className="h-5 w-5" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/api/placeholder/36/36" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  SS
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Sofia Safier</p>
                <p className="text-xs leading-none text-muted-foreground">
                  sofia@company.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}