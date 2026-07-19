import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { experience } from "../data";

export default defineTool({
  name: "list_experience",
  title: "List work experience",
  description:
    "Return Sambit's professional experience timeline (company, role, period, location, description, highlights). Optionally filter by company name (case-insensitive substring match).",
  inputSchema: {
    company: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Case-insensitive substring to filter by company name, e.g. 'HighRadius'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ company }) => {
    const items = company
      ? experience.filter((e) => e.company.toLowerCase().includes(company.toLowerCase()))
      : experience;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items } as Record<string, unknown>,
    };
  },
});
