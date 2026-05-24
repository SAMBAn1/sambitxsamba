import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
  {
    key: "discovery",
    label: "Discovery",
    artifact: "Day-in-the-life notes, problem theses, opportunity maps",
    tools: ["ChatGPT", "Claude", "NotebookLM", "Notion"],
  },
  {
    key: "prototype",
    label: "Prototype",
    artifact: "Working software — live app surfaces, not static mocks",
    tools: ["Lovable", "Cursor", "Claude Code", "AI Studio"],
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
    tools: ["Vercel", "GitHub", "Lovable"],
  },
];

const tools = [
  { name: "Lovable", role: "Build the working prototype" },
  { name: "Claude Code", role: "Pair-program edits & refactors" },
  { name: "ChatGPT", role: "Discovery, framing, writing partner" },
  { name: "Codex", role: "Spec-driven code generation" },
  { name: "Cursor", role: "In-editor agentic edits" },
  { name: "Gemini Gems", role: "Custom Gemini agents for repeatable PM tasks" },
  { name: "NotebookLM", role: "RAG + knowledge bank for product context" },
  { name: "Google AI Studio", role: "Quick prototyping & model experimentation" },
  { name: "GitHub", role: "Versioned product guidance" },
  { name: "Supabase", role: "Schema, auth, instant backend" },
  { name: "Vercel", role: "Ship to live preview in minutes" },
  { name: "Notion", role: "PRDs, specs & research synthesis" },
];

const outcomes = [
  "Discovery → working software in days, not weeks",
  "Versioned product guidance shipped per sprint",
  "Live app surfaces validated before eng commits",
];

const Workflow = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTool((p) => (p + 1) % tools.length), 2000);
    const s = setInterval(() => setActiveStage((p) => (p + 1) % stages.length), 2000);
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, []);

  return (
    <section id="workflow" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            / workflow
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            How I leverage <span className="italic text-gradient">AI.</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mb-16">
            An AI-native PM stack I designed and pitched to leadership — moving discovery from static mocks
            to working software, with versioned product guidance shipped every sprint.
          </p>
        </motion.div>

        {/* Pipeline diagram */}
        <div className="mb-20">
          <div className="relative border border-border bg-card/40 rounded-sm p-6 md:p-10">
            {/* SVG connector line + pulse */}
            <svg
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full pointer-events-none hidden md:block"
              height="2"
              aria-hidden
            >
              <line
                x1="6%"
                x2="94%"
                y1="1"
                y2="1"
                stroke="hsl(var(--primary) / 0.25)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2 relative">
              {stages.map((stage, i) => {
                const isActive = i === activeStage;
                return (
                  <motion.div
                    key={stage.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-4">
                      <motion.div
                        animate={{
                          boxShadow: isActive
                            ? "0 0 0 6px hsl(var(--primary) / 0.15)"
                            : "0 0 0 0px hsl(var(--primary) / 0)",
                          scale: isActive ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 rounded-full border flex items-center justify-center bg-background font-display text-lg ${
                          isActive
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        0{i + 1}
                      </motion.div>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary animate-pulse"
                        />
                      )}
                    </div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-2">
                      {stage.label}
                    </p>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3 max-w-[200px]">
                      {stage.artifact}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {stage.tools.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-body px-2 py-0.5 rounded-full border transition-colors ${
                            isActive
                              ? "border-primary/40 text-primary bg-primary/5"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {t}
                        </span>
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
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l-2 border-primary/60 pl-4 py-2"
              >
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
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
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className={`relative border rounded-sm p-4 bg-card transition-colors duration-300 ${
                    isActive ? "border-primary/60" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-base text-foreground">
                      {tool.name}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
                      }`}
                    />
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
