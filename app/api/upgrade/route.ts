import { NextResponse } from "next/server";
import OpenAI from "openai";
import { AIConfig } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText || !AIConfig.apiKey) {
      return NextResponse.json(
        { error: "Missing resume text or API key" },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: AIConfig.apiKey,
      baseURL: AIConfig.baseURL,
    });

    const prompt = `
You are an expert resume writer.
Enhance this resume for clarity, impact, and professional tone.
Keep the original structure. Resume:
${resumeText}
`;

    const completion = await client.chat.completions.create({
      model: AIConfig.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const upgradedResume =
      completion.choices?.[0]?.message?.content || "No response.";

    return NextResponse.json({ upgradedResume });
  } catch (error: any) {
    console.error("🔥 API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
