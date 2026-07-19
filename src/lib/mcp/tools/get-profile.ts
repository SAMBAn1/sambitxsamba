import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { profile } from "../data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Return Sambit Samantaray's high-level profile: name, current role, location, summary bio, top skills, and public social/contact links from sambitxsamba.com.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
    structuredContent: profile as unknown as Record<string, unknown>,
  }),
});

// Silences unused-import warnings in strict builds without changing runtime.
void z;
