import * as queryStore from '@sanity/react-loader'
import { client } from 'app/sanity/client'

// We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
queryStore.setServerClient(client)

export const { loadQuery } = queryStore
