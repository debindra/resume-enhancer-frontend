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
    <section className="border border-neutral-lightest/50 bg-neutral-white/80 p-5 sm:p-6">
      <div className="space-y-1.5 sm:space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-dark sm:px-3 sm:py-1.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          AI Options
        </span>
        <h2 className="text-lg font-bold text-neutral sm:text-xl">Fine-tune the outputs</h2>
      </div>

      <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleMetrics}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeMetrics
                ? "border-primary bg-gradient-to-br from-primary-muted to-secondary-muted text-primary-dark shadow-lg"
                : "border-neutral-lightest bg-neutral-white text-neutral-light shadow-sm hover:border-primary hover:bg-primary-muted/50 hover:text-primary hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeMetrics ? "bg-primary" : "bg-neutral-lighter"}`} />
              <p className="text-xs font-bold sm:text-sm">Metric enhancer</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-neutral-lighter sm:mt-2 sm:text-xs">Keep or remove AI-suggested KPIs in your resume.</p>
          </button>
          <button
            type="button"
            onClick={onToggleLinkedIn}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeLinkedIn
                ? "border-primary bg-gradient-to-br from-primary-muted to-secondary-muted text-primary-dark shadow-lg"
                : "border-neutral-lightest bg-neutral-white text-neutral-light shadow-sm hover:border-primary hover:bg-primary-muted/50 hover:text-primary hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeLinkedIn ? "bg-primary" : "bg-neutral-lighter"}`} />
              <p className="text-xs font-bold sm:text-sm">LinkedIn summary</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-neutral-lighter sm:mt-2 sm:text-xs">Generate a short bio aligned to this application.</p>
          </button>
          <button
            type="button"
            onClick={onToggleCoverLetter}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeCoverLetter
                ? "border-primary bg-gradient-to-br from-primary-muted to-secondary-muted text-primary-dark shadow-lg"
                : "border-neutral-lightest bg-neutral-white text-neutral-light shadow-sm hover:border-primary hover:bg-primary-muted/50 hover:text-primary hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeCoverLetter ? "bg-primary" : "bg-neutral-lighter"}`} />
              <p className="text-xs font-bold sm:text-sm">Cover letter</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-neutral-lighter sm:mt-2 sm:text-xs">Add a tailored 250-word letter referencing the job.</p>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-lighter sm:text-xs">Tone:</span>
            <select
              value={tone}
              onChange={(event) => onToneChange(event.target.value)}
              className="appearance-none rounded-xl border-2 border-neutral-lightest bg-neutral-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:16px_16px] bg-[right_8px_center] bg-no-repeat px-3 py-2 text-xs font-medium text-neutral-light shadow-sm transition focus:border-primary focus:bg-neutral-white focus:outline-none focus:ring-2 focus:ring-primary-muted sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm sm:pr-10"
              disabled={disabled}
            >
              {["Professional", "Executive", "Dynamic", "Conversational"].map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

