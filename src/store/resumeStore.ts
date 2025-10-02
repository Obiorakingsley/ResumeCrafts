import { create } from "zustand";
import { ResumeData } from "../app/(site)/resume/types";
import { persist } from "zustand/middleware";

type resume = {
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
};

export const useResumeStore = create(
  persist<resume>(
    (set) => ({
      resumeData: {},

      setResumeData: (data) => {
        set((prev) => ({ resumeData: { ...prev.resumeData, ...data } }));
      },

      resetResumeData: () => set({ resumeData: {} }),
    }),
    { name: "resume-storage" }
  )
);
