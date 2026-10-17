# Build the Cinephile Windows installer

This folder is the complete Cinephile project, ready to be turned into a Windows installer (`.exe`). You do **not** need to edit any file or add any API key.

## What you need

- Windows 10 or 11 (64-bit)
- Node.js 22.12 or newer (LTS) from <https://nodejs.org> (this also installs npm)
- Internet access (the first build downloads Electron and the installer tools)

## Commands

Extract the ZIP, open the extracted folder in File Explorer, click the address bar, type `cmd` and press Enter. Then run these one at a time, in order:

```
node --version
npm --version
npm ci
npm start
npm run dist:win
```

1. `node --version` and `npm --version` must each print a version number. Node must be 22.12 or higher.
2. `npm ci` installs the exact dependencies (takes a minute or two).
3. `npm start` opens Cinephile so you can check that it runs. **Close the Cinephile window before continuing.** On first run it asks for a TMDB key: see below. You can also skip entering a key for this test.
4. `npm run dist:win` builds the installer. The first build can take several minutes.

## Find the installer

Open the `dist` folder inside this project. The installer is:

```
dist\Cinephile-Setup-1.0.0.exe
```

(The number in the name is the `version` in `package.json`.)

## The one-click alternative

Double-click `build-windows.bat`. It checks Node and npm, runs `npm ci` if needed, builds the installer, stops with a message if anything fails, and prints the full path of the installer when it succeeds.

## TMDB API key

Nothing secret is in this project. Each person who uses Cinephile gets their own free key at <https://www.themoviedb.org/settings/api> and pastes it into the "TMDB API key" window the app shows on first start (details in `docs/api-configuration.md`). The build refuses to continue if `config.js` contains a key, so your own key cannot be baked into the installer. Keys stored in any desktop app can be extracted, so never rely on hiding one.

## About Windows warnings

The installer is not code-signed. Windows SmartScreen may show "Windows protected your PC" when you run it: choose **More info > Run anyway**. Do not expect this warning to disappear without a code-signing certificate.

## If something goes wrong

See `docs/troubleshooting.md`. The most common fix for a "symbolic link" or "winCodeSign" error is to turn on Windows Developer Mode (Settings > System > For developers) and run `npm run dist:win` again.

## Publishing

After you have installed and tested the installer, attach it to a GitHub Release. Steps are in `docs/building.md`.
