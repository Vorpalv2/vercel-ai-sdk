import { NextRequest } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { LearningSchema } from "./schema";

export async function POST(req: NextRequest) {
  const { techName } = await req.json();

  try {
    const result = streamObject({
      model: google("gemini-1.5-flash"),
      schema: LearningSchema,
      prompt: `User wants to learn this technology, answer the query in detail based on the schema provided and the ${techName}.`,
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
    throw Error((error as Error).message);
  }
}
