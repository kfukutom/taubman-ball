import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const config = {
  runtime: "nodejs",
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const { text } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({sentiment: "0.5"});
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a text analysis model. Analyze the mood of the following text and respond with a decimal number between 0 and 1. A 0 would represent the most optimistic response, and a 1 would represent the most pessimistic. A 0.5 would be neutral.",
        },
        {
          role: "user",
          content: `Describe this person's text: "${text}"`,
        },
      ],
      max_tokens: 10,
    });

    const sentiment = response.choices[0]?.message?.content?.trim() || "Neutral";

    return NextResponse.json({ sentiment });
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    return NextResponse.json({ sentiment: "Neutral" }, { status: 500 });
  }
}