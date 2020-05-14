import { ObjectTypeDefinitionNode } from 'graphql'

export async function parseType(definition: ObjectTypeDefinitionNode) {
  const lines: string[] = [`export interface Query {`]
  lines.push('}')
  return lines.join('\n')
}