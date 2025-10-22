// components/filter-crm-dialog.tsx
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
  UserPlus,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface FilterCRMDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statuses = [
  { id: "lead", name: "Lead", icon: UserPlus },
  { id: "prospect", name: "Prospect", icon: Target },
  { id: "customer", name: "Customer", icon: CheckCircle2 },
  { id: "inactive", name: "Inactive", icon: XCircle },
];

const priorities = [
  { id: "high", name: "High", icon: AlertCircle },
  { id: "medium", name: "Medium", icon: AlertCircle },
  { id: "low", name: "Low", icon: AlertCircle },
];

const FilterCRMDialog = ({ open, onOpenChange }: FilterCRMDialogProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const handleStatusToggle = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId)
        ? prev.filter((id) => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handlePriorityToggle = (priorityId: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priorityId)
        ? prev.filter((id) => id !== priorityId)
        : [...prev, priorityId]
    );
  };

  const handleApply = () => {
    console.log({
      statuses: selectedStatuses,
      priorities: selectedPriorities,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Contacts</DialogTitle>
          <DialogDescription>
            Filter contacts by status and priority
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

          {/* Priority */}
          <div className="space-y-3">
            <Label>Priority</Label>
            <div className="space-y-2">
              {priorities.map((priority) => {
                const Icon = priority.icon;
                return (
                  <div key={priority.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={priority.id}
                      checked={selectedPriorities.includes(priority.id)}
                      onCheckedChange={() => handlePriorityToggle(priority.id)}
                    />
                    <Label
                      htmlFor={priority.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {priority.name}
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

export default FilterCRMDialog;