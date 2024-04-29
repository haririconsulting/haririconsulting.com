import { PortableText } from '@portabletext/react'
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { loadQuery } from '@sanity/react-loader'
import groq from 'groq'
import invariant from 'tiny-invariant'
import { BIO_QUERYResult } from '~/sanity/types'
import { SanityImage } from 'sanity-image'
import { useEffect, useRef, useState } from 'react'
import Section from '~/components/Section'
import ViewButton from '~/components/ViewButton'
import { baseURL } from 'projectSettings'
import Banner from '~/components/Banner'
import LazyCover from '~/components/LazyCover'
import Footer from '~/components/Footer'

const BIO_QUERY = groq`*[_type == 'about'][0] {
  ..., 
  'bioURL': cv.asset->url
}`

export const loader = async () => {
  return await loadQuery<BIO_QUERYResult>(BIO_QUERY)
}

export default function Bio() {
  const { data: bio } = useLoaderData<typeof loader>()
  if (!bio) return <></>

  return (
    <>
      <Banner background={<LazyCover />}>
        <h1 className="text-center text-h1 pb-4">About Us</h1>
      </Banner>
      <section className="relative">
        <div className="absolute top-0 left-0 bg-accent2 w-full h-[calc(100%-72px)]"></div>
        <div className="bg-bg2 p-8 rounded-lg max-w-2xl mx-auto relative -top-8">
          <h2 className="text-center text-h3 leading-h3 pb-4 font-body">
            What Guides Us
          </h2>
          <div className="md:flex md:space-x-4">
            {bio.guidingPrinciples?.map((principle) => {
              return (
                <div>
                  <h3 className="text-xl">{principle.title}</h3>
                  <p className="text-sm">{principle.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Section className="py-4">
        <div className="max-w-[300px] w-1/3 aspect-square float-right ml-8 mb-4">
          <SanityImage
            className="w-full aspect-[3/4] rounded-xl"
            // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
            id={bio.headshot!.asset!._ref}
            baseUrl={baseURL}
          />
        </div>
        <h2 className="text-h3 pb-4 ">About Maryam Hariri</h2>
        <PortableText value={bio.bio!} />

        {bio.cv && <ViewButton href={bio.bioURL!}>CV</ViewButton>}
        <div className="clear-both" />
      </Section>

      <Section>
        <h2 className="text-h3 pb-4">Meet the Team</h2>
        {bio.team?.map((member) => (
          <div>
            <h3 className="text-h4">{member.name}</h3>
            <PortableText value={member.bio!} />
          </div>
        ))}
      </Section>
      {/* <Footer /> */}
    </>
  )
}
