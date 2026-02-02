import { defineConfig } from "astro/config";

export default defineConfig({
  // For GitHub Pages deployments, assets need a repo-name base path.
  // Local + Netlify keep base at root ("").
  site:
    process.env.GITHUB_ACTIONS === "true"
      ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
      : undefined,
  base:
    process.env.GITHUB_ACTIONS === "true"
      ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""}`
      : "",
  output: "static"
});