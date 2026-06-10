# CurricFlow UI Redesign Plan
## Meru University — Minimalist Green & Gold Design System

**Goal:** Simplify the UI to a clean, minimalist design using only the university's brand colors
(green + gold + neutral grays). Make navigation obvious, labels plain, and every screen easy
for non-technical staff to understand and use.

**Color Rule (strict):**
- `--must-green: #00D666` → Primary actions, active nav, success, focus rings
- `--must-gold: #f0b41c` → Accents, secondary highlights, warnings, badges
- Neutrals only: `#0f172a` (headings), `#475569` (body text), `#f8fafc` (page background), `#ffffff` (cards), `#e2e8f0` (borders/dividers)
- **NO teal, no blue, no purple, no multi-color gradients anywhere**

**Accessibility Rule:** Every interactive element must have a visible focus ring, a readable contrast
ratio (≥ 4.5:1), and a text label (not icon-only).

**Non-Technical User Rule:** All navigation labels, button text, and headings must use plain English.
No abbreviations, no system jargon.

---

## Phase 1 — Design Foundation (Start Here)
**Scope:** Tailwind config, globals.css, base UI primitives only. No pages touched yet.
**Why first:** Every subsequent phase depends on these tokens being correct.

### 1.1 — Clean the Tailwind Config
- Remove: `must-teal`, `must-blue`, all gradient utilities
- Keep only: `must-green` family, `must-gold` family, semantic neutrals
- Add: `must-green-50` (#f0fdf6) and `must-gold-50` (#fffbeb) for subtle tinted backgrounds

### 1.2 — Rewrite globals.css
- Define two themes: default (light) only. No dark mode — non-technical users in an office setting.
- CSS variables:
  ```
  --color-primary: #00D666
  --color-primary-dark: #009944
  --color-primary-light: #B3F5CC
  --color-accent: #f0b41c
  --color-accent-dark: #d99e0a
  --color-page-bg: #f8fafc
  --color-card-bg: #ffffff
  --color-border: #e2e8f0
  --color-text-heading: #0f172a
  --color-text-body: #334155
  --color-text-muted: #64748b
  ```
- Remove all custom animation keyframes except: `fade-in`, `slide-up`, `shimmer`
- Set body font: Inter. Heading font: Montserrat (keep current).

### 1.3 — Rewrite Base UI Primitives (`/components/ui/`)
Rebuild these 5 components cleanly before touching any page:

**Button (`button.tsx`):**
- `primary` → solid green bg, white text
- `secondary` → white bg, green border and text
- `accent` → solid gold bg, dark text
- `ghost` → transparent, green text on hover
- `destructive` → solid red bg, white text
- All sizes: `sm`, `md` (default), `lg`
- Always: `focus-visible:ring-2 focus-visible:ring-must-green focus-visible:ring-offset-2`

**Card (`card.tsx`):**
- One variant only: white bg, `border border-border`, `rounded-xl`, `shadow-sm`
- Remove: glass, elevated-special, gradient-anything

**Badge (`badge.tsx`):**
Status badges using only these combinations (covers all workflow stages):
- Draft → gray bg + gray text
- Pending Review → gold-50 bg + gold-dark text
- Approved → green-50 bg + green-dark text
- Rejected / Returned → red-50 bg + red-dark text
- Accredited → green bg + white text

**Input (`input.tsx`):** (new primitive — currently missing a dedicated file)
- Clean border, green focus ring, error state (red border), disabled state (gray bg)
- Always include a visible label above

**Skeleton (`skeleton.tsx`):**
- Single shimmer animation, neutral gray palette
- No color-coded skeletons

**Deliverable:** All 5 primitives working + a simple `/components/ui/README.md` listing each
variant visually in comments.

---

## Phase 2 — Authentication Pages
**Scope:** Login, Forgot Password, Reset Password pages + auth layout
**Depends on:** Phase 1 complete

### What to build:
- **Login page:** Clean two-column card (like the current design but stripped of all extra color).
  Left panel: solid green bg, white Meru University logo, university name, system name, one-line
  description. Right panel: white, "Sign In" heading in heading color, username + password fields,
  remember me checkbox, gold "Forgot password?" link, large green "Sign In" button, help text at
  bottom.
- **Forgot Password page:** Single centered card. Plain heading "Forgot your password?", one
  email/username input, green "Send Reset Link" button, "Back to Sign In" text link.
- **Reset Password page:** Same centered card. New password + confirm password fields, green
  "Set New Password" button.
- Remove `AuthMobileHeader` — replace with the Meru logo centered at top on small screens.

### Accessibility checkpoints:
- [ ] Form labels explicitly associated with inputs (htmlFor / id)
- [ ] Error messages linked to their field via `aria-describedby`
- [ ] Tab order is logical (top → bottom)
- [ ] "Sign In" button is the only primary action — no competing gold or teal buttons

---

## Phase 3 — Shared Navigation (Sidebar + Header)
**Scope:** `AdminSidebar`, `AdminHeader`, `UserSidebar`, `UserHeader`
**Depends on:** Phase 1 complete

### What to build — Sidebar (shared pattern for admin and user):
- White background, left border `border-r border-border`
- Logo area at top: Meru crest + "CurricFlow" name
- Navigation items: green left border indicator when active, green text + green-50 bg on active,
  gray text on inactive, green bg on hover
- Plain English labels (see table below)
- Section dividers: thin gray line + small gray section label (e.g., "MANAGEMENT", "SYSTEM")
- Collapsed on mobile — hamburger in header triggers slide-in overlay

**Plain English label mapping (Admin):**

| Current Label | New Label |
|---|---|
| Dashboard | Overview |
| Admin All Curricula | All Programmes |
| Admin Curriculum Tracking | Track Progress |
| Admin User Management | Manage Users |
| Academic Structure | Schools & Departments |
| Admin System Monitoring | System Health |
| Admin Reports | Reports |
| Admin Notifications | Notifications |
| Audit Logs | Activity Log |
| Admin Settings | Settings |

**Plain English label mapping (User):**

| Current Label | New Label |
|---|---|
| Dashboard | My Dashboard |
| Curricula | My Programmes |
| Analytics | Reports |
| Settings | My Settings |

### What to build — Header:
- White bg, bottom border `border-b border-border`
- Left: hamburger (mobile) + current page title (plain English, derived from route)
- Right: notification bell (gold badge if unread count > 0), user name + role label, logout button
- Remove: search bar from header (move search to individual pages where needed)
- Keep: system health dot (green/red) — but label it "System OK" / "System Issue" in text, not
  just a color dot

---

## Phase 4 — User Dashboard
**Scope:** `/user/dashboard` page + all user-dashboard components
**Depends on:** Phase 1 + 3 complete

### What to build:
- **Greeting bar:** "Good morning, [Name]" + role badge (gold pill)
- **4 metric cards:** white cards with a small green or gold left border accent (not full gradient
  tops). Icons in green-50 circle. Plain labels: "Total Programmes", "Schools", "Departments",
  "Pending Your Action" (the last one in gold if count > 0)
- **"Needs Your Action" section:** If the user has pending approvals/submissions, show a clean
  card list here at the top — the most important thing first. Gold left border.
- **Schools & Programmes list:** Clean accordion-style list. School name → expand → shows
  programmes as rows with status badge. No heavy card grid.
- **Search:** Simple search bar above the list, no multi-filter complexity for user view

---

## Phase 5 — Admin Dashboard
**Scope:** `/admin/dashboard` page + all admin/dashboard components
**Depends on:** Phase 1 + 3 complete

### What to build:
- **4 metric cards:** same style as user cards (white + left border accent). Labels: "Total
  Programmes", "In Progress", "Approved This Year", "Need Attention"
- **Workflow Bottlenecks:** Simple horizontal step indicator showing count of programmes stuck
  at each stage. Each stage = a pill. Gold color for stages with count > 0.
- **Recent Activity:** Clean table-style list (no heavy card). Columns: Programme name, Stage,
  Last Action, Time. Status badge in Stage column.
- **Quick Actions:** 3 buttons max — "Add New Programme", "View All Programmes", "Export Report".
  Green primary for first, secondary for rest.
- **System Alerts:** Collapsible panel at bottom. Only shown if there are alerts.
- Remove: `SystemAlerts` as always-visible widget — it creates visual noise when empty

---

## Phase 6 — Curricula Management Pages
**Scope:** Admin curricula list, create curriculum, curriculum detail/edit
**Depends on:** Phase 1 + 3 complete

### What to build:
- **Curricula list page:** Page header with title + "Add New Programme" green button (top right).
  Filter bar below header: search input + status filter dropdown + school filter dropdown.
  Simple table: columns = Programme Name | School | Department | Stage | Last Updated | Actions.
  Status badge in Stage column. Row hover = green-50 bg. No card grid — table is cleaner for
  this many items.
- **Create Curriculum form:** Full-page form (not modal) for complex creation. Step indicator
  at top (Step 1 of 3 style). Each step = one card. Green "Next" button, ghost "Back" button.
- **Curriculum detail page:** Left column: status timeline (vertical steps showing current stage,
  completed stages in green, upcoming in gray). Right column: programme info + action card (what
  the current user can do). Comments/history at bottom.

---

## Phase 7 — Workflow Action Pages
**Scope:** All role-based workflow action pages (approve, reject, send back, submit)
**Depends on:** Phase 6 complete

These pages are where most non-technical users spend their time. Clarity is critical.

### What to build:
- **Action card:** Always visible at the top of the curriculum detail. Plain heading:
  "What would you like to do?" Buttons stacked vertically on mobile, horizontal on desktop.
  Primary action (Approve) = green. Send Back = gold. Reject = destructive red.
- **Confirmation modal:** Before any action — plain English summary: "You are about to **approve**
  [Programme Name]. This will send it to [Next Stage]. Are you sure?" Two buttons: "Yes, proceed"
  (green) and "Cancel" (ghost).
- **Comment/reason field:** Required on Reject and Send Back. Simple textarea with label
  "Reason (required)". Error if submitted empty.
- **Success state:** After action, show a full-page confirmation card: green checkmark icon,
  "Done! [Programme Name] has been sent to [Next Stage]." + "Back to dashboard" button.

---

## Phase 8 — User Management & Academic Structure
**Scope:** `/admin/admin-user-management`, `/admin/academic-structure`
**Depends on:** Phase 1 + 3 complete

### User Management:
- Clean table: Name | Email | Role | Status | Actions
- Role shown as badge (color per role, using gold/green/gray only)
- "Add User" button top right
- Add/Edit User: simple form modal (not full page)
- Deactivate/Activate toggle in row actions

### Academic Structure:
- Two tabs: "Schools" and "Departments"
- Simple tables in each tab
- Inline "Add" row at bottom of table (simpler than a modal for basic records)
- Confirmation modal for delete

---

## Phase 9 — Reports, Audit Log & Notifications
**Scope:** Reports page, audit log, notifications page
**Depends on:** Phase 1 + 3 complete

### Reports:
- Report cards grid: each card = report type (icon + title + description + "Generate" button)
- Recent reports table below: File name | Generated by | Date | Download link
- Keep it simple — no analytics charts in this phase

### Audit Log:
- Full-width table: Action | User | Programme | Date/Time
- Filter by date range and user
- No complex visualizations

### Notifications:
- List view: unread at top (bold), read below (normal weight)
- Each row: icon (green for info, gold for warning, red for alert) + message + time
- Mark all as read button (top right)

---

## Phase 10 — Landing Page & Polish
**Scope:** Landing page, about page, empty states, loading states, final accessibility pass
**Depends on:** All previous phases complete

### Landing Page:
- Hero: white page, large Meru crest centered, "Curriculum Tracking System" heading, one-line
  description, single green "Sign In" CTA button. No complex hero image/animation.
- Features section: 3 cards in a row. Icon (green) + plain heading + 1-sentence description.
- Workflow preview: numbered steps (1-5) in a simple horizontal timeline.
- Footer: links only. No heavy footer.

### Polish checklist:
- [ ] All empty states have an icon + heading + description + action button
- [ ] All loading states use skeleton (no spinners for layout)
- [ ] All toast notifications follow the Badge color rule (green=success, gold=warning, red=error)
- [ ] Focus rings visible on all interactive elements
- [ ] All images have alt text
- [ ] Page titles are descriptive (browser tab shows meaningful name)
- [ ] Mobile layouts tested at 375px and 768px
- [ ] Print stylesheet for reports (basic — no sidebar/header in print)

---

## Execution Order Summary

| Phase | What | Est. Complexity |
|---|---|---|
| 1 | Design tokens + base UI primitives | Low |
| 2 | Auth pages (Login, Forgot PW, Reset PW) | Low |
| 3 | Sidebar + Header navigation | Medium |
| 4 | User Dashboard | Medium |
| 5 | Admin Dashboard | Medium |
| 6 | Curricula management pages | High |
| 7 | Workflow action pages | High |
| 8 | User management + Academic structure | Medium |
| 9 | Reports, Audit log, Notifications | Low–Medium |
| 10 | Landing page + final polish | Low |

**Rule:** Do not start a phase until the previous one passes a visual review.
Each phase should be committed separately with a clear commit message.

---

## What We Are NOT Doing (Scope Boundaries)

- No dark mode
- No theme switcher
- No complex charts or data visualizations (Phase 9 scope boundary)
- No animation library — only the 3 CSS animations defined in Phase 1
- No new dependencies — use only what is already installed
- No changes to API services, hooks, or Redux slices — UI-only redesign
