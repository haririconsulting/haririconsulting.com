import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import styles from './index.css?url'
import { lazy, useEffect } from 'react'
import { client } from './sanity/client'
import { loadQuery, setServerClient, useQuery } from '@sanity/react-loader'
import { LinksFunction } from '@remix-run/cloudflare'
import groq from 'groq'
import { INFO_QUERYResult, ROOT_QUERYResult } from './sanity/types'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
]

const LiveVisualEditing = lazy(() => import('app/components/LiveVisualEditing'))

const ROOT_QUERY = groq`*[_type == 'siteInfo'][0]`
export const loader = async () => {
  setServerClient(client)
  return await loadQuery<ROOT_QUERYResult>(ROOT_QUERY)
}

export default function App() {
  const load = useLoaderData<typeof loader>()
  const data = load?.data
  if (!data) return <></>

  const style = {
    '--bg': data.backgroundColor,
    '--bg2': data.backgroundAltColor,
    '--fg': data.foregroundColor,
    '--accent': data.accentColor,
    '--accent2': data.accentAltColor,
    '--body': data.bodyFont?.name,
    '--heading': data.headingFont?.name,
    '--topbar': '60px',
  }

  return (
    <html
      lang="en"
      className="text-[18px] bg-bg text-fg font-body"
      // @ts-ignore
      style={style}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {data.headingFont?.linkSource && (
          <link rel="stylesheet" href={data.headingFont.linkSource} />
        )}
        {data.bodyFont?.linkSource && (
          <link rel="stylesheet" href={data.bodyFont.linkSource} />
        )}
        <Meta />
        <Links />
      </head>
      <body className={``}>
        <nav className="absolute top-0 left-0 flex space-x-6 px-2 py-2 w-full h-topbar z-10 font-heading">
          <Link to="/">{data.siteTitle}</Link>
          <div className="grow"></div>
          <div className="relative group">
            <Link to="/services">services</Link>
            <div className="absolute top-full left-0 bg-bg border-fg"></div>
          </div>
          <Link to="/about">about</Link>
        </nav>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
