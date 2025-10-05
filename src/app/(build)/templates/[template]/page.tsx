"use client";
import { use, useState } from "react";
import { ResumeData } from "@/app/(site)/resume/types";
import Modern from "@/component/ModernTemplate";
import Classic from "@/component/ClassicTemplate";
import Creative from "@/component/CreativeTemplate";
import { useResumeStore } from "@/store/resumeStore";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import DownloadResume from "@/component/DownloadResume";

// Dummy data for template preview
const dummyData: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  linkedIn: "linkedIn.com/in/johndoe",
  website: "www.johndoe.com",
  location: "Lagos, Nigeria",
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
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      start: "2021",
      end: "Present",
      details: [
        "Led the migration of legacy apps to React/Next.js, improving performance by 40%.",
        " Collaborated with designers to create accessible UI components.",
      ],
    },
    {
      title: "Web Developer Intern",
      company: "Creative Studio",
      start: "2020",
      end: "2021",
      details: [
        "Assisted in building client websites with HTML, CSS, and JavaScript.",
        " Learned version control with Git and agile workflows.",
      ],
    },
  ],
  projects: [
    {
      projectName: "Ecommerce-store",
      url: "https://kingsleyobiora.vercel.app",
      description: [
        "A full-stack, responsive e-commerce web application built with React and Firebase.",
        "Technologies: React,  Firebase, Firestore, CSS3",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      institution: "State University",
      startDate: "2016",
      endDate: " 2020",
    },
  ],
};

export default function PreviewPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = use(params);

  // Set selected templates
  const [selected, setSelected] = useState(template);

  const router = useRouter();
  const { resumeData, setResumeData } = useResumeStore();
  return (
    <section className="p-6">
      <button
        className="flex items-center gap-1 mt-2 dark:bg-black/50 rounded-md text-lg ml-2 cursor-pointer fixed top-16 left-0 p-1"
        onClick={() => {
          return router.back();
        }}
        type="button"
      >
        <FaArrowLeft />
        Back
      </button>
      <div className="mt-6  mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl  font-bold ">
          {template.toUpperCase()} Template Preview
        </h2>
        <DownloadResume />
      </div>

      {/* Template Preview */}
      <div className="border p-4 rounded bg-white">
        {selected === "modern" && <Modern data={resumeData} />}
        {selected === "classic" && (
          <Classic data={resumeData.fullName ? resumeData : dummyData} />
        )}
        {selected === "creative" && (
          <Creative data={resumeData.fullName ? resumeData : dummyData} />
        )}
      </div>
    </section>
  );
}
