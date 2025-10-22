// components/automation-templates-dialog.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Hash,
  AtSign,
  TrendingUp,
  MessageSquare,
  Send,
  Heart,
  Bell,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface AutomationTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const automationTemplates = [
  {
    id: "daily-motivation",
    name: "Daily Motivation Posts",
    description: "Automatically post motivational content every morning",
    category: "Content Publishing",
    icon: Send,
    color: "text-blue-500",
    trigger: { type: "schedule", config: "Daily at 8:00 AM" },
    action: { type: "post", config: "Post from content library" },
    platforms: ["twitter", "linkedin", "instagram"],
    popularity: "Very Popular",
  },
  {
    id: "engage-mentions",
    name: "Auto-Engage with Mentions",
    description: "Automatically like and respond to brand mentions",
    category: "Engagement",
    icon: Heart,
    color: "text-red-500",
    trigger: { type: "mention", config: "@YourBrand" },
    action: { type: "like", config: "Auto-like and notify team" },
    platforms: ["twitter", "instagram"],
    popularity: "Popular",
  },
  {
    id: "hashtag-monitor",
    name: "Industry Hashtag Tracking",
    description: "Track and get notified about industry hashtags",
    category: "Monitoring",
    icon: Hash,
    color: "text-purple-500",
    trigger: { type: "hashtag", config: "#YourIndustry" },
    action: { type: "notify", config: "Send Slack notification" },
    platforms: ["twitter", "instagram", "linkedin"],
    popularity: "Popular",
  },
  {
    id: "viral-repost",
    name: "Repost Viral Content",
    description: "Automatically repost your high-performing content",
    category: "Content Publishing",
    icon: TrendingUp,
    color: "text-green-500",
    trigger: { type: "engagement", config: "1000+ engagements" },
    action: { type: "repost", config: "Repost after 7 days" },
    platforms: ["twitter", "facebook"],
    popularity: "Trending",
  },
  {
    id: "customer-support",
    name: "Customer Support Alert",
    description: "Get notified of customer support requests instantly",
    category: "Customer Service",
    icon: Bell,
    color: "text-yellow-500",
    trigger: { type: "keyword", config: "help, support, issue" },
    action: { type: "notify", config: "Email support team" },
    platforms: ["twitter", "facebook"],
    popularity: "Essential",
  },
  {
    id: "welcome-new-followers",
    name: "Welcome New Followers",
    description: "Send automated welcome message to new followers",
    category: "Engagement",
    icon: MessageSquare,
    color: "text-pink-500",
    trigger: { type: "mention", config: "New follower" },
    action: { type: "comment", config: "Send welcome DM" },
    platforms: ["twitter", "instagram"],
    popularity: "Popular",
  },
  {
    id: "weekly-recap",
    name: "Weekly Performance Recap",
    description: "Auto-post weekly summary of your top content",
    category: "Content Publishing",
    icon: Clock,
    color: "text-indigo-500",
    trigger: { type: "schedule", config: "Every Sunday at 6:00 PM" },
    action: { type: "post", config: "Generate weekly recap" },
    platforms: ["linkedin", "twitter"],
    popularity: "Trending",
  },
  {
    id: "competitor-tracking",
    name: "Competitor Content Alerts",
    description: "Monitor when competitors post new content",
    category: "Monitoring",
    icon: AtSign,
    color: "text-orange-500",
    trigger: { type: "mention", config: "@Competitor" },
    action: { type: "notify", config: "Save to dashboard" },
    platforms: ["twitter", "linkedin"],
    popularity: "Popular",
  },
];

const AutomationTemplatesDialog = ({
  open,
  onOpenChange,
}: AutomationTemplatesDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleUseTemplate = (templateId: string) => {
    console.log("Using template:", templateId);
    onOpenChange(false);
    // This would open the create automation dialog with pre-filled data
  };

  const categories = Array.from(
    new Set(automationTemplates.map((t) => t.category))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Automation Templates</DialogTitle>
          <DialogDescription>
            Choose from pre-built templates to get started quickly
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {automationTemplates
                    .filter((t) => t.category === category)
                    .map((template) => {
                      const Icon = template.icon;
                      return (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedTemplate === template.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg bg-muted ${template.color}`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <CardTitle className="text-sm">
                                    {template.name}
                                  </CardTitle>
                                  <Badge
                                    variant="secondary"
                                    className="mt-1 text-xs"
                                  >
                                    {template.popularity}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground">
                              {template.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {template.trigger.config}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-1">
                              {template.platforms.map((platform) => {
                                const PlatformIcon =
                                  platform === "twitter"
                                    ? require("lucide-react").Twitter
                                    : platform === "facebook"
                                    ? require("lucide-react").Facebook
                                    : platform === "linkedin"
                                    ? require("lucide-react").Linkedin
                                    : require("lucide-react").Instagram;
                                return (
                                  <div
                                    key={platform}
                                    className="p-1 rounded border bg-background"
                                  >
                                    <PlatformIcon className="w-3 h-3" />
                                  </div>
                                );
                              })}
                            </div>

                            <Button
                              size="sm"
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseTemplate(template.id);
                              }}
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Use Template
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationTemplatesDialog;