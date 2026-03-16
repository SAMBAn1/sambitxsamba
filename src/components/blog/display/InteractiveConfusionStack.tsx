import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const layers = [
  {
    label: "Illumination technology",
    desc: "How the display produces light",
    examples: ["LCD backlight", "Mini-LED", "OLED self-emissive"],
    accent: true,
  },
  {
    label: "Panel structure",
    desc: "How liquid crystals are arranged",
    examples: ["TN", "IPS", "VA"],
    accent: false,
  },
  {
    label: "Performance specifications",
    desc: "Measurable characteristics",
    examples: ["Refresh rate", "Response time", "Brightness (nits)"],
    accent: false,
  },
  {
    label: "Marketing language",
    desc: "Brand labels and category names",
    examples: ["HDR labels", "Eye-care badges", "Gaming certifications"],
    accent: false,
  },
];

const InteractiveConfusionStack = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="my-16">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6 text-center">
        Why display terminology feels confusing
      </p>
      <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`w-full border rounded-sm p-4 cursor-pointer transition-all duration-300 ${
              layer.accent
                ? "bg-primary/[0.06] border-primary/20 hover:border-primary/40"
                : "bg-muted-foreground/[0.04] border-border/50 hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-body text-foreground">{layer.label}</p>
                <p className="text-[11px] font-body text-muted-foreground mt-1">{layer.desc}</p>
              </div>
              <motion.span
                animate={{ rotate: expanded === i ? 45 : 0 }}
                className="text-muted-foreground/30 text-lg shrink-0 ml-3"
              >
                +
              </motion.span>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
                    {layer.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] font-body text-muted-foreground/60 border border-border/30 rounded-sm px-2 py-1"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground font-body mt-4 italic">
        Tap a layer to see examples. Buyers encounter all four at once.
      </p>
    </div>
  );
};

export default InteractiveConfusionStack;
