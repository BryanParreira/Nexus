// components/crm-list.tsx
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Star,
  StarOff,
  UserPlus,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type ContactStatus = "lead" | "prospect" | "customer" | "inactive";
type Priority = "high" | "medium" | "low";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  avatar?: string;
  status: ContactStatus;
  priority: Priority;
  dealValue?: number;
  lastContact: string;
  nextFollowUp?: string;
  tags: string[];
  notes?: string;
  isFavorite: boolean;
  source: string;
  createdAt: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    position: "VP of Marketing",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "customer",
    priority: "high",
    dealValue: 50000,
    lastContact: "2025-10-20T14:30:00",
    nextFollowUp: "2025-10-25T10:00:00",
    tags: ["Enterprise", "Marketing"],
    notes: "Interested in premium features",
    isFavorite: true,
    source: "Website",
    createdAt: "2025-08-15T09:00:00",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    phone: "+1 (555) 234-5678",
    company: "Innovate Labs",
    position: "CTO",
    location: "New York, NY",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    status: "prospect",
    priority: "high",
    dealValue: 75000,
    lastContact: "2025-10-21T11:00:00",
    nextFollowUp: "2025-10-23T14:00:00",
    tags: ["Tech", "Enterprise", "Hot Lead"],
    notes: "Scheduled demo for next week",
    isFavorite: true,
    source: "Referral",
    createdAt: "2025-09-20T10:30:00",
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma.w@startup.co",
    phone: "+1 (555) 345-6789",
    company: "Startup Co",
    position: "Founder & CEO",
    location: "Austin, TX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    status: "lead",
    priority: "medium",
    dealValue: 25000,
    lastContact: "2025-10-19T16:00:00",
    nextFollowUp: "2025-10-24T09:00:00",
    tags: ["Startup", "SaaS"],
    isFavorite: false,
    source: "LinkedIn",
    createdAt: "2025-10-10T11:00:00",
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "j.rodriguez@globalcorp.com",
    phone: "+1 (555) 456-7890",
    company: "Global Corp",
    position: "Director of Operations",
    location: "Chicago, IL",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    status: "customer",
    priority: "medium",
    dealValue: 40000,
    lastContact: "2025-10-18T13:00:00",
    tags: ["Enterprise", "Operations"],
    notes: "Very satisfied customer, potential upsell",
    isFavorite: false,
    source: "Conference",
    createdAt: "2025-07-05T14:00:00",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@designstudio.com",
    phone: "+1 (555) 567-8901",
    company: "Design Studio",
    position: "Creative Director",
    location: "Los Angeles, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    status: "prospect",
    priority: "low",
    dealValue: 15000,
    lastContact: "2025-10-15T10:00:00",
    nextFollowUp: "2025-10-28T15:00:00",
    tags: ["Design", "SMB"],
    isFavorite: false,
    source: "Website",
    createdAt: "2025-09-28T16:00:00",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@finance.com",
    phone: "+1 (555) 678-9012",
    company: "Finance Solutions",
    position: "VP of Sales",
    location: "Boston, MA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    status: "inactive",
    priority: "low",
    lastContact: "2025-09-10T09:00:00",
    tags: ["Finance"],
    notes: "No response to last 3 follow-ups",
    isFavorite: false,
    source: "Cold Outreach",
    createdAt: "2025-06-20T10:00:00",
  },
  {
    id: "7",
    name: "Rachel Martinez",
    email: "rachel@healthtech.io",
    phone: "+1 (555) 789-0123",
    company: "HealthTech Solutions",
    position: "Product Manager",
    location: "Seattle, WA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    status: "lead",
    priority: "high",
    dealValue: 60000,
    lastContact: "2025-10-21T15:00:00",
    nextFollowUp: "2025-10-22T10:00:00",
    tags: ["Healthcare", "Enterprise", "Hot Lead"],
    notes: "Very interested, moving quickly",
    isFavorite: true,
    source: "Webinar",
    createdAt: "2025-10-18T13:00:00",
  },
];

const statusConfig = {
  lead: {
    label: "Lead",
    icon: UserPlus,
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  },
  prospect: {
    label: "Prospect",
    icon: Target,
    color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800",
  },
  customer: {
    label: "Customer",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  },
  inactive: {
    label: "Inactive",
    icon: XCircle,
    color: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800",
  },
};

const priorityConfig = {
  high: {
    label: "High",
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  },
  low: {
    label: "Low",
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  },
};

