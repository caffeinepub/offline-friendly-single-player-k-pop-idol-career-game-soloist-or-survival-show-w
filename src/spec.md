# Specification

## Summary
**Goal:** Build an offline-friendly, single-player K-pop idol career game with two story paths, local progress saving, local media submissions, and scripted in-game judge feedback.

**Planned changes:**
- Add landing flow with New Game, Continue, and Reset; persist and reload game state locally.
- Implement two career paths for a new game: Soloist mode and Survival Show storyline mode.
- Create character setup (gender, nationality, age) with basic validation, a profile summary, and local persistence.
- Add agency system: create custom agency (name + optional description) or choose from an offline predefined list; optionally sync text-based selection/progress when signed in (excluding large media).
- Implement offline media capture/import: record or upload audio, capture/upload photo, and record/upload video; store all media locally on-device and attach submissions to specific audition/performance events.
- Add performance submission metadata (type, difficulty, self-rating), a submission history list per playthrough, and a results screen.
- Implement fictional “judge” feedback using scripted rules (no online AI/ML): score breakdown plus 3–6 actionable tips varying by performance type/difficulty/self-rating, clearly labeled as in-game fiction.
- Add a settings screen explaining what is stored locally vs what (optionally) syncs when signed in.
- Apply a consistent playful K-pop stage visual theme across key screens, avoiding blue/purple as primary colors, and reference generated static assets from `frontend/public/assets/generated`.

**User-visible outcome:** The user can start or continue an offline single-player run as a Soloist or in a Survival Show, set up their character and agency, submit real audio/photo/video auditions stored only on-device, view a history of submissions, and receive varied scripted judge feedback—optionally signing in only to sync lightweight text progress.
