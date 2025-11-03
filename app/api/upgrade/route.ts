import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { AI_CONFIG } from "@/lib/config";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "system",
          content: "You are an expert résumé writing assistant.",
        },
        {
          role: "user",
          content: `Improve and professionally rewrite this résumé text:\n${text}`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (err: any) {
    console.error("🔥 OPENAI API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
