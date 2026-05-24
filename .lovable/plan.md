## 1. About — skills list

Restore the old 8-skill grid in `src/components/About.tsx` with two substitutions:

```
Product Strategy     AI/ML Products    User Research      Agile & Scrum
CRM Integrations     Data Analytics    User Experience    AI-Native PM
```

Changes vs. screenshot: `Figma & UX` → `User Experience`, `Enterprise SaaS` → `AI-Native PM`.

## 2. Workflow — add three tools

In `src/components/Workflow.tsx`, extend the `tools` array (currently 8 items in a 4-col grid) to 11, and slot the new ones into the right stages:

New tool cards:

- **Gems** — "Custom GPT-style agents for repeatable PM tasks"   
  
(this part of Google Gemini - emphasize that as well)

&nbsp;

- **NotebookLM** — "RAG + knowledge bank for product context"
- **Google AI Studio** — "Quick prototyping + model experimentation"

Stage tool-chip updates (the `stages` array):

- Discovery: add `NotebookLM` (RAG over research/transcripts) alongside ChatGPT/Claude/Notion
- Prototype: add `Google AI Studio` alongside Lovable/Cursor/Claude Code
- Validate: add `Gems` alongside Codex/Supabase/GitHub

Grid will become 4 cols × 3 rows (11 cards, last row has 3 — acceptable visually, or we extend to 12 with one more if you prefer a clean fill).

## Notes

- Pure presentation changes; no logic, routes, or data layer touched.
- Theme stays true to hacker-green / lowercase / terminal aesthetic.

Confirm and I'll implement.