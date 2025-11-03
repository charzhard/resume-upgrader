export const AIConfig = {
  provider: process.env.AI_PROVIDER || "openai",
  apiKey: process.env.OPENAI_API_KEY || "",
  baseURL: process.env.OPENAI_API_URL || "https://api.openai.com/v1",
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
};
