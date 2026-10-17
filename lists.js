// ===================== The Backlog, The Vault and Hall of Fame =====================
const LIST_INFO = {
  backlog: { title: 'The Backlog', name: 'Backlog', sub: 'Everything you plan to watch.', variant: 'backlog',
             how: 'Hover over any poster on the home page and tap + to add it here.' },
  vault:   { title: 'The Vault', name: 'Vault', sub: 'Everything you have finished watching.', variant: 'vault',
             how: 'Hover over any poster on the home page and tap the tick to add it here.' },
  fame:    { title: 'Hall of Fame', name: 'Hall of Fame', sub: 'Your all-time favourites.', variant: 'hof',
             how: 'Use the search box above to find a title, then tap the purple award button on its poster.' },
  album:   { title: 'Album', name: 'album', sub: '', variant: 'album',
             how: 'Use the search box above to find a title, then tap + on its poster to add it to this album.' }
};
const catOfRec = r => r.cat || (r.kind === 'tv' ? 'series' : 'movies');
const recsOf = status => (status === 'fame' ? Object.values(fame) : Object.values(lists).filter(r => r.status === status))
  .sort((a, b) => b.added - a.added);

function countsOfRecs(recs) {
  const c = { anime: 0, movies: 0, series: 0, docs: 0, total: 0 };
  recs.forEach(r => { c[catOfRec(r)]++; c.total++; });
  c.all = c.total;
  return c;
}
const countsOf = status => countsOfRecs(recsOf(status));
// what the current page shows: a saved list, or the titles inside the open album
const viewRecs = () => (curView === 'album' ? albumRecs(LV.album) : recsOf(LISTVIEWS[curView]));

// numbers next to the three menus in the sidebar (all categories together)
function updateBadges() {
  document.querySelectorAll('[data-nb]').forEach(el => { el.textContent = countsOf(LISTVIEWS[el.dataset.nb]).total; });
}
// the count inside the selected category button + the big total at the top right
function updateCounts() {
  const list = isList(curView);
  $('#seg').classList.toggle('counts', list);
  if (list) {
    const c = countsOfRecs(viewRecs());
    document.querySelectorAll('#seg button').forEach(b => { b.querySelector('.cnt').textContent = c[b.dataset.c]; });
    $('#totalNum').textContent = c.total;
    const alb = curView === 'album' ? albumById(LV.album) : null;
    $('#totalLbl').textContent = alb ? alb.name : 'total saved';      // inside an album the label is the album's name
  }
  placeThumb();                                      // buttons changed width, so move the highlight
}

const recToItem = r => ({ id: r.id, title: r.title, poster_path: r.poster, backdrop_path: r.backdrop, release_date: r.date, vote_average: r.rating, _cat: r.cat });
const posterHTML = (path, title) => path ? `<img src="${IMG}w500${path}" alt="">` : `<span class="ph">${esc(title)}</span>`;
const yearOf = d => (d || '').slice(0, 4) || '-';
const rateOf = v => (v ? v.toFixed(1) : '-');

function recCardHTML(r) {                            // a saved title
  return `
  <div class="card" data-id="${r.id}" data-k="${r.kind}">
    <div class="poster">${posterHTML(r.poster, r.title)}${markHTML(r.kind, recToItem(r), LIST_INFO[curView].variant)}</div>
    <h4 title="${esc(r.title)}">${esc(r.title)}</h4>
    <p>${yearOf(r.date)} • <b>★ ${rateOf(r.rating)}</b></p>
  </div>`;
}
function fameResultHTML(m, kind) {                   // a search result (Hall of Fame / album search)
  return `
  <div class="card" data-id="${m.id}" data-k="${kind}">
    <div class="poster">${posterHTML(m.poster_path, titleOf(m))}${markHTML(kind, m, curView === 'album' ? 'asearch' : 'search')}</div>
    <h4 title="${esc(titleOf(m))}">${esc(titleOf(m))}</h4>
    <p>${yearOf(dateOf(m))} • <b>★ ${rateOf(m.vote_average)}</b></p>
  </div>`;
}

const hofSearching = () => isAddView(curView) && !!qOf();      // Hall of Fame or album: the search box looks up new titles

function renderList() {
  const info = LIST_INFO[curView];
  if (!info) return;
  updateBadges(); updateCounts();
  if (hofSearching()) { showShelf(false); startFameSearch(); return; }

  const catName = catLabel(LV.cat), q = qOf().toLowerCase();
  const all = viewRecs();
  // while searching, look through all categories; otherwise show the selected one (or everything for All)
  let shown = q ? all.filter(r => r.title.toLowerCase().includes(q)) : LV.cat === 'all' ? all.slice() : all.filter(r => catOfRec(r) === LV.cat);
  if (LV.sort) shown.sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.added - a.added);   // highest rating first

  let empty = '';
  if (!shown.length) {
    empty = !all.length ? `<b>${curView === 'album' ? 'This album is empty' : `Your ${info.name} is empty`}.</b><br>${info.how}`
      : q ? `<b>No matches for “${esc(qOf())}”</b> in ${curView === 'album' ? 'this album' : 'your ' + info.name}.`
      : `<b>Nothing in ${esc(catName)} yet.</b><br>${info.how}`;
  }
  const useShelf = LV.shelf && shown.length > 0;      // book view (an empty page still shows its message)
  showShelf(useShelf);
  if (useShelf) { renderShelf(shown, info.name); return; }
  $('#listGrid').innerHTML = shown.length ? shown.map(recCardHTML).join('') : `<div class="msg">${empty}</div>`;
}
// switch between the poster grid and the shelf of tapes
function showShelf(on) {
  $('#listGrid').hidden = on;
  $('#listShelf').hidden = !on;
  $('#scroll').classList.toggle('shelf', on);
  if (!on) $('#listShelf').innerHTML = '';
}

