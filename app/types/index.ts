export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    addMessage: (content: string, role: 'user' | 'assistant') => void;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
  }