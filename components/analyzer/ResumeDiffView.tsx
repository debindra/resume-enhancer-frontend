"use client";

import { useMemo } from "react";

interface DiffLine {
  type: "unchanged" | "added" | "removed" | "modified";
  originalLine?: string;
  optimizedLine?: string;
  originalLineNumber?: number;
  optimizedLineNumber?: number;
}

interface ResumeDiffViewProps {
  original: string;
  optimized: string;
}

// Word-level diff highlighting
function highlightWordDiff(original: string, optimized: string): {
  original: JSX.Element;
  optimized: JSX.Element;
} {
  const originalWords = original.split(/(\s+)/);
  const optimizedWords = optimized.split(/(\s+)/);
  
  // Simple word-by-word comparison
  const originalElements: JSX.Element[] = [];
  const optimizedElements: JSX.Element[] = [];
  
  let origIdx = 0;
  let optIdx = 0;
  
  while (origIdx < originalWords.length || optIdx < optimizedWords.length) {
    const origWord = origIdx < originalWords.length ? originalWords[origIdx] : null;
    const optWord = optIdx < optimizedWords.length ? optimizedWords[optIdx] : null;
    
    if (origWord === optWord && origWord !== null && optWord !== null) {
      // Words match
      originalElements.push(<span key={`orig-${origIdx}`}>{origWord}</span>);
      optimizedElements.push(<span key={`opt-${optIdx}`}>{optWord}</span>);
      origIdx++;
      optIdx++;
    } else {
      // Words differ - highlight them
      if (origWord !== null) {
        originalElements.push(
          <span key={`orig-${origIdx}`} className="bg-red-200 text-red-900 font-semibold rounded px-0.5">
            {origWord}
          </span>
        );
        origIdx++;
      }
      if (optWord !== null) {
        optimizedElements.push(
          <span key={`opt-${optIdx}`} className="bg-green-200 text-green-900 font-semibold rounded px-0.5">
            {optWord}
          </span>
        );
        optIdx++;
      }
    }
  }
  
  return {
    original: <>{originalElements}</>,
    optimized: <>{optimizedElements}</>,
  };
}

// Simple line-by-line diff algorithm
function computeDiff(original: string, optimized: string): DiffLine[] {
  const originalLines = original.split("\n");
  const optimizedLines = optimized.split("\n");
  
  const diff: DiffLine[] = [];
  let originalIndex = 0;
  let optimizedIndex = 0;
  let originalLineNum = 1;
  let optimizedLineNum = 1;

  while (originalIndex < originalLines.length || optimizedIndex < optimizedLines.length) {
    const originalLine = originalIndex < originalLines.length ? originalLines[originalIndex] : undefined;
    const optimizedLine = optimizedIndex < optimizedLines.length ? optimizedLines[optimizedIndex] : undefined;

    if (originalLine === undefined) {
      // Only optimized has content (added)
      diff.push({
        type: "added",
        optimizedLine,
        optimizedLineNumber: optimizedLineNum++,
      });
      optimizedIndex++;
    } else if (optimizedLine === undefined) {
      // Only original has content (removed)
      diff.push({
        type: "removed",
        originalLine,
        originalLineNumber: originalLineNum++,
      });
      originalIndex++;
    } else if (originalLine === optimizedLine) {
      // Lines are identical (unchanged)
      diff.push({
        type: "unchanged",
        originalLine,
        optimizedLine,
        originalLineNumber: originalLineNum++,
        optimizedLineNumber: optimizedLineNum++,
      });
      originalIndex++;
      optimizedIndex++;
    } else {
      // Lines are different - check if it's a modification or separate add/remove
      // Look ahead to see if we can find a match
      const nextOriginalMatch = optimizedLines.slice(optimizedIndex + 1).indexOf(originalLine);
      const nextOptimizedMatch = originalLines.slice(originalIndex + 1).indexOf(optimizedLine);

      if (nextOriginalMatch === -1 && nextOptimizedMatch === -1) {
        // No match found - treat as modified
        diff.push({
          type: "modified",
          originalLine,
          optimizedLine,
          originalLineNumber: originalLineNum++,
          optimizedLineNumber: optimizedLineNum++,
        });
        originalIndex++;
        optimizedIndex++;
      } else if (nextOriginalMatch !== -1 && (nextOptimizedMatch === -1 || nextOriginalMatch < nextOptimizedMatch)) {
        // Optimized line was added
        diff.push({
          type: "added",
          optimizedLine,
          optimizedLineNumber: optimizedLineNum++,
        });
        optimizedIndex++;
      } else {
        // Original line was removed
        diff.push({
          type: "removed",
          originalLine,
          originalLineNumber: originalLineNum++,
        });
        originalIndex++;
      }
    }
  }

  return diff;
}

