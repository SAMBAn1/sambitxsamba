import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Project One",
    description: "A full-stack web application with real-time features and elegant UI.",
    tags: ["React", "TypeScript", "Supabase"],
    link: "#",
  },
  {
    title: "Project Two",
    description: "Design system and component library built for scalability.",
    tags: ["Design Systems", "Storybook", "Tailwind"],
    link: "#",
  },
  {
    title: "Project Three",
    description: "E-commerce platform with seamless checkout and inventory management.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    link: "#",
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
