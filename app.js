// ===================== icons =====================
const I = {
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  cwi: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M10 11l4 2.5-4 2.5z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  left: '<path d="M15 18l-6-6 6-6"/>',
  right: '<path d="M9 18l6-6-6-6"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  film: '<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  archive: '<path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>',
  award: '<circle cx="12" cy="8" r="7"/><path d="M8.2 13.9L7 23l5-3 5 3-1.2-9.1"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  bars: '<path d="M18 20V10M12 20V4M6 20v-6"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  sort: '<path d="M3 6h18M3 12h13M3 18h8"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  key: '<path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  checkc: '<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>'
};
const svg = (p, s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const $ = s => document.querySelector(s);
const grad = c => `linear-gradient(160deg, ${c[0]}, ${c[1]})`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ===================== sidebar =====================
const NAV = [
  { v: 'home', i: 'film', t: 'Screening Room' },
  { v: 'backlog', i: 'bookmark', t: 'The Backlog' },
  { v: 'vault', i: 'archive', t: 'The Vault' },
  { v: 'fame', i: 'award', t: 'Hall of Fame' },
  { v: 'multiverse', i: 'layers', t: 'The Multiverse' }
];
const PAGES = {
  multiverse: ['The Multiverse', 'Your albums and diaries: collections, notes and thoughts about what you watch.']
};
// Backlog and Vault are built from your saved lists (see lists.js)
const LISTVIEWS = { backlog: 'watchlist', vault: 'completed', fame: 'fame' };
let curView = 'home', lastCtx = 'home';
const isList = v => v in LISTVIEWS || v === 'album';          // pages that show saved titles with the compact top bar
const isAddView = v => v === 'fame' || v === 'album';          // pages whose search box looks up new titles to add
const LV = { link: false, query: '', fq: '', aq: '', album: null, sort: false, shelf: false };   // query = Backlog/Vault filter, fq = Hall of Fame search, aq = album search
// every page keeps its own category (All / Anime / Movies / ...); every album too
LV.cats = {};
try { LV.cats = JSON.parse(localStorage.getItem('serivia_lvcats') || '{}'); } catch (e) {}
const catKey = () => (curView === 'album' ? 'album:' + LV.album : curView);
Object.defineProperty(LV, 'cat', {
  get() { return LV.cats[catKey()] || 'all'; },
  set(c) {
    LV.cats[catKey()] = c;
    if (LV.link && curView in LISTVIEWS) Object.keys(LISTVIEWS).forEach(k => { LV.cats[k] = c; });
    try { localStorage.setItem('serivia_lvcats', JSON.stringify(LV.cats)); } catch (e) {} }
});
const catLabel = c => (c === 'all' ? 'All' : CATS[c].label);
const HF = { token: 0, page: 0, pages: 1, loading: false, failed: false, auto: 0, count: 0, seen: new Set() };   // Hall of Fame search results
const qOf = () => (curView === 'fame' ? LV.fq : curView === 'album' ? LV.aq : LV.query);

document.querySelectorAll('[data-i]').forEach(e => e.innerHTML = svg(I[e.dataset.i], +e.dataset.s || 18));
$('#nav').innerHTML = NAV.map(n => `<a data-v="${n.v}">${svg(I[n.i])}${n.t}${n.v in LISTVIEWS ? `<em class="nb" data-nb="${n.v}">0</em>` : ''}</a>`).join('');

const syncHas = () => $('#searchBox').classList.toggle('has', !!$('#q').value);   // keeps the pill open while it has text
const viewCat = () => (isList(curView) ? LV.cat : S.cat);
function showView(v) {
  curView = v;
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.v === (v === 'album' ? 'multiverse' : v)));
  const list = isList(v), home = v === 'home', mv = v === 'multiverse';
  $('#viewHome').hidden = !home;
  $('#viewList').hidden = !list;
  $('#viewMulti').hidden = !mv;
  $('#viewPage').hidden = home || list || mv;
  $('#top').classList.toggle('mv', mv);              // The Multiverse is a full-page shelf: no top bar
  $('#scroll').classList.toggle('mv', mv);
  if (!list) $('#scroll').classList.remove('shelf');
  if (!home && !list && !mv) $('#viewPage').innerHTML = `<h2>${PAGES[v][0]}</h2><p>${PAGES[v][1]}</p><span class="tag">Coming in the next step</span>`;
  $('#scroll').scrollTop = 0;
  $('#top').classList.toggle('lk', v in LISTVIEWS);    // the link icon is only for Backlog, Vault and Hall of Fame
  $('#top').classList.toggle('lm', list);            // compact top bar: pill search, sort icon, total count
  const ctx = !list ? 'home' : v === 'fame' ? 'fame' : v === 'album' ? 'album' : 'bv';   // the search box keeps separate text for home, Backlog/Vault and Hall of Fame
  if (ctx !== lastCtx) { $('#q').value = list ? qOf() : S.query; lastCtx = ctx; }
  syncHas();
  if (list) renderList(); else if (mv) renderMulti(); else if (typeof updateCounts === 'function') updateCounts(); else placeThumb();
}
$('#nav').onclick = e => { const a = e.target.closest('a[data-v]'); if (a) showView(a.dataset.v); };

