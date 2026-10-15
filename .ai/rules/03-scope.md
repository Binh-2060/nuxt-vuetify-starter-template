# Scope rules

Do what the task asks, and nothing more.

## Stay inside the task

- Only change code the task needs. No refactors, renames, reformatting, comment cleanups or "while I'm here" fixes in other code.
- Only touch files the task needs. If a change starts to spread to files you didn't expect, stop and ask.
- If you find a bug, a rule violation or an improvement outside the task, don't fix it. List it in your final summary under **Out of scope**.
- Don't add features, options, props, config or error handling that nobody asked for.

## Ask before you

- Add, remove or upgrade a dependency, or change `package.json` scripts.
- Edit shared core files: `nuxt.config.ts`, `app.config.ts`, `plugins/`, `configs/env.ts`, `utils/api.ts`, `data/networks/apiClient.ts`, `composables/useDialog.ts`, `composables/global.ts` or `consts/rules.ts`.
- Change the props, emits or slots of an existing `components/global/*` component, because every caller depends on them. Adding an optional prop with a default that keeps today's behavior is fine.
- Delete or move files, or create a new top-level folder.
- Add a new pattern or library the rules don't describe (a new state approach, HTTP client, UI kit, CSS framework and so on).
- Change anything in `.ai/`, `AGENTS.md`, `CLAUDE.md` or `docs/`, unless that's the task.

## Don't invent

- Use only endpoints, fields and behavior from `docs/api/<feature>.md`. If the spec is missing or doesn't cover something, ask. Don't guess a field name or response shape.
- Don't invent UI text, labels, validation messages or business rules. Ask for them.
- Don't add mock data, placeholder endpoints or TODO stubs unless asked.
