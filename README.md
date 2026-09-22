# Happy Birthday Mi Bebecita ✿

A single-page romantic Spanglish birthday card for Mayté: sunset sky, hand-drawn CSS sunflowers, a tappable envelope with 14 love notes, petal confetti, and a music-box "Happy Birthday" melody (synthesized in the browser — no audio files needed).

## What's in this folder

- `index.html` + `static/` — the finished website. This is all you need to publish.
- `src/` — the original React source code (`App.js`, `App.css`, `index.js`), in case you ever want to change the messages or design and rebuild.

## Publish on GitHub Pages (your own link)

1. Go to https://github.com/new and create a repository named **happy-birthday-mi-bebecita** (this name becomes part of your link).
2. Upload `index.html` and the `static/` folder to the root of the repository (Add file → Upload files → drag them in → Commit).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment": Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**. Click Save.
5. Wait about a minute, then visit:
   **https://YOUR-USERNAME.github.io/happy-birthday-mi-bebecita/**

That's it — share that link with Mayté. The tab title and chat link preview will read "Happy Birthday Mi Bebecita ✿".

## Optional: use a custom domain

In **Settings → Pages → Custom domain**, enter a domain you own (e.g. `mayte.yourdomain.com`) and follow GitHub's DNS instructions.

## Rebuilding after edits (optional)

Only needed if you change the source in `src/`:

```
yarn install
PUBLIC_URL=. yarn build
```

Then publish the contents of the new `build/` folder the same way as above.
