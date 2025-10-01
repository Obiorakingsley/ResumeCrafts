export const runtime = "nodejs";

import { NextResponse } from "next/server";

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.js");

const mammoth = require("mammoth");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name.toLowerCase();

    let textContent = "";

    if (fileName.endsWith(".pdf")) {
      textContent = await extractTextFromPDF(buffer);
    } else if (fileName.endsWith(".docx")) {
      textContent = await extractTextFromDocx(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload .pdf or .docx" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: textContent,
    });
  } catch (error: any) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Extract text from PDF using pdf.js
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer.buffer),
  }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return text.trim();
}

// Extract text from DOCX using mammoth
async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value.trim();
}
