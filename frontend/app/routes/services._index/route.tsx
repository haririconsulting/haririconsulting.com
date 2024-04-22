import {
  Link,
  Outlet,
  useLoaderData,
  useMatch,
  useParams,
} from '@remix-run/react'
import { Pt } from 'pts'
import { useMemo } from 'react'
import { useAnimation } from '@util/Anim'
import { useEventListener } from '@util/util'
import groq from 'groq'
import { loadQuery } from '@sanity/react-loader'
import { SERVICES_QUERYResult } from '~/sanity/types'
import { PortableText } from '@portabletext/react'
import Section from '~/components/Section'
import Banner from '~/components/Banner'
import LazyCover from '~/components/LazyCover'
import _ from 'lodash'

function Blob({ to, order }: { to: string; order: number }) {
  const position = useMemo(
    () => new Pt(0, -0.25).rotate2D((order / 3) * Math.PI * 2),
    [],
  )
  const { role } = useParams()

  const props = useAnimation(
    true,
    () => ({
      currentPosition: position,
    }),
    () => {},
  )
  useEventListener('mousemove', (ev) => {})

  return <Link to={to}>{to}</Link>
}

const SERVICES_QUERY = groq`*[_type == 'services']`
export const loader = async () => {
  return await loadQuery<SERVICES_QUERYResult>(SERVICES_QUERY)
}
export default function Portfolio() {
  const { data } = useLoaderData<typeof loader>()
  const { role, slug } = useParams()
  console.log(role)
  console.log(data)

  return (
    <>
      <Banner background={<LazyCover />}>
        <h1 className="text-center text-h1 pb-4">Services</h1>
      </Banner>
      <div className="pt-4">
        {data.map((service, i) => (
          <Section
            className={`py-8 ${i % 2 ? 'bg-bg2' : 'bg-bg'}`}
            key={service._id}
          >
            <div
              className={`w-full flex space-x-8 rounded-full  ${i % 2 ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-1/3 flex items-center justify-center">
                <div className="rounded-full border border-accent w-full aspect-square mx-auto mb-4"></div>
              </div>

              <div className="w-2/3">
                <Link
                  to={`${service.slug!.current}`}
                  className="block w-full font-heading text-h2"
                >
                  <h2 className="text-h3">{service.title}</h2>
                </Link>
                {service.description && (
                  <PortableText value={service.description} />
                )}
              </div>
            </div>

            <div className="flex w-full pt-8">
              {_.range(3).map((x) => (
                <div className="rounded-full border border-accent h-24 aspect-square mx-auto mb-4 flex items-center justify-center">
                  Project {x + 1}
                </div>
              ))}
            </div>
          </Section>
        ))}
      </div>
      <Outlet />
    </>
  )
}
