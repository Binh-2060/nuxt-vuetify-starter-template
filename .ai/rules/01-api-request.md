# API request rules

Follow these rules whenever you call the API or backend. Read `docs/api/template.md` (the response envelope and pagination) and the feature's `docs/api/<feature>.md` spec first.

## Flow

```
page / component ──▶ store action (stores/) ──builders──▶ repository (data/repositories/) ──▶ apiRequest ──▶ backend
                          ◀──mappers── response ◀──────────────────────────────────────────────┘
```

- Pages and components call a **store action**. They never call a repository, `apiRequest` or `api` directly.
- The store action builds the request body with a **builder**, calls the **repository**, maps the response with a **mapper**, and updates state.
- Repositories only send the request through `apiRequest<T>()` and return its result. They hold no state, UI or mapping logic.
- Never call `$fetch`, `useFetch` or `api` from `utils/api.ts` directly. Always go through `apiRequest`.

## Types and files

- Each layer has its own types:
  - `models/views/<feature>.ts`: what UI and forms use (camelCase).
  - `models/requestbody/<feature>.ts`: what you send, with field names exactly as the API spec has them.
  - `models/responsebody/<feature>.ts`: what you receive, with field names exactly as the API spec has them.
- `data/builders/<feature>.ts` converts view → request body. `data/mappers/<feature>.ts` converts response body → view. Pages and stores only see view types.
- `data/` and `models/` are scaffolds: each `index.ts` only has a comment. Put feature code in `<feature>.ts` next to it, and import it with `@/data/...` or `@/models/...` (it isn't auto-imported).

## apiRequest and errors

- `utils/api.ts` is a `$fetch.create` instance with a 60s timeout. `baseURL` is set per request from `getEnvConfig()` in `configs/env.ts`, keyed by `VITE_APP_ENV` (`local` / `develop` / `production`, falls back to `develop`). Every `apiBaseUrl` there is currently `""`.
- `apiRequest<T>()` in `data/networks/apiClient.ts` unwraps `{ timestamp, status, items, error }` and returns `{ data, timestamp }`. `status !== 1` is a failure.
- Every failure is thrown as `ApiError` (`status`, `code`, `timestamp`). Its code is `API_ERROR` (status 0), the HTTP status (e.g. `"500"`), `OFFLINE` or `TIMEOUT`.
- Lists use `apiRequest<Paginated<Item>>()`. The `pagination` fields are `-1` when the endpoint doesn't paginate. If a feature spec's field names differ from `Paginated` (e.g. snake_case), follow the spec and ask.
- Store actions let `ApiError` propagate. The caller decides how to handle it:
  - **User actions** (submit a form, save, delete, or anything the user clicked and waits for): wrap the call in `catchError(fn, title?)` so the user sees the error dialog. Make `fn` return a value (e.g. `true`) so you can tell success from `null` (failure).
  - **Background queries** (e.g. loading dropdown options or lookup data): you don't have to use `catchError`. Pick what fits the UI, such as an empty list or an inline message. If it's unclear, ask.
