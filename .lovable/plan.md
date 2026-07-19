# Portfolio restructure + section reorder

## 1. Section reorder (`src/pages/Index.tsx`)

New order below the Hero:
`About → Workflow → Portfolio → Experience → Contact`

No content changes to the sections themselves, just the order of the components rendered in `Index.tsx`. Navbar links already use anchors (`#about`, `#workflow`, `#portfolio`, `#experience`, `#contact`) so the nav order will be updated to match.

## 2. Portfolio — rename + categorize (`src/components/Projects.tsx`)

- Heading changes from **"Things I've built."** to **"Things I've created or built."** (keep the `italic text-gradient` styling on the last word).
- Section label stays `/ portfolio`.
- Split the current flat list into three grouped subsections, each introduced by a small terminal-style label consistent with the rest of the site (`// apps`, `// case studies`, `// writing`).

Category mapping:

**Apps** (things with a live product surface — get the featured treatment, see §3)
- Cortex — link updated to `https://samban1.github.io/Cortex/` (new marketing site, replaces the GitHub repo link).
- RadiusOne AR Suite — link updated to the HighRadius press release: `https://www.highradius.com/company/newsroom/highradius-launches-radiusone-ar-suite/`.
- AI Agents for Autonomous Collections — no external link (internal HighRadius product), stays as an app card without an outbound arrow.
- sambitxsamba.com — the site itself; kept here as an app entry.

**Case studies** (strategy decks + operating models, all Drive-linked)
- AI-Native PM Workflow Initiative
- GTM Strategy — i95Dev Ecommerce Portal
- Hybrid Collections Worklist Operating Model
- Markov Chain Worklist Engine (unlinked, as per prior decision)

**Writing / Ventures** (the outliers — one D2C brand, everything else on the site's `/blog` route)
- ShrayArchy — links out to shrayarchy.com.
- A single "Writing" entry that links to `/blog` (internal route), so the blog surface is discoverable from the portfolio itself.

## 3. Apps showcase — featured treatment

The three grouped subsections are all rendered inside the existing Portfolio section (same container, same section label, same heading). Only the **Apps** group gets a richer visual treatment; **Case studies** and **Writing** keep the current stacked-row layout so the section stays scannable and doesn't balloon in height.

**Apps layout** — a 2-column responsive grid of larger "app cards" (single column on mobile). Each card contains:
- App name (display font, larger).
- One-line tagline (existing `description`, trimmed to one sentence where needed).
- A compact tag row (existing `tags`).
- A `Visit ↗` affordance in the corner for linked apps; unlinked apps (AI Agents for Autonomous Collections) show a muted `Internal product` label instead of the arrow.
- Subtle hover: brand-green border + slight lift, matching the existing hover treatment on project rows.
- Optional small "screenshot placeholder" strip at the top of each card — a thin gradient/mono band using the existing hacker-green tokens (no real screenshots yet; kept as a lightweight visual accent so cards feel like product tiles without requiring image assets). If the user later provides screenshots we can drop them in.

Inspiration reference (behavior, not visuals we copy): Linear's "Product" cards, Rauno Freiberg's project index, Vercel's Templates grid — larger tiles for shipped products, smaller rows for supporting artifacts. All styled with the existing dark / hacker-green / lowercase-`/`-heading system — no new colors, fonts, or gradients introduced.

## 4. MCP data sync (`src/lib/mcp/data.ts`)

Update the `projects` array so the MCP `list_projects` tool stays in sync:
- Cortex `link` → new marketing site URL.
- RadiusOne AR Suite `link` → HighRadius press release URL.
- Add a `category` field (`"app" | "case_study" | "writing"`) on each entry so agents can filter by category too.
- Add the `Writing` entry pointing to `/blog` (absolute URL: `https://sambitxsamba.com/blog`).

## 5. Out of scope for this plan

- No new screenshot assets are added (the app cards use a token-based accent band; real screenshots can be dropped in later).
- No changes to About, Workflow, Experience, Contact, Hero, Navbar visuals beyond the anchor-order reshuffle in the nav links.
- No changes to the MCP tool signatures — only the underlying `data.ts` content changes.

## Technical notes

- Files touched: `src/pages/Index.tsx`, `src/components/Navbar.tsx` (link order only), `src/components/Projects.tsx`, `src/lib/mcp/data.ts`.
- Projects component becomes: heading → `AppsGrid` (2-col) → `CaseStudiesList` (current row style) → `WritingList` (current row style). All three share the section's max-width container so vertical rhythm stays consistent.
- Framer Motion entrance animations are preserved and reapplied per group (stagger by index within each group).
- Cortex + RadiusOne links open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), matching existing external-link behavior. The Writing entry uses an internal `<Link to="/blog">` so it stays within the SPA.
