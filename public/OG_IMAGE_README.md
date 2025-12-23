# OG/Twitter Image Requirements

## Required Images for SEO:

### 1. Open Graph Image (og-image-1200x630.jpg)
- Dimensions: 1200x630 pixels
- Format: JPG or PNG
- Content: Should show CareerLift AI dashboard or resume optimization interface
- Alt text: "CareerLift AI Dashboard - Resume Optimization Tool"
- URL: https://resume-enhancer.com/og-image-1200x630.jpg

### 2. Twitter Card Image (twitter-card-1200x600.jpg)
- Dimensions: 1200x600 pixels
- Format: JPG or PNG
- Content: Similar to OG image but optimized for Twitter
- Alt text: "CareerLift AI - AI Resume Optimization"
- URL: https://resume-enhancer.com/twitter-card-1200x600.jpg

## Current Images Available:
- `careerlift-ai-full.png` (278KB)
- `careerlift-ai.png` (99KB)
- `logo-1.png`, `logo-2.png` (logos)
- `logo-full-1.png`, `logo-full-2.png` (full logos)

## Action Required:
1. Create or resize existing images to meet the dimensions above
2. Update the image URLs in `/frontend/app/layout.tsx` metadata
3. Ensure images are optimized for web (compress to <200KB)

## Quick Fix (Temporary):
You can use one of the existing images temporarily by updating the URLs in `layout.tsx`:
```typescript
// Temporary - use existing image
images: [
  {
    url: "https://resume-enhancer.com/careerlift-ai-full.png",
    width: 1200,  // Update with actual dimensions
    height: 630,  // Update with actual dimensions
    alt: "CareerLift AI Dashboard - Resume Optimization Tool",
  },
],
```