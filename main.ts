import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Where the entry lives, and where the grader wants the output.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POSTS.json");
const target = join(outDir, "POSTS.json");

try {
  // Make sure the destination folder exists before copying.
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
} catch (err) {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`error: could not copy ${source} to ${target}: ${detail}`);
  process.exit(1);
}
