# API request rules

Follow these rules whenever you call the API or backend. Read `ApiResponse` in `data/networks/apiClient.ts` (the response envelope) and the feature's `docs/api/<feature>.md` spec first (new specs start from `docs/api/template.md`).

## Flow

Every request goes through these steps in order:

1. A page or component calls a **store action** in `stores/`.
2. The store action converts its form data into a request body with a **builder** (`data/builders`).
3. The store action calls a **repository** (`data/repositories`), which sends the request through `apiRequest<T>()`.
4. The store action converts the response into entity data with a **mapper** (`data/mappers`), updates state, and returns the result.

Rules for each step:

- Pages and components only talk to stores, never to repositories.
- Only repositories send requests, and only through `apiRequest<T>()`. Nothing else calls `apiRequest`, `api` from `core/api.ts`, `$fetch` or `useFetch`.
- Repositories only call `apiRequest<T>()` and return its result. They hold no state, UI or mapping logic.

## Types and files

- Each layer has its own types:
  - `models/entities/<feature>.ts`: display only, what the UI shows in lists, details and tables (camelCase, `User`).
  - `models/forms/<feature>.ts`: what the user types into a form (camelCase, `UserForm`).
  - `models/requestbody/<feature>.ts`: what you send, with field names exactly as the API spec has them.
  - `models/responsebody/<feature>.ts`: what you receive, with field names exactly as the API spec has them.
- Don't reuse one type for both display and form input. Their shapes differ (an entity has `id` and display fields, a form may have `password` or date strings), so each gets its own type.
- Conversions:
  - `data/builders/<feature>.ts` converts form → request body.
  - `data/mappers/<feature>.ts` converts response body → entity, and entity → form when an edit form starts filled in (`mapUserToForm`).
- Pages and stores only see entity and form types.
- `data/` and `models/` are scaffolds: each `index.ts` only has a comment. Put feature code in `<feature>.ts` next to it, and import it with `@/data/...` or `@/models/...` (it isn't auto-imported).

## apiRequest and errors

- `core/api.ts` is a `$fetch.create` instance with a 60s timeout. `baseURL` is set per request from `getEnvConfig()` in `configs/env.ts`, keyed by `VITE_APP_ENV` (`local` / `develop` / `production`, falls back to `develop`). Every `apiBaseUrl` there is currently `""`.
- `apiRequest<T>()` in `data/networks/apiClient.ts` unwraps `{ timestamp, status, items, error }` and returns `{ data, timestamp }`. `status !== 1` is a failure.
- Every failure is thrown as `ApiError` from `core/apiError.ts` (`status`, `code`, `timestamp`). Its code is `API_ERROR` (status 0), the HTTP status (e.g. `"500"`), `OFFLINE` or `TIMEOUT`.
- There's no shared list or pagination type, because every backend shapes them differently. Define the list response in `models/responsebody/<feature>.ts` exactly as the feature spec has it, and map it to an entity type in `data/mappers/<feature>.ts`. If the spec doesn't describe the list or pagination fields, ask.
- Store actions let `ApiError` propagate. The caller decides how to handle it:
  - **User actions** (submit a form, save, delete, or anything the user clicked and waits for): wrap the call in `catchError(fn, title?)` so the user sees the error dialog. Make `fn` return a value (e.g. `true`) so you can tell success from `null` (failure).
  - **Background queries** (e.g. loading dropdown options or lookup data): you don't have to use `catchError`. Pick what fits the UI, such as an empty list or an inline message. If it's unclear, ask.
