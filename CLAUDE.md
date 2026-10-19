# Agora Playground

A one page static site used to test Agora's coding workers (Agora Phase 6).

- Preview while you work: http://localhost:4173/site/ (the workflow serves the repo there). Look at it with the browser tools and take screenshots before you say it is done.
- The site is `site/`: `index.html`, `style.css`, `app.js` (plain HTML, CSS and JavaScript, no build, no dependencies).
- Tests: `npm test` (Node's own test runner, `test/*.test.js`). Keep them passing and add one for new logic.
- When you change the page, add a short line at the top of `changes` in `site/app.js`.
- Visible text: plain English, no hyphens, no emoji.
- Live: https://sergiobodyweb.github.io/agora-playground/ (GitHub Pages, deployed by `.github/workflows/pages.yml` when main changes).
- Do not touch `.github/`: workflows are changed by people only.
