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
        <div className="relative rounded-3xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/95 shadow-2xl animate-scale-in w-[65%] max-w-2xl min-w-[400px]">
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
          <div className="p-8 sm:p-10 text-center flex flex-col items-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-muted to-secondary-muted/60 animate-scale-in shadow-lg">
              <svg className="h-10 w-10 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-neutral sm:text-4xl">Check your email</h2>
            <p className="mb-8 text-base text-neutral-light leading-relaxed">
              We've sent a confirmation link to <strong className="text-neutral font-semibold">{email}</strong>. Please check your inbox to verify your account.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-gradient-to-r from-primary to-primary-light p-3 text-base font-semibold text-neutral-white shadow-lg transition-all hover:from-primary-dark hover:to-primary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 max-w-md w-full"
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
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <Logo variant="modal" className="mb-4" />
            <h2 className="text-3xl font-bold text-neutral sm:text-4xl mb-2">
              Create your account
            </h2>
            <p className="text-base text-neutral-light">
              Get started with CareerLift AI for free
            </p>
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
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="signup-name"
                className="block text-sm font-semibold text-neutral text-left"
              >
                Full name <span className="text-neutral-lighter font-normal">(optional)</span>
              </label>
              <div className="relative">
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border-2 border-neutral-lightest bg-neutral-white px-4 py-3 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block text-sm font-semibold text-neutral text-left"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                  autoComplete="email"
                  className={`w-full rounded-xl border-2 bg-neutral-white px-4 py-3 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none ${
                    emailError
                      ? 'border-red-300 focus:border-red-500 bg-red-50/30'
                      : 'border-neutral-lightest focus:border-primary'
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'signup-email-error' : undefined}
                />
              </div>
              {emailError && (
                <p
                  id="signup-email-error"
                  className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="block text-sm font-semibold text-neutral text-left"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`w-full rounded-xl border-2 px-4 py-3 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none ${
                    password && password.length < 8
                      ? 'border-red-300 focus:border-red-500 bg-red-50/30'
                      : password && password.length >= 8
                      ? 'border-green-300 focus:border-green-500 bg-green-50/30'
                      : 'border-neutral-lightest focus:border-primary bg-neutral-white'
                  }`}
                  placeholder="At least 8 characters"
                />
              </div>
              {password.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-neutral-lightest rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          passwordStrength.color === 'red'
                            ? 'bg-red-500'
                            : passwordStrength.color === 'orange'
                            ? 'bg-orange-500'
                            : 'bg-secondary'
                        }`}
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        passwordStrength.color === 'red'
                          ? 'text-red-600'
                          : passwordStrength.color === 'orange'
                          ? 'text-orange-600'
                          : 'text-secondary-dark'
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-light space-y-1">
                    <div
                      className={`flex items-center gap-1.5 ${
                        password.length >= 8 ? 'text-secondary-dark' : 'text-neutral-lighter'
                      }`}
                    >
                      <svg
                        className={`h-3.5 w-3.5 ${password.length >= 8 ? 'text-secondary' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {password.length >= 8 ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        )}
                      </svg>
                      At least 8 characters
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-neutral text-left"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`w-full rounded-xl border-2 px-4 py-3 text-base text-neutral placeholder:text-neutral-lighter transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/50 appearance-none ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 focus:border-red-500 bg-red-50/30'
                      : confirmPassword && password === confirmPassword && password.length >= 8
                      ? 'border-green-300 focus:border-green-500 bg-green-50/30'
                      : 'border-neutral-lightest focus:border-primary bg-neutral-white'
                  }`}
                  placeholder="Re-enter your password"
                />
              </div>
              {confirmPassword && (
                <div className="mt-1.5">
                  {password !== confirmPassword ? (
                    <p className="text-xs font-medium text-red-600 flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Passwords do not match
                    </p>
                  ) : (
                    <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Passwords match
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={
                  loading ||
                  password.length < 8 ||
                  password !== confirmPassword ||
                  !!emailError ||
                  !email
                }
                className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-4 text-base font-semibold text-neutral-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-lg disabled:hover:bg-accent"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-3 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
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
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-3 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
              aria-label="Continue with LinkedIn"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => signInWithProvider('github')}
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-neutral-lightest bg-neutral-white p-3 font-medium text-neutral transition-all hover:border-primary/50 hover:bg-neutral-lightest hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/10"
              aria-label="Continue with GitHub"
            >
              <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-neutral-light">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onSwitchToLogin} 
              className="font-semibold text-primary transition hover:text-primary-dark hover:underline focus:outline-none focus:underline focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

