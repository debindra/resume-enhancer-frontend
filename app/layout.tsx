import type { Metadata } from "next";
import Layout from "@/components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerLift AI",
  description: "AI-Powered Career Optimization - Stop getting ghosted. Get 3x more interviews with AI-optimized resumes.",
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

