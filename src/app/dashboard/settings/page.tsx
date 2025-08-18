// app/dashboard/settings/page.tsx
"use client";

import type { Metadata } from "next";
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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Save,
  X,
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Settings,
  Eye,
  EyeOff,
  Camera,
  Edit,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Smartphone,
  Lock,
  Key,
  AlertTriangle
} from "lucide-react";

const settingsCategories = [
  {
    id: "profile",
    title: "Profile",
    icon: User,
    description: "Manage your personal information"
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configure your notification preferences"
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    description: "Manage your account security"
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize your interface"
  },
  {
    id: "billing",
    title: "Billing",
    icon: CreditCard,
    description: "Manage your subscription and billing"
  }
];

const Toggle = ({ checked, onToggle, disabled = false }) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
      checked ? 'bg-blue-500' : 'bg-gray-600'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("profile");
  const [isDirty, setIsDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  const handleSave = () => {
    setIsDirty(false);
    // Simulate save action
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                  J
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Jonathon Smith</h3>
              <p className="text-gray-400 mb-3">Senior Project Manager at TechCorp</p>
              <Badge className="bg-emerald-500/20 text-emerald-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Account
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input 
                type="text" 
                defaultValue="Jonathon"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input 
                type="text" 
                defaultValue="Smith"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                defaultValue="jonathon.smith@techcorp.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  defaultValue="San Francisco, CA"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <h4 className="font-medium text-white">Project Updates</h4>
              <p className="text-sm text-gray-400">Receive notifications about project changes</p>
            </div>
            <Toggle 
              checked={emailNotifications}
              onToggle={() => {
                setEmailNotifications(!emailNotifications);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="font-medium text-white">Mobile Notifications</h4>
                <p className="text-sm text-gray-400">Get push notifications on your device</p>
              </div>
            </div>
            <Toggle 
              checked={pushNotifications}
              onToggle={() => {
                setPushNotifications(!pushNotifications);
                setIsDirty(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-purple-400" />
              <div>
                <h4 className="font-medium text-white">Sound Notifications</h4>
                <p className="text-sm text-gray-400">Play sound for important notifications</p>
              </div>
            </div>
            <Toggle 
              checked={soundNotifications}
              onToggle={() => {
                setSoundNotifications(!soundNotifications);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme for low-light environments' },
              { id: 'light', label: 'Light', icon: Sun, description: 'Light theme for bright environments' },
              { id: 'system', label: 'System', icon: Monitor, description: 'Follow system preference' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  setIsDirty(true);
                }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedTheme === theme.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <theme.icon className="w-6 h-6 text-blue-400" />
                  {selectedTheme === theme.id && <CheckCircle className="w-5 h-5 text-blue-400" />}
                </div>
                <h3 className="font-medium text-white mb-1">{theme.label}</h3>
                <p className="text-sm text-gray-400">{theme.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Interface Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <h4 className="font-medium text-white">Compact Mode</h4>
              <p className="text-sm text-gray-400">Reduce spacing for more content</p>
            </div>
            <Toggle 
              checked={compactMode}
              onToggle={() => {
                setCompactMode(!compactMode);
                setIsDirty(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <h4 className="font-medium text-white">Animations</h4>
              <p className="text-sm text-gray-400">Enable smooth transitions</p>
            </div>
            <Toggle 
              checked={animations}
              onToggle={() => {
                setAnimations(!animations);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            {/* Right side */}
            {isDirty && (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDirty(false)}
                  className="border-white/20 text-gray-300 hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Discard
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </header>
          
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-400">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3">
                <Card className="bg-white/5 border-white/10 sticky top-6">
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      {settingsCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                            activeCategory === category.id
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <category.icon className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="font-medium">{category.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {category.description}
                            </div>
                          </div>
                          <ArrowRight className={`w-4 h-4 transition-transform ${
                            activeCategory === category.id ? 'rotate-90' : ''
                          }`} />
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}