// components/social-media-calendar.tsx
"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Clock,
  Eye,
  Edit,
} from "lucide-react";
import type { SocialPost } from "@/types/social";

const platformIcons = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
};

const platformColors = {
  twitter: "bg-sky-500",
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
};

// Mock data - same as before
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
    content: "Join us for our webinar on digital transformation. Register now!",
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
    id: "3",
    content: "Weekly team update and progress report 📊",
    platforms: ["twitter", "linkedin"],
    status: "scheduled",
    scheduledFor: "2025-10-25T09:00:00",
    author: {
      name: "Team Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
    },
  },
  {
    id: "4",
    content: "Friday motivation! Keep pushing towards your goals 💪",
    platforms: ["instagram", "facebook", "twitter"],
    status: "scheduled",
    scheduledFor: "2025-10-25T14:00:00",
    author: {
      name: "Social Media Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Social",
    },
  },
  {
    id: "5",
    content: "New blog post: 10 Tips for Better Productivity",
    platforms: ["linkedin", "twitter"],
    status: "scheduled",
    scheduledFor: "2025-10-28T11:00:00",
    author: {
      name: "Content Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Content",
    },
  },
];

const SocialMediaCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [posts] = useState<SocialPost[]>(mockPosts);

  // Get posts for selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return posts.filter((post) => {
      if (!post.scheduledFor) return false;
      const postDate = new Date(post.scheduledFor);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get dates that have posts
  const getDatesWithPosts = () => {
    return posts
      .filter((post) => post.scheduledFor && post.status === "scheduled")
      .map((post) => new Date(post.scheduledFor!));
  };

  const postsForSelectedDate = getPostsForDate(selectedDate);
  const datesWithPosts = getDatesWithPosts();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Calendar Section */}
      <div className="lg:w-1/2 xl:w-2/5 p-4 md:p-6 lg:p-8 border-r">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Calendar</CardTitle>
            <p className="text-sm text-muted-foreground">
              View and manage your scheduled posts
            </p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: datesWithPosts,
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Scheduled
              </span>
              <Badge variant="secondary">
                {posts.filter((p) => p.status === "scheduled").length} posts
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <Badge variant="secondary">
                {
                  posts.filter((p) => {
                    if (!p.scheduledFor) return false;
                    const postDate = new Date(p.scheduledFor);
                    const now = new Date();
                    const weekFromNow = new Date(
                      now.getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                    return postDate >= now && postDate <= weekFromNow;
                  }).length
                }{" "}
                posts
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <Badge variant="secondary">
                {
                  posts.filter((p) => {
                    if (!p.scheduledFor) return false;
                    const postDate = new Date(p.scheduledFor);
                    const now = new Date();
                    return (
                      postDate.getMonth() === now.getMonth() &&
                      postDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }{" "}
                posts
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts for Selected Date */}
      <div className="lg:w-1/2 xl:w-3/5 p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {selectedDate
              ? new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(selectedDate)
              : "Select a date"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {postsForSelectedDate.length === 0
              ? "No posts scheduled for this day"
              : `${postsForSelectedDate.length} post${
                  postsForSelectedDate.length > 1 ? "s" : ""
                } scheduled`}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-4 pr-4">
            {postsForSelectedDate.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No posts scheduled</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Create a new post to schedule content for this day
                  </p>
                  <Button className="mt-4">Schedule Post</Button>
                </CardContent>
              </Card>
            ) : (
              postsForSelectedDate
                .sort(
                  (a, b) =>
                    new Date(a.scheduledFor!).getTime() -
                    new Date(b.scheduledFor!).getTime()
                )
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="font-mono">
                            {formatTime(post.scheduledFor!)}
                          </Badge>
                          {post.platforms.map((platform) => {
                            const Icon = platformIcons[platform];
                            return (
                              <div
                                key={platform}
                                className={`${platformColors[platform]} p-1.5 rounded`}
                                title={platform}
                              >
                                <Icon className="w-3.5 h-3.5 text-white" />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post preview"
                          className="w-full rounded-lg mt-3 object-cover max-h-48"
                        />
                      )}
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <span>By {post.author.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SocialMediaCalendar;