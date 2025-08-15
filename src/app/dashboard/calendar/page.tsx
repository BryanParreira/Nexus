// app/dashboard/calendar/page.tsx
"use client"

import { useState } from "react"
// Import the Origin UI calendar component (adjust path based on what gets installed)
// import { EventCalendar } from "@/components/ui/event-calendar"
// import { Calendar } from "@/components/ui/calendar"

// Fallback component in case the Origin UI component isn't installed yet
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Settings,
  Calendar as CalendarIcon,
  Clock
} from "lucide-react"

// Mock events data that will work with Origin UI component
const mockEvents = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily team synchronization meeting",
    start: new Date(2025, 2, 24, 9, 0), // March 24, 2025 at 9:00 AM
    end: new Date(2025, 2, 24, 9, 30),
    attendees: [
      { id: "1", name: "Alice Johnson", avatar: "/api/placeholder/32/32" },
      { id: "2", name: "Bob Smith", avatar: "/api/placeholder/32/32" }
    ],
    color: "blue",
    category: "meeting"
  },
  {
    id: "2",
    title: "Product Review",
    description: "Quarterly product review session",
    start: new Date(2025, 2, 24, 14, 0), // March 24, 2025 at 2:00 PM
    end: new Date(2025, 2, 24, 16, 0),
    attendees: [
      { id: "3", name: "Charlie Brown", avatar: "/api/placeholder/32/32" },
      { id: "4", name: "Diana Prince", avatar: "/api/placeholder/32/32" }
    ],
    color: "green",
    category: "review"
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present Q1 results to client",
    start: new Date(2025, 2, 25, 10, 0), // March 25, 2025 at 10:00 AM
    end: new Date(2025, 2, 25, 11, 30),
    attendees: [
      { id: "5", name: "Eve Wilson", avatar: "/api/placeholder/32/32" }
    ],
    color: "purple",
    category: "presentation"
  },
  {
    id: "4",
    title: "Code Review",
    description: "Review new feature implementation",
    start: new Date(2025, 2, 26, 15, 0), // March 26, 2025 at 3:00 PM
    end: new Date(2025, 2, 26, 16, 0),
    attendees: [
      { id: "6", name: "Frank Miller", avatar: "/api/placeholder/32/32" },
      { id: "7", name: "Grace Lee", avatar: "/api/placeholder/32/32" }
    ],
    color: "orange",
    category: "development"
  }
]

// Component that uses Origin UI Event Calendar
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  // This is a placeholder component - replace with Origin UI component
  const OriginCalendarComponent = () => {
    return (
      <div className="h-full bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Event Calendar</h1>
            <p className="text-muted-foreground">March 2025 / W4</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button size="sm">Today</Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Placeholder for Origin UI Calendar */}
        <div className="p-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The Origin UI Event Calendar component will be rendered here once installed.
                </p>
                <p className="text-sm text-muted-foreground">
                  Run: <code className="bg-muted px-2 py-1 rounded">npx shadcn init https://ui-experiment-06.vercel.app/r/experiment-06.json</code>
                </p>
                
                {/* Mock events list */}
                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className={`w-3 h-3 rounded-full bg-${event.color}-500`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {event.start.toLocaleDateString()} at {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {event.attendees.slice(0, 3).map((attendee, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-background">
                            <AvatarImage src={attendee.avatar} />
                            <AvatarFallback className="text-xs">{attendee.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 
        Replace this with the actual Origin UI component once installed:
        <EventCalendar 
          events={mockEvents}
          onEventSelect={setSelectedEvent}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          theme="dark"
        />
      */}
      <OriginCalendarComponent />
    </div>
  )
}

// Alternative integration approach if the component has different props
export const CalendarPageWithOriginUI = () => {
  return (
    <div className="p-6">
      {/* Uncomment and adjust based on actual Origin UI component API */}
      {/*
      <EventCalendar 
        className="w-full h-full"
        events={mockEvents}
        defaultView="week"
        theme={{
          background: "var(--background)",
          foreground: "var(--foreground)",
          card: "var(--card)",
          border: "var(--border)",
          primary: "var(--primary)"
        }}
        onEventClick={(event) => console.log('Event clicked:', event)}
        onDateSelect={(date) => console.log('Date selected:', date)}
        onEventCreate={(event) => console.log('Event created:', event)}
        onEventUpdate={(event) => console.log('Event updated:', event)}
        onEventDelete={(eventId) => console.log('Event deleted:', eventId)}
      />
      */}
    </div>
  )
}