import { create } from "zustand";
import { ResumeData } from "../app/(site)/resume/types";
import { persist } from "zustand/middleware";
import { boolean } from "zod/v4-mini";

type resume = {
  template: string;
  setTemplate: (data: string) => void;
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
};

export const useResumeStore = create(
  persist<resume>(
    (set) => ({
      resumeData: {},
      template: "",

      //Set store
      setResumeData: (data) => {
        set((prev) => ({ resumeData: { ...prev.resumeData, ...data } }));
      },
      //Set template
      setTemplate: (data: string) => {
        set(() => ({ template: data }));
      },

      //Reset store
      resetResumeData: () => set({ resumeData: {} }),
    }),
    { name: "resume-storage" }
  )
);
