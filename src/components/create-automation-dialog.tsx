// components/create-automation-dialog.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Clock,
  Hash,
  AtSign,
  TrendingUp,
  MessageSquare,
  Send,
  Share2,
  Heart,
  Bell,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateAutomationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const triggers = [
  {
    id: "schedule",
    name: "Schedule",
    description: "Run at specific times or intervals",
    icon: Clock,
  },
  {
    id: "hashtag",
    name: "Hashtag",
    description: "When specific hashtags are used",
    icon: Hash,
  },
  {
    id: "mention",
    name: "Mention",
    description: "When your brand is mentioned",
    icon: AtSign,
  },
  {
    id: "engagement",
    name: "Engagement",
    description: "When posts reach engagement thresholds",
    icon: TrendingUp,
  },
  {
    id: "keyword",
    name: "Keyword",
    description: "When specific keywords appear",
    icon: MessageSquare,
  },
];

const actions = [
  {
    id: "post",
    name: "Post Content",
    description: "Publish a new post",
    icon: Send,
  },
  {
    id: "repost",
    name: "Repost",
    description: "Share existing content",
    icon: Share2,
  },
  {
    id: "like",
    name: "Like",
    description: "Automatically like posts",
    icon: Heart,
  },
  {
    id: "comment",
    name: "Comment",
    description: "Post automatic comments",
    icon: MessageSquare,
  },
  {
    id: "notify",
    name: "Notify",
    description: "Send notifications to team",
    icon: Bell,
  },
];

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500" },
];

const CreateAutomationDialog = ({
  open,
  onOpenChange,
}: CreateAutomationDialogProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [triggerConfig, setTriggerConfig] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [actionConfig, setActionConfig] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = () => {
    console.log({
      name,
      description,
      trigger: { type: selectedTrigger, config: triggerConfig },
      action: { type: selectedAction, config: actionConfig },
      platforms: selectedPlatforms,
    });

    // Reset form
    setStep(1);
    setName("");
    setDescription("");
    setSelectedTrigger("");
    setTriggerConfig("");
    setSelectedAction("");
    setActionConfig("");
    setSelectedPlatforms([]);
    onOpenChange(false);
  };

  const canProceed = () => {
    if (step === 1) return name && description;
    if (step === 2) return selectedTrigger && triggerConfig;
    if (step === 3) return selectedAction && actionConfig;
    if (step === 4) return selectedPlatforms.length > 0;
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
          <DialogDescription>
            Step {step} of 4: {
              step === 1 ? "Basic Info" :
              step === 2 ? "Set Trigger" :
              step === 3 ? "Choose Action" :
              "Select Platforms"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 mx-2",
                      s < step ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Automation Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Daily Morning Post"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this automation does..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Step 2: Trigger */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Trigger *</Label>
                <div className="grid grid-cols-1 gap-3">
                  {triggers.map((trigger) => {
                    const Icon = trigger.icon;
                    return (
                      <div
                        key={trigger.id}
                        onClick={() => setSelectedTrigger(trigger.id)}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                          selectedTrigger === trigger.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{trigger.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {trigger.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedTrigger && (
                <div className="space-y-2">
                  <Label htmlFor="trigger-config">Configure Trigger *</Label>
                  {selectedTrigger === "schedule" ? (
                    <Select value={triggerConfig} onValueChange={setTriggerConfig}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily at 8:00 AM">Daily at 8:00 AM</SelectItem>
                        <SelectItem value="Daily at 12:00 PM">Daily at 12:00 PM</SelectItem>
                        <SelectItem value="Daily at 6:00 PM">Daily at 6:00 PM</SelectItem>
                        <SelectItem value="Every Monday at 9:00 AM">Every Monday at 9:00 AM</SelectItem>
                        <SelectItem value="Every Sunday at 6:00 PM">Every Sunday at 6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="trigger-config"
                      placeholder={
                        selectedTrigger === "hashtag"
                          ? "e.g., #SaaS, #Marketing"
                          : selectedTrigger === "mention"
                          ? "e.g., @YourBrand"
                          : selectedTrigger === "engagement"
                          ? "e.g., 1000+ likes"
                          : "e.g., help, support, issue"
                      }
                      value={triggerConfig}
                      onChange={(e) => setTriggerConfig(e.target.value)}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Action */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Action *</Label>
                <div className="grid grid-cols-1 gap-3">
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={action.id}
                        onClick={() => setSelectedAction(action.id)}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                          selectedAction === action.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{action.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedAction && (
                <div className="space-y-2">
                  <Label htmlFor="action-config">Configure Action *</Label>
                  <Input
                    id="action-config"
                    placeholder={
                      selectedAction === "post"
                        ? "e.g., Post from content library"
                        : selectedAction === "repost"
                        ? "e.g., Repost with comment"
                        : selectedAction === "comment"
                        ? "e.g., Thanks for sharing!"
                        : selectedAction === "notify"
                        ? "e.g., Send Slack notification"
                        : "Configure your action"
                    }
                    value={actionConfig}
                    onChange={(e) => setActionConfig(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Platforms */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Select Platforms *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <div
                        key={platform.id}
                        onClick={() => handlePlatformToggle(platform.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handlePlatformToggle(platform.id)}
                        />
                        <Icon className={cn("w-5 h-5", platform.color)} />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-lg bg-muted space-y-3">
                <h4 className="font-semibold text-sm">Automation Summary</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    <span className="font-medium">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Workflow:</span>
                    <span className="font-medium capitalize">{selectedTrigger}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="font-medium capitalize">{selectedAction}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platforms:</span>{" "}
                    <span className="font-medium">{selectedPlatforms.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Create Automation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAutomationDialog;