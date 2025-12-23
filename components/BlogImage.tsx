interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function BlogImage({ src, alt, caption, className = "" }: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-neutral-lightest bg-neutral-lightest">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-neutral-lighter">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

