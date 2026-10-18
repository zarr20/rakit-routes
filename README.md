# @zarr20/rakit-routes

> High-performance, zero-config file-system based routing generator for React applications.

[![npm version](https://badge.fury.io/js/@zarr20/rakit-routes.svg)](https://www.npmjs.com/package/@zarr20/rakit-routes)
[![license](https://img.shields.io/npm/l/@zarr20/rakit-routes.svg)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

`@zarr20/rakit-routes` is a lightweight, zero-overhead file-based routing generator. It scans your React pages folder and automatically generates clean, type-safe route configurations with built-in code splitting via `React.lazy`.

---

<!-- LATEST_RELEASE_START -->
## 🆕 What's New in v1.1.5

- ♻️ update React router integration to use generatedRoutes function and conditional Outlet imports
<!-- LATEST_RELEASE_END -->

## 🚀 Key Features

- ⚡ **File-System Based Routing**: Automatically maps directory hierarchies into route paths (supports dynamic parameters `[id]` → `:id`).
- 🎯 **Intelligent Route Sorting**: Static routes always precede dynamic parameters, and catch-all/404 routes are placed at the end to prevent route shadowing.
- 🌐 **Catch-All & 404 Support**: Seamlessly converts `[...slug].tsx` into wildcard `/*` and `404.tsx` / `_404.tsx` into `*`.
- 🧩 **Zero-Config Import Resolution**: Automatically calculates relative import paths (`importBase`) based on output depth.
- ⚛️ **React Router Code Generation**: Generates clean route definitions with `React.lazy` for optimized code splitting.
- 🛠️ **CLI with Watch Mode**: Live route regeneration on file changes via `npx @zarr20/rakit-routes --watch`.
- ⚡ **Vite Plugin Included**: Zero-config Vite plugin for instant live reloading when creating pages.
- 📦 **Zero Runtime Dependencies**: Ultra-lightweight with full TypeScript declarations included.

---

## 📦 Installation

### From NPM Registry:
```bash
npm install @zarr20/rakit-routes
# or
pnpm add @zarr20/rakit-routes
# or
yarn add @zarr20/rakit-routes
```

---

## 💡 Usage

### 1. Zero-Config Script

Create a script file (e.g., `scripts/generate-routes.ts`):

```typescript
import { routerMapper } from '@zarr20/rakit-routes';

// Zero-config: writer and importBase are automatically resolved!
routerMapper({
  pages: { dir: './src/pages' },
  output: { dir: './src/shared/router' }
});

console.log('✅ Routes generated successfully');
```

Add the script to your `package.json`:

```json
{
  "scripts": {
    "routes:generate": "tsx scripts/generate-routes.ts",
    "dev": "npm run routes:generate && vite",
    "build": "npm run routes:generate && vite build"
  }
}
```

### 2. Using the CLI

Run directly via `npx`:

```bash
# Default (scans src/pages -> outputs src/shared/router/router.tsx):
npx @zarr20/rakit-routes

# Custom directories:
npx @zarr20/rakit-routes --pages src/views --out src/routes

# Live Watch mode (auto-regenerates on new/deleted files):
npx @zarr20/rakit-routes --watch
```

**CLI Options:**
| Option | Shorthand | Description | Default |
|---|---|---|---|
| `--pages <dir>` | `-p` | Directory containing page components | `src/pages` |
| `--out <dir>` | `-o` | Directory for the generated router file | `src/shared/router` |
| `--name <name>` | `-n` | Output file name without extension | `router` |
| `--watch` | `-w` | Watch pages directory and regenerate on changes | `false` |
| `--help` | `-h` | Display help message | |

### 3. Using the Vite Plugin

Automate route generation natively inside your Vite dev server:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rakitRoutesPlugin } from '@zarr20/rakit-routes/vite';

export default defineConfig({
  plugins: [
    react(),
    rakitRoutesPlugin({
      pagesDir: 'src/pages',
      outputDir: 'src/shared/router'
    })
  ]
});
```

Whenever you create, rename, or delete a page in `src/pages/`, routes regenerate automatically in milliseconds.

---

## 🗂️ Path & Route Conversion Rules

| File in `pages/` | Generated Route URL | Priority Order |
|---|---|---|
| `index.tsx` | `/` | Top |
| `about.tsx` | `/about` | High (Static) |
| `products/new.tsx` | `/products/new` | High (Static before dynamic) |
| `products/[id].tsx` | `/products/:id` | Medium (Dynamic parameter) |
| `users/[userId]/posts/[postId].tsx` | `/users/:userId/posts/:postId` | Medium (Dynamic parameters) |
| `(auth)/login.tsx` | `/login` | High (Route Group: parentheses stripped) |
| `(dashboard)/analytics.tsx` | `/analytics` | High (Route Group) |
| `(dashboard)/index.tsx` | `/` | Top (Route Group index) |
| `[...slug].tsx` | `/*` | Low (Catch-all wildcard) |
| `404.tsx` or `_404.tsx` | `*` | Lowest (Fallback) |

*Private folders and helper files starting with an underscore (e.g. `_components/`, `_hooks/`) as well as test files (`*.test.tsx`, `*.spec.tsx`) are automatically ignored.*

---

## ⚛️ React Router Integration

### Approach 1: Modern Data Router (`createBrowserRouter`) (Recommended)

The generated `router.tsx` exports `generatedRoutes()` which returns a `<React.Fragment>` containing all generated `<Route>` elements:

```tsx
// App.tsx
import { Suspense, useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { generatedRoutes } from "./shared/router/router";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route element={<AppLayout />}>
          {generatedRoutes()}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>,
      ),
    );
  }, []);

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

> 💡 **React Router Tip:** In React Router v6 & v7, `createRoutesFromElements()` and `<Routes>` require direct children to be `<Route>` or `<React.Fragment>`. Executing `{generatedRoutes()}` directly supplies a valid Fragment containing all nested and grouped route elements.

### Approach 2: Traditional JSX Router (`<BrowserRouter><Routes>`)

```tsx
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { generatedRoutes } from "./shared/router/router";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            {generatedRoutes()}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Approach 3: Global Auth or Custom Route Wrapper
If using config-only middleware with centralized auth:
```tsx
{generatedRoutes({
  auth: currentAuth,
  wrapper: ({ component: Component, meta, path }) => (
    <CustomWrapper component={Component} meta={meta} path={path} />
  )
})}
```

### Approach 4: Manual Mapping via `routerConfig`
```tsx
import { routerConfig } from "./shared/router/router";

{routerConfig.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
))}
```

---

## 🛡️ Route Groups, Middleware & Access Control

`@zarr20/rakit-routes` provides first-class support for **Route Groups** and **Directory Middleware** with **zero bundle overhead**. Unauthorized users are blocked at the router level without downloading lazy chunks.

### 1. Route Groups `(auth)`, `(dashboard)`, `(public)`
Group related pages into folders using parentheses `(...)`. The folder name is **stripped from the URL**, allowing you to organize files and apply group-specific middleware:

```
src/pages/
├── (auth)/
│   ├── _middleware.ts      # guestOnly: true (applies to /login, /register)
│   ├── login.tsx           # Resolves to URL: /login
│   └── register.tsx        # Resolves to URL: /register
└── (dashboard)/
    ├── _middleware.tsx     # Component Middleware (useAuth + RouteGuard)
    ├── analytics.tsx       # Resolves to URL: /analytics
    └── users/[id].tsx      # Resolves to URL: /users/:id
```

### 2. Middleware Patterns

`@zarr20/rakit-routes` supports two flexible middleware patterns:

#### 🌟 Pattern A: Component Middleware (`_middleware.tsx`) — Recommended for Hooks & Context
When your authentication logic depends on React Context or hooks (e.g. `useAuth()`), handle the gatekeeping **inside `_middleware.tsx`**. This keeps your root router completely clean and prevents router re-creation on auth state changes:

```tsx
// src/pages/(dashboard)/_middleware.tsx
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { RouteGuard } from "@zarr20/rakit-routes/client";
import { useAuth } from "@/context/AuthContext";

export const meta = {
  protected: true,
  roles: ["admin", "manager"],
};

export default function DashboardMiddleware() {
  const auth = useAuth();

  const authState = useMemo(
    () => ({
      isLogin: auth.isAuthenticated,
      roles: auth.user?.role ? [auth.user.role] : [],
    }),
    [auth.isAuthenticated, auth.user?.role],
  );

  return (
    <RouteGuard meta={meta} auth={authState}>
      <Outlet />
    </RouteGuard>
  );
}
```

`@zarr20/rakit-routes` automatically detects the default exported React component and wraps the group routes:
```tsx
<Route element={<DashboardMiddleware />}>
  <Route path="/analytics" ... />
  <Route path="/users/:id" ... />
</Route>
```

#### ⚡ Pattern B: Config-Only Middleware (`_middleware.ts`) — Inlined Zero-Waterfall Guard
If you prefer pure metadata without a custom React component, export a configuration object:

```typescript
// src/pages/(dashboard)/_middleware.ts
export default {
  protected: true,
  roles: ["admin", "manager"],
  redirect: "/login"
};
```

`@zarr20/rakit-routes` inlines a lightweight `DashboardGroupGuard` directly in `router.tsx` wrapping the group:
```tsx
const DashboardGroupGuard = ({ auth }: { auth?: AuthState }) => (
  <RouteGuard meta={{ protected: true, roles: ["admin", "manager"] }} auth={auth}>
    <Outlet />
  </RouteGuard>
);
```
Supply auth via `{generatedRoutes({ auth: authState })}`.

### 3. In-Page Specific Overrides (`export const meta`)
Individual pages can override or extend group rules:

```typescript
// src/pages/(dashboard)/billing.tsx
export const meta = {
  roles: ["superadmin"], // Overrides parent group to superadmin only
  title: "Billing & Finance"
};

export default function BillingPage() {
  return <h1>Billing</h1>;
}
```

### 4. Built-in Runtime Helpers & `<RouteGuard />`
```typescript
import { RouteGuard, hasRole, hasPermission, evaluateGuard, canAccess } from "@zarr20/rakit-routes/client";

// Quick boolean access check:
const isAllowed = canAccess(auth, route.meta);

// Role check:
const isAdmin = hasRole(auth, ['admin', 'superadmin']);

// Permission check:
const canEdit = hasPermission(auth, 'users:write');
```

---

## 🔗 Links

- **Repository**: [https://github.com/zarr20/rakit-routes](https://github.com/zarr20/rakit-routes)
- **Source Code**: [https://github.com/zarr20/rakit-routes](https://github.com/zarr20/rakit-routes)
- **Issues & Feedback**: [https://github.com/zarr20/rakit-routes/issues](https://github.com/zarr20/rakit-routes/issues)

---

## 📄 License

[MIT](./LICENSE) © Rakit (Dzarr Al Ghifari)
