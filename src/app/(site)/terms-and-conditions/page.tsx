"use client";
import Link from "next/link";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 ">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4 text-sm dark:text-slate-100 text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-5 dark:text-slate-100 text-gray-700 leading-relaxed">
        <p>
          Welcome to our AI Resume Builder. By accessing or using this website,
          you agree to comply with and be bound by the following Terms and
          Conditions. Please read them carefully before using our service.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p>
          By using this website, you acknowledge that you have read, understood,
          and agree to be bound by these Terms. If you do not agree with any
          part of these Terms, please discontinue use of the site.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Use of the Service</h2>
        <p>
          Our AI Resume Builder is provided for personal and non-commercial use.
          You agree not to misuse the service, upload harmful content, or
          attempt to disrupt the platform’s functionality.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Intellectual Property</h2>
        <p>
          All content, design, code, and materials on this website are the
          intellectual property of the site owner unless otherwise stated. You
          may not copy, distribute, or exploit any part of the service without
          written permission.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. User Content</h2>
        <p>
          You retain ownership of any information or files you upload. By using
          the service, you grant us permission to process your data solely for
          the purpose of generating your resume. We do not store or share your
          data beyond what is necessary to provide the service.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          5. Disclaimer of Warranties
        </h2>
        <p>
          This service is provided on an “as is” and “as available” basis. We
          make no warranties, expressed or implied, regarding the operation,
          accuracy, or reliability of the service.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          6. Limitation of Liability
        </h2>
        <p>
          We shall not be liable for any direct, indirect, incidental, or
          consequential damages resulting from the use or inability to use this
          service, including but not limited to loss of data, profits, or
          business opportunities.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Changes to the Terms</h2>
        <p>
          We may update these Terms and Conditions at any time without prior
          notice. Any changes will be posted on this page with an updated “Last
          updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us through the{" "}
          <Link href="/contact" className="text-blue-600 underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
