# 🎓 CurricFlow: Curriculum Management System
## AI Coding Assistant Guidelines & System Context

---

## 🏢 PROJECT CONTEXT: Curriculum Tracking System — Full Project Explanation

**1. What is this system for?**
This system is a special website to help the university keep track of new study programs (called "curricula") as they go through different levels of checking and approval. It helps everyone involved to know exactly where each curriculum is, what needs to be done, and who is responsible for it.

**2. How does the curriculum process work?**
Imagine you are making a new school subject. It starts at one place, then goes through several important steps before it’s finally approved for students to learn. Here’s how that happens:
* **Step 1: Department Level** - The department creates the new curriculum and sends it to the School Board.
* **Step 2: School Board** - Checks if the new curriculum already exists (no duplicates allowed!). If duplicates exist, it is rejected. If no duplicates, they "take ownership" and send it to the Dean Committee.
* **Step 3: Dean Committee** - The most important step. Checks for mistakes, problems, and how it fits with other programs. If errors exist, it is sent back to the School Board. If okay, it moves to the Senate.
* **Step 4: Senate** - Checks for mistakes again. Sends back to Dean Committee if errors exist. If okay, approved and moves to Quality Assurance.
* **Step 5: Quality Assurance (QA) Committee** - Reviews to ensure it meets university and government (CUE) rules. Sends back to Dean if errors exist. If good, moves to Vice Chancellor.
* **Step 6: Vice Chancellor** - Approves and pays CUE for an external review.
* **Step 7: CUE External Review** - Reviews from outside the university and sends results back to Vice Chancellor.
* **Step 8: Site Inspection** - QA visits the university. If okay, curriculum is officially accredited.
* **Step 9: Review Every 5 Years** - Curriculum reviewed every 5 years to keep it updated.

**3. Important Rules and Features of the System**
* **A. User Logins and Roles:**
    * *Department Member:* Create and submit to School Board.
    * *School Board:* Check duplicates, approve/reject, send to Dean.
    * *Dean Committee:* Check errors, approve/send back.
    * *Senate:* Approve or send back.
    * *Quality Assurance:* Review, approve, send back.
    * *Vice Chancellor:* Final approval and payment.
    * *CUE (External):* External review.
    * *Admin (QA role):* Monitor all progress, send reminders, export reports.
* **B. Workflow is Linear:** Moves step-by-step. Can be sent back to the previous group to fix errors.
* **C. Comments, Documents, and History:** Users can write comments, upload files/revisions. System keeps full history of who did what and when.
* **D. Notifications and Reminders:** Email/SMS alerts for pending actions, delays, Vice Chancellor reminders to CUE, and QA inspection prep.
* **E. Unique Tracking Number:** Each curriculum gets a special code.
* **F. Export and Search:** Search by name/status/stage. Export to PDF/Excel.
* **G. Admin Page (QA role):** QA acts as system admin. See all curricula, spot delays, send manual reminders, control reporting.
* **H. Mobile-Friendly Design:** Works well on phones/tablets.

**4. How Users Navigate the System (Simple Guide)**
* First, everyone lands on the landing page and the userdashboard without loggin in then now those with permissions  logs in with their username and password.
* After login, they see the Dashboard with: A list of curricula they are responsible for, buttons to create new curricula, and notifications.
* From the Dashboard: Click a curriculum to see details/history. Take allowed actions (approve, reject, comment). Upload new versions.
* Admin users (QA role) can: See all curricula across all departments. Spot delays. Export reports.

**5. Summary of Key System Features**
* Role-Based Access
* Linear Workflow
* Comments & Document Upload
* Notifications & Reminders
* Unique Tracking Number
* History Log
* Export & Search
* Mobile-Friendly Design
* Admin Dashboard

---

## 🎯 Core Philosophy

You are an expert **Next.js**, **React**, and **TypeScript** engineer.

**Your Mission:**
- Write highly performant, scalable, and maintainable enterprise-level code
- Design professional, clean, intuitive, and extremely fast UIs
- Maintain strict code quality and architectural standards
- Execute a **Zero-Failure Mandate**: Ensure the frontend gracefully handles all API and state errors without crashing.

---

## 📐 1. Architectural Constraints & File Structure

### ✅ File Length Rule
- **Maximum 400 lines per file**
- Extract logic into custom hooks, utilities, or sub-components when approaching limit

