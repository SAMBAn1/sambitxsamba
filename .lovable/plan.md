## Workflow section (`src/components/Workflow.tsx`)

- **Remove the radial glow** behind active stage titles entirely. Active state stays signaled by the existing text-shadow + green color + blinking `▌` caret.
- **Tighten spacing** between the pipeline card and the `/ stack` grid: change `mb-20` on the pipeline wrapper to `mb-8`.

## Projects section (`src/components/Projects.tsx`)

- **Replace the single "Strategy Portfolio" row** with three separate line items, each in the same row style as other projects:
  1. **AI-Native PM Workflow Initiative** — [https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk](https://drive.google.com/file/d/1aFZoRTBRF6xcMmVjH-n_wf_8eehcYl_n/view?usp=drivesdk). Tags: Strategy, AI-Native, Operating Model.
  2. **GTM Strategy — i95Dev Ecommerce Portal** — [https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk](https://drive.google.com/file/d/1SGSIMg6tsPNZI1E0UaHFHxNleaBM8xcp/view?usp=drivesdk). Tags: GTM, Positioning, B2B.
  3. **Hybrid Collections Worklist Operating Model** — [https://drive.google.com/file/d/10ofKzQDKvwCFwT3AiVyrHZ-3w1LgMaRt/view?usp=drivesdk](https://drive.google.com/file/d/10ofKzQDKvwCFwT3AiVyrHZ-3w1LgMaRt/view?usp=drivesdk). Tags: Strategy, Enterprise, Migration.
- **Move ShrayArchy up** to sit right after the three strategy items.
- **Final order**: Cortex → sambitxsamba.com → AI-Native PM Workflow → i95Dev GTM → Hybrid Collections Operating Model → ShrayArchy → AI Agents for Autonomous Collections → Markov Chain Worklist Engine → RadiusOne AR Suite.
- **Wire up links from the resume**:
  - Cortex → `https://github.com/SAMBAn1/Cortex` (external)
  - sambitxsamba.com → `https://github.com/SAMBAn1/sambitxsamba` (external)
  - ShrayArchy → `https://www.shrayarchy.com` (external)
- **Click affordance**: linked rows render as `<a>` (external opens in new tab via `target="_blank" rel="noopener noreferrer"`); unlinked rows render as plain `<div>` with no hover-bg shift.
- **Icon**: add a lucide `ArrowUpRight` icon inline next to the title, **only on linked rows**. Default muted, turns primary green and nudges up-right on row hover — clean, unambiguous "click to open" cue. Unlinked rows show no icon so it never looks broken.