// Pre-build safety check. Run automatically before "npm run dist:win" (and on demand with "npm run check").
// It stops the build if something would ship broken or would ship a personal API key.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const problems = [];
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

// 1. every file the packaging config lists (that is not a glob) must exist
(pkg.build.files || []).filter(f => !/[*!]/.test(f)).forEach(f => { if (!fs.existsSync(path.join(root, f))) problems.push('Missing file listed in build.files: ' + f); });
// 2. the entry point and icons
if (!fs.existsSync(path.join(root, pkg.main))) problems.push('Missing entry point: ' + pkg.main);
['assets/icons/icon.ico', 'assets/icons/icon.png'].forEach(f => { if (!fs.existsSync(path.join(root, f))) problems.push('Missing icon: ' + f); });
// 3. fonts the page loads from node_modules
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
[...html.matchAll(/href="(node_modules\/[^"]+)"/g)].forEach(m => { if (!fs.existsSync(path.join(root, m[1]))) problems.push('Font stylesheet missing (run "npm ci" first): ' + m[1]); });
// 4. no personal TMDB key may be baked into the app
const cfg = fs.readFileSync(path.join(root, 'config.js'), 'utf8');
const m = /window\.TMDB_KEY\s*=\s*["']([^"']*)["']/.exec(cfg);
if (m && m[1].trim()) problems.push('config.js contains a TMDB key. Empty it: an installer must never ship a personal key (users enter their own inside the app).');

if (problems.length) { console.error('\nCinephile pre-build check FAILED:\n - ' + problems.join('\n - ') + '\n'); process.exit(1); }
console.log('Cinephile pre-build check passed (files, fonts, icons, no embedded API key).');
