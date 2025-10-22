// components/social-media-feed.tsx
"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle2,
  Clock3,
  XCircle,
  TrendingUp,
  Users,
  MousePointerClick,
  BarChart3,
  Calendar,
  Copy,
  Send,
  CheckSquare,
  Square,
  Trash,
  CalendarClock,
} from "lucide-react";
import type { SocialPost } from "@/types/social";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const mockPosts: SocialPost[] = [
  {
    id: "1",
    content: "🚀 Exciting news! We're launching our new product feature next week. Stay tuned for updates!",
    platforms: ["twitter", "linkedin", "facebook"],
    status: "scheduled",
    scheduledFor: "2025-10-22T10:00:00",
    author: {
      name: "Marketing Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing",
    },
  },
  {
    id: "2",
    content: "Check out our latest blog post on industry trends and insights. Link in bio! 📊",
    platforms: ["twitter", "linkedin"],
    status: "published",
    publishedAt: "2025-10-20T14:30:00",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    metrics: {
      impressions: 12450,
      engagement: 892,
      clicks: 234,
    },
    author: {
      name: "Content Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Content",
    },
  },
  {
    id: "3",
    content: "Join us for our webinar on digital transformation. Register now! Limited spots available.",
    platforms: ["linkedin", "facebook"],
    status: "scheduled",
    scheduledFor: "2025-10-23T15:00:00",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop",
    author: {
      name: "Events Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Events",
    },
  },
  {
    id: "4",
    content: "Behind the scenes: Our team working on something amazing! Can't wait to share more 👀",
    platforms: ["instagram", "facebook"],
    status: "draft",
    author: {
      name: "Social Media Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Social",
    },
  },
  {
    id: "5",
    content: "Thank you to all our customers for your continued support! We've hit 10K followers 🎉",
    platforms: ["twitter", "instagram", "facebook"],
    status: "published",
    publishedAt: "2025-10-19T09:00:00",
    metrics: {
      impressions: 25780,
      engagement: 2145,
      clicks: 567,
    },
    author: {
      name: "Marketing Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing",
    },
  },
  {
    id: "6",
    content: "Important update regarding our service maintenance scheduled for tonight.",
    platforms: ["twitter", "linkedin"],
    status: "failed",
    scheduledFor: "2025-10-21T08:00:00",
    author: {
      name: "Support Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
    },
  },
  {
    id: "7",
    content: "New case study: How we helped Company X increase their ROI by 250% 📈",
    platforms: ["linkedin"],
    status: "published",
    publishedAt: "2025-10-18T11:00:00",
    metrics: {
      impressions: 8920,
      engagement: 654,
      clicks: 187,
    },
    author: {
      name: "Marketing Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing",
    },
  },
];

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
  scheduled: {
    label: "Scheduled",
    icon: Clock3,
    variant: "default" as const,
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  },
  published: {
    label: "Published",
    icon: CheckCircle2,
    variant: "default" as const,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  },
  draft: {
    label: "Draft",
    icon: Edit,
    variant: "secondary" as const,
    color: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    variant: "destructive" as const,
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
};

