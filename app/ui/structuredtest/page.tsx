"use client";
import { LearningSchema } from "@/app/api/structuredtest/schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";

import { FormEvent, useState } from "react";

export default function StructuredTestPage() {
  const [techName, setTechName] = useState("");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structuredtest",
    schema: LearningSchema,
  });

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    submit({ techName: techName });
    setTechName("");
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch h-screen bg-black">
      {isLoading && !object && (
        <div className="items-center font-extrabold text-4xl">Loading.....</div>
      )}
      {error && <div>{error.message}</div>}

      <div className="font-bold text-2xl text-white p-2">
        {object?.technologyName}
      </div>
      {object?.technologiesToLearn?.map((technology, index) => (
        <ol className="border-2 border-white p-2 grid grid-cols-2" key={index}>
          <li className="py-1 font-semibold">{technology?.name}</li>
          <li className="py-1 font-semibold">{technology?.description}</li>
        </ol>
      ))}
      <div className="font-bold text-xl text-white p-2 ">Steps</div>
      {object?.steps?.map((step, index) => (
        <ol key={index} className="border-2 border-green-800 p-2">
          <ol className="p-2" key={index}>
            <li className="py-1 font-semibold">{step}</li>
          </ol>
        </ol>
      ))}

      <form
        onSubmit={onSubmitHandler}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            value={techName}
            onChange={(e) => setTechName(e.target.value)}
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="What technology would you like to learn?"
          />
          {isLoading ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
