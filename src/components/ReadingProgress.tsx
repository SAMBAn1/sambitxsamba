import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const sections = [
  { id: "intro", label: "Intro", position: 0.05 },
  { id: "split", label: "The Real Split", position: 0.2 },
  { id: "tn", label: "Why TN Felt Limited", position: 0.4 },
  { id: "ips", label: "Why IPS", position: 0.5 },
  { id: "oled", label: "OLED Benchmark", position: 0.6 },
  { id: "eyes", label: "Eye Comfort", position: 0.72 },
  { id: "bought", label: "What I Bought", position: 0.82 },
  { id: "lesson", label: "Product Lesson", position: 0.92 },
];

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const readProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(readProgress);
      scaleX.set(readProgress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [scaleX]);

  return (
    <>
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      {/* Section markers */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="fixed top-16 z-50 group"
          style={{ left: `${section.position * 100}%` }}
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div
            className="w-[3px] h-[6px] -translate-x-1/2 cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor:
                progress >= section.position
                  ? "hsl(var(--primary) / 0.8)"
                  : "hsl(var(--muted-foreground) / 0.2)",
            }}
          />
          {hoveredSection === section.id && (
            <motion.span
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-body text-muted-foreground/60 bg-card/90 px-2 py-0.5 rounded-sm border border-border/30"
            >
              {section.label}
            </motion.span>
          )}
        </div>
      ))}
    </>
  );
};

export default ReadingProgress;
