# sambitxsamba.com — Personal Portfolio

> A terminal-flavored portfolio for a Product Manager who ships. Built as a product, not a résumé.

**Live:** [sambitxsamba.com](https://sambitxsamba.com) · **Published mirror:** [pp-1-profile.lovable.app](https://pp-1-profile.lovable.app)

---

## The product angle

Most PM portfolios are PDFs pretending to be websites. This one treats the site itself as the artifact — a small, opinionated product with a clear user, a clear job-to-be-done, and a distinct point of view.

- **User:** hiring managers, founders, and peers evaluating me in <60 seconds.
- **JTBD:** "Show me what you've built, how you think, and whether you'd be fun to work with — fast."
- **North-star:** time-to-signal. Every section is optimized for a recruiter skim *and* a deep read.
- **Voice:** dark hacker/terminal aesthetic — lowercase `/section` headings, hacker-green accent (HSL 142), blinking cursor. No stock gradients, no Inter-on-white.

## Information architecture

The section order maps to how people actually evaluate a PM:

```
/hero        →  who + what, in one breath
/about       →  the human + the skill grid
/workflow    →  how I ship with AI (the differentiator)
/portfolio   →  apps, case studies, writing & ventures
/experience  →  the receipts (tabbed career history)
/contact     →  low-friction outreach
```

## Highlights

- **Workflow section** — an interactive AI-native PM pipeline (`discover → ideate → prototype → validate → ship`) linked to a live tool stack (Lovable, Codex, Claude, Gemini Gems, NotebookLM, Google AI Studio, Obsidian, Supabase, VSCode, Vercel, GitHub, ChatGPT). Hover a stage to light up the tools it uses, or hover a tool to see which stages it powers. Each stack block has its own retro-tech visualizer.
- **Portfolio** — grouped into **Apps** (Cortex, RadiusOne A/R Suite, this site), **Case Studies**, and **Writing & Ventures**, with click-through affordances on every linked row.
- **Experience** — tabbed timeline with a fixed vertical rhythm so the accent rail doesn't jump between roles.
- **Interactive portrait** — a Pac-Man-style canvas animation that traces my face. Because why not.
- **MCP server** — the portfolio ships an [MCP](https://modelcontextprotocol.io) endpoint so any agent can query my profile, experience, projects, and workflow as structured tools. Public, no auth.
  - Endpoint: `https://erdtubbraoyaksrabjie.supabase.co/functions/v1/mcp`
  - Tools: `get_profile`, `list_experience`, `list_projects`, `get_workflow`, `get_contact`

## Tech stack

React 18 · Vite 5 · TypeScript · Tailwind CSS v3 · Framer Motion · shadcn/ui · Lovable Cloud (Supabase) for the MCP edge function.

## Design system

- Everything is a semantic token in `src/index.css` — no hardcoded `text-white` / `bg-[#...]` in components.
- Accent: hacker-green `hsl(142 ...)`.
- Type: monospace-forward for headings/labels, clean sans for body.
- Motion is tuned down from the "anime intro" prototype — presence over pyrotechnics.

## Local dev

```sh
npm i
npm run dev   # http://localhost:8080
```

## Project structure

```
src/
  components/     # Hero, About, Workflow, Projects, Experience, Contact, Navbar, ...
  lib/mcp/        # MCP tools + structured portfolio data (source of truth for the agent surface)
  pages/          # Index.tsx (single-page composition), blog routes
supabase/
  functions/mcp/  # Edge function that serves the MCP manifest
```

## Credits

Designed, built, and shipped by **Sambit Samantaray**. Scaffolded and iterated with [Lovable](https://lovable.dev).
