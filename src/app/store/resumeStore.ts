import { create } from "zustand";
import { ResumeData } from "../(site)/resume/types";

type resume = {
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
};

export const useResumeStore = create<resume>((set) => ({
  resumeData: {},
  setResumeData: (data) => {
    set((prev) => ({ resumeData: { ...prev.resumeData, ...data } }));
  },
  resetResumeData: () => set({ resumeData: {} }),
}));
