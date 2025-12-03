import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultTitle = "Resume Enhancer - AI-Powered Resume Optimization & ATS Scoring";
const defaultDescription = "Get 3x more interviews with AI-optimized resumes. Upload your resume and job posting to get instant ATS scores, keyword gap analysis, and tailored resume improvements. Powered by OpenAI.";
const defaultImage = "/og-image.jpg";
const siteUrl = process.env.VITE_SITE_URL || "https://resume-enhancer.com";

export default function SEO({
  title,
  description = defaultDescription,
  keywords = "resume optimization, ATS score, resume analyzer, AI resume, job application, resume builder, ATS keywords, resume tips, career advice",
  image = defaultImage,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  canonicalUrl,
  noindex = false,
  nofollow = false
}: SEOProps) {
  const fullTitle = title ? `${title} | Resume Enhancer` : defaultTitle;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author || "Resume Enhancer");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", fullImage, "property");
    updateMetaTag("og:url", fullUrl, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", "Resume Enhancer", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", fullImage);

    // Article-specific tags
    if (type === "article") {
      if (publishedTime) {
        updateMetaTag("article:published_time", publishedTime, "property");
      }
      if (modifiedTime) {
        updateMetaTag("article:modified_time", modifiedTime, "property");
      }
      if (author) {
        updateMetaTag("article:author", author, "property");
      }
    }

    // Robots meta
    const robotsContent = [
      noindex ? "noindex" : "index",
      nofollow ? "nofollow" : "follow"
    ].join(", ");
    updateMetaTag("robots", robotsContent);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl || fullUrl);

    // Language
    const htmlElement = document.documentElement;
    if (!htmlElement.getAttribute("lang")) {
      htmlElement.setAttribute("lang", "en");
    }
  }, [fullTitle, description, keywords, fullImage, fullUrl, type, author, publishedTime, modifiedTime, canonicalUrl, noindex, nofollow]);

  return null;
}

