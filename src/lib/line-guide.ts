/**
 * Line Guide — pure functions for snap-to-line and keyboard navigation logic.
 *
 * These functions are DOM-independent and fully testable.
 */

export interface LineRect {
  top: number;
  bottom: number;
  height: number;
  left: number;
  width: number;
}

/**
 * Given a Y-coordinate and an array of line rects, returns the
 * nearest line rect.  Uses an 8px tolerance window for "exact"
 * matches, then falls back to absolute nearest line.
 */
export function snapToLine(y: number, lines: LineRect[]): LineRect | null {
  if (lines.length === 0) return null;

  const tolerance = 8; // px — subtle snap feel without being too aggressive

  // First pass: exact match within tolerance
  const exact = lines.find(
    (l) => y >= l.top - tolerance && y <= l.bottom + tolerance,
  );
  if (exact) return exact;

  // Second pass: absolute nearest (midpoint comparison)
  const sorted = [...lines].sort((a, b) => {
    const midA = a.top + a.height / 2;
    const midB = b.top + b.height / 2;
    return Math.abs(y - midA) - Math.abs(y - midB);
  });

  return sorted[0] ?? null;
}

/**
 * Calculate the next line index for keyboard navigation.
 * Direction: -1 = up, 1 = down.  Clamps within [0, total-1].
 */
export function getNextLineIndex(
  current: number,
  direction: -1 | 1,
  total: number,
): number {
  const next = current + direction;
  if (next < 0) return 0;
  if (next >= total) return total - 1;
  return next;
}

/**
 * DOM-DEPENDENT: Scans text block elements inside `container` and
 * returns their per-line bounding rects using Range.getClientRects().
 *
 * Only <p>, <h2-6>, and <li> elements are scanned.
 * Results are viewport-relative.
 *
 * NOTE: Untestable in node environment without jsdom.
 */
export function getAllLineRects(container: Element): LineRect[] {
  const lineRects: LineRect[] = [];
  const blocks = container.querySelectorAll("p, h2, h3, h4, h5, h6, li");

  for (const block of blocks) {
    const range = document.createRange();
    range.selectNodeContents(block);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      // Filter out zero-height rects (empty elements)
      if (r.height < 1) continue;
      lineRects.push({
        top: r.top,
        bottom: r.bottom,
        height: r.height,
        left: r.left,
        width: r.width,
      });
    }
  }

  return lineRects;
}
