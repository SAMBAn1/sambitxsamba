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
      "Integrated Lovable as an orchestration layer for Consultants, reducing configuration timelines by 30%.",
      "Own product roadmap for the Collections product — a cloud-based enterprise AR platform used by 370+ customers and 4,000+ collectors.",
      "Proposed a patent-pending Markov chain based Worklist Engine analyzing 1M+ invoice interactions, projected to reduce manual prioritization by 60%.",
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
      "Built strategic partnership with KW Command CRM, retaining 20 at-risk clients and protecting $2.4M ARR.",
      "Launched Lead Segments and Workflow Automation features, improving agent productivity by 35%.",
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
      "Shipped Tags and Workflows — users created 200k+ tags applied 20M+ times to date.",
      "Improved Collections app adoption by 35% across 370 clients and 3,600+ users; raised product NPS by 80% YoY.",
      "Led sprint planning for the largest engineering pod, overseeing multi-year transition from Ext JS to React.",
      "Streamlined onboarding configuration from 4 months to 2 months (50% reduction).",
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

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
          {/* Tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
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
            className="min-h-[300px]"
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
