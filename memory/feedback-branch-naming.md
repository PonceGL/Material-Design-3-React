---
name: feedback-branch-naming
description: Git branch naming convention required for this project
metadata:
  type: feedback
---

Always name branches following the convention: `<category>/<ticket-id>-<short-description>`

Examples:

- `chore/RCL-9-migrate-to-monorepo-structure`
- `feat/RCL-12-add-card-component`
- `fix/RCL-15-button-focus-state`

**Why:** User corrected during RCL-9 when branch was created as plain `RCL-9`.

**How to apply:** Whenever creating a branch for a Jira task, derive the category from the issue type (feat for Story/Feature, fix for Bug, chore for Tarea/infrastructure), then append the ticket ID and a short kebab-case description of the work.