// ---------- Hall of Fame search: results come from TMDB ----------
function startFameSearch() {
  Object.assign(HF, { page: 0, pages: 1, loading: false, failed: false, auto: 0, count: 0, seen: new Set() });
  HF.token++;
  $('#listGrid').innerHTML = Array(10).fill('<div class="card sk"><div class="poster"></div><h4></h4><p></p></div>').join('');
  loadMoreFame();
}
async function loadMoreFame() {
  if (!hofSearching() || HF.loading || HF.failed || HF.page >= HF.pages) return;
  HF.loading = true;
  const t = HF.token, first = HF.page === 0;
  const none = () => { $('#listGrid').innerHTML = `<div class="msg"><b>No results for “${esc(qOf())}”</b>.<br>Try another spelling.</div>`; };
  try {
    const d = await tmdb('/search/multi', { query: qOf(), page: HF.page + 1, include_adult: 'false' });   // movies, anime, series and documentaries together
    if (t !== HF.token) return;                      // a newer search won
    HF.page = d.page; HF.pages = Math.min(d.total_pages || 0, 500);
    const fresh = d.results.filter(m => (m.media_type === 'movie' || m.media_type === 'tv') && !HF.seen.has(m.media_type + m.id) && HF.seen.add(m.media_type + m.id));
    HF.count += fresh.length;
    if (first) $('#listGrid').innerHTML = '';
    $('#listGrid').insertAdjacentHTML('beforeend', fresh.map(m => fameResultHTML(m, m.media_type)).join(''));
    if (HF.page >= HF.pages && !HF.count) none();
  } catch (err) {
    if (t === HF.token) { HF.failed = true; if (!HF.count) $('#listGrid').innerHTML = `<div class="msg"><b>Could not search.</b><br>${esc(err.message)}</div>`; }
  } finally {
    if (t === HF.token) {
      HF.loading = false;
      if (!HF.failed && ++HF.auto <= (HF.count ? 6 : 15)) requestAnimationFrame(checkMore);
      else if (!HF.failed && !HF.count && HF.page < HF.pages) none();
    }
  }
}

// anything saved or removed anywhere: update the counters, and the page if it is showing saved titles
function onListsChanged() {
  updateBadges();
  if (curView === 'multiverse') { renderMulti(); return; }
  if (isList(curView) && !hofSearching()) renderList(); else updateCounts();
}

// ---------- book icon: show the page as a shelf of books ----------
try { LV.shelf = localStorage.getItem('serivia_shelf') === '1'; } catch (e) {}
$('#shelfBtn').classList.toggle('on', LV.shelf);
$('#shelfBtn').addEventListener('click', () => {
  LV.shelf = !LV.shelf;
  try { localStorage.setItem('serivia_shelf', LV.shelf ? '1' : '0'); } catch (e) {}
  $('#shelfBtn').classList.toggle('on', LV.shelf);
  $('#shelfBtn').title = LV.shelf ? 'Book view is on. Click to go back to posters' : 'Book view: show these titles as a shelf of books';
  if (isList(curView)) renderList();
});

// ---------- sort icon: highest rating first ----------
$('#sortBtn').addEventListener('click', () => {
  LV.sort = !LV.sort;
  $('#sortBtn').classList.toggle('on', LV.sort);
  $('#sortBtn').title = LV.sort ? 'Sorted by rating (high to low). Click to switch off' : 'Sort by rating (high to low)';
  if (isList(curView) && !hofSearching()) renderList();
});

$('#listGrid').addEventListener('click', e => {      // click a poster to open its movie page
  const card = e.target.closest('.card[data-id]');
  if (card) openDetail(card.dataset.k, +card.dataset.id);
});
$('#listGrid').addEventListener('load', e => e.target.classList.add('in'), true);   // fade posters in

updateBadges();

// ---------- link icon on the category toggle: keep Backlog, Vault and Hall of Fame on the same category ----------
try { LV.link = localStorage.getItem('serivia_catlink') === '1'; } catch (e) {}
function paintLink() {
  $('#segLink').classList.toggle('on', LV.link);
  $('#segLink').title = LV.link ? 'Linked: Backlog, Vault and Hall of Fame share one category. Click to unlink' : 'Link the category of Backlog, Vault and Hall of Fame';
}
paintLink();
$('#segLink').addEventListener('click', e => {
  e.stopPropagation();
  LV.link = !LV.link;
  try { localStorage.setItem('serivia_catlink', LV.link ? '1' : '0'); } catch (e2) {}
  if (LV.link && curView in LISTVIEWS) LV.cat = LV.cat;      // switching it on copies this page's category to the other two
  paintLink();
});
