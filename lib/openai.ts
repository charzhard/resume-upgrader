import OpenAI from "openai";
import { AIConfig  } from "./config";

export const openai = new OpenAI({
  apiKey: AIConfig .apiKey,
  baseURL: AIConfig .baseURL,
});
