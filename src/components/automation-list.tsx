// components/automation-list.tsx
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Zap,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Hash,
  AtSign,
  Calendar,
  TrendingUp,
  MessageSquare,
  Share2,
  Heart,
  Bell,
  Bot,
  FileText,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type AutomationStatus = "active" | "paused" | "error";
type TriggerType = "schedule" | "hashtag" | "mention" | "engagement" | "keyword";
type ActionType = "post" | "repost" | "like" | "comment" | "follow" | "notify";

interface Automation {
  id: string;
  name: string;
  description: string;
  status: AutomationStatus;
  trigger: {
    type: TriggerType;
    config: string;
  };
  action: {
    type: ActionType;
    config: string;
  };
  platforms: string[];
  lastRun?: string;
  nextRun?: string;
  runsCount: number;
  successRate: number;
  createdBy: string;
  createdAt: string;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Daily Morning Post",
    description: "Automatically post motivational content every morning at 8 AM",
    status: "active",
    trigger: {
      type: "schedule",
      config: "Daily at 8:00 AM",
    },
    action: {
      type: "post",
      config: "Post from content library",
    },
    platforms: ["twitter", "linkedin"],
    lastRun: "2025-10-21T08:00:00",
    nextRun: "2025-10-22T08:00:00",
    runsCount: 156,
    successRate: 98.5,
    createdBy: "Marketing Team",
    createdAt: "2025-06-15T10:00:00",
  },
  {
    id: "2",
    name: "Engage with Brand Mentions",
    description: "Like and reply to posts that mention our brand",
    status: "active",
    trigger: {
      type: "mention",
      config: "@YourBrand",
    },
    action: {
      type: "like",
      config: "Auto-like and queue response",
    },
    platforms: ["twitter", "instagram"],
    lastRun: "2025-10-21T14:23:00",
    nextRun: "Real-time",
    runsCount: 423,
    successRate: 95.2,
    createdBy: "Social Team",
    createdAt: "2025-07-20T14:30:00",
  },
  {
    id: "3",
    name: "Industry Hashtag Monitoring",
    description: "Track and engage with posts using industry-specific hashtags",
    status: "active",
    trigger: {
      type: "hashtag",
      config: "#SaaS, #TechStartup",
    },
    action: {
      type: "notify",
      config: "Send Slack notification",
    },
    platforms: ["twitter", "linkedin", "instagram"],
    lastRun: "2025-10-21T15:45:00",
    nextRun: "Real-time",
    runsCount: 892,
    successRate: 100,
    createdBy: "Marketing Team",
    createdAt: "2025-08-10T09:00:00",
  },
  {
    id: "4",
    name: "Repost High Engagement Content",
    description: "Automatically repost our content that reaches 1000+ engagements",
    status: "paused",
    trigger: {
      type: "engagement",
      config: "1000+ likes or shares",
    },
    action: {
      type: "repost",
      config: "Repost with 'Trending' badge",
    },
    platforms: ["twitter", "facebook"],
    lastRun: "2025-10-18T11:20:00",
    runsCount: 34,
    successRate: 100,
    createdBy: "Content Team",
    createdAt: "2025-09-05T16:00:00",
  },
  {
    id: "5",
    name: "Weekend Recap Posts",
    description: "Share weekly summary every Sunday evening",
    status: "active",
    trigger: {
      type: "schedule",
      config: "Every Sunday at 6:00 PM",
    },
    action: {
      type: "post",
      config: "Generate weekly recap",
    },
    platforms: ["linkedin", "facebook"],
    lastRun: "2025-10-20T18:00:00",
    nextRun: "2025-10-27T18:00:00",
    runsCount: 16,
    successRate: 93.8,
    createdBy: "Marketing Team",
    createdAt: "2025-09-15T12:00:00",
  },
  {
    id: "6",
    name: "Customer Support Alert",
    description: "Notify support team of urgent customer mentions",
    status: "active",
    trigger: {
      type: "keyword",
      config: "help, support, issue, problem",
    },
    action: {
      type: "notify",
      config: "Email support team",
    },
    platforms: ["twitter", "facebook"],
    lastRun: "2025-10-21T13:15:00",
    nextRun: "Real-time",
    runsCount: 267,
    successRate: 99.6,
    createdBy: "Support Team",
    createdAt: "2025-07-01T08:00:00",
  },
  {
    id: "7",
    name: "Competitor Content Tracking",
    description: "Monitor and analyze competitor posts",
    status: "error",
    trigger: {
      type: "mention",
      config: "@Competitor1, @Competitor2",
    },
    action: {
      type: "notify",
      config: "Save to analytics dashboard",
    },
    platforms: ["twitter", "linkedin"],
    lastRun: "2025-10-21T09:30:00",
    runsCount: 156,
    successRate: 87.2,
    createdBy: "Strategy Team",
    createdAt: "2025-08-20T11:00:00",
  },
];

