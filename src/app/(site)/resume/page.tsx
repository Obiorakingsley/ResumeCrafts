"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/lib/config/firebase";
import { deleteResume } from "@/store/firestore";
import { toast } from "react-toastify";
import { editResume } from "@/store/firestore";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";

const page = () => {
  const { profile, resumes, loading } = useAuthStore();
  const { setResumeData, resetResumeData, setEditting } = useResumeStore();
  const user = auth.currentUser;
  const router = useRouter();
  const [resume, setResume] = useState(resumes);

  useEffect(() => {
    async function updateUi() {
      setResume(resumes);
    }
    updateUi();
  }, [loading, resumes]);

  //Edit Resume
  async function handleEdit(id: string) {
    try {
      if (!user?.uid) return;
      setEditting(true);
      resetResumeData();
      const data: any = await editResume(user?.uid, id);
      setResumeData(data.data);
      router.push("/build");
    } catch (err: any) {
      toast.error("Faild to edit resume");
    }
  }

  //Delete Resume

  async function handleDelete(id: string) {
    try {
      if (!user) return;
      await deleteResume(user?.uid, id);
      toast.success("Resume deleted successfully");
      setResume((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    } catch (error: any) {
      toast.error("Error deleting resume:");
    }
  }

  return (
    // List of Completed Resume
    <>
      {!loading ? (
        <section className=" p-4 pb-12 min-w-full">
          {!resume.length ? (
            <div className="flex flex-col justify-center min-h-[75vh] items-center gap-2">
              <h1 className="text-2xl">No Saved Resume to Show</h1>
              <button
                onClick={() => {
                  router.push("/build");
                }}
                className="py-2 px-4 bg-indigo-500 rounded-md cursor-pointer"
              >
                Create One
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg sm:text-xl mb-16 font-semibold">
                My Resume
              </h2>
              <div className="flex flex-wrap gap-8 justify-center sm:justify-start w-full">
                {resume.map((res: any) => {
                  console.log(res);

                  return (
                    <div
                      key={res.id}
                      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full max-w-[350px]"
                    >
                      <img
                        src="/images/resume.png"
                        alt="Software Engineer Resume Thumbnail"
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <button
                          onClick={() => {
                            handleEdit(res.id);
                          }}
                          title="edit"
                          className="text-white cursor-pointer"
                        >
                          <span className="absolute left-[5000px]">edit</span>
                          <FaEdit size={25} />
                        </button>
                        <button
                          disabled={loading}
                          onClick={() => {
                            handleDelete(res.id);
                          }}
                          title="delete"
                          className=" text-white cursor-pointer p-2"
                        >
                          <span className="absolute left-[5000px]">delete</span>
                          <FaTrashAlt size={25} fill="#ff0000" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {res.id || "Untitled Resume"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>{" "}
            </>
          )}
        </section>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="relative m-auto w-10 h-10">
            <span className="border-4 border-t-transparent border-indigo-600 absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
