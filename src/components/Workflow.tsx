import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
  {
    key: "discovery",
    label: "Discovery",
    artifact: "Day-in-the-life notes, problem theses, opportunity maps",
    related: ["ChatGPT", "NotebookLM", "Obsidian", "Gemini Gems"],
  },
  {
    key: "ideate",
    label: "Ideate",
    artifact: "Solution sketches, model experiments, custom PM agents",
    related: ["ChatGPT", "Gemini Gems", "Google AI Studio", "Codex", "Claude Code", "Obsidian"],
  },
  {
    key: "prototype",
    label: "Prototype",
    artifact: "Working software — live app surfaces, not static mocks",
    related: ["Lovable", "Claude Code", "Codex", "Supabase", "Google AI Studio"],
  },
  {
    key: "validate",
    label: "Validate",
    artifact: "Versioned product guidance, schema, demo loops",
    related: ["GitHub", "VSCode", "Gemini Gems", "Claude Code", "Supabase", "Obsidian"],
  },
  {
    key: "ship",
    label: "Ship",
    artifact: "Deployed surfaces handed to eng with context intact",
    related: ["Vercel", "GitHub", "Lovable", "Supabase", "VSCode"],
  },
];


const tools = [
  { name: "Lovable", role: "Build the working prototype" },
  { name: "Claude Code", role: "Pair-program edits & refactors" },
  { name: "ChatGPT", role: "Discovery, framing, writing partner" },
  { name: "Codex", role: "Spec-driven code generation" },
  { name: "Gemini Gems", role: "Custom Gemini agents for repeatable PM tasks" },
  { name: "NotebookLM", role: "RAG + knowledge bank for product context" },
  { name: "Google AI Studio", role: "Quick prototyping & model experimentation" },
  { name: "Obsidian", role: "Second-brain notes & PRD synthesis" },
  { name: "GitHub", role: "Versioned product guidance" },
  { name: "Supabase", role: "Schema, auth, instant backend" },
  { name: "VSCode", role: "Ship-ready code review & merges" },
  { name: "Vercel", role: "Ship to live preview in minutes" },
];


const SCRAMBLE_CHARS = "0123456789";
const useScramble = (target: string, reduced: boolean) => {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > 4) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(
          target
            .split("")
            .map((c) => (/\d/.test(c) ? SCRAMBLE_CHARS[Math.floor(Math.random() * 10)] : c))
            .join(""),
        );
      }
    }, 45);
    return () => clearInterval(id);
  }, [target, reduced]);
  return val;
};

const StageNumber = ({ n, active, reduced }: { n: string; active: boolean; reduced: boolean }) => {
  const scrambled = useScramble(active ? n : n, reduced);
  return <span>{active ? scrambled : n}</span>;
};

const Visualizer = ({ active }: { active: boolean }) => (
  <div className="flex items-end gap-[2px] h-3" aria-hidden>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className={`w-[2px] rounded-full ${active ? "bg-primary" : "bg-muted-foreground/40"}`}
        animate={
          active
            ? { height: ["30%", "100%", "50%", "85%", "30%"] }
            : { height: "40%" }
        }
        transition={
          active
            ? { duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        style={{ height: "40%" }}
      />
    ))}
  </div>
);

