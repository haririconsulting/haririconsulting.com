import { PortableText } from '@portabletext/react'
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react'
import { loadQuery } from '@sanity/react-loader'
import groq from 'groq'
import { WORKS_QUERYResult } from '~/sanity/types'

const WORKS_QUERY = groq`*[_type == 'projects']{..., 'type': type->, 'imageBanner': {...imageBanner, 'asset': imageBanner.asset->url}}`
export async function loader() {
  return await loadQuery<WORKS_QUERYResult>(WORKS_QUERY)
}

export default function Work() {
  const { data } = useLoaderData<typeof loader>()
  const { project } = useParams()
  return (
    <>
      <div className="h-topbar w-full"></div>
      <div
        className={`h-[calc(100vh-var(--topbar))] w-full ${project ? 'overflow-hidden' : 'overflow-y-auto'}`}
      >
        <div className="flex flex-wrap *:flex-none justify-center">
          {data.map((work, i) => (
            <Link
              to={work.slug!.current!}
              key={work._id}
              className={`lg:w-1/2 md:w-1/4 w-full tall:h-[50vh] h-full p-6 ${i % 3 ? 'bg-bg' : 'bg-bg2'} flex flex-col border border-accent2 transition-colors duration-200 hover:bg-accent`}
              // style={{ background: `url(${work.imageBanner.asset})` }}
            >
              <h2 className="text-h3 pb-8">{work.title}</h2>

              <div className="font-body text-lg">{work.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </>
  )
}
