import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Everything in the repository is English. The range is built from code points so that this
// guard does not itself contain the characters it forbids.
const CYRILLIC = new RegExp(`[${String.fromCodePoint(0x0400)}-${String.fromCodePoint(0x04ff)}]`, "u");

// Only tracked files are checked, so a new file is covered once it is staged.
const trackedFiles = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);

describe("repository text", () => {
  it("has files to check", () => {
    expect(trackedFiles.length).toBeGreaterThan(0);
  });

  it("contains no Cyrillic", () => {
    const hits = trackedFiles.flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, index) => (CYRILLIC.test(line) ? [`${file}:${index + 1}`] : [])),
    );
    expect(hits).toEqual([]);
  });
});
