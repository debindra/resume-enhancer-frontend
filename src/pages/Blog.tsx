import { Link } from "react-router-dom";
import SEO from "../components/SEO";

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
    <>
      <SEO
        title="Resume Tips & Career Advice Blog"
        description="Expert tips, insights, and best practices for optimizing your resume, improving your ATS score, and advancing your career. Learn from career coaches and hiring managers."
        keywords="resume tips, career advice, ATS optimization, job search tips, resume writing, interview preparation, career development"
        url="/blog"
        type="website"
      />
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Blog</h1>
        <p className="text-lg text-slate-600">
          Tips, insights, and best practices for optimizing your resume and advancing your career.
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            to={`/blog/${blogPostSlugs[post.title] || post.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="aspect-video overflow-hidden bg-slate-100 md:aspect-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-semibold leading-tight text-slate-900 group-hover:text-indigo-600 transition">
                  {post.title}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:gap-3">
                  Read more
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-indigo-900">Stay Updated</h2>
        <p className="mb-6 text-indigo-800">
          Subscribe to our newsletter for the latest resume optimization tips and career advice.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-lg border border-indigo-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

