// app/dashboard/chat/page.tsx
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SettingsPanelProvider,
} from "@/components/settings-panel";
import Chat from "@/components/chat";
import { toast } from "sonner";
import { 
  Plus,
  Search,
  Settings,
  Phone,
  Video,
  MoreHorizontal,
  Users,
  MessageCircle,
  PhoneCall,
  VideoIcon,
  UserPlus,
  X,
  Check,
  Clock,
  Globe,
  Lock,
  Bell,
  Moon,
  Palette,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { useState, useRef } from 'react';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
}

interface GroupChatSettings {
  name: string;
  description: string;
  privacy: 'public' | 'private';
  members: string[];
}

interface ChatSettings {
  notifications: boolean;
  darkMode: boolean;
  soundEnabled: boolean;
  autoSave: boolean;
  messagePreview: boolean;
  readReceipts: boolean;
  theme: 'dark' | 'light' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
}

export default function Page() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isVideoCallDialogOpen, setIsVideoCallDialogOpen] = useState(false);

  // Sample contacts data
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'online', avatar: '/avatars/john.jpg' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'offline', lastSeen: '2 hours ago' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'busy' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', status: 'online' },
  ]);

  // New Chat state
  const [selectedContact, setSelectedContact] = useState<string>('');

  // Group Chat state
  const [groupSettings, setGroupSettings] = useState<GroupChatSettings>({
    name: '',
    description: '',
    privacy: 'private',
    members: []
  });

  // Settings state
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    notifications: true,
    darkMode: true,
    soundEnabled: true,
    autoSave: true,
    messagePreview: true,
    readReceipts: true,
    theme: 'dark',
    fontSize: 'medium'
  });

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = [
        { type: 'message', content: 'Meeting tomorrow at 3 PM', sender: 'John Doe', timestamp: '2 hours ago' },
        { type: 'message', content: 'Project update ready for review', sender: 'Jane Smith', timestamp: '1 day ago' },
        { type: 'contact', name: 'Mike Johnson', email: 'mike@example.com' },
        { type: 'file', name: 'project-docs.pdf', size: '2.3 MB', timestamp: '3 days ago' }
      ].filter(item => 
        item.type === 'contact' 
          ? item.name.toLowerCase().includes(query.toLowerCase())
          : 'content' in item 
            ? item.content.toLowerCase().includes(query.toLowerCase())
            : item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Call functionality
  const handleVoiceCall = (contactId?: string) => {
    if (contactId) {
      const contact = contacts.find(c => c.id === contactId);
      toast.success("Call Started", {
        description: `Voice call with ${contact?.name || 'Unknown'} has been initiated.`,
      });
      setIsCallDialogOpen(false);
    } else {
      setIsCallDialogOpen(true);
    }
  };

  // Video Call functionality
  const handleVideoCall = (contactId?: string) => {
    if (contactId) {
      const contact = contacts.find(c => c.id === contactId);
      toast.success("Video Call Started", {
        description: `Video call with ${contact?.name || 'Unknown'} has been initiated.`,
      });
      setIsVideoCallDialogOpen(false);
    } else {
      setIsVideoCallDialogOpen(true);
    }
  };

  // New Chat functionality
  const handleStartNewChat = () => {
    if (!selectedContact) {
      toast.error("Selection Required", {
        description: "Please select a contact to start a chat with.",
      });
      return;
    }

    const contact = contacts.find(c => c.id === selectedContact);
    toast.success("Chat Started", {
      description: `New chat with ${contact?.name} has been created.`,
    });
    
    setSelectedContact('');
    setIsNewChatOpen(false);
  };

  // Group Chat functionality
  const handleCreateGroupChat = () => {
    if (!groupSettings.name.trim()) {
      toast.error("Validation Error", {
        description: "Group name is required.",
      });
      return;
    }

    if (groupSettings.members.length < 2) {
      toast.error("Validation Error", {
        description: "Group must have at least 2 members.",
      });
      return;
    }

    console.log('Creating group chat:', groupSettings);
    
    toast.success("Group Created", {
      description: `Group "${groupSettings.name}" has been created with ${groupSettings.members.length} members.`,
    });
    
    setGroupSettings({
      name: '',
      description: '',
      privacy: 'private',
      members: []
    });
    setIsGroupChatOpen(false);
  };

  const handleAddMember = (contactId: string) => {
    if (!groupSettings.members.includes(contactId)) {
      setGroupSettings(prev => ({
        ...prev,
        members: [...prev.members, contactId]
      }));
    }
  };

  const handleRemoveMember = (contactId: string) => {
    setGroupSettings(prev => ({
      ...prev,
      members: prev.members.filter(id => id !== contactId)
    }));
  };

  // Settings functionality
  const handleSaveSettings = () => {
    console.log('Saving chat settings:', chatSettings);
    toast.success("Settings Saved", {
      description: "Your chat preferences have been updated.",
    });
    setIsSettingsOpen(false);
  };

  const handleExportChats = () => {
    const chatData = JSON.stringify({
      chats: [
        { id: 1, contact: "John Doe", messages: ["Hello", "How are you?"], timestamp: new Date() },
        { id: 2, contact: "Jane Smith", messages: ["Meeting at 3 PM", "Got it!"], timestamp: new Date() }
      ],
      exported: new Date().toISOString()
    }, null, 2);

    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Chats Exported", {
      description: "Your chat history has been exported successfully.",
    });
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <SettingsPanelProvider>
      <div className="w-full h-screen flex flex-col">
        {/* Header - matches dashboard page structure exactly */}
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
                    <BreadcrumbPage>Chat</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Chats</DialogTitle>
                  <DialogDescription>
                    Search through your messages, contacts, and files.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                  />
                  
                  {searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {searchResults.map((result, index) => (
                        <div key={index} className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                          {result.type === 'message' && (
                            <div>
                              <div className="font-medium text-sm">{result.sender}</div>
                              <div className="text-sm text-muted-foreground">{result.content}</div>
                              <div className="text-xs text-muted-foreground">{result.timestamp}</div>
                            </div>
                          )}
                          {result.type === 'contact' && (
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{result.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{result.name}</div>
                                <div className="text-xs text-muted-foreground">{result.email}</div>
                              </div>
                            </div>
                          )}
                          {result.type === 'file' && (
                            <div>
                              <div className="font-medium text-sm">{result.name}</div>
                              <div className="text-xs text-muted-foreground">{result.size} • {result.timestamp}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery && searchResults.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Call Button */}
            <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start Voice Call</DialogTitle>
                  <DialogDescription>
                    Select a contact to start a voice call.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4 max-h-60 overflow-y-auto">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => handleVoiceCall(contact.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`}></div>
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {contact.status === 'online' ? 'Online' : contact.lastSeen || 'Offline'}
                          </div>
                        </div>
                      </div>
                      <PhoneCall className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Video Call Button */}
            <Dialog open={isVideoCallDialogOpen} onOpenChange={setIsVideoCallDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start Video Call</DialogTitle>
                  <DialogDescription>
                    Select a contact to start a video call.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4 max-h-60 overflow-y-auto">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => handleVideoCall(contact.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`}></div>
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {contact.status === 'online' ? 'Online' : contact.lastSeen || 'Offline'}
                          </div>
                        </div>
                      </div>
                      <VideoIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Group Chat Button */}
            <Dialog open={isGroupChatOpen} onOpenChange={setIsGroupChatOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Group Chat</DialogTitle>
                  <DialogDescription>
                    Set up a new group chat with multiple members.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        value={groupSettings.name}
                        onChange={(e) => setGroupSettings(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="group-privacy">Privacy</Label>
                      <Select
                        value={groupSettings.privacy}
                        onValueChange={(value: 'public' | 'private') => setGroupSettings(prev => ({ ...prev, privacy: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Private
                            </div>
                          </SelectItem>
                          <SelectItem value="public">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Public
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="group-description">Description (Optional)</Label>
                    <Textarea
                      id="group-description"
                      value={groupSettings.description}
                      onChange={(e) => setGroupSettings(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Group description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Add Members</Label>
                    <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{contact.name}</div>
                              <div className="text-xs text-muted-foreground">{contact.email}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={groupSettings.members.includes(contact.id) ? "default" : "outline"}
                            onClick={() => 
                              groupSettings.members.includes(contact.id)
                                ? handleRemoveMember(contact.id)
                                : handleAddMember(contact.id)
                            }
                          >
                            {groupSettings.members.includes(contact.id) ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Added
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-1" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {groupSettings.members.length > 0 && (
                    <div>
                      <Label>Selected Members ({groupSettings.members.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {groupSettings.members.map((memberId) => {
                          const contact = contacts.find(c => c.id === memberId);
                          return (
                            <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                              {contact?.name}
                              <X 
                                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                onClick={() => handleRemoveMember(memberId)}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsGroupChatOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGroupChat}>
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Button */}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chat Settings</DialogTitle>
                  <DialogDescription>
                    Configure your chat preferences and privacy settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <Switch
                        id="notifications"
                        checked={chatSettings.notifications}
                        onCheckedChange={(checked) => setChatSettings(prev => ({ ...prev, notifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound">Sound Alerts</Label>
                      <Switch
                        id="sound"
                        checked={chatSettings.soundEnabled}
                        onCheckedChange={(checked) => setChatSettings(prev => ({ ...prev, soundEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preview">Message Preview</Label>
                      <Switch
                        id="preview"
                        checked={chatSettings.messagePreview}
                        onCheckedChange={(checked) => setChatSettings(prev => ({ ...prev, messagePreview: checked }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Privacy</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="read-receipts">Read Receipts</Label>
                      <Switch
                        id="read-receipts"
                        checked={chatSettings.readReceipts}
                        onCheckedChange={(checked) => setChatSettings(prev => ({ ...prev, readReceipts: checked }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Appearance</h4>
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={chatSettings.theme}
                        onValueChange={(value: 'dark' | 'light' | 'auto') => setChatSettings(prev => ({ ...prev, theme: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select
                        value={chatSettings.fontSize}
                        onValueChange={(value: 'small' | 'medium' | 'large') => setChatSettings(prev => ({ ...prev, fontSize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Data</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save">Auto-save Messages</Label>
                      <Switch
                        id="auto-save"
                        checked={chatSettings.autoSave}
                        onCheckedChange={(checked) => setChatSettings(prev => ({ ...prev, autoSave: checked }))}
                      />
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleExportChats}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Chat History
                    </Button>
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

            {/* New Chat Button */}
            <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start New Chat</DialogTitle>
                  <DialogDescription>
                    Select a contact to start a new conversation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4 max-h-60 overflow-y-auto">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedContact === contact.id 
                          ? 'border-primary bg-accent' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.email}</div>
                        <div className="text-xs text-muted-foreground">
                          {contact.status === 'online' ? 'Online' : contact.lastSeen || 'Offline'}
                        </div>
                      </div>
                      {selectedContact === contact.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewChatOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleStartNewChat} disabled={!selectedContact}>
                    Start Chat
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        
        <div className="flex-1 w-full overflow-hidden">
          <Chat />
        </div>
      </div>
    </SettingsPanelProvider>
  );
}