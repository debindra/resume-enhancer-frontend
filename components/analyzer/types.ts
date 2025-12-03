export interface UploadFormValues {
  resumeText: string;
  jobUrl: string;
  jobDescription: string;
}

export type JobEntryMode = "url" | "manual";

export interface AnalysisResult {
  optimizedResume: string;
  insights: string[];
  atsScore?: number;
  jobMatchScore?: number;
  matchedKeywords?: string[];
  missingKeywords?: string[];
  strengths?: string[];
  improvements?: string[];
  linkedinSummary?: string | null;
  coverLetter?: string | null;
}

