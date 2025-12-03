import { useId } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { UploadFormValues } from "./types";

interface ResumeInputPanelProps {
  register: UseFormRegister<UploadFormValues>;
  resumeFileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearUpload: () => void;
  sampleResumes?: { label: string; resume: string }[];
  onLoadDemo: (text: string) => void;
  disabled?: boolean;
}

export function ResumeInputPanel({
  register,
  resumeFileName,
  onFileChange,
  onClearUpload,
  sampleResumes = [],
  onLoadDemo,
  disabled = false
}: ResumeInputPanelProps) {
  const fileInputId = useId();

  return (
    <section className="rounded-t-xl border border-slate-200/50 bg-white/80 p-5 sm:rounded-t-2xl sm:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            Your Resume
          </span>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Upload or paste your resume content</h2>
          <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
            Supported formats: PDF, DOC, DOCX, TXT. You can always paste text for best parsing fidelity.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full border-2 border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md sm:px-4 sm:py-2 sm:text-xs"
          onClick={onClearUpload}
          disabled={disabled}
        >
          Clear
        </button>
      </div>

      <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-300 hover:bg-indigo-50/30 sm:mt-6 sm:rounded-2xl sm:p-6">
        <label
          htmlFor={fileInputId}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Choose File
        </label>
        <input
          id={fileInputId}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={onFileChange}
          disabled={disabled}
        />
        <p className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
          <svg className="h-3.5 w-3.5 shrink-0 text-slate-400 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate">{resumeFileName}</span>
          {resumeFileName !== "No file chosen" ? (
            <button
              type="button"
              className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 transition hover:bg-red-200 sm:px-2.5 sm:py-1 sm:text-xs"
              onClick={onClearUpload}
            >
              Reset
            </button>
          ) : null}
        </p>
      </div>

      <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-slate-200" />
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">Or paste text below</p>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <textarea
          {...register("resumeText")}
          rows={8}
          className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:rounded-2xl sm:p-4 sm:text-sm sm:leading-relaxed"
          placeholder="Paste your resume text here..."
          disabled={disabled}
        />
      </div>
    </section>
  );
}

