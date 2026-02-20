import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resume } = body;

    const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
    console.log("🔥 Provider:", provider);

    if (!resume) {
      return NextResponse.json({ error: "Missing resume text" }, { status: 400 });
    }

    // -----------------------------------------------------
    // GOOGLE GEMINI
    // -----------------------------------------------------
    if (provider === "google") {
      const apiKey = process.env.GOOGLE_GENAI_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
          { error: "Google API key missing in environment" },
          { status: 500 }
        );
      }

      const model = process.env.GENAI_MODEL || "gemini-2.0-flash";

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Upgrade this resume:\n\n${resume}`
                }
              ]
            }
          ]
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        console.log("Gemini error:", data);
        return NextResponse.json({ error: data }, { status: 500 });
      }

      const result =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

      return NextResponse.json({ result });
    }

    // -----------------------------------------------------
    // OPENAI
    // -----------------------------------------------------
    if (provider === "openai") {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
          { error: "OpenAI API key missing in environment" },
          { status: 500 }
        );
      }

      const url = "https://api.openai.com/v1/chat/completions";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a resume optimization assistant." },
            { role: "user", content: `Upgrade this resume:\n\n${resume}` },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("OpenAI Error:", data);
        return NextResponse.json({ error: data }, { status: 500 });
      }

      return NextResponse.json({
        result: data.choices?.[0]?.message?.content || "No output",
      });
    }

    // -----------------------------------------------------
    // INVALID PROVIDER
    // -----------------------------------------------------
    return NextResponse.json(
      { error: `Unknown AI provider: ${provider}` },
      { status: 400 }
    );
  } catch (err: any) {
    console.log("❌ API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
