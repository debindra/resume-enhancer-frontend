import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** If true, wraps the logo in a link to home */
  withLink?: boolean;
  /** Controls layout/preset sizes */
  variant?: "header" | "footer" | "modal";
  /** Optional additional classes for the outer wrapper */
  className?: string;
}

export default function Logo({
  withLink = false,
  variant = "header",
  className = "",
}: LogoProps) {
  const headerContent = (
    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
      {/* Mobile Logo */}
      <div className="flex h-10 shrink-0 items-center justify-center sm:hidden">
        <Image
          src="/logo-2.png"
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
          src="/logo-full-2.png"
          alt="CareerLift AI Logo"
          width={150}
          height={48}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </div>
  );

  const content =
    variant === "header" ? (
      headerContent
    ) : variant === "footer" ? (
      <div className="flex items-center gap-3">
        <Image
          src="/logo-full-2.png"
          alt="CareerLift AI Logo"
          width={150}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      </div>
    ) : (
      // modal
      <div className="flex justify-center">
        <Image
          src="/logo-full-2.png"
          alt="CareerLift AI Logo"
          width={160}
          height={48}
          className="h-12 w-auto object-contain"
          priority
        />
      </div>
    );

  if (withLink) {
    return (
      <Link
        href="/"
        className={`inline-flex items-center ${className}`}
        aria-label="CareerLift AI Home"
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}


