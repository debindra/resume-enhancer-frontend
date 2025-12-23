# Atomic Design Pattern

This project follows the **Atomic Design Pattern** to create a more manageable and maintainable component structure.

## Structure

```
components/
├── atoms/          # Smallest, most basic components
├── molecules/      # Simple combinations of atoms
├── organisms/      # Complex components made of molecules/atoms
└── ...
```

## Atoms

Atoms are the smallest, most basic building blocks. They cannot be broken down further without losing their meaning.

### Available Atoms

- **Badge** (`atoms/Badge.tsx`) - Reusable badge component with variants
- **PopularBadge** (`atoms/PopularBadge.tsx`) - Badge positioned on top of cards
- **CheckIcon** (`atoms/CheckIcon.tsx`) - Checkmark icon component

### Usage

```tsx
import { Badge, PopularBadge, CheckIcon } from '@/components/atoms';

<Badge variant="primary">New</Badge>
<PopularBadge text="Most Popular" showIcon />
<CheckIcon className="h-5 w-5" />
```

## Molecules

Molecules are simple combinations of atoms that form more complex UI elements.

### Available Molecules

- **FeatureItem** (`molecules/FeatureItem.tsx`) - Single feature with check icon
- **FeatureList** (`molecules/FeatureList.tsx`) - List of features
- **PriceDisplay** (`molecules/PriceDisplay.tsx`) - Price display component
- **PricingCard** (`molecules/PricingCard.tsx`) - Complete pricing card component

### Usage

```tsx
import { PricingCard, type PricingTier } from '@/components/molecules';

const tier: PricingTier = {
  id: 'pro',
  name: 'Pro',
  description: 'Best plan',
  monthlyPrice: 29,
  annualPrice: 24,
  credits: 30,
  features: ['Feature 1', 'Feature 2'],
  highlighted: true,
  badge: 'Most Popular',
  ctaText: 'Get Started'
};

<PricingCard 
  tier={tier} 
  price={29} 
  savings={17}
  billingCycle="monthly"
/>
```

## Organisms

Organisms are complex components that combine molecules and atoms into complete UI sections.

### Available Organisms

- **PricingSection** (`organisms/PricingSection.tsx`) - Complete pricing section with billing toggle

### Usage

```tsx
import { PricingSection } from '@/components/organisms';
import type { PricingTier } from '@/components/molecules';

const tiers: PricingTier[] = [/* ... */];

<PricingSection 
  tiers={tiers}
  defaultBillingCycle="monthly"
  showBillingToggle={true}
/>
```

## Benefits

1. **Reusability** - Components can be easily reused across the application
2. **Maintainability** - Changes to one component don't affect others
3. **Consistency** - Consistent UI patterns throughout the app
4. **Testability** - Smaller components are easier to test
5. **Scalability** - Easy to add new components following the same pattern

## Best Practices

1. **Atoms should be pure** - No business logic, just presentation
2. **Molecules combine atoms** - Use atoms as building blocks
3. **Organisms handle complexity** - Can contain state and business logic
4. **Type safety** - Export types with components when needed
5. **Documentation** - Add JSDoc comments for complex props

## Adding New Components

### Adding an Atom

1. Create file in `components/atoms/YourAtom.tsx`
2. Export from `components/atoms/index.ts`
3. Keep it simple and reusable

### Adding a Molecule

1. Create file in `components/molecules/YourMolecule.tsx`
2. Use atoms as building blocks
3. Export from `components/molecules/index.ts`

### Adding an Organism

1. Create file in `components/organisms/YourOrganism.tsx`
2. Combine molecules and atoms
3. Can contain state and business logic
4. Export from `components/organisms/index.ts`

