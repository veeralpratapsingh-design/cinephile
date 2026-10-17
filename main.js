// main.js - opens the Cinephile window
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Keep the user-data folder fixed (%APPDATA%\cinephile on Windows) so saved lists, albums and the profile photo
// are found again after updates and reinstalls. Nothing here deletes that folder.
app.setPath('userData', path.join(app.getPath('appData'), 'cinephile'));

const openSafely = url => { if (/^https?:\/\//i.test(url)) shell.openExternal(url); };   // only web links leave the app

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    autoHideMenuBar: true,
    backgroundColor: '#0e1518',
    title: 'Cinephile',
    icon: path.join(__dirname, 'assets', 'icons', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.webContents.setWindowOpenHandler(({ url }) => { openSafely(url); return { action: 'deny' }; });   // links open in your browser
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); openSafely(url); } });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
