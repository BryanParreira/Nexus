import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SchemaPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Database Schema</h1>
        <p className="text-gray-600">Visualize and manage your database structure.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Schema Visualizer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive database schema visualizer coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
