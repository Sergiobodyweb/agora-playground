/** Pure helpers for the page, tested in test/app.test.js. */
export function greeting(name) {
  return `Hello, ${name}. Welcome to the Agora Playground.`;
}

/** Scroll distance in pixels over which the layers travel from their first to their last position. */
export const PARALLAX_RANGE = 300;

/** How fast each hero layer moves, as a share of the scroll distance: shapes slowest, hero content fastest. */
export const SPEED_SHAPES = 0.15;
export const SPEED_STRIPES = 0.4;
export const SPEED_CONTENT = 0.5;

/**
 * Signed, centered offset in pixels for a layer. It runs from -max/2 at scroll 0 to +max/2
 * at the end of the range, where max is speed times range, so it moves from the first pixel.
 */
export function parallaxOffset(scrollY, speed, range = PARALLAX_RANGE) {
  const y = Number(scrollY);
  if (!Number.isFinite(y)) return 0;
  return speed * (Math.min(range, Math.max(0, y)) - range / 2);
}

/** Scroll distance over which the hero is on screen: its bottom edge in page coordinates. Falls back to the fixed range. */
export function heroRange(scrollY, heroBottom) {
  const range = Number(scrollY) + Number(heroBottom);
  return Number.isFinite(range) && range > 0 ? range : PARALLAX_RANGE;
}

/**
 * Starts the hero parallax on a window and document. Honors reduced motion on load and on change.
 * Returns a function that stops it and resets the transforms.
 */
export function initParallax(win, doc) {
  const layers = [
    [doc.querySelector(".layer-shapes"), SPEED_SHAPES],
    [doc.querySelector(".layer-stripes"), SPEED_STRIPES],
    [doc.querySelector(".hero-text"), SPEED_CONTENT],
  ].filter(([el]) => el);
  const hero = doc.querySelector(".hero");
  const query = win.matchMedia("(prefers-reduced-motion: reduce)");
  let waiting = false;
  let frame = 0;
  const update = () => {
    waiting = false;
    const range = hero ? heroRange(win.scrollY, hero.getBoundingClientRect().bottom) : PARALLAX_RANGE;
    for (const [el, speed] of layers) el.style.transform = `translate3d(0, ${parallaxOffset(win.scrollY, speed, range)}px, 0)`;
  };
  const onScroll = () => {
    if (!waiting) { waiting = true; frame = win.requestAnimationFrame(update); }
  };
  const stop = () => {
    win.removeEventListener("scroll", onScroll);
    win.cancelAnimationFrame(frame);
    waiting = false;
    for (const [el] of layers) el.style.transform = "none";
  };
  const apply = () => {
    if (query.matches) { stop(); return; }
    win.addEventListener("scroll", onScroll, { passive: true });
    update();
  };
  apply();
  query.addEventListener("change", apply);
  return () => { query.removeEventListener("change", apply); stop(); };
}

/** What has changed on this page, newest first. Workers add a line here with each change. */
export const changes = [
  "A footer now says the page was built in Agora by people and agents working together.",
  "The hero text stays visible and the layers keep moving for as long as the hero is on screen.",
  "A real parallax with three layers: big shapes, stripes and the hero text move at their own speeds from the first pixel of scroll.",
  "A stronger parallax with a patterned hero, more content so the page scrolls, and the Anthropic colors.",
  "The hero now stops its parallax when reduced motion is turned on, even while the page is open.",
  "A short hero with a link to this list and a gentle parallax background.",
  "The page was created.",
];
