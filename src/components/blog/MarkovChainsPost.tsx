import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

/* ── Reusable article primitives ── */
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl text-foreground mt-16 mb-6">{children}</h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display text-xl md:text-2xl text-foreground mt-10 mb-4">{children}</h3>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="my-16 py-8 border-l-2 border-primary pl-8"
  >
    <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
      {children}
    </p>
  </motion.blockquote>
);

const AccentTerm = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary font-medium">{children}</span>
);

/* ══════════════════════════════════════════════════
   Hero Fission Diagram — animated nuclear chain reaction
   Matches the thin-line, label-based style of HeroOpticsDiagram
   ══════════════════════════════════════════════════ */
const HeroFissionDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  /* ── Thin vertical layer line ── */
  const LayerLine = ({ x, label, delay }: { x: number; label: string; delay: number }) => (
    <g>
      <motion.line
        x1={`${x}%`} y1="22%" x2={`${x}%`} y2="82%"
        stroke="hsl(var(--border))" strokeWidth="0.8" strokeOpacity={0.4}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay }}
      />
      <motion.text
        x={`${x}%`} y="18%"
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="var(--font-body)"
        letterSpacing="1.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: delay + 0.2 }}
      >
        {label}
      </motion.text>
    </g>
  );

  /* ── Nucleus circle with inner dots ── */
  const Nucleus = ({ cx, cy, r, delay, label, labelY }: { cx: number; cy: number; r: number; delay: number; label: string; labelY?: "above" | "below" }) => {
    const dots = Array.from({ length: Math.floor(r * 0.6) }).map((_, i) => {
      const angle = (i / Math.floor(r * 0.6)) * Math.PI * 2 + (i % 2 === 0 ? 0.4 : 0);
      const dist = r * 0.5 * (0.3 + (i % 3) * 0.25);
      return (
        <motion.circle
          key={i}
          cx={cx + Math.cos(angle) * dist}
          cy={cy + Math.sin(angle) * dist}
          r={1.8}
          fill={i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
          fillOpacity={i % 2 === 0 ? 0.7 : 0.35}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.015 }}
        />
      );
    });
    return (
      <g>
        <motion.circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity={0.25}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {dots}
        <motion.text
          x={cx} y={labelY === "below" ? cy + r + 12 : cy - r - 6}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))" fontSize="7.5" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {label}
        </motion.text>
      </g>
    );
  };

  /* ── Animated neutron dot traveling along a path ── */
  const NeutronPath = ({ x1, y1, x2, y2, delay, showDot = true }: { x1: number; y1: number; x2: number; y2: number; delay: number; showDot?: boolean }) => (
    <g>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity={0.2}
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay }}
      />
      {showDot && (
        <motion.circle
          r={3} fill="hsl(var(--primary))"
          initial={{ cx: x1, cy: y1, opacity: 0 }}
          animate={isInView ? { cx: x2, cy: y2, opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      )}
    </g>
  );

  // Layout constants (viewBox 0 0 1000 300)
  const midY = 150;

  // Stage positions (x-axis)
  const stageX = { neutron: 50, target: 220, fission: 350, fragments: 480, released: 620, secondary: 800 };

  // Fragment positions
  const frag1 = { cx: stageX.fragments, cy: midY - 55 };
  const frag2 = { cx: stageX.fragments, cy: midY + 55 };

  // Released neutron endpoints
  const released = [
    { x: stageX.released, y: midY - 90 },
    { x: stageX.released + 20, y: midY },
    { x: stageX.released, y: midY + 90 },
  ];

  // Secondary targets
  const secondaries = [
    { cx: stageX.secondary, cy: midY - 90 },
    { cx: stageX.secondary + 20, cy: midY },
    { cx: stageX.secondary, cy: midY + 90 },
  ];

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full" style={{ height: "140px" }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="fissionFlash" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── Title ── */}
            <motion.text
              x="1%" y="12"
              textAnchor="start"
              fill="hsl(var(--muted-foreground))"
              fontSize="8" fontWeight="500" fontFamily="var(--font-body)" letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.45 } : {}}
              transition={{ delay: 0.1 }}
            >
              NUCLEAR FISSION — CHAIN REACTION
            </motion.text>

            {/* ── Stage divider lines ── */}
            <LayerLine x={15} label="INCIDENT" delay={0.15} />
            <LayerLine x={32} label="TARGET" delay={0.25} />
            <LayerLine x={52} label="FISSION" delay={0.35} />
            <LayerLine x={72} label="RELEASE" delay={0.45} />
            <LayerLine x={88} label="CHAIN" delay={0.55} />

            {/* ── Stage 1: Incoming neutron ── */}
            <motion.text
              x={stageX.neutron - 20} y={midY - 12}
              fill="hsl(var(--primary))" fontSize="8" fontFamily="var(--font-body)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.3 }}
            >
              n
            </motion.text>
            <NeutronPath x1={stageX.neutron} y1={midY} x2={stageX.target - 30} y2={midY} delay={0.4} />

            {/* ── Stage 2: U-235 target ── */}
            <Nucleus cx={stageX.target} cy={midY} r={26} delay={0.5} label="U-235" labelY="below" />

            {/* ── Fission flash ── */}
            <motion.circle
              cx={stageX.fission - 20} cy={midY} r={40}
              fill="url(#fissionFlash)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: [0, 0.7, 0], scale: [0.3, 1.3, 1.6] } : {}}
              transition={{ duration: 0.7, delay: 1.6 }}
              style={{ transformOrigin: `${stageX.fission - 20}px ${midY}px` }}
            />

            {/* ── Energy label ── */}
            <motion.text
              x={stageX.fission - 20} y={midY + 4}
              textAnchor="middle"
              fill="hsl(var(--primary))" fontSize="8" fontFamily="var(--font-body)" fontWeight="500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: [0, 0.6, 0.3, 0.6] } : {}}
              transition={{ duration: 2.5, delay: 1.8, repeat: Infinity }}
            >
              ≈ 200 MeV
            </motion.text>

            {/* ── Stage 3: Fission fragments ── */}
            {/* Fragment paths from target */}
            <NeutronPath x1={stageX.target + 26} y1={midY} x2={frag1.cx - 16} y2={frag1.cy} delay={1.7} showDot={false} />
            <NeutronPath x1={stageX.target + 26} y1={midY} x2={frag2.cx - 14} y2={frag2.cy} delay={1.7} showDot={false} />

            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              <Nucleus cx={frag1.cx} cy={frag1.cy} r={16} delay={1.9} label="Ba-141" labelY="above" />
              <Nucleus cx={frag2.cx} cy={frag2.cy} r={14} delay={1.9} label="Kr-92" labelY="below" />
            </motion.g>

            {/* ── Stage 4: Released neutrons ── */}
            {released.map((r, i) => (
              <g key={`rel-${i}`}>
                <NeutronPath
                  x1={i === 1 ? frag1.cx + 16 : (i === 0 ? frag1.cx : frag2.cx)}
                  y1={i === 1 ? frag1.cy : (i === 0 ? frag1.cy - 14 : frag2.cy + 14)}
                  x2={r.x} y2={r.y}
                  delay={2.3 + i * 0.1}
                />
                <motion.text
                  x={r.x + 8} y={r.y + 3}
                  fill="hsl(var(--primary))" fontSize="7" fontFamily="var(--font-body)" fontStyle="italic"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.5 } : {}}
                  transition={{ delay: 2.7 + i * 0.1 }}
                >
                  n
                </motion.text>
              </g>
            ))}

            {/* ── Stage 5: Secondary targets (chain) ── */}
            {secondaries.map((s, i) => (
              <g key={`sec-${i}`}>
                <NeutronPath x1={released[i].x} y1={released[i].y} x2={s.cx - 20} y2={s.cy} delay={3.0 + i * 0.12} showDot={false} />
                <motion.circle
                  cx={s.cx} cy={s.cy} r={18}
                  fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="0.6" strokeOpacity={0.2}
                  strokeDasharray="2 2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 3.2 + i * 0.12 }}
                  style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
                />
                <motion.text
                  x={s.cx} y={s.cy + 3}
                  textAnchor="middle"
                  fill="hsl(var(--primary))" fontSize="9" fontFamily="var(--font-body)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0, 0.35, 0.15, 0.35] } : {}}
                  transition={{ duration: 2, delay: 3.4 + i * 0.12, repeat: Infinity }}
                >
                  ?
                </motion.text>
              </g>
            ))}

            {/* ── Bottom annotation ── */}
            <motion.text
              x="50%" y="295"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))" fontSize="7.5" fontFamily="var(--font-body)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.35 } : {}}
              transition={{ delay: 3.8 }}
            >
              Each neutron's fate — absorbed, scattered, or fission — is a state transition
            </motion.text>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Exhibit wrapper ── */
