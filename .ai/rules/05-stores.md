# Store rules

Pinia stores live in `app/stores/` and are auto-imported.

## Structure

- One store per feature: `stores/<feature>.ts` exporting `use<Feature>Store` (`stores/user.ts` → `useUserStore`). The store id is the feature name in camelCase (`defineStore("user", ...)`).
- Use **setup stores** only: `defineStore("user", () => { ... })`. Not the options syntax (`state` / `getters` / `actions`).
- Inside the store: state is `ref`, derived values are `computed`, and actions are plain functions. Return everything the pages need.
- Type state with view types from `models/views` (`ref<UserView[]>([])`). Stores never hold request or response body types.

## Actions

- An action follows the API request rules: build the request body with a builder, call the repository, map the response with a mapper, update state, and return the result.
- Import repositories as a namespace so their names don't clash with the action names: `import * as userRepository from "@/data/repositories/user"`.
- Let `ApiError` propagate. The page decides whether to show it (see `01-api-request.md`).

## Loading flags

- Every action that calls the API sets a loading flag in `try` / `finally`, so the flag resets even when the call fails:
  - `isLoading` for loading data (`fetch...` actions).
  - `isSubmitting` for changing data (`create...`, `update...`, `delete...` actions).
- If two loads of the same store can run at once and the page needs to tell them apart, use a specific flag (`isLoadingDetail`). Otherwise keep one flag.
- Pages read these flags. They don't keep their own loading refs for store actions.

## Persist

- Don't add `persist` unless the task needs the data to survive a page reload (e.g. a session or user settings). Ask first.
- Never persist API lists, detail data or loading flags.

## Example

```ts
// stores/user.ts
import * as userRepository from "@/data/repositories/user";
import { buildCreateUserBody } from "@/data/builders/user";
import { mapUserList } from "@/data/mappers/user";
import type { UserForm, UserView } from "@/models/views/user";

export const useUserStore = defineStore("user", () => {
  const userList = ref<UserView[]>([]);
  const totalPage = ref(0);
  const isLoading = ref(false);
  const isSubmitting = ref(false);

  async function fetchUserList(page: number) {
    isLoading.value = true;
    try {
      const { data } = await userRepository.fetchUserList(page);
      userList.value = mapUserList(data.listData);
      totalPage.value = data.pagination.totalPage;
      return userList.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function createUser(form: UserForm) {
    isSubmitting.value = true;
    try {
      await userRepository.createUser(buildCreateUserBody(form));
      return true;
    } finally {
      isSubmitting.value = false;
    }
  }

  return { userList, totalPage, isLoading, isSubmitting, fetchUserList, createUser };
});
```
