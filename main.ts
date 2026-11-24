/**
 * make.fun · "Weirdest Job Title: Blind Judge Showdown"
 *
 * The entry is one job title, and that is all it is: a post that a person could
 * plausibly be hired for, in a trade nobody has heard of, with one twist that
 * lands on the first read. The judge weighs titles in this order — is it a job
 * title, is it stranger than ordinary work, is it funny, does it sound real
 * enough to picture the person doing it, does it read at a glance — so the line
 * below is built for the first two criteria and refuses to spend a character on
 * anything else.
 *
 * The program writes the title to /output/entry.txt and gates it locally before
 * the sealed scorer sees it. No clock, no randomness, no network, no input: the
 * two grading runs write the same bytes.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

/** The gate: UTF-8 text of 1 to 60 characters, and not only white space. */
const MIN_CHARS = 1;
const MAX_CHARS = 60;

/**
 * The job. A sommelier's whole career lives in his nose, so when the nose goes
 * he does the only thing a well-off man does about a missing sense: he hires
 * one. "Stunt nose" is doing the work here — doubles are a real trade, applied
 * to a profession where a double is absurd, and the hire is specific enough to
 * picture the interview.
 */
const TITLE = "Stunt Nose for a Sommelier Who Lost His Smell";

/**
 * The file body: the title and one closing newline, the way a text file ends.
 * The gate counts every character, newline included, so the budget is checked
 * on the bytes that will be read back rather than on the sentence alone.
 */
const entry = `${TITLE}\n`;

// Count what the gate counts. One line of text, one closing newline, and no
// second line that a scorer could read as part of the title.
const lines = entry.split("\n");
if (lines.length !== 2 || lines[1] !== "") {
  throw new Error("entry must be one line and one closing newline");
}
// No leading or trailing space: the gate trims nothing before it counts, and a
// stray space would be spent from the 60-character budget for nothing.
if (lines[0] !== lines[0].trim()) {
  throw new Error("entry must not start or end with white space");
}
// Single spaces between the words only. A tab or a doubled space is invisible in
// review but reads as a typo, and the judge is told to take the title at a
// glance.
if (/\t| {2,}/.test(lines[0])) {
  throw new Error("entry must use single spaces and no tabs between its words");
}
// ASCII only. Every character here is one byte, so the count the gate makes and
// the count this file measures cannot disagree, and the title cannot be broken
// by an encoding step between here and the judge.
if (!/^[\x20-\x7E]+$/.test(lines[0])) {
  throw new Error("entry must be printable ASCII, with no non-ASCII punctuation");
}
if (entry !== entry.normalize("NFC")) {
  throw new Error("entry is not NFC: the gate would count different characters");
}

const chars = Array.from(lines[0]).length;
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}

// The sandbox mounts /output; a local run points OUTPUT_DIR elsewhere and gets
// the same bytes.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, entry, "utf8");

// Read the file back and hold the write to what the program meant to write: a
// grader that reads a truncated or re-encoded file scores a different entry.
const readBack = readFileSync(target, "utf8");
if (readBack !== entry) {
  throw new Error("wrote a file that does not read back as the entry's own bytes");
}

// The digest is how a run is checked: same title, same bytes, every time.
const digest = createHash("sha256").update(entry, "utf8").digest("hex");
console.log(`wrote "${TITLE}" — ${chars} characters, ${Buffer.byteLength(entry, "utf8")} bytes — to ${target}`);
console.log(`sha256 ${digest}`);
