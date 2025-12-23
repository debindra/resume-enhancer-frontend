'use client';

interface TestimonialAvatarProps {
  src: string;
  alt: string;
  author: string;
  className?: string;
}

export default function TestimonialAvatar({ src, alt, author, className = "" }: TestimonialAvatarProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const name = author.split(',')[0];
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2C9ACE&color=fff&size=112`;
  };

  return (
    <img 
      src={src} 
      alt={alt}
      className={className} 
      loading="lazy"
      onError={handleError}
    />
  );
}

