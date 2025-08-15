import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600">Schedule meetings and track important dates.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Calendar with drag & drop events coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
