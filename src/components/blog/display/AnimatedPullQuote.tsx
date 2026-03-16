import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Enhanced pull quote with subtle word-sharpening animation.
 * Key words blur-in as the quote enters the viewport.
 */
const AnimatedPullQuote = ({
  children,
  highlightWord,
}: {
  children: string;
  highlightWord?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split text to highlight a specific word
  const parts = highlightWord
    ? children.split(new RegExp(`(${highlightWord})`, "i"))
    : [children];

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="my-16 py-8 border-l-2 border-primary pl-8"
    >
      <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
        {parts.map((part, i) =>
          highlightWord && part.toLowerCase() === highlightWord.toLowerCase() ? (
            <motion.span
              key={i}
              initial={{ filter: "blur(6px)", opacity: 0.3 }}
              animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-primary inline-block"
            >
              {part}
            </motion.span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
      {/* Subtle underline draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="w-16 h-px bg-primary/30 mt-4 origin-left"
      />
    </motion.blockquote>
  );
};

export default AnimatedPullQuote;
