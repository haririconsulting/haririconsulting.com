/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_STUDIO_PROJECT_ID: string
  readonly VITE_SANITY_STUDIO_DATASET: string
  readonly VITE_SANITY_STUDIO_URL: string
  readonly VITE_SANITY_STUDIO_STEGA_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
