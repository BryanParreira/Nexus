// app/dashboard/calendar/page.tsx
import type { Metadata } from "next";
import { CalendarProvider } from "@/components/event-calendar/calendar-context";
import BigCalendar from "@/components/big-calendar";

export const metadata: Metadata = {
  title: "Calendar - Dashboard",
};

const CalendarPage: React.FC = () => {
  return (
    <CalendarProvider>
      <div className="h-screen w-full bg-[#111111]">
        <BigCalendar />
      </div>
    </CalendarProvider>
  );
};

export default CalendarPage;