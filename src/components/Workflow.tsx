import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
  {
    key: "discovery",
    label: "Discovery",
    artifact: "Day-in-the-life notes, problem theses, opportunity maps",
    tools: ["ChatGPT", "NotebookLM", "Obsidian"],
  },
  {
    key: "prototype",
    label: "Prototype",
    artifact: "Working software — live app surfaces, not static mocks",
    tools: ["Lovable", "Claude Code", "AI Studio"],
  },
  {
    key: "validate",
    label: "Validate",
    artifact: "Versioned product guidance, schema, demo loops",
    tools: ["Gems", "Codex", "Supabase", "GitHub"],
  },
  {
    key: "ship",
    label: "Ship",
    artifact: "Deployed surfaces handed to eng with context intact",
    tools: ["Vercel", "GitHub", "VSCode", "Lovable"],
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

const outcomes = [
  "Discovery → working software in days, not weeks",
  "Versioned product guidance shipped per sprint",
  "Live app surfaces validated before eng commits",
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
  const [activeTool, setActiveTool] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setActiveTool((p) => (p + 1) % tools.length), 2000);
    const s = setInterval(() => setActiveStage((p) => (p + 1) % stages.length), 2200);
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, [reduced]);

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

      <div className="container max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            / workflow
          </p>
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
          <p className="text-muted-foreground font-body max-w-2xl mb-16">
            An AI-native PM stack I designed and pitched to leadership — moving discovery from static mocks
            to working software, with versioned product guidance shipped every sprint.
          </p>
        </motion.div>

        {/* Pipeline diagram */}
        <div className="mb-20">
          <div className="relative border border-border bg-card/40 rounded-sm p-6 md:p-10 backdrop-blur-sm">
            {/* Corner accents */}
            <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-primary" aria-hidden />
            <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-primary" aria-hidden />
            <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-primary" aria-hidden />
            <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-primary" aria-hidden />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2 relative">
              {stages.map((stage, i) => {
                const isActive = i === activeStage;
                const isLast = i === stages.length - 1;
                return (
                  <motion.div
                    key={stage.key}
                    initial={{ opacity: 0, y: 24, scale: 0.85, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.14, ease: "easeOut" }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Connector — sits between this circle and the next, only on top band */}
                    {!isLast && (
                      <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px overflow-hidden">
                        <div className="w-full h-full border-t border-dashed border-primary/30" />
                        <motion.span
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.8)]"
                          animate={
                            reduced
                              ? { left: "0%", opacity: 0.6 }
                              : isActive
                              ? { left: ["-5%", "105%"], opacity: [0, 1, 1, 0] }
                              : { left: "0%", opacity: 0 }
                          }
                          transition={
                            isActive && !reduced
                              ? { duration: 1.8, ease: "easeInOut" }
                              : { duration: 0.3 }
                          }
                        />
                      </div>
                    )}

                    <div className="relative mb-4">
                      {/* Multi-ring halo */}
                      {isActive && !reduced && (
                        <>
                          {[0, 1].map((r) => (
                            <motion.span
                              key={r}
                              aria-hidden
                              initial={{ scale: 1, opacity: 0.6 }}
                              animate={{ scale: 2.2, opacity: 0 }}
                              transition={{ duration: 1.6, repeat: Infinity, delay: r * 0.6, ease: "easeOut" }}
                              className="absolute inset-0 rounded-full border border-primary"
                            />
                          ))}
                        </>
                      )}
                      <motion.div
                        animate={{
                          boxShadow: isActive
                            ? "0 0 24px 2px hsl(var(--primary) / 0.5), inset 0 0 12px hsl(var(--primary) / 0.2)"
                            : "0 0 0px 0px hsl(var(--primary) / 0)",
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center bg-background font-display text-lg z-10 ${
                          isActive
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        <StageNumber n={`0${i + 1}`} active={isActive} reduced={reduced} />
                      </motion.div>
                    </div>

                    <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-2 flex items-center gap-1">
                      {stage.label}
                      {isActive && (
                        <span className="text-primary animate-pulse">▌</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3 max-w-[200px]">
                      {stage.artifact}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {stage.tools.map((t) => (
                        <motion.span
                          key={t}
                          animate={
                            isActive
                              ? { y: -1, boxShadow: "0 0 12px hsl(var(--primary) / 0.35) inset" }
                              : { y: 0, boxShadow: "0 0 0px transparent inset" }
                          }
                          transition={{ duration: 0.4 }}
                          className={`text-[10px] font-body px-2 py-0.5 rounded-full border transition-colors ${
                            isActive
                              ? "border-primary/60 text-primary bg-primary/5"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Outcome strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {outcomes.map((o, i) => (
              <motion.div
                key={o}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="border-l-2 border-primary/60 pl-4 py-2 relative overflow-hidden"
              >
                <motion.span
                  aria-hidden
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                />
                <p className="font-body text-sm text-muted-foreground leading-relaxed relative">
                  <span className="text-primary mr-2">▹</span>
                  {o}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tool stack grid */}
        <div>
          <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-6">
            / stack
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tools.map((tool, i) => {
              const isActive = i === activeTool;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.045, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className={`group relative border rounded-sm p-4 bg-card transition-all duration-300 ${
                    isActive
                      ? "border-primary/70 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
                      : "border-border hover:border-primary/50 hover:shadow-[0_0_16px_-6px_hsl(var(--primary)/0.4)]"
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
