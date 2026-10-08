import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {directoryBrands} from '../lib/brand-directory.ts';

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => {
    const channel = parseInt(value, 16) / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}

test('every directory route has a researched theme, without changing brand identity or categories', () => {
  assert.equal(directoryBrands.length, 90);
  assert.equal(new Set(directoryBrands.map(brand => brand.id)).size, 90);
  for (const brand of directoryBrands) {
    assert.ok(brand.theme, `${brand.name} has no theme`);
    assert.equal(new URL(brand.theme.website).protocol, 'https:');
    assert.ok(brand.theme.inspiration.length > 20, `${brand.name} has no design rationale`);
    assert.ok(['read', 'search-verified'].includes(brand.theme.sourceStatus), `${brand.name} needs verified research`);
    assert.ok(brand.categories.length > 0);
  }
});

test('brand labels and content remain readable on every page and card surface', () => {
  for (const brand of directoryBrands) {
    assert.ok(brand.theme, `${brand.name} has no theme`);
    for (const background of [brand.theme.background, brand.theme.surface]) {
      assert.ok(contrast(background, brand.theme.ink) >= 4.5, `${brand.name}: insufficient text contrast on ${background}`);
    }
  }
});

test('the theme edit preserves local logo assets and never links images from unverified websites', () => {
  for (const brand of directoryBrands) {
    if (!brand.logo) continue;
    assert.ok(brand.logo.startsWith('/brand-logos/'));
    assert.ok(existsSync(new URL('../public' + brand.logo, import.meta.url)), `${brand.name}: missing local logo`);
  }
});
