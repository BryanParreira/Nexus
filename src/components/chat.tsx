// components/chat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Paperclip, 
  Mic, 
  MoreHorizontal,
  Loader2,
  AlertCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Users,
  Search,
  MessageCircle
} from 'lucide-react';
import { toast } from "sonner";
import { ChatMessage, TeamMember } from '@/types/chat';

const Chat = () => {
  const [chatMode, setChatMode] = useState<'ai' | 'team'>('ai');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Bart, your AI assistant. I\'m here to help you with questions, provide explanations, assist with problem-solving, and support your team\'s productivity. What can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [teamMessages, setTeamMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);

  // Sample team members - replace with your actual team data
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, teamMessages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getCurrentMessages = () => chatMode === 'ai' ? messages : teamMessages;
  const setCurrentMessages = chatMode === 'ai' ? setMessages : setTeamMessages;

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    setCurrentMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setError(null);

    if (chatMode === 'ai') {
      setIsLoading(true);
      try {
        // Prepare messages for API (exclude id and timestamp)
        const apiMessages = [...messages, userMessage].map(msg => ({
          role: msg.role === 'team-member' ? 'user' : msg.role,
          content: msg.content
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        // Add AI response
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

      } catch (error: any) {
        console.error('Chat error:', error);
        setError(error.message);
        toast.error("Failed to send message", {
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Team chat - simulate sending to team member
      if (selectedTeamMember) {
        const member = teamMembers.find(m => m.id === selectedTeamMember);
        toast.success("Message sent", {
          description: `Message sent to ${member?.name}`,
        });
        
        // Simulate a response from team member after 2 seconds
        setTimeout(() => {
          const teamResponse: ChatMessage = {
            id: (Date.now() + 2).toString(),
            role: 'team-member',
            content: `Thanks for your message! I'll get back to you soon. - ${member?.name}`,
            timestamp: new Date(),
            senderId: selectedTeamMember,
            senderName: member?.name
          };
          setTeamMessages(prev => [...prev, teamResponse]);
        }, 2000);
        
      } else {
        toast.error("No recipient selected", {
          description: "Please select a team member to chat with.",
        });
      }
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

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const currentMessages = getCurrentMessages();

  return (
    <div className="flex h-full bg-background">
      {/* Team Members Sidebar - Only show in team mode */}
      {chatMode === 'team' && (
        <div className="w-80 border-r bg-card flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Team Members</h3>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">
              {teamMembers.filter(m => m.status === 'online').length} online
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedTeamMember === member.id 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedTeamMember(member.id)}
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
                  <div className="font-medium truncate text-sm">{member.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{member.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {member.status === 'online' ? 'Online' : 
                     member.status === 'busy' ? 'Busy' : 
                     member.lastSeen ? member.lastSeen : 'Offline'}
                  </div>
                </div>
                {selectedTeamMember === member.id && (
                  <MessageCircle className="w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header with Mode Toggle */}
        <div className="p-4 border-b bg-card space-y-4">
          {/* Mode Toggle */}
          <Tabs value={chatMode} onValueChange={(value) => setChatMode(value as 'ai' | 'team')}>
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Chat
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Current Chat Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {chatMode === 'ai' ? (
                <>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      B
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Bart AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Always available</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {selectedTeamMember ? (
                    (() => {
                      const member = teamMembers.find(m => m.id === selectedTeamMember);
                      return member ? (
                        <>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                              <span className="text-sm text-muted-foreground capitalize">
                                {member.status === 'online' ? 'Online' : 
                                 member.status === 'busy' ? 'Busy' : 
                                 member.lastSeen ? member.lastSeen : 'Offline'}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null;
                    })()
                  ) : (
                    <div className="text-muted-foreground">Select a team member to start chatting</div>
                  )}
                </>
              )}
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Only show messages if AI mode or team member is selected */}
          {(chatMode === 'ai' || selectedTeamMember) && (
            <>
              {/* Date Separator */}
              <div className="flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">
                  Today
                </Badge>
              </div>

              {/* Messages */}
              {currentMessages.map((message, index) => (
                <div key={message.id} className="group space-y-2">
                  <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {(message.role === 'assistant' || message.role === 'team-member') && (
                      <Avatar className="w-8 h-8 mt-1">
                        {message.role === 'assistant' ? (
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            B
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="text-sm">
                            {message.senderName?.split(' ').map(n => n[0]).join('') || 'T'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[70%] ${message.role === 'user' ? 'order-last' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.role === 'assistant' ? 'Bart' : 
                           message.role === 'team-member' ? message.senderName || 'Team Member' : 'You'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      <Card className={`p-3 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </Card>

                      {/* Message Actions */}
                      {(message.role === 'assistant' || message.role === 'team-member') && (
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                          {/* You can replace 'M' with actual user initial from your auth system */}
                          M
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator - Only for AI mode */}
              {isLoading && chatMode === 'ai' && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      B
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Bart</span>
                      <span className="text-xs text-muted-foreground">typing...</span>
                    </div>
                    <Card className="p-3 bg-muted">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">{error}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setError(null)}
                    className="ml-auto"
                  >
                    Dismiss
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty state for team chat */}
          {chatMode === 'team' && !selectedTeamMember && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground space-y-3">
                <Users className="w-16 h-16 mx-auto opacity-50" />
                <h3 className="font-medium text-lg">Select a team member</h3>
                <p className="text-sm max-w-sm">
                  Choose someone from your team to start a conversation. You can discuss projects, 
                  share updates, or collaborate on tasks.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-card">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  chatMode === 'ai' 
                    ? "Ask me anything..." 
                    : selectedTeamMember 
                      ? `Message ${teamMembers.find(m => m.id === selectedTeamMember)?.name.split(' ')[0]}...`
                      : "Select a team member first..."
                }
                className="pr-20 min-h-[44px] resize-none"
                disabled={isLoading || (chatMode === 'team' && !selectedTeamMember)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={sendMessage} 
              disabled={!inputValue.trim() || isLoading || (chatMode === 'team' && !selectedTeamMember)}
              className="h-[44px] px-4"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {chatMode === 'ai' ? 'Ask Bart' : 'Send'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;