import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { DemoPayload } from "./demoData";
import type { JobEntryMode, UploadFormValues } from "./types";

interface JobContextPanelProps {
  mode: JobEntryMode;
  onModeChange: (mode: JobEntryMode) => void;
  register: UseFormRegister<UploadFormValues>;
  setValue: UseFormSetValue<UploadFormValues>;
  disabled?: boolean;
  onLoadDemo: (payload: DemoPayload) => void;
  demoPayloads: DemoPayload[];
}

export function JobContextPanel({
  mode,
  onModeChange,
  register,
  setValue,
  disabled = false,
  onLoadDemo,
  demoPayloads
}: JobContextPanelProps) {
  return (
    <section className="rounded-t-xl border border-neutral-lightest/50 bg-neutral-white/80 p-5 sm:rounded-t-2xl sm:p-6">
      <div className="space-y-1.5 sm:space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:px-3 sm:py-1.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Job Details
        </span>
        <h2 className="text-lg font-bold text-neutral sm:text-xl">Provide job posting URL or description</h2>
        <p className="text-xs leading-relaxed text-neutral-light sm:text-sm">
          Set the context so the analyzer can tailor recommendations to the specific role.
        </p>
      </div>

      <div className="mt-4 flex gap-1.5 rounded-full bg-gradient-to-r from-neutral-lightest to-neutral-white p-1 text-xs font-bold shadow-inner sm:mt-6 sm:gap-2 sm:p-1.5 sm:text-sm">
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 text-xs transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${mode === "url" ? "bg-gradient-to-r from-primary to-primary-light text-neutral-white shadow-lg" : "text-neutral-lighter hover:bg-neutral-white/60 hover:text-neutral-light"}`}
          onClick={() => onModeChange("url")}
          disabled={disabled}
        >
          Job URL
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 text-xs transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${mode === "manual" ? "bg-gradient-to-r from-primary to-primary-light text-neutral-white shadow-lg" : "text-neutral-lighter hover:bg-neutral-white/60 hover:text-neutral-light"}`}
          onClick={() => onModeChange("manual")}
          disabled={disabled}
        >
          Manual
        </button>
      </div>

      {mode === "url" ? (
        <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
          <div className="space-y-2 sm:space-y-3">
            <label htmlFor="jobUrl" className="text-[10px] font-bold uppercase tracking-wide text-neutral-lighter sm:text-xs">
              Job Posting URL
            </label>
            <div className="flex items-center gap-2 rounded-xl border-2 border-neutral-lightest bg-neutral-white p-2 shadow-sm transition-all focus-within:border-primary focus-within:bg-neutral-white focus-within:ring-4 focus-within:ring-primary-muted sm:gap-3 sm:rounded-2xl sm:p-2.5">
              <span className="shrink-0 rounded-full bg-gradient-to-r from-primary to-primary-light px-2 py-1 text-[10px] font-bold text-neutral-white shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">Link</span>
              <input
                id="jobUrl"
                {...register("jobUrl")}
                type="url"
                className="min-w-0 flex-1 bg-transparent text-xs font-medium text-neutral-light placeholder:text-neutral-lighter focus:outline-none sm:text-sm"
                placeholder="https://www.linkedin.com/jobs/view/123456789"
                disabled={disabled}
              />
            </div>
            <p className="text-[10px] leading-relaxed text-neutral-lighter sm:text-xs">
              Paste the job description below if the posting requires login or has key responsibilities you'd like the AI to emphasise.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["LinkedIn", "Indeed", "Glassdoor"].map((provider) => (
              <button
                key={provider}
                type="button"
                className="rounded-full border-2 border-neutral-lightest bg-neutral-white px-3 py-1.5 text-[10px] font-bold text-neutral-light shadow-sm transition-all hover:border-primary hover:bg-primary-muted hover:text-primary hover:shadow-md sm:px-4 sm:py-2 sm:text-xs"
                onClick={() =>
                  setValue(
                    "jobUrl",
                    provider === "LinkedIn"
                      ? "https://www.linkedin.com/jobs/view/123456789"
                      : provider === "Indeed"
                      ? "https://www.indeed.com/viewjob?jk=123456789"
                      : "https://www.glassdoor.com/job-listing/123456789"
                  )
                }
                disabled={disabled}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
          <label htmlFor="jobDescription" className="text-[10px] font-bold uppercase tracking-wide text-neutral-lighter sm:text-xs">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            {...register("jobDescription")}
            rows={10}
            className="w-full rounded-xl border-2 border-neutral-lightest bg-neutral-white p-3 text-xs leading-relaxed text-neutral-light shadow-sm placeholder:text-neutral-lighter transition focus:border-primary focus:bg-neutral-white focus:outline-none focus:ring-4 focus:ring-primary-muted sm:rounded-2xl sm:p-4 sm:text-sm sm:leading-relaxed"
            placeholder="Paste the key responsibilities, skills, and qualifications for the target role."
            disabled={disabled}
          />
        </div>
      )}
    </section>
  );
}

