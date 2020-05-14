import { Query } from "../types/entities";
import { promisify } from "util";
import { writeFile, chmod, stat } from "fs";
import { join } from "path";
import { parseOperation } from "../parsers/ts";
import { base } from "../config";
import { upperFirst, camelCase } from "lodash";

export default async (query: Query) => {
  // await promisify(writeFile)(
  //   join(base, 'types', `${ query.name }.ts`),
  //   parseOperation(query)
  // )

  // const linesBefore = [
  //   `import { ${ query.name } } from '@weedz/types/${ query.name }'`,
  //   '',
  //   `const query: ${ query.name } = async (_ctx, request) => {`,
  // ]

  // const linesAfter = [
  //   '}',
  //   '',
  //   'export default query',
  //   ''
  // ]

  // const file = join(base, 'resolvers/src/queries', `${ query.name }.ts`)

  // try {
  //   await promisify(stat)(file)
  // } catch (error) {
  //   await promisify(writeFile)(
  //     file,
  //     [...linesBefore, ...linesAfter].join('\n')
  //   )
  // }
  // await promisify(chmod)(file, 0o777)

  let clientQuery = ''

  if (query.arguments.length) {
    clientQuery = `query ${ upperFirst(camelCase(query.name)) }Query(
      ${ query.arguments.map(arg => `$${ arg.name }: `)}
    ) {
      ${ query.name }(
        ${ query.arguments.map(arg => `${ arg.name }: $${ arg.name }`)}
      )
    }`
  } else {
    clientQuery = `{
      ${ query.name } {
        
      }
    }`
  }

  console.log(clientQuery)
}
