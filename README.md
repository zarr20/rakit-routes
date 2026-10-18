# @zarr20/rakit-routes

> Generator rute otomatis berbasis struktur direktori/file untuk aplikasi React.

[![license](https://img.shields.io/npm/l/@zarr20/rakit-routes.svg?v=1)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?v=1)](https://www.typescriptlang.org/)

Ekstraksi fitur routing otomatis file-based yang ringan dan efisien untuk memetakan halaman (`pages`) menjadi konfigurasi router React secara otomatis.

---

## 🚀 Fitur Utama

- ⚡ **File-System Based Routing**: Pemetaan otomatis direktori `pages` menjadi struktur rute (mendukung dynamic route `[id]` → `:id`).
- ⚛️ **React Router Code Generation**: Menghasilkan konfigurasi rute siap pakai dengan `React.lazy` untuk code splitting optimal.
- 🛠️ **CLI Ready**: Eksekusi cepat melalui CLI `npx @zarr20/rakit-routes`.
- 🔌 **Extensible Writers**: Arsitektur modular yang mendukung custom route writer sesuai kebutuhan framework.
- 📦 **TypeScript First**: Dukungan tipe lengkap bawaan tanpa setup tambahan.

---

## 📦 Instalasi

```bash
npm install @zarr20/rakit-routes
# atau
pnpm add @zarr20/rakit-routes
# atau
yarn add @zarr20/rakit-routes
```

---

## 💡 Cara Penggunaan

### 1. Menggunakan Script Node / TypeScript

Buat file konfigurasi, misalnya `scripts/generate-routes.ts`:

```typescript
import { routerMapper, reactRouterWriter } from '@zarr20/rakit-routes';

routerMapper({
  pages: {
    dir: './src/pages',
    extensions: ['.tsx', '.ts']
  },
  output: {
    dir: './src/shared/router',
    fileName: 'routes'
  },
  importBase: '../../pages',
  writer: reactRouterWriter()
});

console.log('✅ Routes generated successfully');
```

Tambahkan script pada `package.json`:

```json
{
  "scripts": {
    "routes:generate": "tsx scripts/generate-routes.ts",
    "dev": "npm run routes:generate && vite",
    "build": "npm run routes:generate && vite build"
  }
}
```

### 2. Menggunakan CLI

```bash
npx rakit-routes
```

Secara default akan memindai folder `src/pages` dan menghasilkan router di `src/shared/router/router.tsx`.

---

## 🗂️ Konversi Path & Routing

| Struktur File di `pages/` | Route URL yang Dihasilkan |
|---|---|
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `products/index.tsx` | `/products` |
| `products/[id].tsx` | `/products/:id` |
| `users/[userId]/posts/[postId].tsx` | `/users/:userId/posts/:postId` |

---

## 📄 Lisensi

[MIT](./LICENSE) © Dzarr al ghifari
