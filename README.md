# @zarr20/rakit-routes

> High-performance, zero-config file-system based routing generator for React applications.

[![npm version](https://badge.fury.io/js/@zarr20/rakit-routes.svg)](https://www.npmjs.com/package/@zarr20/rakit-routes)
[![license](https://img.shields.io/npm/l/@zarr20/rakit-routes.svg)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

`@zarr20/rakit-routes` is a lightweight, zero-overhead file-based routing generator. It scans your React pages folder and automatically generates clean, type-safe route configurations with built-in code splitting via `React.lazy`.

---

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
| `[...slug].tsx` | `/*` | Low (Catch-all wildcard) |
| `404.tsx` or `_404.tsx` | `*` | Lowest (Fallback) |

*Private folders and helper files starting with an underscore (e.g. `_components/`, `_hooks/`) as well as test files (`*.test.tsx`, `*.spec.tsx`) are automatically ignored.*

---

## ⚛️ React Router Integration Example

```typescript
// App.tsx
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from './shared/router/router';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          {router.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 🔗 Links

- **Repository**: [https://github.com/zarr20/rakit-routes](https://github.com/zarr20/rakit-routes)
- **Source Code**: [https://github.com/zarr20/rakit-routes-dev](https://github.com/zarr20/rakit-routes-dev)
- **Issues & Feedback**: [https://github.com/zarr20/rakit-routes-dev/issues](https://github.com/zarr20/rakit-routes-dev/issues)

---

## 📄 License

[MIT](./LICENSE) © Rakit (Dzarr Al Ghifari)
