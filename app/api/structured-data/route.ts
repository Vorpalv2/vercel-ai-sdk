import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { recipeSchema } from "./schema";
import { openai } from "@ai-sdk/openai";
// import {DefaultChatTransport} from "ai"

export async function POST(req: NextRequest) {
  const { dish } = await req.json();
  try {
    const result = streamObject({
      model: google("gemini-1.5-flash"),
      //   model: openai("gpt-4.1-nano"),
      schema: recipeSchema,
      prompt: `Generated a Recipe for ${dish}`,
      onFinish: (usage) => {
        console.log({
          inputTokens: usage.usage.inputTokens,
          outputTokens: usage.usage.outputTokens,
          totalTokens: usage.usage.totalTokens,
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    throw Error((error as Error).message);
  }
}
