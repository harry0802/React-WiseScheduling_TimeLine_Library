# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**React-WiseScheduling_TimeLine_Library** is an industrial-grade smart manufacturing management system for the mold industry. It integrates production scheduling, real-time monitoring, and data visualization. The core functionality centers around an interactive timeline/Gantt chart for managing multi-area production schedules.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173
npm run build            # Production build (outputs to dist/)
npm run preview          # Preview production build
npm run lint             # Run ESLint validation

# Git commits
npx cz                   # Use Commitizen for conventional commits
```

**Environment Variables:**

- `VITE_API_BASE_URL`: API base URL (defaults to `/api` if not set)

## Core Architecture

### Technology Stack

**UI Framework:**

- React 18.3.1 with concurrent features
- React Router v6 with BrowserRouter (modern URL structure on Cloudflare Pages)
- Dual styling system:
  - **Styled-Components**: Global theming, design tokens, responsive utilities
  - **Material-UI (MUI)**: Component library for complex UI (dialogs, pickers, tables)

**State Management (Hybrid Approach):**

- **Redux Toolkit + RTK Query**: Primary state management for WiseScheduling API
- **TanStack Query (React Query)**: Alternative data fetching with simpler queries
- **Local state**: useState, useRef, useMemo/useCallback for component-level state

**Timeline/Visualization:**

- **vis-timeline 7.7.4**: Industrial-grade timeline library (critical dependency)
- **vis-data DataSet**: Reactive data structures for timeline items
- **embla-carousel-react**: Vertical carousel engine
- **recharts**: Chart visualizations

**Date/Time Handling:**

- **Day.js**: Primary date library for new code
- **Moment.js**: Legacy support (used for Taiwan locales)
- **date-fns**: MUI date pickers compatibility

### Directory Structure

```
src/
├── components/
│   ├── WiseScheduling/          # Core scheduling system (most complex)
│   │   ├── components/          # Schedule, machine status, dialogs
│   │   ├── hooks/               # Custom hooks (schedule, machine, timeRange)
│   │   ├── utils/               # Transformers, validators, date utilities
│   │   ├── services/            # RTK Query API slices
│   │   ├── configs/             # Constants, validations, machine config
│   │   └── assets/              # Styles and static assets
│   ├── ProjectCarousel/         # Vertical carousel with progress bar
│   ├── ShowcaseGallery/         # Project showcase component
│   └── ManufacturingLiveMonitor/ # Real-time OEE monitoring
├── page/                        # Route-level page components
├── layouts/                     # Layout wrappers (AppLayout with error boundary)
├── styles/                      # Global styles and theme
├── designTokens/                # Design system tokens (colors, spacing, typography)
├── hooks/                       # Shared custom hooks
├── store/                       # Redux store configuration
└── services/                    # API base configuration
```

### Routing Architecture

Two separate route hierarchies:

1. **Main Application** (AppLayout with navigation):

   - Home, Timeline, ProjectShowcase, WiseScheduling, About, Contact, etc.
   - Error boundary wraps all routes
   - Routes reset error boundary on navigation

2. **Manufacturing Monitor** (Separate layout):
   - DashboardEntry, RealTimeOEEMonitor
   - Full-screen monitoring interface

**Code Splitting:**

- Heavy components use custom `lazyLoad()` helper with configurable delay
- Route-level code splitting with React.lazy + Suspense

## Critical Patterns & Best Practices

### 1. Performance Optimization for vis-timeline

**IMPORTANT:** The timeline component uses refs to avoid expensive re-renders:

```javascript
// CORRECT: Use refs for vis-timeline instance and DataSet
const timelineRef = useRef(null)
const itemsDataRef = useRef(new DataSet([]))

// Update data through DataSet API, NOT React state
useEffect(() => {
  itemsDataRef.current.clear()
  itemsDataRef.current.add(transformedData)
}, [scheduleData])
```

**Never:**

- Store vis-timeline instance or DataSet in React state
- Re-initialize timeline on every render
- Use setState for timeline data updates

**Why:** vis-timeline initialization is expensive (1000+ items), and direct DataSet updates avoid React re-renders while maintaining reactivity.

### 2. Custom Hooks Hierarchy (WiseScheduling)

Hooks are organized in layers:

```javascript
// Data Layer (API fetching)
useAreaScheduleData(area, startTime, endTime) // RTK Query
useAreaMachines(area) // RTK Query

