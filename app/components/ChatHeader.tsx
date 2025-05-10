import { useChat } from "../context/ChatContext";
import ThemeToggle from "./ui/ThemeToggle";
import Button from "./ui/Button";
import { Trash2Icon } from "lucide-react";

export default function ChatHeader() {
  const { clearMessages } = useChat();

  return (
    <div className="flex items-center justify-between border-b dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          AI
        </div>
        <div>
          <h1 className="font-semibold text-lg text-gray-900 dark:text-white">
            AI Assistant
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask me anything
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={clearMessages}
          aria-label="Clear conversation"
          className="text-gray-500"
        >
          <Trash2Icon size={18} />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
