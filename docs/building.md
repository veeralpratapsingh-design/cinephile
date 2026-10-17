# Building and releasing

## Requirements

- Windows 10/11, Node.js 22.12 or newer (LTS), npm, internet access (the first build downloads Electron and the NSIS tools).

## Build the installer

```
node --version
npm --version
npm ci
npm start
npm run dist:win
```

Close the app after `npm start` before building. The installer appears at:

```
dist\Cinephile-Setup-1.0.0.exe
```

(The version in the name comes from `package.json`.) `npm run dist:win` first runs `npm run check`, which stops the build if a file is missing or `config.js` contains an API key.

Packaging is configured in the `build` section of `package.json`: NSIS wizard installer (not one-click), choice of install folder, Start Menu and desktop shortcuts, app ID `com.cinephile.app`, 64-bit, output folder `dist/`. The fonts under `node_modules/@fontsource` are included in the packaged app.

On a fresh machine a first build may take several minutes. See [troubleshooting.md](troubleshooting.md) if it fails.

## Publish a release

1. Create a new **public** repository on GitHub and upload the files of this project (not `node_modules` or `dist`; `.gitignore` handles this).
2. Search the repository for keys before pushing (`config.js` must have `window.TMDB_KEY = ""`).
3. Build the installer as above.
4. Install it on a Windows PC and test it: first-run key window, browsing, saving titles, restarting the app.
5. On GitHub: **Releases > Draft a new release**, create a tag such as `v1.0.0`, and give it a title.
6. Attach `Cinephile-Setup-1.0.0.exe` as a release asset.
7. Write honest release notes (what is new, that the installer is unsigned, that a TMDB key is required).
8. Replace the placeholder Releases link in `README.md` with the real one.

Do not commit installers to the source repository; release assets are the place for them.

## Make a later release

1. Change `"version"` in `package.json` (for example `1.0.1`) and run `npm install` so `package-lock.json` follows.
2. Build, test, tag (`v1.0.1`) and attach the new `Cinephile-Setup-1.0.1.exe`.

Users install the new version over the old one; their data folder is left alone.

## Code signing

Builds are unsigned. Signing needs a code-signing certificate and extra electron-builder settings; until then SmartScreen may warn on first run.
