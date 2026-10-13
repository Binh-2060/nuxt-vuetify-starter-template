# Branch rules

Never commit or push to `main` or `develop`. Changes reach them only through a PR. No force-push or local merge into them.

Before the first edit of every task, run `git branch --show-current`. If it's `main` or `develop`, move off it without asking:

- The task's branch exists → `git switch <branch>`
- Otherwise → `git pull && git switch -c <type>/<task-name>` (lowercase-dashed, e.g. `feature/user-login`). Uncommitted edits move with it.

`<type>`: `hotfix` for an urgent production fix (from `main`), `feature` for a new feature or change (from `develop`), `chore` for deps, config, docs, tooling or a refactor with no behavior change (from either). The PR targets the branch you started from.

Tell the user which branch you're on. Push only that branch (`git push -u origin <branch>`).

# Naming

- camelCase for the functions, variables, constants, parameters, props, store state/actions, object keys and feature files you create (`fetchUserList`, `const maxRetry = 3`, `data/mappers/userProfile.ts`). Not `fetch_user_list`, `FetchUserList`, `MAX_RETRY` or `user_profile.ts`.
- Booleans take an `is` / `has` / `can` / `should` prefix (`isLoading`, `hasError`, not `loading` or `error_flag`).
- Functions start with a verb:
  - `fetch` loads from the API. `create` / `update` / `delete` change API data.
  - `get` returns a value with no side effects. `set` / `reset` / `toggle` change local state.
  - `handle` for event handlers (`handleSubmit`, not `onSubmitClick` or `submit_handler`).
  - `on` only for event names a component emits (`emit("onPageChange", page)`). Don't rename existing emits.
  - `build` in `data/builders` (`buildCreateUserBody`), `map` in `data/mappers` (`mapUserList`).
- Exceptions:
  - PascalCase for types, interfaces and components (`UserView`, `CustomButton.vue`).
  - `use` + PascalCase for composables and stores (`useDialog`, `useUserStore`).
  - `composables/`: keep existing names (e.g. `FormateDate`). Don't rename them.
  - Fields in `models/requestbody` and `models/responsebody` match the API exactly, even when `snake_case` (`per_page`). Builders and mappers convert them, so views, stores and pages only see camelCase.
  - Keys in `consts/` objects: `UPPER_SNAKE_CASE` (`rules.VALIDATE`).
