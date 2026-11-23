// Front page handover — Monday 23 November 2026. Node 22, stdlib only.
//
// Beside this file sits entry.png, a single dense newspaper page
// (1024 by 1024) carrying 36 checked stories from Monday 23 November
// 2026, spread over seven regions: three leads up top, ten feature
// cards, twenty-three one-line briefs, plus a stat strip, a region
// count, a dotted world map with numbered pins, a DATE CHECK box for
// older stories kept out on purpose, and a sources footer. The artwork
// is drawn shapes and rendered text — no photos, nothing lifted from
// another entry. The page itself was rendered by the Python/PIL script
// in the working directory, which is not shipped here.
//
// All this file does is hand that finished image over: read entry.png,
// confirm it is a real PNG inside the size limit, and write the very
// same bytes to the output directory. No clock, no randomness, no
// network, so a second run produces the same bytes again.

import { createHash as hashBytes } from 'node:crypto';
import { mkdirSync as makeDir, readFileSync as readBytes, writeFileSync as writeBytes } from 'node:fs';
import { dirname as parentDir, join as joinPath } from 'node:path';
import { fileURLToPath as urlToPath } from 'node:url';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const SIZE_LIMIT = 1024 * 1024;

const here = parentDir(urlToPath(import.meta.url));
const inputPath = joinPath(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outPath = joinPath(outDir, 'entry.png');

const bytes = readBytes(inputPath);
if (bytes.length < 1 || bytes.length > SIZE_LIMIT) throw new Error(`entry.png is ${bytes.length} bytes, want between 1 and ${SIZE_LIMIT}`);
if (bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC) === false) throw new Error('entry.png does not begin with the PNG magic bytes');
if (bytes.length < 33 || bytes.subarray(12, 16).toString('ascii') !== 'IHDR') throw new Error('entry.png is missing its IHDR chunk');
if (bytes.readUInt32BE(16) !== 1024 || bytes.readUInt32BE(20) !== 1024) throw new Error(`entry.png is ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}, want 1024x1024`);

makeDir(outDir, { recursive: true });
writeBytes(outPath, bytes);

const inputDigest = hashBytes('sha256').update(bytes).digest('hex');
const written = readBytes(outPath);
if (written.equals(bytes) === false) throw new Error('the written entry.png is not identical to the source');
const writtenDigest = hashBytes('sha256').update(written).digest('hex');
if (writtenDigest !== inputDigest) throw new Error('the written entry.png digest does not match the source');

console.log(`Wrote ${outPath} — ${written.length} bytes, sha256 ${writtenDigest}`);
