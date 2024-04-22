import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { loadQuery } from 'app/sanity/loader.server'
import groq from 'groq'
import { INFO_QUERYResult } from '~/sanity/types'
import { Suspense, lazy } from 'react'
import LazyCover from '~/components/LazyCover'

export const meta: MetaFunction = () => {
  return [{ title: 'Hariri Consulting' }]
}

const INFO_QUERY = groq`*[_type == 'about'][0]{slogan}`
export const loader = async () => {
  return await loadQuery<INFO_QUERYResult>(INFO_QUERY)
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>()

  console.log('data', data)
  if (!data) return <></>

  return (
    <>
      <div className="-z-10 absolute top-0 left-0 h-screen w-screen flex items-center justify-center text-lg">
        <LazyCover />
        <h2 className="font-body text-2xl">{data.slogan}</h2>
      </div>
    </>
  )
}
