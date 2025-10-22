// components/filter-automation-dialog.tsx
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
  Activity,
  Pause,
  AlertCircle,
  Clock,
  Hash,
  AtSign,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

interface FilterAutomationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statuses = [
  { id: "active", name: "Active", icon: Activity },
  { id: "paused", name: "Paused", icon: Pause },
  { id: "error", name: "Error", icon: AlertCircle },
];

const triggers = [
  { id: "schedule", name: "Schedule", icon: Clock },
  { id: "hashtag", name: "Hashtag", icon: Hash },
  { id: "mention", name: "Mention", icon: AtSign },
  { id: "engagement", name: "Engagement", icon: TrendingUp },
  { id: "keyword", name: "Keyword", icon: MessageSquare },
];

const FilterAutomationDialog = ({
  open,
  onOpenChange,
}: FilterAutomationDialogProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const handleStatusToggle = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId)
        ? prev.filter((id) => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handleTriggerToggle = (triggerId: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(triggerId)
        ? prev.filter((id) => id !== triggerId)
        : [...prev, triggerId]
    );
  };

  const handleApply = () => {
    console.log({
      statuses: selectedStatuses,
      triggers: selectedTriggers,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedTriggers([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Automations</DialogTitle>
          <DialogDescription>
            Filter automations by status and trigger type
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
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

          {/* Trigger Type */}
          <div className="space-y-3">
            <Label>Trigger Type</Label>
            <div className="space-y-2">
              {triggers.map((trigger) => {
                const Icon = trigger.icon;
                return (
                  <div key={trigger.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={trigger.id}
                      checked={selectedTriggers.includes(trigger.id)}
                      onCheckedChange={() => handleTriggerToggle(trigger.id)}
                    />
                    <Label
                      htmlFor={trigger.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {trigger.name}
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

export default FilterAutomationDialog;