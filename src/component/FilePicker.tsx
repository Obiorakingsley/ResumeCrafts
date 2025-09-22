"use client";
import { Span } from "next/dist/trace";
import { useState } from "react";
import { FaFile } from "react-icons/fa";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor="resume-upload"
        className="cursor-pointer border-2 text-white px-3 py-3 transition-all rounded-lg shadow hover:scale-105"
      >
        {file ? (
          <p className="text-sm text-white flex items-center gap-2">
            <FaFile size={30} />{" "}
            <span className="font-semibold">
              {file.name.substring(0, 20) + "..."}
            </span>
            .
          </p>
        ) : (
          <span className="font-semibold"> Upload Current Resume</span>
        )}
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
