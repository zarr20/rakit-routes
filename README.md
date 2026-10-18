# @zarr20/rakit-routes

> Automatic file-system based routing generator for React applications.

[![npm version](https://badge.fury.io/js/@zarr20/rakit-routes.svg)](https://www.npmjs.com/package/@zarr20/rakit-routes)
[![license](https://img.shields.io/npm/l/@zarr20/rakit-routes.svg)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

`@zarr20/rakit-routes` is a lightweight, zero-overhead file-based routing generator. It scans your React pages folder and automatically generates clean, type-safe route configurations with built-in code splitting via `React.lazy`.

---

## 🚀 Key Features

- ⚡ **File-System Based Routing**: Automatically maps directory hierarchies into route paths (supports dynamic parameters like `[id]` → `:id`).
- ⚛️ **React Router Code Generation**: Generates clean route definitions with `React.lazy` for optimized code splitting.
- 🛠️ **CLI Ready**: Execute instantly via `npx @zarr20/rakit-routes` or `npx rakit-routes`.
- 🔌 **Extensible Writers**: Modular architecture allowing custom route writers for different router libraries or custom frameworks.
- 📦 **TypeScript First**: Full TypeScript support with comprehensive type definitions included out of the box.

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

### Or Directly from Git Repository:
```bash
npm install git+https://github.com/zarr20/rakit-routes.git
```

---

## 💡 Usage

### 1. Using Node / TypeScript Script

Create a build or generator script (e.g., `scripts/generate-routes.ts`):

```typescript
import { routerMapper, reactRouterWriter } from '@zarr20/rakit-routes';

routerMapper({
  pages: {
    dir: './src/pages',
    extensions: ['.tsx', '.ts'],
  },
  output: {
    dir: './src/shared/router',
    fileName: 'routes',
  },
  importBase: '../../pages',
  writer: reactRouterWriter(),
});

console.log('✅ Routes generated successfully');
```

Add the script to your application's `package.json`:

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

Run directly without creating a script file:

```bash
npx @zarr20/rakit-routes
# or
npx rakit-routes
```

By default, the CLI scans `src/pages` and outputs route definitions to `src/shared/router/router.tsx`.

---

## 🗂️ Path & Route Conversion Rules

| File in `pages/` | Generated Route URL |
|---|---|
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `products/index.tsx` | `/products` |
| `products/[id].tsx` | `/products/:id` |
| `users/[userId]/posts/[postId].tsx` | `/users/:userId/posts/:postId` |

---

## ⚛️ React Router Integration Example

```typescript
// App.tsx
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from './shared/router/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
- **Development & Source Code**: [https://github.com/zarr20/rakit-routes-dev](https://github.com/zarr20/rakit-routes-dev)
- **Issues & Feedback**: [https://github.com/zarr20/rakit-routes-dev/issues](https://github.com/zarr20/rakit-routes-dev/issues)

---

## 📄 License

[MIT](./LICENSE) © Rakit (Dzarr Al Ghifari)
