import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { skills, jobTitle, experience, phone, email, website } = body;

  const prompt = `
  You are a professional resume writer. Based on the following info, generate a JSON object with a full resume structure:
  - Job Title: ${jobTitle}
  - Years of Experience: ${experience}
  - Skills: ${skills}

  Structure it like this:
  {
    "name": "Full Name",
    "email": "example@email.com",
    "phone": "123456789",
    "summary": "...",
    "skills": ["Skill1", "Skill2"],
    "experience": [
      {
        "title": "...",
        "company": "...",
        "start": "YYYY-MM",
        "end": "YYYY-MM",
        "role": "Detailed bullet points..."
      }
    ],
    "education": [
      {
        "school": "...",
        "degree": "...",
        "start": "YYYY",
        "end": "YYYY"
      }
    ]
  }
  Only return valid JSON.
  `;

  const messages = [
    {
      role: "system",
      content: "You are an expert resume writer.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": "https://your-site.com", // optional
        // "X-Title": "AI Resume Builder", // optional
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v3.1-terminus",
        messages,
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
