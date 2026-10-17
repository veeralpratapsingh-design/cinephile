# TMDB API key

Cinephile loads titles and posters from [TMDB](https://www.themoviedb.org/). Each user needs their own free key. The project does not include one.

## Get a key

1. Create a free account at <https://www.themoviedb.org/signup>.
2. Open <https://www.themoviedb.org/settings/api> and request an API key (choose the personal / developer option and fill in the short form).
3. Copy either the **API Key** (short) or the **API Read Access Token** (long, starts with `eyJ`). Both work.

## Enter it in Cinephile

1. Start Cinephile. The "TMDB API key" window opens on first run.
2. Paste the key and press **Save key**. Cinephile asks TMDB whether the key is valid before saving it, then restarts the view.
3. To change or remove it later, click the key button at the top right of the home screen.

If no key is set, the app does not crash: it shows a welcome message with a **Set TMDB API key** button. Your saved lists still open.

## Running from source with a file instead (developers only)

You may set `window.TMDB_KEY` in `config.js` on your own machine. The in-app key takes priority over it. Do not commit it. `npm run dist:win` refuses to build while `config.js` contains a key, so a personal key cannot end up inside an installer.

## Security notes

- A key stored in the app (or in any Electron app's files) can be read by anyone with access to that computer or to the installer. It is **not** a secure secret vault. Obfuscation, `.env` files and packaging do not change this.
- Use your own key, and revoke or regenerate it from the TMDB settings page if you think it leaked.
- If you want every user to share one private key without entering it, you need a small server that holds the key and forwards requests to TMDB. Cinephile does not include one.
- If a real key was ever committed to a public repository, **revoke it on TMDB now**: deleting it from the latest files does not remove it from Git history.
