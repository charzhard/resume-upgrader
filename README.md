# 🚀 Resume Upgrader

An **AI-powered resume enhancement tool** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and configurable **AI backends (OpenAI, Anthropic, etc.)**.  
It intelligently upgrades resumes for better clarity, tone, and professional impact.

---

## 🧠 Features

- ✨ AI-enhanced resume improvement using configurable LLMs  
- ⚙️ Modular architecture with clean `app/` and `lib/` separation  
- 🧩 Environment-based model configuration (`.env.local`)  
- 💡 Built with **Next.js App Router**, **TypeScript**, and **TailwindCSS**  
- 📦 Ready for **Vercel** or **Docker** deployment  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 16 (App Router) + React 18 |
| Styling | Tailwind CSS |
| Backend | Next.js Route Handlers (Edge Ready) |
| Language | TypeScript |
| AI Integration | OpenAI SDK (configurable) |
| Version Control | Git + GitHub |
| Deployment (future) | Vercel / Docker |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/charzhard/resume-upgrader.git
cd resume-upgrader

---
# Resume Upgrader - Day 3 (Clerk + Supabase)

## What is included
- Clerk auth integration (sign-up, sign-in)
- Protected dashboard
- Supabase integration (save resumes to PostgreSQL)
- OpenAI integration (resume upgrade)
- Supabase storage helper ready for PDF upload

## Quick start
1. Copy files into your Next.js project (see file paths).
2. Install dependencies:
   npm install @clerk/nextjs @supabase/supabase-js openai
3. Create a .env.local from .env.example
4. Run dev:
   npm run dev

## Supabase
Run `supabase_schema.sql` in your Supabase project's SQL editor to create the `resumes` table.
