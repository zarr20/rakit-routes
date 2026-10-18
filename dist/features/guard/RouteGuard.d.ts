import type { ReactNode } from "react";
import type { RouteMeta, AuthState, GuardOptions } from "./types";
export interface RouteGuardProps {
    meta?: RouteMeta;
    auth?: AuthState | null;
    options?: GuardOptions;
    children: ReactNode;
    fallback?: ReactNode | ((redirect?: string) => ReactNode);
}
/**
 * RouteGuard component for guarding route elements based on route metadata and auth state.
 */
export declare function RouteGuard({ meta, auth, options, children, fallback }: RouteGuardProps): ReactNode;
