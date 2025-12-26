"use client";

import { useEffect } from "react";
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
  jobDescriptionValue?: string;
  roleValue?: string;
}

export function JobContextPanel({
  mode,
  onModeChange,
  register,
  setValue,
  disabled = false,
  onLoadDemo,
  demoPayloads,
  jobDescriptionValue = "",
  roleValue = ""
}: JobContextPanelProps) {
  // Force mode to "manual" if it's set to "url" (URL tab is disabled)
  useEffect(() => {
    if (mode === "url") {
      onModeChange("manual");
    }
  }, [mode, onModeChange]);
  return (
    <section className="flex h-full flex-col space-y-3 sm:space-y-4 rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <div>
        <h3 className="text-sm font-semibold text-neutral sm:text-base">Job Details</h3>
      </div>

      {/* URL tab disabled for now - only manual input is available */}
      {/* <div className="mt-4 flex gap-1.5 rounded-full bg-gradient-to-r from-neutral-lightest to-neutral-white p-1 text-xs font-bold shadow-inner sm:mt-6 sm:gap-2 sm:p-1.5 sm:text-sm">
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
      </div> */}

      {/* Always show manual input - URL mode disabled */}
      {false && mode === "url" ? null : (
        <div className="flex flex-1 flex-col space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="role" className="mb-1.5 block text-[10px] font-medium text-neutral-600 sm:text-xs">
              Target Role
            </label>
            <input
              id="role"
              {...register("role")}
              type="text"
              className={`w-full rounded-lg border px-2.5 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-3 ${
                roleValue?.trim() ? 'border-primary/50' : 'border-neutral-300'
              }`}
              placeholder="e.g., Software Engineer"
              disabled={disabled}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="jobDescription" className="mb-1.5 block text-[10px] font-medium text-neutral-600 sm:text-xs">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              {...register("jobDescription")}
              rows={8}
              className={`flex-1 w-full min-h-[200px] rounded-lg border p-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-0 sm:p-3 ${
                jobDescriptionValue?.trim() ? 'border-primary/50' : 'border-neutral-300'
              }`}
              placeholder="Paste the job description..."
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </section>
  );
}

