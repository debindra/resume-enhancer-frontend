import HomeAnalyzerSection from "@/components/HomeAnalyzerSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { HowItWorksDemo } from "@/components/HowItWorksDemo";
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
      {/* Hero Section - Steve Jobs Inspired: Simplicity, Elegance, Focus */}
      <section className="relative bg-gradient-to-b from-neutral-white to-neutral-white py-20 sm:py-28 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 animate-fade-in-up">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
                Powered by AI
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-light leading-[1.1] tracking-tight text-neutral sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Get 3x More
              <span className="block mt-2 font-normal text-primary">Interviews</span>
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-neutral-light sm:text-2xl md:leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              AI-optimized resumes that pass ATS filters.<br />
              <span className="text-lg sm:text-xl">Results in 2 minutes. No credit card required.</span>
            </p>
            {/* <div className="mx-auto mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-lightest/50 px-4 py-2 text-sm text-neutral-light">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong className="text-neutral">ATS</strong> (Applicant Tracking System) is software used by employers to filter resumes. 
                  A higher ATS score means your resume is more likely to pass automated screening and reach human recruiters.
                </span>
              </div>
            </div> */}
            <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#resume-analyzer"
                className="group relative rounded-full bg-accent px-10 py-4 text-lg font-medium text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/40 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/20"
                aria-label="Start free resume analysis"
              >
                Start Free Analysis
                <svg className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border-2 border-neutral-lightest bg-neutral-white px-10 py-4 text-lg font-medium text-neutral transition-all duration-300 hover:border-neutral-light hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neutral-lightest"
                aria-label="Learn how it works"
              >
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-lighter animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Results in 2 minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="border-t border-neutral-lightest/50"></div>

      {/* Why Optimize Section - Problem/Solution */}
      <section className="relative bg-gradient-to-b from-neutral-lightest/30 via-neutral-lightest/20 to-neutral-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-6 text-3xl font-light tracking-tight text-neutral sm:text-4xl md:text-5xl">
              Why 75% of resumes never reach a human
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-light sm:text-xl">
              Most companies use ATS software that automatically filters resumes before recruiters see them. 
              If your resume doesn't match the job description's keywords and format, it gets rejected—even if you're qualified.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="group relative rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg" title="Based on industry research showing that most resumes are filtered out by ATS systems before reaching human recruiters">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mb-3 text-5xl font-light text-primary">75%</div>
              <p className="text-sm text-neutral-light sm:text-base">of resumes are rejected by ATS before human review</p>
            </div>
            <div className="group relative rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg" title="Industry average from recruiter surveys on time spent reviewing individual resumes">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mb-3 text-5xl font-light text-primary">6 seconds</div>
              <p className="text-sm text-neutral-light sm:text-base">average time a recruiter spends on each resume</p>
            </div>
            <div className="group relative rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg" title="Users report significantly more interview callbacks after optimizing their resumes with ATS-focused improvements">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-secondary-muted p-3 group-hover:bg-secondary/20 transition-colors">
                  <svg className="h-8 w-8 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
                  </svg>
                </div>
              </div>
              <div className="mb-3 text-5xl font-light text-primary">3x</div>
              <p className="text-sm text-neutral-light sm:text-base">more interviews with an optimized resume</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="border-t border-neutral-lightest/50"></div>

      {/* Resume Analyzer Section */}
      <section id="resume-analyzer" className="relative bg-gradient-to-b from-neutral-white to-neutral-lightest/20 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Analyze your resume.<br />
                <span className="text-primary">Get your ATS score.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Get started with your resume analysis. Your data stays private until you confirm submission.
              </p>
            </div>
            
            {/* What You'll Get Preview */}
            {/* <div className="mb-12 mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8">
              <h3 className="mb-6 text-center text-xl font-medium text-neutral sm:text-2xl">What you'll get:</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral">Your ATS score</p>
                    <p className="text-sm text-neutral-light">Detailed breakdown showing how well your resume matches the job</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral">AI-optimized resume</p>
                    <p className="text-sm text-neutral-light">Improved version with highlighted changes and explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral">Missing keywords identified</p>
                    <p className="text-sm text-neutral-light">See exactly which keywords from the job posting are missing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral">Actionable suggestions</p>
                    <p className="text-sm text-neutral-light">Specific improvements to increase your interview chances</p>
                  </div>
                </div>
              </div>
            </div>
             */}
            <HomeAnalyzerSection />
          </div>
        </section>

        {/* Trusted Section - Refined */}
        {/* <section className="mb-20 sm:mb-24 md:mb-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="mb-6 text-4xl font-light tracking-tight text-neutral sm:text-5xl">
                  Trusted by thousands.<br />
                  <span className="text-primary">Loved by job seekers.</span>
                </h2>
                <p className="mb-12 text-lg text-neutral-light leading-relaxed">
                  From recent grads to executive leaders, candidates rely on CareerLift AI for comprehensive job search assistance.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    { value: "4.9", label: "Average rating", sublabel: "1,200+ verified users" },
                    { value: "72%", label: "Interview rate", sublabel: "Responses within 4 weeks" },
                    { value: "3x", label: "More callbacks", sublabel: "vs. unoptimized resumes", span: true }
                  ].map((stat, index) => (
                    <div 
                      key={stat.label} 
                      className={`group rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg animate-fade-in-up ${stat.span ? 'sm:col-span-2' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-3 flex items-baseline gap-2">
                        <span className="text-4xl font-light text-primary">{stat.value}</span>
                      </div>
                      <p className="mb-1 text-base font-medium text-neutral">{stat.label}</p>
                      <p className="text-sm text-neutral-lighter">{stat.sublabel}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-8 text-xs font-medium uppercase tracking-widest text-neutral-lighter">
                  <span className="transition-colors hover:text-primary">BloomTech</span>
                  <span className="transition-colors hover:text-primary">Meta Fellows</span>
                  <span className="transition-colors hover:text-primary">Reforge</span>
                  <span className="transition-colors hover:text-primary">Columbia Alumni</span>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                    className="group flex h-full flex-col rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-neutral-lightest">
                        <TestimonialAvatar 
                          src={testimonial.avatar} 
                          alt={`${testimonial.author.split(',')[0]} - ${testimonial.author.split(',')[1]?.trim() || 'User'}`}
                          author={testimonial.author}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={`${testimonial.author}-star-${i}`}
                              className="h-3.5 w-3.5 text-yellow-400"
                              fill={i + 1 <= Math.floor(testimonial.rating) ? "currentColor" : "none"}
                              viewBox="0 0 20 20"
                              stroke={i + 1 <= testimonial.rating ? "none" : "currentColor"}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-xs text-neutral-lighter">{testimonial.rating.toFixed(1)}</p>
                      </div>
                    </div>
                    <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-neutral-light">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm font-medium text-neutral">{testimonial.author}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section> */}

      {/* Section Divider */}
      <div className="border-t border-neutral-lightest/50"></div>

        {/* How It Works Section - Animated Demo */}
        <section id="how-it-works" className="relative bg-gradient-to-b from-neutral-lightest/20 to-neutral-white py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Simple. Powerful.<br />
                <span className="text-primary">Works in minutes.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Three steps to a resume that gets interviews
              </p>
            </div>

            <HowItWorksDemo />
          </div>
        </section>

        {/* Features Section - Clean & Minimal */}
        {/* <section id="features" className="mb-20 sm:mb-24 md:mb-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Everything you need.<br />
                <span className="text-primary">Nothing you don't.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Powerful features that help you land interviews
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "AI-Powered Optimization",
                  description: "LLM-powered resume optimization tailored to specific job descriptions.",
                  benefit: "Get resume improvements that match exactly what employers are looking for",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                },
                {
                  title: "ATS Keyword Detection",
                  description: "See exactly which keywords from the job posting are missing in your resume, and where to add them for maximum impact.",
                  benefit: "Increase your ATS score by 20-30% by adding the right keywords",
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                },
                {
                  title: "Real-Time ATS Scoring",
                  description: "Instant ATS score feedback with keyword matching and job match analysis.",
                  benefit: "Know exactly how your resume performs before you submit it",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                },
                {
                  title: "Cover Letter Optimization",
                  description: "AI-powered cover letter optimization to match your resume and job requirements.",
                  benefit: "Create compelling cover letters that complement your optimized resume",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                },
                {
                  title: "Export & Download",
                  description: "Export optimized resumes and cover letters as PDF or DOC format.",
                  benefit: "Download professional documents ready to submit to any job application",
                  icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-neutral">{feature.title}</h3>
                  <p className="mb-2 text-neutral-light leading-relaxed">{feature.description}</p>
                  {feature.benefit && (
                    <p className="text-sm font-medium text-primary">{feature.benefit}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section> */}

      {/* Section Divider */}
      <div className="border-t border-neutral-lightest/50"></div>

          {/* Pricing Section - Simplified */}
        <section id="pricing" className="relative bg-gradient-to-b from-primary/5 via-neutral-white to-neutral-lightest/30 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Simple pricing.<br />
                <span className="text-primary">All features included.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                More credits = more optimizations
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-8">
              {/* Freemium Tier */}
              <div className="group relative rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-medium text-neutral">Freemium</h3>
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-6xl font-light text-neutral">$0</span>
                    <span className="text-neutral-lighter">/month</span>
                  </div>
                </div>
                
                <div className="mb-8 space-y-3">
                  <p className="text-sm text-neutral-600">3 credits per month</p>
                  <p className="text-sm text-neutral-600">All features included</p>
                </div>
                
                <a
                  href="#resume-analyzer"
                  className="block w-full rounded-lg border-2 border-neutral-lightest bg-neutral-white py-2.5 text-center font-medium text-neutral transition-all duration-300 hover:border-neutral-light hover:shadow-md"
                >
                  Start Free
                </a>
              </div>

              {/* Pro Tier */}
              <div className="group relative rounded-2xl border-2 border-primary bg-neutral-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white">
                    Popular
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-medium text-neutral">Pro</h3>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-6xl font-light text-neutral">$29</span>
                    <span className="text-neutral-lighter">/month</span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-primary">or $24/month billed annually</p>
                </div>
                
                <div className="mb-8 space-y-3">
                  <p className="text-sm text-neutral-600">30 credits per month</p>
                  <p className="text-sm text-neutral-600">All features + Priority support</p>
                </div>
                
                <a
                  href="/pricing"
                  className="block w-full rounded-lg bg-accent py-2.5 text-center font-medium text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/40"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>

            {/* Simple Trust Note */}
            <p className="text-center text-sm text-neutral-400">
              Secure payments • Cancel anytime • No hidden fees
            </p>
          </div>
        </section>

      {/* Section Divider */}
      <div className="border-t border-neutral-lightest/50"></div>

        {/* FAQ Section - Clean & Minimal */}
        <section id="faq" className="relative bg-gradient-to-b from-neutral-lightest/30 to-neutral-white py-12 sm:py-16 md:py-20">
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
                question: "What is ATS and why does it matter?",
                answer: "ATS (Applicant Tracking System) is software used by most employers to automatically filter resumes before recruiters see them. If your resume doesn't match the job description's keywords and format, it gets rejected—even if you're qualified. Our tool helps you optimize your resume to pass these filters and reach human recruiters."
              },
              {
                question: "Do I need to upload a job description?",
                answer: "While it's optional, we highly recommend it. Providing a job description allows us to tailor optimizations specifically to that role, identify missing keywords, and significantly improve your ATS score. Without it, we can still optimize your resume, but the improvements will be more general."
              },
              {
                question: "What makes this different from other resume builders?",
                answer: "Unlike generic resume builders, CareerLift AI analyzes your resume against specific job descriptions using AI. We don't just format your resume—we optimize it with the exact keywords and phrasing that employers are looking for, giving you a real ATS score so you know how likely you are to pass automated screening."
              },
              {
                question: "Can I use this for multiple job applications?",
                answer: "Absolutely! Each optimization is tailored to a specific job description. You can optimize your resume for as many different roles as you want. Many users create separate optimized versions for different types of positions (e.g., product vs. strategy roles) and switch between them depending on the application."
              },
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
                question: "What if I don't like the AI suggestions?",
                answer: "You have complete control. You can review all changes before accepting them, edit any suggestions, or reject specific improvements. The AI provides recommendations, but you decide what to keep. You can also regenerate optimizations with different settings if needed."
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
                question: "How do credits work?",
                answer: "One credit equals one complete optimization. Each optimization includes resume analysis, AI improvements, ATS scoring, and export functionality. All features cost 1 credit: Resume Optimization, Cover Letter, LinkedIn Enhancement, and ATS Deep Scan. The Freemium plan includes 3 credits per month, while the Pro plan includes 30 credits per month. All features are included in every plan—the only difference is how many credits you get each month."
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

        {/* Final CTA Section - Impactful */}
        {/* <section className="mb-20 sm:mb-24 md:mb-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-16 text-center sm:px-12 sm:py-20 md:py-24">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
              <div className="relative">
                <h2 className="mb-6 text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
                  Ready to get<br />
                  <span className="font-normal">more interviews?</span>
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
                  Get your ATS score and AI-powered improvements in minutes.<br />
                  No credit card required.
                </p>
                <div className="mb-10">
                  <a
                    href="#resume-analyzer"
                    className="group inline-flex items-center rounded-full bg-white px-10 py-4 text-lg font-medium text-primary shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
                    aria-label="Start free resume analysis"
                  >
                    Start Free Analysis
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Privacy-first
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Powered by AI
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure & encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Additional Resources Section - Refined */}
        {/* <section className="mb-20 sm:mb-24 md:mb-32">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl font-light tracking-tight text-neutral sm:text-5xl">
              More career resources
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-light sm:text-xl">
              Explore our blog for in-depth resume tips, ATS strategies, and career advice to boost your job search.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/blog"
                className="rounded-full border-2 border-primary bg-primary px-8 py-3.5 text-lg font-medium text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20"
                aria-label="Visit our blog for resume tips"
              >
                Visit Our Blog
              </a>
              <a
                href="/documentation"
                className="rounded-full border-2 border-neutral-lightest bg-neutral-white px-8 py-3.5 text-lg font-medium text-neutral transition-all duration-300 hover:border-neutral-light hover:shadow-md hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neutral-lightest"
                aria-label="View documentation"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section> */}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
    </>
  );
}

