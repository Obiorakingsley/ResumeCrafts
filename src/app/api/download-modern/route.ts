export const runtime = "nodejs";

import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";

export async function POST(req: Request) {
  const data = await req.json();
  const fileType = data.fileType || "pdf";

  if (fileType === "pdf") {
    const pdfBuffer = await generateModernPDF(data);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } else if (fileType === "docx") {
    const docxBuffer = await generateModernDOCX(data);

    return new NextResponse(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=resume.docx",
      },
    });
  }

  return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
}

//Modern Resume template

// Generate PDF
export async function generateModernPDF(data: any) {
  return new Promise<Buffer>((resolve) => {
    const regularFont = path.resolve("./public/fonts/Roboto-Regular.ttf");
    const boldFont = path.resolve("./public/fonts/Roboto-Bold.ttf");

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      font: regularFont,
    });

    // Register fonts
    doc.registerFont("Roboto", fs.readFileSync(regularFont));
    doc.registerFont("Roboto-Bold", fs.readFileSync(boldFont));

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    // Header section
    doc
      .font("Roboto-Bold")
      .fontSize(24)
      .fillColor("black")
      .text(data.fullName || "", { align: "left" });
    doc.moveDown(0.3);

    doc
      .font("Roboto")
      .fontSize(12)
      .fillColor("black")
      .text(data.location || "", { align: "left" });
    doc.text(data.phone || "", { align: "left" });
    doc.fillColor("black").text(data.email || "", {
      align: "left",
      link: data.email ? `mailto:${data.email}` : undefined,
      underline: true,
    });

    if (data.linkedIn || data.website) {
      let linksLine = "";
      if (data.linkedIn) linksLine += data.linkedIn;
      if (data.website) linksLine += `    ${data.website}`;
      doc
        .font("Roboto")
        .fontSize(12)
        .fillColor("black")
        .text(linksLine, {
          align: "left",
          link: data.linkedIn || data.website,
          underline: true,
        });
    }

    doc.moveDown(0.8);

    // Reusable Section Heading
    function sectionHeading(title: string) {
      doc.moveDown(0.8);
      const x = doc.x;
      const y = doc.y;
      const width =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      doc
        .moveTo(x, y)
        .lineTo(x + width, y)
        .lineWidth(1)
        .strokeColor("black")
        .stroke();
      doc.moveDown(0.4);
      doc.font("Roboto-Bold").fontSize(18).fillColor("black").text(title); // ⬅ increased from 14 → 18
      doc.moveDown(0.3);
    }

    // Summary
    if (data.summary) {
      sectionHeading("Summary");
      doc.font("Roboto").fontSize(12).fillColor("black").text(data.summary);
    }

    // Skills
    if (data.skills?.length) {
      sectionHeading("Skills");
      const skillsText = data.skills.join("  •  ");
      doc
        .font("Roboto")
        .fontSize(12)
        .fillColor("black")
        .text(skillsText, { align: "left" });
    }

    // Experience
    if (data.experience?.length) {
      sectionHeading("Experience");
      data.experience.forEach((exp: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .fillColor("black")
          .text(`${exp.title} – ${exp.company}`);
        doc
          .font("Roboto")
          .fontSize(10)
          .fillColor("black")
          .text(`${exp.start} - ${exp.end}`);

        if (exp.details?.length) {
          exp.details.forEach((line: string) => {
            doc
              .font("Roboto")
              .fontSize(11)
              .fillColor("black")
              .text(`• ${line}`, { indent: 10 });
          });
        }
        doc.moveDown(0.5);
      });
    }

    // Projects
    if (data.projects?.length) {
      sectionHeading("Projects");
      data.projects.forEach((proj: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .fillColor("black")
          .text(proj.projectName || "");
        if (proj.url) {
          doc.font("Roboto").fontSize(11).fillColor("black").text(proj.url, {
            link: proj.url,
            underline: true,
          });
        }

        proj.description?.forEach((desc: string) => {
          doc
            .font("Roboto")
            .fontSize(11)
            .fillColor("black")
            .text(`• ${desc}`, { indent: 10 });
        });
        doc.moveDown(0.5);
      });
    }

    // Education
    if (data.education?.length) {
      sectionHeading("Education");
      data.education.forEach((edu: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .fillColor("black")
          .text(`${edu.degree} – ${edu.institution}`);
        doc
          .font("Roboto")
          .fontSize(11)
          .fillColor("black")
          .text(`${edu.startDate} - ${edu.endDate}`);
        doc.moveDown(0.4);
      });
    }

    doc.end();
  });
}

/////////////////////////////////////////////////

// Generate DOCX
async function generateModernDOCX(data: any) {
  const doc = new Document({
    sections: [
      {
        children: [
          //  Full Name
          new Paragraph({
            text: data.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.LEFT,
            spacing: { after: 200 },
          }),

          // Contact Info
          new Paragraph({
            text: data.location,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: data.phone,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({ text: data.email, style: "Hyperlink" })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.linkedIn, style: "Hyperlink" }),
            ],
            alignment: AlignmentType.LEFT,
          }),

          ,
          ...(data.website
            ? [
                new Paragraph({
                  children: [
                    new TextRun({ text: data.website, style: "Hyperlink" }),
                  ],
                  alignment: AlignmentType.LEFT,
                }),
              ]
            : []),
          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Summary
          ...(data.summary
            ? [
                new Paragraph({
                  text: "Summary",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: data.summary,
                  spacing: { after: 200 },
                }),
              ]
            : []),

          // Skills
          ...(data.skills?.length
            ? [
                new Paragraph({
                  text: "Skills",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 100 },
                }),
                new Paragraph({
                  text: data.skills.join(", "),
                  spacing: { after: 200 },
                }),
              ]
            : []),

          // Experience
          ...(data.experience?.length
            ? [
                new Paragraph({
                  text: "Experience",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 100 },
                }),
                ...data.experience.flatMap((exp: any) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${exp.title} – ${exp.company}`,
                        bold: true,
                      }),
                      new Paragraph({
                        text: `\u00A0\u00A0|\u00A0\u00A0${exp.start} - ${exp.end}`,
                      }),
                    ],
                  }),

                  ...exp.details.map(
                    (d: string) =>
                      new Paragraph({
                        text: `• ${d}`,
                        spacing: { after: 400 },
                      })
                  ),
                ]),
              ]
            : []),

          // Projects
          ...(data.projects?.length
            ? [
                new Paragraph({
                  text: "Projects",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 100 },
                }),
                ...data.projects.flatMap((proj: any) => [
                  new Paragraph({
                    children: [
                      new TextRun({ text: proj.projectName, bold: true }),
                      new TextRun({ text: ` | ${proj.url}` }),
                    ],
                  }),
                  ...proj.description.map(
                    (d: string) =>
                      new Paragraph({
                        text: `• ${d}`,
                        spacing: { after: 200 },
                      })
                  ),
                ]),
              ]
            : []),

          //Education
          ...(data.education?.length
            ? [
                new Paragraph({
                  text: "Education",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 100 },
                }),
                ...data.education.map(
                  (edu: any) =>
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${edu.degree} – ${edu.institution}`,

                          bold: true,
                        }),
                        new TextRun({
                          text: `\u00A0\u00A0|\u00A0\u00A0${edu.startDate} - ${edu.endDate}`,
                        }),
                      ],
                      spacing: { after: 200 },
                    })
                ),
              ]
            : []),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
