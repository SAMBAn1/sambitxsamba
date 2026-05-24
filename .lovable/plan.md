## 1. Fix pipeline line overlap

The dotted SVG line is absolutely positioned at the section's vertical center and cuts straight through the labels/chips. Two-part fix:

- Drop the absolute SVG horizontal line. Replace with a connector that lives **between the 01–04 number circles only** (top band), drawn as 3 short dotted segments inside the grid so it can't intersect text. Each segment fills the gap between two adjacent circles using a small flex/grid row above the circles, or a CSS `::after` on each stage (except the last).
- Add an animated traveling pulse dot that moves along the connector as the active stage advances (sequence-aware), giving the "signal traveling the pipeline" feel.

## 2. Stage tool-chip edits

- **Discovery**: `ChatGPT, NotebookLM, Obsidian` (drop Claude, swap Notion → Obsidian)
- **Prototype**: `Lovable, Claude Code, AI Studio` (drop Cursor)
- **Validate**: `Gems, Codex, Supabase, GitHub` (already includes Gems — no change)
- **Ship**: `Vercel, GitHub, VSCode, Lovable` (add VSCode)

## 3. Tool-stack grid edits

- Remove `Cursor` card
- Replace `Notion` card with `Obsidian` — "Second-brain notes & PRD synthesis"
- Add `VSCode` card — "Ship-ready code review & merges"

Result: 12 cards → still 4×3 grid.

## 4. "Hype AF" reveal animation

Goal: product-launch / esports-intro energy, true to the dark hacker-green theme.

**Section intro (on scroll into view)**
- Glitchy headline reveal: split "How I leverage AI." into letters; each letter does a quick `clip-path` + `translateY` reveal with a 20ms stagger, plus a 1-frame green glitch offset on the gradient word.
- A scanline sweep (thin primary-color horizontal bar) crosses the whole section once on enter.
- Section gets a subtle CRT vignette + animated grid background (faint primary-color grid lines drifting upward, very low opacity) — purely decorative, behind content.

**Pipeline reveal**
- Stages enter one-by-one (already staggered) but with: scale-from-0.8 + blur-to-clear + neon ring flash on each circle as it lands.
- Active stage gets an upgraded treatment: pulsing primary halo (multi-ring outward expansion), the `0X` number gets a brief "digit scramble" effect (cycles through 2-3 random digits then locks), and a small `▌` cursor blinks next to the label.
- Connector dotted line gains a moving "energy packet" — a small primary-color dot that traverses each segment in sync with the active stage advance.
- Active stage tool-chips: subtle inner glow + 1px upward float; idle chips stay muted.

**Tool stack grid reveal**
- Cards enter with a staggered "deal-in" (slight rotate + slide-up).
- Active card: replace the boring dot with a 3-bar audio-visualizer indicator (animated heights) — gives the "LIVE" feel.
- Hover gets a small green inner-border-glow + cursor blink suffix on the tool name.

**Outcome strip**
- Each line types itself in (3-frame char reveal, ~30ms per char) with a blinking caret at the end of the currently-revealing line.

**Performance notes**
- All animations use `transform` / `opacity` only — no layout thrash.
- Backgrounds (grid, scanline, vignette) are CSS gradients + a single `motion.div`, no canvas, no extra deps.
- Respect `prefers-reduced-motion`: collapse to a single fade-in.

## 5. Files touched

- `src/components/Workflow.tsx` — all of the above
- Possibly `src/index.css` — 1–2 keyframes (`scanline`, `grid-drift`, `digit-flicker`) if cleaner than inline

Confirm and I'll build it.