export { routerMapper } from "./mapper";
export type { RouterMapperConfig } from "./mapper";
export { reactRouterWriter } from "./writers/react";
export type { RouterWriter, WriterOptions } from "./writers/types";
export { scanPages, generateRouter, resolveRoutePath } from "./core";
export type { RouteItem } from "./core";
export { normalizeImportPath, toRoutePath } from "./utils/path";
