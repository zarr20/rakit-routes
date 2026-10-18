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
    writer: RouterWriter;
    importBase?: string;
}
export declare function routerMapper(config: RouterMapperConfig): void;
