const EASE_NAMES = [
  "none",
  "power1.out",
  "power2.out",
  "power3.out",
  "power4.out",
  "expo.out",
  "circ.out",
  "sine.out",
  "back.out(1.7)",
  "power2.in",
  "power3.in",
  "power2.inOut",
  "power3.inOut",
  "expo.inOut",
] as const;

/** Tweakpane list options for picking a GSAP ease by name. */
export const EASE_OPTIONS: Record<string, string> = Object.fromEntries(EASE_NAMES.map((name) => [name, name]));

/** Springs are tuned as two numbers rather than picked from a list, so they get their own builder. */
export function elasticOut(amplitude: number, period: number): string {
  return `elastic.out(${amplitude}, ${period})`;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
