import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { profile } from "../data";

export default defineTool({
  name: "get_contact",
  title: "Get contact links",
  description:
    "Return Sambit's public contact channels — email, LinkedIn, Instagram, GitHub, and personal site — for anyone who wants to get in touch.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({ website: profile.website, ...profile.socials }, null, 2),
      },
    ],
    structuredContent: { website: profile.website, ...profile.socials } as Record<string, unknown>,
  }),
});

void z;
