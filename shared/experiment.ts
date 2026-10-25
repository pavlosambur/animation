export interface ExperimentMeta {
  title: string;
  description: string;
}

const TEXT = {
  documentTitle: (title: string) => `${title} · Animation playground`,
} as const;

/** Keeps the page heading and tab title in step with the gallery card, from one source. */
export function applyMeta(meta: ExperimentMeta): void {
  document.title = TEXT.documentTitle(meta.title);
  requireElement("h1").textContent = meta.title;
}

export function requireElement<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}
