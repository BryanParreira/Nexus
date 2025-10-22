// components/chat-interface.tsx
"use client";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Users,
  Bot,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Pin,
  Archive,
  File,
  X,
  Download,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ChatType = "direct" | "group" | "ai";

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  attachments?: Attachment[];
}

interface Chat {
  id: string;
  type: ChatType;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  isPinned?: boolean;
  members?: string[];
}

const mockChats: Chat[] = [
  {
    id: "ai-assistant",
    type: "ai",
    name: "AI Assistant",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
    lastMessage: "How can I help you today?",
    lastMessageTime: "Just now",
    unreadCount: 0,
    isOnline: true,
    isPinned: true,
  },
  {
    id: "1",
    type: "direct",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Great! I'll send over the files in a moment.",
    lastMessageTime: "5m ago",
    unreadCount: 2,
    isOnline: true,
    isPinned: true,
  },
  {
    id: "2",
    type: "group",
    name: "Marketing Team",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Marketing",
    lastMessage: "John: Let's schedule a meeting for tomorrow",
    lastMessageTime: "15m ago",
    unreadCount: 5,
    members: ["Sarah", "John", "Emma", "You"],
  },
  {
    id: "3",
    type: "direct",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    lastMessage: "Thanks for the update!",
    lastMessageTime: "1h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    type: "group",
    name: "Project Alpha",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Alpha",
    lastMessage: "Emma: The deadline has been moved to Friday",
    lastMessageTime: "2h ago",
    unreadCount: 3,
    members: ["Michael", "Lisa", "David", "You"],
  },
  {
    id: "5",
    type: "direct",
    name: "Emma Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "See you at the meeting!",
    lastMessageTime: "3h ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "6",
    type: "group",
    name: "Design Review",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Design",
    lastMessage: "Lisa: I've uploaded the new mockups",
    lastMessageTime: "5h ago",
    unreadCount: 1,
    members: ["Sarah", "Emma", "Rachel", "You"],
  },
];

const mockMessages: { [key: string]: Message[] } = {
  "ai-assistant": [
    {
      id: "1",
      senderId: "ai",
      senderName: "AI Assistant",
      senderAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
      content: "Hello! I'm your AI assistant. I can help you with various tasks like drafting social media posts, analyzing data, answering questions, and much more. What would you like to do today?",
      timestamp: "10:00 AM",
      isCurrentUser: false,
    },
  ],
  "1": [
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Hey! Did you get a chance to review the social media strategy document I sent over?",
      timestamp: "9:30 AM",
      isCurrentUser: false,
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content: "Yes! I just finished reading it. Really impressed with the Q4 campaign ideas.",
      timestamp: "9:45 AM",
      isCurrentUser: true,
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Thanks! I think the influencer collaboration angle could really work well for us.",
      timestamp: "9:50 AM",
      isCurrentUser: false,
    },
    {
      id: "4",
      senderId: "me",
      senderName: "You",
      content: "Absolutely. Can you send me the budget breakdown when you have a moment?",
      timestamp: "9:52 AM",
      isCurrentUser: true,
    },
    {
      id: "5",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Great! I'll send over the files in a moment.",
      timestamp: "9:55 AM",
      isCurrentUser: false,
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "john",
      senderName: "John Smith",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      content: "Team, we need to discuss the upcoming product launch campaign.",
      timestamp: "Yesterday",
      isCurrentUser: false,
    },
    {
      id: "2",
      senderId: "emma",
      senderName: "Emma Williams",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      content: "I've prepared some initial concepts. Should I share them here?",
      timestamp: "Yesterday",
      isCurrentUser: false,
    },
    {
      id: "3",
      senderId: "me",
      senderName: "You",
      content: "Yes please! Would love to see what you've come up with.",
      timestamp: "Yesterday",
      isCurrentUser: true,
    },
    {
      id: "4",
      senderId: "john",
      senderName: "John Smith",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      content: "Let's schedule a meeting for tomorrow to go over everything in detail.",
      timestamp: "10:15 AM",
      isCurrentUser: false,
    },
  ],
};

