# Security Policy

## Supported versions

Only the latest release receives fixes.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem. Use GitHub's private reporting: on the repository open **Security > Report a vulnerability**. Include the app version, steps to reproduce and the impact. If that option is not enabled, contact the maintainer through the contact details on their GitHub profile.

## Things to know

- Cinephile has no server. It talks only to TMDB.
- The TMDB key a user enters is stored in the app's local storage, which is not a secure vault. Anyone with access to the user's Windows account can read it.
- The public source never contains a real API key. If you find one in the repository or its history, report it so it can be revoked.
- Installers are not code-signed unless a release says so.
