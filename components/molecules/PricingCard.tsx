import PopularBadge from '../atoms/PopularBadge';
import PriceDisplay from './PriceDisplay';
import FeatureList from './FeatureList';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  credits: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
}

interface PricingCardProps {
  tier: PricingTier;
  price: number;
  savings?: number;
  billingCycle?: 'monthly' | 'annual';
  onCtaClick?: () => void;
  ctaHref?: string;
}

export default function PricingCard({ 
  tier, 
  price, 
  savings,
  billingCycle = 'monthly',
  onCtaClick,
  ctaHref 
}: PricingCardProps) {
  const isHighlighted = tier.highlighted;

  const ctaContent = (
    <a
      href={ctaHref || "#resume-analyzer"}
      onClick={onCtaClick}
      className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
        isHighlighted
          ? "bg-accent text-neutral-white shadow-lg shadow-accent/30 hover:bg-accent-dark hover:shadow-xl"
          : tier.id === "plus"
            ? "bg-primary text-neutral-white shadow-md hover:bg-primary-dark hover:shadow-lg"
            : "border border-neutral-lightest bg-neutral-white text-neutral hover:border-primary hover:text-primary"
      }`}
    >
      {tier.ctaText}
    </a>
  );

  return (
    <div
      className={`group relative flex w-full max-w-xs mx-auto flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
        isHighlighted
          ? "bg-gradient-to-b from-primary-dark via-primary to-primary-light text-neutral-white shadow-2xl shadow-primary/40 ring-2 ring-accent/50 scale-[1.02] lg:scale-105 z-10"
          : "bg-neutral-white shadow-lg shadow-neutral-lightest/50 ring-1 ring-neutral-lightest hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      {/* Popular Badge */}
      {tier.badge && <PopularBadge text={tier.badge} showIcon={true} />}

      {/* Card Content */}
      <div className={`p-5 sm:p-6 ${tier.badge ? "pt-6 sm:pt-7" : ""}`}>
        <h3 className={`text-base font-bold ${isHighlighted ? "text-white" : "text-neutral"}`}>
          {tier.name}
        </h3>
        <p className={`mt-1 text-xs ${isHighlighted ? "text-neutral-light" : "text-neutral-lighter"}`}>
          {tier.description}
        </p>

        {/* Price */}
        <PriceDisplay price={price} highlighted={isHighlighted} />

        {/* Savings */}
        {billingCycle === "annual" && savings && savings > 0 && (
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
            isHighlighted ? "bg-secondary/20 text-secondary" : "bg-secondary/10 text-secondary-dark"
          }`}>
            Save {savings}%
          </span>
        )}

        {/* Credits */}
        <p className={`mt-3 text-xs font-medium ${isHighlighted ? "text-neutral-light" : "text-neutral-light"}`}>
          {tier.credits} analyses/month
        </p>
      </div>

      {/* Divider */}
      <div className={`mx-5 sm:mx-6 border-t ${isHighlighted ? "border-neutral-lightest/60" : "border-neutral-lightest"}`} />

      {/* Features */}
      <FeatureList features={tier.features} highlighted={isHighlighted} />

      {/* CTA */}
      <div className="px-5 sm:px-6 pt-0 pb-6 sm:pb-7">
        {ctaContent}
      </div>
    </div>
  );
}

