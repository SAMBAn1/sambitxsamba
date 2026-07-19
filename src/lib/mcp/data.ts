// Static portfolio content served by MCP tools. Kept in sync manually with the
// site's About / Experience / Projects / Workflow / Contact components.

export const profile = {
  name: "Sambit Samantaray",
  title: "Product Manager",
  currentRole: "Product Manager, Collections Product at HighRadius",
  location: "Hyderabad, India",
  website: "https://sambitxsamba.com",
  summary:
    "Product Manager at HighRadius shipping AI agents for autonomous collections across an enterprise AR platform used by 370+ customers and 4,000+ collectors. Co-authored the 2025/26 Collections roadmap with the VP and CPO, and champions Claude Code and AI-native workflows across the PM org. Previously built CRM integrations at Fello, co-built the RadiusOne SMB suite, and co-founded ShrayArchy — a handmade clay charms brand with 40k+ followers and 1M+ monthly views. B.Tech in Computer Science from KIIT University. Top 3% Counter-Strike 2 player.",
  skills: [
    "Product Strategy",
    "AI/ML Products",
    "User Research",
    "Agile & Scrum",
    "CRM Integrations",
    "Data Analytics",
    "User Experience",
    "AI-Native PM",
  ],
  socials: {
    email: "sambit.samantaray2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/sambit-samantaray-225434166/",
    instagram: "https://www.instagram.com/i_am_a_samba/",
    github: "https://github.com/SAMBAn1",
  },
};

export const experience = [
  {
    company: "HighRadius",
    role: "Product Manager, Collections Product",
    period: "Feb 2025 – Present",
    location: "Hyderabad",
    description: "Fintech B2B SaaS, AI Agents for office of the CFO",
    highlights: [
      "Shipped AI agents for Autonomous Collections resulting in 50% FTE reduction through autonomous prioritization and work allocation.",
      "Authored a proprietary ML algorithm for the AI + Human Work Assignment Agent, improving work allocation to collectors by 30%.",
      "Co-authored the 2025 and 2026 Collections roadmap with the Product VP and CPO, aligning on an AI-first strategy and championing Claude Code and workflows in the PM org.",
      "Led 20+ day-in-the-life studies with customers to map collections and dispute workflows, identify gaps, and prioritize automation.",
      "Integrated the in-house no-code analytics platform LiveCube into the AR suite — solving 200+ custom reporting tasks and launching 5 new SaaS products adopted by 14 clients, adding $300K+ ARR.",
      "Proposed a patent-pending Markov chain based Worklist Engine analyzing 1M+ invoice interactions, projected to reduce manual prioritization by 60% and increase recovery rate by 20%.",
      "Led migration plan for 400+ customers from legacy UI to modern React-based experience, increasing collector productivity by 40%.",
    ],
  },
  {
    company: "Fello",
    role: "Associate Product Manager",
    period: "Aug 2024 – Jan 2025",
    location: "Bengaluru",
    description: "Proptech B2B/B2C SaaS, CRM Integrations",
    highlights: [
      "Product lead for CRM and workflow automation in a US real estate platform for independent agents and teams.",
      "Delivered 20+ API-based CRM integrations (HubSpot, FollowUpBoss, KV Core, BoomTown, Lofty).",
      "Built strategic partnership with KW Command CRM and API Nation, retaining 20 at-risk clients and protecting $2.4M ARR.",
      "Reduced onboarding timelines by 20% (10 → 8 days) via automated task workflows and self-setup wizards.",
      "Launched Lead Segments and Workflow Automation features, improving agent productivity by 35%.",
      "Shipped a Cash Offer and one-click quote feature connecting pricing logic, lead data, and partner systems to generate offers in seconds.",
      "Set up a GA + Tag Manager dynamic environment so consultants could simulate customer journeys and debug without engineering involvement.",
      "Designed an in-app currency model driving a 30x increase in add-on purchases.",
    ],
  },
  {
    company: "HighRadius (RadiusOne)",
    role: "Associate Product Manager, RadiusOne AR Suite",
    period: "Apr 2020 – Jun 2024",
    location: "Hyderabad",
    description: "0-100 SMB Product Suite, Workflows",
    highlights: [
      "Co-built the RadiusOne AR suite — a net-new SMB-focused SaaS product line; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
      "Added direct Google Workspace integration, cutting in-app email inbox setup from 5–7 days to a one-click self-serve flow.",
      "Streamlined product editions and configuration, reducing back-end config steps from 60% to 10% and shrinking onboarding from 4 months to 2 months.",
      "Shipped Tags and Workflows — users created 200k+ tags applied 20M+ times to date.",
      "Improved Collections app adoption by 35% across 370 clients and 3,600+ users; raised product NPS by 80% YoY (21 → 38).",
      "Led sprint planning for the largest engineering pod, overseeing multi-year transition from Ext JS to React — shipped 10+ features and mitigated 1,000+ bugs.",
    ],
  },
  {
    company: "ShrayArchy",
    role: "Co-Founder",
    period: "2017 – Present",
    location: "India",
    description: "Handmade clay charms & social media brand",
    highlights: [
      "Co-built a handmade clay charms and lifestyle content brand with 40k+ followers and 1M+ monthly viewership.",
      "Own end-to-end product lifecycle: concepting, pricing, packaging, inventory and launch planning.",
      "Run experiments across Instagram, YouTube and Shopify to improve conversion and community engagement.",
      "Generating ~$2k monthly revenue through direct sales and content monetization.",
    ],
  },
];

