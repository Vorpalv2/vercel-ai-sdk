"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
// import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function TestChatPage() {
  const [input, setInput] = useState("");
  const [showDiv, setShowDiv] = useState(false);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/testchat",
    }),
  });

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  }
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* {status == "submitted" && <div>Loading....</div>} */}
      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You:" : "AI:"}
          </div>

          {message.parts.map((part, index) =>
            part.type === "text" ? (
              <div
                className="whitespace-pre-wrap"
                key={`${message.id} - ${index}`}
              >
                {part.text}
              </div>
            ) : null
          )}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
          </div>
        </div>
      )}

      <form
        onSubmit={submitHandler}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What can i help you with?"
          />
          <div
            onClick={(e) => setShowDiv((prev) => !prev)}
            className="text-white rounded px-4 py-2 bg-blue-500 hover:bg-blue-700 relative cursor-pointer"
          >
            Usage
            {showDiv && (
              <div className="absolute bottom-16 rounded-xl left-1/2 h-50 w-50 bg-stone-600 transform -translate-x-1/2"></div>
            )}
          </div>
          {status === "submitted" || status === "streaming" ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              type="submit"
              onClick={stop}
            >
              Stop
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              type="submit"
              disabled={status !== "ready"}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
