import SEO from "../components/SEO";

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy - Resume Enhancer"
        description="Learn about how Resume Enhancer uses cookies to improve your experience. Information about cookie types and your preferences."
        keywords="cookie policy, cookies, website cookies, privacy cookies"
        url="/cookie-policy"
        noindex={false}
      />
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Cookie Policy</h1>
        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">2. How We Use Cookies</h2>
          <p>
            Resume Enhancer uses cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences and settings</li>
            <li>Maintain your session while using the Service</li>
            <li>Analyze how you use our Service to improve functionality</li>
            <li>Provide personalized content and features</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">3. Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-4">3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and accessibility.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">3.2 Functional Cookies</h3>
          <p>
            These cookies allow the Service to remember choices you make (such as language preferences) and provide enhanced, personalized features.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">3.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously. This helps us improve our Service.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">3.4 Performance Cookies</h3>
          <p>
            These cookies collect information about how you use our Service, such as which pages you visit most often, to help us optimize performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">4. Third-Party Cookies</h2>
          <p>
            We may use third-party services that set cookies on your device, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Analytics Providers:</strong> To understand usage patterns</li>
            <li><strong>Cloud Services:</strong> For secure data processing</li>
            <li><strong>AI Service Providers:</strong> For resume optimization functionality</li>
          </ul>
          <p className="mt-4">
            These third parties have their own cookie policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">5. Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways:
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-4">5.1 Browser Settings</h3>
          <p>
            Most browsers allow you to refuse or accept cookies. You can also delete cookies that have already been set. However, blocking or deleting cookies may impact your ability to use our Service.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-4">5.2 Cookie Preferences</h3>
          <p>
            You can manage your cookie preferences through our cookie settings panel (if available) or by adjusting your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">6. Cookie Duration</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">7. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">8. More Information</h2>
          <p>
            For more information about cookies and how to manage them, visit:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.allaboutcookies.org</a></li>
            <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.youronlinechoices.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">9. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@resumeenhancer.com<br />
            <strong>Address:</strong> [Your Company Address]
          </p>
        </section>
      </div>
    </div>
    </>
  );
}

