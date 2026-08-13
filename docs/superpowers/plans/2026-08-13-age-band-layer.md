# Dimensi Usia (Age Band Layer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended), executing-plans, or dispatching-parallel-agents (for independent wave tasks) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an age-band layer (Anak/Remaja/Dewasa) on top of the neurotype profile presets, plus soften the OpenDyslexic claim with contextual microcopy.

**Architecture:** A pure function `applyBandOverlay(preset, ageBand)` adds age-band numeric deltas (fontSize, lineHeight, letterSpacing, wordSpacing) on top of a profile preset. `applyProfile(profile, ageBand?)` becomes two-arg-with-optional-default-null so existing one-arg callers keep working. The landing gains a 3-segment age selector that applies the profile with the chosen age. OpenDyslexic stays the disleksia default but gets a switchable microcopy hint in the panel.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Zustand 5 (persist + IndexedDB), Vitest 2.

## Global Constraints

- Vitest runs in `environment: "node"`. No `document`/`window` in tests.
- Test files **must** be named `*.test.ts` (the `*.test.tsx` glob is silently ignored). Include glob: `src/**/*.test.ts`.
- Tests reset store state via `useAccessibilityStore.getState().reset()` in `beforeEach`.
- Import paths use the `@/*` alias → `src/*`.
- Tailwind semantic colors (`bg`, `fg`, `muted`, `accent`, `card`, `border`) — not raw hex. Exception: profile accent colors in `tailwind.config.ts` (NOT touched here).
- No emoji in JSX — use lucide-react icons.
- `AccessibilitySettings` numeric fields (`fontSize`, `lineHeight`, `letterSpacing`, `wordSpacing`) are **absolute base values** in `DEFAULT_SETTINGS`/`PROFILE_PRESETS`. Age overlay must **ADD** deltas, never replace absolute.
- Neither `AccessibilityApplier.tsx` nor `.reader` selector logic changes in this plan.

## Execution Order

- **Wave 1:** Task 1 (types) — no blockers.
- **Wave 2:** Task 2 (constants) — blocked by Task 1.
- **Wave 3:** Task 3 (age-bands lib + test) — blocked by Task 2.
- **Wave 4:** Task 4 (store) — blocked by Task 3.
- **Wave 5 (parallel):** Task 5 (landing age selector), Task 6 (panel microcopy) — both blocked by Task 4; they touch different files so they may run in parallel.

---
---

### Task 1: Add AgeBand type + ageBand field

**Files:**
- Modify: `src/lib/types.ts:5` (after `export type Profile = ...`)
- Modify: `src/lib/types.ts:13-35` (add `ageBand` to `AccessibilitySettings`)

**Interfaces:**
- Consumes: nothing new.
- Produces: `export type AgeBand = "anak" | "remaja" | "dewasa"`; `ageBand: AgeBand | null` field on `AccessibilitySettings`.

**Blocked by:** None — can start immediately.

- [ ] **Step 1: Add the `AgeBand` type**

Open `src/lib/types.ts`. After the `export type Profile = ...` line (line 5), add:

```ts
export type AgeBand = "anak" | "remaja" | "dewasa";
```

- [ ] **Step 2: Add the `ageBand` field to `AccessibilitySettings`**

In the `AccessibilitySettings` interface, right after the `profile: Profile | null;` line (line 14), add:

```ts
  ageBand: AgeBand | null;
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS (no type errors). `ageBand` is not yet consumed anywhere, so no errors expected.

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat(types): tambah AgeBand dan field ageBand"
```

---
---

### Task 2: AGE_BAND_LABELS + AGE_BAND_DELTAS constants

**Files:**
- Modify: `src/lib/constants.ts` (after `PROFILE_LABELS`, ~line 79)

**Interfaces:**
- Consumes: `AgeBand`, `AccessibilitySettings` from `src/lib/types.ts`.
- Produces:
  - `AGE_BAND_LABELS: Record<AgeBand, string>`
  - `AGE_BAND_DELTAS: Record<AgeBand, Partial<AccessibilitySettings>>`

