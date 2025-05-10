import { useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import MessageItem from "./ui/MessageItem";
import Thinking from "./Thinking";

export default function ChatMessages() {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-primary text-white">
              AI
            </div>
          </div>
          <Thinking />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
