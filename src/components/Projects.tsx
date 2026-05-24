import { motion } from "framer-motion";


const projects = [
  {
    title: "Cortex",
    description: "A second-brain note-taking app for PMs — markdown capture, natural-language dates, wikilinks, graph view, local-first storage, and Claude-powered next-action suggestions.",
    tags: ["React", "Claude API", "Local-first"],
    link: "https://github.com/SAMBAn1/Cortex",
  },
  {
    title: "sambitxsamba.com",
    description: "Personal product portfolio and writing hub — the site you're reading right now. Vite + React + shadcn-ui, with a custom blog system and reading experience.",
    tags: ["Portfolio", "Writing", "Design"],
    link: "https://github.com/SAMBAn1/sambitxsamba",
  },
  {
    title: "Strategy Portfolio",
    description: "Sanitized strategy work — AI-Native PM Workflow Initiative (Collections rebuild), i95Dev ecommerce GTM, and a Hybrid Collections Worklist Operating Model.",
    tags: ["Strategy", "GTM", "Operating Models"],
    link: "#workflow",
  },
  {
    title: "AI Agents for Autonomous Collections",
    description: "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
    link: "#",
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
            / work
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Things I've <span className="italic text-gradient">built.</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="block py-8 border-t border-border transition-colors duration-300 hover:bg-primary/5 px-4 -mx-4 rounded-sm group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-2 transition-colors duration-300 group-hover:text-primary">
                    {project.title}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
