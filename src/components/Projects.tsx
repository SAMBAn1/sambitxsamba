import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const MAX_DRAWER_TAGS = 3;

type Item = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  external?: boolean;
  internal?: boolean;
  meta?: string;
  image?: string;
  slug?: string; // optional override for drawer label (branded /name_ form)
  status?: string; // optional badge label override (defaults to live/read/case)
};

const featured: Item[] = [
  {
    title: "Cortex",
    description:
      "A second-brain note-taking app for PMs — markdown capture, natural-language dates, wikilinks, graph view, local-first storage, and Claude-powered next-action suggestions.",
    tags: ["React", "Claude API", "Local-first"],
    link: "https://samban1.github.io/Cortex/",
    external: true,
    image: "https://samban1.github.io/Cortex/screenshots/01-dashboard.png",
  },
  {
    title: "Expression Studio",
    description:
      "A visual, Excel-like expression builder for Collections admins — describe the value once, and it compiles to governed SQL that runs where the data already lives. Product concept with a working prototype and case study.",
    tags: ["0→1 Product", "Design System", "SQL Compiler"],
    link: "https://github.com/SAMBAn1/expression-studio",
    external: true,
    image: "/portfolio/expression-studio.png",
    status: "wip",
  },
  {
    title: "Hybrid Collections Worklist Operating Model",
    description:
      "Sanitized product strategy for an enterprise fintech SaaS — a simulation-first migration path that preserves configurability while adding data-driven scoring, transparency and AI-ready extensibility.",
    tags: ["Strategy", "Enterprise", "Migration"],
    link: "https://samban1.github.io/case-studies/worklist-vision/",
    external: true,
    image: "/portfolio/worklist-vision.png",
  },
  {
    title: "AI-Native PM Workflow Initiative",
    description:
      "Pitched an AI-native PM/build stack for the Collections Worklist rebuild — Lovable, ChatGPT, Codex, GitHub, Supabase, Vercel, Claude. Business case and operating model for VP/CPO approval.",
    tags: ["Strategy", "AI-Native", "Operating Model"],
    link: "https://samban1.github.io/case-studies/ai-native-pm-workflow/",
    external: true,
    image: "/portfolio/ai-native-pm-workflow.png",
  },
  {
    title: "GTM Strategy — i95Dev Ecommerce Portal",
    description:
      "Freelance short-form GTM deck to reach the first 100 customers — ICP, positioning, demo strategy, acquisition motion and partner-led outreach for B2B brands on Shopify/Adobe Commerce.",
    tags: ["GTM", "Positioning", "B2B"],
    link: "https://samban1.github.io/case-studies/i95dev-gtm/#roadmap",
    external: true,
    image: "/portfolio/i95dev-gtm.png",
  },
  {
    title: "Intel i9-9900K Overclock",
    description:
      "Pushed an Intel i9-9900K from a 4.7GHz stock boost to a stable 5.3GHz all-core overclock at zero AVX offset, Prime95-stable under a 360mm AIO — a personal build project documented end-to-end.",
    tags: ["Hardware", "Overclocking", "Personal Build"],
    link: "https://samban1.github.io/case-studies/overclock/#result",
    external: true,
    image: "/portfolio/overclock.png",
  },
  {
    title: "ShrayArchy",
    description:
      "Co-founded a handmade clay charms brand with 40k+ followers, 1M+ monthly views, and ~$2k monthly revenue through D2C sales and content.",
    tags: ["D2C", "Content", "Brand"],
    link: "https://www.shrayarchy.com",
    external: true,
    image: "/portfolio/shrayarchy.jpg",
  },
];

const drawer: Item[] = [
  {
    title: "blog",
    slug: "/ blog_",
    description:
      "Long-form notes on AI-native PM workflows, worklist engineering, and product craft.",
    tags: ["Essays", "Notes"],
    link: "/blog",
    internal: true,
  },
  {
    title: "RadiusOne AR Suite",
    slug: "radiusone_ar_suite",
    description:
      "Co-built a net-new SMB-focused SaaS product line from 0→1; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
    tags: ["0→1 Product", "SMB SaaS", "Growth"],
    link: "https://www.highradius.com/company/newsroom/highradius-launches-radiusone-ar-suite/",
    external: true,
  },
  {
    title: "sambitxsamba.com",
    slug: "sambitxsamba.com",
    description:
      "Personal product portfolio and writing hub — the site you're reading right now. Vite + React + shadcn-ui, with a custom blog system and reading experience.",
    tags: ["Portfolio", "Writing", "Design"],
    link: "https://github.com/SAMBAn1/sambitxsamba",
    external: true,
  },
  // Non-clickable items pinned to the bottom
  {
    title: "AI Agents for Autonomous Collections",
    slug: "ai-agents_for_autonomous_collections",
    description:
      "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
    meta: "internal product",
  },
  {
    title: "Markov Chain Worklist Engine",
    slug: "markov_chain_worklist_engine",
    description:
      "Patent-pending engine analyzing 1M+ invoice interactions to predict optimal collector actions — projected 60% reduction in manual prioritization and 20% recovery lift.",
    tags: ["Data Science", "Patent", "Optimization"],
    meta: "patent",
  },
];

