import { Mutation } from "../types/entities";
import { promisify } from "util";
import { writeFile, chmod, stat } from "fs";
import { join } from "path";
import { parseOperation } from "../parsers/ts";
import { base } from "../config";

export default async (mutation: Mutation) => {
  await promisify(writeFile)(
    join(base, 'types', `${ mutation.name }.ts`),
    parseOperation(mutation)
  )

  const lines = [
    `import { ${ mutation.name } } from '@weedz/types/${ mutation.name }'`,
    '',
    `const mutation: ${ mutation.name } = async (_ctx, request) => {}`,
    '',
    'export default mutation',
    ''
  ]
  const file = join(base, 'resolvers/src/mutations', `${ mutation.name }.ts`)
  try {
    await promisify(stat)(file)
  } catch (error) {
    await promisify(writeFile)(
      file,
      lines.join('\n')
    )
    await promisify(chmod)(file, 0o777)
  }
}
