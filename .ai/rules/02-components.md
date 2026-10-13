# Component reuse rules

Follow these rules when you build or change UI in pages and components.

## Check before you build

- Before you write new UI, look in `components/global/` and `components/` for something that already does the job. Use it, or extend it with a prop or slot, instead of writing a near-copy.
- Read a `Global*` component's props before using it. Some names are quirky (see AGENTS.md).

## When to extract

- If similar UI appears in **2 or more places** (pages, dialogs or components), extract it into one component and use it everywhere. This includes UI you're about to add that matches something that already exists.
- "Similar" means the same structure with different data or labels, e.g. a page header with a title and action buttons, a search/filter bar, a form section, a status chip, a summary card or a table with the same columns pattern.
- When you extract, replace every existing copy with the new component in the same task. Don't leave old copies behind.
- Don't extract one-off UI only because it's long. If a page gets hard to read, ask before splitting it.

## Where it goes

- **Generic, app-wide UI** with no feature logic and no store or API calls → `components/global/`. It's auto-imported with the `Global` prefix (`components/global/PageHeader.vue` → `<GlobalPageHeader>`).
- **UI shared only within one feature** → `components/<feature>/`. Folders don't add a prefix (`pathPrefix: false`), so start the file name with the feature to keep names unique (`components/user/UserStatusChip.vue` → `<UserStatusChip>`).
- If you're not sure which one fits, ask.

## How to design it

- Pass data in through props and send actions out through emits (names start with `on`, see naming rules). Use slots for parts that differ between pages.
- Shared components don't call stores, repositories or the API. The page does that and passes the result in as props. Feature components in `components/<feature>/` may read their feature's store when that keeps the page simpler.
- Type props and emits with `defineProps<...>()` and `defineEmits<...>()`, using view types from `models/views`.
- Keep it small and focused on one job. Add a prop only when a real caller needs it, not for a possible future one.
