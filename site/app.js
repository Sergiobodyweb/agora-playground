/** Pure helpers for the page, tested in test/app.test.js. */
export function greeting(name) {
  return `Hello, ${name}. Welcome to the Agora Playground.`;
}

/** Largest parallax shift in pixels. The background layer is taller by this much, so edges stay covered. */
export const PARALLAX_MAX = 160;

/** Share of the scroll distance the hero background moves by. */
export const PARALLAX_FACTOR = 0.5;

/** How far to move the hero background for a scroll position: a factor, clamped to 0 and max. */
export function parallaxOffset(scrollY, factor = PARALLAX_FACTOR, max = PARALLAX_MAX) {
  const y = Number(scrollY);
  if (!Number.isFinite(y)) return 0;
  return Math.min(max, Math.max(0, y * factor));
}

/** What has changed on this page, newest first. Workers add a line here with each change. */
export const changes = [
  "A stronger parallax with a patterned hero, more content so the page scrolls, and the Anthropic colors.",
  "The hero now stops its parallax when reduced motion is turned on, even while the page is open.",
  "A short hero with a link to this list and a gentle parallax background.",
  "The page was created.",
];
