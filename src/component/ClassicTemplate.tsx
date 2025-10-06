import { ResumeData } from "@/app/(site)/resume/types";
import Link from "next/link";

export default function ResumeTemplate2({ data }: { data: ResumeData }) {
  return (
    <article className="p-6 bg-gray-50 border hidden lg:block w-[794px] min-h-screen overflow-hidden mx-auto font-light text-gray-800">
      <h2 className="text-3xl mb-3 text-center font-bold">{data.fullName}</h2>
      <p className="text-gray-800 text-center flex items-center gap-4 justify-center">
        <span className="text-center">{data.location}</span>
        <Link
          className="text-blue-700"
          href={`mailto:${data.email ? data.email : ""}`}
        >
          {data?.email}
        </Link>
        <span> {data.phone}</span>
      </p>

      <p className="mb-2 text-center flex gap-5 items-center justify-center">
        <Link
          className="text-blue-700"
          href={data.linkedIn ? data.linkedIn : ""}
        >
          {data.linkedIn}
        </Link>
        <Link href={data.website || ""} className="text-blue-700">
          {data.website?.trim()}
        </Link>
      </p>

      <p className="italic mb-8 mt-4 text-gray-900 text-center">
        {data.summary}
      </p>

      <h3 className="text-lg font-semibold border-t mb-2">Education</h3>
      {data.education?.map((edu, i) => (
        <section key={i} className="mb-5 flex justify-between items-center">
          <p className="text-gray-700 font-semibold">
            {edu.degree} – {edu.institution}
          </p>
          <span className="text-sm font-semibold text-gray-600">
            {edu.startDate} - {edu.endDate}
          </span>
        </section>
      ))}

      <h3 className="text-lg font-semibold border-t mb-2">Skills</h3>
      <p className="mb-4">{data.skills?.join(", ")}</p>

      <h3 className="text-lg font-semibold border-t mb-2">Experience</h3>
      {data.experience?.map((exp, i) => (
        <section key={i} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className=" font-semibold text-gray-700">
              {exp.title} – {exp.company}
            </p>
            <span className="text-sm text-gray-700 font-semibold">
              {exp.start} - {exp.end}
            </span>
          </div>
          <ul className="text-gray-700 list-disc pl-6">
            {exp.details?.map((details, i) => (
              <li key={i}>{details}</li>
            ))}
          </ul>
        </section>
      ))}

      {data.projects?.length && (
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 border-t-2 border-gray-400 pt-3">
            Project
          </h3>
          {data.projects?.map((pro, i) => (
            <div key={i} className="mt-2">
              <h4 className=" text-gray-800 ">
                {pro?.projectName} |{" "}
                <Link
                  className="text-blue-700 font-normal"
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
    </article>
  );
}
