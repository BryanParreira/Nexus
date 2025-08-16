"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Users,
  Settings,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Smartphone,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Camera,
  Edit,
  X,
  ArrowRight,
  Plus
} from "lucide-react";
import { useState } from "react";

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
  },
  {
    id: "preferences",
    title: "Preferences",
    icon: Settings,
    description: "General application preferences"
  }
];

const notificationSettings = [
  {
    id: "email_updates",
    title: "Email Updates",
    description: "Receive email notifications for project updates",
    enabled: true,
    category: "Project Updates"
  },
  {
    id: "task_assignments",
    title: "Task Assignments",
    description: "Get notified when you're assigned new tasks",
    enabled: true,
    category: "Project Updates"
  },
  {
    id: "deadline_reminders",
    title: "Deadline Reminders",
    description: "Receive reminders before deadlines",
    enabled: true,
    category: "Project Updates"
  },
  {
    id: "team_mentions",
    title: "Team Mentions",
    description: "Get notified when someone mentions you",
    enabled: true,
    category: "Communications"
  },
  {
    id: "comments",
    title: "Comments & Replies",
    description: "Notifications for comments on your projects",
    enabled: false,
    category: "Communications"
  },
  {
    id: "marketing",
    title: "Marketing Updates",
    description: "Receive updates about new features and tips",
    enabled: false,
    category: "Marketing"
  }
];

const billingHistory = [
  {
    id: 1,
    date: "Dec 1, 2024",
    description: "Pro Plan - Monthly",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-001"
  },
  {
    id: 2,
    date: "Nov 1, 2024", 
    description: "Pro Plan - Monthly",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-002"
  },
  {
    id: 3,
    date: "Oct 1, 2024",
    description: "Pro Plan - Monthly", 
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-003"
  }
];

