import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  ObjectTypeDefinitionNode,
  TypeNode,
  isTypeDefinitionNode,
  isTypeExtensionNode,
  parse,
  InputObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql'
import { Type, Field, Kind, Query, Argument, Mutation, Input, InputField, Enum, Union } from '../types'

export const parseType = (source: string): Type => {
  const parsed = parse(source)
  const [def] = parsed.definitions as ObjectTypeDefinitionNode[]
  if (!isTypeDefinitionNode(def) && !isTypeExtensionNode(def)) {
    throw new Error(`Not a type: ${ JSON.stringify(def) }`)
  }
  const name = def.name.value
  const fields: Field[] = []
  if (def.fields) {
    fields.push(...def.fields.map(parseField))
  }
  return {
    name,
    fields,
    directives: []
  }
}

export const parseTypeFromStringToJson = parseType

export const parseKind = (graphql: TypeNode): Kind => {
  if (graphql.kind === 'NonNullType') {
    return {
      ...parseKind(graphql.type),
      required: true
    }
  }
  if (graphql.kind === 'ListType') {
    const nextType = parseKind(graphql.type)
    return {
      ...nextType,
      nesting: nextType.nesting + 1,
      nestingRequired: [nextType.required, ...nextType.nestingRequired],
      required: false
    }
  }
  return {
    kind: graphql.name.value,
    nesting: 0,
    required: false,
    nestingRequired: []
  }
}

export const parseField = (field: FieldDefinitionNode): Field => ({
  name: field.name.value,
  kind: parseKind(field.type),
  arguments: (field.arguments || []).map(parseArgument)
})

export const parseArgument = (arg: InputValueDefinitionNode): Argument => {
  const name = arg.name.value
  const kind = parseKind(arg.type)
  return { name, kind }
}

export const parseQuery = (source: string): Query => {
  const type = parseType(source)
  const [field] = type.fields
  return field
}

export const parseMutation = (source: string): Mutation => {
  const type = parseType(source)
  const [field] = type.fields
  return field
}

export const parseInputField = (field: InputValueDefinitionNode): InputField => ({
  name: field.name.value,
  kind: parseKind(field.type)
})

export const parseInput = (source: string): Input => {
  const parsed = parse(source)
  const [def] = parsed.definitions as InputObjectTypeDefinitionNode[]
  const name = def.name.value
  const fields: InputField[] = []
  if (def.fields) {
    fields.push(...def.fields.map(parseInputField))
  }
  return {
    name,
    fields,
    directives: []
  }
}

export const parseEnum = (source: string): Enum => {
  const parsed = parse(source)
  const [def] = parsed.definitions as EnumTypeDefinitionNode[]
  const name = def.name.value
  const values = []
  if (def.values) {
    values.push(...def.values.map(value => value.name.value))
  }
  return {
    name,
    values
  }
}

export const parseUnion = (source: string): Union => {
  const parsed = parse(source)
  const [def] = parsed.definitions as UnionTypeDefinitionNode[]
  const name = def.name.value
  const values = []
  if (def.types) {
    values.push(...def.types.map(value => value.name.value))
  }
  return {
    name,
    values
  }
}