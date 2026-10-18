/**
 * Normalize file system path to POSIX import path
 * - Windows '\' → '/'
 * - Remove file extension
 */
export declare function normalizeImportPath(filePath: string): string;
/**
 * Convert file path to route path
 * e.g. "src/pages/home/[id].tsx" → "/home/:id"
 */
export declare function toRoutePath(filePath: string, baseDir?: string): string;
