# 02-architecture.md

## App Structure
Routing system:
Expo Router

Main folders:
- app/ -> Expo Router route structure, screens, layouts, tabs, stacks, and dynamic routes.
- components/ -> Reusable UI components such as cards, buttons, inputs, transaction rows, summary cards, and empty states.
- hooks/ -> Custom hooks such as `useAuth`, transaction helpers, animation helpers, and shared screen logic.
- services/ -> Data access, AsyncStorage helpers, mock auth service, and transaction service logic.
- assets/ -> Images, icons, fonts, and static visual assets.
- constants/ -> App colors, spacing, radius, typography, and category definitions.
- data/ -> Mock JSON-style data for users, transactions, categories, and dashboard summaries.
- types/ -> Shared TypeScript types and interfaces.
- utils/ -> Formatting helpers such as currency formatting, date formatting, and transaction calculations.

## State Management
Current approach:
Context + Local State

Used for:
- Auth session state using a mock `useAuth` hook and AsyncStorage.
- Transaction list state during MVP.
- Form state for add/edit transaction screens.
- Derived dashboard values such as total income, total expense, and balance.

State management rules:
- Use React Context for app-wide state such as authentication.
- Use local component state for screen-specific form interactions.
- Avoid adding Zustand, Redux, or other state libraries unless explicitly requested.
- Keep derived financial calculations in helper functions when possible.

## Data Flow
Data source:
Local Mock Data + AsyncStorage

Flow summary:
The app starts by checking AsyncStorage for a saved mock user session. If a session exists, the user is routed into the authenticated tab layout. If no session exists, the user is shown the login/register flow.

Transaction and category data initially comes from local mock data files. Screens read this data through simple service/helper functions or directly imported typed mock data. Dashboard values are calculated from the transaction list using utility functions. Transaction detail screens receive the transaction `id` from the dynamic route and find the matching transaction from the mock data source.

For MVP, data does not need to sync with a real backend.

## Reusable Component Strategy
Reusable components should be created when:
- The same UI pattern appears in two or more screens.
- A UI block has a clear standalone purpose, such as `TransactionCard`, `SummaryCard`, `CategoryBadge`, or `PrimaryButton`.
- A component improves readability of a screen file.
- A component can be reused without carrying too much screen-specific logic.

Do not create abstraction when:
- The UI is used only once and is still easy to read.
- The abstraction would make props complex or unclear.
- The component depends too heavily on one specific screen.
- The extracted file would add more complexity than value.

## Screen Development Rules
- Keep screens focused.
- Move repeated UI into components.
- Keep logic out of UI where possible.
- Prefer simple and readable structure.
- Use Expo Router conventions for layouts, tabs, stacks, and dynamic routes.
- Keep route files responsible for screen composition, not heavy business logic.
- Use TypeScript types for route params where practical.
- Keep transaction detail lookup logic simple and safe.
- Handle missing transaction IDs with a clear fallback UI.
- Avoid deeply nested JSX when smaller components would improve readability.

## API / Service Layer
Service files location:
services/

Naming pattern:
- `authService.ts`
- `transactionService.ts`
- `storageService.ts`
- `categoryService.ts`

Service layer rules:
- Keep AsyncStorage access inside service files or hooks.
- Keep mock login/register/logout behavior inside auth-related service or hook files.
- Keep transaction lookup, filtering, and mock CRUD helpers inside transaction services.
- Do not call AsyncStorage directly from many unrelated screen files.
- Do not introduce real API calls unless a task explicitly asks for backend integration.

## Error Handling
Basic rule:
Errors should be handled with clear fallback UI and safe defaults.

Error handling examples:
- If no auth session exists, route the user to the auth flow.
- If AsyncStorage fails, show the user as logged out and avoid crashing.
- If a transaction ID does not exist, show a friendly “Transaction not found” state.
- If mock data is empty, show an empty state instead of a blank screen.
- If a form is invalid, show a readable validation message near the relevant field.

## Loading States
Basic rule:
Loading states should be simple, lightweight, and not block the app longer than necessary.

Loading state examples:
- Show an initial loading state while checking AsyncStorage session.
- Use small activity indicators or skeleton-style placeholders for dashboard cards if needed.
- Disable submit buttons while mock login/register actions are processing.
- Avoid complex loading systems during MVP.
- Keep loading UI consistent with the app’s clean and premium design style.

## Navigation Architecture
Expected route structure:

```txt
app/
├─ _layout.tsx
├─ index.tsx
├─ auth/
│  ├─ _layout.tsx
│  ├─ login.tsx
│  └─ register.tsx
├─ (tabs)/
│  ├─ _layout.tsx
│  ├─ index.tsx
│  ├─ transactions.tsx
│  ├─ add-transaction.tsx
│  └─ profile.tsx
└─ transaction/
   └─ [id].tsx