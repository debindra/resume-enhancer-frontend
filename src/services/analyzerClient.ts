import type { AnalysisResult } from "../components/analyzer/types";

export interface AnalyzeResumePayload {
  resumeText: string;
  jobDescription?: string;
  jobUrl?: string;
  options: {
    includeCoverLetter: boolean;
    includeLinkedIn: boolean;
    includeMetrics: boolean;
    tone: string;
    targetRole?: string;
  };
  sessionToken?: string;
}

export interface AnalyzeResumeResponse {
  result: AnalysisResult;
  sessionToken?: string;
}

const API_BASE = "/api/v1/analyzer";

export async function analyzeResume(payload: AnalyzeResumePayload): Promise<AnalyzeResumeResponse> {
  const response = await fetch(`${API_BASE}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unable to analyze resume.");
    throw new Error(errorText || "Unable to analyze resume.");
  }

  const raw = await response.json();

  const rawAtsScore = raw?.result?.atsScore ?? raw?.result?.ats_score ?? raw?.result?.ats;
  let normalizedAtsScore: number | undefined;
  if (typeof rawAtsScore === "number" && Number.isFinite(rawAtsScore)) {
    normalizedAtsScore = rawAtsScore;
  } else if (typeof rawAtsScore === "string") {
    const cleaned = rawAtsScore.trim().replace(/[^\d.-]/g, "");
    const parsed = Number.parseFloat(cleaned);
    if (Number.isFinite(parsed)) {
      normalizedAtsScore = parsed;
    }
  }

  const rawInsights = raw?.result?.insights;
  let normalizedInsights: string[] = [];
  if (Array.isArray(rawInsights)) {
    normalizedInsights = rawInsights.map((item) => String(item)).filter((item) => item.trim().length > 0);
  } else if (typeof rawInsights === "string" && rawInsights.trim().length > 0) {
    normalizedInsights = [rawInsights.trim()];
  } else if (rawInsights != null) {
    const coerced = String(rawInsights).trim();
    if (coerced) {
      normalizedInsights = [coerced];
    }
  }

  const rawJobMatchScore = raw?.result?.jobMatchScore ?? raw?.result?.job_match_score;
  let normalizedJobMatchScore: number | undefined;
  if (typeof rawJobMatchScore === "number" && Number.isFinite(rawJobMatchScore)) {
    normalizedJobMatchScore = rawJobMatchScore;
  } else if (typeof rawJobMatchScore === "string") {
    const cleaned = rawJobMatchScore.trim().replace(/[^\d.-]/g, "");
    const parsed = Number.parseFloat(cleaned);
    if (Number.isFinite(parsed)) {
      normalizedJobMatchScore = parsed;
    }
  }

  const normalizedResult: AnalysisResult = {
    optimizedResume: raw?.result?.optimizedResume ?? raw?.result?.optimized_resume ?? "",
    insights: normalizedInsights,
    atsScore: normalizedAtsScore,
    jobMatchScore: normalizedJobMatchScore,
    matchedKeywords: raw?.result?.matchedKeywords ?? raw?.result?.matched_keywords ?? [],
    missingKeywords: raw?.result?.missingKeywords ?? raw?.result?.missing_keywords ?? [],
    strengths: raw?.result?.strengths ?? [],
    improvements: raw?.result?.improvements ?? [],
    linkedinSummary: raw?.result?.linkedinSummary ?? raw?.result?.linkedin_summary ?? null,
    coverLetter: raw?.result?.coverLetter ?? raw?.result?.cover_letter ?? null
  };

  return {
    result: normalizedResult,
    sessionToken: raw?.sessionToken ?? raw?.session_token ?? undefined
  };
}

export interface ExtractedResumeResponse {
  text: string;
}

export async function extractResumeFile(file: File): Promise<ExtractedResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/extract`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unable to read the uploaded file.");
    throw new Error(errorText || "Unable to read the uploaded file.");
  }

  return response.json();
}

export async function deleteAnalyzerSession(sessionToken: string): Promise<void> {
  const response = await fetch(`${API_BASE}/session`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sessionToken })
  });

  if (!response.ok) {
    throw new Error("Unable to delete analyzer session.");
  }
}

