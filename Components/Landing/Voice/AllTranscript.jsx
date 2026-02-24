import { BotIcon, User } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function AllTranscript({ messages = [] }) {
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // scroll the container to its bottom
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="p-4 h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {messages.map((message, index) => {
        const role = (message.role ?? "assistant").toString();
        const validRole = role === "user" || role === "assistant";
        const text = validRole
          ? message.content
          : "Betopia Limited IVR Assistant...";
        const key = message.id ?? index;
        return (
          <div
            key={key}
            className={`flex items-center mb-4 ${
              role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {role !== "user" && (
              <BotIcon className="w-5 h-5 mr-2 text-gray-300" />
            )}

            <div
              className={`flex text-left justify-center px-4 py-2 rounded-lg max-w-md ${
                role === "user" ? "text-blue-200" : "text-blue-200"
              }`}
            >
              <p>{text}</p>
            </div>

            {role === "user" && <User className="w-5 h-5 ml-2 text-blue-200" />}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
