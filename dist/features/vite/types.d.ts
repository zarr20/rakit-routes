import { RouterMapperConfig } from "../mapper";
export interface VitePluginOptions extends Partial<RouterMapperConfig> {
    pagesDir?: string;
    outputDir?: string;
    fileName?: string;
}
