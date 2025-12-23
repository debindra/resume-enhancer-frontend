import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Optimization Tips & Career Advice Blog | CareerLift AI",
  description: "Expert resume tips, ATS optimization strategies, and career advice. Learn how to get 3x more interviews with AI-powered resume optimization.",
  openGraph: {
    title: "Resume Optimization Tips & Career Advice Blog | CareerLift AI",
    description: "Expert resume tips, ATS optimization strategies, and career advice. Learn how to get 3x more interviews with AI-powered resume optimization.",
    type: "website",
  },
};

// Blog post slugs mapping
const blogPostSlugs: Record<string, string> = {
  "5 Ways to Improve Your ATS Score": "5-ways-to-improve-ats-score",
  "How to Tailor Your Resume for Each Job Application": "tailor-resume-for-each-job",
  "Understanding ATS: What Recruiters Look For": "understanding-ats-what-recruiters-look-for",
  "The Power of Quantifiable Achievements in Resumes": "power-of-quantifiable-achievements"
};

export default function Blog() {
  const blogPosts = [
    {
      title: "5 Ways to Improve Your ATS Score",
      excerpt: "I've reviewed thousands of resumes, and here's what actually works when it comes to getting past those pesky ATS systems.",
      date: "2024-01-15",
      category: "Resume Tips",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop"
    },
    {
      title: "How to Tailor Your Resume for Each Job Application",
      excerpt: "The one-size-fits-all approach doesn't work. Here's how I help clients customize their resumes without losing their minds.",
      date: "2024-01-10",
      category: "Job Search",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop"
    },
    {
      title: "Understanding ATS: What Recruiters Look For",
      excerpt: "I've been on both sides of the hiring process. Here's what actually happens when you submit your resume.",
      date: "2024-01-05",
      category: "Career Advice",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop"
    },
    {
      title: "The Power of Quantifiable Achievements in Resumes",
      excerpt: "Stop telling recruiters what you did. Start showing them what you accomplished.",
      date: "2023-12-28",
      category: "Resume Tips",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
    }
  ];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral sm:text-4xl md:text-5xl">Blog</h1>
        <p className="text-base leading-relaxed text-neutral-light sm:text-lg">
          Tips, insights, and best practices for optimizing your resume and advancing your career.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${blogPostSlugs[post.title] || post.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group block overflow-hidden rounded-2xl border border-neutral-lightest bg-neutral-white shadow-sm transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="aspect-video overflow-hidden bg-neutral-lightest md:aspect-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="rounded-full bg-primary-muted px-2.5 py-1 text-xs font-semibold text-primary sm:px-3">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-lighter sm:text-sm">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <h2 className="mb-3 text-xl font-semibold leading-tight text-neutral group-hover:text-primary transition sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-neutral-light sm:text-base">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                  Read more
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-primary-muted bg-primary-muted p-6 text-center sm:p-8">
        <h2 className="mb-2 text-xl font-semibold text-primary sm:text-2xl">Stay Updated</h2>
        <p className="mb-4 text-sm text-primary-dark sm:text-base">
          Subscribe to our newsletter for the latest resume optimization tips and career advice.
        </p>
        <p className="mb-6 text-sm text-primary-dark sm:text-base">
          Need step-by-step guidance? Check out our <Link href="/documentation" className="font-semibold text-primary underline">documentation</Link> for detailed instructions.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-primary px-4 py-2 text-sm text-neutral focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary sm:w-auto sm:text-base"
          />
          <button className="w-full rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-neutral-white transition hover:bg-primary-dark sm:w-auto sm:text-base">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

