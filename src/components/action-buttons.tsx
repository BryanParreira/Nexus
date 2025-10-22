"use client";

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
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePicker from "@/components/date-picker";
import { RiExpandRightLine, RiAddLine, RiFileTextLine, RiImageLine, RiDownloadLine } from "@remixicon/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export function ActionButtons() {
  const isMobile = useIsMobile();
  const [isAddChartOpen, setIsAddChartOpen] = useState(false);

  // Export functionality
  const handleExportPDF = async () => {
    try {
      // You can use libraries like jsPDF or html2pdf
      console.log("Exporting as PDF...");
      // Example implementation:
      // const element = document.getElementById('dashboard-content');
      // const pdf = new jsPDF();
      // await html2pdf().from(element).save('dashboard.pdf');
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleExportCSV = () => {
    try {
      console.log("Exporting as CSV...");
      // Example CSV export logic
      const csvData = "Chart Name,Value,Date\nChart 1,100,2024-01-01\nChart 2,200,2024-01-02";
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dashboard-data.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV export failed:", error);
    }
  };

  const handleExportImage = async () => {
    try {
      console.log("Exporting as Image...");
      // You can use html2canvas for this
      // const canvas = await html2canvas(document.getElementById('dashboard-content'));
      // const link = document.createElement('a');
      // link.download = 'dashboard.png';
      // link.href = canvas.toDataURL();
      // link.click();
    } catch (error) {
      console.error("Image export failed:", error);
    }
  };

  // Add chart functionality
  const handleAddChart = (chartType: string) => {
    console.log(`Adding ${chartType} chart...`);
    setIsAddChartOpen(false);
    // Here you would typically:
    // 1. Navigate to a chart creation page
    // 2. Open a chart configuration modal
    // 3. Add the chart to your dashboard state
    // Example: router.push(`/dashboard/charts/new?type=${chartType}`)
  };

  return (
    <div className="flex gap-3">
      <DatePicker />

      {/* Export Button */}
      <DropdownMenu>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="aspect-square max-lg:p-0">
                  <RiExpandRightLine
                    className="lg:-ms-1 opacity-40 size-5"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="max-lg:sr-only">Export</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className="lg:hidden" hidden={isMobile}>
              Export
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleExportPDF} className="gap-2">
            <RiFileTextLine size={16} />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportCSV} className="gap-2">
            <RiDownloadLine size={16} />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportImage} className="gap-2">
            <RiImageLine size={16} />
            Export as Image
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Chart Button */}
      <Dialog open={isAddChartOpen} onOpenChange={setIsAddChartOpen}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button className="aspect-square max-lg:p-0">
                  <RiAddLine
                    className="lg:-ms-1 opacity-40 size-5"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="max-lg:sr-only">Add Chart</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="lg:hidden" hidden={isMobile}>
              Add Chart
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Chart</DialogTitle>
            <DialogDescription>
              Choose a chart type to add to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAddChart("bar")}
            >
              <div className="w-8 h-6 bg-primary/20 rounded flex items-end gap-1 px-1">
                <div className="w-1 bg-primary rounded-sm h-2"></div>
                <div className="w-1 bg-primary rounded-sm h-4"></div>
                <div className="w-1 bg-primary rounded-sm h-3"></div>
              </div>
              <span className="text-sm">Bar Chart</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAddChart("line")}
            >
              <div className="w-8 h-6 bg-primary/20 rounded flex items-center justify-center">
                <svg width="20" height="12" viewBox="0 0 20 12" className="text-primary">
                  <path d="M1 11L7 5L13 8L19 2" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="text-sm">Line Chart</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAddChart("pie")}
            >
              <div className="w-6 h-6 bg-primary/20 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-primary rounded-full border-r-transparent rotate-45"></div>
              </div>
              <span className="text-sm">Pie Chart</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleAddChart("area")}
            >
              <div className="w-8 h-6 bg-primary/20 rounded flex items-end">
                <div className="w-full h-full bg-gradient-to-t from-primary/40 to-transparent rounded"></div>
              </div>
              <span className="text-sm">Area Chart</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}