import { gsap } from "gsap";
import { prefersReducedMotion } from "../../shared/motion";
import { coverRadius, type Point } from "./geometry";

export interface LiquidParams {
  inDuration: number;
  inEase: string;
  outDuration: number;
  outEase: string;
}

/**
 * A circle grows from where the pointer came in until it covers the button, and on leaving
 * shrinks toward where the pointer went out. The label colour follows the fill.
 */
export function setupLiquid(button: HTMLElement, fill: HTMLElement, label: HTMLElement, params: LiquidParams) {
  const style = getComputedStyle(button);
  const inkIdle = style.getPropertyValue("--liquid-ink-idle").trim();
  const inkFilled = style.getPropertyValue("--liquid-ink-filled").trim();

  const localPoint = (event: PointerEvent): Point => {
    const rect = button.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  // Sized and centred so that scale 1 covers the whole button from this origin.
  const placeCircle = (origin: Point) => {
    const radius = coverRadius(origin, button.offsetWidth, button.offsetHeight);
    gsap.set(fill, { width: radius * 2, height: radius * 2, left: origin.x - radius, top: origin.y - radius });
  };

  button.addEventListener("pointerenter", (event) => {
    gsap.killTweensOf([fill, label]);
    placeCircle(localPoint(event));
    const duration = prefersReducedMotion() ? 0 : params.inDuration;
    gsap.fromTo(fill, { scale: 0 }, { scale: 1, duration, ease: params.inEase });
    gsap.to(label, { color: inkFilled, duration, ease: params.inEase });
  });

  button.addEventListener("pointerleave", (event) => {
    gsap.killTweensOf([fill, label]);
    // A fully grown circle covers the button from any origin, so it can jump to the exit point
    // unseen; a half-grown one would visibly jump, so it shrinks where it is.
    if (Number(gsap.getProperty(fill, "scale")) >= 1) placeCircle(localPoint(event));
    const duration = prefersReducedMotion() ? 0 : params.outDuration;
    gsap.to(fill, { scale: 0, duration, ease: params.outEase });
    gsap.to(label, { color: inkIdle, duration, ease: params.outEase });
  });
}
