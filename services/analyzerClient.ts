import type { AnalysisResult } from "@/components/analyzer/types";

interface ErrorResponse {
  error?: {
    message?: string;
    code?: string;
    request_id?: string;
  };
  detail?: string;
  [key: string]: unknown;
}

interface ExtendedError extends Error {
  status?: number;
  statusText?: string;
  details?: ErrorResponse | null;
}

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

export async function analyzeResume(
  payload: AnalyzeResumePayload,
  accessToken?: string
): Promise<AnalyzeResumeResponse> {
  const url = `${API_BASE}/run`;
  console.log("[Analyzer] Starting resume analysis request", { url, payloadSize: JSON.stringify(payload).length });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
  } catch (networkError) {
    console.error("[Analyzer] Network error during fetch:", {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError)
    });
    throw new Error("Network error: Unable to connect to the server. Please check your internet connection.");
  }

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = "Unable to analyze resume.";
    let errorDetails: ErrorResponse | null = null;
    
    try {
      const errorText = await response.text();
      const logData: Record<string, unknown> = {
        status,
        statusText,
        url,
        responseBody: errorText || "(empty)",
        responseBodyLength: errorText?.length || 0,
        headers: Object.fromEntries(response.headers.entries())
      };
      console.error("[Analyzer] API error response:", logData);
      
      if (errorText && errorText.trim().length > 0) {
        // Try to parse as JSON first
        try {
          const errorJson = JSON.parse(errorText);
          errorDetails = errorJson;
          console.error("[Analyzer] Parsed error JSON:", errorJson);
          
          // Handle backend error format: { error: { message: "...", code: "...", request_id: "..." } }
          if (errorJson?.error?.message) {
            errorMessage = errorJson.error.message;
          } else if (errorJson?.detail) {
            // Handle FastAPI validation error format: { detail: "..." }
            errorMessage = errorJson.detail;
          } else if (typeof errorJson === "string") {
            errorMessage = errorJson;
          } else if (typeof errorJson === "object" && Object.keys(errorJson).length > 0) {
            // If it's an object but doesn't match expected format, try to extract a message
            const message = errorJson.message || errorJson.error || JSON.stringify(errorJson);
            errorMessage = typeof message === "string" ? message : errorText;
          } else {
            errorMessage = errorText;
          }
        } catch (parseError) {
          // If not JSON, use the text as-is
          console.error("[Analyzer] Failed to parse error response as JSON:", parseError);
          errorMessage = errorText || `Server returned ${status} ${statusText}`;
        }
      } else {
        // Empty response body - provide a meaningful error based on status code
        console.warn("[Analyzer] Empty error response body");
        if (status === 422) {
          errorMessage = "Invalid input data. Please check your resume text and try again.";
        } else if (status === 429) {
          errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = `Unable to analyze resume. Server returned ${status} ${statusText}.`;
        }
      }
    } catch (readError) {
      // If we can't read the response, use default message
      console.error("[Analyzer] Failed to read error response:", {
        error: readError,
        status,
        statusText,
        url
      });
      errorMessage = `Unable to analyze resume. Server returned ${status} ${statusText}. Please check your connection and try again.`;
    }
    
    const fullError = new Error(errorMessage) as ExtendedError;
    fullError.status = status;
    fullError.statusText = statusText;
    fullError.details = errorDetails;
    throw fullError;
  }

  interface RawResponse {
    result?: {
      optimizedResume?: string;
      optimized_resume?: string;
      atsScore?: number | string;
      ats_score?: number | string;
      ats?: number | string;
      insights?: string[] | string | unknown;
      jobMatchScore?: number | string;
      job_match_score?: number | string;
      strengths?: string[];
      improvements?: string[];
      linkedinSummary?: string | null;
      linkedin_summary?: string | null;
      coverLetter?: string | null;
      cover_letter?: string | null;
      [key: string]: unknown;
    };
    session_token?: string;
    sessionToken?: string;
  }

  let raw: RawResponse;
  try {
    raw = await response.json() as RawResponse;
    console.log("[Analyzer] Successfully received response", {
      hasResult: !!raw?.result,
      hasSessionToken: !!raw?.session_token || !!raw?.sessionToken
    });
  } catch (jsonError) {
    console.error("[Analyzer] Failed to parse response as JSON:", {
      error: jsonError,
      status: response.status,
      statusText: response.statusText
    });
    throw new Error("Invalid response format from server. Please try again.");
  }

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
    optimizedResume: (raw?.result?.optimizedResume ?? raw?.result?.optimized_resume ?? "") as string,
    insights: normalizedInsights,
    atsScore: normalizedAtsScore,
    jobMatchScore: normalizedJobMatchScore,
    strengths: (raw?.result?.strengths ?? []) as string[],
    improvements: (raw?.result?.improvements ?? []) as string[],
    linkedinSummary: (raw?.result?.linkedinSummary ?? raw?.result?.linkedin_summary ?? null) as string | null | undefined,
    coverLetter: (raw?.result?.coverLetter ?? raw?.result?.cover_letter ?? null) as string | null | undefined
  };

  return {
    result: normalizedResult,
    sessionToken: raw?.sessionToken ?? raw?.session_token ?? undefined
  };
}

