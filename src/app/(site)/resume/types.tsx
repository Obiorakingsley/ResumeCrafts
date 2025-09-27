export type ResumeData = {
  fullName?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  linkedIn?: string;
  website?: string;
  projects?: { projectName: string; url?: string; description: string[] }[];
  experience?: {
    title?: string;
    company?: string;
    start: number | string;
    end: number | string;
    details?: string[];
  }[];
  education?: {
    degree?: string;
    institution?: string;
    startDate: string;
    endDate: string;
  }[];
};
