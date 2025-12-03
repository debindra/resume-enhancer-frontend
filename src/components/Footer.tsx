import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-semibold text-white shadow-md">
                RE
              </div>
              <span className="text-lg font-semibold text-slate-900">Resume Enhancer</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              AI-powered resume optimization to help you land your dream job.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="/#features" className="transition hover:text-indigo-600">
                  Features
                </a>
              </li>
              <li>
                <a href="/#resume-analyzer" className="transition hover:text-indigo-600">
                  Analyzer
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="transition hover:text-indigo-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition hover:text-indigo-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="/#faq" className="transition hover:text-indigo-600">
                  Help Center
                </a>
              </li>
              <li>
                <Link to="/documentation" className="transition hover:text-indigo-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition hover:text-indigo-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/privacy-policy" className="transition hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="transition hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="transition hover:text-indigo-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-600">
              © {currentYear} Resume Enhancer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Powered by OpenAI
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

