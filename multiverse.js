// ===================== The Multiverse + the shelf of tapes =====================
// The shelf is used twice: The Multiverse page shows YOUR ALBUMS; the book icon on Backlog / Vault / Hall of Fame / an album shows that page's titles.
const MV = { items: [], box: null, i: 0, sel: null, wt: 0 };
const MV_STUDIOS = ['Nova Video', 'Kino Home', 'Starline', 'Meridian', 'Orbit HV', 'Halcyon', 'Lumen', 'Cobalt'];
const MV_RATES = ['PG', '12', '15', 'U', '18'];
// fallback colours + title style, used until the poster colours are read (or when a title has no poster)
const MV_VAR = [
  { bg: ['#1c3a9c', '#2b52c4', '#17307f'], ink: '#ffffff', acc: ['#ff4b3e'], k: .62, max: 7.2, rot: 1 },
  { bg: ['#07090a', '#15191b', '#07090a'], ink: '#f3efe6', acc: ['#ff4a3a', '#35e0a6', '#ff6fa8'], k: .4, max: 11, rot: 0 },
  { bg: ['#d8cdb8', '#efe6d4', '#cfc3ab'], ink: '#15130f', acc: ['#d6322b'], k: .4, max: 10.5, rot: 1 },
  { bg: ['#0a1024', '#16204a', '#0a1024'], ink: '#f2f2ee', acc: ['#f7c948'], k: .85, max: 5.4, rot: 0 },
  { bg: ['#3a2db0', '#5c40d0', '#2f2397'], ink: '#ffd23f', acc: ['#ffd23f'], k: .4, max: 11, rot: 1 },
  { bg: ['#bdbab5', '#e4e1dc', '#aeaba6'], ink: '#1a1a1c', acc: ['#b3261e'], k: .6, max: 8, rot: 0 }
];
const mvHash = s => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const mvRng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const mvYear = it => (it.date || '').slice(0, 4);
const f1 = n => +n.toFixed(1);

// =====================================================================
//  ALBUMS (your own collections, saved on this PC, independent from the lists)
// =====================================================================
const ALB_KEY = 'serivia_albums';
let albums = [];
try { albums = JSON.parse(localStorage.getItem(ALB_KEY) || '[]'); } catch (e) {}
const saveAlbums = () => { try { localStorage.setItem(ALB_KEY, JSON.stringify(albums)); } catch (e) {} };
const albumById = id => albums.find(a => a.id === id);
const curAlbum = () => albumById(LV.album);
const albumRecs = id => { const a = albumById(id); return a ? Object.values(a.items).sort((x, y) => y.added - x.added) : []; };
const albumHas = key => { const a = curAlbum(); return !!(a && a.items[key]); };
function albumToggle(kind, d) {                       // + on a search result: add it, or take it out again
  const a = curAlbum(); if (!a) return;
  const k = listKey(kind, d.id);
  if (a.items[k]) delete a.items[k];
  else a.items[k] = { id: d.id, kind, title: titleOf(d), poster: d.poster_path, backdrop: d.backdrop_path, date: dateOf(d), rating: d.vote_average, cat: catOf(d, kind), added: Date.now() };
  saveAlbums(); refreshMarks(); onListsChanged();
}
function albumRemove(key) {                           // cross on a poster inside the album
  const a = curAlbum(); if (!a) return;
  delete a.items[key]; saveAlbums(); refreshMarks(); onListsChanged();
}
function albumDelete(id) {
  const a = albumById(id); if (!a) return;
  if (!confirm(`Delete the album “${a.name}”?\nThe titles stay in your Backlog, Vault and Hall of Fame; only this album is removed.`)) return;
  albums = albums.filter(x => x.id !== id); saveAlbums(); delete LV.cats['album:' + id];
  MV.sel = null; renderMulti();
}
function openAlbum(id) {
  const a = albumById(id); if (!a) return;
  LV.album = id; LV.aq = ''; $('#q').value = ''; LIST_INFO.album.name = a.name;
  showView('album');
}

// ---- eight general designs (no movie titles). Each has a front (62x93) and a spine (14x100), drawn in SVG ----
const frame = (c, o = .6) => `<rect x="40" y="40" width="540" height="850" rx="6" fill="none" stroke="${c}" stroke-width="2.4" opacity="${o}"/><rect x="55" y="55" width="510" height="820" rx="4" fill="none" stroke="${c}" stroke-width="1" opacity="${o * .6}"/>`;
const frameS = (c, o = .5) => `<rect x="9" y="9" width="122" height="982" rx="4" fill="none" stroke="${c}" stroke-width="1.6" opacity="${o}"/>`;
const star4 = (x, y, z, c) => `<path d="M${x} ${y - z}L${f1(x + z * .22)} ${f1(y - z * .22)}L${x + z} ${y}L${f1(x + z * .22)} ${f1(y + z * .22)}L${x} ${y + z}L${f1(x - z * .22)} ${f1(y + z * .22)}L${x - z} ${y}L${f1(x - z * .22)} ${f1(y - z * .22)}Z" fill="${c}"/>`;
const star5 = (cx, cy, R, r, c) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; p += `${f1(cx + Math.cos(a) * rr)},${f1(cy + Math.sin(a) * rr)} `; } return `<polygon points="${p}" fill="${c}"/>`; };
const waveRow = (y, w, amp, step) => { let d = `M-10 ${y} Q ${step / 2 - 10} ${y - amp} ${step - 10} ${y}`; for (let x = step - 10 + step; x <= w + step; x += step) d += ` T ${x} ${y}`; return d; };

