// ===================== TMDB API key window =====================
// Each user enters their own TMDB key. It is kept in this app's local storage (not a secure vault; see docs/api-configuration.md).
const keyDlg = $('#keyDlg');
const storedKey = () => { try { return (localStorage.getItem(KEY_STORE) || '').trim(); } catch (e) { return ''; } };
function openKeyDlg() {
  $('#keyIn').value = ''; $('#keyErr').textContent = '';
  $('#keyRm').hidden = !storedKey();
  $('#keySave').disabled = false; $('#keySave').textContent = 'Save key';
  keyDlg.hidden = false;
  setTimeout(() => $('#keyIn').focus(), 30);
}
const closeKeyDlg = () => { keyDlg.hidden = true; };

async function saveKey() {
  const k = $('#keyIn').value.trim(), err = m => { $('#keyErr').textContent = m; };
  if (!k) return err('Paste your TMDB key first.');
  $('#keySave').disabled = true; $('#keySave').textContent = 'Checking…'; err('');
  try {
    await tmdb('/configuration', {}, k);                         // make sure TMDB accepts it before saving
    try { localStorage.setItem(KEY_STORE, k); } catch (e) { throw new Error('Could not save the key on this computer (storage is blocked or full).'); }
    location.reload();                                           // start fresh with the new key
  } catch (e) {
    err(e.message); $('#keySave').disabled = false; $('#keySave').textContent = 'Save key';
  }
}
$('#keySave').addEventListener('click', saveKey);
$('#keyCancel').addEventListener('click', closeKeyDlg);
$('#keyRm').addEventListener('click', () => { try { localStorage.removeItem(KEY_STORE); } catch (e) {} location.reload(); });
$('#keyIn').addEventListener('keydown', e => { if (e.key === 'Enter') saveKey(); });
keyDlg.addEventListener('mousedown', e => { if (e.target === keyDlg) closeKeyDlg(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape' && !keyDlg.hidden) { e.stopImmediatePropagation(); closeKeyDlg(); } }, true);
$('#keyBtn').addEventListener('click', openKeyDlg);
document.addEventListener('click', e => { if (e.target.closest('[data-act="keydlg"]')) openKeyDlg(); });
// first run: no key yet, so open the window straight away
if (!hasKey) setTimeout(openKeyDlg, 400);
