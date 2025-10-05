"use client";
import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm dark:text-slate-200 text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4 text-gray-700 dark:text-slate-100 leading-relaxed">
        <p>
          Welcome to our AI Resume Builder. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use this site.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Information We Collect
        </h2>
        <p>
          We collect information you provide directly, such as resume details,
          contact information, or files you upload to generate your resume. We
          do not sell or share your information with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. How We Use Your Information
        </h2>
        <p>
          The information you provide is used solely to generate your resume and
          improve your experience. Your data is not used for marketing purposes
          or shared externally.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          3. Data Storage and Security
        </h2>
        <p>
          We take reasonable measures to protect your data. Any uploaded files
          or information are processed securely and are not stored longer than
          necessary to generate your resume.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Third-Party Services</h2>
        <p>
          This site may use third-party libraries or APIs to generate documents.
          These services do not collect personal data unless stated otherwise.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
        <p>
          You can request to have your data deleted at any time by contacting us
          through the contact page.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          6. Updates to this Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          reflected on this page with an updated “Last updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please reach out
          through our{" "}
          <Link href="/contact" className="text-blue-600 underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
