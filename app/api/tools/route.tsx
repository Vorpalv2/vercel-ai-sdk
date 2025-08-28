import { NextRequest } from "next/server";
import { z } from "zod";
import {
  UIMessage,
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

// const weatherTool=z.object({
//         description: "Get the weather in a location",
//         inputSchema:z.object({
//             location:z.string().describe("the location to get the weather for")
//         }),
//         execute: async({location}:{location:string})=>{
//             const response = await fetch(`http://randomAPI/${location}`)
//             // const data = await response.json()
//             const data = "update"

//             if(!response.ok){
//                 console.log('working')
//                 console.log(data)
//             }
//         }
//     })

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const response = streamText({
      model: google("gemini-1.5-flash"),
      messages: convertToModelMessages(messages),
      //   tools:customTool,
      tools: {
        weather: tool({
          description: "Get the weather in a location",
          inputSchema: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }: { location: string }) => ({
            location,
            temperature: 72 + Math.floor(Math.random() * 21) - 10,
          }),
        }),
      },
      stopWhen: stepCountIs(2), // stop after 5 steps if tools were called
      // prompt: messages,
    });

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
