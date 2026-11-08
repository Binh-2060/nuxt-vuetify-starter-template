# <Feature> API

> Copy this file to `docs/api/<feature>.md` (camelCase, e.g. `user.md`).
> Write field names exactly as the API sends them. Delete any part that doesn't apply.
> Every response is wrapped in the envelope described in `README.md`; below, describe only `items`.

## Get <feature> list

`GET /<features>`

**Query params**

| Name | Type | Required | Notes |
|---|---|---|---|
| `page` | number | yes | starts at 1 |
| `keyword` | string | no | search text |

**Response `items`**

```json
{
  "data": [{ "id": 1, "name": "..." }],
  "total_page": 3
}
```

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `data` | array | no | the rows |
| `data[].id` | number | no | |
| `data[].name` | string | no | |
| `total_page` | number | no | for pagination |

## Get <feature> detail

`GET /<features>/:id`

**Path params**

| Name | Type | Notes |
|---|---|---|
| `id` | number | |

**Response `items`**

```json
{ "id": 1, "name": "..." }
```

## Create <feature>

`POST /<features>`

**Request body**

```json
{ "name": "..." }
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | max 100 characters |

**Response `items`:** `null`

## Update <feature>

`PUT /<features>/:id`

**Request body:** same as create.

**Response `items`:** `null`

## Delete <feature>

`DELETE /<features>/:id`

**Response `items`:** `null`

## Errors

| When | `error` message / HTTP status | What the UI does |
|---|---|---|
| name already exists | `"name is duplicated"` | show the error dialog |
| not found | `404` | show the error dialog, go back to the list |