const AppCard = ({ item, i }: { item: Item; i: number }) => {
  const isLinked = !!item.link;
  const Wrapper: any = isLinked ? (item.internal ? Link : "a") : "div";
  const linkProps = isLinked
    ? item.internal
      ? { to: item.link }
      : item.external
      ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
      : { href: item.link }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
    >
      <Wrapper
        {...linkProps}
        className={`group relative block h-full rounded-md border border-border bg-card/40 overflow-hidden transition-all duration-300 ${
          isLinked
            ? "hover:border-primary/60 hover:-translate-y-0.5 hover:bg-card/70 cursor-pointer"
            : ""
        }`}
      >
        {item.image ? (
          <div className="relative h-44 border-b border-border overflow-hidden bg-background">
            <img
              src={item.image}
              alt={`${item.title} preview`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(var(--background))_100%)]" />
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, hsl(var(--primary)/0.35) 0 1px, transparent 1px 3px)",
              }}
            />
            <div className="absolute bottom-2 right-3 text-[10px] font-body tracking-[0.2em] uppercase text-primary/80">
              {item.status ?? (item.internal ? "read" : item.link ? "live" : "case")}
            </div>
          </div>
        ) : (
          <div className="relative h-16 border-b border-border overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.18),transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, hsl(var(--primary)/0.12) 0 1px, transparent 1px 6px)",
              }}
            />
            <div className="absolute bottom-2 right-3 text-[10px] font-body tracking-[0.2em] uppercase text-primary/60">
              {item.internal ? "read" : item.link ? "live" : "case"}
            </div>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-primary">
              {item.title}
            </h3>
            {isLinked ? (
              <ArrowUpRight
                className="w-5 h-5 text-muted-foreground shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            ) : (
              <span
                className="shrink-0 text-[10px] font-body tracking-[0.15em] uppercase text-muted-foreground/70 border border-border rounded-full px-2 py-0.5 inline-flex items-center gap-1"
                title={item.meta}
              >
                <Lock className="w-2.5 h-2.5" />
                {item.meta}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-body text-muted-foreground border border-border px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
};

const DrawerRow = ({
  item,
  isOpen,
  onEnter,
}: {
  item: Item;
  isOpen: boolean;
  onEnter: () => void;
}) => {
  const isLinked = !!item.link;
  const Wrapper: any = isLinked ? (item.internal ? Link : "a") : "div";
  const linkProps = isLinked
    ? item.internal
      ? { to: item.link }
      : item.external
      ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
      : { href: item.link }
    : {};

  const metaLabel = item.link ? "open" : item.meta ?? "case";


  const label = item.slug ?? item.title;

  return (
    <div
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={`relative border-t border-border transition-colors duration-200 ${
        isOpen ? "bg-primary/[0.04]" : isLinked ? "bg-primary/[0.015]" : ""
      }`}
    >
      {/* left edge glow: persistent for linked items, stronger on hover */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          opacity: isOpen ? 1 : isLinked ? 0.45 : 0,
          scaleY: isOpen ? 1 : isLinked ? 1 : 0.3,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-1 bottom-1 w-[2px] bg-primary origin-center"
        style={{ boxShadow: "0 0 12px hsl(var(--primary) / 0.6)" }}
      />

      <Wrapper
        {...linkProps}
        className={`group block px-4 py-3 outline-none ${
          isLinked ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden
              className={`font-body text-xs w-3 transition-transform duration-200 ${
                isOpen ? "rotate-90 text-primary" : isLinked ? "text-primary" : "text-primary/30"
              }`}
            >
              ▸
            </span>
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`font-body text-sm md:text-[15px] tracking-tight truncate transition-colors duration-200 ${
                  isOpen ? "text-primary" : "text-foreground/90 group-hover:text-primary"
                }`}
              >
                {label}
              </span>
              <span
                className={`hidden sm:inline-flex items-center gap-1.5 shrink-0 transition-all duration-200 ${
                  isOpen ? "opacity-0 translate-x-1" : "opacity-100 translate-x-0"
                }`}
              >
                {item.tags.slice(0, MAX_DRAWER_TAGS).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-body text-muted-foreground/80 border border-border/60 px-1.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > MAX_DRAWER_TAGS && (
                  <span className="text-[9px] font-body text-muted-foreground/50">···</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-[10px] font-body tracking-[0.2em] uppercase transition-colors ${
                isOpen
                  ? "text-primary/80"
                  : isLinked
                  ? "text-primary/70"
                  : "text-muted-foreground/60"
              }`}
            >
              {metaLabel}
            </span>
            {isLinked && (
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-all duration-200 ${
                  isOpen
                    ? "text-primary translate-x-0.5 -translate-y-0.5"
                    : "text-primary/70 group-hover:text-primary"
                }`}
                aria-hidden
              />
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 pl-6 pr-2">
                <p className="text-muted-foreground text-sm max-w-2xl mb-3">
                  {item.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body text-muted-foreground border border-border px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </div>
  );
};

const Drawer = ({ items }: { items: Item[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setActiveIndex(null)}
      className="border-b border-border rounded-sm"
    >
      {items.map((item, i) => (
        <DrawerRow
          key={item.title}
          item={item}
          isOpen={activeIndex === i}
          onEnter={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            / portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Things I've <span className="italic text-gradient">built.</span>
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((item, i) => (
              <AppCard key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Drawer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Drawer items={drawer} />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
