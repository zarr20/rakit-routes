import { VitePluginOptions } from "./types";
/**
 * Vite plugin for @zarr20/rakit-routes.
 * Automatically generates routes on server start and reloads when files in pages are added or removed.
 */
export declare function rakitRoutesPlugin(options?: VitePluginOptions): {
    name: string;
    buildStart(): void;
    configureServer(server: any): void;
};
