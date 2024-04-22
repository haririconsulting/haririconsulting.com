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
      <div>
        {data.map((service) => (
          <Section className="w-full py-4" key={service._id}>
            <div className="rounded-full border border-accent h-16 aspect-square mx-auto mb-4"></div>
            <Link
              to={`${service.slug!.current}`}
              className="block w-full text-center font-heading"
            >
              {service.title}
            </Link>
            {service.description && (
              <PortableText value={service.description} />
            )}
          </Section>
        ))}
      </div>
      <Outlet />
    </>
  )
}