const Workflow = () => {
  const reduced = useReducedMotion() ?? false;
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || hoveredStage !== null || hoveredTool !== null) return;
    const s = setInterval(() => setActiveStage((p) => (p + 1) % stages.length), 2200);
    return () => clearInterval(s);
  }, [reduced, hoveredStage, hoveredTool]);

  // Stages highlighted right now (multiple possible when hovering a tool)
  const highlightedStages: number[] =
    hoveredStage !== null
      ? [hoveredStage]
      : hoveredTool !== null
        ? stages
            .map((s, idx) => (s.related.includes(tools[hoveredTool].name) ? idx : -1))
            .filter((i) => i !== -1)
        : [activeStage];

  const isStageHighlighted = (i: number) => highlightedStages.includes(i);
  const currentStage = highlightedStages[0] ?? activeStage;



  const headline = "How I leverage";

  return (
    <section id="workflow" className="relative py-32 overflow-hidden">
      {/* Animated grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(hsl(var(--primary))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary))_1px,transparent_1px)] [background-size:48px_48px] animate-grid-drift"
      />
      {/* CRT vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background))_100%)]"
      />

      {/* Scanline sweep on enter */}
      <motion.div
        aria-hidden
        initial={{ y: "-10%", opacity: 0 }}
        whileInView={{ y: "110%", opacity: [0, 0.8, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-primary/70 shadow-[0_0_24px_4px_hsl(var(--primary)/0.6)]"
      />


      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4"
          >
            / workflow
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 flex flex-wrap gap-x-3">
            <span className="inline-flex">
              {headline.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.025, duration: 0.4, ease: "easeOut" }}
                  className="inline-block whitespace-pre"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, type: "spring", stiffness: 200 }}
              className="italic text-gradient relative"
            >
              AI.
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute inset-0 italic text-primary mix-blend-screen translate-x-[2px]"
              >
                AI.
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="text-muted-foreground font-body max-w-2xl mb-16"
          >
            An AI-native PM stack I designed and pitched to leadership — moving discovery from static mocks
            to working software, with versioned product guidance shipped every sprint.
          </motion.p>
        </motion.div>

        {/* Pipeline diagram */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            className="relative border border-border bg-card/40 rounded-sm p-6 md:p-10 backdrop-blur-sm"
          >
            {/* Corner accents */}
            <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-primary" aria-hidden />
            <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-primary" aria-hidden />
            <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-primary" aria-hidden />
            <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-primary" aria-hidden />

            {/* Title row with dotted connectors between stage labels */}
            <div className="hidden md:grid grid-cols-5 items-center mb-6">
              {stages.map((stage, i) => {
                const isActive = isStageHighlighted(i);
                const isLast = i === stages.length - 1;
                return (
                  <div key={stage.key} className="relative flex items-center">
                    <div className="flex-1 flex justify-center relative">
                      <motion.p
                        animate={{
                          textShadow: isActive
                            ? "0 0 22px hsl(var(--primary) / 0.85), 0 0 6px hsl(var(--primary) / 0.6)"
                            : "0 0 0px hsl(var(--primary) / 0)",
                        }}
                        transition={{ duration: 0.4 }}
                        className={`relative font-body text-sm tracking-[0.2em] uppercase flex items-center gap-1 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {stage.label}
                        {isActive && <span className="text-primary animate-pulse">▌</span>}
                      </motion.p>
                    </div>
                    {!isLast && (
                      <span
                        aria-hidden
                        className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 border-t border-dotted transition-colors ${
                          currentStage === i + 1 ? "border-primary/60" : "border-border"
                        }`}
                        style={{ marginLeft: "3.5rem", marginRight: "-3.5rem" }}
                      />
                    )}
                  </div>
                );
              })}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative">
              {stages.map((stage, i) => {
                const isActive = isStageHighlighted(i);
                return (
                  <motion.div
                    key={stage.key}
                    initial={{ opacity: 0, y: 30, scale: 0.7, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: [0.2, 0.9, 0.3, 1] }}
                    onHoverStart={() => setHoveredStage(i)}
                    onHoverEnd={() => setHoveredStage(null)}
                    className="relative flex flex-col items-center text-center px-1 py-1 rounded-sm cursor-default"
                  >
                    {/* Mobile-only label */}
                    <motion.p
                      animate={{
                        textShadow: isActive
                          ? "0 0 18px hsl(var(--primary) / 0.7)"
                          : "0 0 0px hsl(var(--primary) / 0)",
                      }}
                      transition={{ duration: 0.4 }}
                      className={`md:hidden font-body text-sm tracking-[0.2em] uppercase mb-3 flex items-center gap-1 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {stage.label}
                      {isActive && <span className="text-primary animate-pulse">▌</span>}
                    </motion.p>

                    <p className={`text-xs font-body leading-relaxed max-w-[200px] transition-colors duration-300 ${
                      isActive ? "text-primary/90" : "text-muted-foreground"
                    }`}>
                      {stage.artifact}
                    </p>
                  </motion.div>
                );
              })}


            </div>
          </motion.div>

        </div>

        {/* Tool stack grid */}
        <div>
          <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-6">
            / stack
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tools.map((tool, i) => {
              const isActive =
                hoveredTool === i ||
                highlightedStages.some((s) => stages[s].related.includes(tool.name));
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.025, ease: "easeOut" }}
                  whileHover={{ y: -2 }}
                  onHoverStart={() => setHoveredTool(i)}
                  onHoverEnd={() => setHoveredTool(null)}
                  className={`group relative border rounded-sm p-4 bg-card transition-all duration-300 ${
                    isActive
                      ? "border-primary/70 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
                      : "border-border"
                  }`}
                >
                  {/* Corner ticks */}
                  <span className={`absolute top-1 left-1 w-1.5 h-1.5 border-t border-l ${isActive ? "border-primary" : "border-border group-hover:border-primary/60"}`} aria-hidden />
                  <span className={`absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r ${isActive ? "border-primary" : "border-border group-hover:border-primary/60"}`} aria-hidden />

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-base text-foreground">
                      {tool.name}
                      {isActive && <span className="text-primary ml-1 animate-pulse">_</span>}
                    </span>
                    <Visualizer active={isActive} />
                  </div>
                  <p className="text-xs text-muted-foreground font-body leading-snug">
                    {tool.role}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
