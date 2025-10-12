"use client";
import { useResumeStore } from "@/store/resumeStore";
import { FaFileDownload, FaRegSave } from "react-icons/fa";
import { saveUserResume } from "@/store/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

export default function DownloadButtons() {
  const { resumeData, template } = useResumeStore();
  const { user } = useAuthStore();

  const handleDownload = async (type: "pdf" | "docx") => {
    if (Object.keys(resumeData).length === 0) return;
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

  async function handleSave() {
    if (!user || Object.keys(resumeData).length === 0) {
      toast.error("No resume data to save");
      return;
    }

    try {
      await saveUserResume(user?.uid, resumeData, template);
      console.log("Save functionality to be implemented");
    } catch (err: any) {
      console.log(err.message);
      toast.error("error saving resume");
    }
  }

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => handleSave()}
        className="border-s-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-1 "
      >
        <FaRegSave size={20} />
        Save Resume
      </button>
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
