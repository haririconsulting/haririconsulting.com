import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { loadQuery } from 'app/sanity/loader.server'
import groq from 'groq'
import { INFO_QUERYResult } from '~/sanity/types'
import { Suspense, lazy } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: 'Hariri Consulting' }]
}

const INFO_QUERY = groq`*[_type == 'about'][0]{slogan}`
export const loader = async () => {
  return await loadQuery<INFO_QUERYResult>(INFO_QUERY)
}

const LazyCover = lazy(async () => {
  if (typeof window === 'undefined') throw new Error('client-only')
  return await import('./cover.client')
})
export default function Index() {
  const { data } = useLoaderData<typeof loader>()

  console.log('data', data)
  if (!data) return <></>

  return (
    <>
      <div className="-z-10 absolute top-0 left-0 h-screen w-screen flex items-center justify-center text-lg">
        <Suspense fallback={<div></div>}>
          <LazyCover />
        </Suspense>
        <h2>{data.slogan}</h2>
      </div>
    </>
  )
}
