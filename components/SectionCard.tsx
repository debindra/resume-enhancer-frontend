import type { PropsWithChildren, ReactNode } from "react";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionCard({ title, description, action, children }: SectionCardProps) {
  return (
    <section className="mb-6 rounded-2xl border border-neutral-lightest bg-neutral-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
        <h2 className="text-lg font-semibold text-neutral">{title}</h2>
        {description ? <p className="text-sm text-neutral-light">{description}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-4 space-y-4 text-sm text-neutral-light">{children}</div>
    </section>
  );
}

