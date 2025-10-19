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
  Table,
  TableRow,
  TableCell,
  WidthType,
  TabStopType,
  BorderStyle,
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
async function generateModernPDF(data: any) {
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

    // Layout dimensions
    const pageWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const leftColWidth = pageWidth * 0.3; // 30% for sidebar
    const rightColWidth = pageWidth * 0.65; // 65% for main
    const gutter = pageWidth * 0.05; // space between columns

    let topY = doc.y;

    //LEFT SIDEBAR
    // ============================
    doc.x = doc.page.margins.left;
    doc.y = topY;

    // Full Name
    doc
      .font("Roboto-Bold")
      .fontSize(20)
      .fillColor("black")
      .text(data.fullName || "", {
        width: leftColWidth,
        align: "left",
      });
    doc.moveDown(0.5);

    // Contact Info
    if (data.location) {
      doc
        .font("Roboto")
        .fontSize(11)
        .text(data.location, { width: leftColWidth });
    }
    if (data.phone) {
      doc.font("Roboto").fontSize(11).text(data.phone, { width: leftColWidth });
    }
    if (data.email) {
      doc
        .font("Roboto")
        .fontSize(11)
        .fillColor("black")
        .text(data.email, {
          width: leftColWidth,
          link: `mailto:${data.email}`,
          underline: true,
        });
    }
    if (data.linkedIn) {
      doc.font("Roboto").fontSize(11).fillColor("black").text(data.linkedIn, {
        width: leftColWidth,
        link: data.linkedIn,
      });
    }
    if (data.website) {
      doc.font("Roboto").fontSize(11).fillColor("black").text(data.website, {
        width: leftColWidth,
        link: data.website,
      });
    }

    // === Skills in Sidebar ===
    if (data.skills?.length) {
      doc.moveDown(1);
      doc.font("Roboto-Bold").fontSize(14).fillColor("black").text("Skills", {
        width: leftColWidth,
        align: "left",
      });
      doc.moveDown(0.3);

      data.skills.forEach((skill: string) => {
        doc.font("Roboto").fontSize(11).fillColor("black").text(skill, {
          width: leftColWidth,
          align: "left",
        });
      });
    }

    doc.x = doc.page.margins.left + leftColWidth + gutter;
    doc.y = topY;

    function sectionHeading(title: string) {
      doc.moveDown(0.5);
      doc
        .font("Roboto-Bold")
        .fontSize(14)
        .fillColor("black")
        .text(title.toUpperCase(), { width: rightColWidth });
      doc.moveDown(0.2);

      // underline
      const x = doc.x;
      const y = doc.y;
      doc
        .moveTo(x, y)
        .lineTo(x + rightColWidth, y)
        .lineWidth(1)
        .strokeColor("black")
        .stroke();
      doc.moveDown(0.3);
    }

    // === Summary ===
    if (data.summary) {
      sectionHeading("Summary");
      doc.font("Roboto").fontSize(12).fillColor("black").text(data.summary, {
        width: rightColWidth,
        align: "left",
      });
    }

    // === Experience ===
    if (data.experience?.length) {
      sectionHeading("Experience");
      data.experience.forEach((exp: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .text(`${exp.title} – ${exp.company}`, {
            width: rightColWidth,
          });
        doc.font("Roboto").fontSize(10).text(`${exp.start} - ${exp.end}`, {
          width: rightColWidth,
        });

        exp.details?.forEach((line: string) => {
          doc.font("Roboto").fontSize(11).text(`• ${line}`, {
            width: rightColWidth,
            indent: 10,
          });
        });
        doc.moveDown(0.5);
      });
    }

    // === Projects ===
    if (data.projects?.length) {
      sectionHeading("Projects");
      data.projects.forEach((proj: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .text(proj.projectName || "", {
            width: rightColWidth,
          });
        if (proj.url) {
          doc.font("Roboto").fontSize(11).fillColor("black").text(proj.url, {
            link: proj.url,
            underline: true,
            width: rightColWidth,
          });
        }
        proj.description?.forEach((desc: string) => {
          doc.font("Roboto").fontSize(11).text(`• ${desc}`, {
            indent: 10,
            width: rightColWidth,
          });
        });
        doc.moveDown(0.5);
      });
    }

    // === Education ===
    if (data.education?.length) {
      sectionHeading("Education");
      data.education.forEach((edu: any) => {
        doc
          .font("Roboto-Bold")
          .fontSize(12)
          .text(`${edu.degree} – ${edu.institution}`, { width: rightColWidth });
        doc
          .font("Roboto")
          .fontSize(11)
          .text(`${edu.startDate} - ${edu.endDate}`, { width: rightColWidth });
        doc.moveDown(0.4);
      });
    }

    doc.end();
  });
}

