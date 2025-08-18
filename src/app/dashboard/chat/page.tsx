// app/dashboard/chat/page.tsx
import type { Metadata } from "next";
import {
  SettingsPanelProvider,
} from "@/components/settings-panel";
import Chat from "@/components/chat";

export const metadata: Metadata = {
  title: "Chat - Dashboard",
};

export default function Page() {
  return (
    <SettingsPanelProvider>
      <div className="h-screen w-full bg-[#111111]">
        <Chat />
      </div>
    </SettingsPanelProvider>
  );
}