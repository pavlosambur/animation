import { gsap } from "gsap";
import { elasticOut, prefersReducedMotion } from "../../shared/motion";
import { magneticOffset } from "./geometry";

export interface MagneticParams {
  /** Share of the pointer's distance from centre the button travels. */
  strength: number;
  /** Extra travel of the label on top of the button's, for a little depth. */
  labelStrength: number;
  /** Invisible margin around the button where the pull starts, px. */
  zone: number;
  followDuration: number;
  followEase: string;
  returnDuration: number;
  returnAmplitude: number;
  returnPeriod: number;
}

type QuickTo = ReturnType<typeof gsap.quickTo>;

export function setupMagnetic(zone: HTMLElement, button: HTMLElement, label: HTMLElement, params: MagneticParams) {
  let follow: { x: QuickTo; y: QuickTo; labelX: QuickTo; labelY: QuickTo } | null = null;

  // quickTo bakes its duration in, so it is rebuilt on every entry to pick up panel changes.
  zone.addEventListener("pointerenter", () => {
    if (prefersReducedMotion()) return;
    gsap.killTweensOf([button, label]);
    const vars = { duration: params.followDuration, ease: params.followEase };
    follow = {
      x: gsap.quickTo(button, "x", vars),
      y: gsap.quickTo(button, "y", vars),
      labelX: gsap.quickTo(label, "x", vars),
      labelY: gsap.quickTo(label, "y", vars),
    };
  });

  zone.addEventListener("pointermove", (event) => {
    if (!follow) return;
    // The zone stays still while the button moves, so its centre is the button's resting centre.
    const offset = magneticOffset({ x: event.clientX, y: event.clientY }, zone.getBoundingClientRect(), params.strength);
    follow.x(offset.x);
    follow.y(offset.y);
    follow.labelX(offset.x * params.labelStrength);
    follow.labelY(offset.y * params.labelStrength);
  });

  zone.addEventListener("pointerleave", () => {
    if (!follow) return;
    follow = null;
    gsap.to([button, label], {
      x: 0,
      y: 0,
      duration: params.returnDuration,
      ease: elasticOut(params.returnAmplitude, params.returnPeriod),
      overwrite: true,
    });
  });

  const applyZone = () => (zone.style.padding = `${params.zone}px`);
  applyZone();
  return { applyZone };
}