**Blocked by:** Task 1 (needs the `AgeBand` type to compile).

- [ ] **Step 1: Add the constants**

Open `src/lib/constants.ts`. After the `PROFILE_LABELS` block (line 75-79), add:

```ts
export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  anak: "Anak (6-9)",
  remaja: "Remaja (10-15)",
  dewasa: "Dewasa (16+)",
};

export const AGE_BAND_DELTAS: Record<AgeBand, Partial<AccessibilitySettings>> = {
  // Delta DITAMBAHKAN di atas nilai absolut preset profil (bukan pengganti absolut).
  // wordSpacing di-overlay karena metrik keterbacaan numerik yang sama (preset disleksia men-set 4).
  anak: { fontSize: +2, lineHeight: +0.1, letterSpacing: +0.5, wordSpacing: +1 },
  remaja: { fontSize: +1, lineHeight: +0.05, letterSpacing: +0.25, wordSpacing: +0.5 },
  dewasa: {}, // baseline, tanpa overlay
};
```

- [ ] **Step 2: Ensure the `AgeBand` import**

Verify `src/lib/constants.ts` imports `AgeBand` from `./types`. The existing import (line 1) is:

```ts
import type { AccessibilitySettings, Contrast, FontFamily, Profile } from "./types";
```

Add `AgeBand` to it:

```ts
import type { AccessibilitySettings, AgeBand, Contrast, FontFamily, Profile } from "./types";
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat(constants): tambah AGE_BAND_LABELS dan AGE_BAND_DELTAS"
```

---
---

### Task 3: applyBandOverlay pure function + tests

**Files:**
- Create: `src/lib/age-bands.ts`
- Test: `src/lib/age-bands.test.ts`

**Interfaces:**
- Consumes: `AgeBand`, `AccessibilitySettings` from `src/lib/types.ts`; `AGE_BAND_DELTAS` from `src/lib/constants.ts`.
- Produces: `applyBandOverlay(preset: Partial<AccessibilitySettings>, ageBand: AgeBand | null): Partial<AccessibilitySettings>`.

**Blocked by:** Task 2.

- [ ] **Step 1: Write the failing test**

Create `src/lib/age-bands.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import { applyBandOverlay } from "./age-bands";
import type { AccessibilitySettings } from "./types";
import { PROFILE_PRESETS } from "./constants";

describe("applyBandOverlay", () => {
  test("anak menambahkan delta numerik di atas preset disleksia", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, "anak");
    expect(out.fontSize).toBe(base.fontSize! + 2);
    expect(out.lineHeight).toBe(base.lineHeight! + 0.1);
    expect(out.letterSpacing).toBe(base.letterSpacing! + 0.5);
    expect(out.wordSpacing).toBe(base.wordSpacing! + 1);
  });

  test("dewasa tidak mengubah preset (baseline)", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, "dewasa");
    expect(out).toEqual({ ...base });
  });

  test("null tidak mengubah preset (default)", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, null);
    expect(out).toEqual({ ...base });
  });

  test("overlay tidak menyentuh field non-numerik", () => {
    const base = PROFILE_PRESETS.disleksia; // contrast: "high", ttsEnabled: true, bionic: false
    const out = applyBandOverlay(base, "anak");
    expect(out.contrast).toBe("high");
    expect(out.ttsEnabled).toBe(true);
    expect(out.bionic).toBe(false);
  });

  test("re-apply penuh tidak men-stack delta (anak lalu dewasa)", () => {
    const base = PROFILE_PRESETS.disleksia;
    const withAnak = applyBandOverlay(base, "anak");
    const backToBase = applyBandOverlay(withAnak, "dewasa");
    expect(backToBase).toEqual({ ...base });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/age-bands.test.ts`
Expected: FAIL — "Failed to load url ... /age-bands.ts" (module `applyBandOverlay` is not defined yet).

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/age-bands.ts`:

```ts
import type { AccessibilitySettings, AgeBand } from "./types";
import { AGE_BAND_DELTAS } from "./constants";

