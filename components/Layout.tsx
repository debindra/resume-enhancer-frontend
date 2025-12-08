'use client';

import type { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";

function LayoutContent({ children }: PropsWithChildren) {
  const { user, loading, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#resume-analyzer", label: "Analyzer" },
    { href: "/documentation", label: "Documentation" },
    { href: "/blog", label: "Blog" },
  ];

  // Close mobile menu when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Don't close if clicking the hamburger button itself
      if (hamburgerButtonRef.current && hamburgerButtonRef.current.contains(target)) {
        return;
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    if (mobileMenuOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [mobileMenuOpen, userMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-white overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-lightest bg-neutral-white shadow-sm overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-4 shrink-0" 
              aria-label="CareerLift AI Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Mobile Logo */}
              <div className="flex h-10 shrink-0 items-center justify-center sm:hidden">
                <Image
                  src="/logo-1.png"
                  alt="CareerLift AI Logo"
                  width={48}
                  height={48}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
              {/* Desktop Full Logo */}
              <div className="hidden sm:block h-12 shrink-0">
                <Image
                  src="/logo-full-1.png"
                  alt="CareerLift AI Logo"
                  width={150}
                  height={48}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-light transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-neutral-light transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
                      >
                        Dashboard
                      </Link>
                      <div className="relative" ref={userMenuRef}>
                        <button 
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-light transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-semibold">
                            {user.email?.[0]?.toUpperCase() || 'U'}
                          </div>
                        </button>
                        {userMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-lightest bg-neutral-white shadow-lg z-50">
                              <div className="p-2">
                                <p className="px-3 py-2 text-sm text-neutral font-semibold truncate">{user.email}</p>
                                <button
                                  onClick={() => {
                                    signOut();
                                    setUserMenuOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-neutral-light hover:bg-neutral-lightest rounded transition"
                                >
                                  Sign out
                                </button>
                              </div>
                            </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="text-sm font-medium text-neutral-light transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => setShowSignup(true)}
                        className="group relative inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-5 py-2.5 text-sm font-bold text-neutral-white shadow-lg transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        Sign Up
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {!loading && !user && (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-medium text-neutral-light transition-colors hover:text-primary px-2 py-1 whitespace-nowrap"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowSignup(true);
                      setMobileMenuOpen(false);
                    }}
                    className="group relative inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-4 py-2 text-xs font-bold text-neutral-white shadow-md transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-primary/40 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Sign Up
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 text-xs">→</span>
                  </button>
                </>
              )}
              {!loading && user && (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center rounded-lg p-1.5 text-neutral-light transition hover:text-primary"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-semibold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-lightest bg-neutral-white shadow-lg z-50 animate-scale-in">
                        <div className="p-2">
                          <p className="px-3 py-2 text-sm text-neutral font-semibold truncate border-b border-neutral-lightest">{user.email}</p>
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="block w-full text-left px-3 py-2 text-sm text-neutral-light hover:bg-neutral-lightest rounded transition mt-1"
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-neutral-light hover:bg-neutral-lightest rounded transition mt-1"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              )}
              <button
                ref={hamburgerButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 -mr-2 text-neutral-light hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded z-10"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                type="button"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div ref={mobileMenuRef} className="md:hidden border-t border-neutral-lightest mt-3 pt-4 pb-4 animate-fade-in">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-neutral-light transition-colors hover:text-primary hover:bg-neutral-lightest rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
                {!loading && user && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-neutral-light transition-colors hover:text-primary hover:bg-neutral-lightest rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 w-full pt-16 sm:pt-20 md:pt-24 overflow-x-hidden">{children}</main>
      <Footer />
      
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}