// ===================== categories =====================
// kind = which TMDB catalogue; base = fixed filters; match = filter for search results
const CATS = {
  anime:  { label: 'Anime',         single: 'Anime',       kind: 'tv',    base: { with_genres: '16', with_original_language: 'ja' }, hideGenre: 16, votes: 30,
            match: m => (m.genre_ids || []).includes(16) && m.original_language === 'ja' },
  movies: { label: 'Movies',        single: 'Movie',       kind: 'movie', base: null, votes: 200, match: () => true },
  series: { label: 'Web Series',    single: 'Series',      kind: 'tv',    base: null, votes: 100, match: () => true },
  docs:   { label: 'Documentaries', single: 'Documentary', kind: 'movie', base: { with_genres: '99' }, hideGenre: 99, votes: 15,
            match: m => (m.genre_ids || []).includes(99) }
};

// ===================== TMDB =====================
// The TMDB key is the user's own: typed into the in-app key window and kept in this app's local storage.
// (config.js may hold one for developers running from source, but the public source ships it empty.)
const KEY_STORE = 'serivia_tmdb_key';
let KEY = '';
try { KEY = (localStorage.getItem(KEY_STORE) || '').trim(); } catch (e) {}
if (!KEY) KEY = String(window.TMDB_KEY || '').trim();
const hasKey = !!KEY && !KEY.startsWith('PASTE');
let keyProblem = !hasKey;                             // true while the key is missing or was rejected, so messages can offer the key window
const IMG = 'https://image.tmdb.org/t/p/';
const titleOf = m => m.title || m.name || 'Untitled';
const dateOf = m => m.release_date || m.first_air_date || '';

// ===================== my lists (saved on this PC) =====================
// status is 'watchlist' or 'completed'. The Backlog / Vault pages will read this later.
const LIST_KEY = 'serivia_lists';
let lists = {};
try { lists = JSON.parse(localStorage.getItem(LIST_KEY) || '{}'); } catch (e) {}
const listKey = (kind, id) => kind + ':' + id;
const statusOf = (kind, id) => (lists[listKey(kind, id)] || {}).status || null;
const known = {};                                    // item data by key, so any button can save it

// which of the four categories an item belongs to
function catOf(d, kind) {
  if (d._cat) return d._cat;
  const ids = d.genre_ids || (d.genres || []).map(g => g.id);
  if (kind === 'tv') return ids.includes(16) && d.original_language === 'ja' ? 'anime' : 'series';
  return ids.includes(99) ? 'docs' : 'movies';
}
function setStatus(kind, d, status) {
  const k = listKey(kind, d.id), prev = lists[k];
  if (!status) delete lists[k];
  else lists[k] = { id: d.id, kind, title: titleOf(d), poster: d.poster_path, backdrop: d.backdrop_path, date: dateOf(d), rating: d.vote_average,
                    cat: (prev && prev.cat) || catOf(d, kind), status, added: Date.now() };
  try { localStorage.setItem(LIST_KEY, JSON.stringify(lists)); } catch (e) {}
  refreshMarks();
  if (typeof onListsChanged === 'function') onListsChanged();   // Backlog / Vault / counters
}

