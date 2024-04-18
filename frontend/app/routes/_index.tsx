import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { QueryParams, useQuery } from '@sanity/react-loader'
import { loadQuery } from 'app/sanity/loader.server'
import groq from 'groq'
import { WORKS_QUERYResult } from '~/sanity/types'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export default function Index() {
  return <></>
}
