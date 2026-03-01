import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleAvatar from "@/components/ParticleAvatar";

const roles = ["Product Manager.", "Builder.", "Creator."];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 50);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-subtle)" }} />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            hi, <span className="text-gradient italic">sambit</span> here
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mb-4">
            I'm a Product Manager obsessed with building AI-first enterprise SaaS products.
            Currently shipping autonomous AI agents at{" "}
            <a href="https://www.highradius.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              HighRadius
            </a>
            .
          </p>
          <p className="text-foreground text-xl md:text-2xl font-body font-medium mb-10 h-8">
            {text}
            <span className="inline-block w-0.5 h-6 bg-primary ml-0.5 animate-pulse" />
          </p>
          <div className="flex gap-4">
            <a
              href="#experience"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide rounded-sm hover-lift"
            >
              View Experience
            </a>
            <a
              href="mailto:sambit.samantaray2000@gmail.com"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground font-body font-medium text-sm tracking-wide rounded-sm hover-lift hover:border-primary transition-colors"
            >
              Say Hi ✉
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square max-w-lg ml-auto">
            <ParticleAvatar className="w-full h-full" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
