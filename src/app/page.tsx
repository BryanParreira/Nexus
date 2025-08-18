// app/dashboard/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Crafted.is",
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Chart01 } from "@/components/chart-01";
import { Chart02 } from "@/components/chart-02";
import { Chart03 } from "@/components/chart-03";
import { Chart04 } from "@/components/chart-04";
import { Chart05 } from "@/components/chart-05";
import { Chart06 } from "@/components/chart-06";
import { ActionButtons } from "@/components/action-buttons";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full h-full @container">
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
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            {/* Right side */}
            <ActionButtons />
          </header>
          <div className="w-full h-full">
            <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px w-full">
              <Chart01 />
              <Chart02 />
              <Chart03 />
              <Chart04 />
              <Chart05 />
              <Chart06 />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}