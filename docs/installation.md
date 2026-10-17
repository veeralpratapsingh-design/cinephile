# Installing Cinephile on Windows

## Requirements

- Windows 10 or newer, 64-bit.
- An internet connection for browsing, search and posters.
- A free TMDB API key (see [api-configuration.md](api-configuration.md)).

## Steps

1. Download `Cinephile-Setup-<version>.exe` from the repository's **Releases** page.
2. Double-click it. Choose the install folder if you want a different one.
3. Finish the wizard and start Cinephile from the Start Menu or desktop shortcut.
4. On first launch, paste your TMDB key when asked.

## Windows SmartScreen

The installer is **not code-signed** (signing needs a paid certificate), so Windows may show "Windows protected your PC". If you downloaded the file from the project's own Releases page, choose **More info > Run anyway**. You can also build the installer yourself from source ([building.md](building.md)).

## Where your data lives

Cinephile keeps your data in its Chromium local storage under `%APPDATA%\cinephile` (paste that into the Explorer address bar). It holds your Backlog, Vault, Hall of Fame, albums, profile photo, view settings and TMDB key.

| Situation | What to expect |
| --- | --- |
| Closing and reopening the app | Data is kept. |
| Installing a newer version over the old one | The installer does not touch `%APPDATA%\cinephile`, so data is expected to be kept. |
| Uninstalling | The installer is configured **not** to delete that folder (`deleteAppDataOnUninstall: false`), so data is expected to remain, and to be found again after a reinstall. |
| Deleting the folder, or a new Windows account / PC | Data is gone. Copy the folder to back it up. |

These behaviours follow from the installer configuration; they have not been verified on a Windows machine yet, so back up the folder before an important upgrade.

## Uninstall

Windows **Settings > Apps > Cinephile > Uninstall**.
