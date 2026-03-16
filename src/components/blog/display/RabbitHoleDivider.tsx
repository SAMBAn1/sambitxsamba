import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const terms = ["TN", "IPS", "OLED", "LED", "HDR", "240Hz", "1ms", "VA", "Mini-LED", "Retina"];

const RabbitHoleDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Progress 0→1 as the element scrolls through viewport
  const progress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <div ref={ref} className="my-24 py-16 relative overflow-hidden">
      <div className="max-w-xl mx-auto relative h-48">
        {/* Scattered terms that fade out */}
        {terms.map((term, i) => {
          const startX = ((i * 73) % 100) - 50; // pseudo-random spread
          const startY = ((i * 37) % 80) - 40;

          return (
            <motion.span
              key={term}
              style={{
                opacity: useTransform(progress, [0, 0.4], [0.6, 0]),
                x: useTransform(progress, [0, 0.5], [startX, 0]),
                y: useTransform(progress, [0, 0.5], [startY, 0]),
              }}
              className="absolute left-1/2 top-1/2 text-sm font-body text-muted-foreground/50"
            >
              {term}
            </motion.span>
          );
        })}

        {/* Resolved buckets that fade in */}
        <motion.div
          style={{ opacity: useTransform(progress, [0.4, 0.8], [0, 1]) }}
          className="absolute inset-0 flex items-center justify-center gap-12"
        >
          <div className="text-center">
            <div className="w-px h-8 bg-border mx-auto mb-3" />
            <p className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
              Backlit displays
            </p>
            <p className="text-[11px] font-body text-muted-foreground/40">
              TN · IPS · VA
            </p>
          </div>
          <div className="w-px h-16 bg-border/30" />
          <div className="text-center">
            <div className="w-px h-8 bg-primary/30 mx-auto mb-3" />
            <p className="text-xs font-body tracking-[0.2em] uppercase text-primary/60 mb-2">
              Self-emissive displays
            </p>
            <p className="text-[11px] font-body text-muted-foreground/40">
              OLED
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RabbitHoleDivider;
