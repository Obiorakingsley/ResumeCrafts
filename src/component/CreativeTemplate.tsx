import { ResumeData } from "@/app/(site)/resume/types";
import Link from "next/link";

export default function ResumeTemplate3({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-[80vh] scale-container">
      <article className="grid scale-temp grid-cols-3 overflow-hidden min-h-screen mx-auto border shadow-md">
        {/* Sidebar */}
        <aside className="col-span-1  bg-blue-600 text-white p-6">
          <h3 className="text-2xl font-bold mb-4">{data.fullName}</h3>
          <p className="mb-2">{data?.location}</p>
          <p>{data.phone}</p>
          <p>
            <Link href={`mailto:${data.email ? data.email : ""}`}>
              {data?.email}
            </Link>
          </p>
          <p className="mt-2">
            <Link href={data.linkedIn ? data.linkedIn : "#"}>
              {data.linkedIn}
            </Link>
          </p>
          <p className="mb-2">
            {" "}
            <Link href={data.website ? data.website : "#"}>{data.website}</Link>
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-3">Skills</h3>
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
            <h3 className="text-xl font-bold text-blue-600">Summary</h3>
            <p className="mt-2 text-gray-700">{data.summary}</p>
          </section>

          <section className="mb-6 ">
            <h3 className="text-xl font-bold text-blue-600">Experience</h3>
            {data.experience?.map((exp, i) => (
              <div key={i} className="mt-3 mb-3">
                <h4 className="font-semibold text-gray-700">
                  {exp.title} – {exp.company}
                </h4>
                <p className="text-sm text-gray-700 font-semibold">
                  {exp.start} - {exp.end}
                </p>

                <ul className="text-gray-700 gap-2 flex flex-col list-disc pl-6">
                  {exp.details?.map((details, i) => (
                    <li key={i}>{details}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          {data.projects?.length && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700">Project</h3>
              {data.projects?.map((pro, i) => (
                <div key={i} className="mt-2">
                  <h4 className="text-md text-gray-700 ">
                    <span className="font-semibold">{pro?.projectName}</span> |{" "}
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
          )}

          <section>
            <h3 className="text-xl font-bold text-blue-600">Education</h3>
            {data.education?.map((edu, i) => (
              <div key={i} className="mt-2 text-gray-700">
                <h4 className="font-semibold">
                  {edu.degree} – {edu.institution}
                </h4>
                <p className="text-sm font-semibold text-gray-700">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        </div>
      </article>
    </div>
  );
}
