import type { Component, Snippet } from 'svelte';
export type PreHooks = ((route: Route) => Route)[] | ((route: Route) => Promise<Route>)[] | ((route: Route) => Route) | ((route: Route) => Promise<Route>);
export type PostHooks = ((route: Route) => void)[] | ((route: Route) => Promise<void>)[] | ((route: Route) => void) | ((route: Route) => Promise<void>);
export interface Route {
    path: RegExp | string;
    component?: Component<any> | Snippet;
    props?: Record<string, any>;
    pre?: PreHooks;
    post?: PostHooks;
    children?: Route[];
    params?: string[];
}
/**
 * A router instance that each <Router/> component creates.
 */
export declare class Instance {
    #private;
    routes: Route[];
    current: Route;
    navigating: import("svelte/store").Writable<boolean>;
    /**
     * Creates a new router instance.
     * @param {Route[]} routes The routes to navigate to.
     * @param {PreHooks} pre (optional) The pre hooks to run before navigating to a route.
     * @param {PostHooks} post (optional) The post hooks to run after navigating to a route.
     */
    constructor(routes: Route[], pre?: PreHooks, post?: PostHooks);
    /**
     * Navigates to a given route, running  the pre and post hooks.
     * @param {Route} route The route to navigate to.
     * @returns {Route} The route that was navigated to.
     */
    run(route: Route): Promise<void>;
}
/**
 * Get the route for a given path.
 * @param {Instance} routerInstance The router instance to get the route for.
 * @param {Route[]} routes The routes to get the route for.
 * @param {string} path The path to get the route for.
 * @param {ParentRoute} parent The parent route to get the route for.
 * @returns {Route} The route for the given path.
 */
export declare const get: (routerInstance: Instance, routes: Route[], path: string) => Route;
/**
 * Sets up a new history watcher for a router instance.
 * @param {Instance} instance The router instance to setup the history watcher for.
 */
export declare const setupHistoryWatcher: (instance: Instance) => void;
