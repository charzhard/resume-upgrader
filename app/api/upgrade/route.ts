import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { RESUME_PROMPT_TEMPLATE } from '@/constants/resume';
import { saveResumeToDB } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { resume, title } = body;
    if (!resume || typeof resume !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const prompt = RESUME_PROMPT_TEMPLATE(resume);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert resume writer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
    });

    const upgraded = completion?.choices?.[0]?.message?.content ?? '';

    const record = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: title || null,
      original_text: resume,
      upgraded_text: upgraded,
    };

    await saveResumeToDB(record);

    return NextResponse.json({ upgraded, id: record.id });
  } catch (err: any) {
    console.error('/api/upgrade error:', err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
