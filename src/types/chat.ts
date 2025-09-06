// types/chat.ts
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'team-member';
  content: string;
  timestamp: Date;
  senderId?: string;
  senderName?: string;
  fileData?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
  audioData?: {
    url: string;
    duration: number;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  status: 'online' | 'offline' | 'busy';
  role: string;
  lastSeen?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}