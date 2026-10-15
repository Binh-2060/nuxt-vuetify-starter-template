# Styling rules

Use Vuetify first. Write custom CSS only when Vuetify can't do it.

## Vuetify first

- Use Vuetify components and their props (`variant`, `density`, `color`, `elevation`, `rounded`) before adding any class or CSS.
- For layout and spacing, use Vuetify utility classes: `d-flex`, `align-center`, `justify-space-between`, `ga-2`, `pa-4`, `mb-2`, `text-h6`, `font-weight-bold` and so on.
- For layouts that change with screen size, use the grid (`v-container`, `v-row`, `v-col` with `cols` / `md` / `lg`) and display classes (`d-none d-md-flex`).
- Icons come from Material Design Icons: `mdi-*` (`<v-icon icon="mdi-pencil" />`).

## Colors

- Use theme colors only: `color="primary"`, `text-error`, `bg-secondary` and so on. The theme lives in `plugins/vuetify.ts`.
- No hard-coded colors (hex, `rgb`, color names) in templates or styles. If a color you need isn't in the theme, ask before you add it.

## Custom CSS

- No inline `style="..."` or `:style` for things a Vuetify prop or class can do.
- When you do need CSS, put it in `<style scoped lang="scss">` in that component.
- `assets/css/style.scss` is for app-wide styles (fonts, Vuetify overrides). Ask before you change it.
- Don't set `font-family`. The app font (Noto Sans Lao) is set globally.
- Avoid `!important` and deep overrides of Vuetify internals (`:deep(.v-field__...)`). If you can't avoid them, explain why in a short comment.

## Existing code

- Some existing files use inline styles (e.g. `pages/index.vue`, `CustomTextField.vue`). Leave them as they are unless the task is about them (see `03-scope.md`).
