import SectionCard from "../components/SectionCard";

const candidates = [
  { id: "cand_001", name: "Avery Jordan", atsScore: 78, lastUpdated: "2h ago" },
  { id: "cand_002", name: "Morgan Lee", atsScore: 84, lastUpdated: "1d ago" }
];

export default function RecruiterDashboard() {
  return (
    <div className="space-y-6">
      <SectionCard title="Pipeline" description="Monitor candidate resume improvements and status.">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="pb-2">Candidate</th>
              <th className="pb-2">ATS Score</th>
              <th className="pb-2">Last Updated</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="py-3">{candidate.name}</td>
                <td className="py-3 font-semibold text-primary">{candidate.atsScore}</td>
                <td className="py-3 text-slate-500">{candidate.lastUpdated}</td>
                <td className="py-3 text-slate-600">
                  <button className="text-blue-600">View Resume</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Integrations" description="Manage ATS and job board connections.">
        <ul className="space-y-2 text-sm text-slate-600">
          <li>LinkedIn Recruiter — Not connected</li>
          <li>Greenhouse — Webhook pending verification</li>
          <li>Resume API — Docs available for partner platforms</li>
        </ul>
      </SectionCard>
    </div>
  );
}
