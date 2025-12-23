import HomeAnalyzerSection from "@/components/HomeAnalyzerSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TestimonialAvatar from "@/components/TestimonialAvatar";
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
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-10 sm:py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                Powered by AI
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              Get 3x More Interviews
              <span className="block text-accent">with AI-Optimized Resumes</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Upload your resume and job description. Our AI analyzes keyword gaps,
              calculates your ATS score, and optimizes your resume—all in 2 minutes.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#resume-analyzer"
                className="rounded-lg bg-accent px-8 py-3 text-lg font-semibold text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Start free resume analysis"
              >
                Start Free Analysis
              </a>
              <a
                href="#features"
                className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-3 text-lg font-semibold backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="View features section"
              >
                View Features
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Try it free
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Results in 2 minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-content-width container-padding section-padding">
        {/* Resume Analyzer Section */}
        <section id="resume-analyzer" className="mb-12 sm:mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">AI Resume Analyzer & ATS Score Checker</h2>
            <p className="mx-auto max-w-2xl text-neutral-light">
              Get started with your resume analysis. Your data stays private until you confirm submission.
            </p>
          </div>
          <HomeAnalyzerSection />
        </section>

        {/* Trusted Section */}
        <section className="mb-12 sm:mb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Trusted by Job Seekers & Career Professionals</h2>
              <p className="mb-6 text-neutral-light">
                From recent grads to executive leaders, thousands of candidates rely on CareerLift AI for comprehensive job search assistance.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "4.9", label: "Avg. rating", sublabel: "Across 1,200+ verified users" },
                  { value: "72%", label: "Interview rate", sublabel: "Get recruiter responses within 4 weeks" },
                  { value: "3x", label: "More callbacks", sublabel: "Compared to unoptimized resumes", span: true }
                ].map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className={`group flex items-center gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg sm:p-6 ${stat.span ? 'sm:col-span-2' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-xl font-bold text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                      {stat.value}
                </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-neutral">{stat.label}</p>
                      <p className="text-xs text-neutral-lighter">{stat.sublabel}</p>
                </div>
              </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs uppercase tracking-[0.3em] text-neutral-lighter sm:pt-4">
                <span className="transition hover:text-primary">BloomTech</span>
                <span className="transition hover:text-primary">Meta Fellows</span>
                <span className="transition hover:text-primary">Reforge</span>
                <span className="transition hover:text-primary">Columbia Alumni</span>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:gap-5">
            {[
              {
                avatar: "https://i.pravatar.cc/112?img=12",
                rating: 5,
                  quote: "It highlighted missing compliance keywords we never spotted and rewrote our achievements with metrics that passed the screening instantly.",
                author: "Priya, Program Manager"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=36",
                rating: 5,
                  quote: "I keep separate versions for product and strategy roles and switch layouts depending on the recruiter. Huge time saver.",
                author: "Luis, Director of Product"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=48",
                rating: 4.5,
                  quote: "The insights panel shows exactly why each bullet changed. It's like having a career coach in the loop 24/7.",
                author: "Ellie, UX Researcher"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=22",
                rating: 5,
                  quote: "CareerLift AI gave our bootcamp grads tangible improvements — higher ATS scores and real interview conversions.",
                author: "Morgan, Career Coach"
              }
              ].map((testimonial, index) => (
                <figure 
                  key={testimonial.author} 
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl sm:p-6"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-neutral-lightest shadow-md transition group-hover:border-primary group-hover:shadow-lg">
                    <TestimonialAvatar 
                      src={testimonial.avatar} 
                      alt={`${testimonial.author.split(',')[0]} - ${testimonial.author.split(',')[1]?.trim() || 'User'}`}
                      author={testimonial.author}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                    <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={`${testimonial.author}-star-${i}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                            fill={i + 1 <= Math.floor(testimonial.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                              strokeWidth={i + 1 <= testimonial.rating ? 0 : 1}
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-neutral-light">{testimonial.rating.toFixed(1)} / 5</p>
                  </div>
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-neutral-light">
                  <span className="text-3xl font-serif text-primary">&ldquo;</span>
                  {testimonial.quote}
                  <span className="text-3xl font-serif text-primary">&rdquo;</span>
                </blockquote>
                <figcaption className="text-sm font-bold text-neutral">{testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section id="how-it-works" className="mt-12 mb-12 space-y-8 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white px-6 py-6 sm:mt-16 sm:mb-16 sm:space-y-10 sm:rounded-3xl sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              How it works
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How Our AI Resume Optimization Works</h2>
            <div className="grid gap-5 sm:gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
              {[
                {
                  step: 1,
                  title: "Upload Your Resume",
                  description: "PDF, DOCX, or paste text directly",
                  icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                },
                {
                  step: 2,
                  title: "Add Job Description",
                  description: "Paste the job posting or enter job details",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                },
                {
                  step: 3,
                  title: "Get Optimized Resume",
                  description: "AI-powered improvements with real-time ATS score",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                }
              ].map((item, index) => (
                <div key={item.step} className="flex flex-col items-center rounded-2xl border border-neutral-lightest/60 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md sm:p-6 md:p-7 lg:p-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex flex-col items-center gap-5 pb-4 sm:gap-6 sm:pb-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-4xl font-bold text-neutral-white shadow-lg ring-4 ring-primary/20 transition hover:scale-110 hover:shadow-xl">
                      {item.step}
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-center sm:space-y-3">
                    <h3 className="text-lg font-semibold text-neutral sm:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-light sm:text-base">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-12 sm:mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">AI-Powered Resume Features</h2>
            <p className="mx-auto max-w-2xl text-neutral-light">
              Everything you need to optimize your resume and pass ATS filters.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI-Powered Optimization",
                description: "LLM-powered resume optimization and parsing using OpenAI/DeepSeek to tailor your resume to specific job descriptions.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            },
            {
              title: "ATS Keyword Gap Detection",
                description: "Identify missing keywords with exact locations in your resume compared to the job posting.",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            },
            {
              title: "Real-Time ATS Scoring",
                description: "Get instant ATS score feedback with keyword matching and job match analysis.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            },
            {
              title: "Cover Letter Optimization",
                description: "AI-powered cover letter optimization to match your resume and job requirements.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            },
            {
              title: "Export & Download",
                description: "Export your optimized resume and cover letter as PDF or DOC format for easy sharing.",
                icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            }
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-neutral-lightest bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-neutral-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

          {/* Pricing Section */}
        <section id="pricing" className="mb-12 sm:mb-16">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Pricing
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Simple Pricing. All Features Included.</h2>
            <p className="mx-auto max-w-2xl text-neutral-light">
              Choose the plan that fits your job search. Same features, different credit allocation.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Freemium Tier */}
            <div className="relative rounded-2xl border-2 border-neutral-lightest bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-neutral mb-2">Freemium</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-neutral">$0</span>
                  <span className="text-neutral-light">/month</span>
                </div>
                <p className="text-sm text-neutral-light">Perfect for trying the product</p>
              </div>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">3 credits per month</p>
                    <p className="text-sm text-neutral-light">Enough for 3 optimizations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">All features included</p>
                    <p className="text-sm text-neutral-light">Resume optimization, cover letters, LinkedIn, ATS scan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">Resume history & versioning</p>
                    <p className="text-sm text-neutral-light">Track all your optimizations</p>
                  </div>
                </div>
              </div>
              
              <a
                href="#resume-analyzer"
                className="block w-full text-center rounded-lg bg-neutral-lightest text-neutral py-3 px-6 font-semibold transition hover:bg-neutral-lightest/80"
              >
                Start Free
              </a>
            </div>

            {/* Pro Tier */}
            <div className="relative rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-neutral mb-2">Pro</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-neutral">$29</span>
                  <span className="text-neutral-light">/month</span>
                </div>
                <p className="text-sm text-primary font-semibold mb-1">or $24/month billed annually</p>
                <p className="text-sm text-neutral-light">Best for active job seekers</p>
              </div>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">30 credits per month</p>
                    <p className="text-sm text-neutral-light">10x more than freemium - perfect for multiple applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">All features included</p>
                    <p className="text-sm text-neutral-light">Same features as freemium, more credits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">Priority support</p>
                    <p className="text-sm text-neutral-light">Faster response times</p>
                  </div>
                </div>
              </div>
              
              <a
                href="/pricing"
                className="block w-full text-center rounded-lg bg-primary text-white py-3 px-6 font-semibold transition hover:bg-primary-dark shadow-lg hover:shadow-xl"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-neutral-light">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Secure payment via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">No hidden fees</span>
            </div>
          </div>

          {/* Credit Costs Table */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-neutral-lightest bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-neutral mb-6 text-center">Credit Costs (Same for Both Tiers)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-lightest/50">
                  <span className="font-medium text-neutral">Resume Optimization</span>
                  <span className="font-bold text-primary">1 credit</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-lightest/50">
                  <span className="font-medium text-neutral">Cover Letter Generation</span>
                  <span className="font-bold text-primary">1 credit</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-lightest/50">
                  <span className="font-medium text-neutral">LinkedIn Enhancement</span>
                  <span className="font-bold text-primary">1 credit</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-lightest/50">
                  <span className="font-medium text-neutral">ATS Deep Scan</span>
                  <span className="font-bold text-primary">1 credit</span>
                </div>
              </div>
              <p className="text-center text-sm text-neutral-light mt-6">
                All features cost the same. The only difference is how many credits you get each month.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section id="faq" className="mb-12 space-y-8 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-8 sm:mb-16 sm:space-y-10 sm:rounded-3xl sm:p-10 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              FAQ
            </span>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Resume Optimization & ATS FAQ</h2>
          </div>
          <div className="space-y-4">
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
                  className="group rounded-2xl border border-neutral-lightest/80 bg-neutral-white p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md open:border-primary open:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-neutral transition hover:text-primary focus:outline-none focus:text-primary">
                  <span>{faq.question}</span>
                  <svg
                      className="h-5 w-5 shrink-0 text-neutral-lighter transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-neutral-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-12 sm:mb-16">
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-center sm:space-y-8 sm:px-6 sm:py-12 md:py-14 bg-primary text-white rounded-2xl sm:rounded-3xl">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Start Your Free Resume Analysis Now</h2>
            <p className="text-base text-neutral-white/90 sm:text-lg md:text-xl">
              Get your ATS score and AI-powered improvements in minutes. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#resume-analyzer"
                className="rounded-lg bg-accent px-8 py-3 text-lg font-semibold text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
                aria-label="Start free resume analysis"
              >
                Start Free Analysis
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-white/80 sm:gap-8 sm:text-base">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Privacy-first
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by OpenAI
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure & encrypted
            </span>
          </div>
        </div>
        </section>

        {/* Additional Resources Section */}
        <section className="mb-12 sm:mb-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center sm:space-y-8">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">More Career Resources</h2>
            <p className="text-base leading-relaxed text-neutral-light sm:text-lg md:text-xl">
              Explore our blog for in-depth resume tips, ATS strategies, and career advice to boost your job search.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/blog"
                className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Visit our blog for resume tips"
              >
                Visit Our Blog
              </a>
              <a
                href="/documentation"
                className="rounded-lg border-2 border-primary bg-white/10 px-8 py-3 text-lg font-semibold text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="View documentation"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
    </>
  );
}

