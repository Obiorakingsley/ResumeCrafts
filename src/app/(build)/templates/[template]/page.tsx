"use client";
import { use, useState } from "react";
import { ResumeData } from "@/app/(site)/resume/types";
import Modern from "@/component/ModernTemplate";
import Classic from "@/component/ClassicTemplate";
import Creative from "@/component/CreativeTemplate";
import Button from "../../_Utils/Button";

const resumeData: ResumeData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  linkedIn: "linkedIn.com/in/johndoe",
  website: "www.johndoe.com",
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
      years: { start: "2021", end: "Present" },
      details: [
        "Led the migration of legacy apps to React/Next.js, improving performance by 40%.",
        " Collaborated with designers to create accessible UI components.",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "Creative Studio",
      years: { start: "2020", end: "2021" },
      details: [
        "Assisted in building client websites with HTML, CSS, and JavaScript.",
        " Learned version control with Git and agile workflows.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      school: "State University",
      years: { start: "2016 ", end: " 2020" },
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
    <section className="p-6">
      <Button path="/templates" />
      <h2 className="text-2xl sm:text-3xl mt-6 font-bold mb-6">
        {template.toUpperCase()} Template Preview
      </h2>

      {/* Template Preview */}
      <div className="border p-4 rounded bg-white">
        {selected === "modern" && <Modern data={resumeData} />}
        {selected === "classic" && <Classic data={resumeData} />}
        {selected === "creative" && <Creative data={resumeData} />}
      </div>
    </section>
  );
}
