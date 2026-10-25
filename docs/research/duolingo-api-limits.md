# Duolingo data sources — verified limits

Checked: 2026-10-24 against `AlvaGonz` (user id `478388255`).

## Public profile endpoint — the source we use

`GET https://www.duolingo.com/2017-06-30/users?username=AlvaGonz`

Returns, without auth:

- `streak`
- `totalXp`
- `learningLanguage`
- `picture`
- `courses[]` with `title`, `learningLanguage`, `xp`
- `motivation`

It does not return CEFR, per-skill levels, or a usable crown count (`crowns: 9999`).

Requires a browser-like `User-Agent`; otherwise Duolingo can answer 403.

## Legacy profile endpoint

`GET https://www.duolingo.com/users/AlvaGonz` returns `401`. Not usable.

## Anakin

Base URL `https://api.anakin.io/v1/wire`, header `X-API-Key`, `POST /task`, then poll `GET /jobs/{id}`. Read actions cost 3 credits.

Live results:

| Action | Result |
| --- | --- |
| `act_duolingo_user_xp_summaries` | Works. 30 days, 861 XP, 30/30 days with `streak_extended: true`. |
| `act_duolingo_course_progress_scores` | `status: "locked"`, `scores: []`. Needs a connected account or private `skill_tree_id`. |
| `act_duolingo_user_streak_goal` | Failed. |
| `act_duolingo_user_goals_progress` | Failed. |

No free Anakin action returns CEFR. The public profile HTML does not expose `skill_tree_id` either.

## Decision

Fetch the public endpoint daily in CI. Derive an estimated CEFR level from course XP and label it `est.`. Anakin cannot return CEFR (no action exposes language levels), so it is not used for levels.

Anakin is still wired optionally: `act_duolingo_user_xp_summaries` runs when `ANAKIN_API_KEY` is set, refreshing a 30-day activity summary (XP, active days, streak-extended days) into `duolingo.json` under `activity`. It costs 3 credits per run and is fail-soft. The connected-account actions (`course_progress_scores`) need a `DUOLINGO_CREDENTIAL_ID` plus per-course `skill_tree_id`, which are not available, so they are not wired.