// ---------- Hall of Fame (kept apart from the lists: a title can be in both) ----------
const FAME_KEY = 'serivia_fame';
let fame = {};
try { fame = JSON.parse(localStorage.getItem(FAME_KEY) || '{}'); } catch (e) {}
function setFame(kind, d, on) {
  const k = listKey(kind, d.id), prev = fame[k];
  if (!on) delete fame[k];
  else fame[k] = { id: d.id, kind, title: titleOf(d), poster: d.poster_path, backdrop: d.backdrop_path, date: dateOf(d), rating: d.vote_average,
                   cat: (prev && prev.cat) || catOf(d, kind), status: 'fame', added: prev ? prev.added : Date.now() };
  try { localStorage.setItem(FAME_KEY, JSON.stringify(fame)); } catch (e) {}
  refreshMarks();
  if (typeof onListsChanged === 'function') onListsChanged();
}

// ---------- the small buttons on posters ----------
// pill = hero (always visible, with words) | icon = home poster (hover) | backlog / vault / hof = saved posters (hover) | search = Hall of Fame search result (hover)
function markHTML(kind, m, variant) {
  const key = listKey(kind, m.id); known[key] = m;
  const st = statusOf(kind, m.id), pill = variant === 'pill', sz = pill ? 14 : 16;
  const ic = icon => `<span class="ic" data-sz="${sz}">${svg(icon, sz)}</span>`;
  const watch = `<button class="mkb watch ${st === 'watchlist' ? 'on' : ''}" data-s="watchlist" title="Add to Watchlist">${ic(st === 'watchlist' ? I.check : I.plus)}${pill ? 'Watchlist' : ''}</button>`;
  const done = `<button class="mkb done ${st === 'completed' ? 'on' : ''}" data-s="completed" title="Completed">${ic(I.checkc)}${pill ? 'Done' : ''}</button>`;
  const cross = (act, title) => `<button class="mkb x" data-a="${act}" title="${title}">${ic(I.x)}</button>`;
  const star = `<button class="mkb fame ${fame[key] ? 'on' : ''}" data-a="fame" title="Add to Hall of Fame">${ic(I.award)}</button>`;
  const inAlb = typeof albumHas === 'function' && albumHas(key);
  const aadd = `<button class="mkb watch ${inAlb ? 'on' : ''}" data-a="aadd" title="Add to this album">${ic(inAlb ? I.check : I.plus)}</button>`;
  const inner = { pill: watch + done, icon: watch + done, backlog: cross('remove', 'Remove from Backlog') + done,
                  vault: cross('remove', 'Remove from Vault'), hof: cross('unfame', 'Remove from Hall of Fame'), search: star,
                  album: cross('aremove', 'Remove from this album'), asearch: aadd }[variant];
  return `<div class="mk ${pill ? 'hp' : 'icon'} ${variant === 'search' || variant === 'asearch' ? 'search' : ''}" data-mk="${key}">${inner}</div>`;
}
// repaint every button on screen from the saved data
function refreshMarks() {
  document.querySelectorAll('[data-mk]').forEach(box => {
    const k = box.dataset.mk, st = (lists[k] || {}).status || null;
    box.querySelectorAll('[data-s]').forEach(b => {
      b.classList.toggle('on', b.dataset.s === st);
      if (b.dataset.s === 'watchlist') { const ic = b.querySelector('.ic'); if (ic) ic.innerHTML = svg(st === 'watchlist' ? I.check : I.plus, +ic.dataset.sz || 18); }
    });
    box.querySelectorAll('[data-a="fame"]').forEach(b => b.classList.toggle('on', !!fame[k]));
    box.querySelectorAll('[data-a="aadd"]').forEach(b => {
      const on = typeof albumHas === 'function' && albumHas(k);
      b.classList.toggle('on', on);
      const ic = b.querySelector('.ic'); if (ic) ic.innerHTML = svg(on ? I.check : I.plus, +ic.dataset.sz || 16);
    });
  });
}
// one click handler for all of them; capture phase so the poster underneath does not also open
document.addEventListener('click', e => {
  const b = e.target.closest('[data-mk] [data-s], [data-mk] [data-a]');
  if (!b) return;
  e.stopPropagation(); e.preventDefault();
  const key = b.closest('[data-mk]').dataset.mk, m = known[key];
  if (!m) return;
  const kind = key.split(':')[0], a = b.dataset.a;
  if (a === 'remove') setStatus(kind, m, null);                    // cross in Backlog / Vault
  else if (a === 'unfame') setFame(kind, m, false);                // cross in Hall of Fame
  else if (a === 'fame') setFame(kind, m, !fame[key]);             // purple button on Hall of Fame search results
  else if (a === 'aremove') albumRemove(key);                      // cross inside an album
  else if (a === 'aadd') albumToggle(kind, m);                     // + on album search results
  else setStatus(kind, m, statusOf(kind, m.id) === b.dataset.s ? null : b.dataset.s);   // click again to un-select
}, true);

