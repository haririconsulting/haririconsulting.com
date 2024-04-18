import { createClient } from '@sanity/client/stega'

// Do not import this into client-side components unless lazy-loaded
console.log('INFO:', import.meta.env)

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_STUDIO_DATASET,
  useCdn: true,
  apiVersion: '2024-04-13',
  stega: {
    enabled: import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED ? true : false,
    studioUrl: import.meta.env.VITE_SANITY_STUDIO_URL,
  },
})
