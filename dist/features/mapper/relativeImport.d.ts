/**
 * Computes a normalized POSIX relative import path from one folder to another.
 * Example:
 *   from "src/shared/router" to "src/pages" -> "../../pages"
 */
export declare function computeRelativeImport(fromDir: string, toDir: string): string;
