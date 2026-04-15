# 🎓 CurricFlow: Curriculum Management System
## AI Coding Assistant Guidelines

---

## 🎯 Core Philosophy

You are an expert **Next.js**, **React**, and **TypeScript** engineer.

**Your Mission:**
- Write highly performant, scalable, and maintainable enterprise-level code
- Design professional, clean, intuitive, and extremely fast UIs
- Maintain strict code quality and architectural standards

---

## 📐 1. Architectural Constraints & File Structure

### ✅ File Length Rule
- **Maximum 400 lines per file**
- Extract logic into custom hooks, utilities, or sub-components when approaching limit

### 📁 Folder Structure & Separation of Concerns

```
/components      → UI and presentational components only (organized by feature)
/services        → API calls, endpoints, and external integrations
/store/slices    → Redux slices for global client state
/hooks           → Custom React hooks, including TanStack Query hooks
/utils           → Pure, stateless helper functions and formatters
/providers       → Context and global wrapper providers
/types           → Global TypeScript interfaces and types
```

**Golden Rule:** Never mix domain logic with UI components.

---

## ⚡ 2. Performance & Scalability

### Server Components (Default)
- Use **React Server Components** by default to minimize client bundle size
- Only add `'use client'` at the **lowest possible level** when interactivity is required
- This includes: hooks, state, event listeners

### Data Fetching
- Use **TanStack Query** (React Query) for all asynchronous server state
- Leverage stale-while-revalidate caching
- Keep hooks in `/hooks` directory (e.g., `useCurriculum.ts`)

### Client State Management
- Use **Redux Toolkit** ONLY for:
  - Complex, global synchronous client state
  - Multi-step forms
  - UI state accessed by distant components
- ❌ Do NOT use Redux for server data caching

### Optimization Techniques
- **Dynamic Imports:** Heavy components, modals, complex charts
- **useMemo & useCallback:** Prevent unnecessary re-renders
- Follow Next.js performance best practices

---

## 🎨 3. UI/UX & Styling Standards

### Styling Framework
- Use **Tailwind CSS** exclusively
- Use `clsx` and `tailwind-merge` (via `cn()` utility) for dynamic classes

### Iconography
- Use **lucide-react** for consistent, clean SVG icons

### Loading Strategy: Skeleton First ⚠️
- **NEVER use basic spinners** for layout loading
- **Skeleton loaders are MANDATORY** for all async data fetching
- Skeletons must mimic exact shape and layout to prevent CLS (Cumulative Layout Shift)

### User Experience (UX)
- ✅ Clear focus, hover, and active states on interactive elements
- ✅ Full accessibility (a11y): ARIA attributes, keyboard navigation
- ✅ Smooth transitions and professional polish

---

## 🔒 4. Code Quality & TypeScript Rules

### TypeScript Standards
- Use **strict TypeScript** everywhere
- ❌ `any` is **strictly forbidden**
- Define comprehensive interfaces for:
  - API responses
  - Component props
  - State objects

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components/Files | PascalCase | `CurriculumTable.tsx` |
| Hooks | camelCase + `use` prefix | `useFetchCurricula.ts` |
| Utils/Functions | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `CurriculumResponse` |

### Self-Documenting Code
- Write clean, expressive code
- Only add comments for:
  - Complex business logic
  - Regex patterns
  - Non-obvious technical decisions

---

## 🛠️ 5. AI Agent Workflow Instructions

### Before Writing Code
1. **Analyze:** Explain component breakdown and file locations
2. **Verify:** Ensure 400-line rule compliance
3. **Plan:** Propose extraction refactors if needed

### Mandatory Practices
1. **Skeleton Components:** Always generate `[ComponentName]Skeleton.tsx` with data-fetching components
2. **Types First:** Define TypeScript interfaces before logic
3. **Refactor Proactively:** If a file is 350+ lines, propose extraction immediately

---

## 🚀 6. URL-Driven State (The Next.js Way)

### Rule
Always use **URL Query Parameters** (via `useSearchParams`) for:
- Filtering
- Sorting
- Pagination
- Active tabs

**Instead of:** Redux or local state

### Benefits
- ✅ Every view is instantly shareable and bookmarkable
- ✅ Survives page refresh
- ✅ Reduces client state management complexity

---

## 🛡️ 7. Resilience & Error Handling

### Component Safety
- ❌ Never allow silent failures or application crashes
- ✅ Wrap all major feature modules in **React Error Boundaries**

### API Error Responses
- ✅ Map errors to user-friendly toast notifications
- ❌ Never expose raw HTTP errors or stack traces in UI

---

## 🔐 8. Role-Based Access Control (RBAC)

### Security-First Design
- The system handles sensitive academic data
- UI must be **strictly role-aware**
- Use centralized utility: `hasPermission(userRole, action)`

### Conditional Rendering
- ✅ Conditionally render administrative buttons, forms, pages
- ✅ API calls on the backend also validate roles
- ✅ UI gracefully reflects user permissions (no flickering)
- ❌ Never rely solely on client-side hiding for security

---

## 🧪 9. Pure Functions & Testability

### Business Logic
- Write complex logic as **pure functions** in `/utils`
- Entirely decouple from React components and hooks

### Benefits
- ✅ Instantly testable
- ✅ Predictable behavior
- ✅ Easy to maintain and reuse

---

## 📂 10. State Management Architecture (The "Where It Goes" Rule)

### Redux Toolkit (Global UI & Complex Client State)

All Redux logic lives in `/src/store` organized by feature/domain:

```
/src/store/store.ts
  → Main store configuration

/src/store/hooks.ts
  → Typed useAppDispatch and useAppSelector (NEVER raw useDispatch)

/src/store/slices/authSlice.ts
  → Current user session, permissions, RBAC roles

/src/store/slices/uiSlice.ts
  → Global layout states (sidebar toggle, theme, modals)

/src/store/slices/curriculumBuilderSlice.ts
  → Heavy, multi-step interactive forms
```

### TanStack Query (Server State & API Caching)

All data-fetching hooks in `/src/hooks/api`, organized by domain:

```
/src/hooks/api/curricula/useGetCurricula.ts
  → Queries for fetching lists

/src/hooks/api/curricula/useMutateCurriculum.ts
  → Mutations for create/update/delete

/src/hooks/api/users/useGetUsers.ts
  → User management queries

/src/hooks/api/reports/useGetAnalytics.ts
  → System monitoring and metrics
```

❌ Never write raw `useQuery` or `fetch` calls directly in UI components.

### Query Keys Strategy
- Use **strongly typed, factory-pattern Query Keys**
- Centralized file: `/src/utils/queryKeys.ts`
- Prevents typos and cache invalidation bugs
- Example: `queryKeys.curricula.list(filters)`