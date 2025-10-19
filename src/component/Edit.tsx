import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { useRouter } from "next/navigation";

const Edit = () => {
  const { setEditting } = useResumeStore();
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 ">
      <button
        onClick={() => {}}
        className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50 cursor-pointer"
      >
        Save
      </button>

      <button
        onClick={() => {
          setEditting(false);
          router.push("/resume");
        }}
        className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
};

export default Edit;