async function tmdb(path, params = {}, keyOverride) {
  const useKey = keyOverride != null ? keyOverride : KEY;
  if (!useKey || useKey.startsWith('PASTE')) { keyProblem = true; throw new Error('No TMDB API key is set yet. Use the key button at the top right to add yours.'); }
  const url = new URL('https://api.themoviedb.org/3' + path);
  Object.entries({ language: 'en-US', ...params }).forEach(([k, v]) => url.searchParams.set(k, v));
  const opts = {};
  if (useKey.startsWith('eyJ')) opts.headers = { Authorization: 'Bearer ' + useKey };
  else url.searchParams.set('api_key', useKey);
  let res;
  try { res = await fetch(url, opts); } catch (e) { throw new Error('Could not reach TMDB. Check your internet connection.'); }
  if (!res.ok) {
    if (res.status === 401) { if (keyOverride == null) keyProblem = true; throw new Error('TMDB rejected the API key (401). Open the key button at the top right and enter a valid key.'); }
    throw new Error('TMDB error ' + res.status);
  }
  return res.json();
}
const keyBtnHTML = '<br><button class="btn" data-act="keydlg" style="margin-top:14px">Set TMDB API key</button>';
const showMsg = html => { $('#grid').innerHTML = `<div class="msg">${html}${keyProblem ? keyBtnHTML : ''}</div>`; };

const S = { cat: 'movies', genre: 0, query: '', page: 0, pages: 1, loading: false, failed: false, token: 0, auto: 0, count: 0, seen: new Set() };
const genreCache = {};

function browsePage(cat, genre, page) {
  if (genre === 0 && !cat.base) return tmdb('/trending/' + cat.kind + '/week', { page });
  const g = [cat.base && cat.base.with_genres, genre || ''].filter(Boolean).join(',');   // comma = must match all
  return tmdb('/discover/' + cat.kind, { ...(cat.base || {}), ...(g ? { with_genres: g } : {}), sort_by: 'popularity.desc', 'vote_count.gte': cat.votes, page });
}
async function fetchPage(page) {
  const cat = CATS[S.cat];
  if (S.query) {
    const d = await tmdb('/search/' + cat.kind, { query: S.query, page, include_adult: 'false' });
    d.results = d.results.filter(cat.match);
    return d;
  }
  return browsePage(cat, S.genre, page);
}

// ===================== hero carousel =====================
let hero = [], active = 0, timer, heroToken = 0;

function placeHero() {
  const n = hero.length;
  if (!n) return;
  document.querySelectorAll('.hc').forEach((el, i) => {
    let o = (i - active + n) % n;
    if (n > 1 && o === n - 1) o = -1;              // the card that just left
    el.style.setProperty('--tx', o < 0 ? -60 : Math.min(o, 2) * 85);   // hidden cards wait behind the 2nd peek
    el.style.setProperty('--sc', o < 0 ? 0.96 : 1 - Math.min(o, 2) * 0.12);
    el.style.zIndex = 20 - Math.abs(o);
    el.classList.toggle('active', o === 0);
    el.classList.toggle('gone', o < 0 || o > 2);
  });
  document.querySelectorAll('#dots s').forEach((d, i) => d.classList.toggle('on', i === active));
}
function goTo(i) { active = i; placeHero(); restartTimer(); }
function restartTimer() { clearInterval(timer); if (hero.length > 1) timer = setInterval(() => goTo((active + 1) % hero.length), 6000); }
function clearHero() {
  clearInterval(timer); hero = []; active = 0;
  document.querySelectorAll('.hc').forEach(e => e.remove());
  $('#dots').innerHTML = '';
}

