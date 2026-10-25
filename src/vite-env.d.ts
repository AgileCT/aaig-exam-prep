/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Build-time override for the reviewer name on review records (see src/data/reviewer.ts). */
  readonly VITE_REVIEWER_NAME?: string;
}
