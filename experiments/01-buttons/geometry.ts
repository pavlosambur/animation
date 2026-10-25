export interface Point {
  x: number;
  y: number;
}

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * How far a magnetic element moves toward the pointer: a fraction of the pointer's distance from
 * the box centre. The box must be one that does not move with the element, or the centre chases
 * the pointer and the pull feeds back on itself.
 */
export function magneticOffset(pointer: Point, box: Box, strength: number): Point {
  return {
    x: (pointer.x - (box.left + box.width / 2)) * strength,
    y: (pointer.y - (box.top + box.height / 2)) * strength,
  };
}

/** Radius of a circle centred at `origin` that just covers a width x height box: its farthest corner. */
export function coverRadius(origin: Point, width: number, height: number): number {
  const dx = Math.max(origin.x, width - origin.x);
  const dy = Math.max(origin.y, height - origin.y);
  return Math.hypot(dx, dy);
}