const ExhibitCard = ({
  number,
  title,
  caption,
  children,
  maxWidth = "max-w-[820px]",
}: {
  number: string;
  title: string;
  caption: string;
  children: React.ReactNode;
  maxWidth?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`my-[72px] md:my-[96px] mx-auto ${maxWidth}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border border-border/40 rounded-xl bg-card/50 p-6 md:p-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-body tracking-[0.25em] uppercase text-primary/70">
            {number}
          </span>
          <span className="w-1 h-[1px] bg-border flex-1" />
        </div>
        <p className="text-sm font-body text-foreground/80 mb-6">{title}</p>
        {children}
      </motion.div>
      <p className="text-xs font-body text-muted-foreground/60 mt-3 md:mt-4 leading-relaxed">
        {caption}
      </p>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Exhibit 01 – State Transition Intro Diagram
   ══════════════════════════════════════════════════ */
const Exhibit01 = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Node positions
  const nodes = [
    { label: "Sunny", cx: 200, cy: 100, active: true },
    { label: "Rainy", cx: 500, cy: 100, active: false },
    { label: "Cloudy", cx: 350, cy: 260, active: false },
  ];

  // Arrows: from, to, probability, curvature
  const arrows = [
    { from: 0, to: 0, prob: "0.8", selfLoop: true }, // Sunny self
    { from: 0, to: 1, prob: "0.2" },                  // Sunny → Rainy
    { from: 1, to: 1, prob: "0.5", selfLoop: true },  // Rainy self
    { from: 1, to: 0, prob: "0.5" },                  // Rainy → Sunny
    { from: 2, to: 0, prob: "0.6" },                  // Cloudy → Sunny
    { from: 2, to: 1, prob: "0.4" },                  // Cloudy → Rainy
  ];

  const r = 38;

  const getArrowPath = (arrow: typeof arrows[0]) => {
    const from = nodes[arrow.from];
    const to = nodes[arrow.to];

    if (arrow.selfLoop) {
      // Self-loop arc above the node
      const cx = from.cx;
      const cy = from.cy - r;
      return `M ${cx - 14} ${cy - 6} A 18 18 0 1 1 ${cx + 14} ${cy - 6}`;
    }

    // Curved line between nodes
    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len;
    const ny = dy / len;

    const startX = from.cx + nx * r;
    const startY = from.cy + ny * r;
    const endX = to.cx - nx * r;
    const endY = to.cy - ny * r;

    // Offset for curvature
    const mx = (startX + endX) / 2 - ny * 30;
    const my = (startY + endY) / 2 + nx * 30;

    return `M ${startX} ${startY} Q ${mx} ${my} ${endX} ${endY}`;
  };

  const getProbPos = (arrow: typeof arrows[0]) => {
    const from = nodes[arrow.from];
    const to = nodes[arrow.to];

    if (arrow.selfLoop) {
      return { x: from.cx, y: from.cy - r - 30 };
    }

    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len;
    const ny = dy / len;

    const mx = (from.cx + to.cx) / 2 - ny * 35;
    const my = (from.cy + to.cy) / 2 + nx * 35;
    return { x: mx, y: my };
  };

  return (
    <ExhibitCard
      number="Exhibit 01"
      title="A system can move between states with different probabilities"
      caption="A Markov chain models the next step from the current state rather than from the full history."
    >
      <svg ref={ref} viewBox="0 0 700 340" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          </marker>
          <marker id="arrowheadGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" opacity="0.6" />
          </marker>
        </defs>

        {/* Arrows */}
        {arrows.map((arrow, i) => (
          <g key={i}>
            <motion.path
              d={getArrowPath(arrow)}
              fill="none"
              stroke={arrow.from === 0 || arrow.to === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              strokeWidth="1.2"
              strokeOpacity={0.45}
              markerEnd={arrow.from === 0 || arrow.to === 0 ? "url(#arrowheadGreen)" : "url(#arrowhead)"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            />
            <motion.text
              x={getProbPos(arrow).x}
              y={getProbPos(arrow).y}
              textAnchor="middle"
              className="text-[11px] font-body"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.7}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
            >
              {arrow.prob}
            </motion.text>
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <circle
              cx={node.cx}
              cy={node.cy}
              r={r}
              fill={node.active ? "hsl(var(--primary) / 0.08)" : "hsl(var(--muted) / 0.3)"}
              stroke={node.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              strokeWidth={node.active ? 1.5 : 0.8}
              strokeOpacity={node.active ? 0.7 : 0.3}
            />
            <text
              x={node.cx}
              y={node.cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[12px] font-body"
              fill={node.active ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
              fillOpacity={node.active ? 1 : 0.7}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </ExhibitCard>
  );
};

/* ══════════════════════════════════════════════════
   Exhibit 02 – Weather Transition Matrix
   ══════════════════════════════════════════════════ */
const Exhibit02 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const matrix = [
    { row: "Now Sunny", values: ["0.8", "0.2"] },
    { row: "Now Rainy", values: ["0.5", "0.5"] },
  ];

  return (
    <ExhibitCard
      number="Exhibit 02"
      title="The matrix is just a compact way to store one-step movements"
      caption="Each row begins from the current state and each cell shows the probability of the next state."
      maxWidth="max-w-[720px]"
    >
      <div ref={ref} className="flex flex-col items-center">
        <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground/50 mb-4">
          One-step transition matrix
        </p>
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="grid grid-cols-3 gap-px mb-px">
            <div />
            {["Sunny", "Rainy"].map((h) => (
              <motion.div
                key={h}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center py-3 text-xs font-body text-foreground/70"
              >
                {h}
              </motion.div>
            ))}
          </div>
          {/* Rows */}
          {matrix.map((r, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + ri * 0.3 }}
              className="grid grid-cols-3 gap-px mb-px"
            >
              <div className="py-4 px-3 text-xs font-body text-foreground/60 flex items-center">
                {r.row}
              </div>
              {r.values.map((v, vi) => (
                <div
                  key={vi}
                  className="py-4 text-center text-sm font-body text-foreground/80 border border-border/20 rounded-sm"
                >
                  {v}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </ExhibitCard>
  );
};

/* ══════════════════════════════════════════════════
   Exhibit 03 – Multi-Step Stabilization
   ══════════════════════════════════════════════════ */
const Exhibit03 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Approximate probabilities after P, P², P³ starting from Sunny
  const steps = [
    { label: "P", sunny: 0.80, rainy: 0.15, cloudy: 0.05 },
    { label: "P²", sunny: 0.72, rainy: 0.20, cloudy: 0.08 },
    { label: "P³", sunny: 0.70, rainy: 0.21, cloudy: 0.09 },
  ];

  const states = ["Sunny", "Rainy", "Cloudy"] as const;
  const stateKeys = ["sunny", "rainy", "cloudy"] as const;
  const maxBarW = 120;

  return (
    <ExhibitCard
      number="Exhibit 03"
      title="Repeated transitions can push a system toward a stable pattern"
      caption="The matrix does more than describe one move. Repeated application helps reveal longer-run behavior."
      maxWidth="max-w-[920px]"
    >
      <div ref={ref} className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6">
        {steps.map((step, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: si * 0.4 }}
            className="flex-1 border border-border/20 rounded-lg p-5 flex flex-col items-center"
          >
            <p className="text-sm font-body text-foreground/70 mb-5 tracking-wide">{step.label}</p>
            <div className="w-full space-y-3">
              {states.map((state, sti) => {
                const val = step[stateKeys[sti]];
                return (
                  <div key={state} className="flex items-center gap-3">
                    <span className="text-[10px] font-body text-muted-foreground/60 w-12 text-right shrink-0">
                      {state}
                    </span>
                    <div className="flex-1 h-3 bg-muted/20 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${sti === 0 ? "bg-primary/70" : "bg-muted-foreground/30"}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${val * 100}%` } : {}}
                        transition={{ duration: 0.8, delay: si * 0.4 + 0.3 }}
                      />
                    </div>
                    <span className="text-[10px] font-body text-muted-foreground/50 w-8">
                      {val.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
        {/* Arrows between panels (desktop only) */}
      </div>
    </ExhibitCard>
  );
};

