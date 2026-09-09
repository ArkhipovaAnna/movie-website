/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KINOPOISK_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}