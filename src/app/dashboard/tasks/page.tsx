import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TasksPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <p className="text-gray-600">Organize and track your tasks with our Kanban board.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Kanban board coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