// Email Sequence Dialog Component
const EmailSequenceDialog = ({ 
  open, 
  onOpenChange,
  contact 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
}) => {
  const [sequenceType, setSequenceType] = useState("welcome");

  const sequenceTemplates = {
    welcome: [
      { day: 0, subject: "Welcome to [Company]!", body: "Hi [Name],\n\nWelcome aboard! We're excited to have you..." },
      { day: 3, subject: "Getting Started Guide", body: "Hi [Name],\n\nHere's a quick guide to help you get started..." },
      { day: 7, subject: "How's it going?", body: "Hi [Name],\n\nJust checking in to see how things are going..." },
    ],
    nurture: [
      { day: 0, subject: "Thanks for your interest!", body: "Hi [Name],\n\nThanks for reaching out. Here's some info..." },
      { day: 2, subject: "Case Study: Success Story", body: "Hi [Name],\n\nI thought you'd find this case study interesting..." },
      { day: 5, subject: "Quick Question", body: "Hi [Name],\n\nDo you have 15 minutes for a quick call?" },
      { day: 10, subject: "Special Offer Inside", body: "Hi [Name],\n\nWe have a limited-time offer..." },
    ],
    followup: [
      { day: 0, subject: "Following up on our conversation", body: "Hi [Name],\n\nGreat chatting with you earlier..." },
      { day: 3, subject: "Additional Resources", body: "Hi [Name],\n\nI wanted to share some additional resources..." },
      { day: 7, subject: "Still interested?", body: "Hi [Name],\n\nJust wanted to check if you're still interested..." },
    ],
    reengagement: [
      { day: 0, subject: "We miss you!", body: "Hi [Name],\n\nWe noticed you haven't been active lately..." },
      { day: 5, subject: "What's new with us", body: "Hi [Name],\n\nHere's what we've been working on..." },
      { day: 10, subject: "Last chance to reconnect", body: "Hi [Name],\n\nThis is our last attempt to reconnect..." },
    ],
  };

  const handleStartSequence = () => {
    console.log("Starting sequence:", sequenceType, "for contact:", contact);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Email Sequence</DialogTitle>
          <DialogDescription>
            Set up an automated email sequence for {contact?.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={sequenceType} onValueChange={setSequenceType} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="nurture">Nurture</TabsTrigger>
            <TabsTrigger value="followup">Follow-up</TabsTrigger>
            <TabsTrigger value="reengagement">Re-engage</TabsTrigger>
          </TabsList>

          {Object.entries(sequenceTemplates).map(([key, emails]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="space-y-4">
                {emails.map((email, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Day {email.day}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {email.day === 0 ? "Immediately" : `${email.day} days after start`}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Subject</Label>
                        <p className="font-medium text-sm">{email.subject}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Preview</Label>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {email.body}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  This sequence contains {emails.length} emails over {emails[emails.length - 1].day} days
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStartSequence}>
            <Send className="w-4 h-4 mr-2" />
            Start Sequence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CRMList = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [emailSequenceDialog, setEmailSequenceDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleToggleFavorite = (id: string) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getStats = () => {
    const totalContacts = contacts.length;
    const customers = contacts.filter((c) => c.status === "customer").length;
    const totalDealValue = contacts.reduce(
      (acc, c) => acc + (c.dealValue || 0),
      0
    );
    const avgDealValue = totalDealValue / contacts.filter((c) => c.dealValue).length;

    return {
      totalContacts,
      customers,
      totalDealValue,
      avgDealValue,
    };
  };

  const stats = getStats();

  return (
    <div className="w-full">
      {/* Analytics Overview */}
      <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4 border-b bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Contacts
                </p>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {contacts.filter((c) => c.status === "lead").length} leads,{" "}
                {contacts.filter((c) => c.status === "prospect").length} prospects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </p>
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.customers}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {((stats.customers / stats.totalContacts) * 100).toFixed(1)}%
                conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Pipeline
                </p>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalDealValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Potential revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Deal Value
                </p>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(stats.avgDealValue).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Per contact with deal
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="p-4 md:p-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contacts Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track and manage your customer relationships
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-28rem)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Deal Value</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Next Follow-up</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => {
                    const StatusIcon = statusConfig[contact.status].icon;
                    return (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleFavorite(contact.id)}
                          >
                            {contact.isFavorite ? (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {contact.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <Building className="w-3.5 h-3.5 text-muted-foreground" />
                              <p className="font-medium text-sm">
                                {contact.company}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {contact.position}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              {contact.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusConfig[contact.status].color}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[contact.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={priorityConfig[contact.priority].color}
                          >
                            {priorityConfig[contact.priority].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {contact.dealValue ? (
                            <div className="font-medium">
                              ${contact.dealValue.toLocaleString()}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              No deal
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {formatDateTime(contact.lastContact)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.nextFollowUp ? (
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {formatDateTime(contact.nextFollowUp)}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Not scheduled
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
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
                                Edit Contact
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedContact(contact);
                                  setEmailSequenceDialog(true);
                                }}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Start Email Sequence
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Add Note
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Follow-up
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(contact.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Email Sequence Dialog */}
      <EmailSequenceDialog
        open={emailSequenceDialog}
        onOpenChange={setEmailSequenceDialog}
        contact={selectedContact}
      />
    </div>
  );
};

export default CRMList;