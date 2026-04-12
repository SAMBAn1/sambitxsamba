import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Shared: reduced motion hook ── */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* ══════════════════════════════════════════════════════════════
   1. Hero Animation — Backlit → Self-emissive transition
   ══════════════════════════════════════════════════════════════ */
export const HeroDisplayAnimation = () => {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"backlit" | "emissive">("backlit");

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setPhase((p) => (p === "backlit" ? "emissive" : "backlit"));
    }, 4000);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="relative w-full max-w-md mx-auto h-48 mb-12">
      {/* Monitor frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-36 border border-border/60 rounded-sm overflow-hidden bg-background">
          {/* Backlit glow behind */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: phase === "backlit" ? 0.15 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.3), transparent 70%)",
            }}
          />

          {/* Backlit layers */}
          <AnimatePresence>
            {phase === "backlit" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
              >
                {["Backlight", "LCD", "Image"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.6 }}
                    className="w-40 h-5 border border-border/40 rounded-sm flex items-center justify-center"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${0.03 + i * 0.04})`,
                    }}
                  >
                    <span className="text-[8px] font-body text-muted-foreground/60">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Self-emissive pixel grid */}
          <AnimatePresence>
            {phase === "emissive" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="grid grid-cols-8 gap-[3px] p-4">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const off = [3, 7, 12, 18, 23, 31, 37, 42].includes(i);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: off ? 0 : 1 }}
                        transition={{ delay: i * 0.02, duration: 0.4 }}
                        className="w-2.5 h-2.5 rounded-[1px]"
                        style={{
                          backgroundColor: off ? "transparent" : `hsl(var(--primary) / ${0.3 + Math.random() * 0.4})`,
                          boxShadow: off ? "none" : `0 0 4px hsl(var(--primary) / 0.2)`,
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Monitor stand */}
        <div className="absolute bottom-4 w-px h-6 bg-border/40" />
        <div className="absolute bottom-2 w-12 h-px bg-border/40" />
      </div>

      {/* Labels */}
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-body text-muted-foreground/50 tracking-[0.2em] uppercase"
        animate={{ opacity: 1 }}
        key={phase}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {phase === "backlit" ? "Backlit" : "Self-emissive"}
      </motion.span>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   2. Ambient Intro Illustration
   ══════════════════════════════════════════════════════════════ */
export const AmbientIntro = () => (
  <div className="relative w-full h-32 my-8 overflow-hidden pointer-events-none select-none" aria-hidden>
    <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-[0.06]">
      {/* Monitor 1 */}
      <div className="w-28 h-20 border border-foreground rounded-sm relative">
        <div className="absolute -bottom-3 left-1/2 w-px h-3 bg-foreground" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-px bg-foreground" />
      </div>
      {/* Monitor 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-24 h-16 border border-foreground rounded-sm border-dashed relative"
      >
        <div className="absolute -bottom-3 left-1/2 w-px h-3 bg-foreground" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-px bg-foreground" />
      </motion.div>
    </div>
    {/* Floating spec labels */}
    {["TN", "IPS", "240Hz", "OLED", "HDR"].map((label, i) => (
      <motion.span
        key={label}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + i * 0.2, duration: 1.2 }}
        className="absolute font-body text-foreground text-xs"
        style={{
          left: `${15 + i * 16}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
      >
        {label}
      </motion.span>
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════════
   3. Confusion to Clarity Scroll Transition
   ══════════════════════════════════════════════════════════════ */
