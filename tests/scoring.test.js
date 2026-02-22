const test = require('node:test');
const assert = require('node:assert/strict');
const { colorHarmonyScore, rankPalettes, buildOutfits } = require('../lib/scoring.js');

test('color harmony score within bounds', () => {
  const score = colorHarmonyScore('#111827', '#FFFFFF');
  assert.ok(score >= 0 && score <= 100);
});

test('palette ranking returns four buckets', () => {
  const palettes = rankPalettes('#111827');
  assert.equal(palettes.length, 4);
  assert.ok(palettes[0].score >= palettes[1].score);
});

test('matching returns scored outfit cards', () => {
  const outfits = buildOutfits({ category: 'top', dominantHex: '#111827', pattern: 'solid', styleTags: ['minimal'] }, ['minimal']);
  assert.ok(outfits.length >= 4);
  assert.ok(outfits[0].totalScore <= 100);
});
