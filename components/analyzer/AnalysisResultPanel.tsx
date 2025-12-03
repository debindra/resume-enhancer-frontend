"use client";

import { ResumePreview } from "./ResumePreview";
import { type AnalysisResult } from "./types";
import { type ResumeTemplateKey } from "./exportUtils";
import { useMemo, useState } from "react";

const TEMPLATE_LABELS: Record<ResumeTemplateKey, string> = {
  modern: "Modern Gradient",
  classic: "Classic Professional",
  accent: "Left Accent"
};

type ViewMode = "optimized" | "original" | "compare";

interface AnalysisResultPanelProps {
  result: AnalysisResult;
  selectedTemplate: ResumeTemplateKey;
  onTemplateChange: (template: ResumeTemplateKey) => void;
  onDownloadPdf: () => void;
  onDownloadDoc: () => void;
  onOpenPreview: () => void;
  originalResume: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isProUser: boolean;
  isLoggedIn: boolean;
}

const renderTemplateThumbnail = (template: ResumeTemplateKey, isSelected: boolean) => (
  <span
    className={`flex h-14 w-10 flex-col rounded-xl border transition ${
      isSelected ? "border-primary shadow-lg shadow-primary/20" : "border-neutral-lightest bg-neutral-white"
    }`}
  >
    <span className="m-1 rounded-sm bg-neutral-lighter" />
    <span className="mx-1 mt-1 flex-1 rounded-sm bg-neutral-white" />
  </span>
);

