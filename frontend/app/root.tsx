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
import * as queryStore from '@sanity/react-loader'
import { LinksFunction } from '@remix-run/cloudflare'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
]

const LiveVisualEditing = lazy(() => import('app/components/LiveVisualEditing'))

export const loader = () => {
  queryStore.setServerClient(client)
  return {}
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-[18px]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
