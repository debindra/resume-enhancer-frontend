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
    <section className="border border-slate-200/50 bg-white/80 p-5 sm:p-6">
      <div className="space-y-1.5 sm:space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-600 sm:px-3 sm:py-1.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          AI Options
        </span>
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Fine-tune the outputs</h2>
        <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
          Choose the collateral you need for this application, adjust tone, and tell the AI what role you are targeting.
        </p>
      </div>

      <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleMetrics}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeMetrics
                ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 shadow-lg"
                : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeMetrics ? "bg-indigo-600" : "bg-slate-300"}`} />
              <p className="text-xs font-bold sm:text-sm">Metric enhancer</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-xs">Keep or remove AI-suggested KPIs in your resume.</p>
          </button>
          <button
            type="button"
            onClick={onToggleLinkedIn}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeLinkedIn
                ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 shadow-lg"
                : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeLinkedIn ? "bg-indigo-600" : "bg-slate-300"}`} />
              <p className="text-xs font-bold sm:text-sm">LinkedIn summary</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-xs">Generate a short bio aligned to this application.</p>
          </button>
          <button
            type="button"
            onClick={onToggleCoverLetter}
            className={`group rounded-xl border-2 px-4 py-3 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4 ${
              includeCoverLetter
                ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 shadow-lg"
                : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:shadow-md"
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${includeCoverLetter ? "bg-indigo-600" : "bg-slate-300"}`} />
              <p className="text-xs font-bold sm:text-sm">Cover letter</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-xs">Add a tailored 250-word letter referencing the job.</p>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Tone</span>
            <select
              value={tone}
              onChange={(event) => onToneChange(event.target.value)}
              className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              disabled={disabled}
            >
              {["Professional", "Executive", "Dynamic", "Conversational"].map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Target Role</span>
            <input
              type="text"
              value={targetRole}
              onChange={(event) => onTargetRoleChange(event.target.value)}
              placeholder="e.g. Senior Product Manager"
              className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              disabled={disabled}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

