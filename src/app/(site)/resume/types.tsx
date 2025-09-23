export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    years: string;
    details: string;
  }[];
  education: { degree: string; school: string; years: string }[];
};
