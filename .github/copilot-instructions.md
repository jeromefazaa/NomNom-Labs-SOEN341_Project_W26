<!-- .github/copilot-instructions.md - Guidance for AI coding agents -->

# Copilot / AI agent instructions for this repository

This file captures the essential, discoverable details to make an AI coding agent productive in this repo.

1. Project overview

- Frontend-only workspace: the main app lives in `FrontEnd/my-react-app` (Vite + React).
- App entry: `src/main.jsx`, primary UI in `src/App.jsx` and assets in `src/assets`.

2. Dev / build / lint commands (run from `FrontEnd/my-react-app`)

- Start dev server (HMR): `npm run dev` (runs `vite`).
- Build production bundle: `npm run build` (runs `vite build`).
- Preview production build: `npm run preview` (runs `vite preview`).
- Lint the codebase: `npm run lint` (uses `eslint` with `eslint.config.js`).

3. Key files to inspect before editing

- `vite.config.js` — Vite config; plugin `@vitejs/plugin-react` is enabled.
- `eslint.config.js` — project ESLint setup (uses flat config, react-hooks, react-refresh).
- `package.json` (in `my-react-app`) — exact script names and deps.
- `src/main.jsx` — application bootstrap; contains an attempted React Router setup (note: router code appears incomplete).

4. Patterns & conventions discovered

- ESM for `my-react-app` (`type: "module"` in `package.json`) and standard Vite React setup.
- Functional React components with default exports (see `src/App.jsx`).
- Assets: use import of local files (e.g., `import reactLogo from './assets/react.svg'`) and absolute `/vite.svg` for the Vite logo.
- Lint rule: unused vars that start with capital letters or underscores are ignored (`varsIgnorePattern: '^[A-Z_]'`).

5. Known issues / things an agent should watch for

- `src/main.jsx` contains duplicated imports and an incomplete router declaration (e.g., `element <About />` missing `=`). Make small, minimal fixes and run `npm run dev` to verify.
- There are no test scripts configured in package.json — do not assume test runners exist.

6. Typical small-change workflow (recommended)

- Run locally: `cd FrontEnd/my-react-app && npm install && npm run dev`.
- For lint fixes: run `npm run lint` and apply minimal changes to satisfy existing ESLint rules.
- For builds: `npm run build` then `npm run.preview` to smoke-test the production bundle.

7. Where to add code

- Add new pages/components under `src/` and reference them from `src/main.jsx` (the project appears to intend React Router; keep router changes small and consistent).

8. Integration points / external deps

- Uses `react`, `react-dom`, `vite`, and `@vitejs/plugin-react`. No backend code found in this repo root—assume frontend-only unless the user points to other folders.

9. PR / commit style hints

- Keep changes scoped to `FrontEnd/my-react-app` for UI work.
- Preserve the existing import and component style (functional components, default exports).

If any section is unclear or you'd like the agent to cover additional files (e.g., backend services, CI workflows), tell me which paths to inspect and I'll iterate.
