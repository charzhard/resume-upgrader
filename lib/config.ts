export const AIConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
};

export const APP_CONFIG = {
  freeMonthlyCredits: Number(process.env.FREE_MONTHLY_CREDITS || 3),
};
