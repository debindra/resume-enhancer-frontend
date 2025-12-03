import { useState } from "react";
import SectionCard from "../components/SectionCard";
import SEO from "../components/SEO";

export default function Optimization() {
  const [insights] = useState<string[]>([
    "Highlight product roadmap ownership in summary.",
    "Incorporate metrics for conversion rate improvements.",
    "Add keywords: agile, roadmap, stakeholder alignment."
  ]);

  return (
    <>
      <SEO
        title="Resume Optimization & AI Improvements"
        description="Review AI-generated resume updates and actionable insights. See exactly what changed and why to improve your ATS score and interview chances."
        keywords="resume optimization, AI resume improvements, resume updates, ATS optimization, resume editing"
        url="/optimize"
      />
      <div className="space-y-6">
      <SectionCard title="Optimization Status" description="Review AI-generated resume updates and insights.">
        <p className="font-mono text-xs text-slate-500">Status: awaiting backend response (stub)</p>
        <div className="rounded-md border border-dashed border-slate-300 p-4 text-sm">
          Optimized resume content will be rendered here with change highlights.
        </div>
      </SectionCard>

      <SectionCard title="Actionable Insights" description="Track the AI's recommendations to improve your resume.">
        <ul className="list-disc space-y-2 pl-6 text-sm">
          {insights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionCard>
    </div>
    </>
  );
}
