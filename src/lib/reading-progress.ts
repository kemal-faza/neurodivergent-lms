const MIN_READING_PROGRESS = 20;
const MAX_READING_PROGRESS = 100;

/** Calculate reading progress from a scroll container's dimensions. */
export function calculateReadingProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  if (
    !Number.isFinite(scrollHeight) ||
    !Number.isFinite(clientHeight) ||
    scrollHeight <= 0 ||
    clientHeight < 0
  ) {
    return MAX_READING_PROGRESS;
  }

  const maxScrollTop = scrollHeight - clientHeight;
  if (maxScrollTop <= 0) return MAX_READING_PROGRESS;

  const safeScrollTop = Number.isFinite(scrollTop) ? scrollTop : 0;
  const ratio = Math.min(1, Math.max(0, safeScrollTop / maxScrollTop));
  return Math.round(
    MIN_READING_PROGRESS + ratio * (MAX_READING_PROGRESS - MIN_READING_PROGRESS),
  );
}
