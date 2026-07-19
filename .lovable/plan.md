## Portfolio section restructure

Turn `src/components/Projects.tsx` into two flat subsections (no visible group labels like "// apps"), keeping the current section header ("Things I've built.") and the on-brand terminal aesthetic.

### 1. Featured (app cards with previews)

A 2-column grid of large cards, same visual language as the existing Cortex card (screenshot preview + scanline overlay + fade + terminal chrome), for apps that have their own live site:

- **Cortex** — `https://samban1.github.io/Cortex/`, preview `screenshots/01-dashboard.png` (already wired).
- **ShrayArchy** — `https://www.shrayarchy.com`, preview captured from the site (fetch page, pick the strongest hero/product shot, save to `public/portfolio/shrayarchy.jpg` and reference locally so it never breaks if their site changes).
- **RadiusOne AR Suite** — kept as a featured card. It has no product screenshot we can host, so it uses the existing terminal accent strip (no image), and links to the HighRadius press release.
- **sambitxsamba.com** — kept as a featured card with the terminal accent strip, linking to the GitHub repo.

No "// apps" label above the grid — the grid speaks for itself.

### 2. Drawer (everything else)

Below Featured, a single "file drawer" list containing every remaining item — case studies, blog, and any app-shaped item without its own site (currently only "AI Agents for Autonomous Collections"). No visible group labels.

Items, in order:
1. `blog_` — internal link to `/blog`, styled with the branded `/name_` convention (leading slash, trailing blinking underscore), matching the site's terminal branding instead of the word "Writing".
2. `ai-agents_for_autonomous_collections`
3. `ai-native_pm_workflow_initiative`
4. `gtm_strategy_i95dev_ecommerce_portal`
5. `hybrid_collections_worklist_operating_model`
6. `markov_chain_worklist_engine`

Each row renders collapsed as a single line: a small file-tab glyph on the left, the `slug_` title, and a right-aligned meta chip (`live`, `read`, `case`, or `internal product`). Rows sit flush against each other with a 1px hairline separator so the collapsed state literally looks like file tabs stacked in a drawer.

**Hover interaction (the "drawer" feel):**
- Hovered row smoothly expands (Framer Motion `height: auto`, ~220–280ms, ease-out) to reveal: description, tags, and the `ArrowUpRight` affordance if linked. Slight lift (`-translate-y-0.5`), left edge glows in primary green, and the file-tab glyph flips from closed to open.
- Only one row is expanded at a time. When the pointer moves to a sibling row, the previously expanded row collapses in the same tween — producing the "one pops up, the next comes down" motion the user described. Managed with a single `hoveredIndex` state on the drawer container; `onMouseLeave` on the container resets to `null` so nothing stays expanded when the mouse leaves the drawer.
- Keyboard/touch parity: `focus-within` behaves like hover so tab navigation and mobile taps also expand a row. On touch (no hover), tapping a row toggles it; tapping its title/affordance still navigates.
- All motion respects `prefers-reduced-motion` — expansion becomes an instant show/hide, no lift.

### Screenshot capture for ShrayArchy

- Fetch `https://www.shrayarchy.com` via a scripted headless browser (Playwright already available in the sandbox) at 1280×1800, capture a viewport screenshot of the hero, downscale/crop to a 16:9-ish preview, and commit as `public/portfolio/shrayarchy.jpg`.
- Referenced from `AppCard` as `/portfolio/shrayarchy.jpg` so the asset is served from our own origin.

### MCP data sync

Update `src/lib/mcp/data.ts` so the tool responses match the new grouping: keep the existing `category` field but collapse to two buckets (`featured`, `drawer`) so `list_projects` reflects what the site actually shows. Regenerate `.lovable/mcp/manifest.json` after the data change.

### Files touched

- `src/components/Projects.tsx` — remove `GroupLabel` usage, split into Featured grid + Drawer list, add the animated hover-expand row component, restyle blog row with `/blog_` convention.
- `public/portfolio/shrayarchy.jpg` — new asset.
- `src/lib/mcp/data.ts` — recategorize items into `featured` / `drawer`.
- `.lovable/mcp/manifest.json` — regenerated.

### Out of scope

- No changes to section ordering, navbar, other sections, colors, fonts, or global tokens.
- No changes to the Cortex screenshot source (still hotlinked from the Cortex site as it is today) — only ShrayArchy gets a locally hosted preview because we're capturing it fresh.
