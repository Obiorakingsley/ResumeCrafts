"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";

import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { auth } from "@/lib/config/firebase";

const page = () => {
  const { resumeData, setResumeData, template, setTemplate } = useResumeStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setModal } = useAuthStore();
  const user = auth.currentUser;
  //Make Request to Openai
  async function fetchData(temp: string) {
    if (!user) {
      return setModal(true);
    }
    if (!resumeData || Object.keys(resumeData).length === 0) {
      return toast.warn("Please fill out your resume.");
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/generate-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      //Add Response to State
      const data = await res.json();
      if (!data) return;

      setResumeData(data);
      console.log("Resume data updated:", resumeData);
      router.push(`/templates/${temp}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    //List of available Templates
    <>
      {useAuthStore().loading ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid mb-4"></div>
        </div>
      ) : (
        <section className="flex-grow container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Craft Your Professional Story
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose a template that best represents your professional journey.
              Each design is crafted to highlight your skills and experience
              effectively.
            </p>
          </div>

          {/* Modern Template */}
          <div className="space-y-8">
            <div
              onClick={() => {
                setTemplate("modern");
              }}
              className="bg-white relative dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container"
            >
              <span className="absolute right-0 top-0 text-indigo-500 p-4">
                {template === "modern" && <FaCircleCheck size={20} />}
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="modern-bg col-span-1 lg:col-span-2 h-64 lg:h-full bg-cover bg-slate-100 bg-center"></div>
                <div className="col-span-1 lg:col-span-3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Modern Professional
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    A sleek, contemporary design that emphasizes clarity and
                    impact, ideal for showcasing a progressive career.
                  </p>
                  <div className="flex items-center justify-start">
                    <button
                      disabled={loading}
                      onClick={() => {
                        fetchData("modern");
                      }}
                      className={` bg-indigo-600 text-white font-bold text-sm py-2 h-9 w-35 rounded-lg text-center hover:bg-indigo-700 transition-colors cursor-pointer ${
                        loading &&
                        "hover:cursor-not-allowed bg-indigo-950 hover:bg-indigo-900"
                      }`}
                    >
                      {loading && template === "modern" ? (
                        <div className="relative m-auto w-6 h-4">
                          <span className=" border-2 border-t-0 absolute p-2 rounded-full m-auto left-0 right-0 top-0 bottom-0 border-b-0 animate-spin"></span>
                        </div>
                      ) : (
                        <span>Use Template</span>
                      )}
                    </button>

                    <Link className="hidden lg:block" href="/templates/modern">
                      <button className="bg-indigo-600 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors ml-4 cursor-pointer">
                        Preview
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Classic Template */}
            <div
              onClick={() => {
                setTemplate("classic");
              }}
              className="bg-white relative dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container"
            >
              <span className="absolute right-0 top-0 text-indigo-600 p-4">
                {template === "classic" && <FaCircleCheck size={20} />}
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="classic-bg col-span-1 lg:col-span-2 h-64 lg:h-full bg-cover bg-slate-100 bg-center"></div>
                <div className="col-span-1 lg:col-span-3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Classic Elegance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    A timeless, refined layout that conveys professionalism and
                    attention to detail, perfect for traditional industries.
                  </p>
                  <div className="flex items-center justify-start">
                    <button
                      disabled={loading}
                      onClick={() => {
                        fetchData("classic");
                      }}
                      className={` bg-indigo-600 text-white font-bold text-sm py-2 h-9 w-35 rounded-lg text-center hover:bg-indigo-700 transition-colors cursor-pointer ${
                        loading &&
                        "hover:cursor-not-allowed bg-indigo-950 hover:bg-indigo-900"
                      }`}
                    >
                      {loading && template === "classic" ? (
                        <div className="relative m-auto w-6 h-4">
                          <span className=" border-2 border-t-0 absolute p-2 rounded-full m-auto left-0 right-0 top-0 bottom-0 border-b-0 animate-spin"></span>
                        </div>
                      ) : (
                        <span>Use Template</span>
                      )}
                    </button>
                    <Link className="hidden lg:block" href="/templates/classic">
                      <button className="bg-indigo-600 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors ml-4 cursor-pointer">
                        Preview
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Template */}
            <div
              onClick={() => {
                setTemplate("creative");
              }}
              className="bg-white relative dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container"
            >
              <span className="absolute right-0 top-0 text-indigo-600 p-4">
                {template === "creative" && <FaCircleCheck size={20} />}
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="creative-bg col-span-1 lg:col-span-2 h-64 lg:h-full bg-cover bg-slate-100 bg-center"></div>
                <div className="col-span-1 lg:col-span-3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Creative Showcase
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    An innovative, visually engaging design that highlights
                    creativity and unique skills, suitable for artistic or
                    design-focused roles.
                  </p>
                  <div className="flex items-center justify-start">
                    <button
                      disabled={loading}
                      onClick={() => {
                        fetchData("creative");
                      }}
                      className={` bg-indigo-600 text-white font-bold text-sm py-2 h-9 w-35 rounded-lg text-center hover:bg-indigo-700 transition-colors cursor-pointer ${
                        loading &&
                        "hover:cursor-not-allowed bg-indigo-950 hover:bg-indigo-900"
                      }`}
                    >
                      {loading && template === "creative" ? (
                        <div className="relative m-auto w-6 h-4">
                          <span className=" border-2 border-t-0 absolute p-2 rounded-full m-auto left-0 right-0 top-0 bottom-0 border-b-0 animate-spin"></span>
                        </div>
                      ) : (
                        <span>Use Template</span>
                      )}
                    </button>
                    <Link
                      className="hidden lg:block"
                      href="/templates/creative"
                    >
                      <button className="bg-indigo-600 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors ml-4 cursor-pointer">
                        Preview
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
