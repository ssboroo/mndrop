import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {directoryBrands} from '../lib/brand-directory.ts';
import {drops} from '../lib/catalog.ts';

const modules = new Map();
function componentModule(file) {
  if (modules.has(file)) return modules.get(file);
  let source = ts.transpileModule(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), {
    compilerOptions: {jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext},
  }).outputText;
  source = source.replace(/from ['"]([^'"]+)['"]/g, (match, specifier) => {
    // WebGL and countdown rendering belong to browser QA; their output cannot affect
    // the surrounding collection theme. Preserve the real collection component,
    // brand data, theme component, profile, links, and React rendering.
    if (['./beauty-world', './collection-art', './drop-countdown'].includes(specifier)) return 'from ' + JSON.stringify('data:text/javascript,export default function Scene(){return null}');
    let url;
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) url = import.meta.resolve(specifier);
    else if (specifier === '@/lib/brand-directory' || specifier === '@/lib/catalog') url = new URL('../' + specifier.slice(2) + '.ts', import.meta.url).href;
    else url = componentModule('app/' + specifier.slice(2) + '.tsx');
    return 'from ' + JSON.stringify(url);
  });
  const url = 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
  modules.set(file, url);
  return url;
}
const {default: BrandCollection} = await import(componentModule('app/brand-collection.tsx'));

test('a directory brand keeps its theme when matching catalog products are published', () => {
  const brand = directoryBrands.find(value => value.id === 'nars');
  const product = {...drops[0], brand: brand.name, approved: true};
  const html = renderToStaticMarkup(React.createElement(BrandCollection, {brand: brand.id, catalog: [product], mn: false}));
  assert.match(html, /class="brand-collection-world"/);
  assert.ok(html.includes('--brand-bg:' + brand.theme.background));
  assert.ok(html.includes('brand-world--' + brand.theme.scene));
  assert.ok(html.includes('NARS / 1'));
});

test('an empty directory brand shows its themed profile without announcing available stock', () => {
  const brand = directoryBrands.find(value => value.id === 'round-lab');
  const html = renderToStaticMarkup(React.createElement(BrandCollection, {brand: brand.id, catalog: [], mn: true}));
  assert.match(html, /class="brand-profile"/);
  assert.ok(html.includes('--brand-bg:' + brand.theme.background));
  assert.ok(html.includes('Шинэ дроп хараахан нээгдээгүй'));
});
