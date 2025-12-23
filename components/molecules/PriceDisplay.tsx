interface PriceDisplayProps {
  price: number;
  highlighted?: boolean;
  showPeriod?: boolean;
}

export default function PriceDisplay({ 
  price, 
  highlighted = false,
  showPeriod = true 
}: PriceDisplayProps) {
  return (
    <div className="mt-4 flex items-baseline gap-1">
      <span className={`text-3xl sm:text-4xl font-bold tracking-tight ${
        highlighted ? "text-white" : "text-neutral"
      }`}>
        {price === 0 ? "Free" : `$${price}`}
      </span>
      {price > 0 && showPeriod && (
        <span className={`text-sm ${
          highlighted ? "text-neutral-light" : "text-neutral-lighter"
        }`}>
          /mo
        </span>
      )}
    </div>
  );
}

