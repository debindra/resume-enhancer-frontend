import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Resume Enhancer",
  description: "Terms of Service for Resume Enhancer - Read our terms and conditions.",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Resume Enhancer ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">2. Description of Service</h2>
          <p>
            Resume Enhancer is an AI-powered platform that provides resume optimization, ATS scoring, and career-related services. We use artificial intelligence to analyze and improve resumes based on job descriptions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">3. User Accounts</h2>
          <p>When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be responsible for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Impersonate others or provide false information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">5. Content and Intellectual Property</h2>
          <h3 className="text-xl font-semibold text-slate-900">5.1 Your Content</h3>
          <p>
            You retain ownership of your resume content. By using our Service, you grant us a license to process, analyze, and optimize your content solely for providing the Service.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">5.2 Our Content</h3>
          <p>
            All content, features, and functionality of the Service are owned by Resume Enhancer and are protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">6. AI-Generated Content</h2>
          <p>
            Our Service uses AI to generate resume improvements. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-generated content is provided "as-is" without warranty</li>
            <li>You are responsible for reviewing and verifying all AI suggestions</li>
            <li>We are not liable for any outcomes resulting from AI-generated content</li>
            <li>You should verify accuracy before using optimized resumes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">7. Service Availability</h2>
          <p>
            We strive to maintain Service availability but do not guarantee uninterrupted access. We reserve the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or discontinue the Service at any time</li>
            <li>Perform maintenance that may temporarily interrupt access</li>
            <li>Limit usage to prevent abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">8. Payment and Billing</h2>
          <p>
            If you purchase credits or subscriptions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All fees are non-refundable unless otherwise stated</li>
            <li>Prices may change with notice</li>
            <li>You are responsible for applicable taxes</li>
            <li>We reserve the right to change pricing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">9. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not guarantee:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>That the Service will meet your requirements</li>
            <li>Uninterrupted or error-free operation</li>
            <li>That AI-generated content will result in job offers</li>
            <li>Accuracy of ATS scores or predictions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">11. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice, for any breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">14. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> legal@resumeenhancer.com<br />
            <strong>Address:</strong> [Your Company Address]
          </p>
        </section>
      </div>
    </div>
  );
}

