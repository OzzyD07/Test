# AGENTS.md

## Project Identity
Project name: Personal Finance Tracker

Project type: Expo Router mobile app

Main goal:
React Native Expo Go üzerinde çalışan, kullanıcıların gelir ve giderlerini takip edebileceği, kategori bazlı harcama analizleri görebileceği ve işlem detaylarını inceleyebileceği modern bir kişisel finans / gider takip uygulaması geliştirmek.

Target users:
Kişisel bütçesini yönetmek, harcamalarını kategorilere ayırmak ve gelir-gider dengesini mobil cihaz üzerinden kolayca takip etmek isteyen bireysel kullanıcılar.

Current phase:
MVP / prototype / internal test

---

## Core Working Rules
- Do not add new packages unless explicitly requested.
- Prefer editing existing files over creating new ones.
- Keep changes small, focused, and easy to review.
- Do not touch native folders unless the task explicitly requires it.
- Do not create duplicate versions of files.
- Do not add unnecessary comments.
- Do not change unrelated parts of the codebase.
- Use Expo Go compatible solutions only.
- Prefer mock data and local state unless a task explicitly asks for backend integration.
- Use Expo Router patterns correctly for Tabs, Stack, and dynamic routes.
- Keep animation usage meaningful and performance-friendly.

---

## Tech Stack
Framework: Expo Router
Language: TypeScript
Styling approach: StyleSheet
State management: Context
Backend: None yet

---

## Code Style
- Use TypeScript.
- Keep imports at the top of the file.
- Prefer reusable components when duplication appears.
- Keep components readable and split large files when necessary.
- Use clear naming.
- Avoid deeply nested logic when a helper function is better.
- Prefer functional components and React hooks.
- Keep screen files focused on layout and flow.
- Move reusable UI pieces into components.
- Move reusable business logic into hooks or services.
- Use typed mock data for transactions, categories, and users.

---

## UI Expectations
Design style:
Modern / Clean / Premium / Minimal

Visual rules:
- Use consistent spacing.
- Use clear hierarchy.
- Prioritize readability.
- Keep layouts responsive.
- Avoid visual clutter.
- Use card-based layouts for dashboard and transaction lists.
- Use clear color indicators for income and expense.
- Use subtle Reanimated animations for transitions, cards, lists, and feedback states.
- Keep the interface mobile-first and Expo Go friendly.

---

## File Safety Rules
Safe areas to edit:
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

Do not edit unless task explicitly says so:
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

---

## Validation
Before marking any task as complete, run:
- npx tsc --noEmit
- npx expo-doctor
- npm run lint

If a command is unavailable because the script does not exist, report it clearly in the validation results instead of modifying package.json automatically.

---

## Task Completion Rules
At the end of each task, report:
- changed files
- summary of changes
- validation results
- blockers
- next suggested job