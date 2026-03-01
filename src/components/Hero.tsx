import { motion } from "framer-motion";
import profileImage from "@/assets/profile-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-subtle)" }} />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6">
            Creative Developer
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            Hello, I'm{" "}
            <span className="text-gradient italic">Your Name</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed mb-10">
            I craft digital experiences that blend thoughtful design with clean, performant code.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide rounded-sm hover-lift"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground font-body font-medium text-sm tracking-wide rounded-sm hover-lift hover:border-primary transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square max-w-lg ml-auto">
            <div className="absolute -inset-4 rounded-sm border border-primary/20" />
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-sm" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
