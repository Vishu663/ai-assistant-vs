import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto border rounded-lg shadow-lg dark:border-gray-800 overflow-hidden">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
