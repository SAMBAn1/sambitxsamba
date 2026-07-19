import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description:
    "Return the portfolio projects showcased on sambitxsamba.com (title, description, tags, optional external link). Optionally filter by a tag substring (case-insensitive).",
  inputSchema: {
    tag: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Case-insensitive substring to match against a project's tags, e.g. 'AI' or 'Strategy'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ tag }) => {
    const items = tag
      ? projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
      : projects;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items } as Record<string, unknown>,
    };
  },
});
