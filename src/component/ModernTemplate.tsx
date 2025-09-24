import { ResumeData } from "@/app/(site)/resume/types";

export default function ResumeTemplate1({ data }: { data: ResumeData }) {
  console.log(data);

  return (
    <article className="p-8 bg-white w-[794px] min-h-screen shadow-md overflow-hidden border  mx-auto  font-sans">
      <section className="pb-4 mb-4 text-gray-950 ">
        <h2 className="text-4xl font-bold text-gray-800 mb-5">{data.name}</h2>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.linkedIn}</p>
      </section>

      <section className="mb-6 border-t-2 text-gray-800 border-gray-400 pt-3">
        <h3 className="text-xl font-semibold">Summary</h3>
        <p className="text-gray-800">{data.summary}</p>
      </section>

      <section className="mb-6 border-t-2 border-gray-400 pt-3">
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-2 text-gray-800">
          {data.skills.map((skill, i) => (
            <li key={i} className="text-gray-800 py-1">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-t-2 border-gray-400 pt-3">
          Experience
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mt-4">
            <h4 className="font-semibold text-gray-700 ">
              {exp.role} – {exp.company}
            </h4>
            <p className="text-sm text-gray-700 font-semibold mb-2">
              {exp.years.start} - {exp.years.end}
            </p>
            <ul className="text-gray-700 list-disc pl-6">
              {exp.details.map((details, i) => (
                <li key={i}>{details}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 border-t-2 border-gray-400 pt-3">
          Education
        </h3>
        {data.education.map((edu, i) => (
          <div key={i} className="mt-2">
            <h4 className=" text-gray-700 font-semibold mb-2">
              {edu.degree} – {edu.school}
            </h4>
            <p className="text-sm text-gray-800">
              {edu.years.start} - {edu.years.end}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}
