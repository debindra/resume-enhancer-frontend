import AnalyzerForm from "../components/AnalyzerForm";

interface UploadResumeProps {
  isProUser?: boolean;
  isLoggedIn?: boolean;
}

export default function UploadResume({ isProUser = false, isLoggedIn = false }: UploadResumeProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-400">Analyzer</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">AI Resume Analyzer</h1>
        <p className="mt-2 text-sm text-slate-500">
          Upload your resume and the job context to unlock tailored recommendations and ATS-ready insights.
        </p>
      </div>
      <AnalyzerForm isProUser={isProUser} isLoggedIn={isLoggedIn} />
    </div>
  );
}
