import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { PokemonSchema } from "./ArraySchema";

export async function POST(req: NextRequest) {
  const { pokemonName } = await req.json();
  console.log(pokemonName);

  try {
    const result = streamObject({
      model: google("gemini-2.0-flash-lite"),
      output: "array",
      prompt: `Generate 5 pokemon data of type ${pokemonName}`,
      schema: PokemonSchema,
      onFinish: ({ usage }) => {
        console.log({
          input: usage.inputTokens,
          output: usage.outputTokens,
          total: usage.totalTokens,
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    );
  }
}
