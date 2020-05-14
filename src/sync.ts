import { promisify } from 'util'
import { readFile } from 'fs'
import { parse } from 'graphql'
import { parseType } from './lib/writer/typescript'

interface Options {
  source: string
}

export default async function sync(options: Options) {
  const source = (await promisify(readFile)(options.source)).toString()
  const parsed = parse(source)
  if (parsed.kind !== 'Document') {
    throw new Error('tapas: Not a document')
  }
  for (const definition of parsed.definitions) {
    if (definition.kind === 'ObjectTypeDefinition') {
      return await parseType(definition)
    }
  }
  return parsed
}