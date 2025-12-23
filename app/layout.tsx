import type { Metadata } from "next";
import Layout from "@/components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Get 3x More Interviews - AI Resume Optimization | CareerLift AI",
    template: "%s | CareerLift AI"
  },
  description: "Stop getting ghosted! AI-powered resume optimization with instant ATS scores. Get 3x more interviews in 2 minutes. Try free ✓",
  keywords: ["resume optimization", "ATS score", "AI resume", "job application", "career advice", "resume builder", "ATS keywords", "applicant tracking system", "cover letter optimization"],
  authors: [{ name: "CareerLift AI" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resume-enhancer.com",
    siteName: "CareerLift AI",
    title: "Get 3x More Interviews - AI Resume Optimization | CareerLift AI",
    description: "Stop getting ghosted! AI-powered resume optimization with instant ATS scores. Get 3x more interviews in 2 minutes.",
    images: [
      {
        url: "https://resume-enhancer.com/careerlift-ai-full.png",
        width: 1200,
        height: 630,
        alt: "CareerLift AI Dashboard - Resume Optimization Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CareerLiftAI",
    creator: "@CareerLiftAI",
    title: "Get 3x More Interviews - AI Resume Optimization",
    description: "AI-powered resume optimization with instant ATS scores. Get 3x more interviews in 2 minutes. Try free.",
    images: ["https://resume-enhancer.com/careerlift-ai-full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className="overflow-x-hidden">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

