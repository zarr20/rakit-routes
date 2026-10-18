import { RouteItem } from "./types";
/**
 * Generates an array of sorted, resolved route items from a list of scanned page files,
 * automatically resolving in-page metadata and cascading middleware/layout files.
 */
export declare function generateRouter(files: string[], baseDir?: string): RouteItem[];