export function applyBandOverlay(
  preset: Partial<AccessibilitySettings>,
  ageBand: AgeBand | null,
): Partial<AccessibilitySettings> {
  // null dan "dewasa" sama-sama no-op (baseline).
  if (!ageBand || ageBand === "dewasa") return { ...preset };
  const deltas = AGE_BAND_DELTAS[ageBand];
  const out: Partial<AccessibilitySettings> = { ...preset };
  if (deltas.fontSize !== undefined && out.fontSize !== undefined)
    out.fontSize = out.fontSize + deltas.fontSize;
  if (deltas.lineHeight !== undefined && out.lineHeight !== undefined)
    out.lineHeight = out.lineHeight + deltas.lineHeight;
  if (deltas.letterSpacing !== undefined && out.letterSpacing !== undefined)
    out.letterSpacing = out.letterSpacing + deltas.letterSpacing;
  if (deltas.wordSpacing !== undefined && out.wordSpacing !== undefined)
    out.wordSpacing = out.wordSpacing + deltas.wordSpacing;
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/age-bands.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/age-bands.ts src/lib/age-bands.test.ts
git commit -m "feat(age-bands): tambah applyBandOverlay murni + test"
```

---
---

### Task 4: Store — applyProfile gets optional ageBand

**Files:**
- Modify: `src/stores/accessibilityStore.ts:18` (interface signature), `:47` (impl), `:25-38` (SETTING_KEYS), `:56-70` (partialize)
- Modify: `src/lib/constants.ts:4` (`DEFAULT_SETTINGS` — add `ageBand: null`)
- Test: `src/stores/accessibilityStore.test.ts`

**Interfaces:**
- Consumes: `applyBandOverlay` from `src/lib/age-bands.ts`; `AgeBand` from `src/lib/types.ts`.
- Produces: `applyProfile(profile: Profile, ageBand?: AgeBand | null): void` — optional second param, default `null` (no overlay). Existing one-arg callers (`AccessibilityPanel`, `ProfileCard`) remain valid.

**Blocked by:** Task 3.

- [ ] **Step 1: Update the interface signature**

In `src/stores/accessibilityStore.ts`, the interface line 17-18 currently:

```ts
  /** Apply a profile preset (PRD: panel auto-config per profile). */
  applyProfile: (profile: Profile) => void;
```

Change to:

```ts
  /** Apply a profile preset, optionally layered with an age band delta. */
  applyProfile: (profile: Profile, ageBand?: AgeBand | null) => void;
```

Also update the type import (line 6):

```ts
import type { AccessibilitySettings, Profile } from "../lib/types";
```

to:

```ts
import type { AccessibilitySettings, AgeBand, Profile } from "../lib/types";
```

- [ ] **Step 2: Update the implementation**

In `src/stores/accessibilityStore.ts`, line 47 currently:

```ts
      applyProfile: (profile) => set({ profile, ...PROFILE_PRESETS[profile] }),
```

Change to:

```ts
      applyProfile: (profile, ageBand) =>
        set({
          profile,
          ageBand: ageBand ?? null,
          ...applyBandOverlay(PROFILE_PRESETS[profile], ageBand ?? null),
        }),
```

Add the import at the top near the other imports (after `import { createJSONStorage, persist } from "zustand/middleware";`):

```ts
import { applyBandOverlay } from "../lib/age-bands";
```

- [ ] **Step 3: Add `ageBand` to SETTING_KEYS**

In the `SETTING_KEYS` array (lines 25-38), add `"ageBand"` right after `"profile"`:

```ts
const SETTING_KEYS: (keyof Settings)[] = [
  "profile",
  "ageBand",
  "fontFamily",
  ...
];
```

- [ ] **Step 4: Add `ageBand` to DEFAULT_SETTINGS**

In `src/lib/constants.ts`, `DEFAULT_SETTINGS` (line 4-17). After the `profile: null,` line (line 5), add:

```ts
export const DEFAULT_SETTINGS: AccessibilitySettings = {
  profile: null,
  ageBand: null,
  ...
};
```

This ensures `reset()` (which spreads `DEFAULT_SETTINGS`) restores `ageBand: null`.

- [ ] **Step 5: Add `ageBand` to partialize**

In `src/stores/accessibilityStore.ts`, the `partialize` function (lines 56-70) builds the persisted object per-key. Add right after `profile: state.profile,`:

```ts
      partialize: (state) =>
        ({
          profile: state.profile,
          ageBand: state.ageBand,
          ...
        }) as Partial<AccessibilityStore>,
```

- [ ] **Step 6: Add store tests (update `accessibilityStore.test.ts`)**

Add these tests inside the `describe("accessibilityStore", ...)` block (they reset via `beforeEach`):

```ts
  test("applyProfile with anak applies profile preset + age overlay", () => {
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBe("disleksia");
    expect(s.ageBand).toBe("anak");
    // disleksia base fontSize 20 + anak delta 2
    expect(s.fontSize).toBe(22);
    // non-numeric preset fields untouched
    expect(s.contrast).toBe("high");
  });

  test("applyProfile one-arg leaves ageBand null and no overlay", () => {
    useAccessibilityStore.getState().applyProfile("disleksia");
    const s = useAccessibilityStore.getState();
    expect(s.ageBand).toBeNull();
    expect(s.fontSize).toBe(20); // preset base, no overlay
  });

  test("reset returns ageBand to null", () => {
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    useAccessibilityStore.getState().reset();
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBeNull();
    expect(s.ageBand).toBeNull();
  });
```

- [ ] **Step 7: Run tests**

Run: `npx vitest run src/stores/accessibilityStore.test.ts src/lib/age-bands.test.ts`
Expected: PASS (all existing + new tests).

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/stores/accessibilityStore.ts src/lib/constants.ts src/stores/accessibilityStore.test.ts
git commit -m "feat(store): applyProfile terima ageBand opsional + persist"
```

---
---

### Task 5: Landing age selector (3 segment buttons)

**Files:**
- Modify: `src/components/landing/ProfileCard.tsx:30,35-38`
- Modify: `src/app/page.tsx` (add age selection UI)
- Modify: `src/lib/constants.ts` (export `AGE_BAND_LABELS` already done in Task 2; imported here)

**Interfaces:**
- Consumes: `AGE_BAND_LABELS` from `src/lib/constants.ts`; `AgeBand` type; `applyProfile(profile, ageBand)` from the store; local state for selected age.
- Produces: Landing flow that applies profile with the chosen age (default `remaja`? Per spec default is **Dewasa**).

**Blocked by:** Task 4.

> **Behavior contract:** the user picks a profile card, then picks an age band, then clicks "Mulai Belajar". Applying calls `applyProfile(profile.id, ageBand)` then `router.push("/belajar")`. Default age state on the landing = `"dewasa"` (baseline, no overlay).

- [ ] **Step 1: Add age state to the Landing page**

Open `src/app/page.tsx`. Add a `"use client"` already present (line 1). Add a state hook:

**Important:** `page.tsx` is the landing; add `useState` import from React. The current file imports `"use client";` and no React hooks. Add:

```tsx
import { useState } from "react";
import type { Profile } from "@/lib/types";
import type { AgeBand } from "@/lib/types";
import { AGE_BAND_LABELS } from "@/lib/constants";
```

Add inside the `LandingPage` component, before the return:

```tsx
const [ageBand, setAgeBand] = useState<AgeBand>("dewasa"); // default baseline
```

- [ ] **Step 2: Render the age segment selector**

Inside the Profile Selector section, below the profile grid (after the `</div>` closing `grid grid-cols-1 md:grid-cols-3 gap-6` at line 125), add an age band row:

```tsx
<div className="mt-6">
  <h3 className="text-sm font-bold font-lexend text-fg mb-2">
    Rentang Usia
  </h3>
  <p className="text-xs text-muted mb-3 font-sans">
    Pengaturan visual disesuaikan dengan rentang usiamu. Bisa kamu ubah kapan saja.
  </p>
  <div className="grid grid-cols-3 gap-2 max-w-md">
    {(["anak", "remaja", "dewasa"] as AgeBand[]).map((band) => (
      <button
        key={band}
        type="button"
        onClick={() => setAgeBand(band)}
        className={`text-xs px-3 py-2.5 border-2 rounded-xl font-sans font-semibold min-h-[44px] transition-colors ${
          ageBand === band
            ? "border-fg bg-fg text-bg"
            : "border-border bg-card text-fg hover:bg-muted/10"
        }`}
      >
        {AGE_BAND_LABELS[band]}
      </button>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Pass ageBand to ProfileCard**

Modify the `ProfileCard` usage in `page.tsx` (lines 115-123) to pass the selected `ageBand`:

```tsx
{profiles.map((p) => (
  <ProfileCard
    key={p.id}
    profile={p}
    ageBand={ageBand}
    accentClass={p.accentClass}
    borderClass={p.borderClass}
    iconBgClass={p.iconBgClass}
    iconClass={p.iconClass}
    Icon={p.Icon}
  />
))}
```

- [ ] **Step 4: Update ProfileCard to accept + apply ageBand**

Open `src/components/landing/ProfileCard.tsx`. Update the props interface to add `ageBand`, and modify `handleSelect`:

Add to the interface (after the `profile` prop, line 12-23):

```ts
  ageBand: AgeBand;
```

And update the import line 8:

```ts
import type { Profile, AgeBand } from "@/lib/types";
```

Destructure `ageBand` in the function signature (line 25-28):

```ts
export function ProfileCard({
  profile,
  ageBand,
  Icon,
}: ProfileCardProps) {
```

Update `handleSelect` (lines 35-38):

```ts
  const handleSelect = () => {
    applyProfile(profile.id, ageBand);
    router.push("/belajar");
  };
```

The `applyProfile` store call now passes `ageBand`; the optional param default handles any call without it.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Build to verify no regressions**

Run: `npm run build`
Expected: PASS (Next build runs lint + type-check).

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/components/landing/ProfileCard.tsx
git commit -m "feat(landing): selektor rentang usia 3 segmen di onboarding"
```

---
---

### Task 6: OpenDyslexic contextual microcopy

**Files:**
- Modify: `src/components/AccessibilityPanel.tsx` (inside "Jenis Font" section, ~line 149)

**Interfaces:**
- Consumes: none new — reads `s.fontFamily` from the store (already available).
- Produces: A non-blocking hint shown when `s.fontFamily === "opendyslexic"`, pointing to Default/Lexend alternatives.

**Blocked by:** Task 4 (reads `s.fontFamily`; store type must compile with `ageBand`). Touches a different file than Task 5, so it may run in parallel with Task 5.

- [ ] **Step 1: Add a microcopy hint when OpenDyslexic is active**

Open `src/components/AccessibilityPanel.tsx`. In the "Jenis Font" block, after the `FONT_OPTIONS.map` block (which ends ~line 150), add a conditional hint:

```tsx
{s.fontFamily === "opendyslexic" && (
  <p className="mt-2 text-[10px] font-sans text-muted leading-relaxed px-1.5">
    Terasa berat? Coba Default/Lexend — tiap otak punya preferensi bentuk huruf yang berbeda.
  </p>
)}
```

- [ ] **Step 2: Verify no type/lint break**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/AccessibilityPanel.tsx
git commit -m "feat(accessibility-panel): microcopy alternatif saat OpenDyslexic aktif"
```

---
---

## Verification Checklist (Final)

After all tasks complete, run:

```bash
npm test           # all vitest suites pass
npm run build      # next build: lint + type-check pass
```

Manual smoke:
1. Landing: select profile → age band → click profile → navigates to `/belajar`, panel reflects preset + age overlay.
2. Panel: change font, switch disleksia → OpenDyslexic hint appears; switch to Default → hint disappears.
3. Panel profile buttons still work (one-arg `applyProfile` → no overlay, `ageBand` null).