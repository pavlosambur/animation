import "../shared/base.css";
import "./style.css";
import { gsap } from "gsap";
import { requireElement, type ExperimentMeta } from "../shared/experiment";
import { prefersReducedMotion } from "../shared/motion";

const TEXT = {
  empty: "No experiments yet.",
} as const;

// Each experiment's meta.ts is its gallery card, so a new folder shows up here without edits.
const metas = import.meta.glob<ExperimentMeta>("/experiments/*/meta.ts", { eager: true, import: "meta" });

const gallery = requireElement(".gallery");
const entries = Object.entries(metas).sort(([a], [b]) => a.localeCompare(b));

for (const [path, meta] of entries) {
  const card = document.createElement("a");
  card.className = "card";
  // Relative, so the same link works on the dev server and under the Pages subpath.
  card.href = `.${path.replace(/meta\.ts$/, "")}`;
  const title = document.createElement("h2");
  title.textContent = meta.title;
  const description = document.createElement("p");
  description.textContent = meta.description;
  card.append(title, description);
  gallery.append(card);
}

if (entries.length === 0) {
  const empty = document.createElement("p");
  empty.className = "lead";
  empty.textContent = TEXT.empty;
  gallery.append(empty);
}

if (!prefersReducedMotion()) {
  gsap.from(".gallery > *", { y: 16, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 });
}
