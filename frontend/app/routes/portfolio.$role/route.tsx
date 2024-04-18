import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
  useSearchParams,
} from '@remix-run/react'
import { loadQuery, useQuery } from '@sanity/react-loader'
import groq from 'groq'
import { cloneElement, useRef } from 'react'
import invariant from 'tiny-invariant'
import Section from '~/components/Section'
import Tag from '~/components/Tag'
import WorksDisplay from './WorksDisplay'
import { ROLE_QUERYResult, WORKS_QUERYResult } from '~/sanity/types'
import { PortableText } from '@portabletext/react'

const WORKS_QUERY = groq`*[_type == 'work' && type->slug.current == $role]{..., 'videoBannerURL': videoBanner.asset->url, 'imageBannerURL': imageBanner.asset->url}`
const ROLE_QUERY = groq`*[_type == 'category' && slug.current == $role][0]`
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = {
    works: await loadQuery<WORKS_QUERYResult>(WORKS_QUERY, params),
    role: await loadQuery<ROLE_QUERYResult>(ROLE_QUERY, params),
  }
  return { initial, query: WORKS_QUERY, params }
}

export default function Role() {
  const [search, setSearch] = useSearchParams()
  const { initial, query, params } = useLoaderData<typeof loader>()

  const { data, loading, error } = useQuery<WORKS_QUERYResult>(query, params, {
    // @ts-ignore
    initial: initial.works,
  })
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery<ROLE_QUERYResult>(query, params, {
    // @ts-ignore
    initial: initial.role,
  })

  if (!data || !roleData) return <></>

  return (
    <>
      <Section>
        <div className="*:font-sans text-center">
          <PortableText value={roleData.description!} />
        </div>
      </Section>
      <WorksDisplay works={data} />
      <Outlet />
    </>
  )
}
