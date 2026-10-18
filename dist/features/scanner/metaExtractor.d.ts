import type { RouteMeta } from "../guard/types";
/**
 * Statically extracts RouteMeta from a file path without executing it.
 */
export declare function extractFileMeta(filePath: string): RouteMeta | undefined;
