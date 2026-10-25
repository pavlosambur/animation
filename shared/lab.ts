import { gsap } from "gsap";
import { Pane } from "tweakpane";
import { prefersReducedMotion } from "./motion";
import { serializeParams } from "./params";

const TEXT = {
  speed: "speed",
  copy: "Copy values",
  copied: "Copied",
  copyFailed: "Copy failed, values are in the console",
  title: (title: string) => (prefersReducedMotion() ? `${title} (reduced motion)` : title),
} as const;

const SPEEDS = { "1×": 1, "0.5×": 0.5, "0.25×": 0.25, "0.1×": 0.1 };
const SLOW_MOTION = 0.25;
const SLOW_MOTION_KEY = "s";
const FEEDBACK_MS = 1500;

/**
 * The tweak panel every experiment starts from: a playback speed (S toggles slow motion) and a
 * button that copies `params` as JSON to send back. Experiments add their own folders to it.
 * Speed scales GSAP's global timeline, so anything animated through GSAP slows down with it.
 */
export function createLab(title: string, params: object): Pane {
  const pane = new Pane({ title: TEXT.title(title) });
  const playback = { speed: 1 };

  const setSpeed = (speed: number) => {
    playback.speed = speed;
    gsap.globalTimeline.timeScale(speed);
    pane.refresh();
  };

  pane
    .addBinding(playback, "speed", { label: TEXT.speed, options: SPEEDS })
    .on("change", ({ value }) => gsap.globalTimeline.timeScale(value));

  window.addEventListener("keydown", (event) => {
    if (event.key !== SLOW_MOTION_KEY || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    setSpeed(playback.speed === 1 ? SLOW_MOTION : 1);
  });

  const copy = pane.addButton({ title: TEXT.copy });
  copy.on("click", async () => {
    const json = serializeParams(params);
    try {
      await navigator.clipboard.writeText(json);
      copy.title = TEXT.copied;
    } catch {
      console.log(json);
      copy.title = TEXT.copyFailed;
    }
    setTimeout(() => (copy.title = TEXT.copy), FEEDBACK_MS);
  });

  return pane;
}
