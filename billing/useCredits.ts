"use client";

import { useState } from "react";

type Tier = "freemium" | "plus" | "pro" | "recruiter";

type CreditLedger = {
  tier: Tier;
  remaining: number;
  monthly: number;
};

const TIER_DETAILS: Record<Tier, { label: string; monthly: number }> = {
  freemium: { label: "Freemium", monthly: 3 },
  plus: { label: "Plus", monthly: 15 },
  pro: { label: "Pro", monthly: 50 },
  recruiter: { label: "Recruiter", monthly: 200 }
};

export function useCredits(initialTier: Tier = "freemium") {
  const [ledger, setLedger] = useState<CreditLedger>({
    tier: initialTier,
    remaining: TIER_DETAILS[initialTier].monthly,
    monthly: TIER_DETAILS[initialTier].monthly
  });

  const consume = () =>
    setLedger((prev) => ({
      ...prev,
      remaining: Math.max(prev.remaining - 1, 0)
    }));

  const upgrade = (tier: Tier) =>
    setLedger({
      tier,
      remaining: TIER_DETAILS[tier].monthly,
      monthly: TIER_DETAILS[tier].monthly
    });

  return {
    ledger,
    consume,
    upgrade,
    tiers: TIER_DETAILS
  };
}

