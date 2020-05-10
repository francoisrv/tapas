export interface List<Of extends  any> {
  [name: string]: Of
}

export interface Kind {
  kind: string
  nesting: number
  required: boolean
  nestingRequired: boolean[]
}

export interface Argument {
  kind: Kind
}

export interface Field {
  arguments: List<Argument>
  kind: Kind
}

export interface DirectiveDefinition {
  arguments: List<Argument>
  locations: DirectiveDefinitionLocation[]
}

export interface Directive {
  values: List<any>
}

export interface Input {
  directives: List<DirectiveDefinition>
  fields: List<Field>
}

export interface Query {
  arguments: List<Argument>
  directives: List<DirectiveDefinition>
  kind: Kind
}

export interface Mutation {
  arguments: List<Argument>
  directives: List<DirectiveDefinition>
  kind: Kind
}

export interface Type {
  fields: List<Field>
  directives: List<Directive>
}

export interface EnumValue {
  directives: List<DirectiveDefinition>
}

export interface Enum {
  directives: List<DirectiveDefinition>
  values: List<EnumValue>
}

export interface Union {
  directives: List<DirectiveDefinition>
  kinds: string[]
}

export enum DirectiveDefinitionLocation {
  FIELD_DEFINITION = 'FIELD_DEFINITION',
  ENUM_VALUE = 'ENUM_VALUE',
}

export interface Scalar {
  directives: List<DirectiveDefinition>
}

export type SchemaType =
| DirectiveDefinition
| Enum
| Input
| Query
| Mutation
| Type
| Union

export interface Schema {
  directives: List<DirectiveDefinition>
  enums: List<Enum>
  inputs: List<Input>
  queries: List<Query>
  mutations: List<Mutation>
  types: List<Type>
  unions: List<Union>
}