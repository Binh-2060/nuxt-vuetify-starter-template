# Branch rules

Never commit or push to `main` or `develop`.

Before the first edit of every task, run `git branch --show-current`. If it is `main` or `develop`, don't ask — move off it first:

- Branch for this task exists → `git switch <branch>`
- Otherwise → `git pull && git switch -c <type>/<task-name>` (lowercase-dashed, e.g. `feature/user-login`). Uncommitted edits move with it.

Pick `<type>` from the branch you're on and the kind of task:

| Current branch | Task | `<type>` |
|---|---|---|
| `main` | Urgent production fix | `hotfix` |
| `develop` | New feature or change | `feature` |
| `main` or `develop` | Maintenance: deps, config, docs, tooling, refactor with no behavior change | `chore` |

The PR goes back into the branch you started from (`hotfix/*` and `chore/*` from `main` → `main`; `feature/*` and `chore/*` from `develop` → `develop`).

Tell the user which branch you're on. Push only that branch (`git push -u origin <branch>`); changes reach `main` / `develop` via PR only. No force-push or local merge into them.

# Naming

- Functions, variables, parameters, props, store state/actions and object keys you create: **camelCase** (`fetchUserList`, `isLoading`, `totalPage`). Not `snake_case`, `PascalCase` or `kebab-case`.
- Local constants are camelCase too (`const maxRetry = 3`, `const defaultPageSize = 20`). `UPPER_SNAKE_CASE` is only for keys in `consts/` objects (see exceptions).
- Booleans read as a yes/no: `is`/`has`/`can`/`should` prefix (`isOpen`, `hasError`).
- Functions start with a verb that says what they do:
  - `fetch` loads from the API (`fetchUserList`). `create` / `update` / `delete` change data on the API (`createUser`, `deleteUser`).
  - `get` returns a value without side effects (`getFullName`). `set` / `reset` / `toggle` change local state (`setFilter`, `resetForm`, `toggleDialog`).
  - `handle` is an event handler in a page or component (`handleSubmit`, `handlePageChange`).
  - `on` is only for names a component emits (`emit("onPageChange", page)`, as `CustomPagination` does). Don't use it for handler functions, and don't rename existing emits.
  - `build` is for `data/builders` (`buildCreateUserBody`), and `map` is for `data/mappers` (`mapUserList`).
- Feature files are named `<feature>.ts` in camelCase (`userProfile.ts`), the same in `data/builders`, `data/mappers`, `data/repositories` and every `models/` folder.

| Good | Bad |
|---|---|
| `fetchUserList` | `fetch_user_list`, `FetchUserList`, `userList()` |
| `isLoading`, `hasError` | `loading`, `error_flag`, `IsLoading` |
| `totalPage`, `const maxRetry = 3` | `total_page`, `const MAX_RETRY = 3` |
| `handleSubmit` | `submit_handler`, `onSubmitClick` |
| `data/mappers/userProfile.ts` | `data/mappers/user_profile.ts`, `UserProfile.ts` |
- Exceptions:
  - `composables/`: the camelCase rule doesn't apply here for now. Keep existing names as they are (e.g. `FormateDate` in `composables/global.ts`) and don't rename them.
  - Types, interfaces and components: `PascalCase` (`UserView`, `CustomButton.vue`).
  - Composables and stores: `use` + PascalCase (`useDialog`, `useUserStore`).
  - API fields in `models/requestbody` and `models/responsebody` must match the API exactly, even when they're `snake_case` (`per_page`, `list_data`). Convert them to camelCase in `data/builders` and `data/mappers` so views, stores and pages only see camelCase.
  - Keys in `consts/` objects stay `UPPER_SNAKE_CASE` (`rules.VALIDATE`, `rules.MAX_LENGTH`).

# Before finishing
- No tests or linter are set up. Run `yarn generate` and make sure it builds without errors.
