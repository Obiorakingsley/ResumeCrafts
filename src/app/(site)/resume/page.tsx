"use client";
import React, { useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";

const page = () => {
  const { profile, resumes, loading } = useAuthStore();

  return (
    // List of Completed Resume
    <>
      {!loading ? (
        <section className=" p-4 pb-12 min-w-full">
          <h2 className="text-lg sm:text-xl mb-16 font-semibold">My Resume</h2>
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start w-full">
            {resumes.map((res: any) => {
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button title="edit" className="text-white cursor-pointer">
                      <span className="absolute left-[5000px]">edit</span>
                      <FaEdit size={25} />
                    </button>
                    <button
                      title="delete"
                      className=" text-white cursor-pointer p-2"
                    >
                      <span className="absolute left-[5000px]">delete</span>
                      <FaTrashAlt size={25} fill="#ff0000" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      Software Engineer Resume
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="relative m-auto w-10 h-10">
            <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
