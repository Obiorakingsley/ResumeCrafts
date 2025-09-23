import { ResumeData } from "@/app/(site)/resume/types";

export default function ResumeTemplate1({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-white shadow-md border max-w-3xl mx-auto font-sans">
      <header className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
        <p className="text-gray-600">
          {data.email} | {data.phone}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
        <p className="text-gray-700 mt-2">{data.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Skills</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {data.skills.map((skill, i) => (
            <li key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mt-2">
            <h3 className="font-semibold">
              {exp.role} – {exp.company}
            </h3>
            <p className="text-sm text-gray-600">{exp.years}</p>
            <p className="text-gray-700">{exp.details}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mt-2">
            <h3 className="font-semibold">
              {edu.degree} – {edu.school}
            </h3>
            <p className="text-sm text-gray-600">{edu.years}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