/* ══════════════════════════════════════════════════
   Exhibit 04 – PageRank Network
   ══════════════════════════════════════════════════ */
const Exhibit04 = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const pageNodes = [
    { x: 350, y: 180, r: 28, important: true },   // Central node A
    { x: 220, y: 100, r: 24, important: true },   // Important node B
    { x: 480, y: 100, r: 16, important: false },   // C
    { x: 140, y: 220, r: 14, important: false },   // D
    { x: 500, y: 240, r: 14, important: false },   // E
    { x: 280, y: 290, r: 14, important: false },   // F
    { x: 430, y: 310, r: 14, important: false },   // G
    { x: 100, y: 120, r: 12, important: false },   // H
  ];

  // Directional links (index pairs)
  const links = [
    [7, 1], [1, 0], [2, 0], [3, 1], [5, 0], [6, 0], [4, 2], [1, 2], [6, 4], [3, 5],
  ];

  // Random jumps (dotted)
  const jumps = [
    [7, 4],
    [5, 2],
    [3, 6],
  ];

  return (
    <ExhibitCard
      number="Exhibit 04"
      title="Page importance emerges from how attention flows through the network"
      caption="In the random surfer model, pages become important when the system is more likely to spend time on them over many steps."
      maxWidth="max-w-[920px]"
    >
      <svg ref={ref} viewBox="0 0 600 380" className="w-full h-auto">
        <defs>
          <marker id="pageArrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="hsl(var(--muted-foreground))" opacity="0.35" />
          </marker>
          <marker id="pageArrowGreen" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="hsl(var(--primary))" opacity="0.5" />
          </marker>
        </defs>

        {/* Links */}
        {links.map(([fi, ti], i) => {
          const from = pageNodes[fi];
          const to = pageNodes[ti];
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / len;
          const ny = dy / len;
          return (
            <motion.line
              key={`link-${i}`}
              x1={from.x + nx * from.r}
              y1={from.y + ny * from.r}
              x2={to.x - nx * to.r}
              y2={to.y - ny * to.r}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="0.8"
              strokeOpacity={0.25}
              markerEnd="url(#pageArrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
            />
          );
        })}

        {/* Random jumps (dotted) */}
        {jumps.map(([fi, ti], i) => {
          const from = pageNodes[fi];
          const to = pageNodes[ti];
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / len;
          const ny = dy / len;
          const mx = (from.x + to.x) / 2 - ny * 40;
          const my = (from.y + to.y) / 2 + nx * 40;
          return (
            <motion.path
              key={`jump-${i}`}
              d={`M ${from.x + nx * from.r} ${from.y + ny * from.r} Q ${mx} ${my} ${to.x - nx * to.r} ${to.y - ny * to.r}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
              markerEnd="url(#pageArrowGreen)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 1.2 + i * 0.3 }}
            />
          );
        })}

        {/* Nodes */}
        {pageNodes.map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.important ? "hsl(var(--primary) / 0.1)" : "hsl(var(--muted) / 0.25)"}
              stroke={node.important ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              strokeWidth={node.important ? 1.5 : 0.6}
              strokeOpacity={node.important ? 0.6 : 0.25}
            />
          </motion.g>
        ))}

        {/* Legend */}
        <g transform="translate(20, 350)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="26" y="4" className="text-[9px] font-body" fill="hsl(var(--muted-foreground))" fillOpacity="0.5">link</text>
          <line x1="80" y1="0" x2="100" y2="0" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 4" />
          <text x="106" y="4" className="text-[9px] font-body" fill="hsl(var(--muted-foreground))" fillOpacity="0.5">random jump</text>
        </g>
      </svg>
    </ExhibitCard>
  );
};

/* ══════════════════════════════════════════════════
   Exhibit 05 – Predictive Text Strip
   ══════════════════════════════════════════════════ */
const Exhibit05 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const candidates = [
    { word: "jelly", prob: "0.62", top: true },
    { word: "toast", prob: "0.23", top: false },
    { word: "nothing", prob: "0.15", top: false },
  ];

  return (
    <ExhibitCard
      number="Exhibit 05"
      title="The present context changes the distribution of what comes next"
      caption="Sequence prediction systems are more advanced than simple Markov chains, but the intuition still feels familiar."
      maxWidth="max-w-[720px]"
    >
      <div ref={ref} className="flex flex-col items-center gap-5">
        {/* Text field */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[500px] border border-border/30 rounded-lg px-5 py-4 bg-muted/10"
        >
          <span className="font-body text-foreground/80 text-base">
            peanut butter and{" "}
            <span className="text-muted-foreground/40">...</span>
          </span>
        </motion.div>

        {/* Candidates */}
        <div className="flex gap-3 flex-wrap justify-center">
          {candidates.map((c, i) => (
            <motion.div
              key={c.word}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.2 }}
              className={`px-4 py-2.5 rounded-lg border text-sm font-body flex items-center gap-2 ${
                c.top
                  ? "border-primary/40 text-primary bg-primary/5"
                  : "border-border/20 text-muted-foreground/60"
              }`}
            >
              <span>{c.word}</span>
              <span className="text-[10px] opacity-60">{c.prob}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </ExhibitCard>
  );
};

/* ══════════════════════════════════════════════════
   Main Post Component
   ══════════════════════════════════════════════════ */
const MarkovChainsPost = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pl-[260px] transition-all">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-primary text-xs font-body tracking-[0.2em] uppercase">Research Note</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground text-xs font-body">12 min read</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              The Mathematics of What Comes Next:{" "}
              <span className="italic text-gradient">Markov Chains</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed max-w-2xl">
              A white-paper-style introduction to Markov chains, written for curious readers who want the intuition before the notation.
            </p>
            <div className="flex items-center gap-3 mt-6 text-xs font-body text-muted-foreground/60">
              <span>By <Link to="/" className="hover:text-primary transition-colors">Sambit Samantaray</Link></span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>April 10, 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Fission Diagram */}
      <section className="pb-2 lg:pl-[260px] transition-all">
        <div className="container max-w-3xl">
          <HeroFissionDiagram />
        </div>
      </section>

      {/* Article */}
      <article className="pb-32 lg:pl-[260px] transition-all">
        <div className="container max-w-3xl">
          <div className="border-t border-border pt-16">

          {/* ── Abstract ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-border/30 rounded-xl p-6 md:p-8 mb-12 bg-card/30"
          >
            <p className="text-[10px] font-body tracking-[0.25em] uppercase text-primary/60 mb-4">Abstract</p>
            <P>
              Markov chains are one of those ideas that sound more technical than they initially need to. They are usually introduced through symbols, conditional probabilities, and matrix notation. That route is mathematically correct, but for many readers it is also where the concept stops feeling accessible.
            </P>
            <P>
              This note takes a different approach. It treats the subject with the seriousness of a research note, but explains it with the pacing of an editorial essay. The goal is not to remove the mathematics. It is to make the mathematics feel earned.
            </P>
            <P>
              At the center of the idea is a deceptively simple question: <strong className="text-foreground">when a system changes over time, how much of the past do we really need in order to say something useful about what comes next?</strong>
            </P>
            <P>
              Andrey Markov's answer was powerful because it was both narrow and practical. In some systems, the next step can be modeled from the current state alone. That principle, now known as the <AccentTerm>Markov property</AccentTerm>, helped probability theory move beyond strictly independent events and eventually influenced simulation, web search, and predictive text systems.
            </P>
          </motion.div>

          {/* ── Key Terms ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-border/20 rounded-xl p-6 md:p-8 mb-12 bg-muted/5"
          >
            <p className="text-[10px] font-body tracking-[0.25em] uppercase text-primary/60 mb-5">Key Terms</p>
            <div className="space-y-4 text-sm font-body">
              {[
                { term: "Markov property", def: "The idea that, for a given model, the next state depends only on the current state and not on the full path taken to get there." },
                { term: "State", def: "The model's chosen description of where the system is right now." },
                { term: "Transition probability", def: "The probability of moving from one state to another in one step." },
                { term: "Transition matrix", def: "A compact table containing all one-step transition probabilities for a finite-state Markov chain." },
                { term: "Stationary distribution", def: "A probability distribution that remains unchanged after applying the transition matrix. It helps describe long-run behavior." },
                { term: "Random surfer model", def: "A way of interpreting PageRank where an imaginary user moves from page to page by following links and occasional random jumps." },
              ].map((item) => (
                <div key={item.term}>
                  <span className="text-primary font-medium">{item.term}</span>
                  <span className="text-muted-foreground ml-2">— {item.def}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Section 1: Introduction ── */}
          <H2>1. Introduction</H2>
          <P>Some mathematical ideas stay inside mathematics. Others quietly escape and begin structuring the systems around us.</P>
          <P>Markov chains belong to the second category.</P>
          <P>Even readers who have never encountered the term have already experienced its logic. It appears in questions like these:</P>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>If a user is on this page now, where are they most likely to go next?</li>
            <li>If the weather is rainy today, how do tomorrow's odds change?</li>
            <li>If a sentence has reached this word, what kinds of words usually follow?</li>
            <li>If someone is browsing a website and has reached the pricing page, are they more likely to convert, compare, or leave?</li>
          </ul>
          <P>These are not questions of certainty. They are questions of structured uncertainty.</P>
          <P>That distinction matters. A Markov chain does not claim that the future is perfectly knowable. It claims something narrower and more useful: in many evolving systems, the present state contains enough information to model the next step probabilistically.</P>
          <P>That is why the idea has lasted. It is mathematically elegant, but also operationally useful.</P>

          {/* ── Section 2 ── */}
          <H2>2. The historical dispute that made the idea necessary</H2>
          <P>The modern story of Markov chains begins in a dispute about probability itself. In classical probability, independence played a central role. Repeated coin tosses were the comfortable example because each toss could be treated as unaffected by the last.</P>
          <P>In that setting, long-run regularity felt intuitive. If the events are independent and repeated often enough, averages stabilize. But an important conceptual temptation followed from this: if a sequence exhibits stable long-run behavior, perhaps independence must be doing the work.</P>
          <P>Markov challenged that assumption.</P>
          <P>His contribution was not to dismiss independence. It was to show that <strong className="text-foreground">dependence does not destroy probabilistic order</strong>. A sequence of linked events could still be studied rigorously. Stable long-run behavior did not belong exclusively to independent events.</P>
          <P>This mattered because real systems are rarely made of isolated steps. Language is not independent from one letter to the next. Weather is not independent from day to day. Human movement through products and websites is not independent from their current context.</P>
          <P>Probability theory needed a language for linked events. Markov helped provide it.</P>

          <PullQuote>
            A Markov chain does not ask for the whole past. It asks whether the present state is a good enough summary of it.
          </PullQuote>

          {/* ── Section 3 ── */}
          <H2>3. The central idea</H2>
          <P>The central principle of a Markov chain can be expressed in one line:</P>
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-8 py-4 border-l-2 border-primary/40 pl-6"
          >
            <p className="font-body text-foreground text-lg md:text-xl font-medium">
              To estimate the next step, use the current state rather than the entire past.
            </p>
          </motion.blockquote>
          <P>This is the <AccentTerm>Markov property</AccentTerm>.</P>
          <P>It is often summarized as <em>memorylessness</em>, but that phrase can create the wrong intuition. A Markov model is not claiming that the past is irrelevant in a broad philosophical sense. It is claiming that whatever part of the past matters for the next-step prediction has been compressed into the current state.</P>
          <P>That is a much more useful interpretation.</P>
          <P>Suppose a weather model says tomorrow depends only on whether today is sunny or rainy. It is not denying that the previous week happened. It is saying that today's condition is being treated as a sufficient summary for the limited predictive task at hand.</P>
          <P>That move is what gives Markov chains their power. They simplify without becoming empty.</P>

          {/* Exhibit 01 */}
          <Exhibit01 />

          {/* ── Section 4 ── */}
          <H2>4. Markov's original intuition: dependence in text</H2>
          <P>One of Markov's best-known demonstrations came from literature rather than physics. He examined the sequence of vowels and consonants in Pushkin's <em>Eugene Onegin</em> and showed that the occurrence of one type affected the probability of what followed.</P>
          <P>Britannica summarizes the example directly: in Markov's analysis of the first 20,000 characters, the probability of a vowel following a vowel differed sharply from the probability of a vowel following a consonant.</P>
          <P>That result matters because it is simple enough for anyone to grasp.</P>
          <P>The letters are clearly not independent. Yet they are not chaotic either. Their local dependence can still be modeled. This is exactly the conceptual space a Markov chain occupies:</P>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>not pure randomness</li>
            <li>not rigid determinism</li>
            <li>but structured movement from one state to another</li>
          </ul>
          <P>Once that is understood, the idea becomes much less intimidating.</P>

          {/* ── Section 5 ── */}
          <H2>5. A simple modern intuition: weather, product flows, and next-word guesses</H2>
          <P>The reason Markov chains feel surprisingly modern is that the intuition shows up everywhere.</P>
          <P>Take weather. If today is sunny, tomorrow may still be rainy, but the odds are different than if today is already rainy. The present condition changes the distribution of plausible next conditions.</P>
          <P>Take product behavior. A person who is currently on a homepage behaves differently from a person already on checkout. The current state narrows the next set of likely moves.</P>
          <P>Take language. If a phrase currently ends with "peanut butter and," some next words become more likely than others. The current context changes the next-step distribution.</P>
          <P>Across all of these examples, the logic is the same: the model does not need the entire historical record to say something useful about the next move. It needs a meaningful representation of the present.</P>
          <P>That is the real strength of the idea. It converts uncertainty into a structured choice among next steps.</P>

          {/* ── Section 6 ── */}
          <H2>6. What is a state, really?</H2>
          <P>A <AccentTerm>state</AccentTerm> is the model's chosen description of where the system is right now.</P>
          <P>That sounds basic, but in practice it is where most of the modeling judgment lives.</P>
          <P>A state can be very small:</P>
          <ul className="list-disc pl-6 mb-6 space-y-1 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>sunny</li>
            <li>rainy</li>
            <li>vowel</li>
            <li>consonant</li>
          </ul>
          <P>Or it can be product-oriented:</P>
          <ul className="list-disc pl-6 mb-6 space-y-1 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>homepage</li>
            <li>product page</li>
            <li>cart</li>
            <li>checkout</li>
            <li>purchase</li>
            <li>exit</li>
          </ul>
          <P>Or it can be scientific:</P>
          <ul className="list-disc pl-6 mb-6 space-y-1 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>neutron scattered</li>
            <li>neutron absorbed</li>
            <li>neutron triggers fission</li>
          </ul>
          <P>The state matters because the Markov assumption lives or dies there. If the state is too coarse, important structure is lost. If the state is too detailed, the model becomes difficult to estimate and difficult to reason about.</P>
          <P>This is one reason Markov chains feel bigger than a probability topic. They force a design question that also appears in product work, systems thinking, and modeling in general:</P>
          <p className="text-foreground font-body text-base md:text-lg leading-relaxed mb-6 font-medium">
            What is the right level of abstraction for describing reality?
          </p>
          <P>A good Markov model is not just a mathematical object. It is also a disciplined act of choosing what counts as the present.</P>

          <PullQuote>
            Markov chains are not powerful because they eliminate uncertainty. They are powerful because they make uncertainty legible.
          </PullQuote>

          {/* ── Section 7 ── */}
          <H2>7. Transition probabilities: the mechanics of movement</H2>
          <P>Once the states are defined, the next question is straightforward:</P>
          <p className="text-foreground font-body text-base md:text-lg leading-relaxed mb-6 font-medium">
            From this state, where can the system go next, and with what probability?
          </p>
          <P>Those values are called <AccentTerm>transition probabilities</AccentTerm>.</P>
          <P>Consider a very small weather model:</P>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>If today is <strong className="text-foreground">Sunny</strong>, tomorrow is Sunny with probability 0.8 and Rainy with probability 0.2.</li>
            <li>If today is <strong className="text-foreground">Rainy</strong>, tomorrow is Sunny with probability 0.5 and Rainy with probability 0.5.</li>
          </ul>

          {/* Exhibit 02 */}
          <Exhibit02 />

          <P>For a finite-state chain, this table is often written as a <AccentTerm>transition matrix</AccentTerm>.</P>
          <P>The matrix can look intimidating at first glance, but its meaning is simple. Each row says:</P>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li>here is where the system is now</li>
            <li>here are the states it can move to next</li>
            <li>here are the odds of each move</li>
          </ul>
          <P>That is all.</P>

          {/* ── Section 8 ── */}
          <H2>8. Why the matrix matters beyond bookkeeping</H2>
          <P>The transition matrix becomes powerful because it does more than record one-step movement. It also allows us to reason about multiple steps into the future.</P>
          <P>If <strong className="text-foreground">P</strong> is the one-step transition matrix, then:</P>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <li><strong className="text-foreground">P²</strong> gives two-step transition probabilities</li>
            <li><strong className="text-foreground">P³</strong> gives three-step transition probabilities</li>
            <li>and so on</li>
          </ul>
          <P>This is elegant because a single object becomes a machine for projecting forward.</P>

          {/* Exhibit 03 */}
          <Exhibit03 />

          <P>And something even more interesting often happens: as transitions are applied repeatedly, the distribution of where the system spends its time can begin to stabilize. That long-run pattern is called a <AccentTerm>stationary distribution</AccentTerm>.</P>
          <P>A stationary distribution does not tell us the exact next move. It tells us something broader and often more valuable: <strong className="text-foreground">where the system tends to spend time in the long run</strong>.</P>
          <P>That shifts the conversation from local prediction to global behavior. Instead of asking only, "What happens next?" we can also ask, "Where does this system tend to settle?"</P>
          <P>That shift is one of the reasons Markov chains became so influential.</P>

          {/* ── Section 9 ── */}
          <H2>9. Why this escaped pure mathematics</H2>
          <P>The power of Markov chains is not just that they are mathematically neat. It is that the idea proved reusable.</P>

          <H3>9.1 Monte Carlo and simulation</H3>
          <P>The Monte Carlo method, developed at Los Alamos in the 1940s by Stanislaw Ulam and collaborators, used random sampling to estimate answers that were too difficult to compute directly.</P>
          <P>The connection to Markov-style thinking is conceptual as much as historical. Once complex systems can be represented as probabilistic movement through states, simulation becomes practical. Instead of computing every possible path exactly, one can sample many plausible paths and study the resulting distribution of outcomes.</P>
          <P>This was a major operational upgrade. Uncertainty stopped being only a nuisance and became something that could be modeled, sampled, and estimated.</P>

          <H3>9.2 Search and PageRank</H3>
          <P>One of the clearest modern examples is PageRank.</P>
          <P>In the original Stanford work, PageRank is described through a user-behavior model sometimes called the <AccentTerm>random surfer</AccentTerm>. The idea is simple: imagine a user who lands on a page, follows links, and occasionally jumps to a different page.</P>
          <P>That description is deeply Markov-like. Each webpage is a state. Hyperlinks define possible transitions. The importance of a page is related to the long-run probability that the surfer is found there.</P>

          {/* Exhibit 04 */}
          <Exhibit04 />

          <P>The web becomes a giant state-transition system. Importance is no longer assigned by declaration. It emerges from the structure of movement.</P>

          <PullQuote>
            PageRank did not simply rank pages. It modeled the flow of attention through a linked system.
          </PullQuote>

          <H3>9.3 Predictive systems and language</H3>
          <P>Modern language systems are far more sophisticated than simple Markov chains, but the intuition still feels familiar. Sequence prediction depends heavily on current context. What comes next is shaped by where the sequence already is.</P>

          {/* Exhibit 05 */}
          <Exhibit05 />

          <P>The Markov chain is therefore not the final word in prediction. It is one of the clearest early forms of sequence modeling.</P>

          {/* ── Section 10 ── */}
          <H2>10. What average readers should not miss</H2>
          <P>There is a temptation to summarize Markov chains as "math that predicts the future." That is catchy, but not precise.</P>
          <P>A Markov chain does not predict the exact future.</P>
          <P>It models the <strong className="text-foreground">distribution of likely next moves</strong>.</P>
          <P>That difference is crucial.</P>
          <P>Its value is not that it removes uncertainty. Its value is that it gives uncertainty structure. It tells us how a system tends to move, how momentum persists, how states influence what becomes plausible next, and how local transitions can accumulate into long-run behavior.</P>
          <P>In other words, Markov chains are not powerful because they eliminate uncertainty.</P>
          <P>They are powerful because they make uncertainty legible.</P>

          {/* ── Section 11 ── */}
          <H2>11. Limits and cautions</H2>
          <P>A useful explainer should also say where the idea becomes less reliable.</P>
          <P>Markov chains work best when the current state is genuinely a strong enough summary of the past for the next-step prediction we care about. That is not always true.</P>
          <P>Some systems have longer memory. Others are influenced by hidden variables that the chosen state does not capture. In such cases, a simple first-order Markov model can oversimplify reality.</P>
          <P>This is not a flaw unique to Markov chains. It is the usual price of modeling. Simplicity is useful, but only when the abstraction still respects the system.</P>
          <P>So the correct takeaway is not that everything is a Markov chain.</P>
          <P>The better takeaway is this: many systems become easier to understand once we identify the right state description and accept probabilistic movement instead of demanding deterministic certainty.</P>

          {/* ── Section 12 ── */}
          <H2>12. Closing note</H2>
          <P>What makes Markov chains enduring is not only the mathematics. It is the worldview inside them.</P>
          <P>They suggest that prediction does not always require total recall. Sometimes it requires a disciplined present.</P>
          <P>That idea is elegant in theory and practical in design. It explains why a century-old argument in probability still echoes through simulation, search, and predictive systems. And it explains why the concept remains worth learning, even for people who do not plan to become mathematicians.</P>
          <P>Because beneath the notation, the idea is intuitive:</P>
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="my-12 py-6 border-l-2 border-primary pl-8"
          >
            <p className="font-display text-xl md:text-2xl italic text-foreground leading-snug">
              The world often moves forward one state at a time, and the present usually carries more predictive weight than we first assume.
            </p>
          </motion.blockquote>

          {/* ── References ── */}
          <div className="mt-20 pt-8 border-t border-border/20">
            <p className="text-[10px] font-body tracking-[0.25em] uppercase text-muted-foreground/40 mb-6">References</p>
            <ol className="list-decimal pl-5 space-y-3 text-sm font-body text-muted-foreground/60 leading-relaxed">
              <li>Veritasium. <em>The Strange Math That Predicts (Almost) Anything</em>. YouTube.</li>
              <li>Encyclopaedia Britannica. <em>Markov chain</em>.</li>
              <li>ProbabilityCourse.com. <em>Stationary and Limiting Distributions</em> and related Markov chain notes.</li>
              <li>Page, L., Brin, S., Motwani, R., and Winograd, T. <em>The PageRank Citation Ranking: Bringing Order to the Web</em>. Stanford InfoLab.</li>
              <li>Los Alamos National Laboratory. <em>Hitting the Jackpot: The Birth of the Monte Carlo Method</em>.</li>
            </ol>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-12 border-t border-border">
            <p className="text-muted-foreground font-body text-sm italic">
              More essays on product, systems, and the small frictions that reveal bigger truths.
            </p>
            <Link
              to="/"
              className="inline-flex items-center mt-4 text-primary text-sm font-body hover:underline"
            >
              sambitxsamba.com
            </Link>
          </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default MarkovChainsPost;
