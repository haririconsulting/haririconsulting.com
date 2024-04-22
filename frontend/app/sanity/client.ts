import { createClient } from '@sanity/client/stega'
// Do not import this into client-side components unless lazy-loaded
console.log('INFO:', import.meta.env)
import projectSettings from '../../projectSettings'

export const client = createClient({
  projectId: projectSettings.projectId,
  dataset: projectSettings.database,
  useCdn: true,
  apiVersion: '2024-04-13',
})
