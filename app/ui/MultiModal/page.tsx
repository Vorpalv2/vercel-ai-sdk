"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

export default function MultiModalPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/multi-modal",
      body: { messages: input, files },
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input, files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) {
      console.log(fileInputRef.current);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You:" : "AI:"}
          </div>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap"
                  >
                    {part.text}
                  </div>
                );
              case "file":
                if (part.mediaType?.startsWith("image/")) {
                  return (
                    <Image
                      key={`${message.id} - ${index}`}
                      width={500}
                      src={part.url}
                      alt={part.filename || `attachment-${index}`}
                      height={500}
                    />
                  );
                }
                return null;
              default:
                return null;
            }
          })}
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
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            multiple
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files) {
                setFiles(e.target.files);
              }
            }}
          ></input>
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help you?"
          />
          {status === "submitted" || status === "streaming" ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
