'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '../Logo';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { signUp, signInWithProvider } = useAuth();

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
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      setEmailError(null);
      setSuccess(false);
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

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: '', color: '' };
    if (pwd.length < 6) return { strength: 1, label: 'Weak', color: 'red' };
    if (pwd.length < 8) return { strength: 2, label: 'Fair', color: 'orange' };
    if (pwd.length < 12 && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) {
      return { strength: 2, label: 'Fair', color: 'orange' };
    }
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(pwd)) {
      return { strength: 4, label: 'Very Strong', color: 'secondary' };
    }
    return { strength: 3, label: 'Strong', color: 'secondary' };
  };

  const passwordStrength = getPasswordStrength(password);

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

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message || 'Failed to create account. Please try again.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-lg animate-scale-in w-full max-w-md">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-lighter transition-all hover:border-neutral-300 hover:text-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-6 sm:p-8 text-center flex flex-col items-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 border border-green-200">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-medium text-neutral sm:text-3xl">Check your email</h2>
            <p className="mb-6 text-sm text-neutral-light">
              We've sent a confirmation link to <strong className="text-neutral font-medium">{email}</strong>. Please check your inbox to verify your account.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-accent-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 w-full"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-lg animate-scale-in max-h-[90vh] w-full max-w-md overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-lighter transition-all hover:border-neutral-300 hover:text-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 flex flex-col items-center">
          {/* Logo/Header */}
          <div className="mb-6 text-center">
            <Logo variant="modal" className="mb-3" />
            <h2 className="text-2xl font-medium text-neutral sm:text-3xl mb-2">
              Create your account
            </h2>
            <p className="text-sm text-neutral-light">
              Get started for free
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 w-full rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-neutral text-left"
              >
                Full name <span className="text-neutral-lighter font-normal">(optional)</span>
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral placeholder:text-neutral-lighter transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-neutral text-left"
              >
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
                autoComplete="email"
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 ${
                  emailError
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-200 focus:border-primary'
                }`}
                placeholder="you@example.com"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'signup-email-error' : undefined}
              />
              {emailError && (
                <p
                  id="signup-email-error"
                  className="text-xs text-red-600"
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-neutral text-left"
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 ${
                  password && password.length < 8
                    ? 'border-red-300 focus:border-red-500'
                    : password && password.length >= 8
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-neutral-200 focus:border-primary bg-white'
                }`}
                placeholder="At least 8 characters"
              />
              {password.length > 0 && password.length < 8 && (
                <p className="text-xs text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-neutral text-left"
              >
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 ${
                  confirmPassword && password !== confirmPassword
                    ? 'border-red-300 focus:border-red-500'
                    : confirmPassword && password === confirmPassword && password.length >= 8
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-neutral-200 focus:border-primary bg-white'
                }`}
                placeholder="Re-enter your password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={
                  loading ||
                  password.length < 8 ||
                  password !== confirmPassword ||
                  !!emailError ||
                  !email
                }
                className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-accent-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 w-full flex items-center">
            <div className="flex-1 border-t border-neutral-200"></div>
            <span className="px-4 text-xs text-neutral-lighter">or continue with</span>
            <div className="flex-1 border-t border-neutral-200"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="w-full flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => signInWithProvider('google')}
              className="flex-1 flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2.5 text-neutral transition hover:border-neutral-300 hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
              onClick={() => signInWithProvider('linkedin_oidc')}
              className="flex-1 flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2.5 text-neutral transition hover:border-neutral-300 hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Continue with LinkedIn"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => signInWithProvider('github')}
              className="flex-1 flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2.5 text-neutral transition hover:border-neutral-300 hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Continue with GitHub"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-neutral-light">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onSwitchToLogin} 
              className="font-medium text-primary hover:text-primary-dark hover:underline focus:outline-none"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

