import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { workflow } from "../data";

export default defineTool({
  name: "get_workflow",
  title: "Get AI-native PM workflow",
  description:
    "Return Sambit's AI-native PM workflow: the pipeline stages (Discovery → Ideate → Prototype → Validate → Ship) with per-stage artifacts and the underlying AI tool stack he uses.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(workflow, null, 2) }],
    structuredContent: workflow as unknown as Record<string, unknown>,
  }),
});

void z;
