import AnalyzerForm from "../components/AnalyzerForm";
import SEO from "../components/SEO";

interface HomeProps {
  isProUser?: boolean;
  isLoggedIn?: boolean;
}

export default function Home({ isProUser = false, isLoggedIn = false }: HomeProps) {
  return (
    <>
      <SEO
        title="AI-Powered Resume Optimization & ATS Scoring"
        description="Get 3x more interviews with AI-optimized resumes. Upload your resume and job posting to get instant ATS scores, keyword gap analysis, and tailored resume improvements. No credit card required."
        keywords="resume optimization, ATS score, resume analyzer, AI resume, job application, resume builder, ATS keywords, resume tips, career advice, interview tips"
        url="/"
      />
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />
      <div className="w-full space-y-12 sm:space-y-16 overflow-x-hidden">
      <section className="relative w-full overflow-hidden border-b border-primary/40 bg-gradient-to-br from-primary via-primary-light to-accent pb-12 pt-0 text-white sm:pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-white/20 blur-3xl sm:right-[-5%]" />
          <div className="absolute top-1/2 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:left-[-3%]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_rgba(255,255,255,0))]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 pb-8 pt-10 text-center sm:gap-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-12 lg:pt-16">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:gap-3 sm:text-[11px] sm:tracking-[0.35em] md:text-xs">
            <span className="rounded-full border border-white/40 px-2.5 py-0.5 sm:px-3 sm:py-1">CareerLift AI</span>
            <span className="rounded-full border border-white/40 px-2.5 py-0.5 sm:px-3 sm:py-1">Powered by OpenAI</span>
            <span className="rounded-full border border-white/40 px-2.5 py-0.5 sm:px-3 sm:py-1">Career Copilot</span>
          </div>
          <div className="flex w-full flex-col items-center gap-6 text-center sm:gap-8">
            <div className="flex-1 space-y-4 sm:space-y-6">
              <h1 className="text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Stop getting ghosted. Get 3x more interviews with AI-optimized resumes.
              </h1>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                Upload your resume and a job posting. Our AI analyzes keyword gaps, calculates your match score, and optimizes your experience to pass ATS filters and impress recruiters—all in under 2 minutes. Preview changes side-by-side, see exactly what improved, then export a tailored resume for every application. No more generic resumes that disappear into the void.
              </p>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <a
                  href="#resume-analyzer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-neutral-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:px-7 sm:py-3 sm:text-sm"
                >
                  Start Resume Analysis
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
                >
                  View Features
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:gap-6 sm:text-xs sm:tracking-[0.3em] md:text-sm">
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
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section id="features" className="space-y-6 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-6 sm:space-y-8 sm:rounded-3xl sm:p-8 md:p-10">
        <div className="space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Features
          </span>
          <h2 className="text-2xl font-bold leading-tight text-neutral sm:text-3xl md:text-4xl">Everything you need to optimize your resume</h2>
          <p className="text-sm leading-relaxed text-neutral-light sm:text-base">
            Layered AI prompts and coach-made templates work together so you can tailor the right version for every job in
            your pipeline — without losing track of what changed.
          </p>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "AI-Powered Optimization",
              description: "LLM-powered resume optimization using OpenAI/DeepSeek to tailor your resume to specific job descriptions."
            },
            {
              title: "ATS Keyword Gap Detection",
              description: "Identify missing keywords with exact locations in your resume compared to the job posting."
            },
            {
              title: "Real-Time ATS Scoring",
              description: "Get instant ATS score feedback with keyword matching and job match analysis."
            },
            {
              title: "Export & Download",
              description: "Export your optimized resume as PDF or DOC format for easy sharing with recruiters."
            }
          ].map((feature) => (
            <div key={feature.title} className="group rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-neutral-white hover:shadow-xl">
              <dt className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-neutral-light transition group-hover:text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
                {feature.title}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-neutral-light">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="resume-analyzer" className="space-y-8 pt-8 pb-12 sm:space-y-12 sm:pt-12 sm:pb-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Analyzer
          </span>
          <h2 className="text-2xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">Upload resume & job context</h2>
          <p className="text-sm leading-relaxed text-neutral-light sm:text-base md:text-lg">
            Get started with your resume analysis. Your data stays private until you confirm submission.
          </p>
        </div>
        <AnalyzerForm isProUser={isProUser} isLoggedIn={isLoggedIn} />
      </section>

      <section className="rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-6 sm:rounded-3xl sm:p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Trusted by professionals
            </span>
            <h2 className="text-2xl font-bold leading-tight text-neutral sm:text-3xl md:text-4xl">The modern job search stack</h2>
            <p className="text-sm leading-relaxed text-neutral-light sm:text-base">
              From recent grads to executive leaders, thousands of candidates rely on CareerLift AI to ship tailored resumes,
              cover letters, and LinkedIn refreshes in record time.
            </p>
            <div className="grid gap-4 text-sm text-neutral-light sm:grid-cols-2">
              <div className="group flex items-center gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-xl font-bold text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                  4.9
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral">Avg. rating</p>
                  <p className="text-xs text-neutral-lighter">Across 1,200+ verified users</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-xl font-bold text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                  72%
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral">Interview rate</p>
                  <p className="text-xs text-neutral-lighter">Get recruiter responses within 4 weeks</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white/50 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg sm:col-span-2">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-xl font-bold text-neutral-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg">
                  3x
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral">More callbacks</p>
                  <p className="text-xs text-neutral-lighter">Compared to unoptimized resumes</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-neutral-lighter">
              <span>BloomTech</span>
              <span>Meta Fellows</span>
              <span>Reforge</span>
              <span>Columbia Alumni</span>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                avatar: "https://i.pravatar.cc/112?img=12",
                rating: 5,
                quote:
                  "It highlighted missing compliance keywords we never spotted and rewrote our achievements with metrics that passed the screening instantly.",
                author: "Priya, Program Manager"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=36",
                rating: 5,
                quote:
                  "I keep separate versions for product and strategy roles and switch layouts depending on the recruiter. Huge time saver.",
                author: "Luis, Director of Product"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=48",
                rating: 4.5,
                quote:
                  "The insights panel shows exactly why each bullet changed. It's like having a career coach in the loop 24/7.",
                author: "Ellie, UX Researcher"
              },
              {
                avatar: "https://i.pravatar.cc/112?img=22",
                rating: 5,
                quote:
                  "CareerLift AI gave our bootcamp grads tangible improvements — higher ATS scores and real interview conversions.",
                author: "Morgan, Career Coach"
              }
            ].map((testimonial) => (
              <figure key={testimonial.author} className="group flex h-full flex-col gap-4 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white to-neutral-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-neutral-lightest shadow-md transition group-hover:border-primary group-hover:shadow-lg">
                    <img src={testimonial.avatar} alt={`Avatar of ${testimonial.author}`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={`${testimonial.author}-star-${index}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={index + 1 <= Math.floor(testimonial.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={index + 1 <= testimonial.rating ? 0 : 1}
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

        <section id="how-it-works" className="mt-12 mb-12 space-y-8 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-6 sm:mb-16 sm:mt-16 sm:space-y-12 sm:rounded-3xl sm:p-8 md:p-10 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            How it works
          </span>
          <h2 className="text-2xl font-bold leading-tight text-neutral sm:text-4xl md:text-5xl">Get your ATS score in 3 simple steps</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-3xl font-bold text-neutral-white shadow-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral">Upload Your Resume</h3>
              <p className="text-sm leading-relaxed text-neutral-light">PDF, DOCX, or paste text directly</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-3xl font-bold text-neutral-white shadow-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral">Add Job Description</h3>
              <p className="text-sm leading-relaxed text-neutral-light">Paste the job posting or enter job details</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-3xl font-bold text-neutral-white shadow-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral">Get Optimized Resume</h3>
              <p className="text-sm leading-relaxed text-neutral-light">AI-powered improvements with real-time ATS score</p>
            </div>
          </div>
        </div>
        </section>

        <section id="faq" className="mb-12 space-y-6 rounded-2xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-6 sm:mb-16 sm:space-y-8 sm:rounded-3xl sm:p-8 md:p-10 pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              FAQ
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-neutral sm:mt-4 sm:text-3xl md:text-4xl">Frequently asked questions</h2>
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
              <details key={index} className="group rounded-2xl border border-neutral-lightest/80 bg-neutral-white p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-neutral">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 text-neutral-lighter transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

        <section className="mb-12 rounded-2xl border border-primary/80 bg-gradient-to-br from-primary via-primary-light to-accent p-6 text-neutral-white sm:mb-16 sm:rounded-3xl sm:p-8 md:p-10 pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Ready to optimize your resume?</h2>
          <p className="text-sm text-neutral-white/90 sm:text-base md:text-lg">
            Get your ATS score and AI-powered improvements in minutes. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#resume-analyzer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-neutral-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
            >
              Start Free Analysis
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs text-white/80 sm:gap-6 sm:text-sm">
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
    </div>
    </>
  );
}
