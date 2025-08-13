import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.log("error", (error as Error).message);
    return Response.json({
      error: "failed to generated text",
    });
  }
}
