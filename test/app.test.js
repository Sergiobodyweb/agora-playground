import assert from "node:assert/strict";
import { test } from "node:test";
import { changes, greeting, parallaxOffset, initParallax, PARALLAX_RANGE, SPEED_SHAPES, SPEED_STRIPES, SPEED_CONTENT } from "../site/app.js";

test("layer speeds rise from shapes to stripes to content", () => {
  assert.ok(SPEED_SHAPES < SPEED_STRIPES && SPEED_STRIPES < SPEED_CONTENT);
});

test("parallax offset is signed, centered and clamped", () => {
  const s = SPEED_CONTENT;
  assert.equal(parallaxOffset(0, s), -s * PARALLAX_RANGE / 2);
  assert.equal(parallaxOffset(PARALLAX_RANGE / 2, s), 0);
  assert.equal(parallaxOffset(PARALLAX_RANGE, s), s * PARALLAX_RANGE / 2);
  assert.equal(parallaxOffset(100000, s), s * PARALLAX_RANGE / 2);
  assert.equal(parallaxOffset(-50, s), parallaxOffset(0, s));
  assert.equal(parallaxOffset(NaN, s), 0);
  assert.ok(parallaxOffset(1, s) > parallaxOffset(0, s));
});

test("fastest layer shifts at least 30px against the slowest in the first 100px", () => {
  const rel = (y) => parallaxOffset(y, SPEED_CONTENT) - parallaxOffset(y, SPEED_SHAPES);
  assert.ok(Math.abs(rel(100) - rel(0)) >= 30);
});

test("initParallax moves layers, honors reduced motion on load and change, and cleans up", () => {
  const els = [{ style: {} }, { style: {} }, { style: {} }];
  const doc = { querySelector: (q) => els[[".layer-shapes", ".layer-stripes", ".hero-text"].indexOf(q)] };
  let reduce = false, onChange, onScroll = null;
  const query = { get matches() { return reduce; }, addEventListener: (_, f) => { onChange = f; }, removeEventListener: () => { onChange = null; } };
  const win = { scrollY: 100, matchMedia: () => query,
    addEventListener: (_, f) => { onScroll = f; }, removeEventListener: () => { onScroll = null; },
    requestAnimationFrame: (f) => { f(); return 1; }, cancelAnimationFrame() {} };
  const dispose = initParallax(win, doc);
  assert.ok(onScroll);
  assert.equal(els[2].style.transform, `translate3d(0, ${parallaxOffset(100, SPEED_CONTENT)}px, 0)`);
  reduce = true; onChange();
  assert.equal(onScroll, null);
  assert.equal(els[0].style.transform, "none");
  reduce = false; onChange();
  assert.ok(onScroll);
  dispose();
  assert.equal(onScroll, null);
  assert.equal(onChange, null);
  assert.equal(els[1].style.transform, "none");
});

test("greets by name", () => {
  assert.equal(greeting("Ann"), "Hello, Ann. Welcome to the Agora Playground.");
});

test("lists at least one change", () => {
  assert.ok(changes.length > 0);
  for (const c of changes) assert.equal(typeof c, "string");
});
