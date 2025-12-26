import HomeAnalyzerSection from "@/components/HomeAnalyzerSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Optimization Tool - Get 3x More Interviews | CareerLift AI",
  description: "Free AI-powered resume optimization with instant ATS scoring. Upload your resume & job description. Get keyword analysis, ATS score, and tailored improvements in 2 minutes.",
  openGraph: {
    title: "AI Resume Optimization Tool - Get 3x More Interviews | CareerLift AI",
    description: "Free AI-powered resume optimization with instant ATS scoring. Upload your resume & job description. Get keyword analysis and tailored improvements.",
    type: "website",
  },
  twitter: {
    title: "AI Resume Optimization Tool - Get 3x More Interviews",
    description: "Free AI-powered resume optimization with instant ATS scoring. Upload your resume & job description.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CareerLift AI",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1200"
  },
  "description": "AI-powered resume optimization tool that helps job seekers improve their ATS scores and get more interviews.",
  "url": "https://resume-enhancer.com",
  "featureList": [
    "AI-Powered Optimization",
    "ATS Keyword Gap Detection",
    "Real-Time ATS Scoring",
    "Export & Download"
  ]
};

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="w-full overflow-x-hidden">
        {/* Hero Section - Radical Simplicity */}
        <section className="relative bg-neutral-white py-24 sm:py-32 md:py-40 lg:py-48">
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-5xl font-light leading-[1.1] tracking-tight text-neutral sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Get 3x More
                <span className="block mt-2 font-normal text-primary">Interviews</span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-neutral-light sm:text-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                AI-optimized resumes that pass ATS filters.<br />
                <span className="text-lg sm:text-xl">Results in 2 minutes.</span>
              </p>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a
                  href="#resume-analyzer"
                  className="group inline-flex items-center rounded-full bg-accent px-12 py-5 text-lg font-medium text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/40 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/20"
                  aria-label="Start free resume analysis"
                >
                  Start Free Analysis
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Analyzer Section - The Focus */}
        <section id="resume-analyzer" className="mb-32 pt-8 sm:pt-12 md:pt-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Analyze your resume.<br />
                <span className="text-primary">Get your ATS score.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Your data stays private until you confirm submission.
              </p>
            </div>
            <HomeAnalyzerSection />
          </div>
        </section>

        {/* Pricing Section - Simplified & Focused */}
        <section id="pricing" className="mb-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Simple pricing.<br />
                <span className="text-primary">All features included.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Same features, different credit allocation
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Freemium Tier */}
              <div className="group relative rounded-3xl border border-neutral-lightest/50 bg-neutral-white p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-medium text-neutral">Freemium</h3>
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-6xl font-light text-neutral">$0</span>
                    <span className="text-neutral-lighter">/month</span>
                  </div>
                  <p className="text-neutral-light">Perfect for trying the product</p>
                </div>
                
                <div className="mb-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">3 credits per month</p>
                      <p className="text-sm text-neutral-lighter">Enough for 3 optimizations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">All features included</p>
                      <p className="text-sm text-neutral-lighter">Resume, cover letters, LinkedIn, ATS scan</p>
                    </div>
                  </div>
                </div>
                
                <a
                  href="#resume-analyzer"
                  className="block w-full rounded-full border-2 border-neutral-lightest bg-neutral-white py-3.5 text-center font-medium text-neutral transition-all duration-300 hover:border-neutral-light hover:shadow-md"
                >
                  Start Free
                </a>
              </div>

              {/* Pro Tier */}
              <div className="group relative rounded-3xl border-2 border-primary bg-neutral-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-medium text-neutral">Pro</h3>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-6xl font-light text-neutral">$29</span>
                    <span className="text-neutral-lighter">/month</span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-primary">or $24/month billed annually</p>
                  <p className="text-neutral-light">Best for active job seekers</p>
                </div>
                
                <div className="mb-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">30 credits per month</p>
                      <p className="text-sm text-neutral-lighter">10x more than freemium</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">All features included</p>
                      <p className="text-sm text-neutral-lighter">Same features, more credits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">Priority support</p>
                      <p className="text-sm text-neutral-lighter">Faster response times</p>
                    </div>
                  </div>
                </div>
                
                <a
                  href="/pricing"
                  className="block w-full rounded-full bg-primary py-3.5 text-center font-medium text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-lighter">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure payment via Stripe
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No hidden fees
              </span>
            </div>
          </div>
        </section>

        {/* FAQ Section - Condensed & Essential */}
        <section id="faq" className="mb-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Frequently asked<br />
                <span className="text-primary">questions.</span>
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  question: "Is my data secure?",
                  answer: "Yes, your resume data is processed securely and is not stored without your explicit consent. We use industry-standard encryption and privacy practices."
                },
                {
                  question: "How accurate is the ATS score?",
                  answer: "Our ATS scoring uses keyword matching and job description analysis to provide a reliable estimate. The score reflects how well your resume matches the job posting's requirements."
                },
                {
                  question: "Can I edit the optimized resume?",
                  answer: "Yes, you can review all AI-suggested changes before accepting them. The optimized resume is fully editable, and you maintain full control over the final version."
                },
                {
                  question: "What file formats are supported?",
                  answer: "We support PDF, DOCX, and TXT file uploads. You can also paste your resume text directly into the analyzer."
                },
                {
                  question: "Do I need to create an account?",
                  answer: "No account is required to get started. You can try the resume analyzer immediately. Sign up later if you want to save your resume history and access additional features."
                },
                {
                  question: "How long does the analysis take?",
                  answer: "Most resume analyses complete in under 2 minutes. The time depends on the length of your resume and the complexity of the job description."
                }
              ].map((faq, index) => (
                <details 
                  key={index} 
                  className="group rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md open:border-primary/50 open:shadow-lg"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-neutral transition-colors hover:text-primary focus:outline-none">
                    <span>{faq.question}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-neutral-lighter transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 leading-relaxed text-neutral-light">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section - One Clear Action */}
        <section className="mb-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-20 text-center sm:px-12 sm:py-24 md:py-28">
              <div className="relative">
                <h2 className="mb-6 text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
                  Ready to get<br />
                  <span className="font-normal">more interviews?</span>
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
                  Get your ATS score and AI-powered improvements in minutes.
                </p>
                <div>
                  <a
                    href="#resume-analyzer"
                    className="group inline-flex items-center rounded-full bg-accent px-12 py-5 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:bg-accent-dark hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent/30"
                    aria-label="Start free resume analysis"
                  >
                    Start Free Analysis
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
    </>
  );
}

