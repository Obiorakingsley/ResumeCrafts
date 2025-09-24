import { ResumeData } from "@/app/(site)/resume/types";

export default function ResumeTemplate2({ data }: { data: ResumeData }) {
  return (
    <article className="p-6 bg-gray-50 border w-[794px] min-h-screen overflow-hidden mx-auto font-light text-gray-800">
      <h2 className="text-3xl text-center font-bold">{data.name}</h2>
      <p className="text-gray-800 text-center">
        {data.email} | {data.linkedIn} | {data.phone}
      </p>
      <p className="mb-4 text-center">{data.website}</p>

      <p className="italic mb-6 text-gray-900 text-center">{data.summary}</p>

      <h3 className="text-lg font-semibold border-b mb-2">Skills</h3>
      <p className="mb-4">{data.skills.join(", ")}</p>

      <h3 className="text-lg font-semibold border-b mb-2">Experience</h3>
      {data.experience.map((exp, i) => (
        <section key={i} className="mb-3">
          <p className=" font-semibold text-gray-700">
            {exp.role} – {exp.company}
          </p>
          <span className="text-sm text-gray-700 font-semibold">
            {exp.years.start} - {exp.years.end}
          </span>
          <p>{exp.details}</p>
        </section>
      ))}

      <h3 className="text-lg font-semibold border-b mb-2">Education</h3>
      {data.education.map((edu, i) => (
        <section key={i} className="mb-2">
          <p className="text-gray-700 font-semibold">
            {edu.degree} – {edu.school}
          </p>
          <span className="text-sm font-semibold text-gray-600">
            {edu.years.start} - {edu.years.end}
          </span>
        </section>
      ))}
    </article>
  );
}
