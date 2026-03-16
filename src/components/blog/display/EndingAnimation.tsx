import { motion } from "framer-motion";

const scattered = [
  "TN", "IPS", "VA", "OLED", "LED", "Mini-LED",
  "HDR", "240Hz", "1ms", "Retina", "NanoCell",
];

const EndingAnimation = () => (
  <div className="my-24 py-16">
    <div className="max-w-md mx-auto relative">
      {/* Scattered terms that fade */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {scattered.map((term, i) => (
          <motion.span
            key={term}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.8 }}
            className="text-xs font-body text-muted-foreground/30"
          >
            {term}
          </motion.span>
        ))}
      </div>

      {/* Resolved diagram */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex items-center justify-center gap-10"
      >
        <div className="text-center">
          <div className="w-16 h-10 border border-border/40 rounded-sm mx-auto mb-2 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-muted-foreground/10" />
          </div>
          <p className="text-[10px] font-body text-muted-foreground/40 tracking-wider uppercase">
            Light behind
          </p>
        </div>

        <span className="text-muted-foreground/20 text-xs font-body">or</span>

        <div className="text-center">
          <div className="w-16 h-10 border border-primary/30 rounded-sm mx-auto mb-2 grid grid-cols-4 grid-rows-2 gap-px p-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-[1px] ${
                  i % 3 === 0 ? "bg-transparent" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] font-body text-primary/40 tracking-wider uppercase">
            Light from each pixel
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 1 }}
        className="text-center text-sm font-body text-muted-foreground/50 italic mt-10"
      >
        Once the system is clear, the choice becomes easier.
      </motion.p>
    </div>
  </div>
);

export default EndingAnimation;
