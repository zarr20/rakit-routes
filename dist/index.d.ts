export { routerMapper, computeRelativeImport } from "./mapper";
export type { RouterMapperConfig } from "./mapper";
export { reactRouterWriter } from "./writers/react";
export type { RouterWriter, WriterOptions } from "./writers/types";
export { scanPages, generateRouter, resolveRoutePath, sortRoutes } from "./core";
export type { RouteItem } from "./core";
export { normalizeImportPath, toRoutePath } from "./utils/path";
export { rakitRoutesPlugin } from "./vite";
export type { VitePluginOptions } from "./vite";
