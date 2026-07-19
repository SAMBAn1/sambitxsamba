import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

type Item = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  external?: boolean;
  internal?: boolean; // internal SPA route (react-router)
  meta?: string; // muted label shown when there is no outbound link
  image?: string; // optional preview image URL (replaces the accent strip)
};

const apps: Item[] = [
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
    title: "RadiusOne AR Suite",
    description:
      "Co-built a net-new SMB-focused SaaS product line from 0→1; identified $1B addressable market and onboarded 20+ clients contributing $9M ARR.",
    tags: ["0→1 Product", "SMB SaaS", "Growth"],
    link: "https://www.highradius.com/company/newsroom/highradius-launches-radiusone-ar-suite/",
    external: true,
  },
  {
    title: "AI Agents for Autonomous Collections",
    description:
      "Shipped AI agents that autonomously prioritize and allocate collection work, resulting in 50% FTE reduction across enterprise AR operations.",
    tags: ["AI/ML", "Enterprise SaaS", "Automation"],
    meta: "internal product",
  },
  {
    title: "sambitxsamba.com",
    description:
      "Personal product portfolio and writing hub — the site you're reading right now. Vite + React + shadcn-ui, with a custom blog system and reading experience.",
    tags: ["Portfolio", "Writing", "Design"],
    link: "https://github.com/SAMBAn1/sambitxsamba",
    external: true,
  },
];

const caseStudies: Item[] = [
  {
    title: "AI-Native PM Workflow Initiative",
    description:
      "Created and pitched an AI-native PM/build stack for the Collections Worklist rebuild — combining Lovable, ChatGPT, Codex, GitHub, Supabase, Vercel and Claude. Built the business case and operating model for VP/CPO approval.",
    tags: ["Strategy", "AI-Native", "Operating Model"],
    link: "https://drive.google.com/file/d/1aFZoRTBRF6xcMmVjH-n_wf_8eehcYl_n/view?usp=drivesdk",
    external: true,
  },
  {
    title: "GTM Strategy — i95Dev Ecommerce Portal",
    description:
      "Freelance short-form GTM guidance deck to reach the first 100 customers — ICP, positioning, demo strategy, acquisition motion and partner-led outreach for wholesalers, distributors and B2B brands on Shopify/Adobe Commerce.",
    tags: ["GTM", "Positioning", "B2B"],
    link: "https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk",
    external: true,
  },
  {
    title: "Hybrid Collections Worklist Operating Model",
    description:
      "Sanitized product strategy and operating model for an enterprise fintech SaaS — a simulation-first migration path that preserves configurability while adding data-driven scoring, transparency and AI-ready extensibility.",
    tags: ["Strategy", "Enterprise", "Migration"],
    link: "https://drive.google.com/file/d/10ofKzQDKvwCFwT3AiVyrHZ-3w1LgMaRt/view?usp=drivesdk",
    external: true,
  },
  {
    title: "Markov Chain Worklist Engine",
    description:
      "Patent-pending engine analyzing 1M+ invoice interactions to predict optimal collector actions — projected 60% reduction in manual prioritization and 20% recovery lift.",
    tags: ["Data Science", "Patent", "Optimization"],
  },
];

const writing: Item[] = [
  {
    title: "Writing",
    description:
      "Long-form notes on AI-native PM workflows, worklist engineering, and product craft — published on this site.",
    tags: ["Blog", "Essays"],
    link: "/blog",
    internal: true,
  },
  {
    title: "ShrayArchy",
    description:
      "Co-founded a handmade clay charms brand with 40k+ followers, 1M+ monthly views, and ~$2k monthly revenue through D2C sales and content.",
    tags: ["D2C", "Content", "Entrepreneurship"],
    link: "https://www.shrayarchy.com",
    external: true,
  },
];

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-primary/70 font-body text-[11px] tracking-[0.3em] uppercase mb-6">
    {children}
  </p>
);

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
        {/* preview: screenshot if provided, otherwise the terminal accent strip */}
        {item.image ? (
          <div className="relative h-44 border-b border-border overflow-hidden bg-background">
            <img
              src={item.image}
              alt={`${item.title} preview`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
            {/* scanline + tint overlay to keep it on-theme */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(var(--background))_100%)]" />
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, hsl(var(--primary)/0.35) 0 1px, transparent 1px 3px)",
              }}
            />
            <div className="absolute top-2 left-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            </div>
            <div className="absolute bottom-2 right-3 text-[10px] font-body tracking-[0.2em] uppercase text-primary/80">
              {item.internal ? "read" : item.link ? "live" : "case"}
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
            <div className="absolute top-2 left-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            </div>
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

const RowItem = ({ item, i }: { item: Item; i: number }) => {
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
        className={`block py-6 border-t border-border transition-colors duration-300 px-4 -mx-4 rounded-sm group ${
          isLinked ? "hover:bg-primary/5 cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-2 transition-colors duration-300 group-hover:text-primary inline-flex items-center gap-2">
              {item.title}
              {isLinked && (
                <ArrowUpRight
                  className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              )}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">{item.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-body text-muted-foreground border border-border px-3 py-1 rounded-full"
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

        {/* Apps */}
        <div className="mb-20">
          <GroupLabel>// apps</GroupLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {apps.map((item, i) => (
              <AppCard key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Case studies */}
        <div className="mb-20">
          <GroupLabel>// case studies</GroupLabel>
          <div className="space-y-1">
            {caseStudies.map((item, i) => (
              <RowItem key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Writing */}
        <div>
          <GroupLabel>// writing &amp; ventures</GroupLabel>
          <div className="space-y-1">
            {writing.map((item, i) => (
              <RowItem key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
