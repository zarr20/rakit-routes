export interface RouteMeta {
    title?: string;
    protected?: boolean;
    roles?: string[];
    permissions?: string[];
    guestOnly?: boolean;
    redirect?: string;
    layout?: string;
    [key: string]: unknown;
}
export interface AuthState<TUser = unknown> {
    isLogin?: boolean;
    user?: TUser | null;
    roles?: string[];
    permissions?: string[];
}
export interface GuardOptions {
    fallbackRedirect?: string;
    forbiddenRedirect?: string;
    guestRedirect?: string;
}
export interface GuardEvaluation {
    allowed: boolean;
    redirect?: string;
    reason?: "unauthenticated" | "guest_only" | "forbidden" | "ok";
}
