// components/chat.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Users,
  Search,
  MessageCircle,
  Hash,
  Plus,
  Settings,
  Star,
  Crown,
  UserPlus,
  X,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  Check,
  Globe,
  Lock,
  File,
  Download,
  Play,
  Pause
} from 'lucide-react';
import { toast } from "sonner";
import { ChatMessage, TeamMember } from '@/types/chat';

interface GroupChat {
  id: string;
  name: string;
  description?: string;
  members: string[];
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  isPrivate: boolean;
  adminId: string;
}

const Chat = () => {
  const [activeChat, setActiveChat] = useState<string>('ai-assistant');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [selectedContactForNewChat, setSelectedContactForNewChat] = useState<string>('');
  
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // New group form state
  const [newGroupForm, setNewGroupForm] = useState({
    name: '',
    description: '',
    isPrivate: false,
    selectedMembers: [] as string[]
  });
  
  // Message states for different chats
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Bart, your AI assistant. I\'m here to help you with questions, provide explanations, assist with problem-solving, and support your team\'s productivity. What can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [dmMessages, setDmMessages] = useState<Record<string, ChatMessage[]>>({});
  const [groupMessages, setGroupMessages] = useState<Record<string, ChatMessage[]>>({});
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if audio recording is supported - DEFINED EARLY
  const isAudioRecordingSupported = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return !!(
      navigator?.mediaDevices?.getUserMedia &&
      window.MediaRecorder
    );
  }, []);

  // Sample team members
  const teamMembers: TeamMember[] = [
    { 
      id: '1', 
      name: 'Sarah Johnson', 
      email: 'sarah@company.com', 
      status: 'online', 
      role: 'UI/UX Designer',
      avatar: '/avatars/sarah.jpg' 
    },
    { 
      id: '2', 
      name: 'Mike Chen', 
      email: 'mike@company.com', 
      status: 'busy', 
      role: 'Full Stack Developer',
      avatar: '/avatars/mike.jpg' 
    },
    { 
      id: '3', 
      name: 'Emma Davis', 
      email: 'emma@company.com', 
      status: 'online', 
      role: 'Product Manager' 
    },
    { 
      id: '4', 
      name: 'Alex Rivera', 
      email: 'alex@company.com', 
      status: 'offline', 
      role: 'Marketing Lead',
      lastSeen: '2 hours ago'
    },
    { 
      id: '5', 
      name: 'Jordan Kim', 
      email: 'jordan@company.com', 
      status: 'online', 
      role: 'DevOps Engineer' 
    },
  ];

  // Group chats state
  const [groupChats, setGroupChats] = useState<GroupChat[]>([
    {
      id: 'group-1',
      name: 'Product Team',
      description: 'Product development discussions',
      members: ['1', '3', '5'],
      lastMessage: 'Let\'s schedule the sprint planning',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 2,
      isPrivate: false,
      adminId: '3'
    },
    {
      id: 'group-2',
      name: 'Design System',
      description: 'UI/UX and design discussions',
      members: ['1', '2', '4'],
      lastMessage: 'New components are ready for review',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isPrivate: true,
      adminId: '1'
    }
  ]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize group messages
  useEffect(() => {
    groupChats.forEach(group => {
      if (!groupMessages[group.id]) {
        setGroupMessages(prev => ({
          ...prev,
          [group.id]: [
            {
              id: `${group.id}-welcome`,
              role: 'team-member',
              content: `Welcome to ${group.name}! This is the beginning of your group conversation.`,
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
              senderId: 'system',
              senderName: 'System'
            }
          ]
        }));
      }
    });
  }, [groupChats, groupMessages]);

  const getCurrentMessages = () => {
    if (activeChat === 'ai-assistant') return aiMessages;
    if (activeChat.startsWith('dm-')) {
      const memberId = activeChat.replace('dm-', '');
      return dmMessages[memberId] || [];
    }
    if (activeChat.startsWith('group-')) {
      const groupId = activeChat.replace('group-', '');
      return groupMessages[groupId] || [];
    }
    return [];
  };

  const addMessage = (message: ChatMessage) => {
    if (activeChat === 'ai-assistant') {
      setAiMessages(prev => [...prev, message]);
    } else if (activeChat.startsWith('dm-')) {
      const memberId = activeChat.replace('dm-', '');
      setDmMessages(prev => ({
        ...prev,
        [memberId]: [...(prev[memberId] || []), message]
      }));
    } else if (activeChat.startsWith('group-')) {
      const groupId = activeChat.replace('group-', '');
      setGroupMessages(prev => ({
        ...prev,
        [groupId]: [...(prev[groupId] || []), message]
      }));
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [getCurrentMessages()]);

  // Focus input on mount and chat change (only on desktop)
  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
  }, [activeChat, isMobile]);

  // Audio recording functions
  const startRecording = async () => {
    if (!isAudioRecordingSupported()) {
      toast.error("Recording not supported", {
        description: "Your browser doesn't support audio recording.",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/mp4';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = '';
        }
      }
      
      const options = mimeType ? { mimeType } : {};
      const recorder = new MediaRecorder(stream, options);
      
      setAudioChunks([]);
      setMediaRecorder(recorder);
      setIsRecording(true);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setMediaRecorder(null);
        toast.error("Recording error", {
          description: "An error occurred during recording.",
        });
      };

      recorder.start(100);

      toast.success("Recording started", {
        description: "Speak your message...",
      });

    } catch (error) {
      console.error('Error starting recording:', error);
      let errorMessage = "Could not access microphone. Please check permissions.";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Microphone access denied. Please allow microphone permissions.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "No microphone found. Please connect a microphone.";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "Audio recording is not supported in this browser.";
        }
      }
      
      toast.error("Recording failed", {
        description: errorMessage,
      });
      
      setIsRecording(false);
      setMediaRecorder(null);
      setAudioChunks([]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      try {
        mediaRecorder.stop();
        setIsRecording(false);
        setMediaRecorder(null);
      } catch (error) {
        console.error('Error stopping recording:', error);
        setIsRecording(false);
        setMediaRecorder(null);
        toast.error("Error stopping recording", {
          description: "There was an issue stopping the recording.",
        });
      }
    }
  };

  // Handle audio recording completion
  useEffect(() => {
    if (!isRecording && audioChunks.length > 0 && mediaRecorder) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audioMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: '🎤 Voice message',
        timestamp: new Date(),
        audioData: {
          url: audioUrl,
          duration: 0
        }
      };

      addMessage(audioMessage);
      setAudioChunks([]);

      toast.success("Voice message sent", {
        description: "Your audio message has been shared.",
      });
    }
  }, [isRecording, audioChunks, mediaRecorder]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInputValue('');
    setError(null);

    if (activeChat === 'ai-assistant') {
      setIsLoading(true);
      try {
        const apiMessages = [...aiMessages, userMessage].map(msg => ({
          role: msg.role === 'team-member' ? 'user' : msg.role,
          content: msg.content
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };

        setAiMessages(prev => [...prev, aiMessage]);

      } catch (error: any) {
        console.error('Chat error:', error);
        setError(error.message);
        toast.error("Failed to send message", {
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    } 
    else if (activeChat.startsWith('dm-')) {
      const memberId = activeChat.replace('dm-', '');
      const member = teamMembers.find(m => m.id === memberId);
      
      toast.success("Message sent", {
        description: `Message sent to ${member?.name}`,
      });
      
      setTimeout(() => {
        const responses = [
          "Thanks for reaching out! I'll take a look at this.",
          "Got it! Let me get back to you on this.",
          "Sounds good, I'm on it!",
          "Perfect timing - I was just thinking about this.",
          "Thanks for the update! This is really helpful."
        ];
        
        const teamResponse: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'team-member',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          senderId: memberId,
          senderName: member?.name
        };
        
        setDmMessages(prev => ({
          ...prev,
          [memberId]: [...(prev[memberId] || []), teamResponse]
        }));
      }, 1000 + Math.random() * 2000);
    }
    else if (activeChat.startsWith('group-')) {
      const groupId = activeChat.replace('group-', '');
      const group = groupChats.find(g => g.id === groupId);
      
      toast.success("Message sent to group", {
        description: `Message sent to ${group?.name}`,
      });
      
      setTimeout(() => {
        const groupMembers = group?.members || [];
        const respondingMembers = groupMembers.filter(() => Math.random() > 0.5).slice(0, 2);
        
        respondingMembers.forEach((memberId, index) => {
          setTimeout(() => {
            const member = teamMembers.find(m => m.id === memberId);
            const responses = [
              "Agreed! This looks good to me.",
              "I have some thoughts on this. Let's discuss.",
              "Thanks for sharing! Very helpful.",
              "Can we schedule a meeting to discuss this further?",
              "I'll review this and get back to you.",
              "Great work on this!"
            ];
            
            const groupResponse: ChatMessage = {
              id: `${Date.now() + index + 3}`,
              role: 'team-member',
              content: responses[Math.floor(Math.random() * responses.length)],
              timestamp: new Date(Date.now() + (index * 1000)),
              senderId: memberId,
              senderName: member?.name
            };
            
            setGroupMessages(prev => ({
              ...prev,
              [groupId]: [...(prev[groupId] || []), groupResponse]
            }));
          }, (index + 1) * 2000);
        });
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please select a file smaller than 10MB.",
      });
      return;
    }

    const fileMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `📎 ${file.name}`,
      timestamp: new Date(),
      fileData: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }
    };

    addMessage(fileMessage);

    toast.success("File uploaded", {
      description: `${file.name} has been shared.`,
    });

    event.target.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Audio player component
  const AudioPlayer = ({ audioData }: { audioData: { url: string; duration: number } }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    return (
      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1">
          <div className="text-sm font-medium">Voice Message</div>
          <div className="text-xs text-muted-foreground">Click to play</div>
        </div>
        <audio
          ref={audioRef}
          src={audioData.url}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </div>
    );
  };

  // File display component
  const FileDisplay = ({ fileData }: { fileData: { name: string; size: number; type: string; url: string } }) => {
    const isImage = fileData.type.startsWith('image/');
    
    return (
      <div className="max-w-sm">
        {isImage ? (
          <div className="space-y-2">
            <img 
              src={fileData.url} 
              alt={fileData.name}
              className="rounded-lg max-w-full h-auto max-h-64 object-cover"
            />
            <div className="text-xs text-muted-foreground">{fileData.name}</div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <File className="w-8 h-8 text-blue-500" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{fileData.name}</div>
              <div className="text-xs text-muted-foreground">{formatFileSize(fileData.size)}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = fileData.url;
                link.download = fileData.name;
                link.click();
              }}
              className="h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCurrentChatInfo = () => {
    if (activeChat === 'ai-assistant') {
      return {
        name: 'Bart AI Assistant',
        avatar: null,
        status: 'Always available',
        type: 'ai'
      };
    }
    
    if (activeChat.startsWith('dm-')) {
      const memberId = activeChat.replace('dm-', '');
      const member = teamMembers.find(m => m.id === memberId);
      return {
        name: member?.name || 'Unknown',
        avatar: member?.avatar,
        status: member?.status === 'online' ? 'Online' : 
                member?.status === 'busy' ? 'Busy' : 
                member?.lastSeen || 'Offline',
        type: 'dm',
        member
      };
    }
    
    if (activeChat.startsWith('group-')) {
      const groupId = activeChat.replace('group-', '');
      const group = groupChats.find(g => g.id === groupId);
      return {
        name: group?.name || 'Unknown Group',
        avatar: group?.avatar,
        status: `${group?.members.length || 0} members`,
        type: 'group',
        group
      };
    }
    
    return null;
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleCreateNewChat = () => {
    if (!selectedContactForNewChat) {
      toast.error("Selection Required", {
        description: "Please select a contact to start a chat with.",
      });
      return;
    }

    const contact = teamMembers.find(c => c.id === selectedContactForNewChat);
    const newChatId = `dm-${selectedContactForNewChat}`;
    
    if (!dmMessages[selectedContactForNewChat]) {
      setDmMessages(prev => ({
        ...prev,
        [selectedContactForNewChat]: []
      }));
    }

    setActiveChat(newChatId);
    
    toast.success("Chat Started", {
      description: `New chat with ${contact?.name} has been created.`,
    });
    
    setSelectedContactForNewChat('');
    setIsNewChatOpen(false);
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleCreateNewGroup = () => {
    if (!newGroupForm.name.trim()) {
      toast.error("Validation Error", {
        description: "Group name is required.",
      });
      return;
    }

    if (newGroupForm.selectedMembers.length < 1) {
      toast.error("Validation Error", {
        description: "Group must have at least 1 member.",
      });
      return;
    }

    const newGroup: GroupChat = {
      id: `group-${Date.now()}`,
      name: newGroupForm.name,
      description: newGroupForm.description,
      members: newGroupForm.selectedMembers,
      isPrivate: newGroupForm.isPrivate,
      adminId: 'current-user',
      unreadCount: 0,
      lastMessage: undefined,
      lastMessageTime: new Date()
    };

    setGroupChats(prev => [...prev, newGroup]);
    
    setGroupMessages(prev => ({
      ...prev,
      [newGroup.id]: [
        {
          id: `${newGroup.id}-welcome`,
          role: 'team-member',
          content: `Welcome to ${newGroup.name}! This is the beginning of your group conversation.`,
          timestamp: new Date(),
          senderId: 'system',
          senderName: 'System'
        }
      ]
    }));

    setActiveChat(`group-${newGroup.id}`);
    
    toast.success("Group Created", {
      description: `Group "${newGroup.name}" has been created with ${newGroup.members.length} members.`,
    });
    
    setNewGroupForm({
      name: '',
      description: '',
      isPrivate: false,
      selectedMembers: []
    });
    setIsNewGroupOpen(false);
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleGroupMember = (memberId: string) => {
    setNewGroupForm(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberId)
        ? prev.selectedMembers.filter(id => id !== memberId)
        : [...prev.selectedMembers, memberId]
    }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Chats</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search chats..." 
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <Star className="w-3 h-3" />
            Favorites
          </div>
          
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              activeChat === 'ai-assistant' 
                ? 'bg-primary/10 border border-primary/20' 
                : 'hover:bg-accent'
            }`}
            onClick={() => handleChatSelect('ai-assistant')}
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                B
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">AI Assistant</div>
              <div className="text-xs text-muted-foreground truncate">
                Hello! I'm Bart, your AI assistant...
              </div>
            </div>
            <div className="text-xs text-muted-foreground">now</div>
          </div>
        </div>

        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <MessageCircle className="w-3 h-3" />
              Direct Messages
            </div>
            <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-primary/20"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start New Chat</DialogTitle>
                  <DialogDescription>
                    Select a team member to start a new conversation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4 max-h-60 overflow-y-auto">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedContactForNewChat === member.id 
                          ? 'border-primary bg-accent' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedContactForNewChat(member.id)}
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.status === 'online' ? 'Online' : member.lastSeen || 'Offline'}
                        </div>
                      </div>
                      {selectedContactForNewChat === member.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewChatOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNewChat} disabled={!selectedContactForNewChat}>
                    Start Chat
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeChat === `dm-${member.id}` 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleChatSelect(`dm-${member.id}`)}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {dmMessages[member.id]?.[dmMessages[member.id].length - 1]?.content || 'Start a conversation'}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {dmMessages[member.id]?.[dmMessages[member.id].length - 1]?.timestamp 
                  ? formatTime(dmMessages[member.id][dmMessages[member.id].length - 1].timestamp)
                  : ''
                }
              </div>
            </div>
          ))}
        </div>

        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <Hash className="w-3 h-3" />
              Groups
            </div>
            <Dialog open={isNewGroupOpen} onOpenChange={setIsNewGroupOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-primary/20"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>
                    Set up a new group chat with multiple members.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="group-name">Group Name *</Label>
                      <Input
                        id="group-name"
                        value={newGroupForm.name}
                        onChange={(e) => setNewGroupForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="group-privacy">Privacy</Label>
                      <Select
                        value={newGroupForm.isPrivate ? 'private' : 'public'}
                        onValueChange={(value) => setNewGroupForm(prev => ({ ...prev, isPrivate: value === 'private' }))}
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
                      value={newGroupForm.description}
                      onChange={(e) => setNewGroupForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Group description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Add Members</Label>
                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                            </div>
                            <div>
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={newGroupForm.selectedMembers.includes(member.id) ? "default" : "outline"}
                            onClick={() => handleToggleGroupMember(member.id)}
                          >
                            {newGroupForm.selectedMembers.includes(member.id) ? (
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

                  {newGroupForm.selectedMembers.length > 0 && (
                    <div>
                      <Label>Selected Members ({newGroupForm.selectedMembers.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newGroupForm.selectedMembers.map((memberId) => {
                          const member = teamMembers.find(m => m.id === memberId);
                          return (
                            <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                              {member?.name}
                              <X 
                                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                onClick={() => handleToggleGroupMember(memberId)}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewGroupOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNewGroup}>
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {groupChats.map((group) => (
            <div
              key={group.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeChat === `group-${group.id}` 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleChatSelect(`group-${group.id}`)}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    {group.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {group.isPrivate && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{group.name}</span>
                  {group.unreadCount && group.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs px-1 min-w-[20px] h-5">
                      {group.unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {group.lastMessage}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {group.lastMessageTime ? formatTime(group.lastMessageTime) : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const currentMessages = getCurrentMessages();
  const currentChatInfo = getCurrentChatInfo();

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col">
        <div className="p-3 md:p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {isMobile && (
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="md:hidden">
                      <Menu className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
              )}

              {currentChatInfo?.type === 'ai' && (
                <>
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      B
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base truncate">{currentChatInfo.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs md:text-sm text-muted-foreground">{currentChatInfo.status}</span>
                    </div>
                  </div>
                </>
              )}
              
              {currentChatInfo?.type === 'dm' && currentChatInfo.member && (
                <>
                  <div className="relative">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarImage src={currentChatInfo.member.avatar} />
                      <AvatarFallback>{currentChatInfo.member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(currentChatInfo.member.status)}`}></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base truncate">{currentChatInfo.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(currentChatInfo.member.status)}`}></div>
                      <span className="text-xs md:text-sm text-muted-foreground">{currentChatInfo.status}</span>
                    </div>
                  </div>
                </>
              )}
              
              {currentChatInfo?.type === 'group' && currentChatInfo.group && (
                <>
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {currentChatInfo.group.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm md:text-base truncate">{currentChatInfo.name}</h3>
                      {currentChatInfo.group.isPrivate && (
                        <Crown className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground">{currentChatInfo.status}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              {currentChatInfo?.type === 'group' && (
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <UserPlus className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              {!isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="ml-1 md:ml-2"
                >
                  {isSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-xs">
              Today
            </Badge>
          </div>

          {currentMessages.map((message) => (
            <div key={message.id} className="group space-y-2">
              <div className={`flex gap-2 md:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {(message.role === 'assistant' || message.role === 'team-member') && (
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                    {message.role === 'assistant' ? (
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        B
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="text-xs">
                        {message.senderName?.split(' ').map(n => n[0]).join('') || 'T'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
                
                <div className={`max-w-[85%] md:max-w-[70%] ${message.role === 'user' ? 'order-last' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs md:text-sm font-medium">
                      {message.role === 'assistant' ? 'Bart' : 
                       message.role === 'team-member' ? message.senderName || 'Team Member' : 'You'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  
                  <Card className={`p-2 md:p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <div className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed">
                      {message.content}
                    </div>
                    
                    {message.fileData && (
                      <div className="mt-2">
                        <FileDisplay fileData={message.fileData} />
                      </div>
                    )}
                    
                    {message.audioData && (
                      <div className="mt-2">
                        <AudioPlayer audioData={message.audioData} />
                      </div>
                    )}
                  </Card>

                  {(message.role === 'assistant' || message.role === 'team-member') && (
                    <div className="hidden md:flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2"
                        onClick={() => copyMessage(message.content)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      M
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {isLoading && activeChat === 'ai-assistant' && (
            <div className="flex gap-2 md:gap-3 justify-start">
              <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  B
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[85%] md:max-w-[70%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs md:text-sm font-medium">Bart</span>
                  <span className="text-xs text-muted-foreground">typing...</span>
                </div>
                <Card className="p-2 md:p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                    <span className="text-xs md:text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-xs md:text-sm text-destructive flex-1">{error}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setError(null)}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 md:p-4 border-t bg-card">
          {isMobile && (
            <div className="mb-3">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <Menu className="w-4 h-4 mr-2" />
                    Open Chats
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
          )}

          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  activeChat === 'ai-assistant' 
                    ? "Ask me anything..." 
                    : activeChat.startsWith('dm-')
                      ? `Message ${currentChatInfo?.name}...`
                      : activeChat.startsWith('group-')
                        ? `Message ${currentChatInfo?.name}...`
                        : "Type a message..."
                }
                className="pr-16 md:pr-20 min-h-[40px] md:min-h-[44px] resize-none text-sm md:text-base"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 md:h-8 md:w-8 p-0 hover:bg-primary/20"
                  onClick={triggerFileUpload}
                  disabled={isLoading}
                >
                  <Paperclip className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                
                {isAudioRecordingSupported() && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-6 w-6 md:h-8 md:w-8 p-0 transition-colors ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'hover:bg-primary/20'
                    }`}
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isLoading}
                  >
                    {isRecording ? (
                      <MicOff className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Mic className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                  </Button>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="*/*"
              />
            </div>
            
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || !inputValue.trim()}
              className="h-10 px-4"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-2 flex items-center justify-center gap-2 text-red-500 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Recording... Tap mic to stop
            </div>
          )}
        </div>
      </div>

      {!isMobile && isSidebarOpen && (
        <div className="w-80 border-l bg-card flex flex-col transition-all duration-300 ease-in-out">
          <SidebarContent />
        </div>
      )}
    </div>
  );
};

export default Chat;