const securityOptions = [
  {
    id: "two_factor",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    enabled: true,
    status: "Active",
    icon: Key
  },
  {
    id: "session_timeout",
    title: "Session Timeout",
    description: "Automatically log out after 30 minutes of inactivity",
    enabled: true,
    status: "Enabled",
    icon: Lock
  },
  {
    id: "login_alerts",
    title: "Login Alerts",
    description: "Get notified of new login attempts",
    enabled: true,
    status: "Active",
    icon: AlertTriangle
  }
];

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("profile");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const toggleNotification = (id) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsDirty(false);
    // Simulate save action
  };

  // Custom Toggle Component
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

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-[#111111] border-white/10">
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

      {/* Personal Information */}
      <Card className="bg-[#111111] border-white/10">
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
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Jonathon"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <Edit className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <Edit className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea 
              rows={3}
              defaultValue="Experienced project manager with 8+ years in tech. Passionate about building efficient teams and delivering exceptional results."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(
        notifications.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {})
      ).map(([category, items]) => (
        <Card key={category} className="bg-[#111111] border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <Toggle 
                  checked={item.enabled}
                  onToggle={() => toggleNotification(item.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Notification Methods */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Notification Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="font-medium text-white">Email Notifications</h4>
                <p className="text-sm text-gray-400">Receive notifications via email</p>
              </div>
            </div>
            <Toggle checked={true} onToggle={() => setIsDirty(true)} />
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="font-medium text-white">Push Notifications</h4>
                <p className="text-sm text-gray-400">Receive push notifications on your devices</p>
              </div>
            </div>
            <Toggle checked={true} onToggle={() => setIsDirty(true)} />
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
              checked={soundEnabled} 
              onToggle={() => {
                setSoundEnabled(!soundEnabled);
                setIsDirty(true);
              }} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
              <p className="text-gray-400 mb-4">Perfect for growing teams and advanced project management</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Current Plan
                </Badge>
                <span className="text-2xl font-bold text-white">$29<span className="text-gray-400 text-base font-normal">/month</span></span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Next billing date</p>
              <p className="text-white font-semibold">January 1, 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">Unlimited</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">50GB</div>
              <div className="text-sm text-gray-400">Storage</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
              Change Plan
            </Button>
            <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-gray-400 text-sm">Expires 12/2027</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300">
                Default
              </Badge>
              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
                Edit
              </Button>
            </div>
          </div>

          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Billing History</CardTitle>
            <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.description}</p>
                    <p className="text-gray-400 text-sm">{item.date} • {item.invoice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white font-semibold">{item.amount}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Usage & Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Projects</span>
              <span className="text-white font-semibold">24 / Unlimited</span>
            </div>
            <Progress value={24} className="h-2 bg-white/10" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Storage Used</span>
              <span className="text-white font-semibold">32.5 GB / 50 GB</span>
            </div>
            <Progress value={65} className="h-2 bg-white/10" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Team Members</span>
              <span className="text-white font-semibold">18 / Unlimited</span>
            </div>
            <Progress value={18} className="h-2 bg-white/10" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Password Section */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Password & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input 
                type="password"
                placeholder="Enter new password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input 
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Security Options */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Security Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  option.enabled ? 'bg-emerald-500/20' : 'bg-gray-500/20'
                }`}>
                  <option.icon className={`w-5 h-5 ${
                    option.enabled ? 'text-emerald-400' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{option.title}</h4>
                  <p className="text-sm text-gray-400 mb-1">{option.description}</p>
                  <Badge className={`text-xs ${
                    option.enabled 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {option.status}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
                Configure
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Active Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">MacBook Pro</p>
                <p className="text-gray-400 text-sm">Chrome • San Francisco, CA • Current session</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300">Active</Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">iPhone 15 Pro</p>
                <p className="text-gray-400 text-sm">Safari • Last active 2 hours ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-[#111111] border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5">
            <h4 className="font-medium text-white mb-2">Delete Account</h4>
            <p className="text-sm text-gray-400 mb-3">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setSelectedTheme('dark');
                setIsDirty(true);
              }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedTheme === 'dark' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Moon className="w-6 h-6 text-blue-400" />
                {selectedTheme === 'dark' && <CheckCircle className="w-5 h-5 text-blue-400" />}
              </div>
              <h3 className="font-medium text-white mb-1">Dark</h3>
              <p className="text-sm text-gray-400">Dark theme for low-light environments</p>
            </button>

            <button
              onClick={() => {
                setSelectedTheme('light');
                setIsDirty(true);
              }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedTheme === 'light' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Sun className="w-6 h-6 text-yellow-400" />
                {selectedTheme === 'light' && <CheckCircle className="w-5 h-5 text-blue-400" />}
              </div>
              <h3 className="font-medium text-white mb-1">Light</h3>
              <p className="text-sm text-gray-400">Light theme for bright environments</p>
            </button>

            <button
              onClick={() => {
                setSelectedTheme('system');
                setIsDirty(true);
              }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedTheme === 'system' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Monitor className="w-6 h-6 text-purple-400" />
                {selectedTheme === 'system' && <CheckCircle className="w-5 h-5 text-blue-400" />}
              </div>
              <h3 className="font-medium text-white mb-1">System</h3>
              <p className="text-sm text-gray-400">Follow system preference</p>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Interface Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <h4 className="font-medium text-white mb-1">Compact Mode</h4>
              <p className="text-sm text-gray-400">Reduce spacing and padding for more content</p>
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
              <h4 className="font-medium text-white mb-1">Animations</h4>
              <p className="text-sm text-gray-400">Enable smooth transitions and animations</p>
            </div>
            <Toggle 
              checked={animationsEnabled} 
              onToggle={() => {
                setAnimationsEnabled(!animationsEnabled);
                setIsDirty(true);
              }} 
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <h4 className="font-medium text-white mb-1">High Contrast</h4>
              <p className="text-sm text-gray-400">Increase contrast for better accessibility</p>
            </div>
            <Toggle 
              checked={highContrast} 
              onToggle={() => {
                setHighContrast(!highContrast);
                setIsDirty(true);
              }} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Accent */}
      <Card className="bg-[#111111] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Accent Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-3">
            {[
              { name: 'Blue', color: 'bg-blue-500', selected: true },
              { name: 'Purple', color: 'bg-purple-500', selected: false },
              { name: 'Green', color: 'bg-emerald-500', selected: false },
              { name: 'Orange', color: 'bg-orange-500', selected: false },
              { name: 'Pink', color: 'bg-pink-500', selected: false },
              { name: 'Red', color: 'bg-red-500', selected: false }
            ].map((accent) => (
              <button
                key={accent.name}
                className={`w-12 h-12 rounded-lg ${accent.color} relative transition-transform hover:scale-110 ${
                  accent.selected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                }`}
                onClick={() => setIsDirty(true)}
              >
                {accent.selected && (
                  <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </button>
            ))}
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
      case "billing":
        return renderBillingSettings();
      case "security":
        return renderSecuritySettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          
          {isDirty && (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDirty(false)}
                className="border-white/20 text-gray-300 hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Discard
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="bg-[#111111] border-white/10 sticky top-6">
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
  );
}