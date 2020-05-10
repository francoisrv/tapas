import { Enum } from '../types/entities'
import { promisify } from 'util'
import { writeFile } from 'fs'
import { join } from 'path'
import { parseEnum } from '../parsers/ts'

export default async (enumeration: Enum) => {
  await promisify(writeFile)(
    join('packages/types', `${ enumeration.name }.ts`),
    parseEnum(enumeration)
  )
}