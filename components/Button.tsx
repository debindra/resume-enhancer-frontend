import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base = 'rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary',
    accent: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
}: LinkButtonProps) {
  const base = 'rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition inline-block text-center';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary',
    accent: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}