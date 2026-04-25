# 03-rules-and-constraints.md

## Global Constraints
- Do not add new packages unless explicitly approved.
- Do not edit unrelated files.
- Do not refactor large unrelated sections.
- Do not create duplicate files.
- Do not modify native code unless required.
- Keep the project Expo Go compatible.
- Prefer mock data and local state during MVP.
- Do not introduce backend logic unless the task explicitly requires it.
- Do not change routing architecture without a specific task.
- Do not make broad visual redesigns during implementation tasks.

## Allowed Areas
- app/**
- components/**
- hooks/**
- services/**
- constants/**
- data/**
- types/**
- utils/**
- docs/**
- jobs/**
- progress/**

## Restricted Areas
- android/**
- ios/**
- package.json
- package-lock.json
- yarn.lock
- pnpm-lock.yaml
- app.json
- app.config.ts
- eas.json
- babel.config.js
- metro.config.js
- tsconfig.json

## Coding Constraints
- Use TypeScript.
- Keep current folder structure.
- Follow existing naming style.
- Prefer minimal changes.
- Preserve existing app behavior unless task says otherwise.
- Keep imports at the top of files.
- Prefer functional components and React hooks.
- Use clear and descriptive names.
- Avoid unnecessary comments.
- Avoid deeply nested logic.
- Move repeated logic into helpers or hooks when useful.
- Keep screen files focused on layout, navigation, and composition.
- Keep reusable UI in `components/`.
- Keep shared types in `types/`.
- Keep formatting and calculation helpers in `utils/`.
- Keep mock data in `data/`.
- Keep AsyncStorage access inside hooks or services.

## UI Constraints
- Keep design style consistent.
- Do not introduce inconsistent colors.
- Do not add random animations.
- Do not overcomplicate layouts.
- Use modern, clean, premium, and minimal visual style.
- Use consistent spacing, radius, and typography.
- Use green tones for income or positive financial states.
- Use red or coral tones for expenses or warning states.
- Use blue or indigo tones for primary actions and active navigation states.
- Keep financial values easy to read.
- Keep transaction lists easy to scan.
- Use Reanimated only when it improves the user experience.
- Avoid excessive motion, slow transitions, or distracting effects.

## Task Constraints
Every task must:
- stay within scope.
- change only relevant files.
- provide a clear result.
- report blockers clearly.
- avoid unrelated refactoring.
- avoid creating unnecessary files.
- preserve Expo Go compatibility.
- respect the existing architecture documents.
- use mock data unless real persistence is explicitly requested.
- follow Expo Router conventions for tabs, stacks, and dynamic routes.

## Navigation Constraints
- Use Expo Router as the routing system.
- Use tabs for main authenticated sections.
- Use stack screens for auth flow, detail pages, and secondary screens.
- Use dynamic routes for transaction detail pages.
- Keep auth screens outside the main tab group.
- Do not place transaction detail inside a tab unless explicitly required.
- Do not rename routes without updating related navigation links.

## Data Constraints
- Use local mock data for MVP.
- Do not connect to real banking APIs.
- Do not implement real payment or money transfer flows.
- Do not store sensitive financial credentials.
- Do not treat mock auth as real authentication.
- Keep mock user and transaction data simple, typed, and easy to update.
- Use AsyncStorage only for lightweight local persistence such as mock session state.

## Animation Constraints
- Use React Native Reanimated for animation tasks when available.
- Keep animations subtle and performance-friendly.
- Prefer opacity, translate, and scale animations.
- Do not animate every element on the screen.
- Avoid complex gesture systems during MVP unless explicitly requested.
- Do not add extra animation libraries without approval.

## Validation Constraints
Before marking any task complete, run:
- npx tsc --noEmit
- npx expo-doctor
- npm run lint

If a validation command fails:
- Report the exact command that failed.
- Summarize the reason.
- Fix it only if it is within the task scope.
- If the fix is outside the task scope, report it as a blocker.

If a command is unavailable:
- Do not modify `package.json` automatically.
- Report that the command could not be run because the script or dependency is missing.

## Completion Constraints
A task is not complete unless:
- code is updated.
- validation commands are run.
- results are reported.
- changed files are listed.
- blockers are clearly stated.
- the next suggested job is provided.