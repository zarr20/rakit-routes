/**
 * Normalize file system path to POSIX import path
 * - Windows '\' → '/'
 * - Remove file extension
 */
export declare function normalizeImportPath(filePath: string): string;
/**
 * Convert file path to route path
 * Examples:
 * - "src/pages/index.tsx"       → "/"
 * - "src/pages/home/[id].tsx"   → "/home/:id"
 * - "src/pages/[...slug].tsx"   → "/*"
 * - "src/pages/404.tsx"         → "*"
 */
export declare function toRoutePath(filePath: string, baseDir?: string): string;
