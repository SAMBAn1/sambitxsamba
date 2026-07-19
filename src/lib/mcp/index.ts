import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listExperience from "./tools/list-experience";
import listProjects from "./tools/list-projects";
import getWorkflow from "./tools/get-workflow";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "sambitxsamba-mcp",
  title: "sambitxsamba.com",
  version: "0.1.0",
  instructions:
    "Public MCP server for Sambit Samantaray's product portfolio (sambitxsamba.com). Use these tools to answer questions about Sambit's profile, work experience, portfolio projects, AI-native PM workflow, and public contact links. All data is public.",
  tools: [getProfile, listExperience, listProjects, getWorkflow, getContact],
});
