import { useState } from 'react';
import PricingCard, { PricingTier } from '../molecules/PricingCard';

interface PricingSectionProps {
  tiers: PricingTier[];
  defaultBillingCycle?: 'monthly' | 'annual';
  showBillingToggle?: boolean;
  onCtaClick?: (tierId: string) => void;
  ctaHref?: (tierId: string) => string;
}

export default function PricingSection({
  tiers,
  defaultBillingCycle = 'monthly',
  showBillingToggle = true,
  onCtaClick,
  ctaHref
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(defaultBillingCycle);

  const getPrice = (tier: PricingTier) =>
    billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice;

  const getAnnualSavings = (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) return 0;
    return Math.round(((tier.monthlyPrice - tier.annualPrice) / tier.monthlyPrice) * 100);
  };

  return (
    <section id="pricing" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Simple Pricing</h2>
          <p className="mt-4 text-neutral-light">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        {showBillingToggle && (
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg border border-neutral-lightest bg-white p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white"
                    : "text-neutral-light hover:text-neutral"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "annual"
                    ? "bg-primary text-white"
                    : "text-neutral-light hover:text-neutral"
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
          {tiers.map((tier) => {
            const price = getPrice(tier);
            const savings = getAnnualSavings(tier);

            return (
              <PricingCard
                key={tier.id}
                tier={tier}
                price={price}
                savings={savings}
                billingCycle={billingCycle}
                onCtaClick={() => onCtaClick?.(tier.id)}
                ctaHref={ctaHref?.(tier.id)}
              />
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-lighter">
            All plans include a 14-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

