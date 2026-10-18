import { RouteItem } from "./types";
/**
 * Sorts routes deterministically by specificity:
 * 1. Root route ("/") at the top
 * 2. Static routes first (e.g. /products/new before /products/:id)
 * 3. Parameterized routes second
 * 4. Wildcard / Catch-all routes (/*)
 * 5. 404 fallback wildcard (*) at the very end
 */
export declare function sortRoutes(routes: RouteItem[]): RouteItem[];
