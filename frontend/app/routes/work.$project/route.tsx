import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import groq from 'groq'
import { loadQuery } from '@sanity/react-loader'
import { WORK_QUERYResult } from '../../sanity/types'
import React from 'react'
import invariant from 'tiny-invariant'
import Section from '~/components/Section'
import { PortableText } from '@portabletext/react'

const WORK_QUERY = groq`*[_type == 'projects' && slug.current == $project]{..., 'type': type->, 'imageBanner': {...imageBanner, 'asset': imageBanner.asset->url}}[0]`
export async function loader({ params }: LoaderFunctionArgs) {
  return await loadQuery<WORK_QUERYResult>(WORK_QUERY, params)
}

export default function Project() {
  const { data } = useLoaderData<typeof loader>()
  invariant(data)
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-10 backdrop-blur">
      <Link to="/work" className="h-full w-full absolute top-0 left-0"></Link>

      <div className="max-h-[calc(100%-300px)] w-full max-w-2xl rounded-lg h-full overflow-auto p-8 border border-accent relative">
        <h2 className="text-h3 pb-8">{data.title!}</h2>
        <div className="font-body text-lg">{data.subtitle!}</div>
        <div>
          <PortableText value={data.description!} />
        </div>
      </div>
    </div>
  )
}
