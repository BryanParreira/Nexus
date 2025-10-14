"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RiDatabase2Line,
  RiDashboardLine,
  RiProjectorLine,
  RiCalendarLine,
  RiTeamLine,
  RiChat1Line,
  RiCloseLine
} from "@remixicon/react";

// Updated data with workflow-based organization
const data = {
  user: {
    name: "Mark Bannert",
    email: "mark@bannert.com",
    avatar:
      "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp3/user_itiiaq.png",
  },
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: RiDashboardLine,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          title: "Chat",
          url: "/dashboard/chat",
          icon: RiChat1Line,
        },
        {
          title: "Team",
          url: "/dashboard/team",
          icon: RiTeamLine,
        },
      ],
    },
    {
      title: "Planning & Management",
      items: [
        {
          title: "Calendar",
          url: "/dashboard/calendar",
          icon: RiCalendarLine,
        },
        {
          title: "Projects",
          url: "/dashboard/projects",
          icon: RiProjectorLine,
        },
        {
          title: "Automation",
          url: "/dashboard/automation",
          icon: RiDatabase2Line,
        },
        {
          title: "Social Media",
          url: "/dashboard/socialmedia",
          icon: RiDatabase2Line,
        },
        {
          title: "CRM",
          url: "/dashboard/crm",
          icon: RiProjectorLine,
        }
      ],
    },
  ],
};

function SidebarLogo() {
  const id = React.useId();
  return (
    <div className="flex gap-2 px-2 group-data-[collapsible=icon]:px-0 transition-[padding] duration-200 ease-in-out">
      <Link className="group/logo inline-flex" href="/">
        <span className="sr-only">Logo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          className="size-9 group-data-[collapsible=icon]:size-8 transition-[width,height] duration-200 ease-in-out"
        >
          <path
            fill={`url(#${id})`}
            fillRule="evenodd"
            d="M12.972 2a6.806 6.806 0 0 0-4.813 1.993L2 10.153v2.819c0 1.991.856 3.783 2.22 5.028A6.788 6.788 0 0 0 2 23.028v2.82l6.16 6.159A6.806 6.806 0 0 0 18 31.78a6.806 6.806 0 0 0 9.841.226L34 25.847v-2.819A6.788 6.788 0 0 0 31.78 18 6.788 6.788 0 0 0 34 12.972v-2.82l-6.159-6.159A6.806 6.806 0 0 0 18 4.22 6.788 6.788 0 0 0 12.972 2Zm9.635 16a6.741 6.741 0 0 1-.226-.216L18 13.403l-4.381 4.381a6.741 6.741 0 0 1-.226.216c.077.07.152.142.226.216L18 22.597l4.381-4.381c.074-.074.15-.146.226-.216Zm-2.83 7.848v1.346a3.25 3.25 0 0 0 5.55 2.298l5.117-5.117v-1.347a3.25 3.25 0 0 0-5.549-2.298l-5.117 5.117Zm-3.555 0-5.117-5.118a3.25 3.25 0 0 0-5.55 2.298v1.347l5.118 5.117a3.25 3.25 0 0 0 5.55-2.298v-1.346Zm0-17.042v1.347l-5.117 5.117a3.25 3.25 0 0 1-5.55-2.298v-1.347l5.118-5.117a3.25 3.25 0 0 1 5.55 2.298Zm8.673 6.464-5.117-5.117V8.806a3.25 3.25 0 0 1 5.549-2.298l5.117 5.117v1.347a3.25 3.25 0 0 1-5.549 2.298Z"
            clipRule="evenodd"
          />
          <defs>
            <linearGradient
              id={id}
              x1="18"
              x2="18"
              y1="2"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F4F4F5" />
              <stop offset="1" stopColor="#A1A1AA" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
    </div>
  );
}

// Updated search data to match new structure (removed Settings)
const searchData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    description: "Main dashboard overview",
    keywords: ["home", "overview", "main", "dashboard"],
    icon: RiDashboardLine,
  },
  {
    title: "Chat",
    url: "/dashboard/chat",
    description: "Chat and messaging",
    keywords: ["message", "conversation", "talk", "chat", "communicate"],
    icon: RiChat1Line,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    description: "Team management",
    keywords: ["members", "users", "colleagues", "team", "staff"],
    icon: RiTeamLine,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    description: "Calendar and scheduling",
    keywords: ["events", "schedule", "appointments", "calendar", "date", "time"],
    icon: RiCalendarLine,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    description: "Project management",
    keywords: ["tasks", "work", "project", "management", "team"],
    icon: RiProjectorLine,
  },
  {
    title: "Schema",
    url: "/dashboard/schema",
    description: "Database schema and structure",
    keywords: ["database", "structure", "tables", "schema", "data"],
    icon: RiDatabase2Line,
  },
];

