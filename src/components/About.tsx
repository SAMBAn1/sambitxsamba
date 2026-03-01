import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            About
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Driven by curiosity,{" "}
              <span className="italic text-gradient">built with purpose.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
              <p>
                I'm a developer and designer who loves building things for the web.
                With a focus on clean architecture and delightful user experiences,
                I bring ideas to life through code.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                reading about design systems, or contributing to open-source projects.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {["React", "TypeScript", "Node.js", "Design Systems", "Next.js", "Tailwind CSS", "PostgreSQL", "Figma"].map(
              (skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="py-4 border-t border-border"
                >
                  <span className="text-foreground font-body text-sm font-medium">
                    {skill}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
