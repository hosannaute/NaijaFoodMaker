# Naija Food Maker

A warm, interactive home for Nigerian food discovery. Choose what is in your kitchen and explore 16 familiar dishes, from Jollof Rice to Egusi Soup.

## Run the web app

Requires **Node.js 20 or newer**. There are no third-party runtime packages to install.

```sh
cd /workspace/NaijaFoodMaker
npm start
```

Open `http://localhost:3000` in your browser. `npm run dev` starts the same development server. Stop it with Ctrl+C. Set `PORT` or `HOST` to change the listening address (defaults: port 3000, all interfaces).

## Your interactive kitchen

- Browse 50 ingredients across five categories, or search across the entire pantry.
- Select individual ingredients or a whole category; try the jollof pantry shortcut.
- Watch recipe matches update instantly, ranked by required ingredient coverage and then available bonus ingredients.
- Filter for ready dishes, dishes missing exactly one essential, or saved favourites. Search dishes by name.
- Open a dish for its ingredient checklist, optional extras, cooking overview, and serving suggestions.
- Add or remove essentials directly in dish details. Copy a missing-ingredient shopping list; browsers without clipboard access show selectable text instead.
- Pantry selections and favourites stay in this browser’s local storage. If storage is unavailable, the app still works for the current visit.

The interface is responsive, keyboard accessible, supports reduced motion, and uses original local SVG serving illustrations. No account, external API, image service, or network request is needed after loading the app.

**Recipe scope:** readiness follows the original engine’s simplified essential-ingredient rules. Cooking overviews are flexible inspiration, not measured recipes. Water, seasoning, cooking oil, or traditional ingredients mentioned in the method may be needed beyond the matching essentials. Check the full overview before cooking. Food illustrations are serving inspiration.

## Validate

```sh
npm test
```

Eight standard-library tests cover catalogue consistency, matching, ranking, storage recovery, and the garri/Eba regression. During development, desktop and mobile browser checks also exercised pantry changes, search, favourites, persistence, dialogs, category keyboard controls, empty states, and all-ingredient matching.

## Project structure

```text
web/index.html       Accessible page structure
web/styles.css       Responsive visual design
web/app.js           Browser interactions and persistence
web/data.js          Ingredient and recipe catalogue
web/matching.js      Pure recipe ranking and safe storage loading
web/assets/          Original SVG food illustrations and favicon
server.js            Dependency-free static development server
tests/               Matching and storage regression tests
naijafoodmaker.py     Original Python CLI
```

`web/data.js` is the web catalogue, initially adapted from the Python catalogue. Keep both catalogues aligned when adding or changing recipes. Cooking overviews and display metadata live in `web/app.js`. The static `web/` directory can also be hosted on a standard static web host; the app has no backend. The bundled Node server is intended for local development.

## Original Python CLI

Python 3 is sufficient; there are no pip dependencies.

```sh
python3 naijafoodmaker.py
```

The original letter-based CLI remains available. Its Eba bonus-ingredient data now uses an empty set, fixing the crash when garri is selected, including through `ALL`.

## GitHub Pages deployment

The `.github/workflows/pages.yml` workflow validates the app and publishes **only `web/`** on every push to `main`. It can also be run manually from GitHub Actions.

For first-time setup, open the repository's **Settings → Pages** and choose **GitHub Actions** as the source. Then run **Deploy web app to GitHub Pages** from the Actions tab if the initial run occurred before Pages was enabled.

The project URL after a successful deployment is `https://hosannaute.github.io/NaijaFoodMaker/`. Relative asset URLs support this repository subdirectory as well as ordinary static hosting. No API keys or custom secrets are required by the deployment workflow.