const SocialMediaFeed = () => {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [view, setView] = useState<"table" | "grid">("table");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleBulkDelete = () => {
    setPosts(posts.filter((post) => !selectedPosts.includes(post.id)));
    setSelectedPosts([]);
    setShowDeleteDialog(false);
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map((p) => p.id));
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getMetricsSummary = () => {
    const published = posts.filter((p) => p.status === "published" && p.metrics);
    const totalImpressions = published.reduce((acc, p) => acc + (p.metrics?.impressions || 0), 0);
    const totalEngagement = published.reduce((acc, p) => acc + (p.metrics?.engagement || 0), 0);
    const totalClicks = published.reduce((acc, p) => acc + (p.metrics?.clicks || 0), 0);
    
    return {
      impressions: totalImpressions,
      engagement: totalEngagement,
      clicks: totalClicks,
      engagementRate: totalImpressions > 0 ? ((totalEngagement / totalImpressions) * 100).toFixed(2) : "0.00",
    };
  };

  const metrics = getMetricsSummary();

  return (
    <div className="w-full">
      {/* Analytics Overview */}
      <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4 border-b bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {posts.filter((p) => p.status === "scheduled").length} scheduled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.impressions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From published posts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Engagement</p>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.engagement.toLocaleString()}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {metrics.engagementRate}% rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Clicks</p>
                <MousePointerClick className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.clicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total link clicks
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Posts Management Table */}
      <div className="p-4 md:p-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Content Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and track all your social media posts
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={view === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("table")}
                >
                  Table View
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                >
                  Grid View
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Bulk Actions Bar */}
          {selectedPosts.length > 0 && (
            <div className="px-6 py-3 bg-primary/5 border-y flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedPosts.length === posts.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedPosts.length} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <CalendarClock className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          <CardContent className="p-0">
            {view === "table" ? (
              <ScrollArea className="h-[calc(100vh-28rem)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedPosts.length === posts.length && posts.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[50px]">Status</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Platforms</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => {
                      const StatusIcon = statusConfig[post.status].icon;
                      return (
                        <TableRow key={post.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedPosts.includes(post.id)}
                              onCheckedChange={() => handleSelectPost(post.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusConfig[post.status].color}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[post.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="flex items-start gap-3">
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt="Preview"
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <p className="text-sm line-clamp-2">{post.content}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {post.platforms.map((platform) => {
                                const Icon = platformIcons[platform];
                                return (
                                  <div
                                    key={platform}
                                    className="p-1.5 rounded border bg-background"
                                    title={platform}
                                  >
                                    <Icon
                                      className={`w-3.5 h-3.5 ${platformColors[platform]}`}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm">
                              {post.scheduledFor ? (
                                <>
                                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-xs">
                                    {formatDateTime(post.scheduledFor)}
                                  </span>
                                </>
                              ) : post.publishedAt ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                  <span className="text-xs">
                                    {formatDateTime(post.publishedAt)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  Not scheduled
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {post.metrics ? (
                              <div className="text-xs space-y-1">
                                <div className="flex justify-end items-center gap-1">
                                  <Eye className="w-3 h-3 text-muted-foreground" />
                                  <span>{post.metrics.impressions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-end items-center gap-1">
                                  <Users className="w-3 h-3 text-muted-foreground" />
                                  <span>{post.metrics.engagement.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-end items-center gap-1">
                                  <MousePointerClick className="w-3 h-3 text-muted-foreground" />
                                  <span>{post.metrics.clicks.toLocaleString()}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                No data
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {post.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs truncate max-w-[100px]">
                                {post.author.name}
                              </span>
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
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Post
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                {post.status === "scheduled" && (
                                  <DropdownMenuItem>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Reschedule
                                  </DropdownMenuItem>
                                )}
                                {post.status === "draft" && (
                                  <DropdownMenuItem>
                                    <Send className="w-4 h-4 mr-2" />
                                    Publish Now
                                  </DropdownMenuItem>
                                )}
                                {post.status === "failed" && (
                                  <DropdownMenuItem>
                                    <Clock3 className="w-4 h-4 mr-2" />
                                    Retry
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDelete(post.id)}
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
            ) : (
              <ScrollArea className="h-[calc(100vh-28rem)] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => {
                    const StatusIcon = statusConfig[post.status].icon;
                    const isSelected = selectedPosts.includes(post.id);
                    
                    return (
                      <Card 
                        key={post.id} 
                        className={`overflow-hidden relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="absolute top-3 left-3 z-10">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleSelectPost(post.id)}
                            className="bg-background"
                          />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge
                              variant="outline"
                              className={statusConfig[post.status].color}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[post.status].label}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDelete(post.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {post.image && (
                            <img
                              src={post.image}
                              alt="Preview"
                              className="w-full rounded-lg object-cover h-32"
                            />
                          )}
                          <p className="text-sm line-clamp-3">{post.content}</p>
                          <div className="flex gap-1">
                            {post.platforms.map((platform) => {
                              const Icon = platformIcons[platform];
                              return (
                                <div
                                  key={platform}
                                  className="p-1.5 rounded border bg-background"
                                >
                                  <Icon
                                    className={`w-3.5 h-3.5 ${platformColors[platform]}`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          {post.metrics && (
                            <div className="flex justify-between text-xs pt-2 border-t">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.metrics.impressions.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {post.metrics.engagement.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MousePointerClick className="w-3 h-3" />
                                {post.metrics.clicks.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground pt-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback className="text-xs">
                                {post.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{post.author.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedPosts.length} posts?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected posts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SocialMediaFeed;