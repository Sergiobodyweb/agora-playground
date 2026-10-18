/** Pure helpers for the page, tested in test/app.test.js. */
export function greeting(name) {
  return `Hello, ${name}. Welcome to the Agora Playground.`;
}

/** Largest parallax shift in pixels. The background layer is taller by this much, so edges stay covered. */
export const PARALLAX_MAX = 60;

/** How far to move the hero background for a scroll position: a small factor, clamped to 0 and max. */
export function parallaxOffset(scrollY, factor = 0.2, max = PARALLAX_MAX) {
  const y = Number(scrollY);
  if (!Number.isFinite(y)) return 0;
  return Math.min(max, Math.max(0, y * factor));
}

/** What has changed on this page, newest first. Workers add a line here with each change. */
export const changes = [
  "A short hero with a link to this list and a gentle parallax background.",
  "The page was created.",
];