// Business Logic Layer
useTimelineData(machines, schedules) // Returns DataSet + groups
useTimelineConfig(items, timeRange) // vis-timeline options
useTimelineDialogs() // Dialog state management
useTimeRange() // Time range selection

// UI Interaction Layer
useMoveToNowHandler(timelineRef) // Navigation utilities
```

Always follow this layering when adding new functionality.

### 3. Data Transformation Pipeline

```
Raw API Data
  ↓ transformScheduleData() [apiTransformers.js]
vis-timeline Format { id, group, start, end, content, className, ... }
  ↓ DataSet.add()
Timeline Display
```

**Files:**

- `WiseScheduling/utils/transformers/apiTransformers.js`: API → timeline format
- `WiseScheduling/utils/validators/statusValidators.js`: Status validation
- `WiseScheduling/utils/date/dateUtils.js`: Date manipulation

### 4. Code Organization Pattern

Every file follows this structure (maintained via comments):

```javascript
//! =============== 1. Setup & Constants ===============
//! =============== 2. Types & Interfaces ===============
//! =============== 3. Core Functionality ===============
//! =============== 4. Utility Functions ===============
```

**Always maintain this structure** when modifying files to reduce cognitive load.

### 5. Styling Approach

**When to use Styled-Components:**

- Page-level layouts
- Custom components needing theme access
- Responsive utilities (`${({ theme }) => theme.breakpoints.tablet}`)
- Design token integration

**When to use MUI:**

- Dialogs, modals, date pickers
- Form controls (TextField, Select, Button for forms)
- Tables, tabs, chips
- Components requiring accessibility features

**Design Tokens:** Located in `src/designTokens/`:

- `colors.js`: Background, accent, border, text, functional colors
- `spacing.js`: 8px baseline grid (xs: 4px, sm: 8px, md: 16px, etc.)
- `typography.js`: Font families, weights, sizes, line heights
- `borders.js`: Border radius and widths
- `effects.js`: Shadows and transitions

Always use design tokens instead of hardcoded values.

### 6. Form Handling Pattern

Use React Hook Form + Zod:

```javascript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  // Define schema
})

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(schema)
})
```

See `WiseScheduling/components/schedule/ItemDialog/` for examples.

### 7. Error Boundary Strategy

- **AppLayout** wraps all routes with `react-error-boundary`
- Error boundary resets on route change (`resetKey={location.pathname}`)
- Display user-friendly error messages (avoid stack traces in production)

### 8. API Layer (RTK Query)

**Base configuration:**

```javascript
// services/apiSlice.js
const wiseSchedulingApiSlice = createApi({
  reducerPath: 'wiseSchedulingApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ['MachineStatus', 'Option', 'schedule'],
  endpoints: () => ({})
})
```

**Extending endpoints:**

```javascript
// schedule/smartSchedule.js
export const smartScheduleApi = wiseSchedulingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmartSchedule: builder.query({
      query: ({ productionArea, startTime, endTime }) => ({
        url: '/schedule',
        params: { productionArea, startTime, endTime }
      }),
      providesTags: ['schedule']
    })
  })
})
```

Always use `injectEndpoints` pattern for new API endpoints.

## Configuration Files

### Machine Configuration

`WiseScheduling/configs/constants/MACHINE_CONFIG.js`:

- `AREAS`: Production areas ['A', 'B', 'C']
- `STATUS_TYPES`: Machine statuses (Setup, Running, Stopped, Paused, Completed, etc.)
- `COLORS`: Status color mappings

### Timeline Configuration

`WiseScheduling/configs/validations/schedule/timeline/timelineConfigs.js`:

- `TIME_RANGES`: Hour, day, week, month configurations
- `TIMELINE_OPTIONS`: vis-timeline options (zoom levels, locales, templates)

### Date Utilities

`WiseScheduling/utils/date/dateUtils.js`:

- `getTimeWindow(range, centerTime)`: Calculate view window for time range
- `formatToFormDateTime(date)`: HTML datetime-local format
- `prepareFormDateValues(item)`: Initialize form dates
- `safeParseDate(date)`: Error-safe date parsing

## Common Development Tasks

### Adding a New Production Area

1. Update `MACHINE_CONFIG.AREAS` in `configs/constants/MACHINE_CONFIG.js`
2. Add area to machine query filters
3. Update UI area selector component
4. Test data transformation pipeline

### Adding a New Machine Status

1. Add to `MACHINE_CONFIG.STATUS_TYPES`
2. Add color mapping in `MACHINE_CONFIG.COLORS`
3. Update status validators in `utils/validators/statusValidators.js`
4. Create status form in `components/schedule/ItemDialog/StatusForms/`
5. Add form to dialog manager

### Modifying Timeline Appearance

1. Update `TIMELINE_OPTIONS` in `configs/validations/schedule/timeline/timelineConfigs.js`
2. Modify `template` functions for HTML content
3. Adjust CSS in `WiseScheduling/assets/schedule.css`
4. Test across all time ranges (hour, day, week, month)

### Adding a New Time Range

1. Add to `TIME_RANGES` in `timelineConfigs.js`
2. Update `getTimeWindow()` in `dateUtils.js`
3. Add button in `TimelineControls.jsx`
4. Test zoom levels and transitions

## Important Technical Decisions

### Why BrowserRouter?

Using `createBrowserRouter` for modern URL structure (no hash `#` in URLs). Cloudflare Pages natively supports client-side routing, making hash routing unnecessary. This provides cleaner URLs and better SEO.