export const projects = [
  {
    title: "Cortex",
    category: "featured" as const,
    description:
      "A second-brain note-taking app for PMs — markdown capture, natural-language dates, wikilinks, graph view, local-first storage, and Claude-powered next-action suggestions.",
    tags: ["React", "Claude API", "Local-first"],
    link: "https://samban1.github.io/Cortex/",
  },
  {
    title: "AI-Native PM Workflow Initiative",
    category: "featured" as const,
    description:
      "Pitched an AI-native PM/build stack for the Collections Worklist rebuild — Lovable, ChatGPT, Codex, GitHub, Supabase, Vercel, Claude. Business case and operating model for VP/CPO approval.",
    tags: ["Strategy", "AI-Native", "Operating Model"],
    link: "https://samban1.github.io/case-studies/ai-native-pm-workflow/",
  },
  {
    title: "Hybrid Collections Worklist Operating Model",
    category: "featured" as const,
    description:
      "Sanitized product strategy for an enterprise fintech SaaS — a simulation-first migration path that preserves configurability while adding data-driven scoring, transparency and AI-ready extensibility.",
    tags: ["Strategy", "Enterprise", "Migration"],
    link: "https://samban1.github.io/case-studies/worklist-vision/",
  },
  {
    title: "ShrayArchy",
    category: "featured" as const,
    description:
      "Co-founded a handmade clay charms brand with 40k+ followers, 1M+ monthly views, and ~$2k monthly revenue through D2C sales and content.",
    tags: ["D2C", "Content", "Brand"],
    link: "https://www.shrayarchy.com",
  },
  {
    title: "blog",
    category: "drawer" as const,
    description:
      "Long-form notes on AI-native PM workflows, worklist engineering, and product craft.",
    tags: ["Essays", "Notes"],
    link: "https://sambitxsamba.com/blog",
  },
  {
    title: "RadiusOne AR Suite",
    category: "drawer" as const,
    description:
      "Co-built a net-new SMB-focused SaaS product line from 0→1; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
    tags: ["0→1 Product", "SMB SaaS", "Growth"],
    link: "https://www.highradius.com/company/newsroom/highradius-launches-radiusone-ar-suite/",
  },
  {
    title: "sambitxsamba.com",
    category: "drawer" as const,
    description:
      "Personal product portfolio and writing hub. Vite + React + shadcn-ui, with a custom blog system and reading experience.",
    tags: ["Portfolio", "Writing", "Design"],
    link: "https://github.com/SAMBAn1/sambitxsamba",
  },
  {
    title: "GTM Strategy — i95Dev Ecommerce Portal",
    category: "drawer" as const,
    description:
      "Freelance short-form GTM guidance deck to reach the first 100 customers — ICP, positioning, demo strategy, acquisition motion and partner-led outreach for wholesalers, distributors and B2B brands on Shopify/Adobe Commerce.",
    tags: ["GTM", "Positioning", "B2B"],
    link: "https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk",
  },
  {
    title: "AI Agents for Autonomous Collections",
    category: "drawer" as const,
    description:
      "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
    link: null,
  },
  {
    title: "Markov Chain Worklist Engine",
    category: "drawer" as const,
    description:
      "Patent-pending engine analyzing 1M+ invoice interactions to predict optimal collector actions — projected 60% reduction in manual prioritization and 20% recovery lift.",
    tags: ["Data Science", "Patent", "Optimization"],
    link: null,
  },
];

export const workflow = {
  description:
    "An AI-native PM stack — moving discovery from static mocks to working software, with versioned product guidance shipped every sprint.",
  stages: [
    { name: "Discovery", artifact: "Day-in-the-life notes, problem theses, opportunity maps", tools: ["ChatGPT", "NotebookLM", "Obsidian", "Gemini Gems"] },
    { name: "Ideate", artifact: "Solution sketches, model experiments, custom PM agents", tools: ["ChatGPT", "Gemini Gems", "Google AI Studio", "Codex", "Claude Code", "Obsidian"] },
    { name: "Prototype", artifact: "Working software — live app surfaces, not static mocks", tools: ["Lovable", "Claude Code", "Codex", "Supabase", "Google AI Studio"] },
    { name: "Validate", artifact: "Versioned product guidance, schema, demo loops", tools: ["GitHub", "VSCode", "Gemini Gems", "Claude Code", "Supabase", "Obsidian"] },
    { name: "Ship", artifact: "Deployed surfaces handed to eng with context intact", tools: ["Vercel", "GitHub", "Lovable", "Supabase", "VSCode"] },
  ],
  stack: [
    { name: "Lovable", role: "Build the working prototype" },
    { name: "Claude Code", role: "Pair-program edits & refactors" },
    { name: "ChatGPT", role: "Discovery, framing, writing partner" },
    { name: "Codex", role: "Spec-driven code generation" },
    { name: "Gemini Gems", role: "Custom Gemini agents for repeatable PM tasks" },
    { name: "NotebookLM", role: "RAG + knowledge bank for product context" },
    { name: "Google AI Studio", role: "Quick prototyping & model experimentation" },
    { name: "Obsidian", role: "Second-brain notes & PRD synthesis" },
    { name: "GitHub", role: "Versioned product guidance" },
    { name: "Supabase", role: "Schema, auth, instant backend" },
    { name: "VSCode", role: "Ship-ready code review & merges" },
    { name: "Vercel", role: "Ship to live preview in minutes" },
  ],
};
