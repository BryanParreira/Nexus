// src/app/dashboard/schema/page.tsx
import type { Metadata } from "next";
import Header from "@/components/header";
import SchemaVisualizer from "@/components/schema-visualizer";

export const metadata: Metadata = {
  title: "Database Schema - ProjectFlow",
  description: "Visualize and manage your database structure"
};

export default function SchemaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      <SchemaVisualizer />
    </div>
  );
}