# Cashless - Frontend Maintenance Workflow

This project is an **Angular** application. Follow these rules for frontend maintenance.

## Human Setup
- Install **Node.js (latest LTS)** and **Angular CLI**.

## Dependency Management (Frontend)
- **Node.js**: Use the latest LTS. Ensure consistency with `.github/workflows/build.yml`.
- **Angular CLI**: Check for updates periodically.
- **Update Command**: Run `ng update @angular/core @angular/cli @angular/material angular-eslint` in this directory.
- **Tailwind**: Update `tailwindcss`, `@tailwindcss/postcss`, and `postcss` to their latest version within the current major release. **Any major version upgrade requires human intervention.**
- **Prettier**: Ensure `prettier` is up to date and consistent with the project's `.prettierrc`.

## Maintenance Workflow
1. **Verification**: `npm run lint && npm run test`.
   - Note: The project uses **Vitest** for testing.
2. **Translation Extraction**: Run `npx ng extract-i18n` (if applicable).
3. **Local Build**: `npm run build`.
4. **Bump Version**: Update `"version"` in `package.json`.
5. **Sync**: Ensure the version matches the backend `pom.xml`.

## CI/CD Alignment
- Ensure GitHub Action versions and runner configurations in the root `.github/workflows/build.yml` are the latest stable releases.
- Sync Node version with the root `.github/workflows/build.yml`.

## Human Reminders (CRITICAL)
- **Git Push**: AI assistants **must never** execute `git push`.
- **Tagging**: AI assistants may create local tags, but the human must handle pushing them.

## Notes for LLMs
- **Validation First**: Always run lint and tests before committing dependency updates.
- **Consistency**: Keep `package.json` and `.github/workflows/build.yml` in sync.
- **Commit Messages**: Follow Chris Beams' style for all commits.
