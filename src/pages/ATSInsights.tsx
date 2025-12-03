import SectionCard from "../components/SectionCard";

export default function ATSInsights() {
  const matchedKeywords = ["roadmap", "stakeholder", "cross-functional"];
  const missingKeywords = ["agile", "OKRs"];
  const formattingFlags = ["Ensure consistent bullet punctuation", "Export to PDF for ATS formatting"];

  return (
    <div className="space-y-6">
      <SectionCard title="ATS Score" description="Understand how applicant tracking systems view your resume.">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary">62</span>
          <span className="text-sm text-slate-500">/ 100 (prototype)</span>
        </div>
        <p className="text-sm text-slate-600">
          Increase the score by incorporating missing keywords and following formatting suggestions.
        </p>
      </SectionCard>

      <SectionCard title="Keyword Analysis">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">Matched</h3>
            <ul className="space-y-1 text-sm text-slate-600">
              {matchedKeywords.map((k) => (
                <li key={k}>• {k}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">Missing</h3>
            <ul className="space-y-1 text-sm text-slate-600">
              {missingKeywords.map((k) => (
                <li key={k}>• {k}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Formatting Flags">
        <ul className="space-y-1 text-sm text-slate-600">
          {formattingFlags.map((flag) => (
            <li key={flag}>• {flag}</li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
