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
import { ROOT_QUERYResult } from './sanity/types'

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
export function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useLoaderData<typeof loader>()
  // const data = useQuery<ROOT_QUERYResult>(ROOT_QUERY, undefined, { initial })
  if (!data) return <></>
  const style = {
    '--bg': data.backgroundColor,
    '--fg': data.foregroundColor,
    '--accent': data.accentColor,
    '--body': data.bodyFont?.name,
    '--heading': data.headingFont?.name,
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
        <nav className="flex space-x-6 px-2 py-2 w-full h-[100px]">
          <Link to="/">Site Title</Link>
          <div className="grow"></div>
          <Link to="/portfolio">portfolio</Link>
          <Link to="/bio">bio</Link>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
