import FeatureItem from './FeatureItem';

interface FeatureListProps {
  features: string[];
  highlighted?: boolean;
}

export default function FeatureList({ features, highlighted = false }: FeatureListProps) {
  return (
    <div className="flex-1 p-5 sm:p-6 pt-4">
      <ul className="space-y-2.5">
        {features.map((feature, i) => (
          <FeatureItem key={i} feature={feature} highlighted={highlighted} />
        ))}
      </ul>
    </div>
  );
}

