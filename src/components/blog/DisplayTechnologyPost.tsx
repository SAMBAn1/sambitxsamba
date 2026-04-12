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

/* ── Hero Optics Diagram: LCD vs OLED light path ── */
const HeroOpticsDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const lcdLayers = [
    { label: "Backlight", x: 8 },
    { label: "Polarizer", x: 25 },
    { label: "Liquid Crystal", x: 42 },
    { label: "Color Filter", x: 59 },
  ];

  const oledLayers = [
    { label: "Substrate", x: 8 },
    { label: "Anode", x: 22 },
    { label: "Emissive Layer", x: 40 },
    { label: "Cathode", x: 58 },
  ];

  const LightRay = ({ y, delay, dimEnd }: { y: number; delay: number; dimEnd?: boolean }) => (
    <motion.line
      x1="10%"
      y1={`${y}%`}
      x2="75%"
      y2={`${y}%`}
      stroke="hsl(var(--primary))"
      strokeWidth="1"
      strokeOpacity={dimEnd ? 0.3 : 0.6}
      initial={{ pathLength: 0 }}
      animate={isInView ? { pathLength: 1 } : {}}
      transition={{ duration: 1.2, delay: delay + 0.4, ease: "easeOut" }}
    />
  );

  const OutputSquare = ({ yStart, rows, trueBlack }: { yStart: number; rows: number[][]; trueBlack: boolean }) => (
    <g>
      <rect
        x="78%"
        y={`${yStart}%`}
        width="18%"
        height="70%"
        rx="2"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />
      {rows.map((row, ri) =>
        row.map((val, ci) => (
          <motion.rect
            key={`${ri}-${ci}`}
            x={`${79 + ci * 4.2}%`}
            y={`${yStart + 5 + ri * 16}%`}
            width="3.5%"
            height="13%"
            rx="1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 + (ri * row.length + ci) * 0.05 }}
            fill={
              val === 0
                ? trueBlack
                  ? "hsl(var(--background))"
                  : "hsl(220 15% 16%)"
                : val === 1
                ? "hsl(var(--primary))"
                : val === 2
                ? "hsl(142 50% 30%)"
                : "hsl(160 40% 25%)"
            }
            stroke={val === 0 && trueBlack ? "hsl(var(--border))" : "none"}
            strokeWidth="0.3"
          />
        ))
      )}
    </g>
  );

  const pixelGrid = [
    [1, 0, 2, 3],
    [0, 1, 1, 0],
    [3, 2, 0, 1],
    [1, 1, 3, 2],
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      {/* LCD Diagram */}
      <div className="mb-1">
        <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-2">LCD / LED — Backlit</p>
        <div className="relative w-full" style={{ height: "120px" }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 120" preserveAspectRatio="xMidYMid meet">
            {/* Layer lines */}
            {lcdLayers.map((layer, i) => (
              <g key={layer.label}>
                <motion.line
                  x1={`${layer.x}%`}
                  y1="10%"
                  x2={`${layer.x}%`}
                  y2="90%"
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ transformOrigin: `${layer.x}% 50%` }}
                />
                <motion.text
                  x={`${layer.x}%`}
                  y="6%"
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="9"
                  fontFamily="var(--font-body)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.7 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {layer.label}
                </motion.text>
              </g>
            ))}

            {/* Light rays */}
            {[25, 40, 55, 70, 80].map((y, i) => (
              <LightRay key={y} y={y} delay={i * 0.08} />
            ))}

            {/* Backlight glow */}
            <motion.circle
              cx="5%"
              cy="50%"
              r="15"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.15 } : {}}
              transition={{ delay: 0.2 }}
            />

            {/* Output screen */}
            <OutputSquare yStart={10} rows={pixelGrid} trueBlack={false} />

            {/* Label for gray blacks */}
            <motion.text
              x="87%"
              y="98%"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="8"
              fontFamily="var(--font-body)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              transition={{ delay: 1.8 }}
            >
              Blacks appear grayish ↑
            </motion.text>
          </svg>
        </div>
      </div>

      {/* OLED Diagram */}
      <div>
        <p className="text-primary text-[10px] font-body tracking-[0.2em] uppercase mb-2">OLED — Self-Emissive</p>
        <div className="relative w-full" style={{ height: "120px" }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 120" preserveAspectRatio="xMidYMid meet">
            {/* Layer lines */}
            {oledLayers.map((layer, i) => (
              <g key={layer.label}>
                <motion.line
                  x1={`${layer.x}%`}
                  y1="10%"
                  x2={`${layer.x}%`}
                  y2="90%"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeOpacity={0.4}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ transformOrigin: `${layer.x}% 50%` }}
                />
                <motion.text
                  x={`${layer.x}%`}
                  y="6%"
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="9"
                  fontFamily="var(--font-body)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.7 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {layer.label}
                </motion.text>
              </g>
            ))}

            {/* Individual pixel emission arrows */}
            {[25, 40, 55, 70, 80].map((y, i) => {
              const isOff = i === 1 || i === 4;
              return (
                <motion.line
                  key={y}
                  x1="10%"
                  y1={`${y}%`}
                  x2={isOff ? "45%" : "75%"}
                  y2={`${y}%`}
                  stroke={isOff ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))"}
                  strokeWidth="1"
                  strokeOpacity={isOff ? 0.15 : 0.6}
                  strokeDasharray={isOff ? "3 4" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                />
              );
            })}

            {/* Output screen */}
            <OutputSquare yStart={10} rows={pixelGrid} trueBlack={true} />

            {/* Label for true blacks */}
            <motion.text
              x="87%"
              y="98%"
              textAnchor="middle"
              fill="hsl(var(--primary))"
              fontSize="8"
              fontFamily="var(--font-body)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ delay: 1.8 }}
            >
              True black — pixels off ↑
            </motion.text>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Visual 1: Two display models diagram ── */
