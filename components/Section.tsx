import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  withDivider?: boolean;
}

export function Section({ children, id, className = '', withDivider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`${withDivider ? 'section-divider' : ''} section-padding ${className}`}
    >
      <div className="max-content-width container-padding">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 text-center ${className}`}>
      <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto max-w-2xl text-neutral-light">{description}</p>
      )}
    </div>
  );
}