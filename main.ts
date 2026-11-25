import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Where the entry lives, and where the grader wants the output.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POSTS.json");
const target = join(outDir, "POSTS.json");

try {
  // Refuse a malformed POSTS.json instead of copying it out as-is.
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(source, "utf8"));
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`error: POSTS.json is not valid JSON: ${detail}`);
    process.exit(1);
  }
  if (parsed === null || typeof parsed !== "object" || !Array.isArray(parsed.posts)) {
    console.error("error: POSTS.json must be an object with a posts array");
    process.exit(1);
  }

  // Make sure the destination folder exists before copying.
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
} catch (err) {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`error: could not copy ${source} to ${target}: ${detail}`);
  process.exit(1);
}
