// components/filter-dialog.tsx
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle2,
  Clock3,
  Edit,
  XCircle,
} from "lucide-react";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "instagram", name: "Instagram", icon: Instagram },
];

const statuses = [
  { id: "scheduled", name: "Scheduled", icon: Clock3 },
  { id: "published", name: "Published", icon: CheckCircle2 },
  { id: "draft", name: "Draft", icon: Edit },
  { id: "failed", name: "Failed", icon: XCircle },
];

const FilterDialog = ({ open, onOpenChange }: FilterDialogProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleStatusToggle = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId)
        ? prev.filter((id) => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handleApply = () => {
    console.log({
      platforms: selectedPlatforms,
      statuses: selectedStatuses,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedPlatforms([]);
    setSelectedStatuses([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Posts</DialogTitle>
          <DialogDescription>
            Filter your posts by platform and status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platforms */}
          <div className="space-y-3">
            <Label>Platforms</Label>
            <div className="space-y-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <Label
                      htmlFor={platform.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {platform.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Label>Status</Label>
            <div className="space-y-2">
              {statuses.map((status) => {
                const Icon = status.icon;
                return (
                  <div key={status.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={status.id}
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => handleStatusToggle(status.id)}
                    />
                    <Label
                      htmlFor={status.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {status.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;