# LevelUp

An adaptive learning platform built for learners with ADHD and dyslexia.

LevelUp is a web-based LMS where accessibility is part of the core design, not an extra setting. Reading options like font, spacing, contrast, and text-to-speech are available on every page, and quiz difficulty adjusts itself based on how you answer. Pick a profile, Dyslexia, ADHD, or General, and the reading setup applies automatically. You can also tune every option by hand.

Everything runs in the browser. Progress is stored locally in IndexedDB, there is no backend or account system, and the learning content is sample material.

## Features

- Accessibility panel on every page. Font family (System, Lexend, OpenDyslexic), font size, line height, letter and word spacing, and contrast presets (normal, high, dark mode).
- Reading tools: text-to-speech via the Web Speech API, bionic reading, a line guide ruler, and focus mode.
- Profile presets for Dyslexia, ADHD, and General that apply a matching reading setup in one click.
- Adaptive quizzes with three difficulty levels that move up or down based on your answers.
- Persistent progress in IndexedDB: points, streaks, badges, best quiz scores, and your adaptive level.
- A dashboard with a weekly points chart, a local leaderboard, a badge collection, and PDF certificate export.
- Quizzes resume after a page reload. An in-flight session is restored when you come back.

## Tech Stack

| Layer          | Tool                            |
| -------------- | ------------------------------- |
| Framework      | Next.js 15 (App Router), React 19 |
| Language       | TypeScript (strict)             |
| Styling        | Tailwind CSS v3, CSS variables  |
| State          | Zustand 5 with persist          |
| Storage        | IndexedDB via idb-keyval        |
| Accessibility  | Web Speech API, OpenDyslexic, Lexend |
| Testing        | Vitest 2                        |
| Icons / Export | lucide-react, html2canvas, jspdf |

## Getting Started

Prerequisites: Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Pick a profile on the landing page to see the accessibility panel apply its preset.

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack)         |
| `npm run build`     | Production build (runs lint + type-check) |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | Run ESLint (`next/core-web-vitals`)      |
| `npm test`          | Run all tests once                       |
| `npm run test:watch`| Run tests in watch mode                  |

## Project Structure

```
src/
  app/         Next.js App Router routes: landing, belajar, kuis, hasil, dashboard
  components/  UI: AccessibilityPanel, KuisEngine, Navbar, LineGuide, landing
  lib/         Domain logic: adaptive, quiz-session, tts, bionic, dummy-data
  stores/      Zustand stores: accessibility, progress (both persisted)
```

`src/lib/adaptive.ts` holds the adaptive difficulty logic (levels 1-3) shared by the quiz engine, the progress store, and the results page. Quiz resume logic lives in `src/lib/quiz-session.ts`.

## Testing

```bash
npm test                 # run all tests once
npm run test:watch       # watch mode
npx vitest run src/lib/adaptive.test.ts   # single test file
```

Tests run in a Node environment, so stores are tested against an in-memory fallback instead of IndexedDB.

## Deployment

Deploy to Vercel by importing the repository. The default Next.js settings work as-is and the build command is `npm run build`.

The app has no backend or database, so a standard Next.js deploy is all it needs.
