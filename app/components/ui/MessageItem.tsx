import { Message } from "../../types";
import Avatar from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className="flex-shrink-0 mt-1">
        <Avatar variant={isUser ? "user" : "ai"} />
      </div>
      <div
        className={`flex flex-col max-w-[80%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? "bg-primary text-white rounded-br-md"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-bl-md"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose dark:prose-invert prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
          {formatDistanceToNow(new Date(message.timestamp), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