const DisplayModelsDiagram = () => (
  <div className="grid md:grid-cols-2 gap-6 my-16">
    <div className="border border-border rounded-sm p-8 bg-card">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6">Backlit Display</p>
      <div className="flex flex-col items-center gap-3 my-6">
        {/* Backlight layer */}
        <div className="w-48 h-8 bg-muted-foreground/20 border border-muted-foreground/30 rounded-sm flex items-center justify-center">
          <span className="text-[10px] font-body text-muted-foreground">Backlight source</span>
        </div>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          className="w-px h-6 bg-primary origin-top"
        />
        {/* LCD layer */}
        <div className="w-48 h-8 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
          <span className="text-[10px] font-body text-primary">LCD / crystal layer</span>
        </div>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          className="w-px h-6 bg-primary origin-top"
        />
        {/* Final image */}
        <div className="w-48 h-8 bg-foreground/10 border border-foreground/20 rounded-sm flex items-center justify-center">
          <span className="text-[10px] font-body text-foreground">Final image</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-body text-center mt-4">
        Light passes through layers to form the image. TN, IPS, VA all use this model.
      </p>
    </div>
    <div className="border border-primary/30 rounded-sm p-8 bg-card">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6">Self-Emissive Display</p>
      <div className="flex flex-col items-center gap-3 my-6">
        {/* Pixel grid */}
        <div className="grid grid-cols-6 gap-1 my-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: i % 5 === 0 ? 0 : 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={`w-5 h-5 rounded-sm ${i % 5 === 0 ? "bg-background border border-muted-foreground/20" : "bg-primary/60"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-body text-center mt-4">
        Each pixel emits its own light — or turns off completely for true black. OLED uses this model.
      </p>
    </div>
  </div>
);

