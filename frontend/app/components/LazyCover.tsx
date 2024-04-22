import { Suspense, lazy } from 'react'

const LazyCoverLoad = lazy(async () => {
  if (typeof window === 'undefined') throw new Error('client-only')
  return await import('./Cover.client')
})

const LazyCover = () => (
  <Suspense fallback={<div></div>}>
    <LazyCoverLoad />
  </Suspense>
)

export default LazyCover
