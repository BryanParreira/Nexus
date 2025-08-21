// src/app/dashboard/schema/page.tsx
"use client";

import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import { useToast } from "@/hooks/use-toast";
import SchemaVisualizer from "@/components/schema-visualizer";
import { 
  Plus,
  Download,
  Upload,
  Settings,
  Database,
  RefreshCw,
  FileText,
  FileJson,
  Image,
  Code,
  AlertTriangle
} from 'lucide-react';
import { useState, useRef } from 'react';

interface TableColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey: boolean;
  defaultValue?: string;
}

interface NewTable {
  name: string;
  description: string;
  columns: TableColumn[];
}

export default function SchemaPage() {
  // const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add Table state
  const [newTable, setNewTable] = useState<NewTable>({
    name: '',
    description: '',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, foreignKey: false, defaultValue: 'AUTO_INCREMENT' }
    ]
  });

  // Settings state
  const [settings, setSettings] = useState({
    autoRefresh: true,
    showRelationships: true,
    darkMode: true,
    compactView: false,
    showDataTypes: true
  });

  // Simple notification function (replace with toast when available)
  const showNotification = (title: string, description: string, type: 'success' | 'error' = 'success') => {
    alert(`${type.toUpperCase()}: ${title}\n${description}`);
  };

  // Refresh Schema
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to refresh schema
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification(
        "Schema Refreshed",
        "Database schema has been successfully updated."
      );
    } catch (error) {
      showNotification(
        "Refresh Failed",
        "Failed to refresh schema. Please try again.",
        "error"
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  // Export functionality
  const handleExportSQL = () => {
    const sqlContent = `-- Database Schema Export
-- Generated on: ${new Date().toISOString()}

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`;

    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema_${new Date().toISOString().split('T')[0]}.sql`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification(
      "Schema Exported",
      "SQL schema file has been downloaded."
    );
  };

  const handleExportJSON = () => {
    const schemaData = {
      version: "1.0",
      database: "project_db",
      tables: [
        {
          name: "users",
          columns: [
            { name: "id", type: "INTEGER", primaryKey: true, autoIncrement: true },
            { name: "username", type: "VARCHAR(255)", nullable: false },
            { name: "email", type: "VARCHAR(255)", nullable: false, unique: true },
            { name: "created_at", type: "TIMESTAMP", defaultValue: "CURRENT_TIMESTAMP" }
          ]
        },
        {
          name: "posts",
          columns: [
            { name: "id", type: "INTEGER", primaryKey: true, autoIncrement: true },
            { name: "title", type: "VARCHAR(255)", nullable: false },
            { name: "content", type: "TEXT" },
            { name: "user_id", type: "INTEGER", foreignKey: { table: "users", column: "id" } },
            { name: "created_at", type: "TIMESTAMP", defaultValue: "CURRENT_TIMESTAMP" }
          ]
        }
      ]
    };

    const blob = new Blob([JSON.stringify(schemaData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification(
      "Schema Exported",
      "JSON schema file has been downloaded."
    );
  };

  const handleExportImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = document.querySelector('.schema-visualizer') as HTMLElement;
      
      if (!element) {
        throw new Error('Schema visualizer not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#0a0a0a'
      });

      const link = document.createElement('a');
      link.download = `schema_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      showNotification(
        "Schema Exported",
        "Schema image has been downloaded."
      );
    } catch (error) {
      showNotification(
        "Export Failed",
        "Failed to export schema image.",
        "error"
      );
    }
  };

  // Import functionality
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.json')) {
          const schema = JSON.parse(content);
          console.log('Imported schema:', schema);
          showNotification(
            "Import Successful",
            `Schema imported from ${file.name}`
          );
        } else if (file.name.endsWith('.sql')) {
          console.log('Imported SQL:', content);
          showNotification(
            "Import Successful",
            `SQL schema imported from ${file.name}`
          );
        } else {
          throw new Error('Unsupported file format');
        }
      } catch (error) {
        showNotification(
          "Import Failed",
          "Failed to import schema file.",
          "error"
        );
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  // Add Table functionality
  const handleAddColumn = () => {
    setNewTable(prev => ({
      ...prev,
      columns: [...prev.columns, {
        name: '',
        type: 'VARCHAR(255)',
        nullable: true,
        primaryKey: false,
        foreignKey: false
      }]
    }));
  };

  const handleRemoveColumn = (index: number) => {
    if (newTable.columns.length > 1) {
      setNewTable(prev => ({
        ...prev,
        columns: prev.columns.filter((_, i) => i !== index)
      }));
    }
  };

  const handleColumnChange = (index: number, field: keyof TableColumn, value: any) => {
    setNewTable(prev => ({
      ...prev,
      columns: prev.columns.map((col, i) => 
        i === index ? { ...col, [field]: value } : col
      )
    }));
  };

  const handleCreateTable = () => {
    if (!newTable.name.trim()) {
      showNotification(
        "Validation Error",
        "Table name is required.",
        "error"
      );
      return;
    }

    if (newTable.columns.some(col => !col.name.trim())) {
      showNotification(
        "Validation Error",
        "All column names are required.",
        "error"
      );
      return;
    }

    console.log('Creating table:', newTable);
    
    // Reset form
    setNewTable({
      name: '',
      description: '',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, foreignKey: false, defaultValue: 'AUTO_INCREMENT' }
      ]
    });
    
    setIsAddTableOpen(false);
    
    showNotification(
      "Table Created",
      `Table "${newTable.name}" has been created successfully.`
    );
  };

  // Settings functionality
  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setIsSettingsOpen(false);
    showNotification(
      "Settings Saved",
      "Your preferences have been updated."
    );
  };

  return (
    <div className="w-full h-full">
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ms-1" />
          <div className="max-lg:hidden lg:contents">
            <Separator
              orientation="vertical"
              className="me-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Database Schema</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          {/* Export Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleExportSQL} className="gap-2">
                <Code className="w-4 h-4" />
                Export as SQL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJSON} className="gap-2">
                <FileJson className="w-4 h-4" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportImage} className="gap-2">
                <Image className="w-4 h-4" />
                Export as Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Import Button */}
          <Button variant="outline" size="sm" onClick={handleImportClick}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.sql"
            onChange={handleFileImport}
            className="hidden"
          />
          
          {/* Settings Button */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schema Settings</DialogTitle>
                <DialogDescription>
                  Configure your schema visualization preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <Switch
                    id="auto-refresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRefresh: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-relationships">Show Relationships</Label>
                  <Switch
                    id="show-relationships"
                    checked={settings.showRelationships}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showRelationships: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view">Compact View</Label>
                  <Switch
                    id="compact-view"
                    checked={settings.compactView}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, compactView: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-data-types">Show Data Types</Label>
                  <Switch
                    id="show-data-types"
                    checked={settings.showDataTypes}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showDataTypes: checked }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Add Table Button */}
          <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Table
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Table</DialogTitle>
                <DialogDescription>
                  Define your new table structure with columns and constraints.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="table-name">Table Name</Label>
                    <Input
                      id="table-name"
                      value={newTable.name}
                      onChange={(e) => setNewTable(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter table name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="table-description">Description (Optional)</Label>
                    <Input
                      id="table-description"
                      value={newTable.description}
                      onChange={(e) => setNewTable(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Table description"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Columns</Label>
                    <Button size="sm" variant="outline" onClick={handleAddColumn}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Column
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {newTable.columns.map((column, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <Input
                          placeholder="Column name"
                          value={column.name}
                          onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                          className="flex-1"
                        />
                        <Select
                          value={column.type}
                          onValueChange={(value) => handleColumnChange(index, 'type', value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INTEGER">INTEGER</SelectItem>
                            <SelectItem value="VARCHAR(255)">VARCHAR</SelectItem>
                            <SelectItem value="TEXT">TEXT</SelectItem>
                            <SelectItem value="BOOLEAN">BOOLEAN</SelectItem>
                            <SelectItem value="TIMESTAMP">TIMESTAMP</SelectItem>
                            <SelectItem value="DECIMAL">DECIMAL</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={column.primaryKey}
                            onChange={(e) => handleColumnChange(index, 'primaryKey', e.target.checked)}
                            className="mr-1"
                          />
                          <span className="text-xs">PK</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={!column.nullable}
                            onChange={(e) => handleColumnChange(index, 'nullable', !e.target.checked)}
                            className="mr-1"
                          />
                          <span className="text-xs">NOT NULL</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveColumn(index)}
                          disabled={newTable.columns.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddTableOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTable}>
                  Create Table
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      
      <div className="min-h-[calc(100vh-5rem)] flex flex-col bg-[#0a0a0a]">
        <SchemaVisualizer />
      </div>
    </div>
  );
}