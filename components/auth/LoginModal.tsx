'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { signIn, signInWithProvider } = useAuth();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
      setEmailError(null);
      setShowPassword(false);
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleEmailBlur = () => {
    if (email) {
      validateEmail(email);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);

    if (!validateEmail(email)) {
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message || 'Invalid email or password. Please try again.');
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative rounded-3xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/95 shadow-2xl animate-scale-in max-h-[90vh] w-[65%] max-w-2xl min-w-[400px] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-white border-2 border-neutral-lightest text-neutral-lighter shadow-sm transition-all hover:bg-neutral-lightest hover:text-neutral hover:border-neutral-light hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 sm:p-10 flex flex-col items-center">
          {/* Logo/Icon */}
          {/* <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light shadow-lg">
              <span className="text-2xl font-bold text-neutral-white">CL</span>
            </div>
          </div> */}

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-neutral sm:text-4xl mb-2">Welcome back</h2>
            <p className="text-base text-neutral-light">Sign in to your account to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 w-full max-w-md animate-fade-in rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2">
              <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-neutral text-left">
                Email address
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-4 pointer-events-none z-10">
                  <svg className="h-5 w-5 text-neutral-lighter flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div> */}
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                  autoComplete="email"
                  data-form-type="other"
                  className={`w-full rounded-xl border-2 bg-neutral-white  p-2 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none ${
                    emailError
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-neutral-lightest focus:border-primary'
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
              </div>
              {emailError && (
                <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-neutral text-left">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus:underline"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-4 pointer-events-none z-10">
                  <svg className="h-5 w-5 text-neutral-lighter flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25h-10.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div> */}
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  data-form-type="other"
                  className="w-full rounded-xl border-2 border-neutral-lightest bg-neutral-white p-2 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Implement forgot password functionality
                    setError('Forgot password feature coming soon!');
                  }}
                  className="text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-light p-2 text-base font-semibold text-neutral-white shadow-lg transition-all hover:from-primary-dark hover:to-primary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-lg disabled:hover:from-primary disabled:hover:to-primary-light"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 w-full max-w-md flex items-center">
            <div className="flex-1 border-t border-neutral-lightest"></div>
            <span className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-lighter">or continue with</span>
            <div className="flex-1 border-t border-neutral-lightest"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="w-full max-w-md flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => signInWithProvider('google')}
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-2 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
              aria-label="Continue with Google"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => signInWithProvider('linkedin')}
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-2 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
              aria-label="Continue with LinkedIn"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => signInWithProvider('github')}
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-2 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
              aria-label="Continue with GitHub"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-neutral-light">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onSwitchToSignup} 
              className="font-semibold text-primary transition hover:text-primary-dark hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