const ALB = [
  { n: 'Midnight', bg: 'linear-gradient(165deg,#18295f,#0a1233 62%,#060a1f)', ink: '#f3d98b', sl: '#1b2a5c', pos: 'bottom', tz: [18, 12],
    front() { const r = mvRng(11); let s = ''; for (let i = 0; i < 64; i++) s += `<circle cx="${(r() * 600 + 10) | 0}" cy="${(r() * 910 + 10) | 0}" r="${f1(r() * 2.1 + .7)}" fill="#f3d98b" opacity="${f1(r() * .55 + .25)}"/>`;
      s += `<path d="M345 170A135 135 0 0 0 345 440A200 200 0 0 1 345 170Z" fill="#f3d98b"/>`;
      [[480, 250, 20], [140, 340, 13], [505, 430, 10], [210, 190, 9]].forEach(([x, y, z]) => s += star4(x, y, z, '#fff2c4'));
      return s + frame('#f3d98b'); },
    spine() { const r = mvRng(12); let s = ''; for (let i = 0; i < 34; i++) s += `<circle cx="${(r() * 120 + 10) | 0}" cy="${(r() * 980 + 10) | 0}" r="${f1(r() * 1.7 + .6)}" fill="#f3d98b" opacity="${f1(r() * .55 + .25)}"/>`;
      return s + `<path d="M70 70A30 30 0 0 0 70 130A44 44 0 0 1 70 70Z" fill="#f3d98b"/>` + star4(104, 150, 9, '#fff2c4') + star4(36, 930, 11, '#fff2c4') + frameS('#f3d98b'); } },

  { n: 'Sunset', bg: 'linear-gradient(180deg,#24104f,#b83280 50%,#ff8a3d 76%,#ffc65a)', ink: '#fff0cf', sl: '#7a2150', pos: 'top', tz: [10, 20],
    front() { let s = ''; [170, 138, 106, 74].forEach((rr, i) => s += `<circle cx="310" cy="520" r="${rr}" fill="none" stroke="${['#ffe3a3', '#ffc65a', '#ff9a4a', '#ff7a5c'][i]}" stroke-width="${i ? 7 : 9}"/>`);
      s += `<circle cx="310" cy="520" r="52" fill="#ffe3a3"/>`;
      s += `<path d="M110 400q14-18 28 0q14-18 28 0M450 360q12-15 24 0q12-15 24 0" fill="none" stroke="#ffe3a3" stroke-width="4" stroke-linecap="round"/>`;
      return s + `<path d="M0 930V690L110 610L215 700L330 590L455 705L620 625V930Z" fill="#1a0b3a"/><path d="M0 930V775L140 705L260 785L380 695L520 790L620 735V930Z" fill="#120626"/>`; },
    spine() { let s = ''; [70, 54, 38, 22].forEach((rr, i) => s += `<circle cx="70" cy="925" r="${rr}" fill="none" stroke="${['#ffe3a3', '#ffc65a', '#ff9a4a', '#ff7a5c'][i]}" stroke-width="5"/>`);
      return s + `<path d="M0 1000V945L40 915L75 950L110 910L140 940V1000Z" fill="#1a0b3a"/><path d="M52 90q9-12 18 0q9-12 18 0" fill="none" stroke="#ffe3a3" stroke-width="3" stroke-linecap="round"/>`; } },

  { n: 'Botanical', bg: 'linear-gradient(170deg,#14402f,#0c2a1d 60%,#081c14)', ink: '#e4f3dc', sl: '#1d4a36', pos: 'top', tz: [8, 44],
    front() { const r = mvRng(5); let s = ''; [90, 190, 300, 410, 520].forEach((x0, i) => { const h = 300 + r() * 210, sw = (r() - .5) * 90, x1 = x0 + sw, my = 930 - h * .5, ty = 930 - h;
        s += `<path d="M${x0} 930Q${f1(x0 + sw * .2)} ${f1(my)} ${f1(x1)} ${f1(ty)}" fill="none" stroke="#cfe8c8" stroke-width="3"/>`;
        for (let k = 1; k <= 7; k++) { const t = k / 8, u = 1 - t, px = u * u * x0 + 2 * u * t * (x0 + sw * .2) + t * t * x1, py = u * u * 930 + 2 * u * t * my + t * t * ty, side = k % 2 ? 1 : -1, a = side * (38 + r() * 14);
          s += `<ellipse cx="${f1(px + side * 14)}" cy="${f1(py - 6)}" rx="15" ry="38" transform="rotate(${f1(a)} ${f1(px)} ${f1(py)})" fill="${['#3f8f5e', '#2f7a50', '#5aa874', '#4a9a68'][(i + k) % 4]}" opacity=".93"/>`; }
        s += `<ellipse cx="${f1(x1)}" cy="${f1(ty - 28)}" rx="13" ry="34" fill="#6bbd86"/>`; });
      return s + frame('#cfe8c8', .5); },
    spine() { const r = mvRng(6); let s = `<path d="M70 1000Q96 880 70 780Q44 700 74 610" fill="none" stroke="#cfe8c8" stroke-width="3"/>`;
      for (let k = 0; k < 9; k++) { const y = 975 - k * 40, side = k % 2 ? 1 : -1; s += `<ellipse cx="${70 + side * 22}" cy="${y}" rx="11" ry="27" transform="rotate(${side * 52} 70 ${y + 6})" fill="${['#3f8f5e', '#2f7a50', '#5aa874', '#4a9a68'][k % 4]}"/>`; }
      return s + `<ellipse cx="74" cy="585" rx="10" ry="26" fill="#6bbd86"/>` + frameS('#cfe8c8', .4); } },

  { n: 'Noir Deco', bg: 'linear-gradient(180deg,#121214,#08080a)', ink: '#ead9a0', sl: '#3a3320', pos: 'top', tz: [18, 18],
    front() { let s = ''; for (let i = 0; i <= 26; i++) { const a = Math.PI * i / 26; s += `<line x1="310" y1="930" x2="${f1(310 - Math.cos(a) * 520)}" y2="${f1(930 - Math.sin(a) * 520)}" stroke="#d9c27a" stroke-width="${i % 2 ? 1.5 : 3}" opacity="${i % 2 ? .45 : .85}"/>`; }
      [90, 170, 250, 330].forEach(rr => s += `<circle cx="310" cy="930" r="${rr}" fill="#0b0b0d" stroke="#d9c27a" stroke-width="3"/>`);
      return s + frame('#d9c27a', .8); },
    spine() { let s = ''; [26, 46, 66].forEach(rr => s += `<path d="M${70 - rr} 0A${rr} ${rr} 0 0 0 ${70 + rr} 0" fill="none" stroke="#d9c27a" stroke-width="3"/><path d="M${70 - rr} 1000A${rr} ${rr} 0 0 1 ${70 + rr} 1000" fill="none" stroke="#d9c27a" stroke-width="3"/>`);
      for (let i = 0; i < 9; i++) { const a = Math.PI * i / 8; s += `<line x1="70" y1="0" x2="${f1(70 - Math.cos(a) * 120)}" y2="${f1(Math.sin(a) * 120)}" stroke="#d9c27a" stroke-width="1.5" opacity=".5"/><line x1="70" y1="1000" x2="${f1(70 - Math.cos(a) * 120)}" y2="${f1(1000 - Math.sin(a) * 120)}" stroke="#d9c27a" stroke-width="1.5" opacity=".5"/>`; }
      return s + frameS('#d9c27a', .7); } },

  { n: 'Synthwave', bg: 'linear-gradient(180deg,#0e0725,#2b0f5c 52%,#8a1a7a 78%,#ff2d95)', ink: '#7df3ff', sl: '#3a0f66', pos: 'top', tz: [20, 24],
    front() { let s = `<circle cx="310" cy="600" r="170" fill="#ff2d95"/><circle cx="310" cy="600" r="134" fill="#ff6a5c"/><circle cx="310" cy="600" r="98" fill="#ffb347"/><rect x="0" y="610" width="620" height="320" fill="#10042a"/>`;
      for (let i = 0; i < 9; i++) s += `<line x1="0" y1="${f1(612 + Math.pow(i / 8, 2) * 316)}" x2="620" y2="${f1(612 + Math.pow(i / 8, 2) * 316)}" stroke="#29e3ff" stroke-width="2.2" opacity=".6"/>`;
      for (let k = -8; k <= 8; k++) s += `<line x1="310" y1="610" x2="${310 + k * 120}" y2="930" stroke="#29e3ff" stroke-width="2" opacity=".5"/>`;
      return s + `<rect x="0" y="606" width="620" height="6" fill="#29e3ff"/>` + frame('#29e3ff', .55); },
    spine() { let s = `<circle cx="70" cy="125" r="46" fill="#ff2d95"/><circle cx="70" cy="125" r="34" fill="#ff6a5c"/><circle cx="70" cy="125" r="22" fill="#ffb347"/><rect x="0" y="760" width="140" height="240" fill="#10042a"/>`;
      for (let i = 0; i < 8; i++) s += `<line x1="0" y1="${f1(762 + Math.pow(i / 7, 2) * 236)}" x2="140" y2="${f1(762 + Math.pow(i / 7, 2) * 236)}" stroke="#29e3ff" stroke-width="2" opacity=".6"/>`;
      for (let k = -4; k <= 4; k++) s += `<line x1="70" y1="760" x2="${70 + k * 36}" y2="1000" stroke="#29e3ff" stroke-width="1.6" opacity=".5"/>`;
      return s + `<rect x="0" y="757" width="140" height="5" fill="#29e3ff"/>` + frameS('#29e3ff', .5); } },

  { n: 'Kraft', bg: 'linear-gradient(160deg,#cfa06e,#a97c4a 55%,#9a6d3d)', ink: '#2f1d10', sl: '#6b4526', pos: 'bottom', tz: [20, 10],
    front() { let s = `<rect x="34" y="34" width="552" height="862" rx="10" fill="none" stroke="#f4e6c8" stroke-width="3" stroke-dasharray="11 9" opacity=".9"/>`;
      s += `<circle cx="310" cy="340" r="132" fill="none" stroke="#3a2616" stroke-width="5" stroke-dasharray="3 10" stroke-linecap="round"/><circle cx="310" cy="340" r="104" fill="#3a2616" opacity=".13"/><circle cx="310" cy="340" r="104" fill="none" stroke="#3a2616" stroke-width="3"/>`;
      s += star5(310, 340, 64, 27, '#3a2616');
      [[66, 66], [554, 66], [66, 864], [554, 864]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="8" fill="#3a2616" opacity=".55"/>`);
      return s; },
    spine() { let s = `<line x1="16" y1="14" x2="16" y2="986" stroke="#f4e6c8" stroke-width="3" stroke-dasharray="10 8" opacity=".9"/><line x1="124" y1="14" x2="124" y2="986" stroke="#f4e6c8" stroke-width="3" stroke-dasharray="10 8" opacity=".9"/>`;
      return s + `<circle cx="70" cy="110" r="42" fill="none" stroke="#3a2616" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/><circle cx="70" cy="110" r="30" fill="none" stroke="#3a2616" stroke-width="2.5"/>` + star5(70, 110, 19, 8, '#3a2616'); } },

  { n: 'Ocean', bg: 'linear-gradient(180deg,#082f3a,#0c5666 52%,#16a6a6)', ink: '#eafcff', sl: '#0c5666', pos: 'top', tz: [18, 30],
    front() { let s = `<circle cx="310" cy="430" r="88" fill="#e8fbff" opacity=".92"/>`; const cols = ['#0f7b86', '#0d6b78', '#0b5c69', '#094e5b', '#073f4b', '#06323d', '#052832', '#041f28'];
      for (let i = 0; i < 8; i++) { const y = 470 + i * 56, d = waveRow(y, 620, 34, 120); s += `<path d="${d} V930H-10Z" fill="${cols[i]}"/><path d="${d}" fill="none" stroke="#bff3f0" stroke-width="2.4" opacity=".35"/>`; }
      return s; },
    spine() { let s = `<circle cx="70" cy="115" r="34" fill="#e8fbff" opacity=".92"/>`; const cols = ['#0f7b86', '#0b5c69', '#073f4b', '#041f28'];
      for (let i = 0; i < 4; i++) { const y = 720 + i * 62, d = waveRow(y, 140, 22, 70); s += `<path d="${d} V1000H-10Z" fill="${cols[i]}"/><path d="${d}" fill="none" stroke="#bff3f0" stroke-width="2" opacity=".35"/>`; }
      return s; } },

  { n: 'Blush', bg: 'linear-gradient(170deg,#f6e7de,#efd8cc)', ink: '#5a2a24', sl: '#c9684f', pos: 'top', tz: [10, 36],
    front() { let s = ''; const cols = ['#c9684f', '#e3a48f', '#93ac8c', '#f8efe6', '#d98e73'];
      [250, 205, 160, 115, 70].forEach((rr, i) => { const top = 930 - rr * 2 - 70; s += `<path d="M${310 - rr} 930V${top + rr}A${rr} ${rr} 0 0 1 ${310 + rr} ${top + rr}V930Z" fill="${cols[i]}"/>`; });
      return s; },
    spine() { let s = ''; const cols = ['#c9684f', '#e3a48f', '#93ac8c', '#f8efe6'];
      [60, 48, 36, 24].forEach((rr, i) => { const top = 1000 - rr * 2 - 40; s += `<path d="M${70 - rr} 1000V${top + rr}A${rr} ${rr} 0 0 1 ${70 + rr} ${top + rr}V1000Z" fill="${cols[i]}"/>`; });
      return s + `<circle cx="70" cy="100" r="16" fill="none" stroke="#c9684f" stroke-width="3"/>`; } }
];

const albumNameSize = n => (n <= 8 ? 17 : n <= 13 ? 12.5 : n <= 20 ? 9.5 : 7.5);
function albumFrontHTML(d, name, sub) {
  return `<div class="af" style="background:${d.bg}"><svg viewBox="0 0 620 930" preserveAspectRatio="xMidYMid slice">${d.front()}</svg>
    <div class="aft p-${d.pos}" style="color:${d.ink}"><div class="an" style="font-size:calc(var(--u)*${albumNameSize(name.length)})">${esc(name)}</div>${sub ? `<div class="as">${esc(sub)}</div>` : ''}</div></div>`;
}
function albumSpine(it) {
  const d = ALB[it.design] || ALB[0], len = it.title.length;
  const L = 100 - d.tz[0] - d.tz[1], fs = Math.max(3.4, Math.min(10, L * .9 / (len * .47)));
  return `<div class="sp asp" style="background:${d.bg}"><svg class="sa" viewBox="0 0 140 1000" preserveAspectRatio="xMidYMid slice">${d.spine()}</svg>
    <div class="ast" style="top:calc(var(--u)*${d.tz[0]});bottom:calc(var(--u)*${d.tz[1]});color:${d.ink}"><span class="an" style="font-size:calc(var(--u)*${f1(fs)})">${esc(it.title)}</span></div></div>`;
}
function albumPull(it) {
  const d = ALB[it.design] || ALB[0];
  return `<div class="pull" style="--sl:${d.sl}">
    <div class="sleeve"></div>
    <div class="cass"><i class="rib"></i><i class="lab"><b></b><b></b><b></b></i></div>
    <div class="cw"><div class="cv">${albumFrontHTML(d, it.title, it.count + (it.count === 1 ? ' title' : ' titles'))}<i class="gl"></i><button class="cdel" data-act="del" title="Delete this album">${svg(I.trash, 15)}</button></div></div>
  </div>`;
}

// ---- add-album dialog ----
const ALBD = { design: 0 };
function renderDesigns() {
  const name = $('#albName').value.trim() || 'Your album';
  $('#albDesigns').innerHTML = ALB.map((d, i) => `<button type="button" class="dz ${i === ALBD.design ? 'on' : ''}" data-d="${i}"><div class="dzc" style="--u:1.55px">${albumFrontHTML(d, name, '')}</div><span>${d.n}</span></button>`).join('');
}
function openAlbDlg() { ALBD.design = 0; $('#albName').value = ''; renderDesigns(); $('#albDlg').hidden = false; setTimeout(() => $('#albName').focus(), 30); }
function closeAlbDlg() { $('#albDlg').hidden = true; }
function albCreate() {
  const a = { id: 'a' + Date.now().toString(36), name: ($('#albName').value.trim() || 'Untitled').slice(0, 26), design: ALBD.design, items: {}, created: Date.now() };
  albums.push(a); saveAlbums(); closeAlbDlg();
  MV.sel = 'album:' + a.id;
  if (curView === 'multiverse') renderMulti();
}
$('#albName').addEventListener('input', renderDesigns);
$('#albName').addEventListener('keydown', e => { if (e.key === 'Enter') albCreate(); });
$('#albDesigns').addEventListener('click', e => { const b = e.target.closest('.dz'); if (b) { ALBD.design = +b.dataset.d; renderDesigns(); } });
$('#albCreate').addEventListener('click', albCreate);
$('#albCancel').addEventListener('click', closeAlbDlg);
$('#albDlg').addEventListener('mousedown', e => { if (e.target === $('#albDlg')) closeAlbDlg(); });

// =====================================================================
//  MOVIE TAPES: spines designed from the poster's colours (the poster itself is never pasted in)
// =====================================================================
const MV_PAL = (() => { try { return JSON.parse(localStorage.getItem('serivia_pal2') || '{}'); } catch (e) { return {}; } })();
const mvMix = (a, b, t) => a.map((v, i) => Math.round(v * (1 - t) + b[i] * t));
const mvLum = c => { const g = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * g(c[0]) + .7152 * g(c[1]) + .0722 * g(c[2]); };
const mvRgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
function mvFit(c, lo, hi) {                          // nudge a colour until its brightness sits between lo and hi
  for (let n = 0; n < 24 && mvLum(c) < lo; n++) c = mvMix(c, [255, 255, 255], .08);
  for (let n = 0; n < 24 && mvLum(c) > hi; n++) c = mvMix(c, [0, 0, 0], .08);
  return c;
}
function mvPalette(path) {
  if (MV_PAL[path] && MV_PAL[path].bands) return Promise.resolve(MV_PAL[path]);
  return new Promise(res => {
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onerror = () => res(null);
    img.onload = () => {
      try {
        const W = 32, H = 50, c = document.createElement('canvas'); c.width = W; c.height = H;
        const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, W, H);
        const d = x.getImageData(0, 0, W, H).data, px = [], bins = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 })), bs = Array.from({ length: 5 }, () => [0, 0, 0, 0]);
        let ar = 0, ag = 0, ab = 0;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 510, row = Math.floor(i / 4 / W);
          const s = mx === mn ? 0 : (mx - mn) / (255 - Math.abs(mx + mn - 255));
          let h = 0; if (mx !== mn) { const k = mx - mn; h = mx === r ? ((g - b) / k + 6) % 6 : mx === g ? (b - r) / k + 2 : (r - g) / k + 4; }
          const w = s * s * (1 - Math.abs(2 * l - 1)), bin = bins[Math.floor(h * 2) % 12], band = bs[Math.floor(row / 10)];
          bin.w += w; bin.r += r * w; bin.g += g * w; bin.b += b * w;
          band[0] += r; band[1] += g; band[2] += b; band[3]++;
          ar += r; ag += g; ab += b; px.push([mvLum([r, g, b]), r, g, b]);
        }
        const n = px.length, avg = [ar / n, ag / n, ab / n].map(Math.round);
        const best = bins.reduce((a, b) => (b.w > a.w ? b : a));
        const main = best.w / n > .025 ? [best.r, best.g, best.b].map(v => Math.round(v / best.w)) : avg;
        px.sort((a, b) => a[0] - b[0]);
        const mean = arr => [1, 2, 3].map(k => Math.round(arr.reduce((s, p) => s + p[k], 0) / arr.length));
        const p = { main, dark: mean(px.slice(0, Math.ceil(n * .25))), light: mean(px.slice(-Math.ceil(n * .12))), bands: bs.map(b => [b[0] / b[3], b[1] / b[3], b[2] / b[3]].map(Math.round)) };
        MV_PAL[path] = p;
        try { localStorage.setItem('serivia_pal2', JSON.stringify(MV_PAL)); } catch (e) {}
        res(p);
      } catch (e) { res(null); }
    };
    img.src = IMG + 'w154' + path;
  });
}
// theme from the poster colours: dark, vivid or paper (picked per title). --c1..--c5 follow the poster from top to bottom
function mvTheme(p, key) {
  const t = mvHash(key) % 3, main = p.main;
  const range = t === 0 ? [.012, .2] : t === 1 ? [.07, .4] : [.55, .92];
  const bands = p.bands.map(c => mvFit(t === 2 ? mvMix(c, [243, 234, 216], .45) : c, range[0], range[1]));
  const ink = t === 2 ? [23, 20, 15] : t === 0 ? [244, 241, 234] : [255, 255, 255];
  const acc = t === 0 ? mvFit(main, .3, .8) : t === 1 ? mvFit(p.light, .65, 1) : mvFit(main, .06, .38);
  const th = { '--ink': mvRgb(ink), '--acc': mvRgb(acc), '--tc': mvRgb(t === 0 ? mvFit(main, .5, .92) : ink), '--plate': t === 2 ? 'rgba(255,255,255,.42)' : 'rgba(0,0,0,.34)', '--sl': mvRgb(mvFit(main, .05, .24)), '--paper': mvRgb(mvFit(mvMix(p.light, [239, 231, 214], .8), .6, .93)) };
  bands.forEach((c, i) => th['--c' + (i + 1)] = mvRgb(c));
  return th;
}
function mvApplyPalettes(items) {
  items.forEach(it => {
    if (it.album || !it.poster) return;
    mvPalette(it.poster).then(p => {
      if (!p || MV.items !== items) return;          // the shelf was rebuilt meanwhile
      const tape = MV.box && MV.box.querySelector(`.tape[data-k="${CSS.escape(it.key)}"]`); if (!tape) return;
      const th = mvTheme(p, it.key), sp = tape.querySelector('.sp');
      Object.entries(th).forEach(([k, v]) => (k === '--sl' ? tape : sp).style.setProperty(k, v));
    });
  });
}

// ---- BOOK SPINES: every title is bound like a real book, and the binding is wrapped around a slice of its own poster ----
//   movies = gilt hardcover | web series = box-set paperback | documentaries = archive cloth with a paper label | anime = manga volume
// (the poster slice is the spine's artwork; the palette read from the poster colours the bands, ribbons and accents)
const mvStar = it => (it.rating ? it.rating.toFixed(1) : 'NEW');
const BK = {                                         // title area (in u, from the top / from the bottom) + lettering factors
  movies: { top: 24, bot: 27, k: .42, max: 10.5 },
  series: { top: 30, bot: 17, k: .62, max: 7.4 },
  docs:   { top: 7,  bot: 30, k: .66, max: 5.8 },
  anime:  { top: 4,  bot: 62, k: .66, max: 8.2 }
};
function mvBase(it) {                                // fallback colours until the poster palette is read (also used for titles without a poster)
  const r = mvRng(mvHash(it.key) + 3), V = MV_VAR[Math.floor(r() * 6)];
  const acc = V.acc[Math.floor(r() * V.acc.length)], cs = [V.bg[0], V.bg[1], V.bg[2], acc, V.bg[1]];
  return { r, vars: `--c1:${cs[0]};--c2:${cs[1]};--c3:${cs[2]};--c4:${cs[3]};--c5:${cs[4]};--ink:${V.ink};--acc:${acc};--tc:${V.ink};--plate:rgba(0,0,0,.32);` };
}
function mvSpine(it) {
  const cat = BK[it.cat] ? it.cat : 'movies', B = BK[cat], { r, vars } = mvBase(it);
  const px = 22 + Math.floor(r() * 56);              // which vertical slice of the poster shows on the spine
  const L = 100 - B.top - B.bot, fs = Math.max(3, Math.min(B.max, L * .9 / (it.title.length * B.k)));
  const img = it.poster ? `<img class="bk-img" src="${IMG}w342${it.poster}" alt="" draggable="false">` : '';
  const ridge = '<i class="bk-rb"></i>';
  let deco = '';
  if (cat === 'movies') {
    deco = `<div class="bk-band t"><i></i><i></i><b>&#9733;</b></div><div class="bk-band b"><i></i><span>${mvStar(it)}</span><i></i></div>`;
  } else if (cat === 'series') {
    const season = 1 + Math.floor(r() * 5), done = 2 + Math.floor(r() * 4);
    deco = `<div class="bk-tab"><b>S${season}</b><small>SERIES</small></div>
      <div class="bk-foot"><span class="hd">HD</span><span class="dots">${Array.from({ length: 6 }, (_, i) => `<i class="${i < done ? 'on' : ''}"></i>`).join('')}</span><small>${mvStar(it)}</small></div>`;
  } else if (cat === 'docs') {
    let bc = ''; for (let i = 0, x = 0; i < 24 && x < 52; i++) { const w = 1 + Math.floor(r() * 3); bc += `<rect x="${x}" y="0" width="${w}" height="20" fill="#1c1810"/>`; x += w + 1 + Math.floor(r() * 2); }
    deco = `<div class="bk-lab-no"><small>DOC-${1000 + Math.floor(r() * 9000)}</small></div>
      <div class="bk-foot"><svg viewBox="0 0 54 20" preserveAspectRatio="none">${bc}</svg><small>&#9733; ${mvStar(it)}</small></div>`;
  } else {
    const vol = String(1 + Math.floor(r() * 12)).padStart(2, '0');
    deco = `<div class="bk-vol"><small>VOL</small><b>${vol}</b><em>${mvStar(it)}</em></div>`;
  }
  return `<div class="sp bk bk-${cat}" style="${vars}--px:${px}%;--fs:${fs.toFixed(2)};--bt:${B.top};--bb:${B.bot}">
    ${img}<i class="bk-cap"></i>${ridge}
    ${deco}
    <div class="bk-lab"><span>${esc(it.title)}</span></div>
    <i class="bk-sh"></i>
  </div>`;
}

function mvPull(it) {                                // the pulled-out tape: the exact poster is the cover
  const art = it.poster ? `<img src="${IMG}w780${it.poster}" alt="" draggable="false">` : `<div class="ga"><span style="font-size:calc(var(--u)*${albumNameSize(it.title.length) * .8})">${esc(it.title)}</span></div>`;
  return `<div class="pull">
    <div class="sleeve"></div>
    <div class="cass"><i class="rib"></i><i class="lab"><b></b><b></b><b></b></i></div>
    <div class="cw"><div class="cv">${art}<i class="gl"></i></div></div>
  </div>`;
}

// =====================================================================
//  the shelf itself
// =====================================================================
function mvLayout(animate) {
  const box = MV.box; if (!box || !box.clientHeight) return;
  const st = box.querySelector('.mv-stage'), tr = box.querySelector('.mv-track'); if (!st || !tr) return;
  const bar = box.querySelector('.mv-bar');
  const room = box.clientHeight - (bar ? bar.offsetHeight : 0) - 118 - 36 - 16;
  const H = Math.max(230, Math.min(480, room));
  st.style.setProperty('--h', H + 'px');
  const u = H / 100, x = st.clientWidth / 2 - (MV.i * (14 * u + 4 * u) + 45 * u);
  if (!animate) tr.classList.add('nt');
  tr.style.transform = `translateX(${x}px)`;
  if (!animate) requestAnimationFrame(() => requestAnimationFrame(() => tr.classList.remove('nt')));
}
function mvInfo(it) {
  const info = MV.box.querySelector('.mv-info');
  if (it.album) {
    const d = ALB[it.design] || ALB[0];
    info.innerHTML = `<h3>${esc(it.title)}</h3><div class="sub">Album · ${it.count} ${it.count === 1 ? 'title' : 'titles'}</div><div class="yr">${esc(d.n)} design</div>`;
  } else info.innerHTML = `<h3>${esc(it.title)}</h3><div class="sub">${esc(CATS[it.cat].single + ' · ' + it.tags.join(' / '))}</div><div class="yr">${esc(mvYear(it) || '-')}</div>`;
}
function mvSelect(i, animate = true) {
  const n = MV.items.length; if (!n || !MV.box) return;
  MV.i = Math.max(0, Math.min(n - 1, i)); MV.sel = MV.items[MV.i].key;
  MV.box.querySelectorAll('.tape').forEach((t, k) => t.classList.toggle('sel', k === MV.i));
  mvInfo(MV.items[MV.i]); mvLayout(animate);
}
function mvBuild(box, items, o = {}) {
  MV.box = box; MV.items = items;
  let idx = items.findIndex(it => it.key === MV.sel);
  if (idx < 0) idx = o.start === 'first' ? 0 : Math.floor(items.length / 2);
  MV.i = idx; MV.sel = items[idx] && items[idx].key;
  const bar = o.bar ? `<div class="mv-bar"><button class="mv-tool" data-act="add" title="New album">${svg(I.plus, 20)}</button>${items.length ? `<button class="mv-tool del" data-act="del" title="Delete the selected album">${svg(I.trash, 18)}</button>` : ''}</div>` : '';
  if (!items.length && o.bar) {
    box.innerHTML = `${bar}<div class="mv-empty"><b>No albums yet.</b><br>Tap the + at the top right to make your first one and pick a design for it.</div>`;
    return;
  }
  box.innerHTML = `${bar}
    <div class="mv-stage"><div class="mv-track">${items.map((it, i) => `<div class="tape ${i === idx ? 'sel' : ''}" data-i="${i}" data-k="${esc(it.key)}" title="${esc(it.title)}">${it.album ? albumSpine(it) + albumPull(it) : mvSpine(it) + mvPull(it)}</div>`).join('')}</div></div>
    <div class="mv-foot">
      <button class="mv-arrow" data-d="-1" title="Previous">${svg(I.left, 22)}</button>
      <div class="mv-info"></div>
      <button class="mv-arrow" data-d="1" title="Next">${svg(I.right, 22)}</button>
    </div>`;
  if (items.length) mvInfo(items[idx]);
  mvLayout(false);
  mvApplyPalettes(items);
}
// The Multiverse page: your albums
function renderMulti() {
  mvBuild($('#viewMulti'), albums.map(a => ({ key: 'album:' + a.id, album: true, id: a.id, title: a.name, design: a.design, count: Object.keys(a.items).length })), { bar: true, start: 'first' });
}
// the book view of Backlog / Vault / Hall of Fame / an album: same shelf, filled with that page's titles
function renderShelf(recs, listName) {
  mvBuild($('#listShelf'), recs.map(r => ({ key: r.kind + ':' + r.id, id: r.id, kind: r.kind, title: r.title, poster: r.poster, date: r.date || '', rating: r.rating, cat: catOfRec(r), tags: [listName] })), { start: 'first' });
}
const mvActive = () => (curView === 'multiverse' || (isList(curView) && !$('#listShelf').hidden)) && $('#albDlg').hidden;

[$('#viewMulti'), $('#listShelf')].forEach(box => {
  box.addEventListener('click', e => {
    const tool = e.target.closest('.mv-tool, .cdel');
    if (tool) { if (tool.dataset.act === 'add') openAlbDlg(); else if (MV.items[MV.i]) albumDelete(MV.items[MV.i].id); return; }
    const arr = e.target.closest('.mv-arrow');
    if (arr) return mvSelect(MV.i + +arr.dataset.d);
    const t = e.target.closest('.tape');
    if (!t) return;
    const i = +t.dataset.i;
    if (i !== MV.i) return mvSelect(i);               // first click pulls the tape out
    const it = MV.items[i];
    if (it && e.target.closest('.cw')) { if (it.album) openAlbum(it.id); else openDetail(it.kind, it.id); }   // second click on the cover opens it
  });
  box.addEventListener('wheel', e => {
    e.preventDefault();
    const now = Date.now(); if (now - MV.wt < 260) return; MV.wt = now;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    mvSelect(MV.i + (d > 0 ? 1 : -1));
  }, { passive: false });
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!$('#albDlg').hidden) return closeAlbDlg();
    if (curView === 'album' && dt.hidden && !e.defaultPrevented && e.target !== $('#q')) showView('multiverse');   // Esc inside an album goes back to the shelf
    return;
  }
  if (!mvActive() || !dt.hidden || /INPUT|TEXTAREA/.test((e.target || {}).tagName)) return;
  if (e.key === 'ArrowRight') mvSelect(MV.i + 1);
  if (e.key === 'ArrowLeft') mvSelect(MV.i - 1);
});
window.addEventListener('resize', () => { if (mvActive()) mvLayout(false); });