export interface ExtractedResumeResponse {
  text: string;
}

export interface SaveOptimizationPayload {
  resume_name: string;
  job_title: string;
  ats_score: number;
  original_resume_text?: string;
  optimized_resume_text?: string;
  job_description?: string;
  insights?: string[];
}

export interface SaveOptimizationResponse {
  id: string;
  message: string;
}

export interface CreditBalance {
  remaining: number;
  tier: string;
  total: number;
}

export async function consumeOptimizationCredit(
  accessToken?: string
): Promise<CreditBalance> {
  const url = '/api/billing/balance';
  console.log('[Analyzer] Consuming optimization credit', { url });

  let response: Response;
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ event: 'optimization' }),
    });
  } catch (networkError) {
    console.error('[Analyzer] Network error during credit consume:', {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError),
    });
    throw new Error('Network error: Unable to consume credit');
  }

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = 'Unable to use credit.';

    try {
      const errorText = await response.text();
      if (errorText) {
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson?.error) {
            errorMessage =
              typeof errorJson.error === 'string'
                ? errorJson.error
                : errorJson.error.message || 'Unknown error';
          } else if (errorJson?.message) {
            errorMessage = errorJson.message;
          } else {
            errorMessage = errorText;
          }
        } catch {
          errorMessage = errorText || `Server returned ${status} ${statusText}`;
        }
      } else {
        errorMessage = `Server returned ${status} ${statusText}`;
      }
    } catch (readError) {
      console.error('[Analyzer] Failed to read credit error response:', {
        error: readError,
        status,
        statusText,
        url,
      });
      errorMessage = `Unable to use credit. Server returned ${status} ${statusText}.`;
    }

    const error = new Error(errorMessage) as Error & { status?: number; statusText?: string };
    error.status = status;
    error.statusText = statusText;
    throw error;
  }

  try {
    return await response.json();
  } catch (parseError) {
    console.error('[Analyzer] Failed to parse credit response as JSON:', {
      error: parseError,
      url,
      status: response.status,
    });
    throw new Error('Invalid credit response format from server');
  }
}

export async function saveOptimization(
  payload: SaveOptimizationPayload,
  accessToken?: string
): Promise<SaveOptimizationResponse> {
  const url = '/api/optimizations';
  console.log('[Analyzer] Saving optimization', {
    url,
    resumeName: payload.resume_name,
    jobTitle: payload.job_title,
    atsScore: payload.ats_score
  });

  let response: Response;
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include', // Ensure cookies are sent
      body: JSON.stringify(payload)
    });
  } catch (networkError) {
    console.error('[Analyzer] Network error during save:', {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError)
    });
    throw new Error('Network error: Unable to save optimization');
  }

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = 'Unable to save optimization.';

    try {
      const errorText = await response.text();
      if (errorText) {
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson?.error) {
            errorMessage = typeof errorJson.error === 'string' ? errorJson.error : errorJson.error.message || 'Unknown error';
          } else if (errorJson?.message) {
            errorMessage = errorJson.message;
          } else {
            errorMessage = errorText;
          }
        } catch {
          errorMessage = errorText || `Server returned ${status} ${statusText}`;
        }
      } else {
        errorMessage = `Server returned ${status} ${statusText}`;
      }
    } catch (readError) {
      console.error('[Analyzer] Failed to read error response:', {
        error: readError,
        status,
        statusText,
        url
      });
      errorMessage = `Unable to save optimization. Server returned ${status} ${statusText}.`;
    }

    const error = new Error(errorMessage) as Error & { status?: number; statusText?: string };
    error.status = status;
    error.statusText = statusText;
    throw error;
  }

  try {
    return await response.json();
  } catch (parseError) {
    console.error('[Analyzer] Failed to parse response as JSON:', {
      error: parseError,
      url,
      status: response.status
    });
    throw new Error('Invalid response format from server');
  }
}

