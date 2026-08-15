# Security policy

## Supported versions

MIDAS is under active development. Security fixes are applied to the latest code on the `main`
branch; older snapshots are not supported.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public GitHub issue, discussion, or pull request.
Use GitHub's private vulnerability reporting feature for this repository when it is available. If
it is unavailable, contact the maintainer through a private channel listed on the
[Arman-zz GitHub profile](https://github.com/Arman-zz).

Include:

- The affected feature and version or commit.
- Clear reproduction steps or a minimal proof of concept.
- The potential impact.
- Any suggested mitigation.

Do not access, change, or download data that does not belong to you. Use test accounts and synthetic
data when demonstrating an issue.

## Sensitive data

Never commit or attach:

- `.env` files, JWT secrets, access tokens, or database passwords.
- Real NID numbers or other identity records.
- Customer invoices, payment details, or database exports.
- Shop trade licenses, tax documents, or private storage URLs.

If a secret is exposed, revoke or rotate it immediately; deleting it from the latest commit is not
enough because it remains in Git history.