export function ResumeDiffView({ original, optimized }: ResumeDiffViewProps) {
  const diff = useMemo(() => computeDiff(original, optimized), [original, optimized]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-lightest bg-neutral-white sm:rounded-2xl">
      {/* Header */}
      <div className="sticky top-0 z-10 grid grid-cols-2 border-b-2 border-neutral-lightest bg-gradient-to-r from-neutral-lightest/80 to-neutral-lightest/60 backdrop-blur-sm">
        <div className="border-r-2 border-neutral-lighter px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-700 sm:text-sm">
              Original
            </p>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-xs font-bold uppercase tracking-wide text-green-700 sm:text-sm">
              Optimized
            </p>
          </div>
        </div>
      </div>

      {/* Diff Content */}
      <div className="max-h-[20rem] overflow-auto sm:max-h-[30rem]">
        <div className="font-mono text-xs leading-relaxed sm:text-sm">
          {diff.map((line, index) => {
            const baseClasses = "grid grid-cols-2 min-h-[1.75rem] items-start border-b border-neutral-lightest/30";
            
            switch (line.type) {
              case "unchanged":
                return (
                  <div key={index} className={`${baseClasses} bg-neutral-white hover:bg-neutral-lightest/20`}>
                    <div className="flex border-r border-neutral-lightest/50">
                      <div className="w-10 shrink-0 bg-neutral-lightest/40 px-2 py-1 text-right text-[10px] text-neutral-lighter font-mono sm:w-12 sm:px-2.5">
                        {line.originalLineNumber}
                      </div>
                      <div className="flex-1 px-3 py-1 text-neutral-light sm:px-4">
                        <span className="whitespace-pre-wrap break-words">{line.originalLine || " "}</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-10 shrink-0 bg-neutral-lightest/40 px-2 py-1 text-right text-[10px] text-neutral-lighter font-mono sm:w-12 sm:px-2.5">
                        {line.optimizedLineNumber}
                      </div>
                      <div className="flex-1 px-3 py-1 text-neutral-light sm:px-4">
                        <span className="whitespace-pre-wrap break-words">{line.optimizedLine || " "}</span>
                      </div>
                    </div>
                  </div>
                );

              case "added":
                return (
                  <div key={index} className={`${baseClasses} bg-green-50/60 hover:bg-green-50/80`}>
                    <div className="flex border-r border-neutral-lightest/50 bg-neutral-white/50">
                      <div className="w-10 shrink-0 bg-neutral-lightest/30 px-2 py-1 text-right text-[10px] text-neutral-lighter font-mono sm:w-12 sm:px-2.5">
                        {" "}
                      </div>
                      <div className="flex-1 px-3 py-1 text-neutral-lighter/50 sm:px-4">
                        {" "}
                      </div>
                    </div>
                    <div className="flex border-l-4 border-green-500 bg-green-50/60">
                      <div className="w-10 shrink-0 bg-green-100/70 px-2 py-1 text-right text-[10px] text-green-700 font-mono font-semibold sm:w-12 sm:px-2.5">
                        {line.optimizedLineNumber}
                      </div>
                      <div className="flex-1 bg-green-50/60 px-3 py-1 text-green-900 sm:px-4">
                        <span className="whitespace-pre-wrap break-words">
                          <span className="text-green-600 font-semibold mr-1">+</span>
                          {line.optimizedLine}
                        </span>
                      </div>
                    </div>
                  </div>
                );

              case "removed":
                return (
                  <div key={index} className={`${baseClasses} bg-red-50/70 hover:bg-red-50/90`}>
                    <div className="flex border-r-4 border-red-500 bg-red-50/70">
                      <div className="w-10 shrink-0 bg-red-100/80 px-2 py-1 text-right text-[10px] text-red-700 font-mono font-semibold sm:w-12 sm:px-2.5">
                        {line.originalLineNumber}
                      </div>
                      <div className="flex-1 bg-red-50/70 px-3 py-1 text-red-900 sm:px-4">
                        <span className="whitespace-pre-wrap break-words font-medium">
                          <span className="text-red-600 font-bold mr-1">−</span>
                          {line.originalLine}
                        </span>
                      </div>
                    </div>
                    <div className="flex border-l border-neutral-lightest/50 bg-neutral-white/50">
                      <div className="w-10 shrink-0 bg-neutral-lightest/30 px-2 py-1 text-right text-[10px] text-neutral-lighter font-mono sm:w-12 sm:px-2.5">
                        {" "}
                      </div>
                      <div className="flex-1 px-3 py-1 text-neutral-lighter/50 sm:px-4">
                        {" "}
                      </div>
                    </div>
                  </div>
                );

              case "modified": {
                const wordDiff = highlightWordDiff(line.originalLine || "", line.optimizedLine || "");
                return (
                  <div key={index} className={`${baseClasses} bg-amber-50/40 hover:bg-amber-50/60`}>
                    <div className="flex border-r-4 border-red-400 bg-red-50/50">
                      <div className="w-10 shrink-0 bg-red-100/70 px-2 py-1 text-right text-[10px] text-red-700 font-mono font-semibold sm:w-12 sm:px-2.5">
                        {line.originalLineNumber}
                      </div>
                      <div className="flex-1 bg-red-50/50 px-3 py-1 text-red-900 sm:px-4">
                        <span className="whitespace-pre-wrap break-words font-medium">
                          <span className="text-red-600 font-bold mr-1">−</span>
                          {wordDiff.original}
                        </span>
                      </div>
                    </div>
                    <div className="flex border-l-4 border-green-400 bg-green-50/50">
                      <div className="w-10 shrink-0 bg-green-100/70 px-2 py-1 text-right text-[10px] text-green-700 font-mono font-semibold sm:w-12 sm:px-2.5">
                        {line.optimizedLineNumber}
                      </div>
                      <div className="flex-1 bg-green-50/50 px-3 py-1 text-green-900 sm:px-4">
                        <span className="whitespace-pre-wrap break-words font-medium">
                          <span className="text-green-600 font-bold mr-1">+</span>
                          {wordDiff.optimized}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
