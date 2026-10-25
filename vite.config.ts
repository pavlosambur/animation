import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = import.meta.dirname;
const experimentsDir = resolve(root, "experiments");

// Every experiments/<name>/index.html is its own page; the dev server finds them by URL,
// the production build needs them listed explicitly.
const experimentPages = existsSync(experimentsDir)
  ? Object.fromEntries(
      readdirSync(experimentsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => [entry.name, resolve(experimentsDir, entry.name, "index.html")] as const)
        .filter(([, page]) => existsSync(page)),
    )
  : {};

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; the deploy workflow passes that path in.
  base: process.env.BASE_PATH ?? "/",
  build: {
    rollupOptions: {
      input: { gallery: resolve(root, "index.html"), ...experimentPages },
    },
  },
});
