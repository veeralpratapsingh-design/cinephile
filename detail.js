// ===================== movie page =====================
const dt = $('#detail');
let detStack = [], detToken = 0, cur = null;

function typeOf(d, kind) {
  const ids = (d.genres || []).map(g => g.id);
  if (kind === 'tv' && ids.includes(16) && d.original_language === 'ja') return { label: 'Anime Series', hide: 16 };
  if (ids.includes(99)) return { label: 'Documentary', hide: 99 };
  return { label: kind === 'tv' ? 'Series' : 'Movie', hide: null };
}

const navHTML = kind => `
  <header class="dt-nav">
    <button class="dt-back" id="dtBack" title="Back (Esc)">${svg(I.left)}</button>
    <div class="dt-logo">Cinephile</div>
    <div class="dt-tools">
      <i data-go="search" title="Search">${svg(I.search)}</i>
      <i data-go="home" title="Home">${svg(I.home)}</i>
    </div>
  </header>`;

function detailHTML(d, kind) {
  const ty = typeOf(d, kind);
  const studio = ((d.production_companies || [])[0] || (d.networks || [])[0] || {}).name;
  const kicker = studio ? `A ${studio} ${ty.label}` : ty.label;
  const t = titleOf(d);
  const m = /^(the|a|an)\s+(.+)$/i.exec(t);
  const titleHTML = m ? `<span class="t-small">${esc(m[1])}</span><span class="t-main">${esc(m[2])}</span>` : `<span class="t-main">${esc(t)}</span>`;
  const genre = (d.genres || []).find(g => g.id !== ty.hide);
  const length = d.runtime ? `${Math.floor(d.runtime / 60)}h ${d.runtime % 60}min`
    : d.number_of_episodes ? `${d.number_of_episodes} Episode${d.number_of_episodes > 1 ? 's' : ''}` : '';
  const meta = [dateOf(d).slice(0, 4), genre && genre.name, length].filter(Boolean);
  const st = statusOf(kind, d.id);
  const rec = (d.recommendations && d.recommendations.results) || [];
  const sim = (rec.length ? rec : (d.similar && d.similar.results) || []).filter(x => x.backdrop_path || x.poster_path).slice(0, 20);

  return `
  <div class="dt-bg" style="background-image:url(${IMG}original${d.backdrop_path || d.poster_path}),url(${IMG}w780${d.backdrop_path || d.poster_path})"></div>
  <div class="dt-shade"></div>
  <div class="dt-page">
    ${navHTML(kind)}
    <section class="dt-info">
      <div class="dt-kicker">${esc(kicker)}</div>
      <h1 class="dt-title" id="dtTitle">${titleHTML}</h1>
      ${d.tagline ? `<div class="dt-tag">${esc(d.tagline)}</div>` : ''}
      <div class="dt-meta">${meta.map(x => esc(x)).join('<i class="sep"></i>')}${d.vote_average ? `<span class="badge">★ ${d.vote_average.toFixed(1)}</span>` : ''}</div>
      <p class="dt-desc">${esc(d.overview || 'No description available yet.')}</p>
      <div class="dt-btns" data-mk="${listKey(kind, d.id)}">
        <button class="dbtn watch ${st === 'watchlist' ? 'on' : ''}" data-s="watchlist"><span class="ic">${svg(st === 'watchlist' ? I.check : I.plus)}</span>Add to Watchlist</button>
        <button class="dbtn done ${st === 'completed' ? 'on' : ''}" data-s="completed"><span class="ic">${svg(I.checkc)}</span>Completed</button>
      </div>
    </section>
    <section class="dt-sim">
      <div class="sim-head"><h3>Similar Artpieces</h3>
        <div class="sim-arrows"><button class="sim-arrow" data-d="l">${svg(I.left)}</button><button class="sim-arrow" data-d="r">${svg(I.right)}</button></div>
      </div>
      ${sim.length ? `<div class="sim-row" id="simRow">${sim.map(s => `
        <div class="sim-card" data-id="${s.id}" data-k="${kind}">
          <img src="${IMG}w500${s.backdrop_path || s.poster_path}" alt="" loading="lazy">
          <span class="sim-t">${esc(titleOf(s))}</span>
        </div>`).join('')}</div>` : '<div class="dt-empty">No similar titles found yet.</div>'}
    </section>
  </div>`;
}

