// app/dashboard/team/page.tsx
"use client";

import type { Metadata } from "next";
import { useId, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TeamTable } from "@/components/team-table";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { 
  Plus,
  Download,
  Settings,
  Users,
  FileText,
  FileSpreadsheet,
  Image,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Globe,
  Bell,
  Shield,
  Palette,
  Database,
  UserPlus,
  Trash2,
  Edit,
  Upload,
  CheckIcon,
  CopyIcon,
  UserRoundPlusIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface TeamSettings {
  autoSync: boolean;
  notifications: boolean;
  emailUpdates: boolean;
  dataBackup: boolean;
  shareContacts: boolean;
  exportFormat: 'csv' | 'xlsx' | 'json';
  theme: 'light' | 'dark' | 'auto';
  itemsPerPage: number;
  defaultView: 'table' | 'grid' | 'list';
}

// Team member data
const teamMembers = [
  {
    id: "TRD-64851",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    name: "Alex Allan",
    status: "Inactive",
    location: "São Paulo, BR",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "2023-01-15",
  },
  {
    id: "WTY-78045",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
    name: "Anna Visconti",
    status: "Active",
    location: "Rome, IT",
    role: "Product Manager",
    department: "Product",
    joinDate: "2022-08-20",
  },
  {
    id: "FWH-68247",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Astrid",
    name: "Astrid Andersen",
    status: "Inactive",
    location: "Oslo, NO",
    role: "UX Designer",
    department: "Design",
    joinDate: "2023-03-10",
  },
  {
    id: "NBQ-30871",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    name: "David Kim",
    status: "Inactive",
    location: "Paris, FR",
    role: "Marketing Lead",
    department: "Marketing",
    joinDate: "2022-11-05",
  },
  {
    id: "ZXP-40865",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
    name: "Diego Mendoza",
    status: "Active",
    location: "Mexico City, MX",
    role: "DevOps Engineer",
    department: "Engineering",
    joinDate: "2023-06-15",
  },
  {
    id: "XCU-85036",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatim",
    name: "Fatim Al-Sayed",
    status: "Active",
    location: "Cairo, EG",
    role: "Data Analyst",
    department: "Analytics",
    joinDate: "2023-04-22",
  },
  {
    id: "LZR-37429",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
    name: "Hiroshi Yamamoto",
    status: "Active",
    location: "Osaka, JP",
    role: "Frontend Developer",
    department: "Engineering",
    joinDate: "2022-09-18",
  },
  {
    id: "MKL-92341",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    name: "Sarah Johnson",
    status: "Active",
    location: "New York, NY",
    role: "Team Lead",
    department: "Engineering",
    joinDate: "2021-05-12",
  },
  {
    id: "PLO-65432",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    name: "James Wilson",
    status: "Active",
    location: "London, UK",
    role: "Backend Developer",
    department: "Engineering",
    joinDate: "2022-12-03",
  },
  {
    id: "QWE-78912",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    name: "Maria Garcia",
    status: "Inactive",
    location: "Madrid, ES",
    role: "HR Manager",
    department: "Human Resources",
    joinDate: "2023-02-28",
  },
];

// Invite Members Dialog Component
function InviteMembersDialog({ children }: { children: React.ReactNode }) {
  const id = useId();
  const [emails, setEmails] = useState([
    "mark@yourcompany.com",
    "jane@yourcompany.com",
    "",
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleSendInvites = () => {
    const validEmails = emails.filter(email => email.trim() !== '');
    if (validEmails.length === 0) {
      toast.error("No valid emails", {
        description: "Please enter at least one email address.",
      });
      return;
    }

    console.log('Sending invites to:', validEmails);
    
    toast.success("Invites Sent", {
      description: `Invitations have been sent to ${validEmails.length} team members.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          lastInputRef.current?.focus();
        }}
      >
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <UserRoundPlusIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Invite team members</DialogTitle>
            <DialogDescription className="text-left">
              Invite teammates to join your team and collaborate.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label>Invite via email</Label>
              <div className="space-y-3">
                {emails.map((email, index) => (
                  <Input
                    key={index}
                    id={`team-email-${index + 1}`}
                    placeholder="hi@yourcompany.com"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    ref={index === emails.length - 1 ? lastInputRef : undefined}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={addEmail}
              className="text-sm underline hover:no-underline"
            >
              + Add another
            </button>
          </div>
          <Button type="button" className="w-full" onClick={handleSendInvites}>
            Send invites
          </Button>
        </form>

        <hr className="my-1 border-t" />

        <div className="*:not-first:mt-2">
          <Label htmlFor={id}>Invite via magic link</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              id={id}
              className="pe-9"
              type="text"
              defaultValue="https://yourteam.com/refer/87689"
              readOnly
            />
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                  >
                    <div
                      className={cn(
                        "transition-all",
                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    >
                      <CheckIcon
                        size={16}
                        strokeWidth={2}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all",
                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                      )}
                    >
                      <CopyIcon size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                  {copied ? "Copied!" : "Copy link"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TeamPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    autoSync: true,
    notifications: true,
    emailUpdates: false,
    dataBackup: true,
    shareContacts: false,
    exportFormat: 'csv',
    theme: 'auto',
    itemsPerPage: 10,
    defaultView: 'table',
  });

  const handleExport = (format: 'csv' | 'xlsx' | 'json') => {
    console.log(`Exporting data as ${format}`);
    toast.success("Export Started", {
      description: `Your team data is being exported as ${format.toUpperCase()}.`,
    });
  };

  const handleImportContacts = () => {
    console.log('Opening import dialog');
    toast.info("Import Contacts", {
      description: "Import functionality coming soon!",
    });
  };

  const handleBulkActions = () => {
    console.log('Opening bulk actions');
    toast.info("Bulk Actions", {
      description: "Bulk actions functionality coming soon!",
    });
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', teamSettings);
    toast.success("Settings Saved", {
      description: "Your team settings have been updated successfully.",
    });
    setIsSettingsOpen(false);
  };

  return (
    <div className="w-full h-full">
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
                  <BreadcrumbPage>Team</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileText className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('xlsx')}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <Database className="w-4 h-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dialog */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Team Settings</DialogTitle>
                <DialogDescription>
                  Manage your team preferences and configurations
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* General Settings */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    General
                  </h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync">Auto Sync</Label>
                    <Switch
                      id="auto-sync"
                      checked={teamSettings.autoSync}
                      onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, autoSync: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-backup">Automatic Backup</Label>
                    <Switch
                      id="data-backup"
                      checked={teamSettings.dataBackup}
                      onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, dataBackup: checked }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="export-format">Default Export Format</Label>
                    <Select
                      value={teamSettings.exportFormat}
                      onValueChange={(value: 'csv' | 'xlsx' | 'json') => setTeamSettings(prev => ({ ...prev, exportFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Notifications */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <Switch
                      id="notifications"
                      checked={teamSettings.notifications}
                      onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <Switch
                      id="email-updates"
                      checked={teamSettings.emailUpdates}
                      onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, emailUpdates: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                {/* Privacy & Sharing */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Privacy & Sharing
                  </h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-contacts">Allow Contact Sharing</Label>
                    <Switch
                      id="share-contacts"
                      checked={teamSettings.shareContacts}
                      onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, shareContacts: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                {/* Display & Interface */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Display & Interface
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={teamSettings.theme}
                        onValueChange={(value: 'light' | 'dark' | 'auto') => setTeamSettings(prev => ({ ...prev, theme: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="default-view">Default View</Label>
                      <Select
                        value={teamSettings.defaultView}
                        onValueChange={(value: 'table' | 'grid' | 'list') => setTeamSettings(prev => ({ ...prev, defaultView: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="table">Table</SelectItem>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="items-per-page">Items Per Page</Label>
                    <Select
                      value={teamSettings.itemsPerPage.toString()}
                      onValueChange={(value) => setTeamSettings(prev => ({ ...prev, itemsPerPage: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium">Data Management</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={handleImportContacts}>
                      <Upload className="w-4 h-4 mr-2" />
                      Import Contacts
                    </Button>
                    <Button variant="outline" onClick={handleBulkActions}>
                      <Edit className="w-4 h-4 mr-2" />
                      Bulk Actions
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Invite Members Button */}
          <InviteMembersDialog>
            <Button size="sm">
              <UserRoundPlusIcon className="w-4 h-4 mr-2" />
              Invite Members
            </Button>
          </InviteMembersDialog>
        </div>
      </header>
      
      <div className="overflow-hidden px-4 md:px-6 lg:px-8">
        <div className="@container/main flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          {/* Team Health Metrics - Gradient Cards */}
          <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {/* Team Members */}
            <Card className="@container/card from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader>
                <CardDescription>Team Members</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  10
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconTrendingUp className="w-4 h-4" />
                    +2 new hires
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Growing team <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Added 2 members this month
                </div>
              </CardFooter>
            </Card>

            {/* Active Status */}
            <Card className="@container/card from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader>
                <CardDescription>Active Status</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  7 Active
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconTrendingUp className="w-4 h-4" />
                    70% active rate
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Strong engagement <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  High team activity rate
                </div>
              </CardFooter>
            </Card>

            {/* Departments */}
            <Card className="@container/card from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader>
                <CardDescription>Departments</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  5
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <Building className="w-4 h-4" />
                    Well distributed
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Balanced organization
                </div>
                <div className="text-muted-foreground">
                  Engineering, Product, Design, Marketing, Analytics
                </div>
              </CardFooter>
            </Card>

            {/* Average Tenure */}
            <Card className="@container/card from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader>
                <CardDescription>Average Tenure</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  1.8 years
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconTrendingUp className="w-4 h-4" />
                    Strong retention
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Excellent retention <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Low turnover rate
                </div>
              </CardFooter>
            </Card>
          </div>
          {/* Table - Now using TeamTable instead of ContactsTable */}
          <div className="min-h-[100vh] flex-1 md:min-h-min">
            <TeamTable data={teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
}