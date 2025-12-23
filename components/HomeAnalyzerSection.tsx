"use client";

import AnalyzerForm from "@/components/AnalyzerForm";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeAnalyzerSection() {
  const { user } = useAuth();

  // TODO: Replace with real subscription/plan detection when billing is fully wired
  const isLoggedIn = Boolean(user);
  const isProUser = false;

  return <AnalyzerForm isProUser={isProUser} isLoggedIn={isLoggedIn} />;
}


