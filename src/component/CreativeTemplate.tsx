import { ResumeData } from "@/app/(site)/resume/types";
import Link from "next/link";

export default function ResumeTemplate3({ data }: { data: ResumeData }) {
  return (
    <article className="grid grid-cols-3 w-[794px] overflow-hidden min-h-screen mx-auto border shadow-md">
      {/* Sidebar */}
      <aside className="col-span-1  bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">{data.fullName}</h1>
        <p className="mb-1">{data.phone}</p>
        <p>
          <Link href={`mailto:${data.email ? data.email : ""}`}>
            {data?.email}
          </Link>
        </p>
        <p>
          <Link href={data.linkedIn ? data.linkedIn : ""}>{data.linkedIn}</Link>
        </p>
        <p className="mb-4">{data.website}</p>

        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <ul className="space-y-1">
          {data.skills?.map((skill, i) => (
            <li key={i} className="text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </aside>

      <div className="col-span-2 p-6">
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600">Summary</h2>
          <p className="mt-2 text-gray-700">{data.summary}</p>
        </section>

        <section className="mb-6 ">
          <h2 className="text-xl font-bold text-blue-600">Experience</h2>
          {data.experience?.map((exp, i) => (
            <div key={i} className="mt-3 mb-3">
              <h3 className="font-semibold text-gray-700">
                {exp.title} – {exp.company}
              </h3>
              <p className="text-sm text-gray-700 font-semibold">
                {exp.start} - {exp.end}
              </p>
              <div className="text-gray-800">
                {exp.details?.map((details, i) => (
                  <p key={i} className="mt-2">
                    {details}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 border-t-2 border-gray-400 pt-3">
            Project
          </h3>
          {data.projects?.map((pro, i) => (
            <div key={i} className="mt-4">
              <h4 className="font-semibold text-gray-700 ">
                {pro?.projectName} |{" "}
                <Link
                  className="text-blue-700 font-light"
                  href={pro.url ? pro?.url : ""}
                >
                  {pro?.url}
                </Link>
              </h4>

              <ul className="text-gray-700 list-disc pl-6">
                {pro.description?.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold text-blue-600">Education</h2>
          {data.education?.map((edu, i) => (
            <div key={i} className="mt-2 text-gray-700">
              <h3 className="font-semibold">
                {edu.degree} – {edu.institution}
              </h3>
              <p className="text-sm text-gray-800">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </section>
      </div>
    </article>
  );
}
