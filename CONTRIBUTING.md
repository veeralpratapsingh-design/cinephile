# Contributing to Cinephile

Thanks for helping. Bug reports, ideas and pull requests are welcome.

## Before you start

- Search existing issues first. For bugs, use the bug report template; for ideas, the feature request template.
- For anything large, open an issue to discuss it before writing code.

## Set up

```
npm ci
npm start
```

You need Node.js 22.12 or newer and your own free TMDB key (see [docs/api-configuration.md](docs/api-configuration.md)). Never commit a key.

## Guidelines

- The app is plain HTML, CSS and JavaScript loaded by `index.html`; keep it dependency-light and keep the existing look.
- Do not rename the `serivia_*` local-storage keys. They are kept so that data saved by earlier versions (when the app was called Serivia) still loads.
- Do not add analytics or any network request other than TMDB.
- Run `npm run check` before opening a pull request.
- Keep pull requests focused, and describe how you tested them.

By contributing you agree your work is released under the project's [MIT License](LICENSE).
