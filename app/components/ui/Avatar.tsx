import { ReactNode } from "react";

interface AvatarProps {
  variant: "user" | "ai";
  children?: ReactNode;
}

export default function Avatar({ variant, children }: AvatarProps) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                    ${
                      variant === "user"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-primary text-white"
                    }`}
    >
      {children || (variant === "user" ? "U" : "AI")}
    </div>
  );
}
