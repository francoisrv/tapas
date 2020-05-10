import { promisify } from "util"
import { readdir, writeFile } from "fs"
import { join } from "path"
import { base } from "../config"

export default async () => {
  const files = await promisify(readdir)(join(base, 'resolvers/src/mutations'))
  const mutations: string[] = []
  for (const file of files) {
    if (file === 'index.ts') {
      continue
    }
    const name = file.replace(/\.ts$/, '')
    mutations.push(`export { default as ${ name } } from './${ name }'`)
  }
  const content = mutations.length ? mutations : ['export {}']
  await promisify(writeFile)(
    join(base, 'resolvers/src/mutations/index.ts'),
    [...content, ''].join('\n')
  )
}
