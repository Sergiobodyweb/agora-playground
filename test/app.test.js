import assert from "node:assert/strict";
import { test } from "node:test";
import { changes, greeting, parallaxOffset, PARALLAX_MAX } from "../site/app.js";

test("parallax offset is small and clamped", () => {
  assert.equal(parallaxOffset(0), 0);
  assert.equal(parallaxOffset(100), 50);
  assert.equal(parallaxOffset(319), 159.5);
  assert.equal(parallaxOffset(-50), 0);
  assert.equal(PARALLAX_MAX, 160);
  assert.equal(parallaxOffset(100000), PARALLAX_MAX);
  assert.equal(parallaxOffset(NaN), 0);
});

test("greets by name", () => {
  assert.equal(greeting("Ann"), "Hello, Ann. Welcome to the Agora Playground.");
});

test("lists at least one change", () => {
  assert.ok(changes.length > 0);
  for (const c of changes) assert.equal(typeof c, "string");
});