function SearchBar() {
  const id = React.useId();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Filter search results
  const searchResults = React.useMemo(() => {
    if (!searchTerm.trim()) return [];

    return searchData.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    }).slice(0, 5); // Limit to 5 results
  }, [searchTerm]);

  const navigateToResult = React.useCallback((result: typeof searchData[0]) => {
    console.log('📍 Starting navigation to:', result.url);
    try {
      router.push(result.url);
      console.log('✅ Router.push called successfully');
    } catch (error) {
      console.error('❌ Router.push failed:', error);
      // Fallback to window.location
      console.log('🔄 Trying window.location fallback');
      window.location.href = result.url;
    }
    setSearchTerm("");
    setIsSearchOpen(false);
    setSelectedIndex(0);
  }, [router]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global shortcut (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchOpen(true);
        return;
      }

      // Only handle these keys when input is focused
      if (document.activeElement === inputRef.current) {
        if (e.key === 'ArrowDown' && searchResults.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % searchResults.length);
        } else if (e.key === 'ArrowUp' && searchResults.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? searchResults.length - 1 : prev - 1);
        }
      }
      
      // ESC key handling
      if (e.key === 'Escape') {
        if (searchTerm) {
          setSearchTerm("");
          setSelectedIndex(0);
        } else {
          setIsSearchOpen(false);
          inputRef.current?.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchResults.length, searchTerm]);

  // Reset selected index when search term changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setIsSearchOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔍 Form submitted with term:', searchTerm);
    console.log('🔍 Available results:', searchResults.length);
    console.log('🔍 Selected index:', selectedIndex);
    console.log('🔍 SearchData exists:', !!searchData);
    
    if (searchResults.length > 0) {
      const selectedResult = searchResults[selectedIndex];
      console.log('🚀 Navigating to:', selectedResult.url);
      navigateToResult(selectedResult);
    } else {
      console.log('❌ No results found for:', searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchOpen(false);
    setSelectedIndex(0);
  };

  const handleResultClick = (result: typeof searchData[0]) => {
    navigateToResult(result);
  };

  return (
    <div className="px-3 pb-2 group-data-[collapsible=icon]:px-2 relative">
      <Label htmlFor={id} className="sr-only">
        Search app
      </Label>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            id={id}
            className="h-8 pe-16 group-data-[collapsible=icon]:pe-8"
            placeholder="Search app..."
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchTerm.trim()) {
                setIsSearchOpen(true);
              }
            }}
          />
          
          {/* Clear button and keyboard shortcut */}
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-1">
            {searchTerm ? (
              <button
                type="button"
                onClick={clearSearch}
                className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                aria-label="Clear search"
              >
                <RiCloseLine className="size-3 text-muted-foreground/70" />
              </button>
            ) : (
              <div className="group-data-[collapsible=icon]:hidden">
                <kbd className="text-muted-foreground/70 pointer-events-none inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isSearchOpen && searchTerm.trim() && searchResults.length > 0 && (
        <div className="absolute top-full left-3 right-3 group-data-[collapsible=icon]:left-2 group-data-[collapsible=icon]:right-2 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-1">
            {searchResults.map((result, index) => (
              <button
                key={result.url}
                type="button"
                onMouseDown={() => handleResultClick(result)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 transition-colors ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
              >
                <result.icon className="size-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                  <div className="font-medium text-sm truncate">
                    {result.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {result.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="h-16 max-md:mt-2 mb-2 justify-center">
        <SidebarLogo />
      </SidebarHeader>
      
      {/* Global Search Bar */}
      <div className="mb-2">
        <SearchBar />
      </div>

      <SidebarContent className="-mt-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => {
                  // Check if current path matches this item's URL
                  const isActive = pathname === navItem.url || 
                    (navItem.url === "/dashboard" && pathname === "/");
                  
                  return (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
                        tooltip={navItem.title}
                        isActive={isActive}
                      >
                        <Link href={navItem.url}>
                          {navItem.icon && (
                            <navItem.icon
                              className="text-muted-foreground/65 group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{navItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}