/* ── Visual 2: Technology comparison matrix ── */
const TechComparisonMatrix = () => {
  const techs = [
    { name: "TN", color: "★★", viewing: "★", contrast: "★★", speed: "★★★★", use: "Competitive gaming" },
    { name: "IPS", color: "★★★★", viewing: "★★★★", contrast: "★★★", speed: "★★★", use: "Creative work, general use" },
    { name: "VA", color: "★★★", viewing: "★★★", contrast: "★★★★", speed: "★★", use: "Movies, dark content" },
    { name: "OLED", color: "★★★★★", viewing: "★★★★★", contrast: "★★★★★", speed: "★★★★★", use: "Premium everything" },
  ];

  return (
    <div className="my-16 overflow-x-auto">
      <table className="w-full text-sm font-body border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 text-primary text-xs tracking-[0.15em] uppercase font-normal">Tech</th>
            <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Color</th>
            <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Viewing Angles</th>
            <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Contrast</th>
            <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Speed</th>
            <th className="text-left py-3 pl-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Typical Use</th>
          </tr>
        </thead>
        <tbody>
          {techs.map((t) => (
            <tr key={t.name} className="border-b border-border/50">
              <td className="py-3 pr-4 text-foreground font-display">{t.name}</td>
              <td className="py-3 px-4 text-primary/80">{t.color}</td>
              <td className="py-3 px-4 text-primary/80">{t.viewing}</td>
              <td className="py-3 px-4 text-primary/80">{t.contrast}</td>
              <td className="py-3 px-4 text-primary/80">{t.speed}</td>
              <td className="py-3 pl-4 text-muted-foreground">{t.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Visual 3: Consumer confusion stack ── */
const ConfusionStack = () => {
  const layers = [
    { label: "Marketing labels", desc: "LED TV, Retina, NanoCell…", opacity: "bg-muted-foreground/10" },
    { label: "Performance specs", desc: "Refresh rate, HDR, response time", opacity: "bg-muted-foreground/15" },
    { label: "Panel structure", desc: "TN, IPS, VA — liquid crystal arrangement", opacity: "bg-muted-foreground/20" },
    { label: "Illumination technology", desc: "Backlit (LED/Mini-LED) vs Self-emissive (OLED)", opacity: "bg-primary/20" },
  ];

  return (
    <div className="my-16">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6 text-center">Why display terminology feels confusing</p>
      <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`w-full ${layer.opacity} border border-border/50 rounded-sm p-4`}
          >
            <p className="text-xs font-body text-foreground">{layer.label}</p>
            <p className="text-[11px] font-body text-muted-foreground mt-1">{layer.desc}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground font-body mt-4 italic">
        Consumers encounter all four layers at once — with no guide to separate them.
      </p>
    </div>
  );
};

/* ── Visual 4: What I bought card ── */
const FinalChoiceCard = () => (
  <div className="my-16 border border-border/50 rounded-sm p-8 bg-card max-w-sm mx-auto">
    <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-4">What I ended up buying</p>
    <h3 className="font-display text-lg text-foreground mb-4">Lenovo Legion 24‑10</h3>
    <div className="grid grid-cols-2 gap-y-2 text-sm font-body">
      <span className="text-muted-foreground/60">Size</span><span className="text-muted-foreground">23.8″</span>
      <span className="text-muted-foreground/60">Resolution</span><span className="text-muted-foreground">FHD</span>
      <span className="text-muted-foreground/60">Panel</span><span className="text-primary">IPS</span>
      <span className="text-muted-foreground/60">Refresh</span><span className="text-muted-foreground">240Hz</span>
    </div>
    <p className="text-xs text-muted-foreground/60 font-body mt-4 italic">
      Chosen for refresh-rate parity with my existing setup, plus meaningfully better image quality.
    </p>
  </div>
);

const DisplayTechnologyPost = () => (
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
            <span className="text-primary text-xs font-body tracking-[0.2em] uppercase">Observation</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground text-xs font-body">8 min read</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            I Went Looking for a Second Monitor. I Ended Up Learning How Screens{" "}
            <span className="italic text-gradient">Actually Work</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed max-w-2xl">
            What started as a practical desk upgrade became a lesson in how screens are built, why display marketing is so confusing, and what actually matters when choosing one.
          </p>
          <div className="flex items-center gap-3 mt-6 text-xs font-body text-muted-foreground/60">
            <span>By <Link to="/" className="hover:text-primary transition-colors">Sambit Samantaray</Link></span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>March 15, 2026</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Hero Optics Diagram */}
    <section className="pb-8 lg:pl-[260px] transition-all">
      <div className="container max-w-3xl">
        <HeroOpticsDiagram />
      </div>
    </section>

    {/* Article */}
    <article className="pb-32 lg:pl-[260px] transition-all">
      <div className="container max-w-3xl">
        <div className="border-t border-border pt-16">
          <P>I was not trying to become an expert in display technology.</P>
          <P>I was just trying to buy a second monitor.</P>
          <P>My current setup had started feeling cramped. I work on a 24-inch ASUS XG248Q, a monitor I bought around six to seven years ago. It has served me well, especially for responsiveness, but it is a TN panel, and over time its limits became harder to ignore. The screen space felt tight, and once I decided I needed a secondary monitor, I had one clear rule: if I am adding another display to my desk, it should not trap me in older image quality standards.</P>
          <P>So the requirement was simple. Another 24-inch monitor. Same general size. Same practical fit for the desk. But better image quality, because one day the older monitor might stop being my primary anyway.</P>
          <P>That was the buying decision.</P>
          <P>What followed was the rabbit hole.</P>
          <P>I began where most people begin: with consumer shorthand. TN is fast. IPS looks better. OLED is the dream. That much I already knew. But somewhere in the middle of comparing monitors, specs, and reviews, I came across a video that explained display technology in a way that made the whole category click for me. Not just which one is better, but why they are different in the first place. And once that mental model sets in, a lot of the confusion around monitors and TVs starts disappearing.</P>
          <P>The video's most useful framing is also the simplest one: most modern displays work in one of two ways. Either there is a light source behind the screen being shaped into an image, or each pixel creates its own light.</P>
          <P>That distinction sounds basic, but it changes how you interpret almost every display term you see online.</P>
        </div>

        <H2>The real split is not TN vs IPS vs OLED</H2>
        <P>When people talk about display technology, the language gets mixed together very quickly. Some terms describe the way the image is illuminated. Some describe the way the liquid crystal layer behaves. Some describe improvements to backlighting. And some are just brand language dressed up as if they are entirely new categories.</P>
        <P>A clearer way to think about it is this:</P>

        <H3>1. Backlit displays</H3>
        <P>These are displays where light comes from behind the image.</P>
        <P>That is the world of LCDs. The panel itself does not emit light. It controls and shapes light passing through it. This is why terms like TN, IPS, and VA belong to the LCD family. They are not separate from LCD. They are different ways of arranging the liquid crystals inside an LCD panel, each with different tradeoffs in color, viewing angle, contrast, and speed.</P>
        <P>This is also where a lot of modern confusion begins, because many screens marketed as "LED monitors" are still LCDs. The LED part usually refers to the backlight, not a fundamentally emissive panel. Mini-LED pushes that backlight architecture further with more, smaller lighting zones, but it is still a backlit display system rather than a pixel-level self-emissive one.</P>

        <H3>2. Self-emissive displays</H3>
        <P>These are displays where each pixel produces its own light.</P>
        <P>That is what makes OLED feel so different. Individual pixels can switch off completely, which is why OLED can achieve perfect blacks, very high contrast, and a kind of image depth that backlit panels struggle to reproduce. There is no backlight trying to approximate darkness. The pixel simply stops emitting light.</P>
        <P>This is also why OLED still feels like the reference point in the consumer imagination. Even when someone cannot explain the science, they can usually see the difference.</P>

        <DisplayModelsDiagram />

        <PullQuote>
          Most modern displays work in one of two ways: either there is a light behind the screen being shaped into an image, or each pixel creates its own light.
        </PullQuote>

        <H2>Why TN started feeling limited</H2>
        <P>My current monitor is a TN panel, and TN makes sense once you understand what it optimizes for.</P>
        <P>TN became popular because it was fast, responsive, and practical for competitive gaming. But the tradeoff is familiar to anyone who has used one for years: weaker color reproduction and poor viewing angles compared with IPS.</P>
        <P>And this is where real use matters more than spec sheets.</P>
        <P>A product can be technically good at the thing it was designed for and still become the wrong fit as your life around it changes. That is not a flaw in the product. It is a shift in context.</P>
        <P>When I bought that monitor years ago, speed mattered. Today, I still care about refresh rate, but my use case is wider. Work, reading, browsing, writing, content consumption, and general day-to-day screen time now matter just as much as responsiveness. Once that happens, color quality and viewing comfort stop feeling like luxuries and start feeling like part of the job.</P>

        <PullQuote>
          A lot of buying mistakes happen because people are making today's decisions using yesterday's tradeoffs.
        </PullQuote>

        <H2>Why IPS became the sensible middle ground</H2>
        <P>IPS made sense to me long before I understood the underlying physics, simply because it looked better in the ways I cared about. Better colors. Better consistency. Better viewing angles.</P>
        <P>What I had not fully appreciated is that older assumptions about IPS being much slower than TN have become less rigid over time.</P>
        <P>That is a useful reminder that product categories age, but mental models often do not.</P>
        <P>For my setup, IPS felt like the right answer because it solved the bigger problem. I was not trying to win a panel technology argument. I was trying to create a desk setup that would remain good even after my older monitor stopped being the main one.</P>
        <P>That is a different question, and different questions lead to different "best" products.</P>

        <TechComparisonMatrix />

        <H2>OLED is still the benchmark, even when it is not the purchase</H2>
        <P>I have an old OLED TV at home in Bhubaneswar, bought years ago, and that memory sat in the background while I was evaluating monitors.</P>
        <P>That is the strange thing about OLED. Once you have lived with it, even casually, it becomes the standard your eyes remember.</P>
        <P>So the comparison in my head was never really TN versus IPS.</P>
        <P>It was more like this:</P>
        <ul className="list-none space-y-2 mb-6 ml-4">
          <li className="text-muted-foreground font-body text-base md:text-lg flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2.5 shrink-0" />
            TN reminded me what I was ready to move beyond
          </li>
          <li className="text-muted-foreground font-body text-base md:text-lg flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2.5 shrink-0" />
            IPS felt like the rational upgrade
          </li>
          <li className="text-muted-foreground font-body text-base md:text-lg flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
            OLED remained the aspirational ceiling
          </li>
        </ul>
        <P>That framing helped. Not every purchase needs to be the absolute best technology available. Sometimes the right decision is the one that meaningfully improves the weakest part of your current setup without creating a mismatch elsewhere.</P>

        <H2>The "better for your eyes" question is more nuanced than panel wars suggest</H2>
        <P>One of the easiest mistakes in display conversations is turning image quality into a health claim.</P>
        <P>People often talk about certain panels being "better for your eyes" as if the answer lives entirely inside the panel technology. In practice, it is more complicated.</P>
        <P>Eye comfort is influenced by the full setup: brightness, glare, contrast, text clarity, posture, distance from the screen, ambient lighting, and how long you stay on the screen without a break.</P>
        <P>That does not mean eye-comfort features are meaningless. It means they should be understood correctly.</P>

        <PullQuote>
          The screen is only one part of the experience. The setup is the product.
        </PullQuote>

        <H2>What I ended up buying</H2>
        <P>After all that searching, I landed on the Lenovo Legion 24-10.</P>
        <P>Not because it was the most glamorous option, but because it aligned with the actual job to be done. It is a 23.8-inch Full HD IPS monitor with a 240Hz refresh rate, which let me preserve parity with my existing setup on refresh rate and resolution while still upgrading the panel quality in the direction I actually wanted.</P>
        <P>And that, to me, is the satisfying part of this whole rabbit hole.</P>
        <P>I started out trying to buy a monitor.</P>
        <P>I ended up with a much cleaner way to understand the category.</P>

        <FinalChoiceCard />

        <ConfusionStack />

        <H2>The product lesson I took away</H2>
        <P>The most interesting part of this experience was not the monitor itself. It was how badly this category is communicated to normal buyers.</P>
        <P>Consumers are expected to navigate a maze of overlapping terms such as LCD, LED, IPS, TN, VA, OLED, mini-LED, refresh rate, response time, HDR, and low blue light, even though these labels are often describing completely different layers of the product. Some describe the light source. Some describe panel behavior. Some describe tuning. Some are marketing shorthand. Some are actual technological shifts.</P>
        <P>That makes the buying journey feel more complicated than it needs to be.</P>
        <P>And this is where the Product Manager in me got interested.</P>
        <P>A lot of products do this. They expose implementation language before they establish user mental models. They hand users a taxonomy before they give them a framework. The result is that people compensate with YouTube rabbit holes, Reddit threads, and review-tab archaeology just to make a decision they should have been able to make much earlier.</P>
        <P>Good product communication does not just list features.</P>
        <P>It helps the user understand the system well enough to feel confident in a choice.</P>
        <P>That is really what this display rabbit hole gave me. Not just a monitor decision, but a reminder that clarity is one of the most valuable product features there is.</P>

        <PullQuote>
          Good product communication does not just list features. It helps the user understand the system well enough to feel confident in a choice.
        </PullQuote>

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
    </article>
  </>
);

export default DisplayTechnologyPost;
