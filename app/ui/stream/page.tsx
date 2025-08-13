"use client";
import React from "react";
import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
    setInput,
    stop,
  } = useCompletion({ api: "/api/stream" });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {completion && <div className="whitespace-pre-wrap">{completion}</div>}
      {isLoading && !completion && <div>Loading....</div>}
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          setInput("");
          handleSubmit(e);
        }}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            value={input}
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="Ask me anything?"
            onChange={handleInputChange}
          />
          {!isLoading ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              //   disabled={isLoading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Stop
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
