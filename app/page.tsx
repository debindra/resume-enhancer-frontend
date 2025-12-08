import AnalyzerForm from "@/components/AnalyzerForm";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TestimonialAvatar from "@/components/TestimonialAvatar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerLift AI - AI-Powered Career Optimization",
  description: "Stop getting ghosted. Get 3x more interviews with AI-optimized resumes. Upload your resume and a job posting. Our AI analyzes keyword gaps, calculates your match score, and optimizes your experience to pass ATS filters and impress recruiters—all in under 2 minutes.",
  keywords: "resume optimization, ATS score, resume analyzer, AI resume, job application, resume builder, ATS keywords, resume tips, career advice, interview tips",
  openGraph: {
    title: "CareerLift AI - AI-Powered Career Optimization",
    description: "Get 3x more interviews with AI-optimized resumes. Upload your resume and a job posting. Our AI analyzes keyword gaps, calculates your match score, and optimizes your experience to pass ATS filters and impress recruiters—all in under 2 minutes.",
    type: "website",
    url: "https://resume-enhancer.com",
    siteName: "CareerLift AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerLift AI - AI-Powered Career Optimization",
    description: "Get 3x more interviews with AI-optimized resumes. Upload your resume and a job posting. Our AI analyzes keyword gaps and optimizes your experience to pass ATS filters.",
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
  // TODO: Get these from auth context/session when auth is implemented
  const isProUser = false;
  const isLoggedIn = false;

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="w-full space-y-12 sm:space-y-16 overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-primary/40 bg-gradient-to-br from-primary via-primary-light to-accent pb-56 pt-28 text-white sm:pb-24 sm:pt-8 md:pb-28 md:pt-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-10 h-64 w-64 animate-pulse rounded-full bg-white/20 blur-3xl sm:right-[-5%]" />
          <div className="absolute top-1/2 -left-10 h-72 w-72 animate-pulse rounded-full bg-white/10 blur-3xl sm:left-[-3%]" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_rgba(255,255,255,0))]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 pb-32 pt-8 text-center sm:gap-10 sm:px-6 sm:pb-16 sm:pt-6 md:gap-12 md:pt-8 lg:px-12 lg:pt-12">
          {/* Badges with animation */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:gap-3 sm:text-[11px] sm:tracking-[0.35em] md:text-xs animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <span className="rounded-full border border-white/40 bg-white/10 px-2.5 py-0.5 backdrop-blur-sm transition hover:bg-white/20 sm:px-3 sm:py-1">CareerLift AI</span>
            <span className="rounded-full border border-white/40 bg-white/10 px-2.5 py-0.5 backdrop-blur-sm transition hover:bg-white/20 sm:px-3 sm:py-1">Powered by OpenAI</span>
            <span className="rounded-full border border-white/40 bg-white/10 px-2.5 py-0.5 backdrop-blur-sm transition hover:bg-white/20 sm:px-3 sm:py-1">Career Copilot</span>
          </div>
          
          <div className="flex w-full flex-col items-center gap-8 text-center sm:gap-10">
            <div className="flex-1 space-y-6 sm:space-y-8">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Stop getting ghosted. Get 3x more interviews with AI-optimized resumes.
              </h1>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Upload your resume and a job posting. Our AI analyzes keyword gaps, calculates your match score, and optimizes your experience to pass ATS filters and impress recruiters—all in under 2 minutes. Preview changes side-by-side, see exactly what improved, then export a tailored resume for every application. No more generic resumes that disappear into the void.
              </p>
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a
                  href="#resume-analyzer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-neutral-white shadow-xl transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary sm:px-10 sm:py-4 sm:text-base"
                  aria-label="Start resume analysis - scroll to analyzer form"
                >
                  Start Resume Analysis
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary sm:px-8 sm:py-4 sm:text-base"
                  aria-label="View features section"
                >
                  View Features
                </a>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:gap-6 sm:text-xs sm:tracking-[0.3em] md:text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center gap-2 transition hover:text-white/90">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="whitespace-nowrap">No credit card required</span>
            </span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="flex items-center gap-2 transition hover:text-white/90">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="whitespace-nowrap">Try it free</span>
            </span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="flex items-center gap-2 transition hover:text-white/90">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="whitespace-nowrap">Results in 2 minutes</span>
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Enhanced Features Section */}
        <section id="features" className="space-y-8 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-8 sm:space-y-10 sm:rounded-3xl sm:p-10 md:p-12">
          <div className="space-y-4 sm:space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Features
          </span>
            <h2 className="text-3xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">Everything you need to optimize your resume</h2>
            <p className="text-base leading-relaxed text-neutral-light sm:text-lg">
              Layered AI prompts and coach-made templates work together so you can tailor the right version for every job in your pipeline — without losing track of what changed.
          </p>
        </div>
          <dl className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {[
            {
              title: "AI-Powered Optimization",
                description: "LLM-powered resume optimization using OpenAI/DeepSeek to tailor your resume to specific job descriptions.",
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
              title: "Export & Download",
                description: "Export your optimized resume as PDF or DOC format for easy sharing with recruiters.",
                icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            }
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="group rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:bg-neutral-white hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <dt className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-neutral-light transition group-hover:text-primary">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </span>
                {feature.title}
              </dt>
                <dd className="mt-4 text-sm leading-relaxed text-neutral-light">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </section>

        {/* Resume Analyzer Section */}
        <section id="resume-analyzer" className="space-y-8 pt-12 pb-12 sm:space-y-12 sm:pt-16 sm:pb-16">
          <div className="mx-auto max-w-3xl space-y-5 text-center sm:space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Analyzer
          </span>
            <h2 className="text-3xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">Upload resume & job context</h2>
            <p className="text-base leading-relaxed text-neutral-light sm:text-lg md:text-xl">
            Get started with your resume analysis. Your data stays private until you confirm submission.
          </p>
        </div>
        <AnalyzerForm isProUser={isProUser} isLoggedIn={isLoggedIn} />
      </section>

        {/* Enhanced Trusted Section */}
        <section className="rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-8 sm:rounded-3xl sm:p-10 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10 xl:gap-12">
            <div className="space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by professionals
            </span>
              <h2 className="text-3xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">The modern job search stack</h2>
              <p className="text-base leading-relaxed text-neutral-light sm:text-lg">
                From recent grads to executive leaders, thousands of candidates rely on CareerLift AI to ship tailored resumes, cover letters, and LinkedIn refreshes in record time.
            </p>
              <div className="grid gap-5 text-sm text-neutral-light sm:grid-cols-2 sm:gap-4">
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
            <h2 className="text-3xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">Get your ATS score in 3 simple steps</h2>
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

        {/* Enhanced FAQ Section */}
        <section id="faq" className="mb-12 space-y-8 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-8 sm:mb-16 sm:space-y-10 sm:rounded-3xl sm:p-10 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              FAQ
            </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-neutral sm:mt-5 sm:text-4xl md:text-5xl">Frequently asked questions</h2>
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

        {/* Enhanced Final CTA Section */}
        <section className="mb-12 rounded-2xl border border-primary/80 bg-gradient-to-br from-primary via-primary-light to-accent p-8 text-neutral-white sm:mb-16 sm:rounded-3xl sm:p-10 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 text-center sm:space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Ready to optimize your resume?</h2>
            <p className="text-base text-neutral-white/90 sm:text-lg md:text-xl">
            Get your ATS score and AI-powered improvements in minutes. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#resume-analyzer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-neutral-white shadow-xl transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              aria-label="Start free resume analysis"
            >
              Start Free Analysis
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
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
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
    </>
  );
}

