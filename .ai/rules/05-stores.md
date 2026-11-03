# Store rules

Pinia stores live in `app/stores/` and are auto-imported.

## Structure

- One store per feature: `stores/<feature>.ts` exporting `use<Feature>Store` (`stores/user.ts` → `useUserStore`). The store id is the feature name in camelCase (`defineStore("user", ...)`).
- Use the **options syntax** only, like `app/stores/example.ts`: `defineStore("user", { state() { ... }, actions: { ... } })`. Not setup stores (`defineStore("user", () => { ... })`).
- Inside the store:
  - `state()` is a method that returns every state field with its initial value.
  - Derived values go in `getters`, written as `(state) => ...` (`hasUserList: (state) => state.userList.length > 0`). Leave `getters` out when there are none.
  - Actions go in `actions`, written as methods (`async fetchUserList(page: number) { ... }`), not arrow functions, so `this` is the store. Read and change state through `this` (`this.isLoading = true`).
- Type state with view types from `models/views` (`userList: [] as UserView[]`). Stores never hold request or response body types.

## Actions

- An action follows the API request rules: build the request body with a builder, call the repository, map the response with a mapper, update state, and return the result.
- Import repositories as a namespace so their names don't clash with the action names: `import * as userRepository from "@/data/repositories/user"`.
- Let `ApiError` propagate. The page decides whether to show it (see `01-api-request.md`).

## Loading flags

- Loading flags are state fields. Every action that calls the API sets one in `try` / `finally`, so the flag resets even when the call fails:
  - `isLoading` for loading data (`fetch...` actions).
  - `isSubmitting` for changing data (`create...`, `update...`, `delete...` actions).
- If two loads of the same store can run at once and the page needs to tell them apart, use a specific flag (`isLoadingDetail`). Otherwise keep one flag.
- Pages read these flags. They don't keep their own loading refs for store actions.

## Persist

- Don't add `persist` unless the task needs the data to survive a page reload (e.g. a session or user settings). Ask first.
- When it's needed, add the `persist` option next to `state` (the plugin is registered in `plugins/pinia.ts`).
- Never persist API lists, detail data or loading flags.

## Example

```ts
// stores/user.ts
import * as userRepository from "@/data/repositories/user";
import { buildCreateUserBody } from "@/data/builders/user";
import { mapUserList } from "@/data/mappers/user";
import type { UserForm, UserView } from "@/models/views/user";

export const useUserStore = defineStore("user", {
  state() {
    return {
      userList: [] as UserView[],
      totalPage: 0,
      isLoading: false,
      isSubmitting: false,
    };
  },

  actions: {
    async fetchUserList(page: number) {
      this.isLoading = true;
      try {
        const { data } = await userRepository.fetchUserList(page);
        this.userList = mapUserList(data.listData);
        this.totalPage = data.pagination.totalPage;
        return this.userList;
      } finally {
        this.isLoading = false;
      }
    },

    async createUser(form: UserForm) {
      this.isSubmitting = true;
      try {
        await userRepository.createUser(buildCreateUserBody(form));
        return true;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
```
