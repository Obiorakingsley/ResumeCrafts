export type ResumeData = {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  linkedIn?: string;
  website?: string;
  projects?: { projectName: string; url?: string; description: string }[];
  experience?: {
    role?: string;
    company?: string;
    years?: { start: number | string; end: number | string };
    details?: string[];
  }[];
  education?: {
    degree?: string;
    school?: string;
    years?: { start: string; end: string };
  }[];
};
