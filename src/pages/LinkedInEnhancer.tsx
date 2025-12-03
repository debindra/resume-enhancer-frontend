import SectionCard from "../components/SectionCard";

export default function LinkedInEnhancer() {
  return (
    <div className="space-y-6">
      <SectionCard title="Headline Suggestions" description="LLM-curated headlines tailored to the target role.">
        <ul className="space-y-2 text-sm text-slate-700">
          <li>Product Manager | Bridging Customer Insight & Data-Driven Execution</li>
          <li>Growth-Focused PM Driving Cross-Functional Alignment</li>
        </ul>
      </SectionCard>

      <SectionCard title="Summary Draft">
        <p className="whitespace-pre-wrap text-sm text-slate-700">
          {`Strategic product manager with 5+ years launching B2B workflows...\n• Increase keyword density for agile & experimentation\n• Add metric for roadmap throughput`}
        </p>
      </SectionCard>

      <SectionCard title="Experience Refresh">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Refined go-to-market launch plan resulting in 18% adoption increase.</li>
          <li>Implemented customer discovery loop that reduced churn by 9%. </li>
        </ul>
      </SectionCard>
    </div>
  );
}
