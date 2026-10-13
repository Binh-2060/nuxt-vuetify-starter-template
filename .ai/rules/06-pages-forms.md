# Page and form rules

## Pages

- Pages in `pages/` stay thin: they call store actions, bind store state, and put the screen together from components. Logic that isn't about this one screen belongs in a store, builder, mapper or component.
- Use `<script setup lang="ts">`. Inside it, keep this order: imports, stores, props / emits, refs, computed, functions, lifecycle hooks.
- The app is a client-only SPA, so load the page's data in `onMounted`. Don't use `useFetch` or `useAsyncData`.
- Read stores with `storeToRefs` for state, and call actions on the store directly:
  ```ts
  const userStore = useUserStore();
  const { userList, isLoading } = storeToRefs(userStore);
  onMounted(() => userStore.fetchUserList(1));
  ```

## Loading, empty and error states

- Bind the store's flags to the UI: `:loading="isLoading"` on tables, lists and cards, and `:loading="isSubmitting"` plus `:disabled="isSubmitting"` on submit buttons so a form can't be sent twice.
- Show an empty state when a list is empty after loading. Ask for its text if the task doesn't give it.
- Errors: wrap user actions in `catchError`. For background loads you can skip it (see `01-api-request.md`).

## Forms

- Build fields from the `Global*` components (`GlobalCustomTextField`, `GlobalCustomSelection`, `GlobalCustomAutoComplete`, `GlobalCustomDatePicker`, `GlobalCustomButton`). Read their props first; some names are quirky.
- Use the shared rules from `consts/rules.ts` (`rules.VALIDATE`, `rules.MAX_LENGTH(n)`). If you need a new shared rule, ask before adding it to `consts/rules.ts` (see `03-scope.md`). A rule only one form uses can stay in that form.
- Hold form values in one `ref` typed with a view form type from `models/views` (`ref<UserForm>({ ... })`).
- Wrap fields in `<v-form ref="formRef">` and run `await formRef.value?.validate()` before you call the store. Stop if it isn't valid.
- On submit: validate, call the store action inside `catchError`, and only on success (a non-`null` result) show the success message, reset the form or navigate. Ask what should happen after success if the task doesn't say.

## UI text

- Write all user-facing text in **English**: labels, buttons, placeholders, messages, empty states and validation text.
- Don't invent wording for important messages (confirmations, success and error texts). Use the task's text, or ask.
- Existing text in another language (e.g. the Lao `catchError` title `ຜິດພາດ`) stays as it is unless the task is to change it.
