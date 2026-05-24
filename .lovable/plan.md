## 1. Sync homepage content with the new resume

**About (`src/components/About.tsx`)**
- Tighten the HighRadius blurb: keep the autonomous AI agents framing, but add the new beats — co-authored the 2025/2026 Collections roadmap with the VP/CPO and is championing Claude Code in the PM org.
- Refresh the skills grid to match the resume vocabulary: replace "Agile & Scrum" / "Figma & UX" / "Data Analytics" / "CRM Integrations" with a tighter set — `AI-Native PM`, `0→1 Product`, `Roadmap Strategy`, `Discovery & Research`, `O2C / AR Domain`, `Workflow Automation`, `Analytics (Pendo, GA)`, `Figma & Prototyping`. Keep `Product Strategy`, `AI/ML Products`, `Enterprise SaaS`.

**Experience (`src/components/Experience.tsx`)**
- HighRadius (current): replace the "Lovable orchestration layer" bullet with the resume's accurate version — proprietary ML algorithm for the AI + Human Work Assignment Agent (+30% allocation). Add bullets for the 2025/26 AI-first roadmap co-authored with VP/CPO, the LiveCube integration ($300K ARR, 14 clients, 5 new products), and 20+ day-in-the-life studies. Keep the Markov chain and migration bullets.
- Fello: swap the generic "in-app currency 30x" line ordering — add the 20% onboarding reduction (10→8 days), the Cash Offer / one-click quote feature, and the GA + Tag Manager dynamic env for consultants. Keep KW Command, Lead Segments, integrations.
- HighRadius RadiusOne: add Google Workspace 1-click inbox setup and the config-step reduction (60%→10%); tighten the ExtJS→React migration bullet to include "10+ features, 1,000+ bugs."

**Projects (`src/components/Projects.tsx`)**
- Add three new cards at the top so the latest work leads: `Cortex` (second-brain PM app, link to github.com/SAMBAn1/Cortex), `sambitxsamba.com` (this site), and `Strategy Portfolio` (linking to the three sanitized strategy decks listed in the resume: AI-Native PM Workflow, i95Dev GTM, Hybrid Collections Operating Model — rendered as one card with three sub-items).
- Keep existing cards (AI Agents, Markov Engine, RadiusOne, Tags & Workflows, CRM Hub, KW Command, ShrayArchy) but trim to the strongest 6 total so the section doesn't bloat.

## 2. New section: `/ workflow` — How I work with AI

A dedicated section between `Experience` and `Projects`, anchored at `#workflow`, added to the navbar.

**Narrative spine** (pulled from the resume's "AI Native PM Workflow Initiative"):
> Discovery → Prototype → Validate → Ship — powered by an AI-native stack.

**Layout**
- Section header in the existing pattern: `/ workflow` eyebrow, lowercase serif title `How I leverage AI.` with the green italic accent.
- Two-part body:
  1. **Animated pipeline diagram** — a horizontal flow of 4 stages (Discovery, Prototype, Validate, Ship). Each stage is a node with the tool logos used at that stage; a "signal pulse" travels along the connecting line on loop (Framer Motion `animate` with `repeat: Infinity`), and tool chips light up as the pulse passes through. On hover, a stage expands to show the artifact produced (e.g., "Day-in-the-life notes", "Working prototype", "Versioned product guidance", "Live deploy").
  2. **AI tool stack grid** — 8 cards in a 4×2 grid for the tools called out in the resume: Lovable, Claude / Claude Code, ChatGPT, Codex, GitHub, Supabase, Vercel, Cursor. Each card: tool name, one-line role ("Build the working prototype", "Pair-program edits", "Strategy + writing partner", etc.), and a subtle hover state (border lights to primary green, micro-scale, animated cursor blink on the active card cycling every 2s like the hero typewriter).

**Outcome strip** under the diagram — three stat tiles that animate in on scroll: `Discovery → working software in days, not weeks`, `Versioned product guidance shipped per sprint`, `Live app surfaces + DB schema validated before eng commits`. Numbers/phrases pulled from the resume's strategy portfolio.

**Theme fidelity** — uses existing tokens only: `--primary` green, terminal-style lowercase headings prefixed with `/`, blinking cursor accents, `font-display` serif for the title, `font-body` Space Grotesk for body, `border-border` hairlines, `bg-card` surfaces, `hover-lift` utility. No new colors, no new fonts.

**Animation**
- Pipeline pulse: Framer Motion `motion.circle` traversing an SVG path with `pathLength` / `offsetDistance` on a 4s loop.
- Stage nodes: stagger fade-in on scroll-into-view (existing pattern).
- Tool cards: `whileHover={{ y: -4 }}` matching `hover-lift`, plus an `animate-pulse` green dot on the "currently active" card that rotates every 2s.
- Respects `prefers-reduced-motion` — pulse swaps for static glow.

## 3. Navbar + SEO

- Add `Workflow` link to `src/components/Navbar.tsx` between `Experience` and `Projects`, scrolling to `#workflow`.
- No new routes; section sits on `/`. The existing Helmet on `Index` already covers SEO; no changes needed.

## Technical notes

- All edits stay in `src/components/About.tsx`, `Experience.tsx`, `Projects.tsx`, `Navbar.tsx`, plus a new `src/components/Workflow.tsx` mounted in `src/pages/Index.tsx`.
- No new dependencies — Framer Motion and the existing design tokens cover the animations.
- No backend / data changes.
