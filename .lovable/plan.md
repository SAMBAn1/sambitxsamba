## Fix blog drawer label spacing

**Current state:** The blog drawer item is labeled `/blog_` (no space after the slash).

**Problem:** The intended terminal-prompt aesthetic is `/ blog_` — a forward slash followed by a space, then "blog" and a blinking cursor underscore. Without the space it reads as a file path rather than a command-line prompt.

**Change:**
- In `src/components/Projects.tsx`, update the `slug` for the blog drawer item from `/blog_` to `/ blog_`.
- Keep the blinking cursor block (`▌`) behavior unchanged.
- No other drawer labels or logic change.

**Files touched:**
- `src/components/Projects.tsx`

This is a single-character spacing fix to align the label with the terminal-prompt branding.