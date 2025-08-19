"use client";
import { PokemonSchema } from "@/app/api/generateArray/ArraySchema";
import { experimental_useObject as useObject } from "@ai-sdk/react";

import { FormEvent, useState } from "react";
import z from "zod";

export default function generateArray() {
  const [pokemonName, setPokemonName] = useState("Bulbasaur");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/generateArray",
    schema: z.array(PokemonSchema),
  });
  console.log("Object", object);
  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    submit({ pokemonName: pokemonName });
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch h-screen bg-black">
      {isLoading && !object && (
        <div className="items-center font-extrabold text-4xl">Loading.....</div>
      )}
      {error && <div>{error.message}</div>}
      {!isLoading && object && (
        <>
          <div className="font-bold text-xl text-white p-2 ">Pokemon</div>
          <div className="font-bold text-2xl text-white p-2">
            {object?.map((pokemon, index) => (
              <span key={index}>{pokemon?.name}</span>
            ))}
          </div>
        </>
      )}
      {!isLoading && object && (
        <div className="items-center font-extrabold text-4xl">Loading Done</div>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="Enter Pokemon Name?"
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
              Generate Array
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
