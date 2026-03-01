import { motion } from "framer-motion";

const skills = [
  "Product Strategy",
  "AI/ML Products",
  "User Research",
  "Agile & Scrum",
  "CRM Integrations",
  "Data Analytics",
  "Figma & UX",
  "Enterprise SaaS",
];

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
            / about me
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Building products{" "}
              <span className="italic text-gradient">people love.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-medium">Product Manager</span> at{" "}
                <span className="text-foreground">HighRadius</span>, where I ship AI agents for autonomous
                collections across an enterprise AR platform used by 370+ customers and 4,000+ collectors.
              </p>
              <p>
                Previously, I built CRM integrations at Fello, co-built the RadiusOne SMB suite,
                and co-founded <span className="text-foreground">ShrayArchy</span> — a handmade clay
                charms brand with 40k+ followers and 1M+ monthly views.
              </p>
              <p>
                B.Tech in Computer Science from KIIT University. Outside work, I'm a top 3% Counter-Strike 2
                player and nerdy about competitive esports and strategy games.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
