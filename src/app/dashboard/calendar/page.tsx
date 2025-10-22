// app/dashboard/social/page.tsx
"use client";
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
import { 
  Plus,
  Filter,
  Calendar as CalendarIcon,
  LayoutGrid,
  Settings
} from 'lucide-react';
import { useState } from "react";
import SocialMediaFeed from "@/components/social-media-feed";
import SocialMediaCalendar from "@/components/social-media-calendar";
import CreatePostDialog from "@/components/create-post-dialog";
import FilterDialog from "@/components/filter-dialog";

const SocialPage: React.FC = () => {
  const [view, setView] = useState<"feed" | "calendar">("feed");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b">
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Social Media</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={view === "feed" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("feed")}
              className="rounded-r-none"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Feed
            </Button>
            <Button
              variant={view === "calendar" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
              className="rounded-l-none"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button 
            size="sm"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </header>
      
      {/* Content area */}
      <div className="h-[calc(100vh-5rem)] w-full overflow-auto">
        {view === "feed" ? <SocialMediaFeed /> : <SocialMediaCalendar />}
      </div>

      {/* Dialogs */}
      <CreatePostDialog 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen}
      />
      <FilterDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      />
    </div>
  );
};

export default SocialPage;