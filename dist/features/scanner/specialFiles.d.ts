/**
 * Returns true if the file is a configuration/special file (e.g. middleware, layout, meta)
 * that should not be exposed as a public route URL.
 */
export declare function isSpecialRouteFile(filePath: string): boolean;
export declare function isMiddlewareFile(filePath: string): boolean;
export declare function isLayoutFile(filePath: string): boolean;
export declare function isMetaFile(filePath: string): boolean;
/**
 * Checks whether a file is a React Component (e.g. renders JSX, exports a function component, or has .tsx/.jsx extension)
 */
export declare function isComponentFile(filePath: string): boolean;