export async function extractResumeFile(file: File): Promise<ExtractedResumeResponse> {
  const url = `${API_BASE}/extract`;
  console.log("[Analyzer] Extracting resume file", {
    url,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  });
  
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      body: formData
    });
  } catch (networkError) {
    console.error("[Analyzer] Network error during file extraction:", {
      error: networkError,
      url,
      fileName: file.name,
      message: networkError instanceof Error ? networkError.message : String(networkError)
    });
    throw new Error("Network error: Unable to connect to the server. Please check your internet connection.");
  }

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = "Unable to read the uploaded file.";
    let errorDetails: ErrorResponse | null = null;
    
    try {
      const errorText = await response.text();
      console.error("[Analyzer] File extraction error response:", {
        status,
        statusText,
        url,
        fileName: file.name,
        responseBody: errorText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (errorText) {
        // Try to parse as JSON first
        try {
          const errorJson = JSON.parse(errorText);
          errorDetails = errorJson;
          console.error("[Analyzer] Parsed error JSON:", errorJson);
          
          if (errorJson?.error?.message) {
            errorMessage = errorJson.error.message;
          } else if (errorJson?.detail) {
            errorMessage = errorJson.detail;
          } else if (typeof errorJson === "string") {
            errorMessage = errorJson;
          } else {
            errorMessage = errorText;
          }
        } catch (parseError) {
          console.error("[Analyzer] Failed to parse error response as JSON:", parseError);
          errorMessage = errorText;
        }
      }
    } catch (readError) {
      console.error("[Analyzer] Failed to read error response:", {
        error: readError,
        status,
        statusText,
        url,
        fileName: file.name
      });
      errorMessage = `Unable to read the uploaded file. Server returned ${status} ${statusText}. Please check the file format and try again.`;
    }
    
    const fullError = new Error(errorMessage) as ExtendedError;
    fullError.status = status;
    fullError.statusText = statusText;
    fullError.details = errorDetails;
    throw fullError;
  }

  try {
    const result = await response.json();
    console.log("[Analyzer] Successfully extracted resume file", {
      fileName: file.name,
      extractedTextLength: result?.text?.length || 0
    });
    return result;
  } catch (jsonError) {
    console.error("[Analyzer] Failed to parse extraction response as JSON:", {
      error: jsonError,
      status: response.status,
      statusText: response.statusText,
      fileName: file.name
    });
    throw new Error("Invalid response format from server. Please try again.");
  }
}

export async function deleteAnalyzerSession(sessionToken: string): Promise<void> {
  const url = `${API_BASE}/session`;
  console.log("[Analyzer] Deleting analyzer session", { url, sessionToken: sessionToken.substring(0, 8) + "..." });
  
  let response: Response;
  try {
    response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sessionToken })
    });
  } catch (networkError) {
    console.error("[Analyzer] Network error during session deletion:", {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError)
    });
    throw new Error("Network error: Unable to connect to the server.");
  }

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = "Unable to delete analyzer session.";
    
    try {
      const errorText = await response.text();
      console.error("[Analyzer] Session deletion error response:", {
        status,
        statusText,
        url,
        responseBody: errorText
      });
      
      if (errorText) {
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson?.error?.message) {
            errorMessage = errorJson.error.message;
          } else if (errorJson?.detail) {
            errorMessage = errorJson.detail;
          }
        } catch {
          // Not JSON, use text as-is
        }
      }
    } catch (readError) {
      console.error("[Analyzer] Failed to read error response:", {
        error: readError,
        status,
        statusText,
        url
      });
    }
    
    throw new Error(errorMessage);
  }
  
  console.log("[Analyzer] Successfully deleted analyzer session");
}