### Why Dual State Management?

- **RTK Query**: Complex caching, invalidation, optimistic updates for WiseScheduling
- **React Query**: Simpler queries, better DevTools, potential future migration path

### Why vis-timeline?

- Industrial-grade performance (handles 1000+ items)
- Built-in drag-and-drop, zoom, pan
- Time range navigation
- Group management
- Mature library with extensive documentation

**Alternatives considered:** Custom D3.js solution (too complex), react-calendar-timeline (insufficient features)

### Why ref-based timeline updates?

vis-timeline re-initialization is expensive. Using refs allows:

- Direct DataSet API calls without React re-renders
- Timeline instance persistence across renders
- Better performance for real-time updates

## Testing Strategy

**Current state:** Minimal test coverage, no test runner configured.

**When adding tests:**

- Use React Testing Library for component tests
- Mock RTK Query with MSW (Mock Service Worker)
- Test custom hooks with `@testing-library/react-hooks`
- Focus on business logic (transformers, validators, utilities)

## Deployment

- **Platform:** Cloudflare Pages
- **Base path:** `/` (root path, configured in vite.config.js)
- **Build output:** `dist/`
- **Deploy:** Automatic deployment via GitHub integration (pushes to `dev` or `main` branch)

## Code Style Guidelines

1. **Comments:** Maintain structured comment sections (`//!` for major sections)
2. **Naming:**
   - Components: PascalCase
   - Hooks: `use` prefix + PascalCase
   - Utilities: camelCase
   - Constants: UPPER_SNAKE_CASE
3. **File organization:** Follow existing patterns (hooks/, utils/, components/ structure)
4. **Memoization:** Use React.memo for pure components, useMemo for expensive calculations
5. **Error handling:** Always handle API errors, use try-catch for date parsing
6. **Accessibility:** Add ARIA labels to interactive elements

## Known Limitations

1. **No TypeScript:** JavaScript-only codebase (type safety via JSDoc recommended)
2. **Limited i18n:** Hardcoded Chinese text (no i18n library)
3. **Testing:** Minimal coverage, no CI/CD pipeline
4. **API mocking:** No development mock server
5. **Error tracking:** No production error monitoring (Sentry, etc.)

## Resources

- vis-timeline docs: https://visjs.github.io/vis-timeline/docs/timeline/
- RTK Query docs: https://redux-toolkit.js.org/rtk-query/overview
- Styled-components theming: https://styled-components.com/docs/advanced#theming
- MUI customization: https://mui.com/material-ui/customization/theming/

