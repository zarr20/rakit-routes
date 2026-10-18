import type { RouteMeta } from "../guard/types";
/**
 * Finds the nearest ancestor middleware file for a given relative route file.
 */
export declare function findAncestorMiddleware(file: string, baseDir: string): {
    relativePath?: string;
    fullPath?: string;
};
/**
 * Finds cascading layout files from root down to the target directory.
 */
export declare function findCascadingLayouts(file: string, baseDir: string): string[];
/**
 * Resolves combined metadata for a route file:
 * merges nearest ancestor middleware meta with in-page meta.
 */
export declare function resolveCombinedMeta(file: string, baseDir: string): {
    meta?: RouteMeta;
    middlewareFile?: string;
    layoutFiles?: string[];
};