/////////////////////////////////////////////////

// Generate DOCX
async function generateModernDOCX(data: any) {
  //Heading section
  const sectionHeading = (text: string) =>
    new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 },
    });

  // Left column content (Sidebar)
  const leftColumn: Paragraph[] = [
    // Full Name
    new Paragraph({
      text: data.fullName || "",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
    }),

    // Contact Info
    ...(data.location
      ? [new Paragraph({ text: data.location, alignment: AlignmentType.LEFT })]
      : []),
    ...(data.phone
      ? [new Paragraph({ text: data.phone, alignment: AlignmentType.LEFT })]
      : []),
    ...(data.email
      ? [
          new Paragraph({
            children: [new TextRun({ text: data.email, style: "Hyperlink" })],
          }),
        ]
      : []),
    ...(data.linkedIn
      ? [
          new Paragraph({
            children: [
              new TextRun({ text: data.linkedIn, style: "Hyperlink" }),
            ],
          }),
        ]
      : []),
    ...(data.website
      ? [
          new Paragraph({
            children: [new TextRun({ text: data.website, style: "Hyperlink" })],
          }),
        ]
      : []),

    new Paragraph({ text: "", spacing: { after: 300 } }), // spacing after contact section

    // Skills
    ...(data.skills?.length
      ? [
          sectionHeading("Skills"),
          new Paragraph({
            text: data.skills.join(", "),
            spacing: { after: 200 },
          }),
        ]
      : []),
  ];

  //Right column content (Main)
  const rightColumn: Paragraph[] = [
    // Summary
    ...(data.summary
      ? [
          sectionHeading("Summary"),
          new Paragraph({ text: data.summary, spacing: { after: 200 } }),
        ]
      : []),

    // Experience
    ...(data.experience?.length
      ? [
          sectionHeading("Experience"),
          ...data.experience.flatMap((exp: any) => [
            // 🧱 Title + Dates on same line
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} – ${exp.company}`,
                  bold: true,
                  size: 20,
                }),
                new TextRun({
                  text: "\t", // tab for right alignment
                }),
                new TextRun({
                  text: `${exp.start} - ${exp.end}`,
                  size: 18,
                }),
              ],
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: 9000,
                },
              ],
              spacing: { after: 80 },
            }),

            //Bullet points for details
            ...exp.details.map(
              (d: string) =>
                new Paragraph({
                  text: `• ${d}`,
                  spacing: { after: 80 },
                })
            ),

            // Add space after each experience block
            new Paragraph({ text: "", spacing: { after: 200 } }),
          ]),
        ]
      : []),

    // Projects
    ...(data.projects?.length
      ? [
          sectionHeading("Projects"),
          ...data.projects.flatMap((proj: any) => [
            new Paragraph({
              children: [
                new TextRun({ text: proj.projectName, bold: true }),
                proj.url
                  ? new TextRun({ text: ` | ${proj.url}` })
                  : new TextRun(""),
              ],
              spacing: { after: 100 },
            }),
            ...proj.description.map(
              (d: string) =>
                new Paragraph({
                  text: `• ${d}`,
                  spacing: { after: 100 },
                })
            ),
          ]),
        ]
      : []),

    // Education
    ...(data.education?.length
      ? [
          sectionHeading("Education"),
          ...data.education.map(
            (edu: any) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} – ${edu.institution}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: "\t", // tab for right alignment
                  }),
                  new TextRun({
                    text: `${edu.startDate} - ${edu.endDate}`,
                  }),
                ],
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: 9000,
                  },
                ],
                spacing: { after: 200 },
              })
          ),
        ]
      : []),
  ];

  //Two column table
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: leftColumn,
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: rightColumn,
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        children: [table],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
