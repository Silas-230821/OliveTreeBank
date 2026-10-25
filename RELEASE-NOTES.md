# TidyQuest v0.5.1 Release Notes

> **Date:** 2026-04-29

Community contributions release — three new features and one security update.

---

## What's new

### New Features

- **Collapsible sidebar** — click the hamburger icon to collapse the sidebar to icons-only (60px); state persists in localStorage. Hovering a collapsed icon shows a tooltip with the nav label (contributed by @ashtonchase)
- **Edit reward title & description** — admins can now edit the name and description of rewards in the catalog, not just the coin cost (contributed by @ashtonchase)
- **Sorted icon picker** — the task icon dropdown is now sorted alphabetically in the user's language across all three entry points: task edit, task add, and room creation wizard (contributed by @ashtonchase)

### Security

- postcss 8.5.6 → 8.5.12 (arbitrary file read via user-generated CSS; XSS via unescaped `</style>`)

---

## Upgrade

1. Pull the new Docker image: `docker pull mellowfox/tidyquest:latest`
2. Restart the container

---

# TidyQuest v0.5.0 Release Notes

> **Date:** 2026-04-28

First stable release of the 0.5 series — everything that shipped across the four beta releases, polished and ready for production.

---

## What's new since v0.4.1

### New Features

- **Goal completion tracking** — goals automatically mark themselves as complete when the target coin count is reached; dashboard shows a "Completed!" badge
- **Pre-defined tasks in existing rooms** — add template tasks to rooms you already have, not just during room creation
- **Per-task assignment in the room creation wizard** — assign tasks to household members directly in step 2 of room creation
- **Dashboard task filter** — filter Today's Quests to show only tasks assigned to you
- **Avatar login screen** — click your avatar on the login screen instead of typing a username (#32)
- **Goal coin rewards** — goals no longer silently auto-complete; progress is tracked accurately per-goal period
- **Home Assistant integration** — new `custom_components/tidyquest` package exposes each task as a HA sensor with services: `complete_task`, `create_task`, `update_task`, `delete_task`, `reset_task`, `refresh` (contributed by @C-Blais)
- **Task reset endpoint** — admin-only `POST /tasks/:id/reset` makes a task immediately due again and reverses coins

### Bug Fixes

- **#67**: Countdown timer no longer shows "_h 60m" — minutes calculation fixed
- **#68**: Template task names display translated names instead of raw keys
- **#69**: Template task tap targets fixed on mobile (44px minimum)
- **#70**: Customise modal uses an ✕ close button
- **#71**: Task add form row has minimum height to prevent layout shift
- **#72**: Adding a task with an empty title now shows a validation error
- **#73**: Task edit form auto-focuses the name field; prevents saving with empty title
- **#75**: "Overdue" label aligns correctly with the health calculation
- **#78**: Hamburger menu icon visible in dark/night theme
- **#79**: Username login is now case-insensitive
- **#83**: Multiple goals no longer auto-complete instantly on creation
- **#86**: Customise panel shows "Leaderboard" instead of "This Week" for the leaderboard section
- **#88**: Dashboard titles "Coins Status" and "Reward Requests" now use consistent Title Case
- **#95**: New tasks default to Dirty (0% health) instead of Clean
- **Task assignment layout**: Assign dropdown in room creation moved to its own row — no longer squished into the config grid

### Security

- path-to-regexp 0.1.12 → 0.1.13 (CVE-2026-4867)
- picomatch 4.0.3 → 4.0.4 (CVE-2026-33671, CVE-2026-33672)
- vite 7.3.1 → 7.3.2 (path traversal fixes)
- vite 8.0.0 → 8.0.5 (server.fs hardening)

---

## Upgrade from v0.4.x

1. Pull the new Docker image: `docker pull mellowfox/tidyquest:latest`
2. Restart the container
3. Database migrations run automatically on startup

---

# TidyQuest v0.5.0-beta.3 Release Notes

> **Date:** 2026-04-07

Bug fix release addressing dashboard label inconsistencies.

---

## Bug Fixes

- **#88**: Dashboard titles "Coins status" and "Reward requests" now use consistent Title Case ("Coins Status", "Reward Requests") matching all other dashboard section titles
- **#86**: Customise menu now shows "Leaderboard" instead of "This Week" for the leaderboard section — the label no longer changes with the selected time period

---

## Upgrade from beta.2

1. Pull the new Docker image: `docker pull mellowfox/tidyquest:0.5.0-beta.3`
2. Restart the container
3. No database migrations required

---

# TidyQuest v0.5.0-beta.2 Release Notes

> **Date:** 2026-04-01

Bug fix release addressing 10 community-reported issues plus security dependency updates.

---

## Bug Fixes

- **#67**: Countdown timer no longer shows "_h 60m" — `Math.ceil` replaced with `Math.floor` for remaining minutes (via PR #80 by @stonkage)
- **#68**: Template task names now display human-friendly translated names instead of raw identifiers
- **#69**: Template task labels now have proper minimum tap target size (44px) on mobile
- **#70**: Customise home screen modal now uses an X close button instead of Cancel (via PR #80 by @stonkage)
- **#71**: Task add form row now has minimum height to prevent layout shift (via PR #80 by @stonkage)
- **#72**: Adding a task with an empty title now shows a red error message instead of silently failing
- **#73**: Task edit form now auto-focuses the name field and prevents saving with empty title
- **#75**: "Overdue" label no longer appears while health is still above 0% — aligned with server-side health calculation
- **#78**: Hamburger menu icon now visible in dark/night theme (via PR #80 by @stonkage)
- **#79**: Username login is now case-insensitive — "John" and "john" match the same account

## New Features

- **#65**: Goal completion now works — goals are automatically marked as completed when earned coins reach the target. Dashboard shows a "Completed!" badge on achieved goals.

---

## Security

- **path-to-regexp** 0.1.12 → 0.1.13 (fixes CVE-2026-4867, via PR #81)
- **picomatch** 4.0.3 → 4.0.4 (fixes CVE-2026-33671 & CVE-2026-33672, via PR #77)

---

## Database Migrations

Two new columns added to `user_goals` table: `status` (default: 'active') and `completedAt`. Migrations run automatically on startup.

---

## Upgrade from beta.1

1. Pull the new Docker image: `docker pull mellowfox/tidyquest:0.5.0-beta.2`
2. Restart the container
3. Database migrations run automatically

---

## Community

Thank you to **@stonkage** for PR #80 fixing 4 CSS/UI bugs, and to **@gjincy88** for detailed bug reports!

Join our [Discord](https://discord.gg/ucXmKM6y) to discuss features and report issues.
