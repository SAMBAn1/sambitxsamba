import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Agents for Autonomous Collections",
    description: "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
    link: "#",
  },
  {
    title: "Markov Chain Worklist Engine",
    description: "Patent-pending engine analyzing 1M+ invoice interactions to predict optimal collector actions, projected to reduce manual prioritization by 60%.",
    tags: ["Data Science", "Patent", "Optimization"],
    link: "#",
  },
  {
    title: "RadiusOne AR Suite",
    description: "Co-built a net-new SMB-focused SaaS product line from 0→1; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
    tags: ["0→1 Product", "SMB SaaS", "Growth"],
    link: "#",
  },
  {
    title: "Tags & Workflows Platform",
    description: "Shipped tagging and workflow automation features — users created 200k+ tags applied 20M+ times, driving 35% adoption increase across 370 clients.",
    tags: ["Workflow Automation", "Scale", "UX"],
    link: "#",
  },
  {
    title: "CRM Integration Hub",
    description: "Delivered 20+ API-based CRM integrations (HubSpot, FollowUpBoss, KV Core, BoomTown, Lofty) for a US real estate platform.",
    tags: ["API Integrations", "CRM", "Proptech"],
    link: "#",
  },
  {
    title: "KW Command Partnership",
    description: "Built strategic CRM partnership with Keller Williams, retaining 20 at-risk clients and protecting $2.4M ARR.",
    tags: ["Partnerships", "Retention", "Strategy"],
    link: "#",
  },
  {
    title: "ShrayArchy",
    description: "Co-founded a handmade clay charms brand with 40k+ followers, 1M+ monthly views, and ~$2k monthly revenue through D2C sales and content.",
    tags: ["D2C", "Content", "Entrepreneurship"],
    link: "https://www.instagram.com/shrayarchy/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Things I've <span className="italic text-gradient">built.</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block py-8 border-t border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-body text-muted-foreground border border-border px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
