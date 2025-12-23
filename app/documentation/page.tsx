import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerLift AI Documentation - How to Optimize Your Resume | Guide",
  description: "Step-by-step guide to using CareerLift AI. Learn how to analyze ATS scores, optimize resumes, and get 3x more interviews. Get started now.",
  openGraph: {
    title: "CareerLift AI Documentation - How to Optimize Your Resume | Guide",
    description: "Step-by-step guide to using CareerLift AI. Learn how to analyze ATS scores, optimize resumes, and get 3x more interviews.",
    type: "website",
  },
};

export default function Documentation() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:space-y-8 sm:px-6 sm:py-12">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl font-bold text-neutral sm:text-4xl md:text-5xl">Documentation</h1>
        <p className="text-base leading-relaxed text-neutral-light sm:text-lg">
          Learn how to use CareerLift AI to optimize your resume and improve your job search.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <section className="rounded-2xl border border-neutral-lightest bg-neutral-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-neutral sm:text-2xl">Getting Started</h2>
          <div className="space-y-4 text-sm text-neutral-light sm:text-base">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">1. Upload Your Resume</h3>
              <p>
                Start by uploading your resume in PDF, DOCX, or TXT format. You can also paste your resume text directly into the analyzer.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">2. Add Job Description</h3>
              <p>
                Paste the job description or enter job details to help our AI tailor your resume to the specific role.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">3. Review Results</h3>
              <p>
                Get your ATS score and AI-powered suggestions for improvement. Review and accept changes that work for you.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-lightest bg-neutral-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-neutral sm:text-2xl">Features</h2>
          <div className="space-y-4 text-sm text-neutral-light sm:text-base">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">AI-Powered Optimization</h3>
              <p>
                Our advanced AI analyzes your resume and suggests improvements based on the job description, industry best practices, and ATS requirements.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">ATS Score Analysis</h3>
              <p>
                Get real-time ATS scoring to understand how well your resume matches job requirements. See keyword gaps and improvement opportunities.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">Export Options</h3>
              <p>
                Download your optimized resume in PDF or DOC format for easy sharing with recruiters and employers.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-lightest bg-neutral-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-neutral sm:text-2xl">Best Practices</h2>
          <div className="space-y-4 text-sm text-neutral-light sm:text-base">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">Tailor for Each Job</h3>
              <p>
                Use our analyzer for each job application. Different roles require different keywords and emphasis.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">Review AI Suggestions</h3>
              <p>
                Always review AI-generated content before using it. Ensure accuracy and that it reflects your actual experience.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral sm:text-xl">Focus on Metrics</h3>
              <p>
                Include quantifiable achievements. Our AI helps identify where to add metrics that strengthen your resume.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-lightest bg-neutral-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-neutral sm:text-2xl">FAQ</h2>
          <div className="space-y-4 text-sm text-neutral-light sm:text-base">
            <div>
              <h3 className="mb-2 text-base font-semibold text-neutral sm:text-lg">What file formats are supported?</h3>
              <p>We support PDF, DOCX, and TXT files. You can also paste text directly.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-neutral sm:text-lg">How accurate is the ATS score?</h3>
              <p>Our ATS scoring uses keyword matching and job description analysis to provide a reliable estimate of resume compatibility.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-neutral sm:text-lg">Is my data secure?</h3>
              <p>Yes, we use industry-standard encryption and don't store your resume without your explicit consent. See our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for details.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-primary-muted bg-primary-muted p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-primary sm:text-2xl">Need Help?</h2>
          <p className="mb-4 text-sm text-primary-dark sm:text-base">
            Can't find what you're looking for? Check out our <Link href="/#faq" className="font-semibold text-primary underline">FAQ section</Link>, explore our <Link href="/blog" className="font-semibold text-primary underline">blog for resume tips</Link>, or contact our support team.
          </p>
          <a
            href="/#resume-analyzer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-neutral-white transition hover:bg-primary-dark sm:px-6 sm:py-3"
          >
            Try Resume Analyzer
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </div>
  );
}

