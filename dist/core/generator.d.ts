export interface RouteItem {
    path: string;
    file: string;
}
export declare function generateRouter(files: string[]): RouteItem[];