### 📁 Folder Structure & Separation of Concerns
/components      → UI and presentational components only (organized by feature)
/services        → API calls, endpoints, and external integrations
/store/slices    → Redux slices for global client state
/hooks           → Custom React hooks, including TanStack Query hooks
/utils           → Pure, stateless helper functions and formatters
/providers       → Context and global wrapper providers
/types           → Global TypeScript interfaces and types

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

### Skeleton Gate Rule (TanStack Query) 🚨 CRITICAL
- **NEVER gate a skeleton on local `useState` loading flags** (e.g., `isLoading`, `statsLoading`) passed down from a parent page component.
- Local `useState` **always resets to its initial value on every mount**. Because Next.js unmounts page components on navigation, a flag initialised as `useState(true)` will be `true` again every time the user returns to the page — making the skeleton flash on every visit even when TanStack Query already has fresh cached data.
- **✅ ALWAYS gate skeletons exclusively on TanStack Query's `isPending` flag combined with a data-absence check:**
  ```tsx
  // CORRECT — skeleton only on the very first load (no cached data)
  if (isPending && !data) return <Skeleton />

  // WRONG — flashes skeleton on every navigation return
  if (localLoadingState || isPending) return <Skeleton />
  ```
- `isPending` is `false` the moment TanStack Query has any cached data for that query key, so returning to a page always renders data instantly.
- Local loading flags (from `useState`) are still valid for button states (e.g., disabling a Refresh button while re-fetching) — just never use them to control skeleton visibility.

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
1. **Analyze:** Explain component breakdown and file locations, considering the specific User Role and Project Context.
2. **Verify:** Ensure 400-line rule compliance.
3. **Plan:** Propose extraction refactors if needed.

### Mandatory Practices
1. **Skeleton Components:** Always generate `[ComponentName]Skeleton.tsx` with data-fetching components.
2. **Types First:** Define TypeScript interfaces before logic.
3. **Refactor Proactively:** If a file is 350+ lines, propose extraction immediately.

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


### TanStack Query (Server State & API Caching)

All data-fetching hooks in `/src/hooks/api`, organized by domain:

/src/hooks/api/curricula/useGetCurricula.ts
→ Queries for fetching lists

/src/hooks/api/curricula/useMutateCurriculum.ts
→ Mutations for create/update/delete

/src/hooks/api/users/useGetUsers.ts
→ User management queries

/src/hooks/api/reports/useGetAnalytics.ts
→ System monitoring and metrics


❌ Never write raw `useQuery` or `fetch` calls directly in UI components.

### Query Keys Strategy
- Use **strongly typed, factory-pattern Query Keys**
- Centralized file: `/src/utils/queryKeys.ts`
- Prevents typos and cache invalidation bugs
- Example: `queryKeys.curricula.list(filters)`

---

## 🔗 11. API Integration & Backend Data Rules (CRITICAL)

### The Golden Rule of Data Fetching: Stats vs. Lists
- **🛑 NEVER Calculate Stats from Lists:** Do not calculate dashboard totals (e.g., total curricula, approved count) by reading the `.length` of paginated list endpoints.
- **✅ Use Dedicated Endpoints:** ALWAYS use the dedicated statistics endpoints (e.g., `/api/v1/stats/summary` or `/stats`) to populate Metric Cards and Dashboard Headers.
- **✅ Lists are for UI:** Use paginated list endpoints (`/curriculums?page=0&size=20`) strictly for populating Tables and Grids.

### Reusability & The Interceptor
- **Centralize API Calls:** All Axios calls MUST be defined inside `/src/services`. Because these endpoints are shared across User, Admin, and Landing pages, they must be reusable.
- **Global Interceptor:** All network requests must use the custom `axiosClient`. This handles attaching JWT tokens, safely refreshing 401s, and unwrapping the Spring Boot `ApiResponse` DTOs. Do not use raw inline `axios.get()` inside components.

### DTO Mapping (Data Transfer Objects)
- Frontend TypeScript interfaces must match the backend JSON payload exactly.
- Always unwrap the backend wrapper (e.g., `response.data.data`) in the Service layer before returning it to the React UI.
- Map deeply nested objects (like `department.school.id`) to flat fields (`schoolId`) in the Service layer so components don't crash looking for undefined properties.