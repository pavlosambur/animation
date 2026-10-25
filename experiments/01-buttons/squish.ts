import { gsap } from "gsap";
import { elasticOut, prefersReducedMotion } from "../../shared/motion";

export interface SquishParams {
  /** Hover rise, px. */
  hoverLift: number;
  /** Scale while held: wider and flatter, like something soft being pressed. */
  squashX: number;
  squashY: number;
  pressDuration: number;
  releaseDuration: number;
  releaseAmplitude: number;
  releasePeriod: number;
}

const HOVER_DURATION = 0.25;
const PRESS_KEYS = new Set([" ", "Enter"]);

export function setupSquish(button: HTMLElement, params: SquishParams) {
  let pressed = false;

  // overwrite "auto" kills only tweens on the same properties, so a press never cancels the lift.
  const press = () => {
    if (pressed || prefersReducedMotion()) return;
    pressed = true;
    gsap.to(button, {
      scaleX: params.squashX,
      scaleY: params.squashY,
      duration: params.pressDuration,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const release = () => {
    if (!pressed) return;
    pressed = false;
    gsap.to(button, {
      scaleX: 1,
      scaleY: 1,
      duration: params.releaseDuration,
      ease: elasticOut(params.releaseAmplitude, params.releasePeriod),
      overwrite: "auto",
    });
  };

  const lift = (y: number) => {
    if (prefersReducedMotion()) return;
    gsap.to(button, { y, duration: HOVER_DURATION, ease: "power2.out", overwrite: "auto" });
  };

  button.addEventListener("pointerenter", () => lift(-params.hoverLift));
  button.addEventListener("pointerleave", () => {
    lift(0);
    release();
  });
  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("keydown", (event) => {
    if (PRESS_KEYS.has(event.key) && !event.repeat) press();
  });
  button.addEventListener("keyup", (event) => {
    if (PRESS_KEYS.has(event.key)) release();
  });
  button.addEventListener("blur", release);
}
