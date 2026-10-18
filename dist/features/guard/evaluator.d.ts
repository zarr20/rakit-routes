import { RouteMeta, AuthState, GuardOptions, GuardEvaluation } from "./types";
/**
 * Checks if the current user possesses one of the required roles.
 */
export declare function hasRole(auth?: AuthState | null, role?: string | string[]): boolean;
/**
 * Checks if the current user possesses all of the required permissions.
 */
export declare function hasPermission(auth?: AuthState | null, permission?: string | string[]): boolean;
/**
 * Evaluates route metadata against current user authentication state.
 * Returns an evaluation object with permission status, redirect target, and reason.
 */
export declare function evaluateGuard(meta?: RouteMeta, auth?: AuthState | null, options?: GuardOptions): GuardEvaluation;
/**
 * Quick boolean check if a user is allowed to access a route.
 */
export declare function canAccess(auth?: AuthState | null, meta?: RouteMeta, options?: GuardOptions): boolean;
