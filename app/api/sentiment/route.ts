import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const config = {
  runtime: "nodejs",
}; // configure a nodejs runtime

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ sentiment: "Neutral" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a text analysis model. Analyze the MOOD of the following text and respond with one unique word.",
        },
        {
          role: "user",
          content: `Describe this person's text: "${text}"`,
        },
      ],
      max_tokens: 10, // Allow for a longer response
    });

    const sentiment = response.choices[0]?.message?.content?.trim() || "Neutral";

    return NextResponse.json({ sentiment });
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    return NextResponse.json({ sentiment: "Neutral" }, { status: 500 });
  }
}