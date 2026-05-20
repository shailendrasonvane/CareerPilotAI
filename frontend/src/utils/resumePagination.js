/**
 * A4 dimensions at 96 DPI (CSS px).
 * 210mm × 297mm — matches browser print and Puppeteer export.
 */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1122.52;

/** Tolerance for subpixel rounding, borders, and print-margin templates (e.g. Corporate) */
export const PAGE_OVERFLOW_THRESHOLD_PX = 24;

/**
 * Returns how many A4 pages the content requires.
 * A second page is only added when content genuinely exceeds one page.
 */
export function calculatePageCount(contentHeightPx) {
  if (!contentHeightPx || contentHeightPx <= 0) return 1;

  if (contentHeightPx <= A4_HEIGHT_PX + PAGE_OVERFLOW_THRESHOLD_PX) {
    return 1;
  }

  return Math.ceil(contentHeightPx / A4_HEIGHT_PX);
}

/**
 * Measures the true rendered height of resume content.
 * Uses .resume-template-root when present to avoid wrapper inflation.
 */
export function measureResumeContentHeight(measureEl) {
  if (!measureEl) return 0;

  const root = measureEl.querySelector('.resume-template-root');
  const target = root || measureEl;

  const rectHeight = Math.ceil(target.getBoundingClientRect().height);
  const offsetHeight = target.offsetHeight;
  const scrollHeight = target.scrollHeight;

  // Prefer layout height; scrollHeight only when it reflects real overflow
  const layoutHeight = Math.max(rectHeight, offsetHeight);
  if (scrollHeight <= layoutHeight + 4) {
    return layoutHeight;
  }
  return scrollHeight;
}

/**
 * Dev-only pagination diagnostics (Corporate Classic debugging).
 */
export function logPaginationDebug(templateKey, measureEl, pageCount) {
  if (!import.meta.env.DEV || !measureEl) return;

  const root = measureEl.querySelector('.resume-template-root');
  const target = root || measureEl;
  const measured = measureResumeContentHeight(measureEl);
  const threshold = A4_HEIGHT_PX + PAGE_OVERFLOW_THRESHOLD_PX;
  const overflow = measured - A4_HEIGHT_PX;

  console.group(`[ResumePagination] ${templateKey}`);
  console.table({
    measuredHeightPx: measured,
    a4HeightPx: A4_HEIGHT_PX,
    thresholdPx: threshold,
    overflowPx: Math.round(overflow * 100) / 100,
    pageCount,
    wrapperScrollHeight: measureEl.scrollHeight,
    rootOffsetHeight: root?.offsetHeight ?? 'n/a',
    rootScrollHeight: root?.scrollHeight ?? 'n/a',
    rootRectHeight: root ? Math.ceil(root.getBoundingClientRect().height) : 'n/a',
  });
  console.groupEnd();
}

/**
 * Visual footprint height for the preview viewport (unscaled px).
 */
export function getPreviewDisplayHeight(pageCount, contentHeightPx, viewMode) {
  if (viewMode === 'mobile') {
    return contentHeightPx || A4_HEIGHT_PX;
  }

  if (pageCount <= 1) {
    return A4_HEIGHT_PX;
  }

  return pageCount * A4_HEIGHT_PX;
}
