declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        isHome: boolean;
        isError: boolean;
    }
}
declare const router: import("vue-router").Router;
export default router;
