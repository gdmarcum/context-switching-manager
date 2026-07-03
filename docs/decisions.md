# Architecture & Technical Decisions

## Layered architecture: types / repositories / services / UI
Split the codebase so that data shapes, storage access, business logic, and UI each live in their own layer, with each layer only depending on the one below it. This keeps changes localized. Swapping the storage backend or reworking the UI shouldn't require touching business logic.

## Chrome API access wrapped in Promises
All `chrome.*` extension APIs (storage, tabs) are wrapped in Promises within the repository/service layer, rather than exposing their native callback style to the rest of the app. This lets the rest of the codebase use standard `async`/`await`.

## Migrated UI from vanilla TypeScript to React
The original hand-written DOM manipulation didn't scale as the UI grew beyond a single button and list. React's component and state model makes multi-view UIs (list, detail, modal) easier to reason about and extend.

## Vite chosen as the build tool, via @crxjs/vite-plugin
Vite was selected for bundling because of its mature Chrome extension support, which handles the extension-specific quirks (manifest-aware builds, service worker bundling) that a plain `tsc` compile step can't. Tooling versions are pinned deliberately since the extension plugin ecosystem moves faster than Vite's major releases; version pins should be revisited periodically.

## manifest.json declares source paths, not build output
The manifest's `default_popup` and `service_worker` fields point at files in `src/`. The build tooling resolves and rewrites these to compiled output automatically — the manifest describes intent, not build artifacts.