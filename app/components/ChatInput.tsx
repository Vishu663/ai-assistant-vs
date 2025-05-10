import { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { useChat } from "../context/ChatContext";
import Button from "./ui/Button";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4"
    >
      <div className="relative flex-grow">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          rows={1}
          className="w-full resize-none rounded-2xl border border-gray-300 dark:border-gray-700 
                   bg-transparent px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 
                   focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
                   max-h-32 overflow-y-auto"
        />
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          variant="primary"
          size="icon"
          className="absolute bottom-1 right-1 h-8 w-8 p-1 rounded-full"
          aria-label="Send message"
        >
          <SendIcon size={16} />
        </Button>
      </div>
    </form>
  );
}
