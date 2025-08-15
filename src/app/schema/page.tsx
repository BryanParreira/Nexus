"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Database, Key, Link as LinkIcon } from "lucide-react"

interface SchemaColumn {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNullable: boolean;
}

interface SchemaTable {
  id: string;
  name: string;
  position: { x: number; y: number };
  columns: SchemaColumn[];
}

const mockSchemaTables: SchemaTable[] = [
  {
    id: '1',
    name: 'users',
    position: { x: 100, y: 100 },
    columns: [
      { id: '1', name: 'id', type: 'int', isPrimaryKey: true, isForeignKey: false, isNullable: false },
      { id: '2', name: 'full_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '3', name: 'email', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '4', name: 'gender', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: true },
      { id: '5', name: 'date_of_birth', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: true },
      { id: '6', name: 'country_code', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: true },
      { id: '7', name: 'created_at', type: 'int', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
  {
    id: '2',
    name: 'orders',
    position: { x: 400, y: 50 },
    columns: [
      { id: '8', name: 'id', type: 'int', isPrimaryKey: true, isForeignKey: false, isNullable: false },
      { id: '9', name: 'user_id', type: 'int', isPrimaryKey: false, isForeignKey: true, isNullable: false },
      { id: '10', name: 'status', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
  {
    id: '3',
    name: 'products',
    position: { x: 50, y: 350 },
    columns: [
      { id: '12', name: 'id', type: 'int', isPrimaryKey: true, isForeignKey: false, isNullable: false },
      { id: '13', name: 'merchant_id', type: 'int', isPrimaryKey: false, isForeignKey: true, isNullable: false },
      { id: '14', name: 'name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '15', name: 'price', type: 'int', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '16', name: 'status', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '17', name: 'created_at', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
  {
    id: '4',
    name: 'order_items',
    position: { x: 150, y: 200 },
    columns: [
      { id: '18', name: 'order_id', type: 'int', isPrimaryKey: false, isForeignKey: true, isNullable: false },
      { id: '19', name: 'product_id', type: 'int', isPrimaryKey: false, isForeignKey: true, isNullable: false },
      { id: '20', name: 'quantity', type: 'int', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
  {
    id: '5',
    name: 'merchants',
    position: { x: 400, y: 300 },
    columns: [
      { id: '21', name: 'id', type: 'int', isPrimaryKey: true, isForeignKey: false, isNullable: false },
      { id: '22', name: 'merchant_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '23', name: 'admin_id', type: 'varchar', isPrimaryKey: false, isForeignKey: true, isNullable: false },
      { id: '24', name: 'country_code', type: 'int', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '25', name: 'created_at', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
  {
    id: '6',
    name: 'countries',
    position: { x: 650, y: 150 },
    columns: [
      { id: '26', name: 'code', type: 'int', isPrimaryKey: true, isForeignKey: false, isNullable: false },
      { id: '27', name: 'name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
      { id: '28', name: 'continent_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isNullable: false },
    ],
  },
]

export default function SchemaPage() {
  const [tables] = useState(mockSchemaTables)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Database Schema</h2>
            <p className="text-gray-400">Visualize and manage your database structure</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <LinkIcon className="mr-2 h-4 w-4" />
              Add Relation
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Table
            </Button>
          </div>
        </div>

        <Card className="h-[700px] bg-gray-900 border-gray-800">
          <CardContent className="p-0 h-full">
            <div className="relative h-full bg-gray-900 schema-canvas overflow-auto">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`absolute bg-gray-800 border rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                    selectedTable === table.id ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700'
                  }`}
                  style={{
                    left: table.position.x,
                    top: table.position.y,
                    minWidth: '200px'
                  }}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className="bg-gray-700 px-3 py-2 border-b border-gray-600 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-blue-400" />
                      <span className="font-semibold text-sm text-white">{table.name}</span>
                    </div>
                  </div>
                  
                  <div className="p-2 space-y-1">
                    {table.columns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center justify-between text-xs p-1 hover:bg-gray-700 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          {column.isPrimaryKey && (
                            <Key className="h-3 w-3 text-yellow-400" />
                          )}
                          {column.isForeignKey && (
                            <LinkIcon className="h-3 w-3 text-blue-400" />
                          )}
                          <span className={`${column.isPrimaryKey ? 'font-semibold text-white' : 'text-gray-300'}`}>
                            {column.name}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs px-1 py-0 border-gray-600 text-gray-400">
                          {column.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                <line
                  x1={300} y1={180}
                  x2={400} y2={120}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <line
                  x1={150} y1={350}
                  x2={200} y2={280}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {selectedTable && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Table Details: {tables.find(t => t.id === selectedTable)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tables.find(t => t.id === selectedTable)?.columns.map((column) => (
                  <div key={column.id} className="flex items-center justify-between p-2 border border-gray-700 rounded">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-white">{column.name}</span>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">{column.type}</Badge>
                      {column.isPrimaryKey && (
                        <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">Primary Key</Badge>
                      )}
                      {column.isForeignKey && (
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Foreign Key</Badge>
                      )}
                      {!column.isNullable && (
                        <Badge variant="outline" className="border-red-600/30 text-red-400">NOT NULL</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}