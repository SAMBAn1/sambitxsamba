import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Shared ── */
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

const dur = (d: number, reduced: boolean) => (reduced ? 0 : d);

/* ═══════════════════════════════════════════════════════════════
   1. OPENING — "How a screen makes an image"
   ═══════════════════════════════════════════════════════════════ */
export const HeroIllustration = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const rm = useReducedMotion();

  return (
    <div ref={ref} className="my-16 relative">
      <div className="border border-border/30 rounded-sm bg-card/50 p-8 md:p-12 overflow-hidden">
        <p className="text-primary/60 text-[10px] font-body tracking-[0.25em] uppercase mb-8 text-center">
          How a screen makes an image
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Backlit side */}
          <div className="relative flex flex-col items-center">
            {/* Display frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: dur(1, rm) }}
              className="relative w-full max-w-[240px] aspect-[4/3] border border-border/40 rounded-sm overflow-hidden"
            >
              {/* Backlight glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.15 } : {}}
                transition={{ duration: dur(1.5, rm), delay: dur(0.5, rm) }}
                className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent"
              />

              {/* Layer lines */}
              {[0.25, 0.5, 0.75].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 0.3 } : {}}
                  transition={{ duration: dur(1, rm), delay: dur(1 + i * 0.3, rm) }}
                  className="absolute left-0 right-0 h-px bg-muted-foreground origin-left"
                  style={{ top: `${pos * 100}%` }}
                />
              ))}

              {/* Layer labels */}
              {["Backlight", "LCD Layer", "Color Filter", "Image"].map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.5 } : {}}
                  transition={{ duration: dur(0.6, rm), delay: dur(1.5 + i * 0.3, rm) }}
                  className="absolute left-3 text-[8px] font-body text-muted-foreground"
                  style={{ top: `${(i * 25) + 5}%` }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: dur(0.6, rm), delay: dur(2.5, rm) }}
              className="mt-4 text-xs font-body text-muted-foreground/60 tracking-wide"
            >
              Backlit
            </motion.p>
          </div>

          {/* Self-emissive side */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: dur(1, rm) }}
              className="relative w-full max-w-[240px] aspect-[4/3] border border-border/40 rounded-sm overflow-hidden bg-background"
            >
              {/* Pixel grid */}
              <div className="absolute inset-3 grid grid-cols-10 grid-rows-8 gap-[2px]">
                {Array.from({ length: 80 }).map((_, i) => {
                  const isOff = [3, 7, 12, 15, 23, 31, 35, 42, 48, 55, 63, 67, 72, 76].includes(i);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: isOff ? 0 : 1 } : {}}
                      transition={{
                        duration: dur(0.1, rm),
                        delay: dur(1.8 + i * 0.015, rm),
                      }}
                      className={`rounded-[1px] ${isOff ? "bg-transparent" : "bg-primary/40"}`}
                    />
                  );
                })}
              </div>

              {/* "True black" callout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: dur(0.8, rm), delay: dur(3, rm) }}
                className="absolute bottom-2 right-2 flex items-center gap-1"
              >
                <div className="w-2 h-2 border border-muted-foreground/30 rounded-[1px]" />
                <span className="text-[7px] font-body text-muted-foreground/40">pixel off = true black</span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: dur(0.6, rm), delay: dur(2.5, rm) }}
              className="mt-4 text-xs font-body text-muted-foreground/60 tracking-wide"
            >
              Self-emissive
            </motion.p>
          </div>
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   2. TAXONOMY — "Display taxonomy, simplified"
   ═══════════════════════════════════════════════════════════════ */
export const TaxonomyDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  const backlitPanels = ["TN", "IPS", "VA"];
  const specs = ["Refresh Rate", "Response Time", "HDR", "Brightness"];

  return (
    <div ref={ref} className="my-16">
      <div className="border border-border/30 rounded-sm bg-card/50 p-8 md:p-12 overflow-hidden relative">
        <p className="text-primary/60 text-[10px] font-body tracking-[0.25em] uppercase mb-10 text-center">
          Display taxonomy, simplified
        </p>

        <div className="max-w-lg mx-auto">
          {/* Root: Image Creation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur(0.8, rm) }}
            className="text-center mb-2"
          >
            <span className="text-[10px] font-body text-muted-foreground/50 tracking-[0.2em] uppercase">
              Image Creation Model
            </span>
          </motion.div>

          {/* Connector line down */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: dur(0.4, rm), delay: dur(0.5, rm) }}
            className="w-px h-6 bg-border/60 mx-auto origin-top"
          />

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-6 md:gap-10 relative">
            {/* Horizontal connector */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: dur(0.6, rm), delay: dur(0.8, rm) }}
              className="absolute top-0 left-1/4 right-1/4 h-px bg-border/60 origin-center"
            />

            {/* Backlit branch */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: dur(0.3, rm), delay: dur(1, rm) }}
                className="w-px h-4 bg-border/60 origin-top"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: dur(0.5, rm), delay: dur(1.2, rm) }}
                className="border border-border/50 rounded-sm px-4 py-2 bg-card"
              >
                <span className="text-xs font-body text-foreground">Backlit</span>
              </motion.div>

              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: dur(0.3, rm), delay: dur(1.5, rm) }}
                className="w-px h-4 bg-border/40 origin-top"
              />

              <div className="flex gap-2 mt-1">
                {backlitPanels.map((panel, i) => (
                  <motion.span
                    key={panel}
                    initial={{ opacity: 0, y: 5 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: dur(0.4, rm), delay: dur(1.7 + i * 0.15, rm) }}
                    className="text-[10px] font-body text-muted-foreground/70 border border-border/30 rounded-sm px-2 py-1"
                  >
                    {panel}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Self-emissive branch */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: dur(0.3, rm), delay: dur(1, rm) }}
                className="w-px h-4 bg-border/60 origin-top"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: dur(0.5, rm), delay: dur(1.2, rm) }}
                className="border border-primary/30 rounded-sm px-4 py-2 bg-card"
              >
                <span className="text-xs font-body text-primary">Self-Emissive</span>
              </motion.div>

              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: dur(0.3, rm), delay: dur(1.5, rm) }}
                className="w-px h-4 bg-primary/20 origin-top"
              />

              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: dur(0.4, rm), delay: dur(1.7, rm) }}
                className="text-[10px] font-body text-primary/70 border border-primary/20 rounded-sm px-2 py-1"
              >
                OLED
              </motion.span>
            </div>
          </div>

          {/* Specs row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: dur(0.8, rm), delay: dur(2.2, rm) }}
            className="mt-8 pt-6 border-t border-border/20"
          >
            <p className="text-[9px] font-body text-muted-foreground/40 tracking-[0.2em] uppercase text-center mb-3">
              Shared specs across both models
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {specs.map((spec, i) => (
                <motion.span
                  key={spec}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.5 } : {}}
                  transition={{ duration: dur(0.4, rm), delay: dur(2.4 + i * 0.1, rm) }}
                  className="text-[9px] font-body text-muted-foreground tracking-wide"
                >
                  {spec}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   3. CROSS-SECTION — "Inside a backlit vs self-emissive display"
   ═══════════════════════════════════════════════════════════════ */
export const CrossSectionDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  const backlitLayers = [
    { label: "Backlight Source", color: "bg-muted-foreground/15", border: "border-muted-foreground/25" },
    { label: "Diffuser", color: "bg-muted-foreground/10", border: "border-muted-foreground/15" },
    { label: "Liquid Crystal Layer", color: "bg-primary/8", border: "border-primary/20" },
    { label: "Color Filter", color: "bg-primary/12", border: "border-primary/25" },
    { label: "Visible Image", color: "bg-foreground/8", border: "border-foreground/15" },
  ];

  return (
    <div ref={ref} className="my-16">
      <div className="border border-border/30 rounded-sm bg-card/50 p-8 md:p-12 overflow-hidden relative">
        <p className="text-primary/60 text-[10px] font-body tracking-[0.25em] uppercase mb-10 text-center">
          Cross-section comparison
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Backlit */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: dur(0.5, rm) }}
              className="text-[10px] font-body text-muted-foreground tracking-[0.15em] uppercase mb-6 text-center"
            >
              Backlit Display
            </motion.p>
            <div className="flex flex-col items-center gap-[3px]">
              {backlitLayers.map((layer, i) => (
                <div key={layer.label} className="w-full max-w-[220px]">
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: dur(0.6, rm), delay: dur(0.5 + i * 0.25, rm) }}
                    className={`${layer.color} ${layer.border} border rounded-[2px] px-3 py-2.5 flex items-center justify-between origin-center`}
                  >
                    <span className="text-[9px] font-body text-muted-foreground/70">{layer.label}</span>
                    {i < backlitLayers.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 0.3 } : {}}
                        transition={{ delay: dur(1.5, rm) }}
                        className="text-[7px] text-muted-foreground/40"
                      >
                        ↓ light
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.4 } : {}}
              transition={{ duration: dur(0.5, rm), delay: dur(2.2, rm) }}
              className="text-[9px] font-body text-muted-foreground text-center mt-4 italic"
            >
              Light passes through every layer
            </motion.p>
          </div>

          {/* Self-emissive */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: dur(0.5, rm) }}
              className="text-[10px] font-body text-primary/70 tracking-[0.15em] uppercase mb-6 text-center"
            >
              Self-Emissive Display
            </motion.p>
            <div className="flex flex-col items-center">
              {/* Single emissive plane */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: dur(0.8, rm), delay: dur(1.2, rm) }}
                className="w-full max-w-[220px] border border-primary/20 rounded-[2px] p-3 bg-background"
              >
                <p className="text-[9px] font-body text-primary/50 mb-3 text-center">Emissive Pixel Plane</p>
                <div className="grid grid-cols-8 gap-[2px]">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const isOff = [2, 5, 11, 14, 19, 24, 29, 33, 38, 41, 45].includes(i);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: isOff ? 0 : 1 } : {}}
                        transition={{
                          duration: dur(0.08, rm),
                          delay: dur(1.8 + i * 0.02, rm),
                        }}
                        className={`aspect-square rounded-[1px] ${
                          isOff ? "bg-background border border-border/20" : "bg-primary/30"
                        }`}
                      />
                    );
                  })}
                </div>
              </motion.div>

              {/* Direct output arrow */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 0.4, scaleY: 1 } : {}}
                transition={{ duration: dur(0.4, rm), delay: dur(2.5, rm) }}
                className="flex flex-col items-center mt-2 origin-top"
              >
                <div className="w-px h-6 bg-primary/30" />
                <span className="text-[7px] text-primary/40 font-body">direct output</span>
              </motion.div>

              {/* Black state annotation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: dur(0.5, rm), delay: dur(2.8, rm) }}
                className="flex items-center gap-2 mt-4"
              >
                <div className="w-3 h-3 border border-border/30 rounded-[1px] bg-background" />
                <span className="text-[9px] font-body text-muted-foreground/40">Pixel off = absolute black</span>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.4 } : {}}
              transition={{ duration: dur(0.5, rm), delay: dur(2.2, rm) }}
              className="text-[9px] font-body text-muted-foreground text-center mt-4 italic"
            >
              Each pixel is its own light source
            </motion.p>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   4. OLED CONTRAST — "Why OLED looks different"
   ═══════════════════════════════════════════════════════════════ */
export const OLEDContrastStudy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  return (
    <div ref={ref} className="my-16">
      <div className="border border-border/30 rounded-sm bg-card/50 p-8 md:p-12 overflow-hidden relative">
        <p className="text-primary/60 text-[10px] font-body tracking-[0.25em] uppercase mb-10 text-center">
          Controlled contrast study
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Backlit dark scene */}
          <div className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ duration: dur(0.5, rm) }}
              className="text-[10px] font-body text-muted-foreground tracking-[0.15em] uppercase mb-4"
            >
              Backlit — Dark Scene
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: dur(1, rm), delay: dur(0.3, rm) }}
              className="w-full max-w-[220px] aspect-video rounded-[2px] border border-border/30 relative overflow-hidden"
            >
              {/* Residual backlight glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: dur(1.5, rm), delay: dur(1, rm) }}
                className="absolute inset-0 bg-muted-foreground/[0.06]"
              />
              {/* Faint content shape */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.15 } : {}}
                transition={{ duration: dur(1, rm), delay: dur(1.5, rm) }}
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-muted-foreground/20 blur-md"
              />
              {/* Light bleed indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.08 } : {}}
                transition={{ duration: dur(1.2, rm), delay: dur(1.8, rm) }}
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-muted-foreground/10 to-transparent"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.35 } : {}}
              transition={{ duration: dur(0.5, rm), delay: dur(2.5, rm) }}
              className="text-[9px] font-body text-muted-foreground mt-3 italic text-center"
            >
              Residual glow from backlight
            </motion.p>

            {/* Mini luminance bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: dur(0.8, rm), delay: dur(2.8, rm) }}
              className="mt-3 w-full max-w-[220px] origin-left"
            >
              <div className="flex items-end gap-[2px] h-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-muted-foreground/20 rounded-t-[1px]"
                    style={{ height: `${Math.max(15, 30 + Math.sin(i * 0.5) * 15 + Math.random() * 20)}%` }}
                  />
                ))}
              </div>
              <p className="text-[7px] font-body text-muted-foreground/30 mt-1 text-center">luminance ↑</p>
            </motion.div>
          </div>

          {/* Self-emissive dark scene */}
          <div className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ duration: dur(0.5, rm) }}
              className="text-[10px] font-body text-primary/70 tracking-[0.15em] uppercase mb-4"
            >
              Self-Emissive — Dark Scene
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: dur(1, rm), delay: dur(0.3, rm) }}
              className="w-full max-w-[220px] aspect-video rounded-[2px] border border-border/30 relative overflow-hidden bg-background"
            >
              {/* Absolute black — nothing */}
              {/* Only the content shape, sharply defined */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.3 } : {}}
                transition={{ duration: dur(1, rm), delay: dur(1.5, rm) }}
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-primary/25 blur-sm"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.35 } : {}}
              transition={{ duration: dur(0.5, rm), delay: dur(2.5, rm) }}
              className="text-[9px] font-body text-muted-foreground mt-3 italic text-center"
            >
              True black — pixels completely off
            </motion.p>

            {/* Mini luminance bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: dur(0.8, rm), delay: dur(2.8, rm) }}
              className="mt-3 w-full max-w-[220px] origin-left"
            >
              <div className="flex items-end gap-[2px] h-6">
                {Array.from({ length: 20 }).map((_, i) => {
                  const isBright = i >= 7 && i <= 13;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-[1px] ${isBright ? "bg-primary/30" : "bg-transparent border-b border-border/20"}`}
                      style={{ height: isBright ? `${30 + Math.sin((i - 7) * 0.8) * 40}%` : "2%" }}
                    />
                  );
                })}
              </div>
              <p className="text-[7px] font-body text-muted-foreground/30 mt-1 text-center">luminance ↑</p>
            </motion.div>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   5. DECISION FRAMEWORK — "The buying decision as a product framework"
   ═══════════════════════════════════════════════════════════════ */
export const DecisionFramework = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rm = useReducedMotion();

  const constraints = [
    "24″ size parity",
    "Image quality upgrade",
    "Refresh rate consistency",
    "Future-proof primary",
  ];

  const specs = [
    { label: "Panel", value: "IPS" },
    { label: "Size", value: "23.8″" },
    { label: "Refresh", value: "240 Hz" },
    { label: "Resolution", value: "FHD" },
  ];

  return (
    <div ref={ref} className="my-16">
      <div className="border border-border/30 rounded-sm bg-card/50 p-8 md:p-12 overflow-hidden relative">
        <p className="text-primary/60 text-[10px] font-body tracking-[0.25em] uppercase mb-10 text-center">
          Decision framework
        </p>

        <div className="max-w-md mx-auto">
          {/* Starting point */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.5 } : {}}
            transition={{ duration: dur(0.5, rm) }}
            className="text-center mb-2"
          >
            <span className="text-[9px] font-body text-muted-foreground/50 tracking-[0.15em] uppercase">
              Existing setup: 24″ TN panel
            </span>
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: dur(0.3, rm), delay: dur(0.4, rm) }}
            className="w-px h-6 bg-border/40 mx-auto origin-top"
          />

          {/* Constraints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.4 } : {}}
            transition={{ duration: dur(0.4, rm), delay: dur(0.6, rm) }}
            className="text-center mb-3"
          >
            <span className="text-[9px] font-body text-muted-foreground/40 tracking-[0.15em] uppercase">
              Non-negotiables
            </span>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {constraints.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: dur(0.4, rm), delay: dur(0.8 + i * 0.15, rm) }}
                className="border border-border/30 rounded-[2px] px-3 py-2 text-center"
              >
                <span className="text-[9px] font-body text-muted-foreground/60">{c}</span>
              </motion.div>
            ))}
          </div>

          {/* Connector lines converging */}
          <div className="flex justify-center gap-1 mb-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: dur(0.3, rm), delay: dur(1.5 + i * 0.05, rm) }}
                className="w-px h-4 bg-primary/20 origin-top"
              />
            ))}
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: dur(0.3, rm), delay: dur(1.7, rm) }}
            className="w-px h-4 bg-primary/30 mx-auto origin-top"
          />

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: dur(0.8, rm), delay: dur(2, rm) }}
            className="border border-primary/25 rounded-sm p-5 bg-card"
          >
            <p className="text-xs font-body text-primary/70 tracking-[0.15em] uppercase text-center mb-3">
              Lenovo Legion 24‑10
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: dur(0.3, rm), delay: dur(2.3 + i * 0.1, rm) }}
                  className="flex justify-between"
                >
                  <span className="text-[10px] font-body text-muted-foreground/40">{s.label}</span>
                  <span className="text-[10px] font-body text-muted-foreground/70">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.35 } : {}}
            transition={{ duration: dur(0.6, rm), delay: dur(2.8, rm) }}
            className="text-[10px] font-body text-muted-foreground text-center mt-6 italic"
          >
            The right choice became obvious once the system was clear.
          </motion.p>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
};
