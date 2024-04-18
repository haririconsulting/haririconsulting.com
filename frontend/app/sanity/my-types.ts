import { WORKS_QUERYResult } from './types'

declare global {
  type RoleType = NonNullable<WORKS_QUERYResult[number]['type']>
}
