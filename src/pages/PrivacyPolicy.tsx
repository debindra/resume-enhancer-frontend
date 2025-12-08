import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - CareerLift AI"
        description="Learn how CareerLift AI protects your privacy and handles your data. Our commitment to data security and user privacy."
        keywords="privacy policy, data protection, resume privacy, user privacy"
        url="/privacy-policy"
        noindex={false}
      />
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">1. Introduction</h2>
          <p>
            CareerLift AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our resume optimization service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold text-slate-900">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Resume content (text, files, documents)</li>
            <li>Job descriptions and job-related information</li>
            <li>Contact information (if you create an account)</li>
            <li>Usage preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage patterns and analytics data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our resume optimization services</li>
            <li>Process your resume analysis requests</li>
            <li>Generate AI-powered resume improvements</li>
            <li>Communicate with you about our services</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">4. Data Storage and Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, please note that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your resume data is processed securely using encryption</li>
            <li>We do not store your resume without your explicit consent</li>
            <li>Data is processed in-memory for analysis purposes</li>
            <li>We use secure cloud infrastructure for processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">5. Third-Party Services</h2>
          <p>
            We use third-party services to provide our functionality:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OpenAI/DeepSeek:</strong> For AI-powered resume optimization</li>
            <li><strong>Analytics Services:</strong> To understand usage patterns</li>
            <li><strong>Cloud Infrastructure:</strong> For secure data processing</li>
          </ul>
          <p className="mt-4">
            These services have their own privacy policies governing data handling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of data collection (where applicable)</li>
            <li>Request a copy of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">7. Cookies</h2>
          <p>
            We use cookies to enhance your experience. See our{" "}
            <a href="/cookie-policy" className="text-indigo-600 hover:underline">Cookie Policy</a> for more details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">8. Children's Privacy</h2>
          <p>
            Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@resumeenhancer.com<br />
            <strong>Address:</strong> [Your Company Address]
          </p>
        </section>
      </div>
    </div>
    </>
  );
}

