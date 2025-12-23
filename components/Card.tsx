import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-neutral-lightest bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardIconProps {
  children: ReactNode;
  className?: string;
}

export function CardIcon({ children, className = '' }: CardIconProps) {
  return (
    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`mb-2 text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <p className={`text-neutral-light ${className}`}>
      {children}
    </p>
  );
}