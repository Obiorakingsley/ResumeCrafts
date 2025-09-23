"use client";
import { use, useState } from "react";
import { ResumeData } from "@/app/(site)/resume/types";
import ResumeTemplate1 from "@/component/ModernTemplate";
import ResumeTemplate2 from "@/component/ClassicTemplate";
import ResumeTemplate3 from "@/component/CreativeTemplate";

const resumeData: ResumeData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  summary:
    "Frontend Developer with 3+ years of experience building responsive web applications. Passionate about React, Next.js, and crafting clean UI/UX experiences.",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Tech Solutions Inc.",
      years: "2021 - Present",
      details:
        "Led the migration of legacy apps to React/Next.js, improving performance by 40%. Collaborated with designers to create accessible UI components.",
    },
    {
      role: "Web Developer Intern",
      company: "Creative Studio",
      years: "2020 - 2021",
      details:
        "Assisted in building client websites with HTML, CSS, and JavaScript. Learned version control with Git and agile workflows.",
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      school: "State University",
      years: "2016 - 2020",
    },
  ],
};

export default function PreviewPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = use(params);
  const [selected, setSelected] = useState(template);

  return (
    <main className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        {template.toUpperCase()} Template Preview
      </h2>

      {/* Template Preview */}
      <div className="border p-4 rounded bg-white">
        {selected === "modern" && <ResumeTemplate1 data={resumeData} />}
        {selected === "classic" && <ResumeTemplate2 data={resumeData} />}
        {selected === "creative" && <ResumeTemplate3 data={resumeData} />}
      </div>
    </main>
  );
}
