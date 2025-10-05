"use client";
import { useResumeStore } from "@/store/resumeStore";
import { FaFileDownload } from "react-icons/fa";

export default function DownloadButtons() {
  const { resumeData, template } = useResumeStore();

  const handleDownload = async (type: "pdf" | "docx") => {
    if (!resumeData) return;
    const res = await fetch(`/api/download-${template}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...resumeData,
        fileType: type,
        template: template,
      }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume.${type}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => handleDownload("pdf")}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-1 "
      >
        <FaFileDownload size={20} />
        Download PDF
      </button>
      <button
        type="button"
        onClick={() => handleDownload("docx")}
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-1"
      >
        <FaFileDownload />
        Download DOCX
      </button>
    </div>
  );
}
