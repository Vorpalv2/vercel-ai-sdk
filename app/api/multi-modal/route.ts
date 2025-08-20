import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages: convertToModelMessages(messages),
      onFinish: ({ usage }) => {
        console.log({
          inputToken: usage.inputTokens,
          outputToken: usage.outputTokens,
          totalToken: usage.totalTokens,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "something went wrong", error },
      { status: 404 }
    );
  }
}
