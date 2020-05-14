import { Union } from '../types/entities'
import { promisify } from 'util'
import { writeFile } from 'fs'
import { join } from 'path'
import { parseUnion } from '../parsers/ts'

export default async (union: Union) => {
  await promisify(writeFile)(
    join('packages/types', `${ union.name }.ts`),
    parseUnion(union)
  )
}