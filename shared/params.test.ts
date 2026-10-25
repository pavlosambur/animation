import { describe, expect, it } from "vitest";
import { serializeParams } from "./params";

describe("serializeParams", () => {
  it("rounds nested numbers and leaves other values alone", () => {
    const json = serializeParams({ magnetic: { strength: 0.1 + 0.2, ease: "power3.out", on: true } });
    expect(JSON.parse(json)).toEqual({ magnetic: { strength: 0.3, ease: "power3.out", on: true } });
  });

  it("honours the requested precision", () => {
    expect(JSON.parse(serializeParams({ value: 1.23456 }, 1))).toEqual({ value: 1.2 });
  });
});
