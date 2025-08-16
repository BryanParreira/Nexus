import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 02 - Crafted.is",
};


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/user-dropdown";
import {
  SettingsPanelProvider,
  SettingsPanel,
} from "@/components/settings-panel";
import Chat from "@/components/chat";

export default function Page() {
  return (
        <SettingsPanelProvider>
          <div className="flex h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300">
            <Chat />
          </div>
        </SettingsPanelProvider>
  )
}