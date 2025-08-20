import { NextRequest } from "next/server";
import { UIMessage, streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const response = streamText({
      model: openai("gpt-4.1-nano"),
      messages: convertToModelMessages(messages),
    });

    // const usage = await response.usage;

    // console.log({
    //   InputUsage: usage.inputTokens,
    //   OutputUsage: usage.outputTokens,
    //   TotalUsage: usage.totalTokens,
    // });

    response.usage.then((usage) => {
      console.log({
        InputUsage: usage.inputTokens,
        OutputUsage: usage.outputTokens,
        TotalUsage: usage.totalTokens,
      });
    });

    return response.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error streaming chat completion", error);
    return new Response("failed to stream chat completion", { status: 500 });
  }
}
