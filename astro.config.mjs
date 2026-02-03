import { defineConfig } from "astro/config";

const isGhPages = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";

export default defineConfig({
  output: "static",
  // GitHub Pages hosts sites under https://{owner}.github.io/{repo}/
  // We set a base so assets + internal links resolve correctly.
  site: isGhPages && owner && repo ? `https://${owner}.github.io/${repo}/` : undefined,
  base: isGhPages && repo ? `/${repo}/` : "/"
});
