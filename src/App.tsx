import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ATSInsights from "./pages/ATSInsights";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CookiePolicy from "./pages/CookiePolicy";
import CoverLetterWizard from "./pages/CoverLetterWizard";
import Documentation from "./pages/Documentation";
import Home from "./pages/Home";
import Optimization from "./pages/Optimization";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UploadResume from "./pages/UploadResume";

export default function App() {
  const isLoggedIn = false;
  const isProAccount = false;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home isProUser={isProAccount} isLoggedIn={isLoggedIn} />} />
        <Route
          path="/resume/upload"
          element={<UploadResume isProUser={isProAccount} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/optimize" element={<Optimization />} />
        <Route path="/ats" element={<ATSInsights />} />
        <Route
          path="/cover-letter"
          element={isLoggedIn && isProAccount ? <CoverLetterWizard /> : <Navigate to="/" replace />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
