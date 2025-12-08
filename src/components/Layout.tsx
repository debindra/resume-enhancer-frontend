import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-neutral-white">
      <header className="border-b border-neutral-lightest bg-neutral-white/80 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-2 sm:gap-4" aria-label="CareerLift AI Home">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-base font-semibold text-neutral-white shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl sm:text-lg" aria-hidden="true">
              CL
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-neutral sm:text-xl">CareerLift AI</p>
              <p className="truncate text-xs text-neutral-lighter sm:text-sm">AI-Powered Career Optimization</p>
            </div>
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full overflow-x-hidden" role="main">{children}</main>
      <Footer />
    </div>
  );
}
