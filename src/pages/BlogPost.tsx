import { Link, useParams } from "react-router-dom";
import BlogImage from "../components/BlogImage";

// Blog post data with human-written content and images
const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  content: Array<{ type: 'text' | 'heading' | 'list' | 'image'; content: string; imageSrc?: string; imageAlt?: string; imageCaption?: string }>;
}> = {
  "5-ways-to-improve-ats-score": {
    title: "5 Ways to Improve Your ATS Score",
    category: "Resume Tips",
    date: "2024-01-15",
    author: "Sarah Chen",
    readTime: "5 min read",
    excerpt: "I've reviewed thousands of resumes, and here's what actually works when it comes to getting past those pesky ATS systems.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    content: [
      { type: 'text', content: "Last week, a client emailed me frustrated: 'I've applied to 50 jobs and haven't heard back from a single one.' Sound familiar? The problem wasn't her experience—she had 8 years in marketing. The problem was her resume never made it past the Applicant Tracking System (ATS)." },
      { type: 'text', content: "Here's the thing: over 98% of Fortune 500 companies use ATS software to filter resumes before a human ever sees them. If your resume doesn't play by the ATS rules, you're out before you even start." },
      { type: 'text', content: "After helping hundreds of job seekers improve their ATS scores, I've learned what actually works. These aren't theoretical tips—they're battle-tested strategies from real people who went from zero responses to multiple interviews." },
      { type: 'heading', content: "1. Keywords Matter, But Not How You Think" },
      { type: 'text', content: "Everyone tells you to stuff your resume with keywords. That's terrible advice. ATS systems are smarter than that—they can detect keyword stuffing and will actually penalize you for it." },
      { type: 'text', content: "Instead, think like a recruiter. They're looking for specific skills, tools, and experiences. I always tell my clients to print out the job description and highlight the 10-15 most important terms. Then, weave those naturally into your resume." },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop", imageAlt: "Person highlighting keywords on a job description", imageCaption: "Start by identifying the most important keywords in each job posting" },
      { type: 'text', content: "The best places to include keywords? Your professional summary (that 2-3 sentence intro), your job titles, and your bullet points. But here's the key: make sure they fit naturally. If you're forcing a keyword in, it'll sound awkward to both the ATS and the human reader." },
      { type: 'heading', content: "2. Formatting Can Make or Break You" },
      { type: 'text', content: "I once had a client with an absolutely gorgeous resume—custom fonts, beautiful graphics, the works. It looked like a work of art. Problem? The ATS couldn't read it. She got zero callbacks." },
      { type: 'text', content: "ATS systems are basically robots trying to parse your document. They need simple, clean formats. Here's what actually works:" },
      { type: 'list', content: "• Stick to standard fonts like Arial, Calibri, or Times New Roman\n• Use simple section headings: 'Experience,' 'Education,' 'Skills'\n• Save as .docx or .pdf (never .pages or other fancy formats)\n• Keep margins at least 0.5 inches\n• Use bullet points, not paragraphs\n• Avoid tables, graphics, or text boxes" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop", imageAlt: "Clean, simple resume format example", imageCaption: "Simple formatting helps ATS systems parse your resume correctly" },
      { type: 'text', content: "I know, I know—it's boring. But here's the reality: a boring resume that gets read beats a beautiful resume that gets rejected every single time." },
      { type: 'heading', content: "3. Numbers Tell Your Story" },
      { type: 'text', content: "Here's a before and after from one of my clients:" },
      { type: 'text', content: "Before: 'Managed social media accounts and improved engagement'" },
      { type: 'text', content: "After: 'Managed 5 social media accounts, increasing engagement by 150% and growing followers from 10K to 50K in 6 months'" },
      { type: 'text', content: "See the difference? Numbers give context. They show scale. They prove impact. And both ATS systems and human recruiters love them." },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", imageAlt: "Charts and metrics showing data visualization", imageCaption: "Quantifiable achievements make your impact clear" },
      { type: 'text', content: "Don't have exact numbers? That's okay. Use estimates or percentages. 'Reduced processing time by approximately 40%' is still way better than 'improved efficiency.'" },
      { type: 'heading', content: "4. Mirror the Job Description Language" },
      { type: 'text', content: "This one's sneaky but super effective. ATS systems compare your resume language against the job description. If the job says 'project management' and you wrote 'project coordination,' you might miss the match." },
      { type: 'text', content: "I always tell clients to literally copy-paste key phrases from the job description (not the whole thing, just the important parts) into a separate document. Then, when writing your resume, use that exact language." },
      { type: 'text', content: "If they say 'agile methodology,' you say 'agile methodology'—not 'scrum' or 'iterative development.' Match their terminology exactly." },
      { type: 'heading', content: "5. Don't Skip the Basics" },
      { type: 'text', content: "You'd be surprised how many resumes I see missing basic sections. ATS systems expect certain sections, and if they're missing or named weirdly, you'll lose points." },
      { type: 'text', content: "Make sure you have:" },
      { type: 'list', content: "• Contact information (name, email, phone, city/state)\n• Professional summary or objective\n• Work experience with dates\n• Education\n• Skills section\n• Certifications (if relevant)" },
      { type: 'text', content: "And here's a pro tip: use standard section names. 'Professional Experience' works better than 'Where I've Worked' or 'Career Journey.'" },
      { type: 'heading', content: "The Bottom Line" },
      { type: 'text', content: "Improving your ATS score isn't rocket science, but it does require attention to detail. The good news? Once you optimize your resume properly, you can reuse that format for multiple applications—just swap out the keywords and tweak the content for each job." },
      { type: 'text', content: "I've seen clients go from zero responses to landing interviews at their dream companies just by following these five strategies. The key is consistency and attention to detail." },
      { type: 'text', content: "Want to see how your resume stacks up? Our resume analyzer can give you an instant ATS score and show you exactly where to improve. It's like having a career coach review your resume, but available 24/7." },
    ]
  },
  "tailor-resume-for-each-job": {
    title: "How to Tailor Your Resume for Each Job Application",
    category: "Job Search",
    date: "2024-01-10",
    author: "Michael Rodriguez",
    readTime: "7 min read",
    excerpt: "The one-size-fits-all approach doesn't work. Here's how I help clients customize their resumes without losing their minds.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    content: [
      { type: 'text', content: "I get it. You're applying to 20, 30, maybe 50 jobs. The last thing you want to do is rewrite your resume every single time. But here's the harsh truth: sending the same generic resume to every job is like wearing the same outfit to every date—it might work once, but probably not." },
      { type: 'text', content: "I've been a career coach for 12 years, and I've seen the data: tailored resumes get 40% more interview requests. That's not a small difference—that's the difference between radio silence and actual opportunities." },
      { type: 'heading', content: "Why Bother Tailoring?" },
      { type: 'text', content: "Let me paint you a picture. You're a marketing manager applying to two jobs:" },
      { type: 'text', content: "Job 1: B2B SaaS company looking for someone with email marketing expertise" },
      { type: 'text', content: "Job 2: E-commerce brand looking for someone with social media and influencer experience" },
      { type: 'text', content: "If you send the same resume to both, you're telling Job 1 you're great at social media (which they don't care about) and Job 2 you're great at email (which they don't prioritize). You're essentially highlighting the wrong things." },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop", imageAlt: "Two different resumes side by side showing customization", imageCaption: "Tailoring your resume means highlighting what each employer actually cares about" },
      { type: 'text', content: "A tailored resume shows you actually read the job description. It shows you understand what they need. And most importantly, it shows you care enough to put in the effort." },
      { type: 'heading', content: "My 5-Step Tailoring Process" },
      { type: 'text', content: "I've developed this process over years of helping clients. It takes about 15-20 minutes per job, and it's worth every second." },
      { type: 'heading', content: "Step 1: Read the Job Description Like a Detective" },
      { type: 'text', content: "Don't just skim it. Print it out (or copy it to a doc) and highlight:" },
      { type: 'list', content: "• Must-have skills (usually listed first)\n• Nice-to-have skills\n• Key responsibilities\n• Company values and culture clues\n• Industry-specific terms" },
      { type: 'text', content: "I keep a master list of everything I find. This becomes my roadmap for what to emphasize." },
      { type: 'heading', content: "Step 2: Find Your Transferable Skills" },
      { type: 'text', content: "Not every job will match your exact experience. That's okay! I help clients identify skills that transfer across roles:" },
      { type: 'list', content: "• Leadership (even if it's informal)\n• Problem-solving\n• Communication\n• Project management\n• Data analysis" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop", imageAlt: "Person mapping skills between different roles", imageCaption: "Transferable skills help you pivot between different types of roles" },
      { type: 'text', content: "The key is reframing your experience. Maybe you didn't manage a team, but you coordinated cross-functional projects. That's leadership." },
      { type: 'heading', content: "Step 3: Reorder Your Experience" },
      { type: 'text', content: "This is where most people stop, but it's crucial. Put your most relevant experience first. If you're applying for a product role and you have product experience buried under 3 other jobs, move it up." },
      { type: 'text', content: "Within each job, reorder your bullet points too. The bullet that matches the job description should be #1, not #5." },
      { type: 'heading', content: "Step 4: Rewrite Your Summary" },
      { type: 'text', content: "Your professional summary is prime real estate. Don't waste it on generic fluff. I rewrite mine for every application to include:" },
      { type: 'list', content: "• Years of relevant experience\n• The exact skills they mentioned\n• What value I bring to THIS specific role" },
      { type: 'text', content: "Example: Instead of 'Experienced marketing professional seeking new opportunities,' try '8-year marketing professional specializing in email marketing and lead generation, seeking to drive growth at [Company Name].'" },
      { type: 'heading', content: "Step 5: Adjust Keywords Throughout" },
      { type: 'text', content: "Go through your resume and swap out keywords to match the job description. If they say 'stakeholder management,' use that instead of 'client relations.' If they say 'agile,' use 'agile' not 'flexible.'" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", imageAlt: "Person editing resume on computer", imageCaption: "Small keyword adjustments can make a big difference in ATS matching" },
      { type: 'heading', content: "How AI Can Help (Without Making You Sound Like a Robot)" },
      { type: 'text', content: "I'll be honest—I was skeptical about AI resume tools at first. But after trying them, I see their value. Tools like Resume Enhancer can:" },
      { type: 'list', content: "• Quickly identify keyword gaps\n• Suggest relevant content improvements\n• Show you your ATS score\n• Save you time on the formatting stuff" },
      { type: 'text', content: "The key is using AI as a starting point, not the final product. Always review and personalize. Add your voice. Make it human." },
      { type: 'heading', content: "Common Mistakes I See" },
      { type: 'text', content: "• Copy-pasting the entire job description (obvious and lazy)\n• Over-customizing until you lose your authentic voice\n• Forgetting to update contact info\n• Submitting without proofreading (typos kill credibility)\n• Using the same resume for completely different roles" },
      { type: 'heading', content: "The Reality Check" },
      { type: 'text', content: "Tailoring takes time. There's no way around it. But here's what I tell my clients: spending 20 minutes tailoring a resume that gets you an interview is way better than spending 2 minutes sending a generic one that gets ignored." },
      { type: 'text', content: "Think of it as an investment. You're investing 20 minutes now to save yourself weeks of applying to more jobs later." },
      { type: 'text', content: "Start with a master resume that has everything. Then create tailored versions for different job types. Save them with clear names like 'Resume_Marketing_B2B.docx' so you can reuse them." },
      { type: 'text', content: "And remember: you're not fabricating experience. You're just highlighting the parts of your experience that matter most to each employer. That's not dishonest—that's strategic." },
    ]
  },
  "understanding-ats-what-recruiters-look-for": {
    title: "Understanding ATS: What Recruiters Look For",
    category: "Career Advice",
    date: "2024-01-05",
    author: "Emily Watson",
    readTime: "6 min read",
    excerpt: "I've been on both sides of the hiring process. Here's what actually happens when you submit your resume.",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    content: [
      { type: 'text', content: "You hit 'submit' on that job application. Your resume disappears into the void. Days pass. Weeks pass. Nothing. What happened? Did anyone even see it?" },
      { type: 'text', content: "I've been a recruiter for 8 years, and I've also been on the job-seeking side. Let me pull back the curtain on what actually happens to your resume after you click submit." },
      { type: 'heading', content: "The ATS: Your First Gatekeeper" },
      { type: 'text', content: "Most people think their resume goes straight to a recruiter. Nope. It goes to an Applicant Tracking System first—a piece of software that acts like a bouncer at an exclusive club." },
      { type: 'text', content: "Here's what happens: The ATS takes your resume, strips out all the formatting, and tries to parse it into structured data. Name, email, work experience, skills—it's trying to organize everything into neat little boxes." },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", imageAlt: "Data visualization showing ATS parsing process", imageCaption: "ATS systems parse your resume into structured data before a human sees it" },
      { type: 'text', content: "Then it scores you. Based on keyword matches, skills, experience level, education—it gives you a score. Resumes below a certain threshold? They never make it to a human. They just... disappear." },
      { type: 'heading', content: "What Recruiters Actually Configure" },
      { type: 'text', content: "When I set up a job posting, I tell the ATS what I'm looking for:" },
      { type: 'list', content: "• Required skills (must-haves)\n• Preferred skills (nice-to-haves)\n• Years of experience\n• Education level\n• Certifications\n• Industry keywords\n• Job title variations" },
      { type: 'text', content: "The ATS then filters candidates based on these criteria. If you don't match enough of them, you're out. It's that simple." },
      { type: 'heading', content: "The Keyword Matching Game" },
      { type: 'text', content: "Here's where it gets interesting. The ATS doesn't just look for keywords—it looks for relevant keywords in the right context." },
      { type: 'text', content: "Say I'm hiring for a 'Product Manager' role. The ATS is looking for:" },
      { type: 'list', content: "• The exact phrase 'Product Manager' or variations\n• Related skills: 'roadmap,' 'stakeholder management,' 'agile'\n• Industry terms: 'SaaS,' 'B2B,' 'user experience'\n• Tools: 'Jira,' 'Figma,' 'Analytics'" },
      { type: 'text', content: "But here's the thing: it's not just about having these words. They need to appear in relevant sections. 'Product Manager' in your skills section is good. 'Product Manager' randomly in your hobbies section? Not so much." },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", imageAlt: "Keyword matching visualization", imageCaption: "Keywords need to appear in the right context to score well" },
      { type: 'heading', content: "Formatting: The Silent Killer" },
      { type: 'text', content: "I can't tell you how many great candidates I've missed because their resumes had formatting issues. Fancy fonts, graphics, tables—they look nice, but the ATS can't read them." },
      { type: 'text', content: "I once had a candidate with 10 years of perfect experience. But their resume used text boxes and custom graphics. The ATS parsed it as a jumbled mess. By the time I saw it (manually pulled from the reject pile), the position was already filled." },
      { type: 'text', content: "Keep it simple. Standard fonts. Standard sections. No graphics. The ATS needs to be able to parse it, and fancy formatting confuses it." },
      { type: 'heading', content: "After the ATS: The Human Review" },
      { type: 'text', content: "If you pass the ATS, your resume finally lands on someone's desk (or screen). But here's what most people don't realize: recruiters spend an average of 7 seconds on your resume initially." },
      { type: 'text', content: "Seven seconds. That's it. So your resume needs to be:" },
      { type: 'list', content: "• Easy to scan\n• Clearly organized\n• Highlighting the right things\n• Free of typos\n• Visually clean (even if simple)" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop", imageAlt: "Recruiter reviewing resumes", imageCaption: "After passing the ATS, your resume gets a quick human review" },
      { type: 'text', content: "I'm looking for a reason to keep reading. Numbers help. Clear achievements help. Relevant experience helps. Typos? Those make me stop reading." },
      { type: 'heading', content: "The Mistakes I See Over and Over" },
      { type: 'text', content: "• Missing contact information (yes, really)\n• Using weird file formats (.pages files drive me crazy)\n• Headers and footers (ATS can't always read them)\n• Text boxes or columns\n• Missing dates on work experience\n• Vague bullet points with no impact" },
      { type: 'heading', content: "How to Test Your Resume" },
      { type: 'text', content: "Before you submit, test it. Use an ATS-friendly resume builder or an online ATS simulator. See how it parses. Check if your information shows up correctly." },
      { type: 'text', content: "Better yet, use a tool like Resume Enhancer that can analyze your resume and give you an actual ATS score. It'll show you exactly where you're losing points." },
      { type: 'heading', content: "The Bottom Line" },
      { type: 'text', content: "The ATS isn't your enemy—it's just a filter. Understand how it works, play by its rules, and you'll get through. Then focus on making your resume compelling for the human who reads it next." },
      { type: 'text', content: "Remember: the goal isn't to trick the ATS. It's to make sure your resume accurately represents your qualifications in a way both the ATS and humans can understand." },
    ]
  },
  "power-of-quantifiable-achievements": {
    title: "The Power of Quantifiable Achievements in Resumes",
    category: "Resume Tips",
    date: "2023-12-28",
    author: "David Kim",
    readTime: "5 min read",
    excerpt: "Stop telling recruiters what you did. Start showing them what you accomplished.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    content: [
      { type: 'text', content: "I was reviewing resumes last week when I came across this gem: 'Responsible for managing social media accounts.'" },
      { type: 'text', content: "My first thought? 'Okay... and?'" },
      { type: 'text', content: "Here's the thing: telling me what you were responsible for doesn't tell me if you were any good at it. It doesn't tell me the impact you made. It doesn't help me understand why I should hire you over the 200 other people who also 'managed social media accounts.'" },
      { type: 'text', content: "Numbers change everything. Let me show you what I mean." },
      { type: 'heading', content: "Why Numbers Matter" },
      { type: 'text', content: "Recruiters and hiring managers are trained to look for proof. We're skeptical by nature—we've seen too many resumes with inflated claims. But numbers? Numbers are hard to argue with." },
      { type: 'text', content: "When you say 'increased sales,' I think 'okay, by how much?' When you say 'improved customer satisfaction,' I think 'from what to what?' When you say 'managed a team,' I think 'how many people?'" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", imageAlt: "Resume with quantified achievements highlighted", imageCaption: "Numbers provide concrete proof of your impact" },
      { type: 'text', content: "Research shows resumes with quantified achievements get 40% more interview requests. That's not a coincidence. Numbers give context. They show scale. They prove impact." },
      { type: 'heading', content: "The Before and After" },
      { type: 'text', content: "Let me show you some real examples from clients I've worked with:" },
      { type: 'text', content: "Before: 'Managed social media accounts'" },
      { type: 'text', content: "After: 'Managed 5 social media accounts, increasing engagement by 150% and growing followers from 10K to 50K in 6 months'" },
      { type: 'text', content: "See the difference? The first tells me what you did. The second tells me what you accomplished." },
      { type: 'text', content: "Before: 'Improved customer service'" },
      { type: 'text', content: "After: 'Improved customer satisfaction scores from 3.2/5 to 4.7/5 and reduced average response time by 40%'" },
      { type: 'text', content: "Before: 'Led marketing campaigns'" },
      { type: 'text', content: "After: 'Led 12 marketing campaigns generating $2M in revenue and increasing brand awareness by 35%'" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", imageAlt: "Before and after resume comparison", imageCaption: "Adding numbers transforms vague statements into compelling achievements" },
      { type: 'heading', content: "What to Quantify" },
      { type: 'text', content: "Not sure what to quantify? Here are the types of metrics that matter:" },
      { type: 'heading', content: "Revenue and Money" },
      { type: 'list', content: "• Sales increases\n• Cost savings\n• Budgets managed\n• Revenue generated\n• Profit improvements" },
      { type: 'heading', content: "Efficiency and Time" },
      { type: 'list', content: "• Time saved\n• Process improvements\n• Productivity increases\n• Turnaround times\n• Processing speeds" },
      { type: 'heading', content: "Scale and Volume" },
      { type: 'list', content: "• Team size\n• Project budgets\n• Users or customers\n• Transactions processed\n• Content created" },
      { type: 'heading', content: "Quality and Performance" },
      { type: 'list', content: "• Customer satisfaction scores\n• Error rate reductions\n• Uptime percentages\n• Conversion rates\n• Quality metrics" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", imageAlt: "Different types of metrics visualized", imageCaption: "There are many ways to quantify your impact—find what works for your role" },
      { type: 'heading', content: "What If You Don't Have Numbers?" },
      { type: 'text', content: "I hear this all the time: 'But my role doesn't have metrics!'" },
      { type: 'text', content: "I call BS. Every role has metrics. You just need to think differently." },
      { type: 'text', content: "Did you handle customer inquiries? Count them. Did you manage projects? Count them. Did you train people? Count them. Did you improve a process? Estimate the time saved." },
      { type: 'text', content: "Even if you don't have exact numbers, estimates work. 'Reduced processing time by approximately 40%' is way better than 'improved efficiency.'" },
      { type: 'heading', content: "The Formula That Works" },
      { type: 'text', content: "Here's my go-to formula for quantifying achievements:" },
      { type: 'text', content: "[Action Verb] + [What You Did] + [Number/Metric] + [Impact/Result]" },
      { type: 'text', content: "Example: 'Increased website traffic by 200% through SEO optimization, resulting in 50% more qualified leads'" },
      { type: 'text', content: "See how that works? Action verb. What you did. The number. The impact." },
      { type: 'heading', content: "Common Mistakes" },
      { type: 'text', content: "• Using vague numbers ('some,' 'many,' 'several')\n• Overstating achievements (be honest)\n• Including irrelevant metrics\n• Forgetting to provide context\n• Using too many numbers (it gets overwhelming)" },
      { type: 'text', content: "Remember: the goal isn't to impress with big numbers. It's to show impact. A 10% improvement at a Fortune 500 company might be more impressive than a 100% improvement at a startup." },
      { type: 'heading', content: "Start Today" },
      { type: 'text', content: "Go through your resume right now. Find every bullet point that doesn't have a number. Ask yourself: 'Can I add a number here?'" },
      { type: 'text', content: "If you're stuck, think about:" },
      { type: 'list', content: "• How many? (people, projects, accounts)\n• How much? (revenue, savings, budget)\n• How often? (frequency, volume)\n• How fast? (time, speed)\n• How well? (scores, ratings, percentages)" },
      { type: 'image', content: '', imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop", imageAlt: "Person working on resume with metrics", imageCaption: "Take time to identify and quantify your achievements—it's worth the effort" },
      { type: 'text', content: "Numbers transform your resume from a list of responsibilities into a story of impact. They show recruiters why you're different. They prove your value." },
      { type: 'text', content: "Stop telling us what you did. Start showing us what you accomplished." },
    ]
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Post Not Found</h1>
          <p className="mb-8 text-slate-600">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <article className="mx-auto max-w-4xl space-y-8 py-12">
      {/* Header */}
      <header className="space-y-6 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{formattedDate}</span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm text-slate-500">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {post.title}
          </h1>
          
          <p className="text-xl leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{post.author}</p>
              <p className="text-sm text-slate-500">Author</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <img
          src={post.heroImage}
          alt={post.title}
          className="h-auto w-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="prose prose-slate prose-lg max-w-none space-y-6 text-slate-700">
        {post.content.map((item, index) => {
          if (item.type === 'heading') {
            return (
              <h2 key={index} className="mt-12 mb-6 text-3xl font-bold text-slate-900 first:mt-0">
                {item.content}
              </h2>
            );
          } else if (item.type === 'list') {
            const items = item.content.split('\n').filter(i => i.trim());
            return (
              <ul key={index} className="my-6 space-y-2 pl-6">
                {items.map((listItem, idx) => (
                  <li key={idx} className="text-slate-700 leading-relaxed">
                    {listItem.replace(/^•\s*/, '')}
                  </li>
                ))}
              </ul>
            );
          } else if (item.type === 'image') {
            return (
              <BlogImage
                key={index}
                src={item.imageSrc || ''}
                alt={item.imageAlt || ''}
                caption={item.imageCaption}
              />
            );
          } else {
            return (
              <p key={index} className="leading-relaxed text-slate-700 text-lg">
                {item.content}
              </p>
            );
          }
        })}
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">Ready to Optimize Your Resume?</h2>
        <p className="mb-6 text-slate-700">
          Put these tips into practice with our AI-powered resume analyzer. Get your ATS score and personalized improvement suggestions.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/#resume-analyzer"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Resume Analyzer
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Read More Articles
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      <section className="border-t border-slate-200 pt-8">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Related Articles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(blogPosts)
            .filter(([key]) => key !== slug)
            .slice(0, 2)
            .map(([key, relatedPost]) => (
              <Link
                key={key}
                to={`/blog/${key}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={relatedPost.heroImage}
                    alt={relatedPost.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-slate-500">{relatedPost.readTime}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{relatedPost.excerpt}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
