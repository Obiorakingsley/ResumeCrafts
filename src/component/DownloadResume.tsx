"use client";
import { useResumeStore } from "@/store/resumeStore";
import { FaFileDownload, FaLock, FaRegSave } from "react-icons/fa";
import { saveUserResume } from "@/store/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { useState } from "react";
import { auth } from "@/lib/config/firebase";

export default function DownloadButtons() {
  const { resumeData, template } = useResumeStore();
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleDownload = async (type: "pdf" | "docx") => {
    if (!auth.currentUser && type === "docx") {
      toast.success("Please Sign In to continue");
      return;
    }

    if (type === "docx" && profile?.plan === "free") {
      toast.success("Template only available to pro users");
      return;
    }
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
    setLoading(true);
    try {
      await saveUserResume(user?.uid, resumeData, template);

      setLoading(false);
    } catch (err: any) {
      toast.error("error saving resume");
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4">
      <button
        disabled={loading}
        type="button"
        onClick={() => handleSave()}
        className="border-s-green-600 border dark:border-white dark:text-white text-black py-2 rounded cursor-pointer flex items-center justify-center w-20 gap-1 text-xs sm:text-sm "
      >
        {loading ? (
          <span>Saving...</span>
        ) : (
          <>
            <FaRegSave size={18} />
            Save
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => handleDownload("pdf")}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-1 text-xs sm:text-sm"
      >
        <FaFileDownload size={15} />
        PDF
      </button>
      <button
        type="button"
        onClick={() => handleDownload("docx")}
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-1 text-xs sm:text-sm"
      >
        <FaFileDownload size={15} />
        DOCX
      </button>
    </div>
  );
}
