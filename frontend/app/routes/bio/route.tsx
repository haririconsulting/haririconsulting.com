import { PortableText } from '@portabletext/react'
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { loadQuery } from '@sanity/react-loader'
import groq from 'groq'
import invariant from 'tiny-invariant'
import { BIO_QUERYResult } from '~/sanity/types'
import { SanityImage } from 'sanity-image'
import { useEffect, useState } from 'react'
import Section from '~/components/Section'
import ViewButton from '~/components/ViewButton'
import { BASE_URL } from '~/constants'

const BIO_QUERY = groq`*[_type == 'bio'][0] {
  ..., 
  'bioURL': cv.asset->url
}`

export const loader = async () => {
  return await loadQuery<BIO_QUERYResult>(BIO_QUERY)
}

export default function Bio() {
  const { data: bio } = useLoaderData<typeof loader>()
  if (!bio) return <></>

  console.log(bio)

  return (
    <Section>
      <div className="w-[50%] max-w-[300px] float-left mr-4 mb-4">
        <SanityImage
          // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
          id={bio.headshot!.asset!._ref}
          baseUrl={BASE_URL}
        />
      </div>

      <PortableText value={bio.bio!} />
      {bio.cv && <ViewButton href={bio.bioURL!}>CV</ViewButton>}
    </Section>
  )
}
