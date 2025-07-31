/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_ITINERARY_WORKFLOW_ID: string
  readonly VITE_ITINERARY_WORKFLOW_SECRET: string
  readonly VITE_ITINERARY_OPTIMIZATION_PROFILE: string
  readonly VITE_CHAT_WORKFLOW_ID: string
  readonly VITE_CHAT_WORKFLOW_SECRET: string
  readonly VITE_CHAT_MODEL_OVERRIDE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
