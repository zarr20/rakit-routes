import { RouterMapperConfig } from "./mapper";
export interface VitePluginOptions extends Partial<RouterMapperConfig> {
    pagesDir?: string;
    outputDir?: string;
    fileName?: string;
}
/**
 * Vite plugin for @zarr20/rakit-routes.
 * Automatically generates routes on server start and reloads when files in pages are added or removed.
 */
export declare function rakitRoutesPlugin(options?: VitePluginOptions): {
    name: string;
    buildStart(): void;
    configureServer(server: any): void;
};
