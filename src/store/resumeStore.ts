import { create } from "zustand";
import { ResumeData } from "../app/(site)/resume/types";
import { persist } from "zustand/middleware";

type resume = {
  template: string;
  setTemplate: (data: string) => void;
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
  editting: boolean;
  setEditting: (data: boolean) => void;
};

export const useResumeStore = create(
  persist<resume>(
    (set) => ({
      resumeData: {},
      template: "",
      editting: false,

      //Set store
      setResumeData: (data) => {
        set((prev) => ({ resumeData: { ...prev.resumeData, ...data } }));
      },
      //Set template
      setTemplate: (data: string) => {
        set(() => ({ template: data }));
      },

      setEditting: (data: boolean) => set({ editting: data }),

      //Reset store
      resetResumeData: () => set({ resumeData: {} }),
    }),
    { name: "resume-storage" }
  )
);
