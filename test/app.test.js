import assert from "node:assert/strict";
import { test } from "node:test";
import { changes, greeting } from "../site/app.js";

test("greets by name", () => {
  assert.equal(greeting("Ann"), "Hello, Ann. Welcome to the Agora Playground.");
});

test("lists at least one change", () => {
  assert.ok(changes.length > 0);
  for (const c of changes) assert.equal(typeof c, "string");
});
