import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ExpandableFinalChoice = () => {
  const [expanded, setExpanded] = useState(false);

  const reasons = [
    { label: "Why 24″", reason: "Matched my current desk setup and dual-monitor layout without requiring spatial compromises." },
    { label: "Why IPS over TN", reason: "Meaningfully better color and viewing angles. The speed gap with TN has narrowed enough to not matter for my use." },
    { label: "Why 240Hz", reason: "Refresh-rate parity with my existing monitor. No perceptible downgrade when switching between screens." },
    { label: "Why this felt future-proof", reason: "When the TN eventually becomes the secondary, the IPS becomes the primary — and it is already ready for that role." },
  ];

  return (
    <div className="my-16 max-w-sm mx-auto">
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        className="border border-border/50 rounded-sm p-8 bg-card cursor-pointer hover:border-border/80 transition-colors"
      >
        <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-4">What I ended up buying</p>
        <h3 className="font-display text-lg text-foreground mb-4">Lenovo Legion 24‑10</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm font-body">
          <span className="text-muted-foreground/60">Size</span><span className="text-muted-foreground">23.8″</span>
          <span className="text-muted-foreground/60">Resolution</span><span className="text-muted-foreground">FHD</span>
          <span className="text-muted-foreground/60">Panel</span><span className="text-primary">IPS</span>
          <span className="text-muted-foreground/60">Refresh</span><span className="text-muted-foreground">240Hz</span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                {reasons.map((r) => (
                  <div key={r.label}>
                    <p className="text-[10px] font-body tracking-[0.15em] uppercase text-primary/60 mb-1">{r.label}</p>
                    <p className="text-xs font-body text-muted-foreground/70 leading-relaxed">{r.reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-muted-foreground/30 font-body mt-4 italic text-center">
          {expanded ? "Tap to collapse" : "Tap for reasoning"}
        </p>
      </motion.div>
    </div>
  );
};

export default ExpandableFinalChoice;