const triggerIcons = {
  schedule: Clock,
  hashtag: Hash,
  mention: AtSign,
  engagement: TrendingUp,
  keyword: MessageSquare,
};

const actionIcons = {
  post: Send,
  repost: Share2,
  like: Heart,
  comment: MessageSquare,
  follow: Bell,
  notify: Bell,
};

const platformIcons = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
};

const platformColors = {
  twitter: "text-sky-500",
  facebook: "text-blue-600",
  linkedin: "text-blue-700",
  instagram: "text-pink-500",
};

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  },
  paused: {
    label: "Paused",
    color: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800",
  },
  error: {
    label: "Error",
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
};

const AutomationList = () => {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);

  const handleToggleStatus = (id: string) => {
    setAutomations(
      automations.map((auto) =>
        auto.id === id
          ? {
              ...auto,
              status: auto.status === "active" ? "paused" : "active",
            }
          : auto
      )
    );
  };

  const handleDelete = (id: string) => {
    setAutomations(automations.filter((auto) => auto.id !== id));
  };

  const formatDateTime = (dateString: string) => {
    if (dateString === "Real-time") return dateString;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getStats = () => {
    const active = automations.filter((a) => a.status === "active").length;
    const paused = automations.filter((a) => a.status === "paused").length;
    const totalRuns = automations.reduce((acc, a) => acc + a.runsCount, 0);
    const avgSuccessRate =
      automations.reduce((acc, a) => acc + a.successRate, 0) / automations.length;

    return { active, paused, totalRuns, avgSuccessRate };
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
                  Total Automations
                </p>
                <Zap className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{automations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.active} active, {stats.paused} paused
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Automations
                </p>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Running in real-time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Executions
                </p>
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalRuns.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time runs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Success Rate
                </p>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avgSuccessRate.toFixed(1)}%
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Excellent performance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Automations Table */}
      <div className="p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Automation Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and monitor your automated social media workflows
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-28rem)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Automation</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Platforms</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automations.map((automation) => {
                    const TriggerIcon = triggerIcons[automation.trigger.type];
                    const ActionIcon = actionIcons[automation.action.type];

                    return (
                      <TableRow key={automation.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={automation.status === "active"}
                              onCheckedChange={() =>
                                handleToggleStatus(automation.id)
                              }
                              disabled={automation.status === "error"}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div>
                            <p className="font-medium text-sm">
                              {automation.name}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {automation.description}
                            </p>
                            <Badge
                              variant="outline"
                              className={`mt-2 ${statusConfig[automation.status].color}`}
                            >
                              {automation.status === "error" && (
                                <AlertCircle className="w-3 h-3 mr-1" />
                              )}
                              {statusConfig[automation.status].label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-muted">
                              <TriggerIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-medium capitalize">
                                {automation.trigger.type}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {automation.trigger.config}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <ActionIcon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium capitalize">
                                {automation.action.type}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {automation.action.config}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {automation.platforms.map((platform) => {
                              const Icon =
                                platformIcons[
                                  platform as keyof typeof platformIcons
                                ];
                              return (
                                <div
                                  key={platform}
                                  className="p-1.5 rounded border bg-background"
                                  title={platform}
                                >
                                  <Icon
                                    className={`w-3.5 h-3.5 ${
                                      platformColors[
                                        platform as keyof typeof platformColors
                                      ]
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            {automation.lastRun && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                Last: {formatDateTime(automation.lastRun)}
                              </div>
                            )}
                            {automation.nextRun && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                Next: {formatDateTime(automation.nextRun)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="space-y-1 text-xs">
                            <div className="font-medium">
                              {automation.runsCount.toLocaleString()} runs
                            </div>
                            <div
                              className={`${
                                automation.successRate >= 95
                                  ? "text-green-600 dark:text-green-400"
                                  : automation.successRate >= 90
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {automation.successRate.toFixed(1)}% success
                            </div>
                          </div>
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
                                <Activity className="w-4 h-4 mr-2" />
                                View Logs
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Automation
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              {automation.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleToggleStatus(automation.id)
                                  }
                                >
                                  <Pause className="w-4 h-4 mr-2" />
                                  Pause
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleToggleStatus(automation.id)
                                  }
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(automation.id)}
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
    </div>
  );
};

export default AutomationList;