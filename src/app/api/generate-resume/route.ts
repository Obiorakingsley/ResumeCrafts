import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

//Query Openai
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "",
    "X-Title": "Resume Craft",
  },
  apiKey: process.env.API_KEY,
});

//Post request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // -  Do NOT create or guess content for missing sections (e.g., projects).

    const prompt = `You are a professional resume parser and formatter.  
Based on the information provided below, do the following:

1. Correct any spelling or formatting errors.
2. Complete or improve the summary section so that it matches the rest of the resume.
3. Format the entire resume into a structured JSON object using the schema below **as a reference**, but:
   -  Only include sections that actually exist in the user's data.
  
   -  Omit any key whose value would be an empty string, empty object, or empty array.
4. Do not include any explanations, markdown, code fences, or text outside the JSON object.
5. Return ONLY valid JSON.

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

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free" /*"deepseek/deepseek-r1:free"*/,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    //Format response using REGEX
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
