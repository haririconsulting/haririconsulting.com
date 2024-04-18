import { WORKS_QUERYResult, WORK_QUERYResult } from '~/sanity/types'

export const generateId = (work: WORKS_QUERYResult[number]) =>
  work.slug!.current!.replace('-', '_')
