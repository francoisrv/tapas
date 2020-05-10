import { Type } from "../types/entities"
import { promisify } from "util"
import { writeFile, chmod, readFile } from "fs"
import { join } from "path"
import { map } from 'lodash'

import * as ts from '../parsers/ts'
import { base } from "../config"

export default async (type: Type) => {
  const source = (await promisify(readFile)(
    join(base, `schema/types/${ type.name }.graphql`)
  )).toString()

  const TYPE_RESOLVER = `import * as graphoose from 'graphoose'

const source = \`
${ source }
\`

export default () => graphoose.model(source)
`
  await promisify(writeFile)(
    join(base, 'resolvers/src/types', `${ type.name }.ts`),
    TYPE_RESOLVER
  )

  await promisify(chmod)(join(base, 'resolvers/src/types', `${ type.name }.ts`), 0o777)

  await promisify(writeFile)(
    join(base, 'types', `${ type.name }.ts`),
    ts.parseType(type)
  )

  const fragment = `{
  ${ map(type.fields, 'name').join('\n  ') }
}`

  await promisify(writeFile)(
    join(base, `client/graphql/fragments/${ type.name }.graphql`),
    fragment
  )
}
