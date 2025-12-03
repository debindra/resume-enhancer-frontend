"use client";

import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnalyzerOptionsPanel } from "./analyzer/AnalyzerOptionsPanel";
import { AnalysisResultPanel } from "./analyzer/AnalysisResultPanel";
import { JobContextPanel } from "./analyzer/JobContextPanel";
import { ResumeInputPanel } from "./analyzer/ResumeInputPanel";
import { ResumePreview } from "./analyzer/ResumePreview";
import { createDocBlob, createPdfBlob, type ResumeTemplateKey } from "./analyzer/exportUtils";
import { demoPayloads, type DemoPayload } from "./analyzer/demoData";
import type { AnalysisResult, JobEntryMode, UploadFormValues } from "./analyzer/types";
import { analyzeResume, deleteAnalyzerSession, extractResumeFile } from "@/services/analyzerClient";

interface AnalyzerFormProps {
  isProUser?: boolean;
  isLoggedIn?: boolean;
}

type ViewMode = "optimized" | "original" | "compare";

export default function AnalyzerForm({ isProUser = false, isLoggedIn = false }: AnalyzerFormProps) {
  const { register, handleSubmit, setValue, watch, resetField } = useForm<UploadFormValues>({
    defaultValues: { resumeText: "", jobUrl: "", jobDescription: "" }
  });

  const [mode, setMode] = useState<JobEntryMode>("url");
  const [status, setStatus] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>("No file chosen");
  const [uploadedResumeText, setUploadedResumeText] = useState<string | null>(null);
  const [originalResume, setOriginalResume] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateKey>("modern");
  const [viewMode, setViewMode] = useState<ViewMode>("optimized");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | undefined>(undefined);

  const [includeCoverLetter, setIncludeCoverLetter] = useState(false);
  const [includeLinkedIn, setIncludeLinkedIn] = useState(false);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [tone, setTone] = useState("professional");
  const [targetRole, setTargetRole] = useState("");
  const [shouldDeleteAfter, setShouldDeleteAfter] = useState(true);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const resumeTextValue = watch("resumeText");

  const handleClearResume = useCallback(() => {
    resetField("resumeText");
    setUploadedResumeText(null);
    setResumeFileName("No file chosen");
    setStatus("Resume fields cleared.");
    setAnalysisResult(null);
    setOriginalResume("");
  }, [resetField]);

  const handleLoadDemo = useCallback(
    (payload: DemoPayload) => {
      setValue("resumeText", payload.resume);
      setValue("jobDescription", payload.jobDescription);
      setValue("jobUrl", payload.jobUrl ?? "");
      setMode(payload.jobUrl ? "url" : "manual");
      setUploadedResumeText(payload.resume);
      setStatus(`Loaded demo set: ${payload.title}. Make tweaks and run analysis.`);
      setTargetRole(payload.title.split("•")[0]?.trim() ?? payload.title);
      setApiError(null);
      setAnalysisResult(null);
      setViewMode("optimized");
    },
    [setValue]
  );

  const handleResumeSample = useCallback(
    (text: string) => {
      setValue("resumeText", text);
      setUploadedResumeText(text);
      setStatus("Sample resume loaded. Adjust details to match your experience.");
      setApiError(null);
      setAnalysisResult(null);
      setViewMode("optimized");
    },
    [setValue]
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        setResumeFileName("No file chosen");
        setUploadedResumeText(null);
        return;
      }

      setResumeFileName(file.name);
      setStatus("Uploading file for secure extraction…");
      setApiError(null);

      if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = String(reader.result ?? "");
          setUploadedResumeText(content);
          setValue("resumeText", content);
          setStatus("Resume text loaded from file. Review and edit before analysis.");
        };
        reader.onerror = () => {
          setUploadedResumeText(null);
          setStatus("Unable to read the file. Paste your resume text or try another file.");
        };
        reader.readAsText(file);
        return;
      }

      try {
        const { text } = await extractResumeFile(file);
        setUploadedResumeText(text);
        setValue("resumeText", text);
        setStatus("Resume text extracted securely. Review before submitting.");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to read the file. Paste your resume text instead.";
        setUploadedResumeText(null);
        setStatus(message);
        setApiError(message);
      }
    },
    [setValue]
  );

  const guessTargetRole = useCallback((description?: string) => {
    if (!description) return undefined;
    const lines = description.split("\n").map((line) => line.trim()).filter(Boolean);
    for (const line of lines.slice(0, 3)) {
      const match = line.match(/([A-Za-z][A-Za-z \-/&]{2,})/);
      if (match) {
        const role = match[1].trim();
        if (role.split(" ").length <= 8) {
          return role
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        }
      }
    }
    return undefined;
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    if (!analysisResult?.optimizedResume) return;
    try {
      const blob = await createPdfBlob(analysisResult.optimizedResume, selectedTemplate);
      const url = URL.createObjectURL(blob);
      
      // Open in new tab so user can print to PDF
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.addEventListener('load', () => {
          setTimeout(() => {
            newWindow.focus();
            newWindow.print();
          }, 250);
        });
        setStatus("Opening print dialog. Choose 'Save as PDF' as the destination to download your styled resume.");
      } else {
        // Fallback: download HTML file
        const link = document.createElement("a");
        link.href = url;
        link.download = "optimized-resume.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setStatus("Resume downloaded as HTML. Open it and use Print → Save as PDF for best results.");
      }
      
      // Clean up after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      setApiError("Unable to generate PDF. Please try again.");
    }
  }, [analysisResult, selectedTemplate]);

  const handleDownloadDoc = useCallback(() => {
    if (!analysisResult?.optimizedResume) return;
    const blob = createDocBlob(analysisResult.optimizedResume, selectedTemplate);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optimized-resume.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [analysisResult, selectedTemplate]);

  const handleClosePreview = useCallback(() => setIsPreviewOpen(false), []);

  const sampleResumes = useMemo(
    () => demoPayloads.map((payload, index) => ({ label: payload.title.split("•")[0]?.trim() ?? `Demo ${index + 1}`, resume: payload.resume })),
    []
  );

  const onSubmit = useCallback(
    async (values: UploadFormValues) => {
      setApiError(null);
      setAnalysisResult(null);

      const trimmedResumeText = values.resumeText.trim();
      const resumeTextContent = (trimmedResumeText || uploadedResumeText?.trim() || "").trim();

      if (!resumeTextContent) {
        setStatus("Paste your resume content so the AI can analyze and enhance it.");
        return;
      }

      const trimmedJobUrl = values.jobUrl.trim();
      const trimmedJobDescription = values.jobDescription.trim();

      if (mode === "url" && !trimmedJobUrl && !trimmedJobDescription) {
        setStatus("Add a job posting URL or paste the description so the AI has context.");
        return;
      }

      if (mode === "manual" && !trimmedJobDescription) {
        setStatus("Provide the job description details in manual mode.");
        return;
      }

      if (!privacyAcknowledged) {
        setApiError("Please review and acknowledge the privacy notice before submitting.");
        return;
      }

      setIsSubmitting(true);
      setStatus("Analyzing resume with AI…");
      setViewMode("optimized");

      const computedTargetRole = targetRole || guessTargetRole(trimmedJobDescription);
      setOriginalResume(resumeTextContent);

      try {
        const response = await analyzeResume({
          resumeText: resumeTextContent,
          jobDescription: trimmedJobDescription || undefined,
          jobUrl: mode === "url" && trimmedJobUrl ? trimmedJobUrl : undefined,
          options: {
            includeCoverLetter,
            includeLinkedIn,
            includeMetrics,
            tone,
            targetRole: computedTargetRole
          },
          sessionToken
        });

        setAnalysisResult(response.result);
        setStatus(
          isProUser && isLoggedIn
            ? "Analysis complete. Preview your AI-enhanced resume below."
            : "Analysis complete. Preview your AI-enhanced resume below and download instantly. Create an account later to save versions."
        );
        setSessionToken(response.sessionToken);

        if (shouldDeleteAfter && response.sessionToken) {
          await deleteAnalyzerSession(response.sessionToken);
          setSessionToken(undefined);
          setStatus((previous) => `${previous ?? "Analysis complete."} We removed your files from our servers.`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error analyzing resume.";
        setApiError(message);
        setStatus("Analysis failed. Please review your inputs and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      uploadedResumeText,
      mode,
      privacyAcknowledged,
      includeCoverLetter,
      includeLinkedIn,
      includeMetrics,
      tone,
      targetRole,
      guessTargetRole,
      isProUser,
      isLoggedIn,
      sessionToken,
      shouldDeleteAfter
    ]
  );

  const handleDataDeletion = useCallback(async () => {
    if (!sessionToken) {
      setStatus("No active session data to delete.");
      return;
    }
    try {
      await deleteAnalyzerSession(sessionToken);
      setSessionToken(undefined);
      setStatus("We removed your session data from our servers.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete session data right now.";
      setApiError(message);
    }
  }, [sessionToken]);

  return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-neutral-lightest/80 bg-gradient-to-br from-neutral-white via-neutral-white/30 to-neutral-white p-6 sm:rounded-[2rem] sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <ResumeInputPanel
            register={register}
            resumeFileName={resumeFileName}
            onFileChange={handleFileChange}
            onClearUpload={handleClearResume}
            sampleResumes={sampleResumes}
            onLoadDemo={handleResumeSample}
          />
          <JobContextPanel
            mode={mode}
            onModeChange={setMode}
            register={register}
            setValue={setValue}
            onLoadDemo={handleLoadDemo}
            demoPayloads={demoPayloads}
          />
        </div>

        <AnalyzerOptionsPanel
          includeCoverLetter={includeCoverLetter}
          includeLinkedIn={includeLinkedIn}
          includeMetrics={includeMetrics}
          tone={tone}
          targetRole={targetRole}
          onToggleCoverLetter={() => setIncludeCoverLetter((value) => !value)}
          onToggleLinkedIn={() => setIncludeLinkedIn((value) => !value)}
          onToggleMetrics={() => setIncludeMetrics((value) => !value)}
          onToneChange={setTone}
          onTargetRoleChange={setTargetRole}
        />

         <div className="rounded-b-xl border border-emerald-200/60 bg-emerald-50/50 p-5 sm:rounded-b-2xl sm:p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md sm:h-10 sm:w-10 sm:rounded-xl">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <strong className="text-base font-bold text-neutral sm:text-lg">Privacy & Security</strong>
              </div>
              <p className="text-xs leading-relaxed text-neutral-light sm:text-sm">
                We process your resume and job description through our secure API proxy. Files are encrypted in transit and purged after
                analysis when you toggle auto-deletion. We never share your content with third parties.
              </p>
              <label className="flex items-start gap-2.5 rounded-xl border-2 border-secondary-muted bg-neutral-white p-3 text-xs text-neutral-light shadow-sm transition hover:border-secondary hover:bg-secondary-muted/30 sm:gap-3 sm:rounded-2xl sm:p-4 sm:text-sm">
                <input
                  type="checkbox"
                  checked={privacyAcknowledged}
                  onChange={(event) => setPrivacyAcknowledged(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-secondary text-secondary-dark focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:h-5 sm:w-5"
                />
                <span className="font-medium">I understand the privacy policy and consent to processing for this analysis.</span>
              </label>
            </div>
            <div className="flex flex-row items-center gap-3 md:flex-col md:items-end md:gap-4">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-neutral-lightest bg-neutral-white px-4 py-3 shadow-sm transition hover:border-primary hover:shadow-md sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 md:flex-col md:items-end">
                <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-light sm:text-xs">Auto-delete after run</span>
                <input
                  type="checkbox"
                  checked={shouldDeleteAfter}
                  onChange={(event) => setShouldDeleteAfter(event.target.checked)}
                  className="h-4 w-4 rounded border-neutral-lighter text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:h-5 sm:w-5"
                />
              </label>
              <button
                type="button"
                onClick={handleDataDeletion}
                className="whitespace-nowrap rounded-full border-2 border-error-muted bg-neutral-white px-4 py-2 text-[10px] font-bold text-error shadow-sm transition-all hover:border-error hover:bg-error-muted hover:shadow-md sm:px-5 sm:py-2.5 sm:text-xs md:w-full"
              >
                Delete session data now
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 sm:gap-6 pb-4 sm:pb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent-light px-6 py-3 text-sm font-semibold text-neutral-white shadow-lg animate-pulse transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/30 hover:animate-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:animate-none disabled:hover:scale-100 sm:px-10 sm:py-4 sm:text-lg"
          >
            {/* Subtle animated border */}
            <span className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] animate-gradient-shift opacity-75 -z-10" />
            
            {/* Clean shimmer on hover */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            
            {/* Content */}
            <span className="relative flex items-center gap-3">
              {isSubmitting ? (
                <>
                  <span className="inline-flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-6 sm:w-6" />
                  </span>
                  <span>Analyzing Resume…</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Analyze Resume</span>
                </>
              )}
            </span>
          </button>
          {isSubmitting ? (
            <div className="w-full animate-fade-in-up rounded-3xl border-2 border-primary bg-gradient-to-br from-primary-muted via-neutral-white to-secondary-muted p-6 text-left shadow-2xl animate-glow sm:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between sm:gap-6">
              <div className="flex items-center gap-4">
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg animate-float">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-secondary-light opacity-75 animate-ping" />
                  <span className="relative h-7 w-7 animate-spin rounded-full border-3 border-neutral-white border-t-transparent" />
                </span>
                <div className="animate-slide-in-left">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary animate-pulse-slow">
                    AI is working<span className="inline-block animate-bounce-slow">...</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-light">
                    Comparing your resume to the job description, scoring keyword coverage, and crafting enhancements.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Keyword alignment", "Achievement emphasis", "ATS formatting"].map((item, index) => (
                  <span
                    key={item}
                    className="rounded-full border-2 border-primary bg-neutral-white px-4 py-1.5 text-xs font-bold text-primary shadow-md animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
              <div className="mt-6 grid gap-4 text-sm text-neutral-light md:grid-cols-3 sm:mt-8">
              {[
                {
                  title: "Skill highlighting",
                  body: "Surfacing core competencies the posting emphasises so they stand out.",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                },
                {
                  title: "Experience tuning",
                  body: "Restructuring accomplishments to showcase quantifiable impact.",
                  icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                },
                {
                  title: "ATS calibration",
                  body: "Formatting sections and keywords for applicant tracking systems.",
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                }
              ].map((item, index) => (
                <div 
                  key={item.title} 
                  className="group rounded-2xl border-2 border-neutral-lightest bg-neutral-white p-4 shadow-md transition-all hover:border-primary hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + index * 0.15}s`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ animationDelay: `${0.8 + index * 0.15}s` }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <p className="text-sm font-bold text-neutral">{item.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-light">{item.body}</p>
                </div>
                ))}
              </div>
            </div>
          ) : null}
          {status ? (
            <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-primary-muted bg-primary-muted p-4 text-center shadow-md">
              <svg className="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium leading-relaxed text-primary-dark">{status}</p>
            </div>
          ) : null}
          {apiError ? (
            <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-error-muted bg-error-muted p-4 text-center shadow-md">
              <svg className="h-5 w-5 flex-shrink-0 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium leading-relaxed text-error-dark">{apiError}</p>
            </div>
          ) : null}
        </div>
      </form>
      </div>

      {analysisResult ? (
        <div className="mt-6 sm:mt-8">
          <AnalysisResultPanel
            result={analysisResult}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onDownloadPdf={handleDownloadPdf}
            onDownloadDoc={handleDownloadDoc}
            onOpenPreview={() => setIsPreviewOpen(true)}
            originalResume={originalResume || resumeTextValue}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            isProUser={isProUser}
            isLoggedIn={isLoggedIn}
          />
        </div>
      ) : null}

      {isPreviewOpen && analysisResult?.optimizedResume ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/70 p-2 backdrop-blur-sm sm:p-4">
          <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-neutral-white shadow-2xl sm:h-[90vh] sm:rounded-4xl">
            <div className="flex items-center justify-between border-b border-neutral-lightest px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">Optimized Resume</p>
                <h4 className="truncate text-base font-semibold text-neutral sm:text-lg">Full Preview</h4>
              </div>
              <button
                type="button"
                onClick={handleClosePreview}
                className="ml-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-lightest text-neutral-light transition hover:border-neutral-lighter hover:bg-neutral-white sm:h-10 sm:w-10"
              >
                <span className="sr-only">Close preview</span>
                <span className="text-lg sm:text-xl">×</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-neutral-white p-3 sm:p-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-lighter sm:text-xs">Templates</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(["modern", "classic", "accent"] as ResumeTemplateKey[]).map((key) => (
                      <button
                        key={`${key}-modal`}
                        type="button"
                        onClick={() => setSelectedTemplate(key)}
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold transition sm:px-3 sm:py-1.5 sm:text-xs ${
                          selectedTemplate === key
                            ? "bg-primary text-neutral-white shadow"
                            : "border border-neutral-lightest text-neutral-light hover:border-primary hover:text-primary"
                        }`}
                      >
                        {key === "modern" ? "Modern" : key === "classic" ? "Classic" : "Accent"}
                      </button>
                    ))}
                  </div>
                </div>
                <ResumePreview content={analysisResult.optimizedResume} template={selectedTemplate} />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-neutral-lightest px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-1.5 text-xs font-semibold text-neutral-white shadow transition hover:shadow-md sm:px-5 sm:py-2 sm:text-sm"
                title="Opens print dialog to save as PDF with full styling"
              >
                Save as PDF
              </button>
              <button
                type="button"
                onClick={handleDownloadDoc}
                className="rounded-full border border-neutral-lightest px-4 py-1.5 text-xs font-semibold text-neutral-light transition hover:border-primary hover:text-primary sm:px-5 sm:py-2 sm:text-sm"
              >
                Download DOC
              </button>
              <button
                type="button"
                onClick={handleClosePreview}
                className="rounded-full border border-neutral-lightest px-4 py-1.5 text-xs font-semibold text-neutral-light transition hover:border-primary hover:text-primary sm:px-5 sm:py-2 sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

