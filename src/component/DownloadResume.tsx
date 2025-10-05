"use client";
import { useResumeStore } from "@/store/resumeStore";

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
        onClick={() => handleDownload("pdf")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
      <button
        onClick={() => handleDownload("docx")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download DOCX
      </button>
    </div>
  );
}
