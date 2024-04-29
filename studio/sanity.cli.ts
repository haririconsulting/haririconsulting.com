import {defineCliConfig} from 'sanity/cli'
import settings from '../projectSettings'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
  api: {
    projectId: settings.projectId,
    dataset: settings.database,
  },
  project: {
    basePath: '/admin',
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
})