const ChatInterface = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages["ai-assistant"]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages[chat.id] || []);
    
    // Mark as read
    setChats(chats.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon;
    if (type.includes("pdf")) return FileText;
    return File;
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim() && attachments.length === 0) || !selectedChat) return;

    const messageAttachments = attachments.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content: newMessage || "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      attachments: messageAttachments.length > 0 ? messageAttachments : undefined,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setAttachments([]);

    // Simulate AI response
    if (selectedChat.type === "ai" && newMessage) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          senderId: "ai",
          senderName: "AI Assistant",
          senderAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
          content: "I understand your request. Let me help you with that. Based on what you've shared, I recommend...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false,
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChatIcon = (type: ChatType) => {
    switch (type) {
      case "ai":
        return <Bot className="w-4 h-4" />;
      case "group":
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Main Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col border-r">
          {/* Chat Header */}
          <div className="h-16 border-b px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>
                  {selectedChat.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedChat.type === "group" ? (
                    <>
                      <Users className="w-3 h-3" />
                      <span>{selectedChat.members?.length} members</span>
                    </>
                  ) : selectedChat.type === "ai" ? (
                    <>
                      <Bot className="w-3 h-3" />
                      <span className="text-green-600">Always available</span>
                    </>
                  ) : selectedChat.isOnline ? (
                    <span className="text-green-600">Active now</span>
                  ) : (
                    <span>Offline</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedChat.type !== "ai" && (
                <>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pin className="w-4 h-4 mr-2" />
                    {selectedChat.isPinned ? "Unpin" : "Pin"} Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Chat
                  </DropdownMenuItem>
                  {selectedChat.type === "group" && (
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" />
                      View Members
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-destructive">
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-6 max-w-4xl mb-4">
              {messages.map((message, index) => {
                const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
                const showName = !message.isCurrentUser && showAvatar;
                
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 items-end",
                      message.isCurrentUser && "flex-row-reverse"
                    )}
                  >
                    <div className="flex-shrink-0 mb-1">
                      {!message.isCurrentUser && showAvatar ? (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>
                            {message.senderName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ) : !message.isCurrentUser ? (
                        <div className="w-10 h-10" />
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        "flex flex-col gap-1 max-w-[60%]",
                        message.isCurrentUser && "items-end"
                      )}
                    >
                      {showName && (
                        <p className="text-xs font-medium text-muted-foreground px-1 mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 break-words",
                          message.isCurrentUser
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        )}
                      >
                        {message.content && (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        )}
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className={cn("space-y-2", message.content && "mt-2")}>
                            {message.attachments.map((attachment) => {
                              const FileIcon = getFileIcon(attachment.type);
                              const isImage = attachment.type.startsWith("image/");
                              
                              return (
                                <div key={attachment.id}>
                                  {isImage ? (
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name}
                                      className="rounded-lg max-w-xs cursor-pointer hover:opacity-90"
                                      onClick={() => window.open(attachment.url, '_blank')}
                                    />
                                  ) : (
                                    <div 
                                      className={cn(
                                        "flex items-center gap-2 p-2 rounded-lg border max-w-xs cursor-pointer hover:bg-background/50",
                                        message.isCurrentUser 
                                          ? "bg-primary-foreground/10 border-primary-foreground/20" 
                                          : "bg-background border-border"
                                      )}
                                      onClick={() => window.open(attachment.url, '_blank')}
                                    >
                                      <FileIcon className="w-4 h-4 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{attachment.name}</p>
                                        <p className="text-xs opacity-70">{formatFileSize(attachment.size)}</p>
                                      </div>
                                      <Download className="w-4 h-4 flex-shrink-0" />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p className={cn(
                        "text-[11px] text-muted-foreground/80 px-1 mt-0.5",
                        message.isCurrentUser && "text-right"
                      )}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4 bg-background">
            {/* Attachment Preview */}
            {attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachments.map((file, index) => {
                  const FileIcon = getFileIcon(file.type);
                  const isImage = file.type.startsWith("image/");
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg max-w-xs"
                    >
                      {isImage ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <FileIcon className="w-5 h-5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-3 max-w-4xl">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
                <Smile className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder={
                    selectedChat.type === "ai"
                      ? "Ask AI anything..."
                      : "Type a message..."
                  }
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[48px] max-h-[120px] resize-none"
                />
              </div>
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim() && attachments.length === 0}
                size="icon"
                className="h-10 w-10 flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 ml-[88px] max-w-4xl">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center border-r">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No chat selected</h3>
            <p className="text-sm text-muted-foreground">
              Choose a conversation to start chatting
            </p>
          </div>
        </div>
      )}

      {/* Sidebar - Chat List (Now on the RIGHT) */}
      <div className="w-80 flex flex-col bg-muted/30">
        {/* Search */}
        <div className="p-4 border-b bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1",
                  selectedChat?.id === chat.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-background"
                )}
              >
                <div className="relative flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>
                      {chat.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isOnline && chat.type === "direct" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="font-medium text-sm truncate">
                        {chat.name}
                      </span>
                      {chat.isPinned && (
                        <Pin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="flex-shrink-0">
                        {getChatIcon(chat.type)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge className="h-5 min-w-[20px] rounded-full px-1.5 flex items-center justify-center text-xs flex-shrink-0">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChatInterface;