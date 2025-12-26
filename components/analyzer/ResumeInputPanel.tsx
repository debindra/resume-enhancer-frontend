"use client";

import { useId, useState } from "react";
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
  resumeTextValue?: string;
}

export function ResumeInputPanel({
  register,
  resumeFileName,
  onFileChange,
  onClearUpload,
  sampleResumes = [],
  onLoadDemo,
  disabled = false,
  resumeTextValue = ""
}: ResumeInputPanelProps) {
  const fileInputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="flex h-full flex-col space-y-3 sm:space-y-4 rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <div>
        <h3 className="text-sm font-semibold text-neutral sm:text-base">Your Resume</h3>
      </div>

      <div 
        className={`rounded-lg border-2 border-dashed p-4 transition-colors sm:p-6 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-neutral-300 hover:border-primary/50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          const file = e.dataTransfer.files[0];
          if (file) {
            onFileChange({ target: { files: [file] } } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      >
        <label htmlFor={fileInputId} className="flex cursor-pointer flex-col items-center gap-1.5 sm:gap-2">
          <svg className="h-8 w-8 text-neutral-400 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-xs text-primary sm:text-sm">Click to upload</span>
          <span className="text-[10px] text-neutral-400 sm:text-xs">or drag and drop</span>
        </label>
        <input
          id={fileInputId}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={onFileChange}
          disabled={disabled}
        />
        {resumeFileName !== "No file chosen" && (
          <p className="mt-2 text-center text-[10px] text-neutral-500 sm:mt-3 sm:text-xs">{resumeFileName}</p>
        )}
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="mb-1.5 text-[10px] text-neutral-500 sm:mb-2 sm:text-xs">Or paste text</div>
        <textarea
          {...register("resumeText")}
          rows={8}
          className={`flex-1 w-full min-h-[200px] rounded-lg border p-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-0 sm:p-3 ${
            resumeTextValue?.trim() ? 'border-primary/50' : 'border-neutral-300'
          }`}
          placeholder="Paste your resume content here..."
          disabled={disabled}
        />
      </div>
    </section>
  );
}

