# Workflow rules

Work through every task in this order.

## 1. Before you edit

1. Check the branch (see branch rules in `00-code-begin.md`).
2. Read the task, the related `docs/api/<feature>.md` spec, the code you'll change, and the topic rules `AGENTS.md` lists for those areas.
3. Ask every unclear question together, and wait for the answers.

## 2. While you work

- Follow the rules in `.ai/rules/`. If a rule conflicts with the task or the existing code, stop and ask.
- Make the smallest change that does the job (see `03-scope.md`).

## 3. Before you finish

1. Run `yarn generate` and make sure it builds without errors.
2. If you changed `.ts` or `.vue` files, also run the type-check command from `AGENTS.md`. Fix errors in code you touched. List errors in other code under **Out of scope**.
3. If you only changed Markdown, you can skip both. Say that you skipped them.

No tests or linter are set up, so don't claim anything is tested.

## 4. Final summary

End every task with:

- **Branch:** the branch you're on.
- **Changed:** each file you changed, with one line on what changed.
- **Checks:** the result of `yarn generate` and the type-check, or that you skipped them and why.
- **Not done / unverified:** anything you skipped, couldn't check, or assumed.
- **Out of scope:** issues you found but didn't fix (see `03-scope.md`).

## 5. Commits

- Commit only when the user asks. Never commit to `main` or `develop`.
- Message format: `<branch> <TYPE>:: <message>`, e.g. `feature/user-login FEAT:: add login form`.
  - `FEAT`: new feature
  - `FIX`: bug fix
  - `REF`: refactor, restructure or dependency upgrade
  - `UPDATE`: change to an existing feature, docs or rules
- Keep the message short and in English. Commit only the files of this task.
