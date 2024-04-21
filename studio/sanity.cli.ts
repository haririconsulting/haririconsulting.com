import {defineCliConfig} from 'sanity/cli'
import settings from '../projectSettings'

export default defineCliConfig({
  api: {
    projectId: settings.projectId,
    dataset: settings.database,
  },
  project: {
    basePath: '/admin',
  },
})
