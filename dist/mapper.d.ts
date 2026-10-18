import { RouterWriter } from "./writers/types";
export interface RouterMapperConfig {
    pages: {
        dir: string;
        extensions?: string[];
    };
    output: {
        dir: string;
        fileName?: string;
    };
    writer?: RouterWriter;
    importBase?: string;
}
/**
 * Computes a POSIX-compliant relative import path from one directory to another.
 */
export declare function computeRelativeImport(fromDir: string, toDir: string): string;
export declare function routerMapper(config: RouterMapperConfig): void;