// shrink long titles so they always fit the title box
function fitTitle() {
  const h = $('#dtTitle'); if (!h) return;
  const main = h.querySelector('.t-main'), small = h.querySelector('.t-small');
  main.style.fontSize = ''; main.style.whiteSpace = 'nowrap';
  if (small) small.style.fontSize = '';
  const base = parseFloat(getComputedStyle(main).fontSize), smallBase = small ? parseFloat(getComputedStyle(small).fontSize) : 0;
  let f = base;
  while (main.scrollWidth > h.clientWidth && f > base * 0.45) { f *= 0.94; main.style.fontSize = f + 'px'; }
  if (main.scrollWidth > h.clientWidth) main.style.whiteSpace = 'normal';   // very long names wrap
  if (small && f < base) small.style.fontSize = smallBase * f / base + 'px';
}
window.addEventListener('resize', fitTitle);
if (document.fonts) document.fonts.ready.then(fitTitle);

async function showDetail(kind, id) {
  const t = ++detToken;
  cur = null;
  dt.hidden = false;
  dt.innerHTML = `<div class="dt-page">${navHTML(kind)}<div class="dt-info"><div class="dt-loading">Loading…</div></div></div>`;
  dt.scrollTop = 0;
  requestAnimationFrame(() => dt.classList.add('show'));
  try {
    const d = await tmdb(`/${kind}/${id}`, { append_to_response: 'recommendations,similar' });
    if (t !== detToken) return;                      // user went elsewhere
    cur = { kind, d };
    known[listKey(kind, d.id)] = d;
    dt.innerHTML = detailHTML(d, kind);
    dt.scrollTop = 0;
    fitTitle();
  } catch (err) {
    if (t === detToken) dt.innerHTML = `<div class="dt-page">${navHTML(kind)}<div class="dt-info"><div class="dt-loading">Could not load this page.<br>${esc(err.message)}</div></div></div>`;
  }
}

function openDetail(kind, id) {
  if (!hasKey) return;
  const top = detStack[detStack.length - 1];
  if (!top || top.kind !== kind || top.id !== id) detStack.push({ kind, id });
  showDetail(kind, id);
}
function closeDetail() {
  detStack = []; detToken++; cur = null;
  dt.classList.remove('show');
  setTimeout(() => { if (!dt.classList.contains('show')) { dt.hidden = true; dt.innerHTML = ''; } }, 350);
}
function detBack() {
  detStack.pop();
  const prev = detStack[detStack.length - 1];
  if (prev) showDetail(prev.kind, prev.id); else closeDetail();
}

function goTo2(where) {                              // top-bar links inside the movie page
  closeDetail();
  if (where === 'home') showView('home');
  else if (where === 'search') $('#q').focus();
}

dt.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('#dtBack')) return detBack();
  const go = t.closest('[data-go]'); if (go) return goTo2(go.dataset.go);
  const c = t.closest('.sim-card'); if (c) return openDetail(c.dataset.k, +c.dataset.id);
  const a = t.closest('.sim-arrow');
  if (a) { const row = $('#simRow'); if (row) row.scrollBy({ left: (a.dataset.d === 'l' ? -1 : 1) * row.clientWidth * 0.9, behavior: 'smooth' }); }
});
$('#grid').addEventListener('click', e => {         // click any poster
  const c = e.target.closest('.card[data-id]');
  if (c) openDetail(c.dataset.k, +c.dataset.id);
});
window.addEventListener('keydown', e => { if (e.key === 'Escape' && !dt.hidden) detBack(); });
