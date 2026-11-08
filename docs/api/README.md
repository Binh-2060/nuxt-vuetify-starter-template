# API specs

One file per feature: `docs/api/<feature>.md` (camelCase, e.g. `docs/api/user.md`).
Agents read the feature's spec before writing `models/`, `data/` or `stores/` code, and use only what it describes.

## Response envelope

Every response is wrapped in the envelope defined by `ApiResponse` in `app/data/networks/apiClient.ts`:

```json
{ "timestamp": "2006-01-02-15-04-05", "status": 1, "items": {}, "error": null }
```

- `status`: `1` = success, `0` = error.
- `items`: the payload, `null` on error.
- `error`: the message on error, `null` on success.

If you fork this template and your backend uses a different envelope, update `ApiResponse` and `apiRequest` in `apiClient.ts`, and this section.

## Feature spec template

Copy [`template.md`](template.md) to `docs/api/<feature>.md` and fill in every endpoint.
