import type { RouteMeta } from "../guard/types";
export interface RouteItem {
    path: string;
    file: string;
    meta?: RouteMeta;
    middlewareFile?: string;
    middlewareComponent?: string;
    layoutFiles?: string[];
}
