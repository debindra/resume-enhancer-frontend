import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
          <Link to="/" className="flex items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-base font-semibold text-white shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl sm:text-lg">
              RE
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-slate-900 sm:text-xl">Resume Optimizer & Enhancer</p>
              <p className="truncate text-xs text-slate-500 sm:text-sm">AI-Powered Career Optimization</p>
            </div>
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
