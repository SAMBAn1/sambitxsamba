import { motion } from "framer-motion";
import { useState } from "react";

interface Factor {
  label: string;
  bad: string;
  good: string;
}

const factors: Factor[] = [
  { label: "Brightness", bad: "Too high", good: "Balanced" },
  { label: "Glare", bad: "Present", good: "Reduced" },
  { label: "Posture", bad: "Hunched", good: "Aligned" },
  { label: "Distance", bad: "Too close", good: "Comfortable" },
];

const EyeComfortDiagram = () => {
  const [toggles, setToggles] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setToggles((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="my-16">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-8 text-center">
        Eye comfort is systemic
      </p>

      <div className="max-w-sm mx-auto">
        {/* Minimal desk scene */}
        <div className="relative border border-border/40 rounded-sm p-8 bg-card mb-6">
          {/* Monitor */}
          <div className="mx-auto w-32 h-20 border border-border/60 rounded-sm bg-background flex items-center justify-center mb-2">
            <motion.div
              animate={{
                opacity: Object.values(toggles).filter(Boolean).length > 2 ? 0.6 : 0.2,
              }}
              className="w-24 h-14 bg-primary/10 rounded-[1px]"
            />
          </div>
          {/* Stand */}
          <div className="mx-auto w-px h-4 bg-border/40" />
          <div className="mx-auto w-16 h-px bg-border/40" />

          {/* Ambient indicator */}
          <motion.div
            animate={{
              opacity: toggles[0] ? 0.08 : 0.25,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-primary/10 rounded-sm pointer-events-none"
          />
        </div>

        {/* Toggle factors */}
        <div className="grid grid-cols-2 gap-3">
          {factors.map((f, i) => {
            const isGood = toggles[i];
            return (
              <button
                key={f.label}
                onClick={() => toggle(i)}
                className="text-left border border-border/30 rounded-sm p-3 bg-card hover:border-border/60 transition-colors"
              >
                <p className="text-[10px] font-body tracking-[0.15em] uppercase text-muted-foreground/50 mb-1">
                  {f.label}
                </p>
                <motion.p
                  key={String(isGood)}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs font-body ${
                    isGood ? "text-primary/70" : "text-muted-foreground/60"
                  }`}
                >
                  {isGood ? f.good : f.bad}
                </motion.p>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-muted-foreground/40 font-body mt-4 italic">
          Tap each factor to toggle. Comfort comes from the full setup.
        </p>
      </div>
    </div>
  );
};

export default EyeComfortDiagram;
