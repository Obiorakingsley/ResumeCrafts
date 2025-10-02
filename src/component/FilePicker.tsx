"use client";

import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";
import { useResumeStore } from "@/store/resumeStore";
import { useRouter } from "next/navigation";

export default function UploadResume() {
  const router = useRouter();
  const { setResumeData, resumeData } = useResumeStore();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle file selection
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  //Trigger file upload when file state changes
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  async function handleFileUpload() {
    //Upload file to server and parse
    try {
      if (!file) return;
      setError("");
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      //Check for errors and update state

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "something went wrong");
      setResumeData(data.text);
      console.log("Parsed resume data:", resumeData);

      // Simulate delay for better UX
      await new Promise((r) => setTimeout(r, 300));

      router.push("/templates");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-40">
      <label
        htmlFor="resume-upload"
        className="cursor-pointer border-2 text-white px-3 py-3 transition-all rounded-lg shadow hover:scale-105 w-40"
      >
        {loading ? (
          <div className="relative m-auto w-6 h-6">
            <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
          </div>
        ) : file ? (
          <p className="text-sm text-white flex items-center gap-2">
            <FaFile size={30} />{" "}
            <span className="font-semibold">
              {file.name.substring(0, 20) + "..."}
            </span>
          </p>
        ) : (
          "Upload & Update"
        )}
        <input
          id="resume-upload"
          disabled={loading}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
