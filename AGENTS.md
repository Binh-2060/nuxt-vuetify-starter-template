## Rules

Follow these on every task:

@.ai/rules/00-code-begin.md
@.ai/rules/03-scope.md
@.ai/rules/04-workflow.md

If your tool doesn't load the `@` lines above, read those three files before you start.

Topic rules aren't loaded automatically. Before you plan or edit code in an area, read its file:

| When the task touches | Read |
|---|---|
| API calls, `data/`, `models/`, `docs/api/` | `.ai/rules/01-api-request.md` |
| `stores/` | `.ai/rules/01-api-request.md`, `.ai/rules/05-stores.md` |
| `pages/`, `components/`, forms or any `.vue` UI | `.ai/rules/02-components.md`, `.ai/rules/06-pages-forms.md`, `.ai/rules/07-styling.md` |

**Ask, don't guess.** Before you start work, ask about anything that's unclear: requirements, naming, API fields, UI behavior, where code should go, or a spec that conflicts with the code. Ask all your questions together, up front, and wait for the answers before you edit. If something new comes up mid-task, stop and ask again.

## Commands

Package manager is **yarn** (v1, pinned via `packageManager`).

- `yarn install`: installs deps. `postinstall` runs `nuxt prepare` (regenerates `.nuxt/` types, which `tsconfig.json` extends).
- `yarn dev`: dev server on http://localhost:3000 with `VITE_APP_ENV=local`.
- `yarn generate`: static build (the production path) → `.output/public`. Stamps `BUILD_DATE`. Does **not** type-check.
- Type-check: `npx -y -p typescript@5 -p vue-tsc@2 vue-tsc --noEmit -p .nuxt/tsconfig.app.json`. `vue-tsc` isn't a dependency, so `nuxi typecheck` fails.
- `yarn build` / `yarn preview`: standard Nuxt build and preview.

No test runner, linter or formatter is configured.

## Architecture

Nuxt 4 + Vuetify 4 + Pinia. Source lives in `app/`. `@/` and `~/` point to it. It's a client-only static SPA (`ssr: false`, `nitro.preset: "static"`) served by nginx, so browser APIs (`window`, `navigator`) are safe anywhere and `server/` is unused.

| Auto-imported | Needs `import ... from "@/..."` |
|---|---|
| `components/*` (no prefix), `components/global/*` (**`Global` prefix**: `CustomButton.vue` → `<GlobalCustomButton>`), top-level `composables/*` and `utils/*`, `stores/*`, Vuetify components, VueUse | `data/`, `models/`, `consts/`, `configs/` |

- `composables/global.ts`: `goPath`, `reloadPath`, `delayGoPath`, `goBack`, `FormateDate`, `formatNumber`.
- `dayjs-nuxt` uses timezone `Asia/Bangkok`. Access it with `useDayjs()`.
- `plugins/vuetify.ts` holds the Vuetify setup (mdi icons, custom light theme). `runtimeConfig.public` exposes `BUILD_DATE` and `APP_ENV`. `app.config.ts` holds the app name and version.
