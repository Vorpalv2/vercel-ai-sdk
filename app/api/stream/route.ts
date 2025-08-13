import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: NextResponse) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error, "error streaming text");
    return NextResponse.json(
      { message: "failed to stream text" },
      { status: 500 }
    );
  }
}
