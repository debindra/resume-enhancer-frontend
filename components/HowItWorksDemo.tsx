"use client";

import { useEffect, useState, useRef } from "react";

export function HowItWorksDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepActivatedRef = useRef<boolean[]>([]);

  const handleAnalyzeClick = () => {
    if (activeStep === 0 && uploadProgress === 100) {
      setActiveStep(1);
      setAnalysisProgress(0);
      const analysisInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(analysisInterval);
            return 100;
          }
          return prev + 8;
        });
      }, 80);
      
      setTimeout(() => {
        setActiveStep(2);
        setAnalysisProgress(100);
        setShowResults(true);
      }, 2000);
    }
  };

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer to detect when section is visible (for desktop auto-start)
  useEffect(() => {
    // Only use this observer for desktop
    if (isMobile) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Reset to first step when section becomes visible
            setActiveStep(0);
            setUploadProgress(0);
            setAnalysisProgress(0);
            setShowResults(false);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  // Mobile: Intersection Observer for each step (scroll-based activation)
  useEffect(() => {
    if (!isMobile) {
      return;
    }

    // Initialize activated tracking array
    stepActivatedRef.current = [false, false, false];

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !stepActivatedRef.current[index]) {
              // Mark this step as activated
              stepActivatedRef.current[index] = true;
              
              // Activate this step when it comes into view
              setActiveStep(index);
              
              // Handle progress animations for step 0 (upload)
              if (index === 0) {
                setUploadProgress(0);
                const uploadInterval = setInterval(() => {
                  setUploadProgress((prev) => {
                    if (prev >= 100) {
                      clearInterval(uploadInterval);
                      return 100;
                    }
                    return prev + 10;
                  });
                }, 150);
              }
              
              // Handle progress animations for step 1 (analysis)
              if (index === 1) {
                setAnalysisProgress(0);
                setUploadProgress(100); // Ensure step 0 is complete
                const analysisInterval = setInterval(() => {
                  setAnalysisProgress((prev) => {
                    if (prev >= 100) {
                      clearInterval(analysisInterval);
                      setShowResults(true);
                      return 100;
                    }
                    return prev + 8;
                  });
                }, 80);
              }
              
              // Show results for step 2
              if (index === 2) {
                setShowResults(true);
                setAnalysisProgress(100);
                setUploadProgress(100);
              }
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the step is visible
          rootMargin: '-20% 0px -20% 0px' // Trigger when step is more centered in viewport
        }
      );

      observer.observe(stepRef);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isMobile]);

  useEffect(() => {
    // Only auto-cycle on desktop when section is visible
    // Mobile uses scroll-based activation instead
    if (isMobile || !isVisible) {
      return;
    }

    // Auto-cycle through steps like a demo (desktop only)
    const interval = setInterval(() => {
      if (activeStep === 0) {
        // Step 1: Upload - simulate file upload and JD entry
        setUploadProgress(0);
        const uploadInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(uploadInterval);
              return 100;
            }
            return prev + 10;
          });
        }, 150);
        
        setTimeout(() => {
          setActiveStep(1);
          setUploadProgress(100);
        }, 2000);
      } else if (activeStep === 1) {
        // Step 2: Analyze - simulate analysis progress
        setAnalysisProgress(0);
        const analysisInterval = setInterval(() => {
          setAnalysisProgress((prev) => {
            if (prev >= 100) {
              clearInterval(analysisInterval);
              return 100;
            }
            return prev + 8;
          });
        }, 80);
        
        setTimeout(() => {
          setActiveStep(2);
          setAnalysisProgress(100);
          setShowResults(true);
        }, 2000);
      } else {
        // Step 3: Show results, then reset
        setTimeout(() => {
          setActiveStep(0);
          setUploadProgress(0);
          setAnalysisProgress(0);
          setShowResults(false);
        }, 2500);
      }
    }, activeStep === 2 ? 2500 : 3000);

    return () => clearInterval(interval);
  }, [activeStep, isVisible, isMobile]);

  const steps = [
    {
      step: "01",
      title: "Upload",
      illustration: (
        <div className={`relative w-full max-w-xs mx-auto transition-all duration-700 ${activeStep === 0 ? 'opacity-100 scale-100' : activeStep > 0 ? 'opacity-40 scale-95' : 'opacity-0'}`}>
          <div className="rounded-xl border border-neutral-lightest bg-neutral-white p-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Resume Upload */}
              <div className="rounded-lg border-2 border-dashed border-neutral-lighter p-4">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-xs text-neutral-light">resume.pdf</p>
                  {activeStep === 0 && uploadProgress > 0 && (
                    <div className="w-full">
                      <div className="h-0.5 bg-neutral-lightest rounded-full">
                        <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="rounded-lg border border-neutral-lightest bg-neutral-white p-3">
                <div className="h-20 bg-neutral-lightest/20 rounded">
                  <div className="space-y-1 p-2">
                    <div className={`h-1 bg-primary/15 rounded transition-all duration-500 ${activeStep === 0 && uploadProgress > 40 ? 'w-full' : 'w-3/4'}`}></div>
                    <div className={`h-1 bg-primary/15 rounded transition-all duration-500 ${activeStep === 0 && uploadProgress > 60 ? 'w-5/6' : 'w-2/3'}`}></div>
                    <div className={`h-1 bg-primary/15 rounded transition-all duration-500 ${activeStep === 0 && uploadProgress > 80 ? 'w-4/5' : 'w-1/2'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {activeStep === 0 && uploadProgress === 100 && (
              <button 
                onClick={handleAnalyzeClick}
                className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer"
              >
                Analyze Resume
              </button>
            )}
          </div>
        </div>
      )
    },
    {
      step: "02",
      title: "AI Analyzes",
      illustration: (
        <div className={`relative w-full max-w-xs mx-auto transition-all duration-700 pt-0 ${activeStep === 1 ? 'opacity-100 scale-100' : activeStep < 1 ? 'opacity-0' : 'opacity-40 scale-95'}`}>
          {/* Simple card like step 1 */}
          <div className="rounded-xl border border-neutral-lightest bg-neutral-white p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {activeStep === 1 ? (
                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg animate-float shrink-0 overflow-hidden">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-secondary-light opacity-75 animate-ping" style={{ animationDuration: '1.5s' }} />
                    <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-neutral-white border-t-transparent" />
                  </span>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-neutral-lightest/50 shrink-0"></div>
                )}
                <div className="flex-1">
                  {activeStep === 1 ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-wide text-primary animate-pulse-slow">
                        AI is working<span className="inline-block animate-bounce-slow">...</span>
                      </p>
                      <div className="mt-1 space-y-1.5">
                        <div className="h-2 bg-neutral-lightest/50 rounded w-full"></div>
                        <div className="h-2 bg-neutral-lightest/50 rounded w-5/6"></div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="h-2.5 bg-neutral-lightest/50 rounded w-3/4"></div>
                      <div className="h-2 bg-neutral-lightest/50 rounded w-full"></div>
                      <div className="h-2 bg-neutral-lightest/50 rounded w-5/6"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeStep === 1 ? (
                  ["Keyword alignment", "Achievement emphasis", "ATS formatting"].map((item, index) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary bg-white px-3 py-1 text-xs font-bold text-primary"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <>
                    <div className="h-6 bg-neutral-lightest/50 rounded-full w-24"></div>
                    <div className="h-6 bg-neutral-lightest/50 rounded-full w-28"></div>
                    <div className="h-6 bg-neutral-lightest/50 rounded-full w-20"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "03",
      title: "Get Results",
      illustration: (
        <div className={`relative w-full max-w-xs mx-auto transition-all duration-700 ${activeStep === 2 ? 'opacity-100 scale-100' : activeStep < 2 ? 'opacity-0' : 'opacity-40 scale-95'}`}>
          <div className="mt-4 pt-2">
            {/* Single Full Card */}
            {activeStep === 2 && showResults ? (
              <div className="rounded-xl border border-neutral-lightest bg-white p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* ATS Score */}
                  <div>
                    <p className="text-xs text-neutral-light mb-1">ATS Score</p>
                    <p className="text-2xl font-bold text-primary mb-2">85%</p>
                    <div className="h-1.5 bg-neutral-lightest rounded-full">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Match Score */}
                  <div>
                    <p className="text-xs text-neutral-light mb-1">Match Score</p>
                    <p className="text-2xl font-bold text-secondary-dark mb-2">92%</p>
                    <div className="h-1.5 bg-neutral-lightest rounded-full">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>

                {/* Two Column Layout: Recommendations on Left, Optimized Resume on Right */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Recommendations - Left */}
                  <div>
                    <p className="text-xs font-medium text-neutral mb-2">Recommendations</p>
                    <div className="space-y-1.5">
                      {["Add 'Python' keyword 3x", "Quantify achievements", "Match job title"].map((rec, idx) => (
                        <p key={idx} className="text-xs text-neutral-light">• {rec}</p>
                      ))}
                    </div>
                  </div>

                  {/* Optimized Resume - Right */}
                  <div>
                    <p className="text-xs font-medium text-neutral mb-2">Optimized Resume</p>
                    <div className="space-y-1.5 mb-3">
                      <div className="h-1.5 bg-primary/15 rounded w-full"></div>
                      <div className="h-1.5 bg-primary/10 rounded w-5/6"></div>
                      <div className="h-1.5 bg-secondary/15 rounded w-4/5"></div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white">
                        PDF
                      </button>
                      <button className="flex-1 rounded-full border border-neutral-lightest px-3 py-1.5 text-xs font-medium text-neutral-light">
                        DOC
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-neutral-lightest bg-white p-6 text-center">
                <p className="text-sm text-neutral-light">Results will appear here...</p>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative" ref={sectionRef}>
      <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12 relative">
        {/* Connection Line - Just below step number badges */}
        <div className="hidden md:block absolute top-36 left-0 right-0 h-px bg-neutral-lightest">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-in-out"
            style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
          />
        </div>

        {steps.map((item, index) => (
          <div 
            key={item.step}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`group text-center relative ${activeStep === index ? 'z-10' : 'z-0'}`}
          >
            {/* Title - Fixed height to ensure alignment - No animation */}
            <div className="h-8 mb-6 flex items-center justify-center">
              <h3 className={`text-xl font-medium transition-colors duration-500 ${
                activeStep === index 
                  ? 'text-primary' 
                  : 'text-neutral'
              }`}>
                {item.title}
              </h3>
            </div>

            {/* Step Number Badge - Fixed height - No animation */}
            <div className="h-14 mb-0 flex justify-center items-center relative z-20">
              <div className="relative">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-light transition-colors duration-500 border bg-white ${
                  activeStep === index 
                    ? 'text-primary border-primary' 
                    : 'text-neutral-lighter border-neutral-lightest'
                }`}>
                  {item.step}
                </div>
              </div>
            </div>

            {/* Visual Illustration - Fixed height for consistency - Only this animates */}
            <div className={`h-[280px] flex items-center justify-center transition-all duration-700 ${activeStep === index ? 'translate-y-4' : 'translate-y-0'}`}>
              {item.illustration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


