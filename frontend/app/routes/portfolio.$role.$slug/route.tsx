import { PortableText } from '@portabletext/react'
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData, useParams } from '@remix-run/react'
import { loadQuery, useQuery } from '@sanity/react-loader'
import groq from 'groq'
import { SanityImage } from 'sanity-image'
import invariant from 'tiny-invariant'
import ViewButton from '~/components/ViewButton'
import { BASE_URL } from '~/constants'
import { AssetInfo, WORKS_QUERYResult, WORK_QUERYResult } from '~/sanity/types'

const WORK_QUERY = groq`*[_type == "work" && slug.current == $slug][0]{..., 'imageBannerURL': imageBanner.asset->url, 'filePreviews': documentPreviews[]{..., 'fileSource': uploadSource.asset->}}`

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<WORK_QUERYResult>(WORK_QUERY, params)
  return { initial, query: WORK_QUERY, params }
}

export default function Works() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const {
    data: work,
    loading,
    error,
  } = useQuery<WORK_QUERYResult>(query, params, {
    // @ts-ignore
    initial,
  })

  if (!work) return <></>

  const to = `/portfolio/${params.role}`

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50 p-8 backdrop-blur-sm">
      <Link
        to={to}
        preventScrollReset
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      <div className="relative w-full h-fit max-h-full max-w-4xl cursor-default rounded-lg border border-gray-400 bg-black/20 backdrop-blur-lg overflow-y-auto">
        <div
          className="bg-cover bg-center px-2 pb-2"
          style={{
            backgroundImage: `url(${work.imageBannerURL})`,
          }}
        >
          <div className="h-[200px] w-full flex flex-col justify-center items-center space-y-2">
            <div className="top-4 z-10 text-center text-2xl font-bold drop-shadow-text bg-black/50 p-2 rounded-lg">
              {work.title}
            </div>
            <div className="text-center bg-black/50 p-2 rounded-lg">
              {work.subtitle}
            </div>
          </div>
          <div className="rounded py-1 bg-black/50 backdrop-blur p-2">
            <PortableText value={work.description!} />
          </div>
        </div>
        <div className="z-30">
          {work.filePreviews?.map((x) => <DocumentPreview preview={x} />)}
        </div>
      </div>
    </div>
  )
}

function DocumentPreview({
  preview,
}: {
  // @ts-ignore
  preview: NonNullable<WORK_QUERYResult['filePreviews']>[number]
}) {
  let href: string
  switch (preview.assetType) {
    case 'file':
      href = preview.fileSource.url!
      break
    case 'link':
      href = preview.linkSource!
      break
    default:
      throw new Error('unhandled type')
  }

  return preview.embed ? (
    <div className="aspect-video w-full">
      <iframe className="h-full w-full" src={href}></iframe>
    </div>
  ) : (
    <ViewButton href={href}>{preview.title ?? 'View more'}</ViewButton>
  )
}
