import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-lightest bg-neutral-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo withLink variant="footer" />
            <p className="text-sm leading-relaxed text-neutral-light">
              AI-powered resume optimization to help you land your dream job.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral">Product</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <a href="/#resume-analyzer" className="transition hover:text-primary">
                  Analyzer
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="transition hover:text-primary">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition hover:text-primary">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral">Resources</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <a href="/#faq" className="transition hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <Link href="/documentation" className="transition hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <Link href="/privacy-policy" className="transition hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="transition hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-neutral-lightest pt-6 sm:mt-10 sm:pt-8 md:mt-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-light sm:text-sm">
              © {currentYear} CareerLift AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-2 text-xs text-neutral-light sm:text-sm">
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                AI features by CareerLift AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

