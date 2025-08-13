import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: NextRequest) {
  let { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const response = streamText({
      model: google("gemini-2.0-flash"),
      //   model: openai("gpt-4.1-nano"),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful reactJS assistant, understand the user query and give a straightforward and simple to understand answer in 3-4 sentences. also end every response with a custom message of, 'did you understood?'",
        },
        ...convertToModelMessages(messages),
      ],
      onFinish({ usage }) {
        console.log({
          inputToken: usage.inputTokens,
          outputToken: usage.outputTokens,
          totalToken: usage.totalTokens,
        });
      },
    });
    console.log("working");
    return response.toUIMessageStreamResponse();
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
