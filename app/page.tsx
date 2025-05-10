"use client";

import ChatContainer from "./components/ChatContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          AI Assistant <span className="text-primary">Pro</span>
        </h1>
        <ChatContainer />
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} AI Assistant - Built with Next.js &
        TypeScript
      </footer>
    </main>
  );
}
