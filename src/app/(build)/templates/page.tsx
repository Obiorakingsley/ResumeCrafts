"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";

const page = () => {
  const { resumeData, setResumeData } = useResumeStore();
  const router = useRouter();

  async function fetchData() {
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });
      const data = await res.json();
      if (!data) return;
      setResumeData(data.trim());
      console.log("Resume data updated:", resumeData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex-grow container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Craft Your Professional Story
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose a template that best represents your professional journey. Each
          design is crafted to highlight your skills and experience effectively.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="modern-bg col-span-1 lg:col-span-2 h-64 lg:h-full bg-cover bg-slate-100 bg-center"></div>
            <div className="col-span-1 lg:col-span-3 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Modern Professional
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A sleek, contemporary design that emphasizes clarity and impact,
                ideal for showcasing a progressive career.
              </p>
              <button
                onClick={() => {
                  fetchData();
                }}
                className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors cursor-pointer"
              >
                Use Template
              </button>
              <Link href="/templates/modern">
                <button className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors ml-4 cursor-pointer">
                  Preview
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container">
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
              <button
                onClick={() => {
                  fetchData();
                }}
                className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors cursor-pointer"
              >
                Use Template
              </button>
              <Link href="/templates/classic">
                <button className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors ml-4 cursor-pointer">
                  Preview
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl container">
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
              <button
                onClick={() => {
                  fetchData();
                }}
                className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors cursor-pointer"
              >
                Use Template
              </button>
              <Link href="/templates/creative">
                <button className="bg-indigo-500 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-indigo-500/90 transition-colors ml-4 cursor-pointer">
                  Preview
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
