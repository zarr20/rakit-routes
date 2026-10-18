import type { RouteMeta } from "../guard/types";
export interface RouteItem {
    path: string;
    file: string;
    meta?: RouteMeta;
    middlewareFile?: string;
    layoutFiles?: string[];
}
