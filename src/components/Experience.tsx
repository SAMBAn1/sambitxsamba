import { motion } from "framer-motion";
import { useState } from "react";

const experiences = [
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
    company: "HighRadius",
    companyLabel: "HighRadius (RadiusOne)",
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

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experiences[activeIndex];

  return (
    <section id="experience" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            / experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Where I've <span className="italic text-gradient">worked.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:items-start">
          {/* Tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border md:min-h-[560px]">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`text-left px-4 py-3 font-body text-sm whitespace-nowrap transition-colors border-b-2 md:border-b-0 md:border-l-2 -mb-px md:mb-0 md:-ml-px ${
                  i === activeIndex
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {exp.companyLabel || exp.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[540px]"
          >
            <h3 className="font-display text-xl md:text-2xl mb-1">
              {active.role}{" "}
              <span className="text-primary">@ {active.company}</span>
            </h3>
            <p className="text-muted-foreground font-body text-sm mb-1">
              {active.period} · {active.location}
            </p>
            <p className="text-muted-foreground font-body text-xs italic mb-6">
              {active.description}
            </p>
            <ul className="space-y-4">
              {active.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                  <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
