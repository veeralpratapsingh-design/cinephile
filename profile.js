// ===================== profile photo =====================
// Click the round button (top right) to pick a photo. It is cropped to a square, shrunk, and kept on this PC (localStorage).
// Older saved name / tags are left untouched in storage, they are simply no longer shown.
const PROF_KEY = 'serivia_profile';
let PROF = { name: '', tags: [], pic: '' };
try { const o = JSON.parse(localStorage.getItem(PROF_KEY) || '{}'); if (o && typeof o === 'object') Object.assign(PROF, o); } catch (e) {}
if (typeof PROF.pic !== 'string') PROF.pic = '';
function saveProf() {
  try { localStorage.setItem(PROF_KEY, JSON.stringify(PROF)); return true; } catch (e) { return false; }
}
function paintProf() {
  const has = !!PROF.pic;
  $('#profImg').hidden = !has; if (has) $('#profImg').src = PROF.pic;
  $('#profInit').innerHTML = has ? '' : svg(I.user, 20);
  $('#profX').hidden = !has;
  $('#profBtn').classList.toggle('on', has);
  $('#profBtn').title = has ? 'Change your profile photo' : 'Add a profile photo';
}
const pickPhoto = () => $('#profFile').click();
$('#profBtn').addEventListener('click', e => { if (e.target.closest('#profX')) return; pickPhoto(); });
$('#profBtn').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === $('#profBtn')) { e.preventDefault(); pickPhoto(); } });
$('#profFile').addEventListener('change', e => {
  const file = e.target.files[0]; e.target.value = '';
  if (!file) return;
  const rd = new FileReader();
  rd.onload = () => {
    const im = new Image();
    im.onload = () => {
      const s = Math.min(im.width, im.height), c = document.createElement('canvas'); c.width = c.height = 256;
      c.getContext('2d').drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 256, 256);
      const old = PROF.pic;
      PROF.pic = c.toDataURL('image/jpeg', .88);
      if (!saveProf()) { PROF.pic = old; alert('Could not save the photo on this PC (storage is full or blocked).'); }
      paintProf();
    };
    im.onerror = () => alert('That file could not be read as a picture.');
    im.src = rd.result;
  };
  rd.readAsDataURL(file);
});
$('#profX').addEventListener('click', e => { e.stopPropagation(); PROF.pic = ''; saveProf(); paintProf(); });
paintProf();