export const ConfusionToClarity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const terms = [
    { label: "TN", bucket: "backlit" },
    { label: "IPS", bucket: "backlit" },
    { label: "VA", bucket: "backlit" },
    { label: "Mini-LED", bucket: "backlit" },
    { label: "OLED", bucket: "emissive" },
    { label: "HDR", bucket: "other" },
    { label: "240Hz", bucket: "other" },
    { label: "1ms", bucket: "other" },
    { label: "LED", bucket: "backlit" },
  ];

  const scatteredPositions = [
    { x: -60, y: -30 }, { x: 40, y: -50 }, { x: -80, y: 20 },
    { x: 70, y: 10 }, { x: -20, y: 50 }, { x: 90, y: -20 },
    { x: -50, y: -60 }, { x: 30, y: 40 }, { x: 60, y: 60 },
  ];

  return (
    <div ref={ref} className="my-20 py-16">
      <div className="relative h-64 flex items-center justify-center">
        {!isInView ? (
          /* Scattered state */
          <div className="relative w-full max-w-lg h-full">
            {terms.map((term, i) => (
              <motion.span
                key={term.label}
                className="absolute font-body text-sm text-muted-foreground/60"
                style={{
                  left: `calc(50% + ${scatteredPositions[i].x}px)`,
                  top: `calc(50% + ${scatteredPositions[i].y}px)`,
                }}
              >
                {term.label}
              </motion.span>
            ))}
          </div>
        ) : (
          /* Organized state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex gap-12 md:gap-20"
          >
            <div className="text-center">
              <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-4">Backlit displays</p>
              <div className="flex flex-col gap-2">
                {terms.filter(t => t.bucket === "backlit").map((t, i) => (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-sm font-body text-muted-foreground"
                  >
                    {t.label}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="w-px bg-border/30" />
            <div className="text-center">
              <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-4">Self-emissive</p>
              <div className="flex flex-col gap-2">
                {terms.filter(t => t.bucket === "emissive").map((t, i) => (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-sm font-body text-muted-foreground"
                  >
                    {t.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center text-xs font-body text-muted-foreground/40 mt-4 italic"
      >
        From scattered terminology to a simpler mental model.
      </motion.p>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   4. Layered Display Explainer (scroll-triggered)
   ══════════════════════════════════════════════════════════════ */
export const LayeredDisplayExplainer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const layer1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const layer2 = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const layer3 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const layer4 = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  const layers = [
    { label: "Backlight", opacity: layer1, color: "hsl(var(--muted-foreground) / 0.15)" },
    { label: "LCD layer", opacity: layer2, color: "hsl(var(--primary) / 0.08)" },
    { label: "Color filter", opacity: layer3, color: "hsl(var(--primary) / 0.12)" },
    { label: "Visible image", opacity: layer4, color: "hsl(var(--foreground) / 0.06)" },
  ];

  return (
    <div ref={ref} className="my-20 py-8">
      <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-8 text-center">
        How a backlit display builds an image
      </p>
      <div className="flex flex-col items-center gap-2 max-w-xs mx-auto">
        {layers.map((layer) => (
          <motion.div
            key={layer.label}
            className="w-full h-12 rounded-sm border border-border/30 flex items-center justify-center"
            style={{ opacity: layer.opacity, backgroundColor: layer.color }}
          >
            <span className="text-[10px] font-body text-muted-foreground/70">{layer.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   5. Rabbit Hole Scroll Divider
   ══════════════════════════════════════════════════════════════ */
export const RabbitHoleDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const monitorScale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.6]);
  const gridOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 0.4]);

  return (
    <div ref={ref} className="my-24 py-16 relative overflow-hidden">
      <div className="flex items-center justify-center h-32 relative">
        {/* Monitor shape that shrinks */}
        <motion.div
          className="w-20 h-14 border border-border/40 rounded-sm relative"
          style={{ scale: monitorScale }}
        >
          <div className="absolute -bottom-2 left-1/2 w-px h-2 bg-border/40" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-px bg-border/40" />
        </motion.div>

        {/* Abstract pixel grid that fades in */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: gridOpacity }}
        >
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i % 4 === 0
                    ? "hsl(var(--primary) / 0.3)"
                    : "hsl(var(--muted-foreground) / 0.1)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Horizontal line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-border/20" />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   6. Enhanced Comparison Matrix with Hover States
   ══════════════════════════════════════════════════════════════ */
export const EnhancedTechMatrix = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const techs = [
    {
      name: "TN", color: 2, viewing: 1, contrast: 2, speed: 4, blacks: 1,
      use: "Competitive gaming",
      note: "TN prioritizes speed, often at the cost of viewing comfort and color richness.",
    },
    {
      name: "IPS", color: 4, viewing: 4, contrast: 3, speed: 3, blacks: 2,
      use: "Creative work, general use",
      note: "IPS feels like the practical all-rounder for work and everyday visual quality.",
    },
    {
      name: "VA", color: 3, viewing: 3, contrast: 4, speed: 2, blacks: 3,
      use: "Movies, dark content",
      note: "VA often sits between the two, with stronger contrast than IPS in many cases.",
    },
    {
      name: "OLED", color: 5, viewing: 5, contrast: 5, speed: 5, blacks: 5,
      use: "Premium everything",
      note: "OLED delivers the most dramatic image quality because each pixel emits its own light.",
    },
  ];

  const DotBar = ({ value, max = 5 }: { value: number; max?: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: i < value
              ? "hsl(var(--primary) / 0.7)"
              : "hsl(var(--muted-foreground) / 0.15)",
          }}
        />
      ))}
    </div>
  );

  const rows = ["Color", "Viewing", "Contrast", "Speed", "Blacks", "Use"];

  return (
    <div className="my-16">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 text-muted-foreground/40 text-xs tracking-[0.15em] uppercase font-normal w-24" />
              {techs.map((t) => (
                <th
                  key={t.name}
                  className="text-left py-3 px-4 text-xs tracking-[0.15em] uppercase font-normal cursor-default transition-colors duration-300"
                  style={{
                    color: hovered === t.name
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.5)",
                  }}
                  onMouseEnter={() => setHovered(t.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="border-b border-border/30">
                <td className="py-3 pr-4 text-muted-foreground/40 text-xs tracking-[0.1em] uppercase">{row}</td>
                {techs.map((t) => {
                  const key = row.toLowerCase() as keyof typeof t;
                  const val = key === "use" ? t.use : (t[key] as number);
                  const isHovered = hovered === t.name;
                  return (
                    <td
                      key={t.name}
                      className="py-3 px-4 transition-opacity duration-300"
                      style={{ opacity: hovered && !isHovered ? 0.3 : 1 }}
                      onMouseEnter={() => setHovered(t.name)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {typeof val === "number" ? (
                        <DotBar value={val} />
                      ) : (
                        <span className="text-muted-foreground text-xs">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hover note */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-body text-muted-foreground/60 italic mt-4 text-center"
          >
            {techs.find((t) => t.name === hovered)?.note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   7. Pixel Blackout Illustration
   ══════════════════════════════════════════════════════════════ */
export const PixelBlackout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="my-16">
      <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-6 text-center">
        Backlit dark vs true black
      </p>
      <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
        {/* Backlit "dark" */}
        <div className="text-center">
          <div className="grid grid-cols-4 gap-1 mx-auto w-fit mb-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.03 }}
                className="w-4 h-4 rounded-[1px]"
                style={{
                  backgroundColor: [2, 5, 9, 14].includes(i)
                    ? "hsl(var(--muted-foreground) / 0.08)"
                    : "hsl(var(--primary) / 0.4)",
                  boxShadow: [2, 5, 9, 14].includes(i)
                    ? "inset 0 0 4px hsl(var(--muted-foreground) / 0.06)"
                    : "none",
                }}
              />
            ))}
          </div>
          <p className="text-[10px] font-body text-muted-foreground/50">Backlit — dark pixels still glow faintly</p>
        </div>

        {/* Self-emissive "dark" */}
        <div className="text-center">
          <div className="grid grid-cols-4 gap-1 mx-auto w-fit mb-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.03 }}
                className="w-4 h-4 rounded-[1px]"
                style={{
                  backgroundColor: [2, 5, 9, 14].includes(i)
                    ? "transparent"
                    : "hsl(var(--primary) / 0.5)",
                  border: [2, 5, 9, 14].includes(i)
                    ? "1px solid hsl(var(--border) / 0.2)"
                    : "none",
                }}
              />
            ))}
          </div>
          <p className="text-[10px] font-body text-muted-foreground/50">Self-emissive — off means truly off</p>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   8. Enhanced Confusion Stack with hover interactions
   ══════════════════════════════════════════════════════════════ */
export const EnhancedConfusionStack = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const layers = [
    {
      label: "Marketing language",
      desc: "LED TV, Retina, NanoCell…",
      examples: ["HDR labels", "Eye-care badges", "Gaming tags"],
      opacity: "bg-muted-foreground/10",
    },
    {
      label: "Performance specs",
      desc: "Refresh rate, HDR, response time",
      examples: ["240Hz", "1ms response", "600 nits"],
      opacity: "bg-muted-foreground/15",
    },
    {
      label: "Panel structure",
      desc: "TN, IPS, VA — liquid crystal arrangement",
      examples: ["TN", "IPS", "VA"],
      opacity: "bg-muted-foreground/20",
    },
    {
      label: "Illumination technology",
      desc: "Backlit (LED/Mini-LED) vs Self-emissive (OLED)",
      examples: ["LCD", "Mini-LED", "OLED"],
      opacity: "bg-primary/20",
    },
  ];

  return (
    <div className="my-16">
      <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-6 text-center">
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
            className={`w-full ${layer.opacity} border border-border/50 rounded-sm p-4 cursor-pointer transition-all duration-300`}
            onClick={() => setExpanded(expanded === i ? null : i)}
            onMouseEnter={() => setExpanded(i)}
            onMouseLeave={() => setExpanded(null)}
          >
            <p className="text-xs font-body text-foreground">{layer.label}</p>
            <p className="text-[11px] font-body text-muted-foreground mt-1">{layer.desc}</p>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 mt-3 pt-2 border-t border-border/30">
                    {layer.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] font-body text-primary/70 bg-primary/5 px-2 py-0.5 rounded-sm"
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
        {/* Connecting lines */}
        {expanded !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-px h-4 bg-primary/20"
          />
        )}
      </div>
      <p className="text-center text-sm text-muted-foreground font-body mt-4 italic">
        Consumers encounter all four layers at once — with no guide to separate them.
      </p>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   9. Eye Comfort Ambient Illustration
   ══════════════════════════════════════════════════════════════ */
export const EyeComfortIllustration = () => {
  const [active, setActive] = useState<string | null>(null);

  const factors = [
    { id: "brightness", label: "Brightness", bad: "Too high", good: "Balanced", x: 25, y: 15 },
    { id: "glare", label: "Glare", bad: "Present", good: "Reduced", x: 70, y: 20 },
    { id: "posture", label: "Posture", bad: "Hunched", good: "Aligned", x: 20, y: 75 },
    { id: "distance", label: "Distance", bad: "Too close", good: "Comfortable", x: 75, y: 70 },
  ];

  return (
    <div className="my-16">
      <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-6 text-center">
        Eye comfort is about the full setup
      </p>
      <div className="relative max-w-xs mx-auto h-56 border border-border/30 rounded-sm bg-card/50 overflow-hidden">
        {/* Minimal desk setup lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Monitor */}
          <rect x="65" y="20" width="70" height="45" rx="2" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
          <line x1="100" y1="65" x2="100" y2="75" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
          <line x1="85" y1="75" x2="115" y2="75" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
          {/* Desk */}
          <line x1="40" y1="80" x2="160" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
          {/* Person silhouette */}
          <circle cx="100" cy="100" r="5" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" fill="none" />
          <line x1="100" y1="105" x2="100" y2="125" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
        </svg>

        {/* Interactive dots */}
        {factors.map((f) => (
          <motion.button
            key={f.id}
            className="absolute w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center cursor-pointer"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(active === f.id ? null : f.id)}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          </motion.button>
        ))}

        {/* Active label */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute bottom-3 left-0 right-0 text-center"
            >
              <span className="text-[10px] font-body text-primary/80 bg-primary/5 px-3 py-1 rounded-sm">
                {factors.find((f) => f.id === active)?.label}:{" "}
                <span className="text-destructive/60 line-through mr-1">
                  {factors.find((f) => f.id === active)?.bad}
                </span>
                →{" "}
                <span className="text-primary">
                  {factors.find((f) => f.id === active)?.good}
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   10. Enhanced Final Choice Card with reasoning reveal
   ══════════════════════════════════════════════════════════════ */
export const EnhancedFinalChoiceCard = () => {
  const [expanded, setExpanded] = useState(false);

  const reasons = [
    { spec: "23.8″", why: "Same desk footprint — no layout disruption" },
    { spec: "IPS", why: "Meaningful color and viewing angle upgrade from TN" },
    { spec: "240Hz", why: "Refresh-rate parity with existing monitor" },
    { spec: "FHD", why: "Resolution consistency across both screens" },
  ];

  return (
    <div className="my-16">
      <motion.div
        className="border border-border/50 rounded-sm p-8 bg-card max-w-sm mx-auto cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ borderColor: "hsl(var(--primary) / 0.3)" }}
      >
        <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-4">What I ended up buying</p>
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
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-4 border-t border-border/30 space-y-3">
                <p className="text-[10px] font-body tracking-[0.15em] uppercase text-muted-foreground/40 mb-2">Why each choice mattered</p>
                {reasons.map((r) => (
                  <div key={r.spec} className="flex items-start gap-3">
                    <span className="text-xs font-body text-primary/70 shrink-0 w-12">{r.spec}</span>
                    <span className="text-xs font-body text-muted-foreground/60">{r.why}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-muted-foreground/30 font-body mt-4 text-center">
          {expanded ? "Click to collapse" : "Click to see reasoning"}
        </p>
      </motion.div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   11. Pull Quote with word sharpening
   ══════════════════════════════════════════════════════════════ */
export const SharpPullQuote = ({
  children,
  sharpWords = [],
}: {
  children: string;
  sharpWords?: string[];
}) => {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = children.split(" ");

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="my-16 py-8 border-l-2 border-primary pl-8"
    >
      <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
        {words.map((word, i) => {
          const isSharp = sharpWords.some((sw) => word.toLowerCase().includes(sw.toLowerCase()));
          return (
            <motion.span
              key={i}
              initial={isSharp ? { filter: "blur(4px)", opacity: 0.4 } : {}}
              animate={isInView && isSharp ? { filter: "blur(0px)", opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.02, duration: 0.6 }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </motion.blockquote>
  );
};

/* ══════════════════════════════════════════════════════════════
   13. Final Ending Animation
   ══════════════════════════════════════════════════════════════ */
export const FinalEndingAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const terms = ["TN", "IPS", "VA", "OLED", "HDR", "LED", "Mini-LED", "240Hz"];

  return (
    <div ref={ref} className="my-24 py-16">
      <div className="relative h-48 max-w-md mx-auto">
        {/* Scattered terms that settle */}
        {terms.map((term, i) => (
          <motion.span
            key={term}
            className="absolute text-xs font-body text-muted-foreground/30"
            initial={{
              left: `${10 + (i * 11) % 80}%`,
              top: `${10 + (i * 17) % 60}%`,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    left: i < 5 ? `${15 + i * 8}%` : `${55 + (i - 5) * 12}%`,
                    top: i < 5 ? "70%" : "70%",
                    opacity: 0.5,
                  }
                : {}
            }
            transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: "easeOut" }}
          >
            {term}
          </motion.span>
        ))}

        {/* Two buckets */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="w-16 h-10 border border-border/30 rounded-sm mb-2 mx-auto flex items-center justify-center">
              <div className="w-10 h-4 bg-muted-foreground/10 rounded-sm" />
            </div>
            <span className="text-[9px] font-body text-muted-foreground/40 tracking-[0.15em] uppercase">Backlit</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-10 border border-primary/20 rounded-sm mb-2 mx-auto flex items-center justify-center">
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-[1px]"
                    style={{
                      backgroundColor: i % 3 === 0 ? "transparent" : "hsl(var(--primary) / 0.4)",
                    }}
                  />
                ))}
              </div>
            </div>
            <span className="text-[9px] font-body text-muted-foreground/40 tracking-[0.15em] uppercase">Self-emissive</span>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="text-center text-sm font-body text-muted-foreground/50 italic mt-8"
      >
        Once the system is clear, the choice becomes easier.
      </motion.p>
    </div>
  );
};
