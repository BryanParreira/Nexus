import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-600">Manage your projects and track their progress.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Projects management coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
