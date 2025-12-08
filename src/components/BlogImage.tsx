interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function BlogImage({ src, alt, caption, className = "" }: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}


