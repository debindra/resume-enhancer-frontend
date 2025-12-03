export interface DemoPayload {
  resume: string;
  jobDescription: string;
  jobUrl?: string;
  title: string;
  summary: string;
}

export const demoPayloads: DemoPayload[] = [
  {
    title: "Product Manager • SaaS",
    summary: "Tech PM shifting from growth to platform ownership",
    resume: `Alex Rivera
Seattle, WA • alex.rivera@email.com • linkedin.com/in/alexrivera • 555-120-3434

Professional Summary
Product leader with 6+ years scaling B2B SaaS platforms. Shipped customer-facing features that increased retention, simplified onboarding, and improved expansion revenue.

Experience
Senior Product Manager, FlowTrack (2021—Present)
- Led restructure of onboarding funnel, lifting activation from 42% to 67% in two quarters
- Partnered with data science to deploy churn risk alerts; reduced logo churn 18% YoY
- Built roadmap governance process across engineering, design, sales, and CS for 4 product squads

Product Manager, CloudBeam (2019—2021)
- Delivered new analytics workspace used by 1.4k enterprise admins within six months of launch
- Introduced customer feedback loops, compressing discovery cycles by 35%
- Owned multi-region rollout strategy for enterprise SSO, coordinating with security and legal

Skills & Tools
Backlog management • Hypothesis testing • Experiment design • Tableau • Amplitude • SQL

Education
BS, Information Systems — University of Washington`,
    jobDescription: `Senior Product Manager - Platform Foundations

We are seeking a product leader to own platform capabilities that power customer onboarding, billing, and analytics.

Responsibilities:
- Drive the vision and roadmap for foundational services spanning authentication, provisioning, and reporting
- Partner with engineering leads to deliver secure, scalable APIs
- Collaborate with GTM teams to shape product positioning and launch plans
- Analyze product metrics to prioritize improvements that increase retention and expansion

Ideal background:
- 5+ years in SaaS product management
- Demonstrated success with cross-functional leadership
- Comfort collaborating with data and revenue stakeholders
- Familiarity with experimentation, activation funnels, and enterprise integrations`,
    jobUrl: "https://jobs.example.com/product-manager-platform"
  },
  {
    title: "Data Analyst • Fintech",
    summary: "Analyst moving toward product analytics in fintech",
    resume: `Taylor Morgan
New York, NY • taylor.morgan@email.com • 555-556-2310 • linkedin.com/in/taylormorgan

Professional Summary
Data analyst translating complex data into insights for product and marketing teams. Passion for fintech and customer experience analytics.

Experience
Data Analyst, BrightPay (2020—Present)
- Built daily revenue dashboards for exec team, improving reporting timeliness by 75%
- Partnered with lifecycle marketing to design experiments that increased engagement 28%
- Modeled customer behavior to surface retention drivers across subscriber cohorts

Business Analyst, Northern Credit Union (2017—2020)
- Produced portfolio health reports covering $1.2B in assets with <1% variance
- Implemented new SQL workflows that eliminated 12 hours of manual reporting per week
- Coordinated with compliance to align data definitions ahead of audits

Skills
SQL • Python • Tableau • Excel • Experiment design • Cohort analysis

Education
BA, Economics — Syracuse University`,
    jobDescription: `Product Analytics Specialist

What you'll do:
- Partner with product squads to define instrumentation and KPI frameworks
- Investigate funnel friction using SQL, Python, and dashboarding tools
- Translate findings into recommendations that influence product and marketing roadmaps
- Present insights to leadership and drive alignment on next steps

Requirements:
- 3+ years in analytics or data science within a digital product environment
- Expert SQL and dashboarding skills
- Strong communication and stakeholder management
- Background in fintech or regulated environments is a plus`,
    jobUrl: "https://jobs.example.com/product-analytics-specialist"
  }
];

