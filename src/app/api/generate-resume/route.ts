import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/config/firebaseAdmin";

// Call OpenAI
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
    //Auth cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized,no token found" },
        { status: 401 }
      );
    }

    // verify token
    let user;
    try {
      user = await adminAuth.verifyIdToken(token);
    } catch (err) {
      return NextResponse.json(
        { error: "Unauthorized, invalid token" },
        { status: 401 }
      );
    }
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized, failed to verify user" },
        { status: 401 }
      );
    }

    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "missing user data" }, { status: 400 });
    }

    //prompt
    const prompt = `You are a professional resume parser and formatter.  
Based on the information provided below, do the following:

1. Correct any spelling or formatting errors.
2. Complete or improve the summary section so that it matches the rest of the resume.
3. Format the entire resume into a structured JSON object using the schema below **as a reference**, but:
   -  Only include sections that actually exist in the user's data.
  
   -  Omit any key whose value would be an empty string, empty object, or empty array.
4. Do not include any explanations, markdown, code fences, or text outside the JSON object.
5. Return ONLY valid JSON.
6. Trim extra spaces before the website section

Schema (for reference only):
{
  "fullName": "...",
  "email": "...",
  "phone": "...",
  "linkedIn": "...",
  "website": "...",
  "location": "...",
  "summary": "...",
  "skills": [
    "skill1",
    "skill2"
  ],
  "experience": [
    {
      "title": "...",
      "company": "...",
      "start": "...",
      "end": "...",
      "details": [
        "detail1",
        "detail2"
      ]
    }
  ],
  "projects": [
    {
      "projectName": "...",
      "url": "...",
      "description": [
        "description1",
        "description2"
      ]
    }
  ],
  "education": [
    {
      "degree": "...",
      "institution": "...",
      "startDate": "...",
      "endDate": "..."
    }
  ]
}

User data:
${JSON.stringify(body)}
`;

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: process.env.NEXT_PUBLIC_MODEL || "",
        messages: [{ role: "user", content: prompt }],
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: "AI service error", details: err?.message || String(err) },
        { status: 502 }
      );
    }

    const raw = completion?.choices?.[0]?.message?.content?.trim() ?? "";
    if (!raw) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 502 }
      );
    }

    // format using REGEX
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "No JSON data found in AI response", raw },
        { status: 422 }
      );
    }

    // Parse JSON
    let parsed: any = null;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseErr: any) {
      return NextResponse.json(
        {
          error: "Failed to parse AI JSON",
          message: parseErr.message,
          raw: jsonMatch[0].slice(0, 2000),
        },
        { status: 422 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || String(error),
      },
      { status: 520 }
    );
  }
}
