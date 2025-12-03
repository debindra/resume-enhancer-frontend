import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Resume Enhancer",
  description: "Learn how to use Resume Enhancer to optimize your resume and improve your job search.",
};

export default function Documentation() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Documentation</h1>
        <p className="text-lg text-slate-600">
          Learn how to use Resume Enhancer to optimize your resume and improve your job search.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Getting Started</h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">1. Upload Your Resume</h3>
              <p>
                Start by uploading your resume in PDF, DOCX, or TXT format. You can also paste your resume text directly into the analyzer.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">2. Add Job Description</h3>
              <p>
                Paste the job description or enter job details to help our AI tailor your resume to the specific role.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">3. Review Results</h3>
              <p>
                Get your ATS score and AI-powered suggestions for improvement. Review and accept changes that work for you.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Features</h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">AI-Powered Optimization</h3>
              <p>
                Our advanced AI analyzes your resume and suggests improvements based on the job description, industry best practices, and ATS requirements.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">ATS Score Analysis</h3>
              <p>
                Get real-time ATS scoring to understand how well your resume matches job requirements. See keyword gaps and improvement opportunities.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Export Options</h3>
              <p>
                Download your optimized resume in PDF or DOC format for easy sharing with recruiters and employers.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Best Practices</h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Tailor for Each Job</h3>
              <p>
                Use our analyzer for each job application. Different roles require different keywords and emphasis.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Review AI Suggestions</h3>
              <p>
                Always review AI-generated content before using it. Ensure accuracy and that it reflects your actual experience.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Focus on Metrics</h3>
              <p>
                Include quantifiable achievements. Our AI helps identify where to add metrics that strengthen your resume.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">FAQ</h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">What file formats are supported?</h3>
              <p>We support PDF, DOCX, and TXT files. You can also paste text directly.</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">How accurate is the ATS score?</h3>
              <p>Our ATS scoring uses keyword matching and job description analysis to provide a reliable estimate of resume compatibility.</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Is my data secure?</h3>
              <p>Yes, we use industry-standard encryption and don't store your resume without your explicit consent. See our <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link> for details.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-indigo-900">Need Help?</h2>
          <p className="mb-4 text-indigo-800">
            Can't find what you're looking for? Check out our <Link href="/#faq" className="font-semibold underline">FAQ section</Link> or contact our support team.
          </p>
          <a
            href="/#resume-analyzer"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Resume Analyzer
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </div>
  );
}

