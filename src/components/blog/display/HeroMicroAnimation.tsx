import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * A minimal animated display diagram showing "light becoming image."
 * Alternates between Backlit and Self-emissive states on a slow loop.
 */
const HeroMicroAnimation = () => {
  const [phase, setPhase] = useState<"backlit" | "emissive">("backlit");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === "backlit" ? "emissive" : "backlit"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-16 flex flex-col items-center gap-6">
      {/* Screen frame */}
      <div className="relative w-64 h-40 border border-border/60 rounded-sm bg-background overflow-hidden">
        {/* Backlit state: single glow behind */}
        <AnimatePresence mode="wait">
          {phase === "backlit" ? (
            <motion.div
              key="backlit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Backlight glow */}
              <div className="absolute inset-0 bg-primary/[0.04]" />
              {/* LCD layer lines */}
              <div className="relative z-10 w-48 h-24 border border-border/30 rounded-sm flex flex-col items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-36 h-px bg-muted-foreground/15" />
                ))}
                <span className="absolute bottom-1 text-[9px] font-body text-muted-foreground/40 tracking-widest uppercase">
                  LCD layer
                </span>
              </div>
              {/* Upward light arrows */}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary/10 to-transparent"
              />
            </motion.div>
          ) : (
            <motion.div
              key="emissive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Pixel grid */}
              <div className="grid grid-cols-8 grid-rows-5 gap-1 p-4">
                {Array.from({ length: 40 }).map((_, i) => {
                  const isOff = i % 7 === 0 || i % 11 === 0;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOff ? 0 : 1 }}
                      transition={{ delay: i * 0.02, duration: 0.6 }}
                      className={`w-3 h-3 rounded-[1px] ${
                        isOff ? "bg-transparent" : "bg-primary/40"
                      }`}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground/60"
      >
        {phase === "backlit" ? "Backlit" : "Self-emissive"}
      </motion.p>
    </div>
  );
};

export default HeroMicroAnimation;
