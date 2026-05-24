import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  external?: boolean;
};

const projects: Project[] = [
  {
    title: "Cortex",
    description: "A second-brain note-taking app for PMs — markdown capture, natural-language dates, wikilinks, graph view, local-first storage, and Claude-powered next-action suggestions.",
    tags: ["React", "Claude API", "Local-first"],
    link: "https://github.com/SAMBAn1/Cortex",
    external: true,
  },
  {
    title: "sambitxsamba.com",
    description: "Personal product portfolio and writing hub — the site you're reading right now. Vite + React + shadcn-ui, with a custom blog system and reading experience.",
    tags: ["Portfolio", "Writing", "Design"],
    link: "https://github.com/SAMBAn1/sambitxsamba",
    external: true,
  },
  {
    title: "AI-Native PM Workflow Initiative",
    description: "Created and pitched an AI-native PM/build stack for the Collections Worklist rebuild — combining Lovable, ChatGPT, Codex, GitHub, Supabase, Vercel and Claude. Built the business case and operating model for VP/CPO approval.",
    tags: ["Strategy", "AI-Native", "Operating Model"],
    link: "https://drive.google.com/file/d/1aFZoRTBRF6xcMmVjH-n_wf_8eehcYl_n/view?usp=drivesdk",
    external: true,
  },
  {
    title: "GTM Strategy — i95Dev Ecommerce Portal",
    description: "Freelance short-form GTM guidance deck to reach the first 100 customers — ICP, positioning, demo strategy, acquisition motion and partner-led outreach for wholesalers, distributors and B2B brands on Shopify/Adobe Commerce.",
    tags: ["GTM", "Positioning", "B2B"],
    link: "https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk",
    external: true,
  },
  {
    title: "Hybrid Collections Worklist Operating Model",
    description: "Sanitized product strategy and operating model for an enterprise fintech SaaS — a simulation-first migration path that preserves configurability while adding data-driven scoring, transparency and AI-ready extensibility.",
    tags: ["Strategy", "Enterprise", "Migration"],
    link: "https://drive.google.com/file/d/10ofKzQDKvwCFwT3AiVyrHZ-3w1LgMaRt/view?usp=drivesdk",
    external: true,
  },
  {
    title: "ShrayArchy",
    description: "Co-founded a handmade clay charms brand with 40k+ followers, 1M+ monthly views, and ~$2k monthly revenue through D2C sales and content.",
    tags: ["D2C", "Content", "Entrepreneurship"],
    link: "https://www.shrayarchy.com",
    external: true,
  },
  {
    title: "AI Agents for Autonomous Collections",
    description: "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
  },
  {
    title: "Markov Chain Worklist Engine",
    description: "Patent-pending engine analyzing 1M+ invoice interactions to predict optimal collector actions — projected 60% reduction in manual prioritization and 20% recovery lift.",
    tags: ["Data Science", "Patent", "Optimization"],
    link: "/blog/the-mathematics-of-what-comes-next-markov-chains",
  },
  {
    title: "RadiusOne AR Suite",
    description: "Co-built a net-new SMB-focused SaaS product line from 0→1; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
    tags: ["0→1 Product", "SMB SaaS", "Growth"],
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
            / work
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Things I've <span className="italic text-gradient">built.</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {projects.map((project, i) => {
            const isLinked = !!project.link;
            const Wrapper: any = isLinked ? "a" : "div";
            const linkProps = isLinked
              ? project.external
                ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                : { href: project.link }
              : {};

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Wrapper
                  {...linkProps}
                  className={`block py-8 border-t border-border transition-colors duration-300 px-4 -mx-4 rounded-sm group ${
                    isLinked ? "hover:bg-primary/5 cursor-pointer" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl mb-2 transition-colors duration-300 group-hover:text-primary inline-flex items-center gap-2">
                        {project.title}
                        {isLinked && (
                          <ArrowUpRight
                            className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        {project.description}
                      </p>
                    </div>
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
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
