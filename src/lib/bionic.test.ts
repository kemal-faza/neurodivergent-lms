import { describe, expect, test } from "vitest";
import { toBionic } from "./bionic";

describe("toBionic", () => {
  test("bolds the first half of each word", () => {
    const out = toBionic("hello world");
    expect(out).toContain("<b>hel</b>lo");
    expect(out).toContain("<b>wor</b>ld");
  });

  test("preserves whitespace between words", () => {
    const out = toBionic("hello world");
    expect(out).toBe("<b>hel</b>lo <b>wor</b>ld");
  });

  test("handles single short words", () => {
    expect(toBionic("a")).toBe("<b>a</b>");
  });
});
