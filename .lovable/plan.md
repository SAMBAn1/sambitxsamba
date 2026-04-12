

## Plan: Add Interactive Illustrations to the Display Technology Blog Post

This plan implements the 13 interactive visual elements described in your instructions file, all built with Framer Motion, CSS, and React — no external libraries needed.

### What will be added

1. **Hero animation** — A minimal screen silhouette that transitions from backlit glow to self-emissive pixel grid, with "Backlit" / "Self-emissive" labels fading in/out. Placed above the title.

2. **Ambient intro illustration** — Faint linework desk setup (monitor outlines, floating spec labels like `TN`, `IPS`, `240Hz`) behind the opening paragraph. Low opacity, atmospheric.

3. **Confusion-to-clarity scroll transition** — Scattered display terms (`TN`, `IPS`, `OLED`, `HDR`, etc.) that reorganize into two clean buckets ("Backlit displays" / "Self-emissive displays") as user scrolls into view.

4. **Layered display explainer** — Scroll-triggered diagram revealing backlight → LCD → color filter → image layers one by one, then dissolving into a self-emissive pixel grid with pixels turning off.

5. **"Rabbit hole" scroll divider** — A horizontal visual threshold between the personal story and tech explanation sections, transitioning from a simple monitor shape into abstract pixel/layer structures.

6. **Comparison matrix with hover states** — Replace the current star-rating table with an editorial hover-interactive version. Hovering a column highlights it and reveals a plain-language summary note.

7. **Pixel blackout illustration** — In the OLED section, a grid showing backlit "dark" (faintly glowing) vs self-emissive "dark" (pixels fully off). Triggered on scroll.

8. **Confusion stack upgrade** — Enhance the existing `ConfusionStack` with hover/tap interactions that show examples and subtle connecting lines between layers.

9. **Eye comfort ambient illustration** — Minimal line-drawing desk setup with toggleable states (brightness, glare, posture, distance) via hover/tap.

10. **Final decision card upgrade** — Expand the existing `FinalChoiceCard` to reveal reasoning on interaction (why 24", why IPS, why 240Hz, why future-proof).

11. **Pull quote motion treatment** — Add subtle word-sharpening (blur-to-clear) animation on key words within pull quotes as they enter view.

12. **Scroll-progress reading rail** — Already exists as `ReadingProgress` component; enhance with tiny section markers that show names on hover.

13. **Final ending animation** — Scattered terminology settling into a clean backlit vs self-emissive visual with the caption "Once the system is clear, the choice becomes easier."

### Technical approach

- All new illustration components will be added to `src/components/blog/DisplayTechnologyPost.tsx` (or extracted into a helper file if too large)
- Use `framer-motion` for scroll-triggered animations (`whileInView`, `useScroll`, `useTransform`)
- Use `useState` for hover/tap interactive states
- Respect `prefers-reduced-motion` via a shared hook
- CSS-first where possible (opacity, transforms), Framer Motion for orchestration
- Mobile: simplify scroll-sensitive elements to basic `whileInView` fade-ins; interactive hover states become tap toggles

### File changes

| File | Change |
|------|--------|
| `src/components/blog/DisplayTechnologyPost.tsx` | Major rewrite — add all 13 illustration components inline or imported, place them at the correct article positions |
| `src/components/blog/display-illustrations.tsx` (new) | Extract the larger illustration components to keep the main file readable |
| `src/components/ReadingProgress.tsx` | Minor enhancement — add section markers with hover labels |

### Implementation order

1. Build all illustration components (grouped in `display-illustrations.tsx`)
2. Integrate them into `DisplayTechnologyPost.tsx` at the correct positions in the article flow
3. Enhance `ReadingProgress.tsx` with section markers
4. Test animations and reduced-motion fallbacks