async function loadHero() {
  const t = ++heroToken;
  clearHero();
  const cat = CATS[S.cat];
  const list = (await browsePage(cat, 0, 1)).results.filter(m => m.backdrop_path).slice(0, 6);
  const details = await Promise.all(list.map(m => tmdb('/' + cat.kind + '/' + m.id)));
  if (t !== heroToken) return;                      // category changed meanwhile
  hero = details.map(m => ({ ...m, _k: cat.kind }));
  $('#heroWrap').insertAdjacentHTML('afterbegin', hero.map(m => {
    const len = m.runtime ? `${Math.floor(m.runtime / 60)}h ${m.runtime % 60}min`
      : m.number_of_seasons ? `${m.number_of_seasons} season${m.number_of_seasons > 1 ? 's' : ''}` : '';
    const genre = (m.genres || []).find(g => g.id !== cat.hideGenre);
    const badges = [len, genre && genre.name, cat.single, dateOf(m).slice(0, 4), '★ ' + (m.vote_average || 0).toFixed(1)].filter(Boolean);
    return `<div class="hc" style="background-image:url(${IMG}w1280${m.backdrop_path})">
      <div class="ui">
        <div class="badges">${badges.map(b => `<span>${esc(b)}</span>`).join('')}</div>
        <div class="hinfo"><div class="htitle">${esc(titleOf(m))}</div></div>
        ${markHTML(cat.kind, m, 'pill')}
      </div></div>`;
  }).join(''));
  $('#dots').innerHTML = hero.map(() => '<s></s>').join('');
  document.querySelectorAll('.hc').forEach((el, i) => el.onclick = () => { if (i !== active) goTo(i); else openDetail(hero[i]._k, hero[i].id); });
  document.querySelectorAll('#dots s').forEach((d, i) => d.onclick = () => goTo(i));
  placeHero(); restartTimer();
}
$('#heroWrap').onmouseenter = () => clearInterval(timer);
$('#heroWrap').onmouseleave = restartTimer;

// ===================== infinite poster grid =====================
const cardHTML = m => `
  <div class="card" data-id="${m.id}" data-k="${CATS[S.cat].kind}">
    <div class="poster">${m.poster_path ? `<img src="${IMG}w500${m.poster_path}" alt="">` : `<span class="ph">${esc(titleOf(m))}</span>`}${markHTML(CATS[S.cat].kind, m, 'icon')}</div>
    <h4 title="${esc(titleOf(m))}">${esc(titleOf(m))}</h4>
    <p>${dateOf(m).slice(0, 4) || '-'} • <b>★ ${m.vote_average ? m.vote_average.toFixed(1) : '-'}</b></p>
  </div>`;

function resetGrid() {
  Object.assign(S, { page: 0, pages: 1, loading: false, failed: false, auto: 0, count: 0, seen: new Set() });
  S.token++;
  $('#grid').innerHTML = Array(10).fill('<div class="card sk"><div class="poster"></div><h4></h4><p></p></div>').join('');
  $('#more').textContent = '';
}

const noResults = () => showMsg(S.query ? `<b>No results for “${esc(S.query)}”</b> in ${CATS[S.cat].label}.<br>Try another spelling, or switch the category at the top.` : '<b>Nothing to show here yet.</b>');

