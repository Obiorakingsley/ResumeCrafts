import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "",
    "X-Title": "Resume Craft",
  },
  apiKey: process.env.API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = `
  You are a professional resume writer. Based on the following info, format the resume, check for errors and complete the summary section to match the resume, note(only only return valid json data, nothing else) ${JSON.stringify(
    body
  )}
  `;
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free" /*"deepseek/deepseek-r1:free"*/,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message?.content || "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    let json = {};

    if (jsonMatch) {
      try {
        json = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse AI JSON:", e, raw);
      }
    }

    return NextResponse.json(json);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "faild to fetch" }, { status: 500 });
  }
}
