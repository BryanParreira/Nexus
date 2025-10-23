// app/dashboard/crm/page.tsx
"use client";
import { useState } from "react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Filter,
  Download,
  Upload,
  Settings,
  Plus,
  CheckCircle2,
} from "lucide-react";
import ContactsTable from "@/components/contacts-table";
import AddContactDialog from "@/components/add-contact-dialog";
import FilterCRMDialog from "@/components/filter-crm-dialog";
import ImportContactsDialog from "@/components/import-contacts-dialog";

// Mock data for stats - you can replace this with actual data
const mockStats = {
  totalContacts: 7,
  leads: 2,
  prospects: 2,
  customers: 2,
  totalDealValue: 265000,
  avgDealValue: 44167,
};

const CRMPage = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header - Same as Team page */}
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Customers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setIsAddContactOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Analytics Overview - Pipeline Stats with Gradient */}
        <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4 border-b bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Contacts */}
            <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Contacts
                  </p>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalContacts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockStats.leads} leads, {mockStats.prospects} prospects
                </p>
              </CardContent>
            </Card>

            {/* Active Customers */}
            <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Customers
                  </p>
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.customers}</div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {((mockStats.customers / mockStats.totalContacts) * 100).toFixed(1)}%
                  conversion rate
                </p>
              </CardContent>
            </Card>

            {/* Total Pipeline */}
            <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Pipeline
                  </p>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockStats.totalDealValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Potential revenue
                </p>
              </CardContent>
            </Card>

            {/* Avg Deal Value */}
            <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Deal Value
                  </p>
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.round(mockStats.avgDealValue).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per contact with deal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contacts Table Section */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <ContactsTable />
        </div>
      </div>

      {/* Dialogs */}
      <AddContactDialog
        open={isAddContactOpen}
        onOpenChange={setIsAddContactOpen}
      />
      <FilterCRMDialog open={isFilterOpen} onOpenChange={setIsFilterOpen} />
      <ImportContactsDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
      />
    </div>
  );
};

export default CRMPage;