async function loadMore() {
  if (S.loading || S.failed || S.page >= S.pages) return;
  S.loading = true;
  const t = S.token, first = S.page === 0;
  if (!first) $('#more').textContent = 'Loading more…';
  try {
    const data = await fetchPage(S.page + 1);
    if (t !== S.token) return;                       // a newer click/search won
    S.page = data.page;
    S.pages = Math.min(data.total_pages || 0, 500);  // TMDB allows at most 500 pages
    const fresh = data.results.filter(m => !S.seen.has(m.id) && S.seen.add(m.id));
    S.count += fresh.length;
    if (first) $('#grid').innerHTML = '';
    $('#grid').insertAdjacentHTML('beforeend', fresh.map(cardHTML).join(''));
    const done = S.page >= S.pages;
    $('#more').textContent = done && S.count ? 'You reached the end.' : '';
    if (done && !S.count) noResults();
  } catch (err) {
    if (t === S.token) {
      S.failed = true;
      if (S.count === 0) showMsg('<b>Could not load movies.</b><br>' + esc(err.message));
      else $('#more').textContent = 'Could not load more. Scroll again to retry.';
    }
  } finally {
    if (t === S.token) {
      S.loading = false;
      const cap = S.count ? 6 : 15;                  // limit automatic page loads
      if (!S.failed && ++S.auto <= cap) requestAnimationFrame(checkMore);
      else if (!S.failed && !S.count && S.page < S.pages) noResults();
    }
  }
}

function checkMore() {
  const s = $('#scroll');
  if (s.scrollTop + s.clientHeight <= s.scrollHeight - 700) return;
  if (!$('#viewHome').hidden) loadMore();
  else if (isAddView(curView) && qOf() && typeof loadMoreFame === 'function') loadMoreFame();
}
$('#scroll').addEventListener('scroll', () => { S.failed = false; S.auto = 0; HF.failed = false; HF.auto = 0; checkMore(); });
$('#grid').addEventListener('load', e => e.target.classList.add('in'), true);   // fade posters in

// ===================== genre row =====================
async function loadGenres() {
  const cat = CATS[S.cat];
  if (!genreCache[cat.kind]) genreCache[cat.kind] = (await tmdb('/genre/' + cat.kind + '/list')).genres;
  const list = [{ id: 0, name: 'Trending' }, ...genreCache[cat.kind].filter(g => g.id !== cat.hideGenre)];
  $('#pills').innerHTML = list.map(g => `<div class="pill ${g.id === S.genre ? 'on' : ''}" data-id="${g.id}">${esc(g.name)}</div>`).join('');
  $('#pills').scrollLeft = 0;
}

let suppressClick = false, drag = null;   // dragging the row must not count as a click
$('#pills').onclick = e => {
  const p = e.target.closest('.pill'); if (!p || suppressClick) return;
  document.querySelectorAll('.pill').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
  S.genre = +p.dataset.id; resetGrid(); loadMore();
};
$('#pills').addEventListener('pointerdown', e => { if (e.button === 0) drag = { x: e.clientX, left: $('#pills').scrollLeft, moved: false }; });
window.addEventListener('pointermove', e => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 5) drag.moved = true;
  if (drag.moved) $('#pills').scrollLeft = drag.left - dx;
});
window.addEventListener('pointerup', () => {
  if (drag && drag.moved) { suppressClick = true; setTimeout(() => suppressClick = false, 0); }
  drag = null;
});
$('#pills').addEventListener('wheel', e => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.currentTarget.scrollBy({ left: e.deltaY }); e.preventDefault(); }
}, { passive: false });
$('#prev').onclick = () => $('#pills').scrollBy({ left: -320, behavior: 'smooth' });
$('#next').onclick = () => $('#pills').scrollBy({ left: 320, behavior: 'smooth' });

// ===================== category toggle =====================
$('#seg').innerHTML = '<span class="seg-thumb" id="segThumb"></span><button data-c="all" class="seg-all">All<span class="cnt"></span></button>'
  + Object.entries(CATS).map(([k, c]) => `<button data-c="${k}">${c.label}<span class="cnt"></span></button>`).join('')
  + `<i class="seg-link" id="segLink">${svg(I.link, 13)}</i>`;

