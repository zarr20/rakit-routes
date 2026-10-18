/**
 * Recursively scans the pages directory for page components.
 * Automatically ignores hidden files/folders, test files, and private folders (_*).
 */
export declare function scanPages(baseDir: string, extensions?: string[], dir?: string): string[];
