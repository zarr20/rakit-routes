/**
 * Normalizes file system path to POSIX import path.
 * - Windows '\' → '/'
 * - Removes file extension
 */
export declare function normalizeImportPath(filePath: string): string;
/**
 * Converts a file path into its corresponding route URL path.
 *
 * Rules:
 * - "index.tsx"       → "/"
 * - "home/[id].tsx"   → "/home/:id"
 * - "[...slug].tsx"   → "/*"
 * - "404.tsx"         → "*"
 */
export declare function toRoutePath(filePath: string, baseDir?: string): string;
/**
 * Resolves a file path to its route path (alias for toRoutePath).
 */
export declare function resolveRoutePath(file: string, baseDir?: string): string;
