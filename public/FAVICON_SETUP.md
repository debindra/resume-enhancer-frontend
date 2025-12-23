# Favicon Setup Guide

## Required Favicon Files

To complete the favicon setup, you need to create the following files in the `/public` folder:

### Standard Favicons
- `favicon.ico` - 16x16, 32x32, 48x48 (multi-size ICO file)
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG
- `apple-touch-icon.png` - 180x180 PNG (for iOS devices)

### Modern Browser Icons
- `icon-192x192.png` - 192x192 PNG (Android)
- `icon-512x512.png` - 512x512 PNG (Android)
- `icon.svg` - SVG favicon (optional, for modern browsers)

## How to Generate Favicons

### Option 1: Using Online Tools
1. Visit https://realfavicongenerator.net/ or https://favicon.io/
2. Upload `logo-2.png` or `careerlift-ai.png` from the public folder
3. Download the generated favicon package
4. Extract and place all files in the `/public` folder

### Option 2: Using ImageMagick (Command Line)
```bash
# Convert logo to various sizes
convert public/logo-2.png -resize 16x16 public/favicon-16x16.png
convert public/logo-2.png -resize 32x32 public/favicon-32x32.png
convert public/logo-2.png -resize 180x180 public/apple-touch-icon.png
convert public/logo-2.png -resize 192x192 public/icon-192x192.png
convert public/logo-2.png -resize 512x512 public/icon-512x512.png

# Create multi-size ICO file (requires ImageMagick)
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon.ico
```

### Option 3: Using Figma/Design Tools
1. Open `logo-2.png` in your design tool
2. Export at the required sizes
3. Save to `/public` folder with the exact names listed above

## Current Status

✅ `manifest.json` - Created
✅ `web-app-manifest-512x512.png` - Exists
⏳ Favicon files - Need to be generated
⏳ Icon files - Need to be generated

## Notes

- The favicon links are already added to `app/layout.tsx`
- Once you add the favicon files, they will automatically be used
- The manifest.json references the icon files for PWA support
- All favicon files should be optimized for web (compressed)

