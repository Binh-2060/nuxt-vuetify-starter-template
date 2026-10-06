## Rules

Follow these rules on every task:

@.ai/rules/00-code-begin.md

**Ask, don't guess.** Before you start work, ask about anything that's unclear: requirements, naming, API fields, UI behavior, where code should go, or a spec that conflicts with the code. Ask all your questions together, up front, and wait for the answers before you edit. Don't fill gaps with assumptions. If something new comes up mid-task, stop and ask again.

API contract (response envelope, pagination): `docs/api/template.md`. Per-feature specs go in `docs/api/<feature>.md`; read the feature's spec before implementing it.

## Commands

Package manager is **yarn** (v1, pinned via `packageManager`).

- `yarn install` — installs deps; `postinstall` runs `nuxt prepare` (regenerates `.nuxt/` types, which `tsconfig.json` extends)
- `yarn dev` — dev server on http://localhost:3000 with `VITE_APP_ENV=local`
- `yarn generate` — static build (the production path) → `.output/public`; stamps `BUILD_DATE`. Does **not** type-check.
- `npx -y -p typescript@5 -p vue-tsc@2 vue-tsc --noEmit -p .nuxt/tsconfig.app.json` — type-check. `vue-tsc` isn't a dependency, so `nuxi typecheck` fails.
- `yarn build` / `yarn preview` — standard Nuxt build and preview

No test runner, linter or formatter is configured.

## Architecture

Nuxt 4 + Vuetify 4 + Pinia. Source lives in `app/`; `@/` and `~/` point to it. It's a client-only static SPA (`ssr: false`, `nitro.preset: "static"`) served by nginx, so browser APIs (`window`, `navigator`) are safe anywhere and `server/` is unused.

### Request flow

```
page / component ──▶ store action (stores/) ──builders──▶ repository (data/repositories/) ──▶ apiRequest ──▶ backend
                          ◀──mappers── response ◀──────────────────────────────────────────────┘
```

- Types per layer: `models/views` (UI and forms), `models/requestbody` (sent), `models/responsebody` (received). `data/builders` converts view → request, and `data/mappers` converts response → view.
- `data/` and `models/` are scaffolds: each `index.ts` only has a comment. Feature code goes in `<feature>.ts` files next to it.
- `utils/api.ts` is a `$fetch.create` instance (60s timeout). `baseURL` is set per request from `getEnvConfig()` in `configs/env.ts`, keyed by `VITE_APP_ENV` (`local` / `develop` / `production`, falls back to `develop`). Every `apiBaseUrl` there is currently `""`.
- `data/networks/apiClient.ts`: `apiRequest<T>()` unwraps `{ timestamp, status, items, error }` and returns `{ data, timestamp }`. `status !== 1` is a failure. Every failure is thrown as `ApiError` (`status`, `code`, `timestamp`) with code `API_ERROR` (status 0), the HTTP status (e.g. `"500"`), `OFFLINE` or `TIMEOUT`. Lists use `apiRequest<Paginated<Item>>()`; `pagination` fields are `-1` when the endpoint doesn't paginate. If a feature spec's field names differ from `Paginated` (e.g. snake_case), follow the spec and ask.

### Dialog and errors

`composables/useDialog.ts` holds **module-level singleton** state, rendered once by `<GlobalAppDialog />` in `app.vue`. Its API is SweetAlert2-style (`fire`, `confirm`, `success`, `error`, `warning`, `info`, `prompt`), and every call resolves to `{ isConfirmed, value? }`.

`catchError(fn, title?)` shows an error dialog (`[code] message` for `ApiError`, default title in Lao: `ຜິດພາດ`) and returns `null`. It also returns `null` when `fn` resolves to nothing, so make `fn` return a value (e.g. `true`) when you need to tell success from failure.

### Auto-imports

| Auto-imported | Needs `import ... from "@/..."` |
|---|---|
| `components/*` (no prefix), `components/global/*` (**`Global` prefix**: `CustomButton.vue` → `<GlobalCustomButton>`), top-level `composables/*` and `utils/*`, `stores/*` (via `imports.dirs`), Vuetify components (`vite-plugin-vuetify`), VueUse | `data/`, `models/`, `consts/`, `configs/` |

The `Global*` wrappers have quirky prop names. Check them before use: `CustomTextField` has `hideDeatails`, plus `optional` to hide the required `*` that any `rules` would show. `CustomPagination` takes `totalpage` and emits `onPageChange`.

### Other modules

- Pinia stores go in `app/stores/` (none exist yet). `pinia-plugin-persistedstate` is registered in `plugins/pinia.ts`, so a store opts in with `persist`.
- `consts/rules.ts`: shared form rules as a default export (`rules.VALIDATE`, `rules.MAX_LENGTH(n)`).
- `composables/global.ts`: `goPath`, `reloadPath`, `delayGoPath`, `goBack`, `FormateDate`, `formatNumber`.
- `dayjs-nuxt` uses timezone `Asia/Bangkok`; access it via `useDayjs()`.
- Vuetify is set up in `plugins/vuetify.ts` (mdi icons, custom light theme). `runtimeConfig.public` exposes `BUILD_DATE` and `APP_ENV`. `app.config.ts` holds the app name and version.