function placeThumb() {
  const cat = viewCat();
  const b = document.querySelector(`#seg button[data-c="${cat}"]`);
  if (!b) return;
  document.querySelectorAll('#seg button').forEach(x => x.classList.toggle('on', x === b));
  $('#segThumb').style.left = b.offsetLeft + 'px';
  $('#segThumb').style.width = b.offsetWidth + 'px';
  const hint = isAddView(curView) ? 'Search any title to add…' : 'Search your ' + (curView === 'backlog' ? 'backlog' : 'vault') + '…';
  $('#q').placeholder = isList(curView) ? (document.activeElement === $('#q') ? hint : 'Search') : 'Search ' + CATS[cat].label.toLowerCase() + '…';
}
window.addEventListener('resize', placeThumb);
if (document.fonts) document.fonts.ready.then(placeThumb);

function applySearchUI() {
  $('#scroll').classList.toggle('searching', !!S.query);
  $('#resTitle').innerHTML = S.query ? `Results for “${esc(S.query)}” <small>in ${CATS[S.cat].label}</small>` : '';
}

async function setCategory(key) {
  S.cat = key; S.genre = 0;
  try { localStorage.setItem('cat', key); } catch (e) {}
  placeThumb(); showView('home'); applySearchUI();
  try { await loadGenres(); } catch (err) { showMsg('<b>Could not connect to TMDB.</b><br>' + esc(err.message)); return; }
  if (key !== S.cat) return;                         // toggled again while loading
  resetGrid(); loadMore();
  if (!S.query) loadHero().catch(err => console.error(err));
  else loadHero().catch(() => {});
}
$('#seg').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  if (isList(curView)) { LV.cat = b.dataset.c; renderList(); return; }   // filter saved media
  if (hasKey) setCategory(b.dataset.c);
};

// ===================== search =====================
let searchTimer;
function runSearch() {
  const q = $('#q').value.trim();
  if (isList(curView)) { const key = curView === 'fame' ? 'fq' : curView === 'album' ? 'aq' : 'query'; if (q !== LV[key]) { LV[key] = q; renderList(); } return; }   // filter saved media (Hall of Fame: search TMDB)
  if (q === S.query || !hasKey) return;
  S.query = q;
  showView('home'); applySearchUI();
  resetGrid(); loadMore();
}
$('#q').addEventListener('input', () => { syncHas(); clearTimeout(searchTimer); searchTimer = setTimeout(runSearch, isList(curView) && !isAddView(curView) ? 0 : 400); });
$('#q').addEventListener('focus', placeThumb);
$('#q').addEventListener('blur', placeThumb);
$('#q').addEventListener('keydown', e => {
  if (e.key === 'Enter') { clearTimeout(searchTimer); runSearch(); $('#q').blur(); }          // keep the text, leave the box (press K to type again, C to clear)
  if (e.key === 'Escape') { $('#q').value = ''; syncHas(); runSearch(); $('#q').blur(); }
});

// keyboard: Ctrl+K opens the search box of the page you are on, Esc clears it and closes it
window.addEventListener('keydown', e => {
  if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey || e.key.toLowerCase() !== 'k') return;
  if (!$('#albDlg').hidden) return;
  e.preventDefault();
  if (!dt.hidden) return goTo2('search');                      // movie page: same as its search icon
  if (curView === 'multiverse') return;                        // the shelf has no search box
  $('#q').focus(); $('#q').select();
});
window.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || !dt.hidden || !$('#albDlg').hidden || curView === 'multiverse') return;
  const q = $('#q');
  if (q.value || document.activeElement === q) { e.preventDefault(); q.value = ''; syncHas(); clearTimeout(searchTimer); runSearch(); q.blur(); }   // clear it and close it
});

// ===================== start =====================
function init() {
  let saved = 'movies';
  try { saved = localStorage.getItem('cat') || 'movies'; } catch (e) {}
  if (!CATS[saved]) saved = 'movies';
  S.cat = saved; showView('home');
  if (!hasKey) {
    showMsg('<b>Welcome to Cinephile.</b><br>Browsing movies, series, anime and documentaries uses the free TMDB service, which needs your own API key.<br>Press the button below to add it (it takes about two minutes to get one). Your saved lists still work without it.');
    return;
  }
  setCategory(saved);
}
init();

// GitHub button (top right of the home page)
$('#ghBtn').onclick = () => window.open(window.GITHUB_URL || 'https://github.com');
