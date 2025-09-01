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
import ContactsTable from "@/components/contacts-table";
import { StatsGrid } from "@/components/stats-grid";
import { toast } from "sonner";
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
                    disabled={copied}
                  >
                    <div
                      className={cn(
                        "transition-all",
                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}
                    >
                      <CheckIcon
                        className="stroke-emerald-500"
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all",
                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                      )}
                    >
                      <CopyIcon size={16} aria-hidden="true" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                  Copy to clipboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings state
  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    autoSync: true,
    notifications: true,
    emailUpdates: false,
    dataBackup: true,
    shareContacts: true,
    exportFormat: 'csv',
    theme: 'dark',
    itemsPerPage: 25,
    defaultView: 'table'
  });

  // Sample team data for export
  const sampleTeamData = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1-555-0123', company: 'Acme Corp', position: 'Manager', location: 'New York', priority: 'high' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+1-555-0124', company: 'Tech Inc', position: 'Developer', location: 'San Francisco', priority: 'medium' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', phone: '+1-555-0125', company: 'Design Co', position: 'Designer', location: 'Los Angeles', priority: 'low' },
  ];

  // Export functionality
  const handleExportCSV = () => {
    const csvHeaders = 'First Name,Last Name,Email,Phone,Company,Position,Location,Priority\n';
    const csvData = sampleTeamData.map(contact => 
      `${contact.firstName},${contact.lastName},${contact.email},${contact.phone},${contact.company},${contact.position},${contact.location},${contact.priority}`
    ).join('\n');
    
    const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Team Exported", {
      description: "Team contacts have been exported to CSV successfully.",
    });
  };

  const handleExportExcel = () => {
    // Simulate Excel export (would require xlsx library in real implementation)
    const jsonData = JSON.stringify(sampleTeamData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-contacts-${new Date().toISOString().split('T')[0]}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Team Exported", {
      description: "Team contacts have been exported to Excel format.",
    });
  };

  const handleExportJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalContacts: sampleTeamData.length,
      contacts: sampleTeamData,
      metadata: {
        version: '1.0',
        format: 'json',
        source: 'Team Management System'
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-contacts-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Team Exported", {
      description: "Team contacts have been exported to JSON format.",
    });
  };

  const handleExportVCard = () => {
    let vCardData = '';
    sampleTeamData.forEach(contact => {
      vCardData += `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.firstName} ${contact.lastName}\nN:${contact.lastName};${contact.firstName};;;\nEMAIL:${contact.email}\nTEL:${contact.phone}\nORG:${contact.company}\nTITLE:${contact.position}\nADR:;;;;;;${contact.location};\nEND:VCARD\n\n`;
    });

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-contacts-${new Date().toISOString().split('T')[0]}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Team Exported", {
      description: "Team contacts have been exported as vCard format.",
    });
  };

  // Settings functionality
  const handleSaveSettings = () => {
    console.log('Saving team settings:', teamSettings);
    
    toast.success("Settings Saved", {
      description: "Your team management preferences have been updated.",
    });
    setIsSettingsOpen(false);
  };

  const handleImportContacts = () => {
    // This would typically open a file picker
    toast.success("Import Started", {
      description: "Contact import functionality would be implemented here.",
    });
  };

  const handleBulkActions = () => {
    toast.success("Bulk Actions", {
      description: "Bulk action functionality would be available here.",
    });
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
          {/* Export Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleExportCSV} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel} className="gap-2">
                <FileText className="w-4 h-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJSON} className="gap-2">
                <Database className="w-4 h-4" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportVCard} className="gap-2">
                <Users className="w-4 h-4" />
                Export as vCard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Button */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Team Management Settings</DialogTitle>
                <DialogDescription>
                  Configure your team management preferences and data handling options.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Sync & Data */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data & Synchronization
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-sync">Auto Sync</Label>
                      <Switch
                        id="auto-sync"
                        checked={teamSettings.autoSync}
                        onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, autoSync: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-backup">Data Backup</Label>
                      <Switch
                        id="data-backup"
                        checked={teamSettings.dataBackup}
                        onCheckedChange={(checked) => setTeamSettings(prev => ({ ...prev, dataBackup: checked }))}
                      />
                    </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Push Notifications</Label>
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
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          {/* Page intro */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Oilà, Larry!</h1>
              <p className="text-sm text-muted-foreground">
                Here&rsquo;s an overview of your contacts. Manage or invite new
                team members with ease!
              </p>
            </div>
          </div>
          {/* Numbers */}
          <StatsGrid
            stats={[
              {
                title: "Connections",
                value: "427,296",
                change: {
                  value: "+12%",
                  trend: "up",
                },
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                  >
                    <path d="M9 0v2.013a8.001 8.001 0 1 0 5.905 14.258l1.424 1.422A9.958 9.958 0 0 1 10 19.951c-5.523 0-10-4.478-10-10C0 4.765 3.947.5 9 0Zm10.95 10.95a9.954 9.954 0 0 1-2.207 5.329l-1.423-1.423a7.96 7.96 0 0 0 1.618-3.905h2.013ZM11.002 0c4.724.47 8.48 4.227 8.95 8.95h-2.013a8.004 8.004 0 0 0-6.937-6.937V0Z" />
                  </svg>
                ),
              },
              {
                title: "Contacts",
                value: "37,429",
                change: {
                  value: "+42%",
                  trend: "up",
                },
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={19}
                    fill="currentColor"
                  >
                    <path d="M2 9.5c0 .313.461.858 1.53 1.393C4.914 11.585 6.877 12 9 12c2.123 0 4.086-.415 5.47-1.107C15.538 10.358 16 9.813 16 9.5V7.329C14.35 8.349 11.827 9 9 9s-5.35-.652-7-1.671V9.5Zm14 2.829C14.35 13.349 11.827 14 9 14s-5.35-.652-7-1.671V14.5c0 .313.461.858 1.53 1.393C4.914 16.585 6.877 17 9 17c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171ZM0 14.5v-10C0 2.015 4.03 0 9 0s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5ZM9 7c2.123 0 4.086-.415 5.47-1.107C15.538 5.358 16 4.813 16 4.5c0-.313-.461-.858-1.53-1.393C13.085 2.415 11.123 2 9 2c-2.123 0-4.086.415-5.47 1.107C2.461 3.642 2 4.187 2 4.5c0 .313.461.858 1.53 1.393C4.914 6.585 6.877 7 9 7Z" />
                  </svg>
                ),
              },
              {
                title: "Value",
                value: "$82,439",
                change: {
                  value: "+37%",
                  trend: "up",
                },
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                  >
                    <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.833 3.337a.596.596 0 0 1 .763.067.59.59 0 0 1 .063.76c-2.18 3.046-3.38 4.678-3.598 4.897a1.5 1.5 0 0 1-2.122-2.122c.374-.373 2.005-1.574 4.894-3.602ZM15.5 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-11 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm2.318-3.596a1 1 0 1 1-1.414 1.414 1 1 0 0 1 1.414-1.414ZM10 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                  </svg>
                ),
              },
              {
                title: "Referrals",
                value: "3,497",
                change: {
                  value: "-17%",
                  trend: "down",
                },
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={21}
                    fill="currentColor"
                  >
                    <path d="m14.142.147 6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23-5.656-5.657.212-1.485a.5.5 0 0 1 .848-.282ZM2.141 19.257c3.722-3.33 7.995-4.327 12.643-5.52l.446-4.017-4.297-4.298-4.018.447c-1.192 4.648-2.189 8.92-5.52 12.643L0 17.117c2.828-3.3 3.89-6.953 5.303-13.081l6.364-.708 5.657 5.657-.707 6.364c-6.128 1.415-9.782 2.475-13.081 5.304L2.14 19.258Zm5.284-6.029a2 2 0 1 1 2.828-2.828 2 2 0 0 1-2.828 2.828Z" />
                  </svg>
                ),
              },
            ]}
          />
          {/* Table */}
          <div className="min-h-[100vh] flex-1 md:min-h-min">
            <ContactsTable />
          </div>
        </div>
      </div>
    </div>
  );
}