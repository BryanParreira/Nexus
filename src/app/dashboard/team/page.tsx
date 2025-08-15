import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team</h1>
        <p className="text-gray-600">Manage your team members and their roles.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Team management coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
