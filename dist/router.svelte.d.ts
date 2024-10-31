import type { Writable } from "svelte/store";
import { type PostHooks, type PreHooks, type Route } from "./instance.svelte";
declare const Router: import("svelte").Component<{
    pre?: PreHooks;
    post?: PostHooks;
    routes: Route[];
    navigating?: Writable<boolean>;
}, {}, "navigating">;
export default Router;
