/// <reference types="vite/client" />

// Optional shim (safe to keep)
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
  