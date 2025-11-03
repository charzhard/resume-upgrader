import OpenAI from "openai";
import { AI_CONFIG } from "./config";

export const openai = new OpenAI({
  apiKey: AI_CONFIG.apiKey,
  baseURL: AI_CONFIG.baseURL,
});
