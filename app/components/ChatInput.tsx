import { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { useChat } from "../context/ChatContext";
import Button from "./ui/Button";
import { promptMacros } from "./macroData";

const prebuiltPrompts = [
  "Generate a React functional component for a Todo App",
  "Explain this JavaScript function:",
  "Convert this Python code to JavaScript:",
  "Write unit tests for this function:",
  "Debug this code and fix errors:",
];

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const macroPrompt = resolveMacro(message);
      const finalMessage = macroPrompt || message;
      sendMessage(finalMessage);

      setMessage("");
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

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
    textareaRef.current?.focus();
  };

  function resolveMacro(input: string): string | null {
    if (!input.startsWith("/")) return null;

    const [command, ...rest] = input.slice(1).split(" ");
    const macro = promptMacros.find((m) => m.name === command);
    if (!macro) return null;

    const code = rest.join(" ");
    return macro.template.replace("{{code}}", code);
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4">
      {/* Prompt buttons */}
      <div className="mb-3 flex flex-wrap gap-2">
        {prebuiltPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="text-sm px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
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
    </div>
  );
}
