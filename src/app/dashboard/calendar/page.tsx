import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 06 - Crafted.is",
};

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CalendarProvider } from "@/components/event-calendar/calendar-context";
import BigCalendar from "@/components/big-calendar";

const DashboardPage: React.FC = () => {
  return (
    <SidebarProvider>
      <CalendarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
              <BigCalendar />
            </div>
          </SidebarInset>
        </div>
      </CalendarProvider>
    </SidebarProvider>
  );
};

export default DashboardPage;