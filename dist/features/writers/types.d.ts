import { RouteItem } from "../generator";
export interface WriterOptions {
    outputDir: string;
    fileName: string;
    importBase: string;
    pagesDir?: string;
}
export interface RouterWriter {
    write(routes: RouteItem[], options: WriterOptions): void;
}
