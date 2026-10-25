import { describe, expect, it } from "vitest";
import { coverRadius, magneticOffset } from "./geometry";

const box = { left: 100, top: 50, width: 200, height: 80 };

describe("magneticOffset", () => {
  it("does not move when the pointer is at the centre", () => {
    expect(magneticOffset({ x: 200, y: 90 }, box, 0.5)).toEqual({ x: 0, y: 0 });
  });

  it("moves a fraction of the distance toward the pointer", () => {
    expect(magneticOffset({ x: 300, y: 50 }, box, 0.5)).toEqual({ x: 50, y: -20 });
  });

  it("stays put at zero strength", () => {
    expect(magneticOffset({ x: 0, y: 0 }, box, 0)).toEqual({ x: -0, y: -0 });
  });
});

describe("coverRadius", () => {
  it("reaches the opposite corner from a corner", () => {
    expect(coverRadius({ x: 0, y: 0 }, 300, 400)).toBe(500);
  });

  it("is half the diagonal from the centre", () => {
    expect(coverRadius({ x: 150, y: 200 }, 300, 400)).toBe(250);
  });

  it("covers every corner from any point inside", () => {
    const origin = { x: 70, y: 10 };
    const radius = coverRadius(origin, 200, 60);
    for (const [x, y] of [[0, 0], [200, 0], [0, 60], [200, 60]] as const) {
      expect(Math.hypot(x - origin.x, y - origin.y)).toBeLessThanOrEqual(radius);
    }
  });
});
