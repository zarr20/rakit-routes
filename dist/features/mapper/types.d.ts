import { RouterWriter } from "../writers";
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
