# @zarr20/rakit-routes

> Automatic file-system based routing generator for React applications.

[![npm version](https://badge.fury.io/js/@zarr20/rakit-routes.svg)](https://www.npmjs.com/package/@zarr20/rakit-routes)
[![license](https://img.shields.io/npm/l/@zarr20/rakit-routes.svg)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, efficient file-based routing generator that automatically maps your `pages` directory into ready-to-use React Router configuration.

---

## 🚀 Key Features

- ⚡ **File-System Based Routing**: Automatically maps directory structure to route paths (supports dynamic parameters like `[id]` → `:id`).
- ⚛️ **React Router Code Generation**: Generates clean route definitions with `React.lazy` for built-in code splitting.
- 🛠️ **CLI Ready**: Quick one-command execution via `npx @zarr20/rakit-routes` or `npx rakit-routes`.
- 🔌 **Extensible Writers**: Modular architecture allowing custom route writers for different router libraries or frameworks.
- 📦 **TypeScript First**: Full TypeScript support with comprehensive type definitions included out of the box.

---

## 📦 Installation

```bash
npm install @zarr20/rakit-routes
# or
pnpm add @zarr20/rakit-routes
# or
yarn add @zarr20/rakit-routes
```

---

## 💡 Usage

### 1. Using Node / TypeScript Script

Create a script file, for example `scripts/generate-routes.ts`:

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

```bash
npx @zarr20/rakit-routes
# or
npx rakit-routes
```

By default, the CLI scans `src/pages` and outputs route configuration to `src/shared/router/router.tsx`.

---

## 🗂️ Path & Route Conversion

| File in `pages/` | Generated Route URL |
|---|---|
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `products/index.tsx` | `/products` |
| `products/[id].tsx` | `/products/:id` |
| `users/[userId]/posts/[postId].tsx` | `/users/:userId/posts/:postId` |

---

## 📚 Documentation

For detailed usage, configuration options, and full React integration examples, visit the [Documentation Portal](./docs/).

---

## 📄 License

[MIT](./LICENSE) © Rakit (Dzarr Al Ghifari)
