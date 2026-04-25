# 00-project-overview.md

## Project Name
Personal Finance Tracker

## One-Sentence Summary
Personal Finance Tracker is a mobile expense tracking app that helps users manage income, expenses, categories, and transaction details through a clean Expo Router interface.

## Main Purpose
The app exists to help users understand where their money goes, track daily financial activity, and review their income-expense balance from a simple mobile dashboard.

It is also designed as a strong Expo Router test project because it uses authentication flow, tab navigation, stack navigation, dynamic transaction detail routes, mock data, forms, AsyncStorage, and Reanimated animations.

## Problem It Solves
Many users lose track of small daily expenses and do not have a clear overview of their spending habits. This app solves that problem by organizing transactions into categories, showing financial summaries, and making individual transaction details easy to access.

## Target Audience
Individual users who want a simple, mobile-first way to track personal income and expenses, review spending categories, and manage their budget without using a complex finance platform.

## Core Features
1. Mock login and registration flow using a custom `useAuth` hook and AsyncStorage.
2. Dashboard showing income, expenses, balance, and categorized spending summaries.
3. Transaction list with mock income and expense data.
4. Transaction detail screen using dynamic Expo Router routes such as `/transaction/[id]`.
5. Smooth Reanimated transitions for cards, lists, tab interactions, and detail screens.

## MVP Scope
Included in MVP:
- Mock authentication with persisted session state.
- Dashboard with financial summary cards and category-based expense overview.
- Transaction list and transaction detail screens.
- Mock JSON data for income, expenses, categories, and users.
- Basic add/edit transaction form structure.
- Expo Router Tabs and Stack navigation setup.
- Reanimated-based UI animations.

Not included in MVP:
- Real backend integration.
- Real bank account connection.
- Multi-device sync.
- Push notifications.
- Advanced analytics or recurring transaction automation.
- Real payment or money transfer features.

## Main Screens
- Login / Register Screen
- Dashboard Screen
- Transactions Screen
- Transaction Detail Screen
- Add Transaction Screen
- Profile / Settings Screen

## User Flow
Example flow:
1. User opens the app.
2. User sees the login screen if there is no saved session.
3. User logs in with mock credentials or creates a mock account.
4. User lands on the dashboard.
5. User reviews balance, income, expenses, and spending categories.
6. User opens the transaction list.
7. User taps a transaction.
8. User sees the transaction detail page.
9. User can go back, add a new transaction, or navigate between tabs.

## Product Priorities
Priority 1:
Build a clean and reliable Expo Router navigation structure with auth flow, tabs, stack screens, and dynamic transaction routes.

Priority 2:
Create a polished dashboard and transaction experience using mock financial data, reusable components, and clear TypeScript types.

Priority 3:
Add meaningful Reanimated animations that improve the user experience without making the app feel overloaded or unstable.

## Notes
This project should remain Expo Go compatible. Native folders should not be edited unless a task explicitly requires it.

The first implementation should focus on mock data, local state, AsyncStorage session persistence, clean UI structure, and strong navigation architecture.

The app is intended for MVP, prototype, and internal AI tool testing purposes rather than production financial usage.