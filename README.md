# Exam Room: One Minute

A simple timed web game built with **Next.js (App Router)**. You have **60 seconds** to answer multiple-choice questions. Correct answers add time; incorrect answers subtract time.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build / production

```bash
npm run build
npm run start
```

## Deploy to Vercel

- Push this repo to GitHub
- In Vercel: **New Project → Import** the repo
- Framework preset: **Next.js**
- Build command: `npm run build`

## Project structure

- `app/page.tsx`: loads the game UI
- `components/ExamGame.tsx`: main state machine (Start → Game → End), timer logic, keyboard controls
- `components/TopBar.tsx`: timer (MM:SS:MS) + score display
- `components/QuestionCard.tsx`: question prompt, 4 options, submit + feedback states
- `lib/questions.ts`: placeholder question bank + `shuffle()` helper
