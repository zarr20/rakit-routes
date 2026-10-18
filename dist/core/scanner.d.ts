/**
 * Recursively scans the pages directory for valid page components.
 * Automatically ignores hidden files, test files, and private folders (prefixed with _).
 */
export declare function scanPages(baseDir: string, extensions?: string[], dir?: string): string[];
