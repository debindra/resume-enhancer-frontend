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
            <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#resume-analyzer"
                className="group relative rounded-full bg-primary px-10 py-4 text-lg font-medium text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20"
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

      {/* Resume Analyzer Section */}
      <section id="resume-analyzer" className="mb-20 sm:mb-24 md:mb-32 pt-12 sm:pt-16 md:pt-20">
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
            <HomeAnalyzerSection />
          </div>
        </section>

        {/* Trusted Section - Refined */}
        <section className="mb-20 sm:mb-24 md:mb-32">
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
        </section>

        {/* How It Works Section - Simplified & Elegant */}
        <section id="how-it-works" className="mb-20 sm:mb-24 md:mb-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral sm:text-5xl md:text-6xl">
                Simple. Powerful.<br />
                <span className="text-primary">Works in minutes.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-light sm:text-xl">
                Three steps to a resume that gets interviews
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Upload",
                  description: "Upload your resume and paste the job description",
                  icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                },
                {
                  step: "02",
                  title: "Analyze",
                  description: "AI analyzes keyword gaps and calculates your ATS score",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                },
                {
                  step: "03",
                  title: "Optimize",
                  description: "Get an optimized resume with AI-powered improvements",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                }
              ].map((item, index) => (
                <div key={item.step} className="group text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-light text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        {item.step}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-lightest/50 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-medium text-neutral">{item.title}</h3>
                  <p className="text-neutral-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Clean & Minimal */}
        <section id="features" className="mb-20 sm:mb-24 md:mb-32">
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
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                },
                {
                  title: "ATS Keyword Detection",
                  description: "Identify missing keywords with exact locations compared to job postings.",
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                },
                {
                  title: "Real-Time ATS Scoring",
                  description: "Instant ATS score feedback with keyword matching and job match analysis.",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                },
                {
                  title: "Cover Letter Optimization",
                  description: "AI-powered cover letter optimization to match your resume and job requirements.",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                },
                {
                  title: "Export & Download",
                  description: "Export optimized resumes and cover letters as PDF or DOC format.",
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
                  <p className="text-neutral-light leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* Pricing Section - Elegant & Minimal */}
        <section id="pricing" className="mb-20 sm:mb-24 md:mb-32">
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
            
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-16">
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
                
                <div className="mb-10 space-y-5">
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
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral">Resume history & versioning</p>
                      <p className="text-sm text-neutral-lighter">Track all your optimizations</p>
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
                
                <div className="mb-10 space-y-5">
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
            <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-lighter">
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

            {/* Credit Costs Table - Simplified */}
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-neutral-lightest/50 bg-neutral-white p-8">
                <h3 className="mb-6 text-center text-xl font-medium text-neutral">Credit Costs</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: "Resume Optimization", cost: "1 credit" },
                    { name: "Cover Letter", cost: "1 credit" },
                    { name: "LinkedIn Enhancement", cost: "1 credit" },
                    { name: "ATS Deep Scan", cost: "1 credit" }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-neutral-lightest/30 bg-neutral-lightest/30 p-4">
                      <span className="text-neutral">{item.name}</span>
                      <span className="font-medium text-primary">{item.cost}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-neutral-lighter">
                  All features cost the same. The only difference is how many credits you get each month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Clean & Minimal */}
        <section id="faq" className="mb-20 sm:mb-24 md:mb-32">
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

        {/* Final CTA Section - Impactful */}
        <section className="mb-20 sm:mb-24 md:mb-32">
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
        </section>

        {/* Additional Resources Section - Refined */}
        <section className="mb-20 sm:mb-24 md:mb-32">
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
        </section>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
    </>
  );
}

