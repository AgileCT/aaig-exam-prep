import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Tailwind v4 maps `dark:` to prefers-color-scheme by default. The theme button toggles a class on <html>,
// so without this custom variant the button changes the class but not the page.
test('the dark variant follows the dark class that the theme button toggles', () => {
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /@custom-variant\s+dark\s*\(&:where\(\.dark,\s*\.dark \*\)\)/);
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(app, /classList\.add\('dark'\)/);
});
