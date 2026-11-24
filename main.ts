// Round-2 handover for the Monday 23 November 2026 front page.
// Node 22, standard library only — nothing to install, nothing fetched.
//
// entry.png next to this file is the whole entry: one dense newspaper
// page, 1024 by 1024, holding 36 checked stories from Monday 23
// November 2026 across seven regions. Three leads, ten features,
// twenty-three briefs, a timeline strip of the day in UTC, a numbers
// strip, a region bar, a dotted world map with numbered pins, a
// DATE CHECK box naming the older stories left out on purpose, and a
// sources footer. Every picture is a drawn shape or rendered text —
// no photographs, nothing copied from another entry. The page was
// rendered by a Python/PIL script in the working directory; that
// script is not part of this repo.
//
// This file only delivers the finished image: read entry.png, check
// it is a genuine PNG inside the size limit, and copy those exact
// bytes to the output directory. No clock, no randomness, no network,
// so running it twice writes identical bytes.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const MAX_BYTES = 1024 * 1024;

const folder = dirname(fileURLToPath(import.meta.url));
const source = join(folder, 'entry.png');
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(targetDir, 'entry.png');

const png = readFileSync(source);
if (png.length === 0 || png.length > MAX_BYTES) {
  throw new Error(
    `entry.png is ${png.length} bytes, expected 1..${MAX_BYTES}`,
  );
}
if (!png.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png does not start with the PNG signature');
}
if (png.length < 33 || png.subarray(12, 16).toString('ascii') !== 'IHDR') {
  throw new Error('entry.png has no IHDR chunk where one belongs');
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}

mkdirSync(targetDir, { recursive: true });
writeFileSync(target, png);

const sourceHash = createHash('sha256').update(png).digest('hex');
const copied = readFileSync(target);
if (!copied.equals(png)) {
  throw new Error('copied entry.png differs from the source bytes');
}
const copiedHash = createHash('sha256').update(copied).digest('hex');
if (copiedHash !== sourceHash) {
  throw new Error('copied entry.png digest differs from the source');
}

console.log(`Wrote ${target} — ${copied.length} bytes, sha256 ${copiedHash}`);
