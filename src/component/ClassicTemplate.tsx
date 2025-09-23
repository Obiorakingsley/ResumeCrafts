import { ResumeData } from "@/app/(site)/resume/types";

export default function ResumeTemplate2({ data }: { data: ResumeData }) {
  return (
    <div className="p-6 bg-gray-50 border max-w-2xl mx-auto font-light text-gray-800">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-gray-600 mb-4">
        {data.email} | {data.phone}
      </p>

      <p className="italic mb-6">{data.summary}</p>

      <h2 className="text-lg font-semibold border-b mb-2">Skills</h2>
      <p className="mb-4">{data.skills.join(", ")}</p>

      <h2 className="text-lg font-semibold border-b mb-2">Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} className="mb-3">
          <p className="font-medium">
            {exp.role} – {exp.company}
          </p>
          <span className="text-sm text-gray-500">{exp.years}</span>
          <p>{exp.details}</p>
        </div>
      ))}

      <h2 className="text-lg font-semibold border-b mb-2">Education</h2>
      {data.education.map((edu, i) => (
        <div key={i} className="mb-2">
          <p className="font-medium">
            {edu.degree} – {edu.school}
          </p>
          <span className="text-sm text-gray-500">{edu.years}</span>
        </div>
      ))}
    </div>
  );
}
