# Project: CurricFlow (Curriculum Management System)
# AI Coding Assistant Guidelines (CLAUDE.md)

## 🎯 Core Philosophy
You are an expert Next.js, React, and TypeScript engineer. Your goal is to write highly performant, scalable, and maintainable enterprise-level code. The UI must be professional, clean, intuitive, and extremely fast.

## 📐 1. Architectural Constraints & File Structure
- **Strict File Length Limit:** NO file shall exceed **400 lines of code**. If a file approaches this limit, immediately extract logic into custom hooks, utility functions, or smaller sub-components.
- **Strict Separation of Concerns:** Maintain a highly modular folder structure. Never mix domain logic with UI components.
  - `/components`: UI and presentational components only (further divided by feature).
  - `/services`: API calls, endpoints, and external integrations.
  - `/store/slices`: Redux slices for global client state.
  - `/hooks`: Custom React hooks, including TanStack Query hooks.
  - `/utils`: Pure, stateless helper functions and formatters.
  - `/providers`: Context and global wrapper providers (Redux Provider, QueryClientProvider, Theme).
  - `/types`: Global TypeScript interfaces and types.

## ⚡ 2. Performance & Scalability
- **Next.js App Router:** Default to Server Components (`React Server Components`) to minimize client bundle size. Only add `'use client'` at the lowest possible component level in the tree when interactivity (hooks, state, event listeners) is strictly required.
- **Data Fetching:** Use **TanStack Query** (React Query) for all asynchronous server state. 
  - Leverage stale-while-revalidate caching.
  - Keep hooks in the `/hooks` directory (e.g., `useCurriculum.ts`).
- **Client State Management:** Use **Redux Toolkit** ONLY for complex, global synchronous client state that multiple distant components need to access (e.g., complex multi-step forms, user session UI state). Do not use Redux for server data caching.
- **Dynamic Imports:** Use Next.js `dynamic` imports for heavy components or components not immediately visible on the initial page load (e.g., modals, complex charts).
- **Optimization:** Prevent unnecessary re-renders using `useMemo` and `useCallback` appropriately.

## 🎨 3. UI/UX & Styling Standards
- **Framework:** Use Tailwind CSS exclusively for styling. 
- **Utility Libraries:** Use `clsx` and `tailwind-merge` (via a `cn()` utility) to handle dynamic class names and avoid CSS conflicts.
- **Icons:** Use `lucide-react` for consistent, clean SVG iconography.
- **Loading Strategy - Skeleton First:** NEVER use basic loading spinners for layout loading. **Skeleton loaders are mandatory** for all async data fetching. Skeletons must mimic the exact shape and layout of the final rendered component to prevent Cumulative Layout Shift (CLS).
- **UX Rules:** Ensure all interactive elements have clear focus, hover, and active states. Build with accessibility (a11y) in mind (ARIA attributes, keyboard navigation).

## 🔒 4. Code Quality & TypeScript Rules
- **TypeScript:** Use strict TypeScript. `any` is strictly forbidden. Define comprehensive interfaces for all API responses, component props, and state objects.
- **Naming Conventions:**
  - Components/Files: PascalCase (e.g., `CurriculumTable.tsx`).
  - Hooks: camelCase starting with `use` (e.g., `useFetchCurricula.ts`).
  - Utils/Functions: camelCase (e.g., `formatDate.ts`).
  - Types/Interfaces: PascalCase (e.g., `CurriculumResponse`).
- **Self-Documenting Code:** Write clean code that explains itself. Only add comments for complex business logic, regex, or "why" a non-obvious technical decision was made.

## 🛠️ 5. AI Agent Workflow Instructions (Claude Code)
When generating or modifying code for this project, you MUST:
1. **Analyze First:** Before writing code, briefly explain the component breakdown and where the files will live to ensure it adheres to the 400-line rule.
2. **Skeleton Mandatory:** Whenever you create a component that fetches data, you must simultaneously generate and implement its corresponding `[ComponentName]Skeleton.tsx`.
3. **Type First:** Always define the TypeScript interfaces before implementing the logic.
4. **Refactor Proactively:** If you are asked to modify a file and it is currently at 350+ lines, your first action must be to propose an extraction refactor.

🚀 6. URL-Driven State (The Next.js Way)
Rule: Always use URL Query Parameters (via Next.js useSearchParams) for filtering, sorting, pagination, and active tabs instead of Redux or local state.

Why: This ensures that every specific view in the system is instantly shareable, bookmarkable, and survives a page refresh. It also offloads state management complexity from your client store.

🛡️ 7. Resilience & Error Handling
Rule: Never allow a component to fail silently or crash the entire application. All major feature modules must be wrapped in React Error Boundaries.

Rule: API error responses must be mapped to user-friendly toast notifications. Do not expose raw HTTP errors or stack traces in the UI.

🔐 8. Role-Based Access Control (RBAC)
Rule: The system handles sensitive academic data, so the UI must be strictly role-aware. Use a centralized utility (e.g., hasPermission(userRole, action)) to conditionally render administrative buttons, forms, and pages.

Rule: Never rely solely on client-side hiding for security; ensure all API calls made by the client also validate these roles, but the UI should gracefully reflect the user's permissions without flickering.

🧪 9. Pure Functions & Testability
Rule: Any complex business logic, data transformation, or curriculum calculation must be written as a pure function in the /utils directory.

Rule: These functions must be entirely decoupled from React components and hooks to ensure they are instantly testable and predictable.

📂 10. State Management Architecture (The "Where It Goes" Rule)
Redux Toolkit (Global UI & Complex Client State):
All Redux logic must live inside the /src/store directory. Slice files must be grouped by feature/domain, not by technical type.

/src/store/store.ts -> Main store configuration.

/src/store/hooks.ts -> Strictly typed useAppDispatch and useAppSelector (NEVER use raw useDispatch/useSelector in components).

/src/store/slices/authSlice.ts -> For current user session, permissions, and RBAC roles.

/src/store/slices/uiSlice.ts -> For global layout states (e.g., mobile sidebar toggle, global theme, complex multi-step modal states).

/src/store/slices/curriculumBuilderSlice.ts -> For heavy, multi-step interactive forms (like drafting a new curriculum offline before saving).

TanStack Query (Server State & API Caching):
All data fetching hooks must live in the /src/hooks/api directory, strictly organized by domain. Never write raw useQuery or fetch calls directly inside a UI component.

/src/hooks/api/curricula/useGetCurricula.ts -> Queries for fetching lists.

/src/hooks/api/curricula/useMutateCurriculum.ts -> Mutations for create/update/delete.

/src/hooks/api/users/useGetUsers.ts -> User management queries.

/src/hooks/api/reports/useGetAnalytics.ts -> System monitoring and metrics.

Query Keys:
Always use strongly typed, factory-pattern Query Keys in a centralized file (e.g., /src/utils/queryKeys.ts) to prevent typos and cache invalidation bugs. (e.g., queryKeys.curricula.list(filters)).