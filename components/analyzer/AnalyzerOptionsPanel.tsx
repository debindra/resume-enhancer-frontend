"use client";

interface AnalyzerOptionsPanelProps {
  includeCoverLetter: boolean;
  includeLinkedIn: boolean;
  includeMetrics: boolean;
  tone: string;
  targetRole: string;
  onToggleCoverLetter: () => void;
  onToggleLinkedIn: () => void;
  onToggleMetrics: () => void;
  onToneChange: (tone: string) => void;
  onTargetRoleChange: (role: string) => void;
  disabled?: boolean;
}

export function AnalyzerOptionsPanel({
  includeCoverLetter,
  includeLinkedIn,
  includeMetrics,
  tone,
  targetRole,
  onToggleCoverLetter,
  onToggleLinkedIn,
  onToggleMetrics,
  onToneChange,
  onTargetRoleChange,
  disabled = false
}: AnalyzerOptionsPanelProps) {
  return (
    <details className="group">
      <summary className="cursor-pointer py-2 text-sm font-medium text-neutral-600 hover:text-neutral [&::-webkit-details-marker]:hidden">
        Advanced Options
        <svg className="ml-2 inline h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="mt-4 space-y-4 border-t border-neutral-200 pt-3 sm:pt-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={onToggleMetrics}
            className={`rounded-lg border px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
              includeMetrics
                ? "border-primary bg-primary/5 text-primary"
                : "border-neutral-300 hover:border-primary/50"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${includeMetrics ? "bg-primary" : "bg-neutral-300"}`} />
              <p className="text-xs font-medium sm:text-sm">Metric enhancer</p>
            </div>
            <p className="mt-1 text-[10px] text-neutral-500 sm:text-xs">Keep or remove AI-suggested KPIs</p>
          </button>
          <button
            type="button"
            onClick={onToggleLinkedIn}
            className={`rounded-lg border px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
              includeLinkedIn
                ? "border-primary bg-primary/5 text-primary"
                : "border-neutral-300 hover:border-primary/50"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${includeLinkedIn ? "bg-primary" : "bg-neutral-300"}`} />
              <p className="text-xs font-medium sm:text-sm">LinkedIn summary</p>
            </div>
            <p className="mt-1 text-[10px] text-neutral-500 sm:text-xs">Generate a short bio</p>
          </button>
          <button
            type="button"
            onClick={onToggleCoverLetter}
            className={`rounded-lg border px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${
              includeCoverLetter
                ? "border-primary bg-primary/5 text-primary"
                : "border-neutral-300 hover:border-primary/50"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${includeCoverLetter ? "bg-primary" : "bg-neutral-300"}`} />
              <p className="text-xs font-medium sm:text-sm">Cover letter</p>
            </div>
            <p className="mt-1 text-[10px] text-neutral-500 sm:text-xs">Add a tailored letter</p>
          </button>
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-xs text-neutral-600 sm:text-sm">Tone:</label>
          <select
            value={tone}
            onChange={(e) => onToneChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm focus:border-primary focus:outline-none sm:w-auto sm:px-3"
            disabled={disabled}
          >
            {["Professional", "Executive", "Dynamic", "Conversational"].map((option) => (
              <option key={option} value={option.toLowerCase()}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </details>
  );
}

