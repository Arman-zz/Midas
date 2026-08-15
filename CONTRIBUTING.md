# Contributing to MIDAS

Thank you for helping improve MIDAS. Contributions should be focused, reviewable, and safe for a
platform that handles identity and financial record data.

## Before you begin

1. Search existing issues before opening a new one.
2. Use an issue to discuss large features or changes to business rules.
3. Do not include real NID values, credentials, payment data, or verification documents.
4. Follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Local workflow

1. Fork or clone the repository.
2. Create a focused branch, such as `feat/payment-history` or `fix/login-redirect`.
3. Install dependencies with `npm install`.
4. Copy `.env.example` to `.env` and configure the local API URL.
5. Implement one logical change at a time.
6. Run `npm run check` before committing.

## Commit guidance

Use concise, imperative commit messages with a conventional prefix:

```text
feat: add customer payment history
fix: preserve dashboard route after login
docs: clarify local database setup
test: cover marketplace category filters
```

Keep formatting-only changes separate from behavior changes. Never commit generated `dist/`
content, dependencies, secrets, or personal database exports.

## Pull requests

A pull request should:

- Explain the problem and the chosen solution.
- Link the relevant issue when one exists.
- Include screenshots for visible interface changes.
- Describe validation performed and any remaining limitations.
- Keep unrelated refactors out of the change.
- Update documentation and tests when behavior changes.

Reviewers may request smaller commits, additional tests, accessibility improvements, or stronger
server-side validation before approval.

## Coding standards

- Prefer small React components and shared hooks over duplicated logic.
- Keep API access in the service layer.
- Enforce authorization and sensitive validation on the server, not only in the browser.
- Use parameterized database queries.
- Provide meaningful loading, empty, success, and error states.
- Preserve keyboard navigation and accessible labels for interactive controls.