export function AnalysisResultPanel({
  result,
  selectedTemplate,
  onTemplateChange,
  onDownloadPdf,
  onDownloadDoc,
  onOpenPreview,
  originalResume,
  viewMode,
  onViewModeChange,
  isProUser,
  isLoggedIn
}: AnalysisResultPanelProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const optimizedPreview = useMemo(
    () => <ResumePreview content={result.optimizedResume} template={selectedTemplate} />,
    [result.optimizedResume, selectedTemplate]
  );

  const originalPreview = useMemo(
    () => <ResumePreview content={originalResume} template={selectedTemplate} />,
    [originalResume, selectedTemplate]
  );

  const handleCopyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleCopyKeyword = async (keyword: string) => {
    try {
      await navigator.clipboard.writeText(keyword);
      setCopiedKeyword(keyword);
      setTimeout(() => setCopiedKeyword(null), 2000);
    } catch (err) {
      console.error("Failed to copy keyword:", err);
    }
  };

  const getATSScoreFeedback = (score: number): string => {
    if (score >= 85) return "Excellent! Your resume is highly ATS-compatible.";
    if (score >= 70) return "Good, but there's room for improvement.";
    if (score >= 50) return "Fair. Consider adding more relevant keywords.";
    return "Needs improvement. Focus on keyword optimization.";
  };

  const getJobMatchFeedback = (score: number): string => {
    if (score >= 85) return "Excellent match! Apply with confidence.";
    if (score >= 70) return "Good match. Minor tweaks could strengthen your application.";
    if (score >= 50) return "Moderate match. Consider aligning your experience more closely.";
    return "Limited match. Review job requirements and adjust your resume.";
  };

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Two Scorecards Side-by-Side */}
      {(typeof result.atsScore === "number" || typeof result.jobMatchScore === "number") && (
        <div className="w-full">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {/* ATS Score Card */}
            {typeof result.atsScore === "number" && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:rounded-3xl sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-900 sm:text-sm">ATS Score</p>
                    <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs">Applicant Tracking System Compatibility</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary sm:h-10 sm:w-10">
                    <svg className="h-4 w-4 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <p className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                    {Math.round(Math.max(0, Math.min(100, result.atsScore ?? 0)))}
                    <span className="text-lg text-gray-500 sm:text-xl md:text-2xl">%</span>
                  </p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200 sm:mt-4">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{
                      width: `${Math.max(0, Math.min(100, result.atsScore ?? 0))}%`
                    }}
                  />
                </div>
                <p className="mt-3 text-[10px] text-gray-600 sm:mt-4 sm:text-xs">
                  <span className="mr-1">👍</span>
                  {getATSScoreFeedback(result.atsScore ?? 0)}
                </p>
              </div>
            )}

            {/* Job Match Score Card */}
            {typeof result.jobMatchScore === "number" && (
              <div className="rounded-2xl border border-gray-200 bg-green-50 p-5 sm:rounded-3xl sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-900 sm:text-sm">Job Match Score</p>
                    <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs">How well you match the job requirements</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500 sm:h-10 sm:w-10">
                    <svg className="h-4 w-4 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <p className="text-3xl font-bold text-teal-600 sm:text-4xl md:text-5xl">
                    {Math.round(Math.max(0, Math.min(100, result.jobMatchScore ?? 0)))}
                    <span className="text-lg text-gray-500 sm:text-xl md:text-2xl">%</span>
                  </p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200 sm:mt-4">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{
                      width: `${Math.max(0, Math.min(100, result.jobMatchScore ?? 0))}%`
                    }}
                  />
                </div>
                <p className="mt-3 text-[10px] text-gray-600 sm:mt-4 sm:text-xs">
                  <span className="mr-1">🎯</span>
                  {getJobMatchFeedback(result.jobMatchScore ?? 0)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyword Analysis Section */}
      {(result.matchedKeywords?.length > 0 || result.missingKeywords?.length > 0) && (
        <div className="w-full space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">Keyword Analysis</h3>
            <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">Keywords found and missing from your resume</p>
          </div>

          {/* Found and Missing Keywords */}
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {/* Found Keywords */}
            {result.matchedKeywords && result.matchedKeywords.length > 0 && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5 sm:rounded-2xl sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 sm:h-8 sm:w-8">
                    <svg className="h-3.5 w-3.5 text-white sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                    Found Keywords ({result.matchedKeywords.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {result.matchedKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-green-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {result.missingKeywords && result.missingKeywords.length > 0 && (
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 sm:rounded-2xl sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 sm:h-8 sm:w-8">
                    <svg className="h-3.5 w-3.5 text-white sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                    Missing Keywords - Add These! ({result.missingKeywords.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {result.missingKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => handleCopyKeyword(keyword)}
                      className={`rounded-md border px-2 py-1 text-xs font-medium transition sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm ${
                        copiedKeyword === keyword
                          ? "border-green-500 bg-green-100 text-green-700"
                          : "border-orange-300 bg-white text-gray-700 hover:border-orange-400 hover:bg-orange-100"
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-1 text-[10px] text-gray-600 sm:mt-4 sm:text-xs">
                  <svg className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Click any keyword to copy it
                </p>
              </div>
            )}
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {/* Strengths */}
            {result.strengths && result.strengths.length > 0 && (
              <div className="rounded-2xl border border-green-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Strengths</h4>
                </div>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement */}
            {result.improvements && result.improvements.length > 0 && (
              <div className="rounded-2xl border border-orange-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Areas for Improvement</h4>
                </div>
                <ul className="space-y-2">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-lightest bg-neutral-white p-5 sm:rounded-3xl sm:p-6">
          <div className="mb-3 sm:mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">Enhancement Plan</span>
            <h3 className="mt-1.5 text-base font-semibold text-neutral sm:mt-2 sm:text-lg">Recommended updates</h3>
            <p className="mt-1 text-xs text-neutral-lighter sm:text-sm">
              Tailored suggestions based on the target job description and your resume content.
            </p>
          </div>
          <ul className="space-y-2 text-xs text-neutral-light sm:space-y-3 sm:text-sm">
            {result.insights.length > 0 ? (
              result.insights.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex gap-2 rounded-2xl border border-primary-muted bg-gradient-to-r from-primary-muted via-neutral-white to-neutral-white p-3 shadow-sm sm:gap-3 sm:rounded-3xl sm:p-4"
                >
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-neutral-white sm:h-8 sm:w-8 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs leading-relaxed text-neutral-light sm:text-sm">{item}</p>
                </li>
              ))
            ) : (
              <li className="rounded-xl bg-neutral-white p-2.5 text-xs sm:rounded-2xl sm:p-3 sm:text-sm">
                The AI will highlight specific keyword gaps and formatting tips once enough context is provided.
              </li>
            )}
          </ul>
          <div className="mt-3 rounded-xl bg-gradient-to-br from-primary-muted to-secondary-muted p-3 text-xs text-neutral-light sm:mt-4 sm:rounded-2xl sm:p-4 sm:text-sm">
            {isProUser && isLoggedIn
              ? "Keep iterating with bulk comparisons and recruiter-ready assets included in your plan."
              : "Create a free account to save versions; upgrade later for automated cover letters and recruiter sharing."}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-lightest bg-neutral-white p-5 sm:gap-5 sm:rounded-3xl sm:p-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">Enhanced Output</span>
            <h3 className="mt-1.5 text-base font-semibold text-neutral sm:mt-2 sm:text-lg">Optimized resume preview</h3>
            <p className="mt-1 text-xs text-neutral-lighter sm:text-sm">
              Review the AI-enhanced resume content and download your tailored document. Toggle between original and AI output to validate changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-lighter sm:text-xs">Templates</span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(Object.keys(TEMPLATE_LABELS) as ResumeTemplateKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onTemplateChange(key)}
                    className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold transition sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs ${
                      selectedTemplate === key
                        ? "bg-primary text-neutral-white shadow"
                        : "border border-neutral-lightest text-neutral-light hover:border-primary hover:text-primary"
                    }`}
                  >
                    {renderTemplateThumbnail(key, selectedTemplate === key)}
                    <span className="hidden sm:inline">{TEMPLATE_LABELS[key]}</span>
                    <span className="sm:hidden">{key === "modern" ? "Modern" : key === "classic" ? "Classic" : "Accent"}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(["optimized", "original", "compare"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize transition sm:px-3 sm:py-1.5 sm:text-xs ${
                    viewMode === mode
                      ? "bg-neutral text-neutral-white shadow"
                      : "border border-neutral-lightest text-neutral-light hover:border-primary hover:text-primary"
                  }`}
                  onClick={() => onViewModeChange(mode)}
                >
                  {mode.replace("compare", "side-by-side")}
                </button>
              ))}
            </div>

            <div className="max-h-[20rem] overflow-auto pr-1 sm:max-h-[30rem] sm:pr-2">
              {viewMode === "optimized" ? (
                optimizedPreview
              ) : viewMode === "original" ? (
                originalPreview
              ) : (
                <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                  <div className="min-w-0 rounded-xl border border-neutral-lightest bg-neutral-white p-3 sm:rounded-2xl sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-lighter sm:text-xs">Original</p>
                    <pre className="mt-1.5 max-w-full overflow-x-auto whitespace-pre-wrap break-words text-xs text-neutral-light sm:mt-2 sm:text-sm">{originalResume}</pre>
                  </div>
                  <div className="min-w-0 rounded-xl border border-primary bg-primary-muted/50 p-3 sm:rounded-2xl sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">Optimized</p>
                    <pre className="mt-1.5 max-w-full overflow-x-auto whitespace-pre-wrap break-words text-xs text-neutral-light sm:mt-2 sm:text-sm">{result.optimizedResume}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {result.linkedinSummary ? (
            <div className="rounded-xl border border-primary-muted bg-primary-muted p-3 text-xs text-primary-dark sm:rounded-2xl sm:p-4 sm:text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide sm:text-xs">LinkedIn Summary Idea</p>
                <button
                  type="button"
                  onClick={() => handleCopyToClipboard(result.linkedinSummary!, "linkedin")}
                  className="group relative inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-neutral-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md active:scale-95 sm:gap-1.5 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs"
                  title="Copy to clipboard"
                >
                  {copiedSection === "linkedin" ? (
                    <>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-1.5 break-words sm:mt-2">{result.linkedinSummary}</p>
            </div>
          ) : null}
          {result.coverLetter ? (
            <div className="rounded-xl border border-accent-muted bg-accent-muted p-3 text-xs text-accent-dark sm:rounded-2xl sm:p-4 sm:text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide sm:text-xs">Cover Letter Draft</p>
                <button
                  type="button"
                  onClick={() => handleCopyToClipboard(result.coverLetter!, "coverLetter")}
                  className="group relative inline-flex shrink-0 items-center gap-1 rounded-md bg-accent px-2 py-1 text-[10px] font-medium text-neutral-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md active:scale-95 sm:gap-1.5 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs"
                  title="Copy to clipboard"
                >
                  {copiedSection === "coverLetter" ? (
                    <>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap break-words sm:mt-2">{result.coverLetter}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={!result.optimizedResume}
              className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2 sm:text-sm"
              title="Opens print dialog to save as PDF with full styling"
            >
              Save as PDF
            </button>
            <button
              type="button"
              onClick={onDownloadDoc}
              disabled={!result.optimizedResume}
              className="rounded-full border border-neutral-lightest px-4 py-1.5 text-xs font-semibold text-neutral-light transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2 sm:text-sm"
            >
              Download DOC
            </button>
            <button
              type="button"
              onClick={onOpenPreview}
              disabled={!result.optimizedResume}
              className="rounded-full border border-neutral-lightest px-4 py-1.5 text-xs font-semibold text-neutral-light transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2 sm:text-sm"
            >
              View Full Preview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

