import CheckIcon from '../atoms/CheckIcon';

interface FeatureItemProps {
  feature: string;
  highlighted?: boolean;
}

export default function FeatureItem({ feature, highlighted = false }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span className={`mt-0.5 rounded-full p-0.5 ${
        highlighted ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"
      }`}>
        <CheckIcon />
      </span>
      <span className={`text-xs leading-relaxed ${
        highlighted ? "text-neutral-light" : "text-neutral-light"
      }`}>
        {feature}
      </span>
    </li>
  );
}

