# Troubleshooting

**The app says no TMDB key is set / "TMDB rejected the API key (401)"**
Click the key button at the top right (or **Set TMDB API key**) and paste a valid key. See [api-configuration.md](api-configuration.md).

**"Could not reach TMDB"**
Check your internet connection, firewall or VPN. Only `api.themoviedb.org` and `image.tmdb.org` are used.

**Windows says "Windows protected your PC"**
The installer is unsigned. Choose **More info > Run anyway** if it came from your own build or the official Releases page.

**`npm ci` fails with an Electron or Node error**
Update Node.js to 22.12 or newer (`node --version`).

**`npm ci` complains about `package-lock.json`**
Run it from the project root (the folder containing `package.json`). Do not delete the lock file.

**`npm run dist:win` fails with "Cannot create symbolic link" or a winCodeSign error**
Turn on Windows **Developer Mode** (Settings > System > For developers) or open the terminal as Administrator, then run the command again.

**The build stops with "config.js contains a TMDB key"**
Set `window.TMDB_KEY = ""` in `config.js`, then build again.

**Build stops with "Font stylesheet missing"**
Run `npm ci` first so `node_modules` exists.

**Antivirus blocks the build or installer**
Unsigned Electron apps are sometimes flagged. Add an exception for the project folder, or check the file on the official Releases page.

**My lists are gone after reinstalling**
Look in `%APPDATA%\cinephile`. If it is empty or missing, the data was removed (new account, cleanup tools, or manual deletion).

**Stuck loading / blank screen**
Close the app and start it again. If it persists, run `npm start` from source and open an issue with the console output (hide your key).
